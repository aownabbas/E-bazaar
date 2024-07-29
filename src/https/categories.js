import client from ".";
import endPoints from "./endPoints";

export const _getCategories = async (payload) => {
    return await client.get(endPoints.CATEGORIES);
  };