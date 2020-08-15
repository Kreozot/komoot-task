import React, { useState, useEffect, useCallback } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import L from 'leaflet';

import { routeSlice, settingsSlice, getLatLngArray } from 'store';
import { isMarkerExists, isCoordsExists, isCoordsEqual } from 'common';
import { getMarkerIcon } from './marker';

import styles from './Map.module.scss';

function Map(props) {
  const {
    route,
    routeArray,
    addPoint,
    hoverPoint,
    setCoords,
    mapCenter,
    mapZoom,
    saveMapCenter,
    saveMapZoom,
  } = props;

  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [polyline, setPolyline] = useState(null);

  const handleMapClick = useCallback((event) => {
    addPoint(event.latlng);
  }, [addPoint]);

  useEffect(() => {
    if (!map && mapCenter && mapZoom) {
      const mapInstance = L.map('map').setView(mapCenter, mapZoom);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstance);

      setMap(mapInstance);
    }
  }, [map, mapCenter, mapZoom]);

  const handleMapZoomEnd = useCallback(() => saveMapZoom(map.getZoom()), [map, saveMapZoom]);
  const handleMapMoveEnd = useCallback(() => saveMapCenter(map.getCenter()), [map, saveMapCenter]);

  useEffect(() => {
    if (map) {
      map.off('click');
      map.on('click', handleMapClick);
      map.off('zoomend');
      map.on('zoomend', handleMapZoomEnd);
      map.off('moveend');
      map.on('moveend', handleMapMoveEnd);
    }
  }, [map, handleMapClick, handleMapZoomEnd, handleMapMoveEnd]);

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
          // setCoords({ index, latlng });
        });
        marker.off('dragend');
        marker.on('dragend', (event) => {
          console.log('dragend');
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

  return <div id="map" className={ styles.map } />;
}

const mapStateToProps = (state) => ({
  route: state.route,
  hoverPoint: state.hoverPoint,
  mapCenter: state.settings.mapCenter,
  mapZoom: state.settings.mapZoom,
  routeArray: getLatLngArray(state),
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  addPoint: routeSlice.actions.addPoint,
  setCoords: routeSlice.actions.setCoords,
  saveMapCenter: settingsSlice.actions.setMapCenter,
  saveMapZoom: settingsSlice.actions.setMapZoom,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Map);
