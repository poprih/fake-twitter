import { createContext, useContext, useReducer, Dispatch } from "react";
import React from "react";
import type { User } from "@/type";

const GlobalContext = createContext<{ userInfo?: User }>({});

const GlobalDispatchContext = createContext<Dispatch<{}> | undefined>(
  () => null
);
interface Props {
  children: React.ReactNode;
}
export const GlobalProvider = ({ children }: Props) => {
  const [global, dispatch] = useReducer(globalReducer, initialGlobalState);
  return (
    <GlobalContext.Provider value={global}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalContext.Provider>
  );
};

function globalReducer(state: object, newState: object) {
  return {
    ...state,
    ...newState,
  };
}

const initialGlobalState = {};

export function useGlobal() {
  return useContext(GlobalContext);
}

export function useGlobalDispatch() {
  return useContext(GlobalDispatchContext);
}
