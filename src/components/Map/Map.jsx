import React, { useState, useEffect, useCallback } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import { routeSlice, getLatLngArray } from 'store';
import { isMarkerExists, isCoordsExists } from 'common';

import styles from './Map.module.scss';

// Workaround for this known Leaflet bug: https://github.com/Leaflet/Leaflet/issues/4968
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [13, 38]
});
L.Marker.prototype.options.icon = DefaultIcon;

function Map(props) {
  const {
    route,
    routeArray,
    addPoint,
  } = props;

  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [polyline, setPolyline] = useState(null);

  const handleMapCLick = useCallback((event) => {
    addPoint(event.latlng);
  }, [addPoint]);

  useEffect(() => {
    const mapInstance = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapInstance);

    mapInstance.on('click', handleMapCLick);

    setMap(mapInstance);
  }, [handleMapCLick]);

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

    route.forEach((coords) => {
      if (!isMarkerExists(markers, coords)) {
        const marker = new L.Marker(coords);
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
  }, [map, route, markers, routeArray, polyline]);

  return (
  <div id="map" className={ styles.map }>{console.log(markers)}</div>
  );
}

const mapStateToProps = (state) => ({
  route: state.route,
  routeArray: getLatLngArray(state),
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  addPoint: routeSlice.actions.addPoint,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Map);
