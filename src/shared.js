export const INITIAL_MAIL_AMOUNT = 15;
export const API_URL =
  process.env.REACT_APP_API_URL || "https://krzysztofruczkowski.pl:2020/api";
export const LOGIN_CHECK_URL = `${API_URL}/login_check`;
// export const GET_AMOUNT_URL = (inbox, page) =>
//   `${API_URL}/inbox_page/${inbox}/${page}`;
export const NUM_PAGES_URL = (inbox) => `${API_URL}/num_pages/${inbox}`;
export const GET_INBOX_ALL_URL = (inbox) => `${API_URL}/inbox/${inbox}`;
export const GET_INBOX_AMOUNT_URL = (inbox, amount) =>
  `${API_URL}/inbox/${inbox}/${amount}`;

export const INBOXES = {
  ODBIORCZA: "odbiorcza",
  NADAWCZA: "nadawcza",
  ROBOCZA: "robocza",
  USUNIETE: "usuniete",
};
export const INBOX_NAMES = {
  ODBIORCZA: "Odbiorcza",
  NADAWCZA: "Nadawcza",
  ROBOCZA: "Robocza",
  USUNIETE: "Usuniete",
};
