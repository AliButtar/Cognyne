import React, { useState, useContext, createContext, useEffect } from "react";

import { buildingsRequest, buildingsTransform } from "./buildings.service";
import { LocationContext } from "../location/location.context";

export const BuildingsContext = createContext();

export const BuildingsContextProvider = ({ children }) => {
  const [buildings, setBuildings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { location } = useContext(LocationContext);

  const retrieveBuildings = (loc) => {
    setIsLoading(true);
    setBuildings([]);

    setTimeout(() => {
      buildingsRequest(loc)
        .then(buildingsTransform)
        .then((results) => {
          setIsLoading(false);
          setBuildings(results);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err);
          // console.log(loc)
        });
    }, 2000);
  };

  useEffect(() => {
    if (location) {
      const locationString = `${location.lat},${location.lng}`;
      retrieveBuildings(locationString);
    }
  }, [location]);

  return (
    <BuildingsContext.Provider
      value={{
        buildings,
        isLoading,
        error,
      }}
    >
      {children}
    </BuildingsContext.Provider>
  );
};
