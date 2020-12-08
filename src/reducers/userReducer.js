import {
  GET_USER_START,
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
} from "../actions/index.js";

const initialState = {
  isAuthenticated: false,
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  userId: null,
  avatar_img: "",
  subscribers: [],
  videos: [],
  videoStream: {
    stream: null,
    raw: null,
    playback: false,
    error: false,
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        userId: action.payload.id,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        username: action.payload.username,
        email: action.payload.email,
        isAuthenticated: true,
      };

    case LOGIN_USER:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        userId: action.payload.id,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        username: action.payload.username,
        email: action.payload.email,
        isAuthenticated: true,
      };

    case LOGOUT_USER:
      localStorage.removeItem("token");
      return initialState;

    case GET_USER_START:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default userReducer;
