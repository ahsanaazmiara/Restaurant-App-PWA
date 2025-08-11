/* eslint-disable linebreak-style */
import CONFIG from './config';

const API_ENDPOINT = {
  LIST: `${CONFIG.BASE_URL}/list`,
  DETAIL: (id) => `${CONFIG.BASE_URL}/detail/${id}`,
  FAVORITE: `${CONFIG.BASE_URL}/restaurants/favorite?language=${CONFIG.DEFAULT_LANGUAGE}&page=1`,
};

export default API_ENDPOINT;
