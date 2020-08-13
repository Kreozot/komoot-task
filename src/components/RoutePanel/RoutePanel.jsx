import React from 'react';
import { connect } from 'react-redux';

import RouteItem from './RouteItem';

import styles from './RoutePanel.module.scss';

function RoutePanel(props) {
  const {
    route,
  } = props;


  return (
    <div className={ styles.container }>
      <div className={ styles.list }>
        { route.map((item, index) => (
          <RouteItem key={ item } item={ item } index={ index }/>
        )) }
        <RouteItem item={ null } index={ route.length } isBlank/>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  route: state.route,
});

export default connect(mapStateToProps)(RoutePanel);
