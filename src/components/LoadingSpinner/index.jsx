import React from 'react';
import circles from './circles.svg';
import './index.sass';

function LoadingSpinner() {
    return (
        <img className="loading-spinner" src={circles} alt="Loading"/>
    );
}

export default LoadingSpinner;