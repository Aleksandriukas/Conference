import { createContext } from 'react';

type AppContextType = {
    userType: 'nonAuth' | 'logged' | undefined;
    setUserType: React.Dispatch<React.SetStateAction<'nonAuth' | 'logged' | undefined>>;
};

export const AppContext = createContext<AppContextType>({ userType: undefined, setUserType: () => {} });
