export const getGpxFile = (pointsSection) => `<?xml version="1.0" encoding="UTF-8"?>
<gpx
xmlns="http://www.topografix.com/GPX/1/1"
version="1.1"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">
  <name>Route</name>
  ${ pointsSection }
</gpx>
`;

export const getGpxPoint = (lat, lng, title) => `
<wpt lat="${ lat }" lon="${ lng }">
  <name>${ title }</name>
</wpt>
`;

export const getRouteGpx = (route) => {
  const pointsSection = route
    .map(({ lat, lng, title }) => getGpxPoint(lat, lng, title))
    .join('');
  return getGpxFile(pointsSection);
}
