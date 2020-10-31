import React from 'react';
import circles from './circles.svg';

function LoadingSpinner() {
    return (
        <img src={circles} alt="Loading"/>
    );
}

export default LoadingSpinner;