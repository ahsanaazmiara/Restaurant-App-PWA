/* eslint-disable linebreak-style */
import TheRestaurantDbSource from '../../data/therestaurantdb-source';
import { createRestaurantItemTemplate } from '../../views/template/template-creator';

const Home = {
  async render() {
    return `
    <div class="hero">
        <picture>
            <source media="(max-width: 600px)" srcset="/images/heros/hero-image_2.jpg">
            <img src='/images/heros/hero-image_2.jpg' 
                 alt="Delicious spread of restaurant dishes" >
          </picture>
    </div>
      <div class="content">
        <h2 tabindex="0">Explore Restaurant</h2>
        <section id="restaurants" class="restaurant-list"></section>
        <section class="tips" tabindex="0">
            <h2 tabindex="0">Tips Memilih Restoran</h2>
            <ul>
                <li><strong>Cek Ulasan:</strong> Baca ulasan dan rating dari pengunjung lain untuk mengetahui kualitas makanan dan layanan.</li>
                <li><strong>Perhatikan Menu:</strong> Pastikan restoran menawarkan variasi menu yang sesuai dengan selera Anda.</li>
                <li><strong>Lokasi dan Aksesibilitas:</strong> Pilih restoran yang mudah dijangkau dan memiliki fasilitas parkir yang memadai.</li>
                <li><strong>Coba Kunjungi Saat Senja:</strong> Suasana restoran bisa berbeda di malam hari. Coba kunjungi saat senja untuk pengalaman yang lebih baik.</li>
            </ul>
        </section>
        <section class="culinary-events" tabindex="0">
            <h2 tabindex="0">Event Kuliner Mendatang</h2>
            <p>Bergabunglah dalam festival makanan tahunan di kota Anda! Nikmati berbagai hidangan dari berbagai restoran dan pelajari lebih lanjut tentang budaya kuliner lokal.</p>
        </section>
      </div>
    `;
  },

  async afterRender() {
    const restaurants = await TheRestaurantDbSource.homeRestaurants();
    const restaurantsContainer = document.querySelector('#restaurants');
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default Home;