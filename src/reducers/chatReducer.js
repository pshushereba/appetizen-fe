import {
  APPEND_MESSAGE,
  IS_TYPING,
  NOT_TYPING,
  CLEAR_CHAT_START,
  CLEAR_CHAT_SUCCESS,
  CLEAR_CHAT_FAIL,
} from "../actions/index.js";

const initialState = {
  messages: [],
  isTyping: false,
  typist: null,
  error: null,
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
        ...state,
        isTyping: true,
        typist: action.payload.username,
      };

    case NOT_TYPING:
      return {
        ...state,
        isTyping: false,
        typist: null,
      };

    case CLEAR_CHAT_START:
      return state;

    case CLEAR_CHAT_SUCCESS:
      return {
        ...state,
        messages: [],
      };
    case CLEAR_CHAT_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default chatReducer;
