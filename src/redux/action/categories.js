import { CATEGORIES, BANNER_LIST } from "../types";

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
