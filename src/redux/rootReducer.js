import { combineReducers } from 'redux';
import cartReducer from "./reducer/cartReducers";
import _categoriesList, { _bannerList } from './reducer/categories';


const rootReducer = combineReducers({
    _items: cartReducer,
    categoriesList: _categoriesList,
    _baners:_bannerList
});

export default rootReducer;