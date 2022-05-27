import { createContext, useContext, useState } from "react";

import { Option } from "../components/Dropdowns/interface";

const AreaOptionsContext = createContext(
  {} as {
    options: Option[];
    setOptions: React.Dispatch<React.SetStateAction<Option[]>>;
  }
);

interface AreaOptionsContextProviderInterface {
  children: React.ReactNode;
}

// TODO: remove context since spotlight and geo filter are now separate to prevent rerenders
const AreaOptionsContextProvider = ({
  children,
}: AreaOptionsContextProviderInterface) => {
  const [options, setOptions] = useState<Option[]>([]);

  return (
    <AreaOptionsContext.Provider
      value={{
        options,
        setOptions,
      }}
    >
      {children}
    </AreaOptionsContext.Provider>
  );
};

export default AreaOptionsContextProvider;
export const useAreaOptions = () => useContext(AreaOptionsContext);
