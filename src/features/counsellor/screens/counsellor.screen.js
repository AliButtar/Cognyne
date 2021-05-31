import React, { useState, useContext, useEffect, useCallback } from "react";
import { View } from "react-native";
import { GiftedChat, Send } from "react-native-gifted-chat";
import styled from "styled-components/native";
import { Dialogflow_V2 } from "react-native-dialogflow";

import { Text } from "../../../components/typography/text.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const Container = styled(View)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

const dialogflowConfig = {
  type: "service_account",
  project_id: "counsellor-jyog",
  private_key_id: "6e6fcc25c0618476196025fec799a38f306e52f3",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCb5yF62tL8Wprz\nfvBMsdkL9A4QhFb86a15G1kvtRWrS6Q+KcN9ZKShgF142bijn1xrkktwjk7JbnYo\nEPhgncDwiAu0+JD0wMJG/ijyMXVauovVjHNSdyg4qs5Tn+zO6Qt7/H/p5bqbxYqX\ny5SrabLYqgzGXR9l/bm9ezGwfYHbepL53lcoxMvtXWjoCMLfaLEXFtv2N6Goc2ch\n87rPhW/pbSf1hXmRcA3AjI2eMLxgS5wLQ+qtjfr3U6DVQpbPIxi3BBHqQKZm0osR\nmVQ9O32oqgME8Y75T+zhc4KFsnmPWO+qIBx7ZnlcwMR4gEPsRIFUCLzmMWEoYAUA\nDoTe/BipAgMBAAECggEAC1P+EMk5r3B99ddxaoE5vi6bnwOetn3cRwJ/toG381xp\nsMKkG8ZmV/3VzOQ1EF6R/pcAuEr+2pAWMc8Z3RtZW6DnCN1O2xnug+4P15lUZ6VK\nZ9fuwT07RPLUTys9r8MrPHUabkptBsiRy3nVcacagbfJedhmYajQCD6dW6+i8emX\nIAfnXD+gkJS4TzbIgW7k1xnI5L+UxdIu+tBtuX6xadseKQwogoiLuUfqD5XZtnbr\nJT1iGJPXxhYNa/QIGhSii/gZ+Fq8aGsbJI8I6At20vVCPkQUbyJwPcUSGl9m+JP0\nAQF5bB+nsJx/n8LfQO0hXH3RBpcGpdDeK0aEg68/6QKBgQDIEpBXy0wxZ0uYRqW1\nLK3kpzWu/8v/A355HDJ74JbsBl1NfrqSkvCVglPnc3xA0OhVBcHS9LXpJcYH6tsb\nJ+tnaKJ2rWxPZXXeOt2LiAMgjj3WVnVvtyU70R50KTlDsQZc2V5R8SRywqEg1M6Q\n4fgDAckA5UZO7ZNKVIZVMCMt4wKBgQDHe7tEtLj2jDyPJ9VApmW8vV3KBHrSMwtA\nHMulZuYv/lfILVc8pg++rTL8bEuww7cOB068HnOhCUG3V8d+Vclz/RAccxaHphsB\nXaissfmGzCUl7vpq/kauCsc/NEnUkNwqQa3FFAmySzIDGe/lzKuhm4NIE9avDY+N\nZbdKVihlAwKBgG66j3Z3hnjFMXpahzWJP8iPnk93NMCzf1ip+WrD9uMz9omAPOQI\nPOySD7vGF5uLwznjEM2fL9qUVFBnc9JIuqklqNzDyHD8t0pCDAFASnLHJoQsn5wv\noYTEjPU/J3lGTT4v81qoekKlYyXXgWeAGJIZd9RuEAZ4yA7YTuxw0td/AoGAHoYE\nRaMRmkgjDBSgQOA1OQgQzdSZpohA9HJzhr+UAUv9ypeFfbY7OoXuA0ne2xFXdUIQ\n/h/6uW1dLNy1ndMqnCDg0jmZ/O+hujfGk4Y4FDQwivliP/Tgg8kKa9VoZqozxhN+\nr2U9hpaS9H6HgrYqnPPaxrCibO66RHyH60v7qlkCgYBJxEyFov2VJZk6L+V4YXaH\narjL7CTJubvLCnXNHsB9U5gWyiF17tUF/sBLcyjGALAkT+C+AxfVHolsZMNO2Abd\n7G3ZwA7J/kPcOVuSajlyMf/9M/r6rpzSTt8qiTtY3RSk115Bqjl4J1HJcCC+SJ33\nMK6IwSGMbr9X0TIiWDpqJw==\n-----END PRIVATE KEY-----\n",
  client_email:
    "counsellor-service-account@counsellor-jyog.iam.gserviceaccount.com",
  client_id: "114685759767333474309",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/counsellor-service-account%40counsellor-jyog.iam.gserviceaccount.com",
};

const BOT = {
  _id: 2,
  name: "Counsellor",
  avatar: require("../../../../assets/bot_avatar.jpg"),
};

export const CounsellorScreen = () => {
  const [msgs, setMsgs] = useState([]);
  const [id, setId] = useState(1);
  const [name, setName] = useState("");
  const { user } = useContext(AuthenticationContext);

  useEffect(() => {
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id
    );
  }, []);

  const sendBotResponse = (txt) => {
    const msg = {
      _id: msgs.length + 1,
      text: txt,
      createdAt: new Date(),
      user: BOT,
    };
    setMsgs((previousMessages) => GiftedChat.append(previousMessages, [msg]));
  };

  const handleGoogleResponse = (result) => {
    const txt = result.queryResult.fulfillmentMessages[0].text.text[0];
    sendBotResponse(txt);
  };

  const Send = (message = []) => {
    setMsgs((previousMessages) => GiftedChat.append(previousMessages, message));
    const txt = message[0].text;

    Dialogflow_V2.requestQuery(
      txt,
      (result) => handleGoogleResponse(result),
      (error) => console.log(error)
    );
  };

  const QuickReply = (reply) => {
    setMsgs((previousMessages) => GiftedChat.append(previousMessages, reply));
    const txt = reply[0].value;
    Dialogflow_V2.requestQuery(
      txt,
      (results) => handleGoogleResponse(result),
      (error) => console.log(error)
    );
  };

  return (
    <Container>
      <GiftedChat
        messages={msgs}
        onSend={(message) => Send(message)}
        onQuickReply={(reply) => QuickReply(reply)}
        user={{
          _id: 1,
        }}
      />
    </Container>
  );
};
