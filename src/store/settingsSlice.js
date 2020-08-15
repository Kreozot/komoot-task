import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
  name: 'settings',
  initialState: {
    mapCenter: [51.505, -0.09],
    mapZoom: 13
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
