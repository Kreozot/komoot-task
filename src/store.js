import { createSlice, configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createSelector } from 'reselect';

const persistConfig = {
  key: 'root',
  storage,
};

export const routeSlice = createSlice({
  name: 'route',
  initialState: [],
  reducers: {
    addPoint(state, action) {
      return [
        ...state,
        { lat: action.payload.lat, lng: action.payload.lng },
      ];
    },
    removePoint(state, action) {
      const index = action.payload.index;
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ];
    },
  },
});

export const getLatLngArray = createSelector(
  (state) => state.route,
  (route) => {
    return route.map((item) => [item.lat, item.lng]);
  }
);

export const store = configureStore({
  reducer: persistReducer(persistConfig, combineReducers({
    route: routeSlice.reducer,
  })),
  middleware: [],
});

export const persistor = persistStore(store);
