import React from 'react';
import './index.sass'

function NoneSelected({text}) {
    return (
        <div className="none-selected">
            <div>Wybierz {text}</div>
        </div>
    );
}

export default NoneSelected;
