export const CART_ITEMS = "CART_ITEMS";

export const _getAllCardItems = (data) => {
    console.log(data,"33333");
  return (dispatch) => {
    dispatch({
      type: CART_ITEMS,
      payload: data,
    });
  };
};