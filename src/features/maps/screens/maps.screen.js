import React, { useContext, useState, useEffect } from "react";
import MapView from "react-native-maps";
import styled from "styled-components/native";
import { Image } from "react-native";

import { LocationContext } from "../services/location/location.context";
import { BuildingsContext } from "../services/buildings/buildings.context";

import { Search } from "../components/search.component";
import { MapCallout } from "../components/map-callout.component";

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;

export const MapsScreen = ({ navigation }) => {
  const { location } = useContext(LocationContext);

  const { buildings = [] } = useContext(BuildingsContext);

  const { lat, lng } = location;

  const color = "turquoise";

  return (
    <>
      <Search />
      <Map
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0,
          longitudeDelta: 0.009,
        }}
      >
        {buildings.map((building) => {
          return (
            <MapView.Marker
              key={building.name}
              title={building.name}
              coordinate={{
                latitude: building.geometry.location.lat,
                longitude: building.geometry.location.lng,
              }}
            >
              <MapView.Callout>
                <MapCallout building={building} />
              </MapView.Callout>
            </MapView.Marker>
          );
        })}
      </Map>
    </>
  );
};
