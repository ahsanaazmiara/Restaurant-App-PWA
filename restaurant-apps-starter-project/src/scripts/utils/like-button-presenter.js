/* eslint-disable linebreak-style */
/* eslint-disable linebreak-style */
import { createLikeButtonTemplate, createLikedButtonTemplate } from '../views/template/template-creator'; // Path yang benar

const LikeButtonPresenter = {
  async init({ likeButtonContainer, favoriteRestaurants, restaurant }) {
    this._likeButtonContainer = likeButtonContainer;
    this._restaurant = restaurant;
    this._favoriteRestaurants = favoriteRestaurants; // favoriteRestaurants diberikan melalui parameter

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurant;

    if (await this._isRestaurantExist(id)) {
      this._renderLiked(); // Restaurant sudah ada di daftar favorit
    } else {
      this._renderLike(); // Restaurant belum ada di daftar favorit
    }
  },

  async _isRestaurantExist(id) {
    const restaurant = await this._favoriteRestaurants.getRestaurant(id); // Menggunakan this._favoriteRestaurants
    return !!restaurant;
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = createLikeButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await this._favoriteRestaurants.putRestaurant(this._restaurant); // Menambahkan restaurant ke daftar favorit
      this._renderButton(); // Render ulang untuk memperbarui status tombol
    });
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = createLikedButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await this._favoriteRestaurants.deleteRestaurant(this._restaurant.id); // Menghapus restaurant dari daftar favorit
      this._renderButton(); // Render ulang untuk memperbarui status tombol
    });
  },
};

export default LikeButtonPresenter;
