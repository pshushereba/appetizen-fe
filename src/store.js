import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { persistStore, persistReducer } from "redux-persist";

// Import reducers

import userReducer from "./reducers/userReducer.js";
import accountReducer from "./reducers/accountReducer.js";

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2,
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

const rootReducer = combineReducers({
  User: persistReducer(userPersistConfig, userReducer),
  Account: persistReducer(accountPersistConfig, accountReducer),
});

const customPersistReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  customPersistReducer,
  compose(
    applyMiddleware(thunk, logger),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export const persistor = persistStore(store);
