import React, { useState, useEffect, useCallback } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import L from 'leaflet';

import { routeSlice, getLatLngArray } from 'store';
import { isMarkerExists, isCoordsExists, isCoordsEqual } from 'common';
import { getMarkerIcon } from './marker';
import Map from './Map';

function RouteMap(props) {
  const {
    route,
    routeArray,
    addPoint,
    hoverPoint,
    setCoords,
  } = props;

  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [polyline, setPolyline] = useState(null);

  const handleMapClick = useCallback((event) => {
    addPoint(event.latlng);
  }, [addPoint]);

  useEffect(() => {
    if (map) {
      map.off('click');
      map.on('click', handleMapClick);
    }
  }, [map, handleMapClick]);

  useEffect(() => {
    route.forEach((point, index) => {
      const marker = markers.find((marker) => {
        const markerLatLng = marker.getLatLng();
        return isCoordsEqual(markerLatLng, point);
      });
      if (marker) {
        const markerLatLng = marker.getLatLng();
        marker.setIcon(getMarkerIcon(index + 1, hoverPoint && isCoordsEqual(markerLatLng, hoverPoint)));

        marker.off('move');
        marker.on('move', (event) => {
          const { latlng } = event;
          const polylineLatLngs = polyline.getLatLngs();
          polylineLatLngs[index] = [latlng.lat, latlng.lng];
          polyline.setLatLngs(polylineLatLngs);
        });
        marker.off('dragend');
        marker.on('dragend', (event) => {
          const latlng = marker.getLatLng();
          setCoords({ index, latlng });
        });
      }
    });
  }, [route, markers, hoverPoint, polyline, setCoords]);

  useEffect(() => {
    if (!map) {
      return;
    }
    const newMarkers = [];
    const removedMarkers = [];

    if (!polyline) {
      const newPolyline = new L.Polyline(routeArray);
      newPolyline.addTo(map);
      setPolyline(newPolyline);
    } else {
      polyline.setLatLngs(routeArray);
    }

    route.forEach((coords, index) => {
      if (!isMarkerExists(markers, coords)) {
        const marker = new L.Marker(coords, {
          icon: getMarkerIcon(index + 1),
          draggable: true,
        });
        marker.addTo(map);
        newMarkers.push(marker);
      }
    });

    markers.forEach((marker) => {
      if (!isCoordsExists(route, marker._latlng)) {
        removedMarkers.push(marker);
      }
    });

    if (newMarkers.length || removedMarkers.length) {
      setMarkers(markers
        .filter((marker) => !removedMarkers.includes(marker))
        .concat(newMarkers)
      );
      removedMarkers.forEach((marker) => {
        marker.remove();
      });
    }
  // Avoid "markers" dependency - it causes eternal rerendering
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, route, routeArray, polyline]);

  return <Map id="map" setMapParent={ setMap }/>;
}

const mapStateToProps = (state) => ({
  route: state.route,
  hoverPoint: state.hoverPoint,
  routeArray: getLatLngArray(state),
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  addPoint: routeSlice.actions.addPoint,
  setCoords: routeSlice.actions.setCoords,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RouteMap);
