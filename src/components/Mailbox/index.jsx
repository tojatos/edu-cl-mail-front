import React, { useState } from 'react';
import EmailList from '../EmailList';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import './index.sass';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, Modal} from "@material-ui/core";
import NoneSelected from "../NoneSelected";
import Email from "../Email";

// function getModalStyle() {
//   const top = 50;
//   const left = 50;
//
//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`,
//   };
// }
//
// const useStyles = makeStyles((theme) => ({
//   paper: {
//     position: 'absolute',
//     maxWidth: '95%',
//     backgroundColor: theme.palette.background.paper,
//     border: '2px solid #000',
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//   },
// }));

function Mailbox({ mails, loader }) {
  const [selectedMailId, setSelectedMailId] = useState(undefined);
  const [openDialog, setOpenDialog] = useState(false);

  const getMailById = mailId => mails.filter(e => e.id === selectedMailId)[0];
     console.log(getMailById(selectedMailId))

  const selectedMail = (
      <div>
        {
          selectedMailId !== undefined ?
              mails.filter(e => e.id === selectedMailId).map(e => <Email {...e} />)[0] :
              <NoneSelected text="mail"/>
        }
      </div>
);

  // const [searchText, setSearchText] = useState("");
  // const [selectedSenderOptions, setSelectedSenderOptions] = useState(undefined);
  // const [selectedPriorityOptions, setSelectedPriorityOptions] = useState(undefined);
  // const [startDate, setStartDate] = useState(null)
  // const [endDate, setEndDate] = useState(null)
  // const [focusedDate, setFocusedDate] = useState(null)

  // const onEmailListItemClick = clickedId => setSelectedMailId(selectedMailId === clickedId ? undefined : clickedId)
  const onEmailListItemClick = clickedId => {
    setSelectedMailId(selectedMailId === clickedId ? undefined : clickedId)
    setOpenDialog(true)
  }
  // const onSearchChange = event => setSearchText(event.target.value.toLowerCase());

  const isInitialized = mails && mails.length !== 0;
  if (!isInitialized) return null;

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
  // const selectedMail = selectedMailId !== undefined ?
  //   mails.filter(e => e.id === selectedMailId).map(e => <Email {...e} />)[0] :
  //   <NoneSelected text="mail" />;
  //
  // if (selectedSenderOptions && selectedSenderOptions.length > 0) {
  //   mails = mails.filter(m => selectedSenderOptions.includes(m.sender));
  // }
  //
  // if (selectedPriorityOptions && selectedPriorityOptions.length > 0) {
  //   mails = mails.filter(m => selectedPriorityOptions.includes(m.priority));
  // }
  //
  // if (startDate) {
  //   mails = mails.filter(m => moment(m.date, 'YYYY-MM-DD').isSameOrAfter(startDate, 'day'));
  // }
  //
  // if (endDate) {
  //   mails = mails.filter(m => moment(m.date, 'YYYY-MM-DD').isSameOrBefore(endDate, 'day'));
  // }
  //
  //
  // if (searchText.length > 0) {
  //   mails = mails.filter(m => m.title.toLowerCase().includes(searchText) || m.message.toLowerCase().includes(searchText))
  // }

  return (
    <div className="mailbox">
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
          <div className="filter-label">Filtruj po dacie</div>
          <DateRangePicker
            startDate={startDate}
            startDateId="start_date_id"
            endDate={endDate}
            endDateId="end_date_id"
            onDatesChange={({ startDate, endDate }) => {
              setStartDate(startDate);
              setEndDate(endDate);
            }}
            focusedInput={focusedDate}
            onFocusChange={setFocusedDate}
            isOutsideRange={day => day.isAfter(maxDate, 'day') || day.isBefore(minDate, 'day')}
          />
        </div>
        <div className="filter-group">
          <div className="filter-label">Szukaj w tytule / treści</div>
          <input type="text" placeholder="Szukaj w treści" onChange={onSearchChange} size="1" />
        </div>
      </div> */}
      <div className="inbox-container">
        <EmailList mails={mails} onClick={onEmailListItemClick} selectedMailId={selectedMailId} loader={loader}/>
        {/*<div> {selectedMail} </div>*/}
        <Dialog
            fullWidth
            maxWidth="lg"
            scroll="paper"
            open={openDialog}
            onClose={() => setOpenDialog(false)}
        >
          <DialogContent>
            {selectedMail}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default Mailbox;
