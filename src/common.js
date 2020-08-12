export const isCoordsEqual = (coords1, coords2) => {
  return coords1.lat === coords2.lat && coords1.lng === coords2.lng;
}

export const isMarkerExists = (markers, coords) => {
  return markers.some((marker) => isCoordsEqual(marker._latlng, coords));
}

export const isCoordsExists = (coordsList, coords) => {
  return coordsList.some((item) => isCoordsEqual(item, coords));
}
