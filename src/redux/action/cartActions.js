import { CART_ITEMS } from "../types";

export const _getItem=(data)=>{
    console.log(data, "on action");
    return{
        type:CART_ITEMS,
        payload:data
    }
    }

const getCartItems=(params)=>{
    return(dispatch)=>{
        console.log(params, "before action")
        dispatch(_getItem(params))
    }
}
export default getCartItems