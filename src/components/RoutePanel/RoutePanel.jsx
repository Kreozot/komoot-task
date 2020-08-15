import React from 'react';
import { connect } from 'react-redux';

import RouteItem from './RouteItem';
import { getRoute } from 'store';

import styles from './RoutePanel.module.scss';

function RoutePanel(props) {
  const {
    route,
  } = props;

  // TODO: GPX Download button
  // TODO: Header

  return (
    <div className={ styles.container }>
      <div className={ styles.list }>
        { route.map((item, index) => (
          <RouteItem key={ `${ item.title }${ item.lat }${ item.lng }` } item={ item } index={ index }/>
        )) }
        <RouteItem item={ null } index={ route.length } isBlank/>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  route: getRoute(state),
});

export default connect(mapStateToProps)(RoutePanel);
