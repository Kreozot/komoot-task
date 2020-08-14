import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
  name: 'route',
  initialState: [],
  reducers: {
    addPoint(state, action) {
      const { lat, lng } = action.payload;
      return [
        ...state,
        { lat, lng },
      ];
    },
    setCoords(state, action) {
      const { index, latlng: { lat, lng } } = action.payload;
      return [
        ...state.slice(0, index),
        { lat, lng },
        ...state.slice(index + 1)
      ];
    },
    removePoint(state, action) {
      const { index } = action.payload;
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ];
    },
    movePoint(state, action) {
      const { sourceIndex, destinationIndex } = action.payload;

      if (sourceIndex === destinationIndex) {
        return state;
      }

      const smallerIndex = Math.min(sourceIndex, destinationIndex);
      const largerIndex = Math.max(sourceIndex, destinationIndex);
      return [
        ...state.slice(0, smallerIndex),
        ...(sourceIndex < destinationIndex
          ? state.slice(smallerIndex + 1, largerIndex + 1)
          : []),
        state[sourceIndex],
        ...(sourceIndex > destinationIndex
          ? state.slice(smallerIndex, largerIndex)
          : []),
        ...state.slice(largerIndex + 1),
      ];
    },
  },
});
