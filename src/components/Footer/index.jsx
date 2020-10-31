import React from 'react';
import Link from '../Link';

function Footer() {
    return (
        <div>
            <span>Autor: <Link href='https://krzysztofruczkowski.pl' value='Krzysztof Ruczkowski'/></span>
            <span>Kod źródłowy frontendu: <Link href='https://github.com/tojatos/edu-cl-mail-front' value='link'/></span>
            <span>Kod źródłowy backendu: <Link href='https://github.com/tojatos/edu-cl-mail' value='link'/></span>
        </div>
    );
}

export default Footer;