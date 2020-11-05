import { GET_USER_START } from "../actions/index.js";

const initialState = {
  currentUser: {},
};

const currentUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_START:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default currentUserReducer;
