import React from 'react';
import Backdrop from './Backdrop';
import classes from './style/Modal.module.css';

const Modal2 = ({ displayModal, children, hideModal }) => {
  return (
    <div>
      <Backdrop show={displayModal} clicked={hideModal}/>
      <div className={classes.Modal}
        style={{
          transform: displayModal
            ? "translateY(0)"
            : "translateY(-100vh))",
          opacity: displayModal ? "1" : "0",
          display: displayModal ? "block" : "none"
        }}>
        <i className={`fa fa-window-close ${classes.CloseButton}`} aria-hidden="true" onClick={hideModal}></i>
        {children}
      </div>
    </div>
  )
}

export default Modal2
