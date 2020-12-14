import React, { useEffect, useState } from "react";
import EmailList from "../EmailList";
import {
  Backdrop,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
} from "@material-ui/core";
import NoneSelected from "../NoneSelected";
import Email from "../Email";
import { useDispatch, useSelector } from "react-redux";
import {
  FETCH_STATES,
  getMailsAll,
  initializeInboxes,
} from "../../redux/slices/mailsSlice";
import { INBOX_ID_TO_NAME } from "../../shared";
import moment from "moment";

function Mailbox({ inbox }) {
  const [selectedMailId, setSelectedMailId] = useState(undefined);
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  const mailData = useSelector((state) => state.mailData);
  const mailFilterData = useSelector((state) => state.mailFilterData);
  // const [mails, setMails] = useState([]);
  useEffect(() => {
    if (
      !mailData.fetchStates[inbox] ||
      mailData.fetchStates[inbox] === FETCH_STATES.STARTING
    ) {
      // dispatch(getApiMails(userData.user.login, userData.user.password, inbox));
      dispatch(initializeInboxes(userData.user.login, userData.user.password));
    }
    if (mailData.fetchStates[inbox] === FETCH_STATES.INITIALIZED) {
      dispatch(getMailsAll(userData.user.login, userData.user.password, inbox));
    }
  }, [
    dispatch,
    inbox,
    mailData.fetchStates,
    userData.user.login,
    userData.user.password,
  ]);
  let mails = mailData.mails[inbox] || [];

  const selectedMail = (
    <div>
      {selectedMailId !== undefined ? (
        mails
          .filter((e) => e.id === selectedMailId)
          .map((e) => <Email {...e} />)[0]
      ) : (
        <NoneSelected text="mail" />
      )}
    </div>
  );

  // const [selectedSenderOptions, setSelectedSenderOptions] = useState(undefined);
  // const [selectedPriorityOptions, setSelectedPriorityOptions] = useState(undefined);
  // const [focusedDate, setFocusedDate] = useState(null)

  // const onEmailListItemClick = clickedId => setSelectedMailId(selectedMailId === clickedId ? undefined : clickedId)
  const onEmailListItemClick = (clickedId) => {
    setSelectedMailId(clickedId);
    setOpenDialog(true);
  };
  // const onSearchChange = event => setSearchText(event.target.value.toLowerCase());

  // const isInitialized = mails && mails.length !== 0;
  // if (!isInitialized) return null;

  // const senderOptions = mails
  //   .map(mail => mail.sender)
  //   .filter((x, i, a) => a.indexOf(x) === i) //unique
  //   .map(s => { return { value: s, label: s } });
  //
  // const priorityOptions = mails
  //   .map(mail => mail.priority)
  //   .filter((x, i, a) => a.indexOf(x) === i) //unique
  //   .map(s => { return { value: s, label: s } });
  //
  // const moments = mails.map(m => moment(m.date, 'YYYY-MM-DD'));
  // const minDate = moment.min(moments);
  // const maxDate = moment.max(moments);
  //
  // if (selectedSenderOptions && selectedSenderOptions.length > 0) {
  //   mails = mails.filter(m => selectedSenderOptions.includes(m.sender));
  // }
  //
  // if (selectedPriorityOptions && selectedPriorityOptions.length > 0) {
  //   mails = mails.filter(m => selectedPriorityOptions.includes(m.priority));
  // }
  //

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

  return (
    <div>
      <Backdrop
        open={
          !mailData.fetchStates[inbox] ||
          mailData.fetchStates[inbox] === FETCH_STATES.STARTING
        }
      >
        <Box m={2}>
          <Typography>Ładowanie maili</Typography>
        </Box>
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* <div className="filters">
        <div className="filter-group">
          <div className="filter-label">Filtruj po nadawcy</div>
          <Select
            defaultValue={selectedSenderOptions}
            onChange={v => setSelectedSenderOptions(v?.map(i => i.value))}
            options={senderOptions}
            isMulti
          />
        </div>
        <div className="filter-group">
          <div className="filter-label">Filtruj po priorytecie</div>
          <Select
            defaultValue={selectedPriorityOptions}
            onChange={v => setSelectedPriorityOptions(v?.map(i => i.value))}
            options={priorityOptions}
            isMulti
          />
        </div>
        <div className="filter-group">
          <div className="filter-label">Szukaj w tytule / treści</div>
          <input type="text" placeholder="Szukaj w treści" onChange={onSearchChange} size="1" />
        </div>
      </div> */}
      <Box m={3}>
        <Grid container direction="row" justify="space-between">
          <Typography>{INBOX_ID_TO_NAME[inbox]}</Typography>
          {mailData.fetchStates[inbox] && (
            <Chip color="secondary" label={mailData.fetchStates[inbox]} />
          )}
        </Grid>
        <EmailList
          mails={mails}
          onClick={onEmailListItemClick}
          selectedMailId={selectedMailId}
        />
        <Dialog
          fullWidth
          maxWidth="lg"
          scroll="paper"
          open={openDialog}
          onClose={() => setOpenDialog(false)}
        >
          <DialogContent>{selectedMail}</DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
}

export default Mailbox;
