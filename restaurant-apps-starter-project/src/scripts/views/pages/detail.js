/* eslint-disable linebreak-style */
/* eslint-disable linebreak-style */
import UrlParser from '../../routes/url-parser';
import TheRestaurantDbSource from '../../data/therestaurantdb-source';
import { createRestaurantDetailTemplate } from '../template/template-creator';

const Detail = {
  async render() {
    return `
      <div class="content">
        <h2 class="content__heading" tabindex="0">Restaurant Detail</h2>
        <div id="restaurant" class="restaurant"></div>
        <div id="likeButtonContainer" class="like-button-container"></div>
      </div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await TheRestaurantDbSource.detailRestaurant(url.id);
    const restaurantContainer = document.querySelector('#restaurant');

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const date = new Date(dateString);
      return date.toLocaleDateString('id-ID', options);
    };

    restaurant.customerReviews = restaurant.customerReviews.map((review) => {
      review.date = formatDate(review.date);
      return review;
    });

    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

    // Dynamic import for LikeButtonPresenter and FavoriteRestaurantIdb
    const initLikeButton = async () => {
      const { default: LikeButtonPresenter } = await import('../../utils/like-button-presenter');
      const { default: FavoriteRestaurantIdb } = await import('../../data/favorite-restaurant-idb');

      LikeButtonPresenter.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        favoriteRestaurants: FavoriteRestaurantIdb,
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          description: restaurant.description,
          city: restaurant.city,
          address: restaurant.address,
          pictureId: restaurant.pictureId,
          rating: restaurant.rating,
        },
      });
    };

    // Initialize LikeButtonPresenter after rendering
    initLikeButton();

    // Back button event listener
    const backButton = document.getElementById('backButton');
    if (backButton) {
      backButton.addEventListener('click', () => {
        window.history.back();
      });
    }

    // Review form event listener
    const reviewForm = document.getElementById('reviewForm');
    reviewForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const nameInput = document.getElementById('nameInput').value;
      const reviewInput = document.getElementById('reviewInput').value;

      if (nameInput && reviewInput) {
        try {
          const response = await fetch('https://restaurant-api.dicoding.dev/review', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: restaurant.id,
              name: nameInput,
              review: reviewInput,
            }),
          });
          const responseJson = await response.json();

          if (!responseJson.error) {
            const newReview = {
              name: nameInput,
              review: reviewInput,
              date: formatDate(new Date().toISOString()),
            };

            restaurant.customerReviews.push(newReview);

            restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);
          } else {
            alert('Failed to submit your review');
          }
        } catch (error) {
          alert(`Error submitting review: ${error.message}`);
        }
      } else {
        alert('Please fill in both name and review fields');
      }
    });
  },
};

export default Detail;
