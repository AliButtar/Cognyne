import React, { useState } from "react";

import {
  GenerateButton,
  CreateUniversityButton,
  UniversityNameInput,
  CodeInput,
  UniversityView,
  TwoElementsRow,
} from "../components/university-info.styles";

export const UniversityInfoScreen = ({ navigation }) => {
  const [universityName, setUniversityName] = useState("");
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
    <UniversityView>
      <UniversityNameInput
        label="Enter University Name"
        value={universityName}
        onChangeText={(text) => setUniversityName(text)}
      />

      <TwoElementsRow>
        <CodeInput
          label="Enter University Code"
          value={code}
          autoCapitalize="none"
          onChangeText={(text) => setCode(text)}
        />

        <GenerateButton mode="contained" onPress={() => setCode(makeid(5))}>
          Generate
        </GenerateButton>
      </TwoElementsRow>
      <CreateUniversityButton
        mode="contained"
        onPress={() =>
          navigation.navigate("UniversityCameraScreen", {
            universityName,
            code,
          })
        }
      >
        Create University
      </CreateUniversityButton>
    </UniversityView>
  );
};
