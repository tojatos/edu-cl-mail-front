import React from 'react';
import moment from 'moment';
import 'moment/locale/pl'
import { ListItem, ListItemText, makeStyles } from "@material-ui/core";

moment.locale('pl')

const useStyles = makeStyles({
    root: {
        maxHeight: 100,
    },
});

function EmailListItem({ sender, title, priority, date, message, onClick, active }) {
    const classes = useStyles();
    const dateMoment = moment(date, 'YYYY-MM-DD HH:mm:ss');
    const isToday = dateMoment.isSame(new Date(), "day");
    const displayedDate = isToday ? dateMoment.format('HH:mm') : dateMoment.format('DD.MM.YYYY HH:mm');
    const nowrapStyle = {style: {
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
        }};
    return (
        <ListItem className={classes.root} button divider onClick={onClick}>
            <ListItemText
                primary={title}
                primaryTypographyProps={nowrapStyle}
                secondary={sender + ' - ' + displayedDate}
                secondaryTypographyProps={nowrapStyle}
            />
        </ListItem>
    );
}

export default EmailListItem;
