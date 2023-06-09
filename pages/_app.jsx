import 'styles/fonts.scss';
import 'styles/inputs.scss';
import 'styles/globals.scss';
import 'styles/spinner.scss';
import 'styles/landing.scss';
import 'styles/navbar.scss';
import 'styles/layout.scss';
import 'styles/home.scss';
import 'styles/modal.scss';
import 'styles/editor.scss';
import 'styles/answerSurvey.scss';
import 'styles/gather.scss';
import { Toaster } from 'react-hot-toast';
import { useRef, createContext, useReducer, useEffect } from 'react';
import { defaultSignupState } from 'pages/signup';
import { defaultLoginState } from 'pages/login';
import { defaultSurveysState } from 'pages/surveys';
import cloneDeep from 'lodash/cloneDeep';
import Router, { useRouter } from 'next/router';
import { useScreenSize } from 'hooks/useScreenSize';

const initialAppState = {
	pageLoading: false,
	signupState: defaultSignupState,
	loginState: defaultLoginState,
	surveysState: defaultSurveysState,
	storage: {},
	surveys: null,
};

export const AppContext = createContext();

const App = ({ Component, pageProps }) => {
	const app = useRef(cloneDeep(initialAppState));
	const [, forceAppStateUpdate] = useReducer((x) => x + 1, 0);
	const init = useRef(false);

	useScreenSize({ app, forceRender: forceAppStateUpdate });
	const router = useRouter();

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

	useEffect(() => {
		init.current = true;
		forceAppStateUpdate();
	}, []);

	return (
		<AppContext.Provider value={{ app: app.current, forceRender: forceAppStateUpdate }}>
			{app.screen?.width < 1000 ? (
				<div style={{ background: 'white', height: '100vh', width: '100vw', position: 'fixed', left: 0, top: 0 }}>
					<div className='center-center font-weight-700 font-size-16'>THIS APP IS NOT YET OPTIMIZED FOR MOBILE SCREEN SIZES</div>
				</div>
			) : (
				<>
					{init.current ? (
						<>
							<Component {...pageProps} />
							<Toaster />
						</>
					) : null}
				</>
			)}
		</AppContext.Provider>
	);
};

export default App;
