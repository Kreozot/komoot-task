import L from 'leaflet';

import styles from './Map.module.scss';

export function getMarkerIcon(index, isHovered) {
  return L.divIcon({
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    className: isHovered ? styles.markerHover : styles.marker,
    html: `<div class="${ styles.markerLabel }">${ index }</div>`
  });
}
