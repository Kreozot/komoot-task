import React, { useMemo } from 'react';
import { connect } from 'react-redux';

import { getRoute } from 'store';
import { getRouteGpx } from 'gpx';

import styles from './GpxDownloadButton.module.scss';

function GpxDownloadButton(props) {
  const {
    route,
  } = props;

  const downloadHref = useMemo(() => {
    const gpxFileContent = getRouteGpx(route);
    const blob = new Blob([gpxFileContent]);
    return URL.createObjectURL(blob);
  }, [route]);

  return (
    <a className={ styles.button } href={ downloadHref } download="route.gpx">
      Download your Route
    </a>
  );
}

const mapStateToProps = (state) => ({
  route: getRoute(state),
});

export default connect(mapStateToProps)(GpxDownloadButton);
