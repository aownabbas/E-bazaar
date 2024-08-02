import { combineReducers } from 'redux';
import cartReducer from "./reducer/cartReducers";
import _categoriesList, { _bannerList, getSearchedProducts, getSearchParams } from './reducer/categories';


const rootReducer = combineReducers({
    _items: cartReducer,
    categoriesList: _categoriesList,
    _baners:_bannerList,
    searchedProducts: getSearchedProducts,
    searchParams: getSearchParams
});

export default rootReducer;