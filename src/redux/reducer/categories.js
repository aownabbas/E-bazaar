import { CATEGORIES } from "../types";

const initialState = {
  loading: false,
  categoriesList: [],
  error: "",
};

const _categoriesList = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORIES:
      return {
        loading: false,
        categoriesList: action.payload,
        error: "",
      };
      break;
    default:
      return state;
  }
};
export default _categoriesList;
