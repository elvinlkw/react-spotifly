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
    width: '300px',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
}

export default Spinner;