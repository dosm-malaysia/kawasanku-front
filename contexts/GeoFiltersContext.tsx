import React, { useState, createContext, useContext } from "react";

import { GEO_FILTER, STATES } from "../lib/constants";

// TODO: add type for LocationContext
const LocationContext = createContext({} as any);

interface LocationContextProviderProps {
  children: React.ReactNode;
}

const LocationContextProvider = ({
  children,
}: LocationContextProviderProps) => {
  const [geoFilter, setGeoFilter] = useState<GEO_FILTER>();
  const [state, setState] = useState<STATES>(STATES.PUTRAJAYA);
  const [areaOptions, setAreaOptions] = useState<string[]>([]);
  const [area, setArea] = useState<string>();

  // TODO: add filtering logic

  return (
    <LocationContext.Provider
      value={{
        geoFilter,
        setGeoFilter,
        state,
        setState,
        area,
        setArea,
        areaOptions,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => useContext(LocationContext);
export default LocationContextProvider;
