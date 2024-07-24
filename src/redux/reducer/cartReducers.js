import { CART_ITEMS } from "../action/cartActions"
  
  const initialState = {
    cartItems: "",
    // singleAddress: {},
  };
  
  export default function cartReducer(state = initialState, action) {
    console.log(state,"reducer");
    switch (action.type) {
      case CART_ITEMS:
        return {
          ...state,
          cartItems: action.payload,
        };
        break;
      default:
        return state;
    }
  }
  