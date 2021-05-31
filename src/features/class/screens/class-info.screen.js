import React, { useState } from "react";

import {
  GenerateButton,
  CreateClassButton,
  ClassNameInput,
  CodeInput,
  ClassView,
  TwoElementsRow,
} from "../components/class-info.styles";

export const ClassInfoScreen = ({ navigation }) => {
  const [className, setClassName] = useState("");
  const [code, setCode] = useState("");

  function makeid(length) {
    var result = [];
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result.push(
        characters.charAt(Math.floor(Math.random() * charactersLength))
      );
    }
    return result.join("");
  }

  return (
    <ClassView>
      <ClassNameInput
        label="Enter Class Name"
        value={className}
        onChangeText={(text) => setClassName(text)}
      />

      <TwoElementsRow>
        <CodeInput
          label="Enter Class Code"
          value={code}
          autoCapitalize="none"
          onChangeText={(text) => setCode(text)}
        />

        <GenerateButton mode="contained" onPress={() => setCode(makeid(5))}>
          Generate
        </GenerateButton>
      </TwoElementsRow>
      <CreateClassButton
        mode="contained"
        onPress={() =>
          navigation.navigate("ClassCameraScreen", { className, code })
        }
      >
        Create Class
      </CreateClassButton>
    </ClassView>
  );
};
