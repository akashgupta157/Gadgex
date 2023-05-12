import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { productReducer } from "./productReducer/reducer";
import {SProductReducer} from './singleProductReducer/reducer'
import thunk from "redux-thunk";
const rootReducer = combineReducers({
  productReducer,SProductReducer
});
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
