import {
  LOAD_CHAT_HISTORY_START,
  LOAD_CHAT_HISTORY_SUCCESS,
  LOAD_CHAT_HISTORY_FAIL,
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
  isFetching: null,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case APPEND_MESSAGE:
      const temp = [...state.messages, action.payload];
      return {
        ...state,
        messages: temp,
      };

    case LOAD_CHAT_HISTORY_START:
      return {
        ...state,
        isFetching: true,
      };

    case LOAD_CHAT_HISTORY_SUCCESS:
      return {
        ...state,
        messages: action.payload,
        isFetching: false,
      };

    case LOAD_CHAT_HISTORY_FAIL:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
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
