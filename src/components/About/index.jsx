import React from 'react';
import Link from '../Link';
import './index.sass'

function About() {
    return (
        <div className="about">
            <span>Strona służąca do pobierania maili z edukacja.cl</span>
            <span>Aby zalogować się, należy podać dane logowania do edukacja.cl</span>
            <span>Dane logowania nie są zapamiętywane.</span>
            <span></span>
            <span></span>
            <span>Autor: <Link href='https://krzysztofruczkowski.pl' value='Krzysztof Ruczkowski'/></span>
            <span>Kod źródłowy frontendu: <Link href='https://github.com/tojatos/edu-cl-mail-front' value='edu-cl-mail-front'/></span>
            <span>Kod źródłowy backendu: <Link href='https://github.com/tojatos/edu-cl-mail' value='edu-cl-mail'/></span>
        </div>
    );
}

export default About;
