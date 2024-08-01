import { CATEGORIES, BANNER_LIST, GET_SEARCHED_PRODUCTS } from "../types";

const initialState = {
  loading: false,
  categoriesList: [],
  _bannerList: {},
  searchedProducts:[],
  error: "",
};

const _categoriesList = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORIES:
      return {
        loading: false,
        categoriesList: action.payload,
        error: "",
      };
      break;
    default:
      return state;
  }
};
export default _categoriesList;

export const _bannerList = (state = initialState, action) => {
  switch (action.type) {
    case BANNER_LIST:
      return {
        loading: false,
        _bannerList: action.payload,
        error: "",
      };
      break;
    default:
      return state;
  }
};

export const getSearchedProducts = (state = initialState, action) => {
  switch (action.type) {
    case GET_SEARCHED_PRODUCTS:
      return {
        loading: false,
        searchedProducts: action.payload,
        error: "",
      };
      break;
    default:
      return state;
  }
};
