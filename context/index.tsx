import { createContext, useContext, useReducer } from "react";
import React from "react";

const GlobalContext = createContext({});

const GlobalDispatchContext = createContext({});

export const GlobalProvider: React.FC = ({ children }) => {
  const [global, dispatch] = useReducer(globalReducer, initialGlobalState);
  return (
    <GlobalContext.Provider value={global}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalContext.Provider>
  );
};

function globalReducer(state: object, action: object) {
  return {
    ...state,
    ...action,
  };
}

const initialGlobalState = {};

export function useGlobal() {
  return useContext(GlobalContext);
}

export function useGlobalDispatch() {
  return useContext(GlobalDispatchContext);
}
