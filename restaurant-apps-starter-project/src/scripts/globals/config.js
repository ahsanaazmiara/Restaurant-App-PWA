/* eslint-disable linebreak-style */
const CONFIG = {
  BASE_URL: 'https://restaurant-api.dicoding.dev',
  BASE_IMAGE_URL: {
    small: (pictureId) => `https://restaurant-api.dicoding.dev/images/small/${pictureId}`,
    medium: (pictureId) => `https://restaurant-api.dicoding.dev/images/medium/${pictureId}`,
    large: (pictureId) => `https://restaurant-api.dicoding.dev/images/large/${pictureId}`,
  },
  DEFAULT_LANGUAGE: 'en-us',
  DATABASE_NAME: 'restaurant-database',
  DATABASE_VERSION: 1,
  OBJECT_STORE_NAME: 'restaurants',
};

export default CONFIG;