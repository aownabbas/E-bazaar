import client from ".";
import endPoints from "./endPoints";

export const _getCategories = async (payload) => {
    return await client.get(endPoints.CATEGORIES);
};

export const _getSubCategories = async (payload) => {
  return await client.get(`${endPoints.SUB_CATEGORIES}/${payload}`);
};

export const _getBannerList = async (payload) => {
  return await client.get(endPoints.BANNER_LIST);
};