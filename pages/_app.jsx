import { createContext } from 'react';

export const AppContext = createContext();

const App = ({ Component, pageProps }) => {
	return <Component {...pageProps} />;
};

export default App;
