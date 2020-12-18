import React from "react";
import { Box, Divider, Typography } from "@material-ui/core";
import moment from "moment";

function linkify(inputText) {
  let replacedText, replacePattern1, replacePattern2, replacePattern3;

  // remove existing links
  replacedText = inputText.replace(/<\/?a[^>]*>/gi, "");

  //URLs starting with http://, https://, or ftp://
  replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gim;
  replacedText = replacedText.replace(
    replacePattern1,
    '<a href="$1" target="_blank">$1</a>'
  );

  //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
  replacePattern2 = /(^|[^/])(www\.[\S]+(\b|$))/gim;
  replacedText = replacedText.replace(
    replacePattern2,
    '$1<a href="http://$2" target="_blank">$2</a>'
  );

  //Change email addresses to mailto:: links.
  replacePattern3 = /(([a-zA-Z0-9\-_.])+@[a-zA-Z_]+?(\.[a-zA-Z]{2,6})+)/gim;
  replacedText = replacedText.replace(
    replacePattern3,
    '<a href="mailto:$1">$1</a>'
  );

  return replacedText;
}

function Email({ title, sender, receiver, date, message }) {
  const dateMoment = moment(date, "YYYY-MM-DD HH:mm:ss");
  const displayedDate = dateMoment.format("DD.MM.YYYY HH:mm");
  return (
    <>
      <Box p={1}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="subtitle1">{sender || receiver}</Typography>
        <Typography variant="subtitle2">{displayedDate}</Typography>
      </Box>
      <Divider />
      <Box p={2} m={1}>
        <div
          className="body"
          dangerouslySetInnerHTML={{
            __html: linkify(message.replace(/(?:\r\n|\r|\n)/g, "<br>")),
          }}
        />
      </Box>
    </>
  );
}

export default Email;
