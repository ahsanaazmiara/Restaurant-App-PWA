/* eslint-disable linebreak-style */
/* eslint-disable linebreak-style */
import CONFIG from '../../globals/config';

const createRestaurantDetailTemplate = (restaurant) => `
  <div class="restaurant-detail">
    <button class="back-button" id="backButton" aria-label="Back to restaurant list">
      <i class="fa fa-arrow-left"></i>
    </button>
    
    <div class="restaurant-detail__header">
      <picture>
        <source media="(max-width: 600px)" data-srcset="${CONFIG.BASE_IMAGE_URL.small(restaurant.pictureId)}">
        <source media="(max-width: 1024px)" data-srcset="${CONFIG.BASE_IMAGE_URL.medium(restaurant.pictureId)}">
        <source media="(max-width: 1200px)" data-srcset="${CONFIG.BASE_IMAGE_URL.large(restaurant.pictureId)}">
        <img class="restaurant-detail__header__poster lazyload" crossorigin="anonymous" alt="${restaurant.name || 'Restaurant'}"
             data-src="${CONFIG.BASE_IMAGE_URL.large(restaurant.pictureId)}">
      </picture>
      <div class="restaurant-detail__header__rating">
        <p>⭐️<span class="restaurant-detail__header__rating__score">${restaurant.rating || 'N/A'}</span></p>
      </div>
    </div>
    <div class="restaurant-detail__content">
      <h3 tabindex="0">${restaurant.name || 'Restaurant Name Not Available'}</h3>
      <div class="restaurant__info">
        <p><strong>City:</strong> ${restaurant.city || 'City not available'}</p>
        <p><strong>Address:</strong> ${restaurant.address || 'Address not available'}</p>
      </div>
      <div class="restaurant__overview">
        <h4>Overview</h4>
        <p>${restaurant.description || 'No description available.'}</p>
      </div>
      <div class="restaurant__reviews">
        <h4>Customer Reviews</h4>
        ${restaurant.customerReviews.length > 0 ? `
          <ul>
            ${restaurant.customerReviews.map((review) => `
              <li>
                <strong>${review.name}</strong> (${review.date}): ${review.review}
              </li>
            `).join('')}
          </ul>
        ` : '<p>No reviews yet. Be the first to leave a review!</p>'}
      </div>

      <!-- Add Review Form -->
      <div class="restaurant__reviews">
        <h4 tabindex="0">Write Your Review!</h4>
        <div id="reviewFormContainer">
          <form id="reviewForm">
            <label for="nameInput">Your Name:</label>
            <input type="text" id="nameInput" placeholder="Enter your name" required />
            
            <label for="reviewInput">Your Review:</label>
            <textarea id="reviewInput" placeholder="Write your review" required></textarea>
            
            <button type="submit" aria-label="Submit Review">
              <i class="fa fa-paper-plane"></i> <!-- Button icon (optional) -->
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
`;

const createRestaurantItemTemplate = (restaurant) => `
  <div class="restaurant-item">
    <div class="restaurant-item__header">
      <picture>
        <source media="(max-width: 600px)" data-srcset="${CONFIG.BASE_IMAGE_URL.small(restaurant.pictureId)}">
        <source media="(max-width: 1024px)" data-srcset="${CONFIG.BASE_IMAGE_URL.medium(restaurant.pictureId)}">
        <source media="(max-width: 1200px)" data-srcset="${CONFIG.BASE_IMAGE_URL.large(restaurant.pictureId)}">
        <img class="restaurant-item__header__poster lazyload" crossorigin="anonymous" alt="${restaurant.name || '-'}"
             data-src="${CONFIG.BASE_IMAGE_URL.large(restaurant.pictureId)}">
      </picture>
      <div class="restaurant-item__header__rating">
        <p>⭐️<span class="restaurant-item__header__rating__score">${restaurant.rating || '-'}</span></p>
      </div>
    </div>
    <div class="restaurant-item__content">
      <h3 class="restaurant__name" tabindex="0"><a href="/#/detail/${restaurant.id}">${restaurant.name || '-'}</a></h3>
      <p>${restaurant.description || '-'}</p>
    </div>
  </div>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
};
