/* eslint-disable no-undef */

const assert = require('assert');

Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('#query');

  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');

  I.amOnPage('/');

  I.seeElement('.restaurant__name a');
  const firstRestaurant = locate('.restaurant__name a').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');

  const likedRestaurantName = await I.grabTextFrom('.restaurant__name');

  assert.strictEqual(firstRestaurantName, likedRestaurantName);
});

Scenario('unliking a restaurant', async ({ I }) => {
  // Navigate to the home page and like a restaurant
  I.amOnPage('/');
  I.seeElement('.restaurant__name a');
  const firstRestaurant = locate('.restaurant__name a').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  // Go to the favorite page to confirm the restaurant is liked
  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');

  // Grab the name of the liked restaurant
  const likedRestaurantName = await I.grabTextFrom('.restaurant__name');
  assert.strictEqual(firstRestaurantName, likedRestaurantName);

  // Now, click the liked restaurant to go to its detail page
  I.click('.restaurant-item .restaurant__name a');

  // Ensure that the 'unlike' button is visible and click it to unlike
  I.seeElement('#likeButton');
  I.click('#likeButton');

  // Go back to the favorite page and ensure the restaurant is no longer there
  I.amOnPage('/#/favorite');
  I.dontSee('.restaurant-item');
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');
});

Scenario('searching restaurants', async ({ I }) => {
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');

  I.amOnPage('/');

  I.seeElement('.restaurant__name a');

  const names = [];


  for (let i = 1; i <= 3; i++) {
    I.click(locate('.restaurant__name a').at(i));

    I.seeElement('#likeButton');
    I.click('#likeButton');


    names.push(await I.grabTextFrom('.restaurant__name'));

    I.amOnPage('/');
  }

  I.amOnPage('/#/favorite');
  I.seeElement('#query');

  const visibleLikedRestaurants = await I.grabNumberOfVisibleElements('.restaurant-item');
  assert.strictEqual(names.length, visibleLikedRestaurants);

  const searchQuery = names[1].substring(1, 3);

  I.fillField('#query', searchQuery);
  I.pressKey('Enter');

  // mendapatkan daftar restoran yang sesuai dengan searchQuery
  const matchingRestaurants = names.filter((name) => name.indexOf(searchQuery) !== -1);
  const visibleSearchedLikedRestaurants = await I.grabNumberOfVisibleElements('.restaurant-item');

  assert.strictEqual(matchingRestaurants.length, visibleSearchedLikedRestaurants);


  for (let i = 0; i < matchingRestaurants.length; i++) {

    const visibleName = await I.grabTextFrom(locate('.restaurant__name').at(i + 1));

    assert.strictEqual(matchingRestaurants[i], visibleName);
  }
});
