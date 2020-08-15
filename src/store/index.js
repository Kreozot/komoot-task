import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createSelector } from 'reselect';

import routeSlice from './routeSlice';
import hoverPointSlice from './hoverPointSlice';
import settingsSlice from './settingsSlice';

export { routeSlice, hoverPointSlice, settingsSlice };

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

export const getRoute = createSelector(
  (state) => state.route,
  (route) => {
    return route.map((item, index) => ({
      title: `Waypoint ${ index + 1 }`,
      ...item
    }));
  }
);

export const store = configureStore({
  reducer: persistReducer(persistConfig, combineReducers({
    route: routeSlice.reducer,
    hoverPoint: hoverPointSlice.reducer,
    settings: settingsSlice.reducer,
  })),
  middleware: [],
});

export const persistor = persistStore(store);
