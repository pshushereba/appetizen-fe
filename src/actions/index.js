import axiosWithAuth from "../utils/axiosAuth.js";

export const REGISTER_USER = "REGISTER_USER";
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";

export const GET_USER_START = "GET_USERS_START";
export const GET_USER_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USER_FAIL = "GET_USERS_FAIL";

export const UPDATE_PROFILE_PICTURE_START = "UPDATE_PROFILE_PICTURE_START";
export const UPDATE_PROFILE_PICTURE_SUCCESS = "UPDATE_PROFILE_PICTURE_SUCCESS";
export const UPDATE_PROFILE_PICTURE_FAIL = "UPDATE_PROFILE_PICTURE_FAIL";

export const SUBSCRIBE_TO_NEWSLETTER_START = "SUBSCRIBE_TO_NEWSLETTER_START";
export const SUBSCRIBE_TO_NEWSLETTER_SUCCESS =
  "SUBSCRIBE_TO_NEWSLETTER_SUCCESS";
export const SUBSCRIBE_TO_NEWSLETTER_FAIL = "SUBSCRIBE_TO_NEWSLETTER_FAIL";

// Submit Contact Form Action Variables

export const SUBMIT_CONTACT_FORM_START = "SUBMIT_CONTACT_FORM_START";
export const SUBMIT_CONTACT_FORM_SUCCESS = "SUBMIT_CONTACT_FORM_SUCCESS";
export const SUBMIT_CONTACT_FORM_FAIL = "SUBMIT_CONTACT_FORM_FAIL";

// User Account Reducer Action Variables

export const GET_ACCOUNT_START = "GET_ACCOUNT_START";
export const GET_ACCOUNT_SUCCESS = "GET_ACCOUNT_SUCCESS";
export const GET_ACCOUNT_FAIL = "GET_ACCOUNT_FAIL";

export const UPDATE_ACCOUNT_START = "UPDATE_ACCOUNT_START";
export const UPDATE_ACCOUNT_SUCCESS = "UPDATE_ACCOUNT_SUCCESS";
export const UPDATE_ACCOUNT_FAIL = "UPDATE_ACCOUNT_FAIL";

export const SEARCH_USER_START = "SEARCH_USER_START";
export const SEARCH_USER_SUCCESS = "SEARCH_USER_SUCCESS";
export const SEARCH_USER_FAIL = "SEARCH_USER_FAIL";

export const UPDATE_PEER_ID_START = "UPDATE_PEER_ID_START";
export const UPDATE_PEER_ID_SUCCESS = "UPDATE_PEER_ID_SUCCESS";
export const UPDATE_PEER_ID_FAIL = "UPDATE_PEER_ID_FAIL";

// Stream Reducer Action Variables

export const RESERVE_ROOM_START = "RESERVE_ROOM_START";
export const RESERVE_ROOM_SUCCESS = "RESERVE_ROOM_SUCCESS";
export const RESERVE_ROOM_FAIL = "RESERVE_ROOM_FAIL";

export const GET_ACTIVE_USERS_START = "GET_ACTIVE_USERS_START";
export const GET_ACTIVE_USERS_SUCCESS = "GET_ACTIVE_USERS_SUCCESS";
export const GET_ACTIVE_USERS_FAIL = "GET_ACTIVE_USERS_FAIL";

// Chat Reducer Action Variables

export const APPEND_MESSAGE = "APPEND_MESSAGE";
export const IS_TYPING = "IS_TYPING";
export const NOT_TYPING = "NOT_TYPING";

export const CLEAR_CHAT_START = "CLEAR_CHAT_START";
export const CLEAR_CHAT_SUCCESS = "CLEAR_CHAT_SUCCESS";
export const CLEAR_CHAT_FAIL = "CLEAR_CHAT_FAIL";

export const LOAD_CHAT_HISTORY_START = "LOAD_CHAT_HISTORY_START";
export const LOAD_CHAT_HISTORY_SUCCESS = "LOAD_CHAT_HISTORY_SUCCESS";
export const LOAD_CHAT_HISTORY_FAIL = "LOAD_CHAT_HISTORY_FAIL";

export const registerUser = (newUser) => (dispatch) => {
  axiosWithAuth()
    .post("/auth/register", newUser)
    .then((res) => {
      dispatch({ type: REGISTER_USER, payload: res.data });
    })
    .catch((err) => console.log(err));
};

export const loginUser = (credentials, history) => (dispatch) => {
  console.log("loginUser Fired");

  axiosWithAuth()
    .post("/auth/login", credentials)
    .then((res) => {
      console.log("response from login", res);
      dispatch({ type: LOGIN_USER, payload: res.data });
      history.push(`/${res.data.username}/dashboard`);
    })
    .catch((err) => console.log(err));
};

export const logoutUser = () => (dispatch) => {
  dispatch({ type: LOGOUT_USER });
};

export const searchUsers = (username) => (dispatch) => {};

export const getUsers = () => (dispatch) => {
  console.log("getUsers Fired");
  dispatch({ type: GET_USER_START });
  axiosWithAuth()
    .get("https://appetizen-be.herokuapp.com/api/")
    .then((res) => {
      dispatch({ type: GET_USER_SUCCESS, payload: res.data });
    })
    .catch((err) => dispatch({ type: GET_USER_FAIL, payload: err }));
};

export const getAccount = (username) => (dispatch) => {
  console.log("getAccount Fired");
  dispatch({ type: GET_ACCOUNT_START });
  axiosWithAuth()
    .get(`https://appetizen-be.herokuapp.com/api/accounts/${username}`)
    .then((res) => {
      console.log("getAccount data", res.data);
      dispatch({ type: GET_ACCOUNT_SUCCESS, payload: res.data });
    })
    .catch((err) => dispatch({ type: GET_ACCOUNT_FAIL, payload: err }));
};

export const updateAccount = (acctID, updatedAccount) => (dispatch) => {
  dispatch({ type: UPDATE_ACCOUNT_START });
  axiosWithAuth()
    .put(
      `https://appetizen-be.herokuapp.com/api/users/${acctID}`,
      updatedAccount
    )
    .then((res) => {
      dispatch({ type: UPDATE_ACCOUNT_SUCCESS, payload: res.data });
    })
    .catch((err) => dispatch({ type: UPDATE_ACCOUNT_FAIL, payload: err }));
};

export const updateProfilePicture = (id, photo) => (dispatch) => {
  dispatch({ type: UPDATE_PROFILE_PICTURE_START });
  axiosWithAuth()
    .post(`/users/${id}/photo`, photo)
    .then((res) => {
      dispatch({
        type: UPDATE_PROFILE_PICTURE_SUCCESS,
        payload: res.data.photoLink[0],
      });
    })
    .catch((err) => {
      dispatch({ type: UPDATE_PROFILE_PICTURE_FAIL, payload: err });
    });
};

export const reserveRoom = () => (dispatch) => {
  dispatch({ type: RESERVE_ROOM_START });
  axiosWithAuth()
    .get("https://appetizen-media.herokuapp.com/new")
    .then((res) => {
      console.log("reserveRoom fired");
      dispatch({ type: RESERVE_ROOM_SUCCESS, payload: res.data });
    })
    .catch((err) => dispatch({ type: RESERVE_ROOM_FAIL, payload: err }));
};

// export const goLive = () => (dispatch) => {};

export const getActiveUsers = () => (dispatch) => {
  dispatch({ type: GET_ACTIVE_USERS_START });
  axiosWithAuth()
    .get("https://appetizen-media.herokuapp.com/active")
    .then((res) => {
      console.log("getActiveUsers fired");
      dispatch({ type: GET_ACTIVE_USERS_SUCCESS, payload: res.data });
    })
    .catch((err) => dispatch({ type: GET_ACCOUNT_FAIL, payload: err }));
};

export const updatePeerId = (peerID) => (dispatch) => {
  dispatch({ type: UPDATE_PEER_ID_START });
  try {
    console.log("in updatePeerId action", peerID);
    dispatch({ type: UPDATE_PEER_ID_SUCCESS, payload: peerID });
  } catch {
    dispatch({ type: UPDATE_PEER_ID_FAIL, payload: error });
  }
};

export const subscribeToNewsletter = (email) => (dispatch) => {
  dispatch({ type: SUBSCRIBE_TO_NEWSLETTER_START });
  axiosWithAuth()
    .post(`https://appetizen-be.herokuapp.com/api/newsletter`, email)
    .then((res) =>
      dispatch({ type: SUBSCRIBE_TO_NEWSLETTER_SUCCESS, payload: res.data })
    )
    .catch((err) =>
      dispatch({ type: SUBSCRIBE_TO_NEWSLETTER_FAIL, payload: err })
    );
};

export const submitContactForm = (data) => (dispatch) => {
  console.log("submitContactForm Fired");
  dispatch({ type: SUBMIT_CONTACT_FORM_START });
  axiosWithAuth()
    .post(`https://formspree.io/f/${process.env.FORMSPREE_CONTACT_ID}`, data)
    .then((res) => {
      dispatch({ type: SUBMIT_CONTACT_FORM_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SUBMIT_CONTACT_FORM_FAIL, payload: err });
    });
};

export const appendMessage = (message) => (dispatch) => {
  dispatch({ type: APPEND_MESSAGE, payload: message });
};

export const isTyping = (data) => (dispatch) => {
  dispatch({ type: IS_TYPING, payload: data });
};

export const notTyping = (data) => (dispatch) => {
  dispatch({ type: NOT_TYPING, payload: data });
};

export const clearChat = () => (dispatch) => {
  dispatch({ type: CLEAR_CHAT_START });
  try {
    dispatch({ type: CLEAR_CHAT_SUCCESS });
  } catch {
    dispatch({ type: CLEAR_CHAT_FAIL, payload: error });
  }
};
