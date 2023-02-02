import { LandingLayout } from 'components/Landing/LandingLayout.jsx';
import { Login } from 'components/Landing/Login';

export const defaultLoginState = {
	email: '',
	password: '',
};

export default function () {
	return (
		<LandingLayout>
			<Login />
		</LandingLayout>
	);
}
