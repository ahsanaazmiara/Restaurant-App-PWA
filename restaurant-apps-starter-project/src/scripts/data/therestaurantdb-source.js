/* eslint-disable linebreak-style */
import API_ENDPOINT from '../globals/api-endpoint';

class TheRestaurantDbSource {
  static async homeRestaurants() {
    const response = await fetch(API_ENDPOINT.LIST);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  // Fetch favorite restaurants
  static async favoriteRestaurants() {
    const response = await fetch(API_ENDPOINT.FAVORITE);
    const responseJson = await response.json();

    // Check if the response is not an error and return the restaurants
    if (!responseJson.error) {
      return responseJson.restaurants;
    }

    throw new Error(responseJson.message);
  }

  // Fetch details of a specific restaurant
  static async detailRestaurant(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    const responseJson = await response.json();

    // Check if the response is not an error and return the restaurant details
    if (!responseJson.error) {
      return responseJson.restaurant;
    }

    throw new Error(responseJson.message);
  }
}

export default TheRestaurantDbSource;