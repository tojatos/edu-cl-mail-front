import React, {useState} from 'react';
import EmailList from '../EmailList';
const emails = [
  {
    date: '2020-10-23 08:01:27',
    message: 'Witajcie,\nto jest testowy mail.',
    priority: '1 - Normalna+',
    sender: 'Testowy Boguś',
    title: 'Testowy mail'
  },
  {
    date: '2020-10-20 14:37:01',
    message: 'Szanowni Państwo,\nzapraszamy do udziału w bezpłatnych warsztatach w ramach Projektu ?ZPR PWR ? Zintegrowany Program Rozwoju Politechniki Wrocławskiej?.\nAktualna oferta oraz wszystkie niezbędne informacje jak zgłosić się na warsztaty, znajdują się na stronie:\n\nhttp://zpr.pwr.edu.pl/aktualnosci/warsztaty-dla-studentow-w8-w-semestrze-zimowym-2020-2021-49.html\n\n\nPo zakończeniu warsztatów każdy uczestnik otrzymuje zaświadczenie potwierdzające udział w zajęciach.\nNa zgłoszenia czekamy do 28.10.2020 r.\n\nUwaga! Jeżeli jesteś już uczestnikiem Projektu, lub zgłosiłeś się wcześniej, ale nie wziąłeś udziału w żadnej formie, to zgłoś się do koordynatora w celu uzyskania dalszych informacji:\nAnna Juras, tel. 71 320 23 97, anna.juras@pwr.edu.pl',
    priority: '1 - Normalna+',
    sender: 'Wydział Informatyki i Zarządzania',
    title: 'Bezpłatne warsztaty w ramach Projektu ?ZPR PWR ? Zintegrowany Program Rozwoju Politechniki Wrocławskiej?.'
  },
  {
    date: '2020-10-16 14:29:01',
    message: 'Dzień dobry\nW dniu dzisiejszym, ze względu na drastycznie pogarszającą się sytuację epidemiczną w kraju, podjęto decyzję o tym, że do końca semestru zimowego ra. 2020/2021 zajęcia na Wydziale Informatyki i Zarządzania będą odbywały się wyłącznie w trybie zdalnym. 20.10.2020r. zostanie udostępnione Zarządzenie Dziekana określające zasady funkcjonowania i zapewnienia ciągłości działania Wydziału w semestrze zimowym 2020/2021.\n?\nDr hab. inż. Katarzyna Tworek, prof. uczelni\nDziekan Wydziału Informatyki i Zarządzania | Politechnika Wrocławska\nKatedra Systemów Zarządzania i Rozwoju Organizacji\nwww.ksziro.pwr.edu.pl/pracownicy/katarzyna_tworek',
    priority: '1 - Normalna+',
    sender: 'Wydział Informatyki i Zarządzania',
    title: 'Do końca semestru zimowego ra. 2020/2021 zajęcia na W8 będą odbywały się wyłącznie w trybie zdalnym'
  }
];

function Mailbox(props) {
    // const [emails, setEmails] = useState([]);
    return <EmailList mails={emails} />;
}

export default Mailbox;