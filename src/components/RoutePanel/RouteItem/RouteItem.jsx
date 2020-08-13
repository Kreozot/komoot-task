import React, { useCallback, useState, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { routeSlice } from 'store';

import styles from './RouteItem.module.scss';
import { ReactComponent as DragIcon } from './icon-drag.svg';
import { ReactComponent as RemoveIcon } from './icon-remove.svg';

const DRAG_TYPE = 'application/route-index';

function RouteItem(props) {
  const {
    item,
    index,
    removePoint,
    movePoint,
    isBlank, // item just for drop handling
  } = props;

  const [isDragOver, setIsDragOver] = useState(false);
  // Event target to compare in dragLeave (because of known issue with many event calls)
  const [eventTarget, setEventTarget] = useState(null);

  const handleRemoveClick = useCallback(() => {
    removePoint({ index });
  }, [index, removePoint]);

  const handleDragEnter = useCallback((event) => {
    if (event.dataTransfer.types.includes(DRAG_TYPE)) {
      event.preventDefault();
      setEventTarget(event.target);
      setIsDragOver(true);
    }
  }, []);

  const handleDragLeave = useCallback((event) => {
    if (event.dataTransfer.types.includes(DRAG_TYPE)) {
      event.preventDefault();
      if (event.target === eventTarget) {
        setIsDragOver(false);
      }
    }
  }, [eventTarget]);

  const handleDragOver = useCallback((event) => {
    if (event.dataTransfer.types.includes(DRAG_TYPE)) {
      event.preventDefault();
      setIsDragOver(true);
    }
  }, []);

  const handleDrop = useCallback((event) => {
    if (event.dataTransfer.types.includes(DRAG_TYPE)) {
      event.preventDefault();
      const sourceIndex = event.dataTransfer.getData(DRAG_TYPE);
      movePoint({ sourceIndex, destinationIndex: index });
    }
    setIsDragOver(false);
  }, [movePoint, index]);

  const handleDragStart = useCallback((event) => {
    event.dataTransfer.setData(DRAG_TYPE, index);
  }, [index]);

  const handleDragStartNoop = useCallback((event) => {
    event.preventDefault();
  }, []);

  const containerClassName = useMemo(() =>
    `${ styles.container } ${ isDragOver ? styles.containerDragOver : '' }`
  , [isDragOver]);

  return (
    <div
      className={ containerClassName }
      onDragOver={ handleDragOver }
      onDragEnter={ handleDragEnter }
      onDragLeave={ handleDragLeave }
      onDrop={ handleDrop }
      onDragStart={ handleDragStart }
      draggable="true"
    >
      { !isBlank &&
        <>
          <div
            className={ styles.buttonDrag }
          >
            <DragIcon/>
          </div>
          <div className={ styles.title }>Waypoint { index }</div>
          <button
            className={ styles.buttonRemove }
            onClick={ handleRemoveClick }
            title="Remove waypoint"
            onDragStart={ handleDragStartNoop }
            draggable="true"
          >
            <RemoveIcon/>
          </button>
        </>
      }
    </div>
  )
}

const mapStateToProps = (state) => ({
  route: state.route,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  removePoint: routeSlice.actions.removePoint,
  movePoint: routeSlice.actions.movePoint,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RouteItem);
