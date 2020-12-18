import React, { useEffect, useState } from "react";
import EmailList from "../EmailList";
import {
  Backdrop,
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from "@material-ui/core";
import { MultipleSelect } from "react-select-material-ui";
import Email from "../Email";
import { useDispatch, useSelector } from "react-redux";
import {
  FETCH_STATES,
  getMailsAll,
  initializeInboxes,
} from "../../redux/slices/mailsSlice";
import { INBOX_ID_TO_NAME, INBOXES } from "../../shared";
import moment from "moment";
import { setSelectedSenderOptions } from "../../redux/slices/mailFilterSlice";
import { ArrowBack } from "@material-ui/icons";

const getSelectTheme = (theme) => {
  return {
    /*
     * multiValue(remove)/color:hover
     */
    danger: "red",

    /*
     * multiValue(remove)/backgroundColor(focused)
     * multiValue(remove)/backgroundColor:hover
     */
    dangerLight: theme.palette.grey[200],

    /*
     * control/backgroundColor
     * menu/backgroundColor
     * option/color(selected)
     */
    neutral0: theme.palette.background.default,

    /*
     * control/backgroundColor(disabled)
     */
    neutral5: "orange",

    /*
     * control/borderColor(disabled)
     * multiValue/backgroundColor
     * indicators(separator)/backgroundColor(disabled)
     */
    neutral10: theme.palette.background.default,

    /*
     * control/borderColor
     * option/color(disabled)
     * indicators/color
     * indicators(separator)/backgroundColor
     * indicators(loading)/color
     */
    neutral20: theme.palette.grey["A200"],

    /*
     * control/borderColor(focused)
     * control/borderColor:hover
     */
    // this should be the white, that's normally selected
    neutral30: theme.palette.text.primary,

    /*
     * menu(notice)/color
     * singleValue/color(disabled)
     * indicators/color:hover
     */
    neutral40: theme.palette.primary,

    /*
     * placeholder/color
     */
    // seen in placeholder text
    neutral50: theme.palette.secondary,

    /*
     * indicators/color(focused)
     * indicators(loading)/color(focused)
     */
    neutral60: theme.palette.secondary,
    neutral70: theme.palette.secondary,

    /*
     * input/color
     * multiValue(label)/color
     * singleValue/color
     * indicators/color(focused)
     * indicators/color:hover(focused)
     */
    neutral80: theme.palette.primary,

    // no idea
    neutral90: theme.palette.secondary,

    /*
     * control/boxShadow(focused)
     * control/borderColor(focused)
     * control/borderColor:hover(focused)
     * option/backgroundColor(selected)
     * option/backgroundColor:active(selected)
     */
    primary: theme.palette.primary,

    /*
     * option/backgroundColor(focused)
     */
    primary25: theme.palette.background.paper,

    /*
     * option/backgroundColor:active
     */
    primary50: theme.palette.background.paper,
    primary75: theme.palette.background.paper,
  };
};

function filterMails(inbox, mails, mailFilterData) {
  if (inbox === INBOXES.ODBIORCZA) {
    if (
      mailFilterData.selectedSenderOptions &&
      mailFilterData.selectedSenderOptions.length > 0
    ) {
      mails = mails.filter((m) =>
        mailFilterData.selectedSenderOptions.includes(m.sender)
      );
    }
  }

  const startDate = mailFilterData?.startDate;
  if (startDate) {
    mails = mails.filter((m) =>
      moment(m.date, "YYYY-MM-DD").isSameOrAfter(startDate, "day")
    );
  }

  const endDate = mailFilterData?.endDate;
  if (endDate) {
    mails = mails.filter((m) =>
      moment(m.date, "YYYY-MM-DD").isSameOrBefore(endDate, "day")
    );
  }

  const filterText = mailFilterData?.searchText?.toLowerCase() || "";
  if (filterText.length > 0) {
    mails = mails.filter(
      (m) =>
        m.title.toLowerCase().includes(filterText) ||
        m.message.toLowerCase().includes(filterText)
    );
  }
  return mails;
}

function Mailbox({ inbox }) {
  const [selectedMailId, setSelectedMailId] = useState(undefined);
  const [mailSelected, setMailSelected] = useState(false);
  const dispatch = useDispatch();
  const mailData = useSelector((state) => state.mailData);
  const mailFilterData = useSelector((state) => state.mailFilterData);
  const theme = useTheme();
  const formThemeColors = getSelectTheme(theme);
  const notInitialized =
    !mailData.fetchStates[inbox] ||
    mailData.fetchStates[inbox] === FETCH_STATES.STARTING;

  let mails = mailData.mails[inbox] || [];

  const selectedMail = mails
    .filter((e) => e.id === selectedMailId)
    .map((e) => <Email {...e} />)[0];

  const onEmailListItemClick = (clickedId) => {
    setSelectedMailId(clickedId);
    setMailSelected(true);
  };

  function SenderFilter() {
    if (inbox !== INBOXES.ODBIORCZA || notInitialized) return null;

    const senderOptions = mailData.mails[mailData.currentInbox]
      ? mailData.mails[mailData.currentInbox]
          .map((mail) => mail.sender)
          .filter((x, i, a) => a.indexOf(x) === i) //unique
      : [];
    return (
      <Paper>
        <Box m={1}>
          <MultipleSelect
            placeholder="Filtruj po nadawcy..."
            fullWidth
            defaultValues={mailFilterData.selectedSenderOptions}
            onChange={(it) => dispatch(setSelectedSenderOptions(it))}
            options={senderOptions}
            SelectProps={{
              theme: (theme) => ({
                ...theme,
                colors: {
                  ...formThemeColors,
                },
              }),
            }}
          />
        </Box>
      </Paper>
    );
  }

  mails = filterMails(inbox, mails, mailFilterData);

  return (
    <div>
      <Backdrop open={notInitialized}>
        <Box m={2}>
          <Typography>Ładowanie maili</Typography>
        </Box>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box m={3} />
      {!mailSelected ? (
        <>
          <Box m={1}>
            <Grid container direction="row" justify="space-between">
              <Typography>{INBOX_ID_TO_NAME[inbox]}</Typography>
              {mailData.fetchStates[inbox] && (
                <Chip color="secondary" label={mailData.fetchStates[inbox]} />
              )}
            </Grid>
          </Box>
          <SenderFilter />
          <EmailList
            mails={mails}
            onClick={onEmailListItemClick}
            selectedMailId={selectedMailId}
          />
        </>
      ) : (
        <>
          <IconButton edge="start" onClick={() => setMailSelected(false)}>
            <ArrowBack />
          </IconButton>
          <Paper elevation={0}>{selectedMail}</Paper>
        </>
      )}
    </div>
  );
}

export default Mailbox;
