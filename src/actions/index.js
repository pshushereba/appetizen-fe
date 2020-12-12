import axiosWithAuth from "../utils/axiosAuth.js";

export const REGISTER_USER = "REGISTER_USER";
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";

export const GET_USER_START = "GET_USERS_START";
export const GET_USER_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USER_FAIL = "GET_USERS_FAIL";

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

export const registerUser = (newUser) => (dispatch) => {
  axiosWithAuth()
    .post("/auth/register", newUser)
    .then((res) => {
      dispatch({ type: REGISTER_USER, payload: res.data });
    })
    .catch((err) => console.log(err));
};

export const loginUser = (credentials) => (dispatch) => {
  console.log("loginUser Fired");
  axiosWithAuth()
    .post("/auth/login", credentials)
    .then((res) => {
      dispatch({ type: LOGIN_USER, payload: res.data });
    })
    .catch((err) => console.log(err));
};

export const logoutUser = () => (dispatch) => {
  dispatch({ type: LOGOUT_USER });
};

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
      `https://appetizen-be.herokuapp.com/api/accounts/${acctID}`,
      updatedAccount
    )
    .then((res) => {
      dispatch({ type: UPDATE_ACCOUNT_SUCCESS, payload: res.data });
    })
    .catch((err) => dispatch({ type: UPDATE_ACCOUNT_FAIL, payload: err }));
};
