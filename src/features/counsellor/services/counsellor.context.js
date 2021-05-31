import React, { useState, createContext, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { Dialogflow_V2 } from "react-native-dialogflow";

export const CounsellorContext = createContext();

export const CounsellorContextProvider = ({ children }) => {
  const [msgs, setMsgs] = useState([]);

  const ReplyTransform = (result) => {
    const txt = result.queryResult.fulfillmentMessages[0].text.text[0];

    const msg = {
      _id: msgs.length + 1,
      text: txt,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "Counsellor",
        avatar: require("../../../../assets/bot_avatar.jpg"),
      },
    };

    setMsgs((previousMessages) => GiftedChat.append(previousMessages, [msg]));
  };

  const Send = (message = []) => {
    setMsgs((previousMessages) => GiftedChat.append(previousMessages, message));

    const txt = message[0].text;

    Dialogflow_V2.requestQuery(
      txt,
      (result) => ReplyTransform(result),
      (error) => console.log(error)
    );
  };

  return (
    <CounsellorContext.Provider value={{ msgs, Send, ReplyTransform }}>
      {children}
    </CounsellorContext.Provider>
  );
};
