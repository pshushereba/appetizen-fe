import {
  GET_USER_START,
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  UPDATE_PROFILE_PICTURE_START,
  UPDATE_PROFILE_PICTURE_SUCCESS,
  UPDATE_PROFILE_PICTURE_FAIL,
  UPDATE_PEER_START,
  UPDATE_PEER_SUCCESS,
  UPDATE_PEER_FAIL,
} from "../actions/index.js";

const initialState = {
  isAuthenticated: false,
  isUpdating: false,
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  userId: null,
  avatar_img: "",
  subscribers: [],
  videos: [],
  peer: null,
  videoStream: {
    stream: null,
    raw: null,
    playback: false,
    error: false,
  },
  imageUpload: {
    isUploading: false,
    progress: 0,
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

    case UPDATE_PROFILE_PICTURE_START:
      return {
        ...state,
        imageUpload: {
          ...state.imageUpload,
          isUploading: true,
          progress: 0,
        },
      };

    case UPDATE_PROFILE_PICTURE_SUCCESS:
      return {
        ...state,
        imageUpload: {
          ...state.imageUpload,
          isUploading: false,
          progress: 100,
        },
        avatar_img: action.payload,
      };

    case UPDATE_PROFILE_PICTURE_FAIL:
      return {
        ...state,
        imageUpload: {
          ...state.imageUpload,
          isUploading: false,
          progress: 0,
        },
        error: action.payload,
      };

    case UPDATE_PEER_START:
      return {
        ...state,
        isUpdating: true,
      };

    case UPDATE_PEER_SUCCESS:
      return {
        ...state,
        peer: action.payload,
        isUpdating: false,
      };

    case UPDATE_PEER_FAIL:
      return {
        ...state,
        isUploading: false,
      };

    default:
      return state;
  }
};

export default userReducer;
