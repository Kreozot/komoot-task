import L from 'leaflet';

import styles from './Map.module.scss';

export function getMarkerIcon(index, isHovered) {
  return L.divIcon({
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    className: isHovered ? styles.markerHover : styles.marker,
    html: `<div class="${ styles.markerLabel }">${ index }</div>`
  });
}
