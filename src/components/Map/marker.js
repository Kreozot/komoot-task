import L from 'leaflet';

import styles from './Map.module.scss';

const markerIcon = `
<svg version="1.1" viewBox="0 0 30 30" xml:space="preserve"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">
    <path fill="currentColor" d="M 15,2 C 8.925,2 4,6.925 4,13 c 0,7.234 7.152,10.697 8.048,11.503 0.915,0.823 1.671,2.668 1.976,3.714 0.148,0.508 0.564,0.765 0.976,0.776 0.413,-0.012 0.828,-0.269 0.976,-0.776 0.305,-1.046 1.061,-2.89 1.976,-3.714 C 18.848,23.697 26,20.234 26,13 26,6.925 21.075,2 15,2 Z"/>
</svg>
`;

export function getMarkerIcon(index) {
  return L.divIcon({
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    className: styles.marker,
    html: `${ markerIcon }<div class="${ styles.markerLabel }">${ index }</div>`
  });
}
