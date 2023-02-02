import { LandingLayout } from 'components/Landing/LandingLayout.jsx';
import { useState, useCallback, useContext } from 'react';
import { request } from 'lib/api';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { Spinner } from 'components/General/Spinner';
import { TextInput } from 'components/General/TextInput';
import { AppContext } from 'pages/_app';
import { Signup } from 'components/Landing/Signup';

export const defaultSignupState = {
	email: '',
	password: '',
	password2: '',
};

export default function () {
	return (
		<LandingLayout>
			<Signup />
		</LandingLayout>
	);
}
