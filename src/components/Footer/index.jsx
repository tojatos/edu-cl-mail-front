import React from 'react';
import Link from '../Link';
import './index.sass'

function Footer() {
    return (
        <div className="footer">
            <span>Autor: <Link href='https://krzysztofruczkowski.pl' value='Krzysztof Ruczkowski'/></span>
            <span>Kod źródłowy frontendu: <Link href='https://github.com/tojatos/edu-cl-mail-front' value='edu-cl-mail-front'/></span>
            <span>Kod źródłowy backendu: <Link href='https://github.com/tojatos/edu-cl-mail' value='edu-cl-mail'/></span>
        </div>
    );
}

export default Footer;
