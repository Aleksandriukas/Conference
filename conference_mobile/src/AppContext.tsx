import { createContext } from 'react';

type AppContextType = {
    isLogged: boolean;
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AppContext = createContext<AppContextType>({ isLogged: false, setIsLogged: () => {} });
