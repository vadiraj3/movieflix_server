import { createContext } from 'react';

const user = {
	name: '',
};

export const AuthContext = createContext({});

export const Auth = ({ children }) => {
	return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
