import React, { useState } from "react";
import { ScrollView } from "react-native";
import { List } from "react-native-paper";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { CurrentTasks } from "../components/current-tasks.component";
import { Popups } from "../components/popups.components";

export const DashboardScreen = ({ navigation }) => {
  const [classExpanded, setClassExpanded] = useState(false);
  const [eventExpanded, setEventExpanded] = useState(false);
  const [busExpanded, setBusExpanded] = useState(false);
  const [universityExpanded, setUniversityExpanded] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");

  return (
    <SafeArea>
      <CurrentTasks navigation={navigation} />
      <ScrollView>
        <List.Section>
          <List.Accordion
            title="Class"
            left={(props) => <List.Icon {...props} icon="google-classroom" />}
            expanded={classExpanded}
            onPress={() => setClassExpanded(!classExpanded)}
          >
            <List.Item
              title="Create Class"
              onPress={() => navigation.navigate("ClassInfoScreen")}
            />
            <List.Item
              title="Join Class"
              onPress={() => {
                setModalType("Class");
                setModalVisible(!modalVisible);
              }}
            />
            <Popups
              type={modalType}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            />
          </List.Accordion>
          <List.Accordion
            title="Event"
            left={(props) => <List.Icon {...props} icon="ticket" />}
            expanded={eventExpanded}
            onPress={() => setEventExpanded(!eventExpanded)}
          >
            <List.Item
              title="Create Event"
              onPress={() => navigation.navigate("EventInfoScreen")}
            />
            <List.Item
              title="Join Event"
              onPress={() => {
                setModalType("Event");
                setModalVisible(!modalVisible);
              }}
            />
            <Popups
              type={modalType}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            />
          </List.Accordion>
          <List.Accordion
            title="Bus"
            left={(props) => <List.Icon {...props} icon="bus" />}
            expanded={busExpanded}
            onPress={() => setBusExpanded(!busExpanded)}
          >
            <List.Item
              title="Create Bus"
              onPress={() => navigation.navigate("BusInfoScreen")}
            />
            <List.Item
              title="Join Bus"
              onPress={() => {
                setModalType("Bus");
                setModalVisible(!modalVisible);
              }}
            />
            <Popups
              type={modalType}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            />
          </List.Accordion>
          <List.Accordion
            title="University"
            left={(props) => <List.Icon {...props} icon="school" />}
            expanded={universityExpanded}
            onPress={() => setUniversityExpanded(!universityExpanded)}
          >
            <List.Item
              title="Create University"
              onPress={() => navigation.navigate("UniversityInfoScreen")}
            />
            <List.Item
              title="Join University"
              onPress={() => {
                setModalType("University");
                setModalVisible(!modalVisible);
              }}
            />
            <Popups
              type={modalType}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            />
          </List.Accordion>
        </List.Section>
      </ScrollView>
    </SafeArea>
  );
};
