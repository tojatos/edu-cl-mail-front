import React, {useState} from 'react';
import Select from 'react-select';
import Email from '../Email';
import EmailList from '../EmailList';
import NoneSelected from '../NoneSelected';

function Mailbox({mails}) {
    const [selectedMailId, setSelectedMailId] = useState(undefined);
    const [searchText, setSearchText] = useState("");
    const [selectedSenderOptions, setSelectedSenderOptions] = useState(undefined);
    const [selectedPriorityOptions, setSelectedPriorityOptions] = useState(undefined);

    const onEmailListItemClick = clickedId => setSelectedMailId(selectedMailId === clickedId ? undefined : clickedId)
    const onSearchChange = event => setSearchText(event.target.value.toLowerCase());

    const senderOptions = mails
      .map(mail => mail.sender)
      .filter((x, i, a) => a.indexOf(x) === i) //unique
      .map(s => {return {value: s, label: s}});

    const priorityOptions = mails
      .map(mail => mail.priority)
      .filter((x, i, a) => a.indexOf(x) === i) //unique
      .map(s => {return {value: s, label: s}});

    const selectedMail = selectedMailId !== undefined ?
      mails.filter(e => e.id === selectedMailId).map(e => <Email {...e} />)[0] :
      <NoneSelected text="mail"/>;

    if(selectedSenderOptions && selectedSenderOptions.length > 0) {
      mails = mails.filter(m => selectedSenderOptions.includes(m.sender));
    }

    if(selectedPriorityOptions && selectedPriorityOptions.length > 0) {
      mails = mails.filter(m => selectedPriorityOptions.includes(m.priority));
    }

    if(searchText.length > 0) {
      mails = mails.filter(m => m.title.toLowerCase().includes(searchText) || m.message.toLowerCase().includes(searchText))
    }

  return (
    <div>
      <Select
        defaultValue={selectedSenderOptions}
        onChange={v => setSelectedSenderOptions(v?.map(i => i.value))}
        options={senderOptions}
        isMulti
      />

      <Select
        defaultValue={selectedPriorityOptions}
        onChange={v => setSelectedPriorityOptions(v?.map(i => i.value))}
        options={priorityOptions}
        isMulti
      />
      <input type="text" placeholder="Szukaj w treści" onChange={onSearchChange} size="1" />
      <EmailList mails={mails} onClick={onEmailListItemClick} />
      <div>
        {selectedMail}
      </div>
    </div>
  );
}

export default Mailbox;