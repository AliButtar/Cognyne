import React from "react";
import styled from "styled-components/native";
import { Button } from "react-native-paper";

import { StorageAccessFramework } from "expo-file-system";

const ExportButton = styled(Button)`
  width: 47%;
  margin-left: ${(props) => props.theme.space[1]};
  margin-bottom: ${(props) => props.theme.space[1]};
  margin-right: ${(props) => props.theme.space[1]};
`;

export const ExportDataButton = ({ busMembersDetails }) => {
  const arrtoJSON = async (partpntDetails) => {
    var json = partpntDetails;
    var fields = Object.keys(json[0]);
    var replacer = function (_, value) {
      return value === null ? "" : value;
    };
    var csv = json.map(function (row) {
      return fields
        .map(function (fieldName) {
          return JSON.stringify(row[fieldName], replacer);
        })
        .join(",");
    });
    csv.unshift(fields.join(",")); // add header column
    csv = await csv.join("\r\n");

    const date = new Date();

    const docId = `${
      partpntDetails[0].bmBusName
    }-${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;

    // Requests permissions for external directory
    const permissions =
      await StorageAccessFramework.requestDirectoryPermissionsAsync();

    if (permissions.granted) {
      // Gets SAF URI from response
      const uri = permissions.directoryUri;

      StorageAccessFramework.createFileAsync(uri, `${docId}.csv`, "csv").then(
        (uri1) => {
          StorageAccessFramework.writeAsStringAsync(uri1, csv);
        }
      );
    }
  };

  return (
    <ExportButton
      icon="account-arrow-left-outline"
      mode="contained"
      onPress={() => {
        arrtoJSON(busMembersDetails);
      }}
    >
      Export Data
    </ExportButton>
  );
};
