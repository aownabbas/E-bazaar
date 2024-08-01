import client from ".";
import endPoints from "./endPoints";

export const _getCategories = async (payload) => {
    return await client.get(endPoints.CATEGORIES);
};

export const _getBannerList = async (payload) => {
  return await client.get(endPoints.BANNER_LIST);
};

export const _searchedCategories = async (payload) => {
  return await client.post(`${endPoints.SEARCHED_PRODUCTS}`,payload);
};