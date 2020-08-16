import { routeSlice } from '.';

const initialState = [
  { lat: 1, lng: 1 },
  { lat: 2, lng: 2 },
  { lat: 3, lng: 3 },
]

test('addPoint', () => {
  const newPoint = { lat: 4, lng: 4 };
  expect(
    routeSlice.reducer([ ...initialState ], {
      type: routeSlice.actions.addPoint.type,
      payload: { ...newPoint }
    })
  ).toEqual(
    [
      { lat: 1, lng: 1 },
      { lat: 2, lng: 2 },
      { lat: 3, lng: 3 },
      { lat: 4, lng: 4 }
    ]
  );
});

test('removePoint', () => {
  expect(
    routeSlice.reducer([ ...initialState ], {
      type: routeSlice.actions.removePoint.type,
      payload: { index: 1 }
    })
  ).toEqual(
    [
      { lat: 1, lng: 1 },
      { lat: 3, lng: 3 },
    ]
  );
  expect(
    routeSlice.reducer([ ...initialState ], {
      type: routeSlice.actions.removePoint.type,
      payload: { index: 0 }
    })
  ).toEqual(
    [
      { lat: 2, lng: 2 },
      { lat: 3, lng: 3 },
    ]
  );
  expect(
    routeSlice.reducer([ ...initialState ], {
      type: routeSlice.actions.removePoint.type,
      payload: { index: 2 }
    })
  ).toEqual(
    [
      { lat: 1, lng: 1 },
      { lat: 2, lng: 2 },
    ]
  );
});

test('movePoint', () => {
  expect(
    routeSlice.reducer([ ...initialState ], {
      type: routeSlice.actions.movePoint.type,
      payload: { sourceIndex: 2, destinationIndex: 1 }
    })
  ).toEqual(
    [
      { lat: 1, lng: 1 },
      { lat: 3, lng: 3 },
      { lat: 2, lng: 2 },
    ]
  );
  expect(
    routeSlice.reducer([ ...initialState ], {
      type: routeSlice.actions.movePoint.type,
      payload: { sourceIndex: 0, destinationIndex: 2 }
    })
  ).toEqual(
    [
      { lat: 2, lng: 2 },
      { lat: 3, lng: 3 },
      { lat: 1, lng: 1 },
    ]
  );
  expect(
    routeSlice.reducer([ ...initialState ], {
      type: routeSlice.actions.movePoint.type,
      payload: { sourceIndex: 2, destinationIndex: 0 }
    })
  ).toEqual(
    [
      { lat: 3, lng: 3 },
      { lat: 1, lng: 1 },
      { lat: 2, lng: 2 },
    ]
  );
});
