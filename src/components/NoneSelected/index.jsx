import React from 'react';
import './index.sass'

function NoneSelected({text}) {
    return (
        <div class="none-selected">
            <div>Wybierz {text}</div>
        </div>
    );
}

export default NoneSelected;
