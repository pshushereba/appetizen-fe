import {
  GET_ACCOUNT_START,
  GET_ACCOUNT_SUCCESS,
  GET_ACCOUNT_FAIL,
  UPDATE_ACCOUNT_START,
  UPDATE_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_FAIL,
} from "../actions/index.js";

const initialState = {
  account: {},
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ACCOUNT_START:
      return {
        ...state,
      };
    case GET_ACCOUNT_SUCCESS:
      return {
        ...state,
        account: action.payload,
      };
    case GET_ACCOUNT_FAIL:
      return {
        ...state,
      };
    case UPDATE_ACCOUNT_START:
      return {
        ...state,
      };
    case UPDATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        account: action.payload,
      };
    case UPDATE_ACCOUNT_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default accountReducer;
