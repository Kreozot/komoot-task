import React, { useCallback } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { routeSlice } from 'store';

import styles from './RouteItem.module.scss';
import { ReactComponent as DragIcon } from './icon-drag.svg';

function RouteItem(props) {
  const {
    item,
    index,
    removePoint,
  } = props;

  const handleRemoveClick = useCallback(() => {
    removePoint({ index });
  }, [index, removePoint]);

  return (
    <div className={ styles.container }>
      <div className={ styles.button }><DragIcon/></div>
      <div className={ styles.title }>Waypoint { index }</div>
      <button className={ styles.button } onClick={ handleRemoveClick }>X</button>
    </div>
  )
}

const mapStateToProps = (state) => ({
  route: state.route,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  removePoint: routeSlice.actions.removePoint,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RouteItem);
