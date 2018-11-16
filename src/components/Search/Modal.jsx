import React, { Component } from 'react';
import './Modal.css';

class Modal extends Component {
    render() { 
        const showHideModal = this.props.show ? "modal display-block" : "modal display-none";
        return (
            <div className={showHideModal}>
                <div className="modal-main">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Modal;