import React from "react";

import { CompactBuildingInfo } from "./compact-building-info.component";

export const MapCallout = ({ building }) => (
  <CompactBuildingInfo isMap building={building} />
);
