import { CATEGORIES, BANNER_LIST } from "../types";

const initialState = {
  loading: false,
  categoriesList: [],
  _bannerList: {},
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
