import React, { useState } from 'react';
import Select from 'react-select';
import Email from '../Email';
import EmailList from '../EmailList';
import NoneSelected from '../NoneSelected';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import moment from 'moment'
import LoadingSpinner from '../LoadingSpinner';
import './index.sass';

function Mailbox({ mails, isLoading}) {
  const [selectedMailId, setSelectedMailId] = useState(undefined);
  const [searchText, setSearchText] = useState("");
  const [selectedSenderOptions, setSelectedSenderOptions] = useState(undefined);
  const [selectedPriorityOptions, setSelectedPriorityOptions] = useState(undefined);
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [focusedDate, setFocusedDate] = useState(null)

  const onEmailListItemClick = clickedId => setSelectedMailId(selectedMailId === clickedId ? undefined : clickedId)
  const onSearchChange = event => setSearchText(event.target.value.toLowerCase());

  const senderOptions = mails
    .map(mail => mail.sender)
    .filter((x, i, a) => a.indexOf(x) === i) //unique
    .map(s => { return { value: s, label: s } });

  const priorityOptions = mails
    .map(mail => mail.priority)
    .filter((x, i, a) => a.indexOf(x) === i) //unique
    .map(s => { return { value: s, label: s } });

  const moments = mails.map(m => moment(m.date, 'YYYY-MM-DD'));
  const minDate = moment.min(moments);
  const maxDate = moment.max(moments);

  const selectedMail = selectedMailId !== undefined ?
    mails.filter(e => e.id === selectedMailId).map(e => <Email {...e} />)[0] :
    <NoneSelected text="mail" />;

  if (selectedSenderOptions && selectedSenderOptions.length > 0) {
    mails = mails.filter(m => selectedSenderOptions.includes(m.sender));
  }

  if (selectedPriorityOptions && selectedPriorityOptions.length > 0) {
    mails = mails.filter(m => selectedPriorityOptions.includes(m.priority));
  }

  if (startDate) {
    mails = mails.filter(m => moment(m.date, 'YYYY-MM-DD').isSameOrAfter(startDate, 'day'));
  }

  if (endDate) {
    mails = mails.filter(m => moment(m.date, 'YYYY-MM-DD').isSameOrBefore(endDate, 'day'));
  }


  if (searchText.length > 0) {
    mails = mails.filter(m => m.title.toLowerCase().includes(searchText) || m.message.toLowerCase().includes(searchText))
  }

  if (isLoading) return <div className="mailbox"><LoadingSpinner /></div>;
  if (mails.length === 0) return null;
  return (
    <div className="mailbox">
      <div className="filters">
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
      </div>
      <EmailList mails={mails} onClick={onEmailListItemClick} selectedMailId={selectedMailId} />
      <div>
        {selectedMail}
      </div>
    </div>
  );
}

export default Mailbox;
