import {
  RESERVE_ROOM_START,
  RESERVE_ROOM_SUCCESS,
  RESERVE_ROOM_FAIL,
  GET_ACTIVE_USERS_START,
  GET_ACTIVE_USERS_SUCCESS,
  GET_ACTIVE_USERS_FAIL,
} from "../actions/index.js";

const initialState = {
  reservedRoom: "",
  activeUsers: [],
  isFetching: false,
  error: "",
};

const streamReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESERVE_ROOM_START:
      return {
        ...state,
        isFetching: true,
        error: "",
      };

    case RESERVE_ROOM_SUCCESS:
      return {
        ...state,
        isFetching: false,
        reservedRoom: action.payload,
      };

    case RESERVE_ROOM_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case GET_ACTIVE_USERS_START:
      return {
        ...state,
        isFetching: true,
        error: "",
      };
    case GET_ACTIVE_USERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        activeUsers: action.payload,
      };
    case GET_ACTIVE_USERS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default streamReducer;
