
import { CART_ITEMS } from "../types";

const initialState={
    loading:false,
    cartItems:[],
    error:""
}

const cartReducer=(state=initialState,action)=>{
    switch (action.type) {
            case CART_ITEMS:
      console.log(action.payload, "after action");
                return{
                    loading:false,
                    cartItems:action.payload,
                    error:""
                }
            break;
        default:
            return state
    }
}
export default cartReducer;
  