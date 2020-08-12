import React, { useCallback } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { routeSlice } from 'store';
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
          <RouteItem item={ item } index={ index }/>
        )) }
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  route: state.route,
});

export default connect(mapStateToProps)(RoutePanel);
