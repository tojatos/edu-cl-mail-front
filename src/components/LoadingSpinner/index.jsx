import React from 'react';
import circles from './circles.svg';
import './index.sass';

function LoadingSpinner({size="100px"}) {
    return (
        <img className="loading-spinner" src={circles} alt="Loading" style={{width: size}}/>
    );
}

export default LoadingSpinner;
