import { CART_ITEMS } from "../types";

export const _getItem = (data) => {
  return {
    type: CART_ITEMS,
    payload: data,
  };
};

const getCartItems = (params) => {
  return (dispatch) => {
    dispatch(_getItem(params));
  };
};
export default getCartItems;
