import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { thunk } from "redux-thunk"

import authReducer from "./slices/authSlice"
import gameReducer from "./slices/gameSlice"
import challengeReducer from "./slices/challengeSlice"
import uiReducer from "./slices/uiSlice"

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // only auth will be persisted
}

const rootReducer = combineReducers({
  auth: authReducer,
  game: gameReducer,
  challenge: challengeReducer,
  ui: uiReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat(thunk),
  devTools: process.env.NODE_ENV !== "production",
})

export const persistor = persistStore(store)

