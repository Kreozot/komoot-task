import React, { useState, useEffect } from 'react';
import Leaflet from 'leaflet';

import styles from './Map.module.scss';

function Map() {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const mapInstance = Leaflet.map('map').setView([51.505, -0.09], 13);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapInstance);
    setMap(mapInstance);
  }, []);

  return (
    <div id="map" className={ styles.map }>{ console.log(map) }</div>
  );
}

export default Map;
