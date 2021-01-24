import { APPEND_MESSAGE, IS_TYPING, NOT_TYPING } from "../actions/index.js";

const initialState = {
  messages: [],
  isTyping: false,
  typist: null,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case APPEND_MESSAGE:
      const temp = [...state.messages, action.payload];
      return {
        ...state,
        messages: temp,
      };

    case IS_TYPING:
      return {
        ...payload,
        isTyping: true,
        typist: action.payload.username,
      };

    case NOT_TYPING:
      return {
        ...state,
        isTyping: false,
        typist: null,
      };
    default:
      return state;
  }
};

export default chatReducer;
