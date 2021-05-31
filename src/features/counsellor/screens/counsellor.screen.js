import React, { useState, useContext, useEffect, useCallback } from "react";
import { View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import styled from "styled-components/native";
import { Dialogflow_V2 } from "react-native-dialogflow";

import { dialogflowConfig } from "../configurationFiles/dialogflowConfiguration";

import { CounsellorContext } from "../services/counsellor.context";

const Container = styled(View)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

export const CounsellorScreen = () => {
  const { msgs, Send, ReplyTransform } = useContext(CounsellorContext);

  useEffect(() => {
    (async () => {
      await Dialogflow_V2.setConfiguration(
        dialogflowConfig.client_email,
        dialogflowConfig.private_key,
        Dialogflow_V2.LANG_ENGLISH_US,
        dialogflowConfig.project_id
      )
        .then(() => {
          Dialogflow_V2.requestQuery(
            "Hi",
            (result) => ReplyTransform(result),
            (error) => console.log(error)
          );
        })
        .catch((err) => console.log(err));
    })();
  }, []);

  return (
    <Container>
      <GiftedChat
        messages={msgs}
        onSend={(message) => Send(message)}
        user={{
          _id: 1,
        }}
      />
    </Container>
  );
};
