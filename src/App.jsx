import React from 'react';

import Map from 'components/Map';
import RoutePanel from 'components/RoutePanel';

import styles from './App.module.scss';
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <div className={ styles.container }>
      <RoutePanel/>
      <Map/>
    </div>
  );
}

export default App;
