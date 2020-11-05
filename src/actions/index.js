import axiosWithAuth from "../utils/axiosAuth.js";

export const GET_USER_START = "GET_USERS_START";
export const GET_USER_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USER_FAIL = "GET_USERS_FAIL";

export const getUsers = () => (dispatch) => {
  console.log("getUsers Fired");
  dispatch({ type: GET_USER_START });
  axiosWithAuth()
    .get("")
    .then((res) => {
      dispatch({ type: GET_USER_SUCCESS, payload: res.data });
    })
    .catch((err) => dispatch({ type: GET_USER_FAIL, payload: err }));
};
