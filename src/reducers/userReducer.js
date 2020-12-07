import { GET_USER_START } from "../actions/index.js";

const initialState = {
  isAuthenticated: false,
  first_name: "",
  last_name: "",
  username: "",
  email: "",
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
    case GET_USER_START:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default userReducer;
