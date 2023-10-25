import { combineReducers } from "redux";
import authReducer from "./authReducer";
import imgReducer from "./imgReducer";
import aiReducer from "./aiReducer";
import mockupReducer from "./mockupReducer";
import superResReducer from "./superResReducer";
import toCreateReducer from "./toCreateReducer";
import pricingReducer from "./pricingReducer";
import modelReducer from "./modelReducer";
import textReducer from "./textReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  img: imgReducer,
  aiObj: aiReducer,
  mockupObj: mockupReducer,
  superResObj: superResReducer,
  toCreate: toCreateReducer,
  pricingObj: pricingReducer,
  modelObj: modelReducer,
  textObj: textReducer
});

export default rootReducer;
