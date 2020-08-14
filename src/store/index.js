import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createSelector } from 'reselect';

import routeSlice from './routeSlice';
import hoverPointSlice from './hoverPointSlice';

export { routeSlice, hoverPointSlice };

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['hoverPoint']
};

export const getLatLngArray = createSelector(
  (state) => state.route,
  (route) => {
    return route.map((item) => [item.lat, item.lng]);
  }
);

export const store = configureStore({
  reducer: persistReducer(persistConfig, combineReducers({
    route: routeSlice.reducer,
    hoverPoint: hoverPointSlice.reducer,
  })),
  middleware: [],
});

export const persistor = persistStore(store);
