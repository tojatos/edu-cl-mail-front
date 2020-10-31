import React from 'react';

function Link({href, value}) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer">{value}</a>
    );
}

export default Link;