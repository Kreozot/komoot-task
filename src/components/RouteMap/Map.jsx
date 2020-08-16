import React, { useState, useEffect, useCallback } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import L from 'leaflet';

import { settingsSlice } from 'store';

import styles from './Map.module.scss';

function Map(props) {
  const {
    id,
    mapCenter,
    mapZoom,
    saveMapCenter,
    saveMapZoom,
    setMapParent,
  } = props;

  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!map && mapCenter && mapZoom) {
      const mapInstance = L.map(id).setView(mapCenter, mapZoom);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstance);

      setMap(mapInstance);
      setMapParent(mapInstance);
    }
  }, [map, mapCenter, mapZoom, setMapParent, id]);

  const handleMapZoomEnd = useCallback(() => saveMapZoom(map.getZoom()), [map, saveMapZoom]);
  const handleMapMoveEnd = useCallback(() => saveMapCenter(map.getCenter()), [map, saveMapCenter]);

  useEffect(() => {
    if (map) {
      map.off('zoomend');
      map.on('zoomend', handleMapZoomEnd);
      map.off('moveend');
      map.on('moveend', handleMapMoveEnd);
    }
  }, [map, handleMapZoomEnd, handleMapMoveEnd]);

  return <div id={ id } className={ styles.map } />;
}

const mapStateToProps = (state) => ({
  mapCenter: state.settings.mapCenter,
  mapZoom: state.settings.mapZoom,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  saveMapCenter: settingsSlice.actions.setMapCenter,
  saveMapZoom: settingsSlice.actions.setMapZoom,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Map);
