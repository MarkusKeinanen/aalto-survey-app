import 'styles/fonts.scss';
import 'styles/inputs.scss';
import 'styles/globals.scss';
import 'styles/spinner.scss';
import 'styles/landing.scss';
import { Toaster } from 'react-hot-toast';
import { useRef, createContext, useReducer, useEffect } from 'react';
import { defaultSignupState } from 'pages/signup';
import { defaultLoginState } from 'pages/login';
import cloneDeep from 'lodash/cloneDeep';
import Router from 'next/router';

const initialAppState = {
	pageLoading: false,
	signupState: defaultSignupState,
	loginState: defaultLoginState,
	storage: {},
	surveys: null,
};

export const AppContext = createContext();

const App = ({ Component, pageProps }) => {
	const app = useRef(cloneDeep(initialAppState));
	const [, forceAppStateUpdate] = useReducer((x) => x + 1, 0);

	useEffect(() => {
		const start = () => {
			app.current.pageLoading = true;
			forceAppStateUpdate();
		};
		const end = () => {
			app.current.pageLoading = false;
			forceAppStateUpdate();
		};
		Router.events.on('routeChangeStart', start);
		Router.events.on('routeChangeComplete', end);
		Router.events.on('routeChangeError', end);
		return () => {
			Router.events.off('routeChangeStart', start);
			Router.events.off('routeChangeComplete', end);
			Router.events.off('routeChangeError', end);
		};
	}, []);

	return (
		<AppContext.Provider value={{ app: app.current, forceRender: forceAppStateUpdate }}>
			<Component {...pageProps} />
			<Toaster />
		</AppContext.Provider>
	);
};

export default App;
