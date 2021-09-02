import { createContext, useContext, useMemo, useReducer } from "react";

import { AppReducer, initialState } from "./AppReducer";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
