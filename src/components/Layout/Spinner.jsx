import React, { Fragment } from 'react';
import spinner from '../Layout/spinner.gif';

const Spinner = () => {
    return (
        <Fragment>
            <img src={spinner} alt="Loading..." style={spinnerStyle}/>
        </Fragment>
    )
}

const spinnerStyle = {
    width: '200px',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -40%)'
}

export default Spinner;