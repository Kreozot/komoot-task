import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
  name: 'settings',
  initialState: {
    mapCenter: [36.25, 137.64],
    mapZoom: 14
  },
  reducers: {
    setMapCenter(state, action) {
      return {
        ...state,
        mapCenter: action.payload,
      };
    },
    setMapZoom(state, action) {
      return {
        ...state,
        mapZoom: action.payload,
      };
    },
  },
});
