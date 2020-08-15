import React from 'react';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import 'leaflet/dist/leaflet.css';

import { store, persistor } from 'store';
import RouteMap from 'components/RouteMap';
import RoutePanel from 'components/RoutePanel';

import styles from './App.module.scss';

function App() {
  return (
    <Provider store={ store }>
      <PersistGate persistor={ persistor }>
        <div className={ styles.container }>
          <RoutePanel/>
          <RouteMap/>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
