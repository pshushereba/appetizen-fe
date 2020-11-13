import axiosWithAuth from "../utils/axiosAuth.js";

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
    .get(`https://appetizen-be.herokuapp.com/api/account/${username}`)
    .then((res) => {
      dispatch({ type: GET_ACCOUNT_SUCCESS, payload: res.data });
    })
    .catch((err) => dispatch({ type: GET_ACCOUNT_FAIL, payload: err }));
};

export const updateAccount = (acctID, updatedAccount) => (dispatch) => {
  dispatch({ type: UPDATE_ACCOUNT_START });
  axiosWithAuth()
    .put(
      `https://appetizen-be.herokuapp.com/api/account/${acctID}`,
      updatedAccount
    )
    .then((res) => {
      dispatch({ type: UPDATE_ACCOUNT_SUCCESS, payload: res.data });
    })
    .catch((err) => dispatch({ type: UPDATE_ACCOUNT_FAIL, payload: err }));
};
