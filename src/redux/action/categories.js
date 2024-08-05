import { CATEGORIES, BANNER_LIST,GET_SEARCHED_PRODUCTS, GET_SEARCH_PARAMS } from "../types";

export const _getItem = (data) => {
  return {
    type: CATEGORIES,
    payload: data,
  };
};

const _getCategoriesList = (params) => {
  return (dispatch) => {
    dispatch(_getItem(params));
  };
};
export default _getCategoriesList;

export const _getBannersList = (data) => {
  return (dispatch) => {
    dispatch({
      type: BANNER_LIST,
      payload: data,
    });
  };
};

export const getSearchedProducts = (data) => {
  
  return (dispatch) => {
    dispatch({
      type: GET_SEARCHED_PRODUCTS,
      payload: data,
    });
  };
};

export const getSearchParameters = (data) => {
  return (dispatch) => {
    dispatch({
      type: GET_SEARCH_PARAMS,
      payload: data,
    });
  };
};
