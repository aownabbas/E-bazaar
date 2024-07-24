import { combineReducers } from 'redux';
import cartReducer from "./reducer/cartReducers";


const rootReducer = combineReducers({
    _items: cartReducer
});

export default rootReducer;