
import { createContext, useContext } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
  let userState;

  return (
    <AppContext.Provider value={userState}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}