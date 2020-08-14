import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
  name: 'hoverPoint',
  initialState: null,
  reducers: {
    setHoverPoint(state, action) {
      if (action.payload) {
        const { lat, lng } = action.payload;
        return { lat, lng };
      }
      return null;
    },
  },
});
