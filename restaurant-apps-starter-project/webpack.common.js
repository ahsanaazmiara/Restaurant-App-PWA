/* eslint-disable no-undef */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/scripts/index.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
            }
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 70000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/templates/index.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
          globOptions: {
            // CopyWebpackPlugin mengabaikan berkas yang berada di dalam folder images
            // ignore: ['**/images/**'],
          },
        },
      ],
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      swDest: './sw.bundle.js',
      runtimeCaching: [
        {
          // Caching API endpoint untuk daftar restoran
          urlPattern: ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/list'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'restaurant-api-list',
          },
        },
        {
          // Caching API endpoint untuk detail restoran
          urlPattern: ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/detail/'),
          handler: 'StaleWhileRevalidate',  // Menggunakan NetworkFirst dengan networkTimeoutSeconds
          options: {
            cacheName: 'restaurant-api-detail',
          },
        },
        {
          // Caching API endpoint untuk pencarian restoran
          urlPattern: ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/search'),
          handler: 'NetworkFirst',  // Menggunakan NetworkFirst dengan networkTimeoutSeconds
          options: {
            cacheName: 'restaurant-api-search',
            networkTimeoutSeconds: 10,
          },
        },
        {
          // Caching API untuk mengirimkan review ke restoran
          urlPattern: ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/review'),
          handler: 'NetworkOnly', // Biasanya untuk POST request, Anda mungkin ingin melakukan ini hanya dengan jaringan.
          options: {
            cacheName: 'restaurant-api-review',
          },
        },
        {
          // Caching gambar restoran
          urlPattern: ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/images/'),
          handler: 'CacheFirst', // Menggunakan CacheFirst untuk gambar, agar lebih cepat memuat gambar yang sudah ada.
          options: {
            cacheName: 'restaurant-images',
            expiration: {
              maxEntries: 50, // Maksimal 50 gambar yang disimpan di cache
              maxAgeSeconds: 7 * 24 * 60 * 60, // Gambar disimpan selama 7 hari
            },
          },
        },
      ],
    }),
    new ImageminWebpackPlugin({
      plugins: [
        ImageminMozjpeg({
          quality: 50,
          progressive: true,
        }),
      ],
    }),
    new BundleAnalyzerPlugin(),
  ],
};
