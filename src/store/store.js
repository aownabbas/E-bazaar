import { createStore, applyMiddleware } from "redux";
import rootReducer from "../redux/rootReducer";
import { thunk } from "redux-thunk"; // Importing redux-thunk as a named import

const middlewares = [thunk]; // Adding thunk middleware

// Creating redux store
export const store = createStore(rootReducer, applyMiddleware(...middlewares));
