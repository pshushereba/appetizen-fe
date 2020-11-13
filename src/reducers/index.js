import { combineReducers } from "redux";
import userReducer from "./userReducer.js";
import accountReducer from "./accountReducer.js";

const rootReducer = combineReducers({
  userReducer: userReducer,
  accountReducer: accountReducer,
});

export default rootReducer;
