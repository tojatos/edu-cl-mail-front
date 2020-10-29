import React, {useState} from 'react';
import Select from 'react-select';
import Email from '../Email';
import EmailList from '../EmailList';
import NoneSelected from '../NoneSelected';

function Mailbox({mails}) {
    const [selectedMailId, setSelectedMailId] = useState(undefined);
    const [selectedSenderOptions, setSelectedSenderOptions] = useState(undefined);
    const onEmailListItemClick = clickedId => setSelectedMailId(selectedMailId === clickedId ? undefined : clickedId)
    console.log(selectedSenderOptions);

    const senderOptions = mails
      .map(mail => mail.sender)
      .filter((x, i, a) => a.indexOf(x) === i) //unique
      .map(s => {return {value: s, label: s}});

    const selectedMail = selectedMailId !== undefined ?
      mails.filter(e => e.id === selectedMailId).map(e => <Email {...e} />)[0] :
      <NoneSelected text="mail"/>;

    if(selectedSenderOptions && selectedSenderOptions.length > 0) {
      mails = mails.filter(m => selectedSenderOptions.includes(m.sender));
    }

  return (
    <div>
      <Select
        defaultValue={selectedSenderOptions}
        onChange={v => setSelectedSenderOptions(v?.map(i => i.value))}
        options={senderOptions}
        isMulti
      />
      <EmailList mails={mails} onClick={onEmailListItemClick} />
      <div>
        {selectedMail}
      </div>
    </div>
  );
}

export default Mailbox;