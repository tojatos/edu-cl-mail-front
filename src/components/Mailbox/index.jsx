import React, {useState} from 'react';
import Email from '../Email';
import EmailList from '../EmailList';
import NoneSelected from '../NoneSelected';


function Mailbox({mails}) {
    const [selectedMailId, setSelectedMailId] = useState(undefined);
    const onEmailListItemClick = clickedId => setSelectedMailId(selectedMailId === clickedId ? undefined : clickedId)

    const selectedMail = selectedMailId !== undefined ?
      mails.filter(e => e.id === selectedMailId).map(e => <Email {...e} />)[0] :
      <NoneSelected text="mail"/>;

  return (
    <div>
      <EmailList mails={mails} onClick={onEmailListItemClick} />
      <div>
        {selectedMail}
      </div>
    </div>
  );
}

export default Mailbox;