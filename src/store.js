import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { persistStore, persistReducer, createTransform } from "redux-persist";
import JSOG from "jsog";

// Import reducers

import userReducer from "./reducers/userReducer.js";
import accountReducer from "./reducers/accountReducer.js";
import streamReducer from "./reducers/streamReducer.js";

// Create transform

export const JSOGTransform = createTransform(
  (inboundState, key) => JSOG.encode(inboundState),
  (outboundState, key) => JSOG.decode(outboundState)
);

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2,
  transforms: [JSOGTransform],
};

const userPersistConfig = {
  key: "User",
  storage: storage,
  stateReconsiler: autoMergeLevel2,
};

const accountPersistConfig = {
  key: "Account",
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

const streamPersistConfig = {
  key: "Stream",
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
  User: persistReducer(userPersistConfig, userReducer),
  Account: persistReducer(accountPersistConfig, accountReducer),
  Stream: persistReducer(streamPersistConfig, streamReducer),
});

const customPersistReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  customPersistReducer,
  compose(
    applyMiddleware(thunk, logger),
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ === "undefined"
      ? (a) => a
      : window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export const persistor = persistStore(store);
