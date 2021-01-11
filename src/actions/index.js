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

export const UPDATE_PEER_START = "UPDATE_PEER_START";
export const UPDATE_PEER_SUCCESS = "UPDATE_PEER_SUCCESS";
export const UPDATE_PEER_FAIL = "UPDATE_PEER_FAIL";

// Stream Reducer Action Variables

export const RESERVE_ROOM_START = "RESERVE_ROOM_START";
export const RESERVE_ROOM_SUCCESS = "RESERVE_ROOM_SUCCESS";
export const RESERVE_ROOM_FAIL = "RESERVE_ROOM_FAIL";

export const GET_ACTIVE_USERS_START = "GET_ACTIVE_USERS_START";
export const GET_ACTIVE_USERS_SUCCESS = "GET_ACTIVE_USERS_SUCCESS";
export const GET_ACTIVE_USERS_FAIL = "GET_ACTIVE_USERS_FAIL";

//let myPeer;

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
      dispatch({ type: LOGIN_USER, payload: res.data });
      history.push(`/${res.data.username}/dashboard`);
      // myPeer = new Peer();
      // dispatch({ type: UPDATE_PEER_ID_START });
      // try {
      //   dispatch({ type: UPDATE_PEER_ID_SUCCESS, payload: myPeer.id });
      // } catch {
      //   dispatch({ type: UPDATE_PEER_ID_FAIL, payload: error });
      // }
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
      `https://appetizen-be.herokuapp.com/api/accounts/${acctID}`,
      updatedAccount
    )
    .then((res) => {
      dispatch({ type: UPDATE_ACCOUNT_SUCCESS, payload: res.data });
    })
    .catch((err) => dispatch({ type: UPDATE_ACCOUNT_FAIL, payload: err }));
};

export const updateProfilePicture = (id, photo) => (dispatch) => {
  // Possibly add config object. TBD.

  dispatch({ type: UPDATE_PROFILE_PICTURE_START });
  axiosWithAuth()
    .post(`/users/${id}/photo`, photo)
    .then((res) => {
      dispatch({
        type: UPDATE_PROFILE_PICTURE_SUCCESS,
        payload: res.data.avatar,
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

export const updatePeer = (peerObj) => (dispatch) => {
  dispatch({ type: UPDATE_PEER_START });
  try {
    console.log("in updatePeerId action", peerObj);
    dispatch({ type: UPDATE_PEER_SUCCESS, payload: peerObj });
  } catch {
    dispatch({ type: UPDATE_PEER_FAIL, payload: error });
  }
};
