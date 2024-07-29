import { combineReducers } from 'redux';
import cartReducer from "./reducer/cartReducers";
import _categoriesList from './reducer/categories';


const rootReducer = combineReducers({
    _items: cartReducer,
    categoriesList: _categoriesList
});

export default rootReducer;