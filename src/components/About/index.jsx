import React from 'react';
import {Link, Paper, ListItem, List, ListItemText} from "@material-ui/core";

function About() {
    return (
        <Paper>
            <List>
                <ListItem><ListItemText primary="Strona służąca do pobierania maili z edukacja.cl"/></ListItem>
                <ListItem><ListItemText primary="Aby zalogować się, należy podać dane logowania do edukacja.cl"/></ListItem>
                <ListItem><ListItemText primary="Dane logowania nie są zapamiętywane."/></ListItem>
                <ListItem/>
                <ListItem/>
                <ListItem><ListItemText primary="Autor" secondary={<Link target="_blank" href='https://krzysztofruczkowski.pl'>Krzysztof Ruczkowski</Link>}/></ListItem>
                <ListItem><ListItemText primary="Kod źródłowy frontendu" secondary={<Link target="_blank" href='https://github.com/tojatos/edu-cl-mail-front'>edu-cl-mail-front</Link>}/></ListItem>
                <ListItem><ListItemText primary="Kod źródłowy backendu" secondary={<Link target="_blank" href='https://github.com/tojatos/edu-cl-mail'>edu-cl-mail</Link>}/></ListItem>
            </List>
        </Paper>
    );
}

export default About;
