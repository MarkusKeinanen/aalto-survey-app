import { LandingLayout } from 'components/Landing/LandingLayout.jsx';
import { useState, useCallback, useContext } from 'react';
import { request } from 'lib/api';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { Spinner } from 'components/General/Spinner';
import { TextInput } from 'components/General/TextInput';
import { AppContext } from 'pages/_app';
import { isEmpty } from 'lib/utils';

export const defaultSignupState = {
	email: '',
	password: '',
	password2: '',
};

export const Signup = () => {
	const { app } = useContext(AppContext);
	const { signupState } = app;
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const onSubmit = async (e) => {
		e.preventDefault();
		if (isEmpty(signupState.email)) {
			toast.error('Please enter your email.');
			return;
		}
		if (isEmpty(signupState.password)) {
			toast.error('Please enter your password.');
			return;
		}
		if (isEmpty(signupState.password2)) {
			toast.error('Please confirm your password.');
			return;
		}
		if (signupState.password !== signupState.password2) {
			toast.error('The passwords do not match.');
			return;
		}
		setIsLoading(true);
		const res = await request({
			url: '/api/users',
			method: 'POST',
			body: {
				email: signupState.email,
				password: signupState.password,
			},
		});
		if (res) {
			const res2 = await request({
				url: '/api/auth',
				method: 'POST',
				body: {
					email: signupState.email,
					password: signupState.password,
				},
			});
			if (res2) {
				toast.success('Your account was created, and you are now logged in.', { duration: 6000 });
				router.push('/surveys');
			}
		}
		setIsLoading(false);
	};

	return (
		<div className='text-center signup-form'>
			<div className='p-rel text-left d-in-bl margin-auto signup-window card shadow-sm bg-color p-top-15 p-right-20 p-left-20 p-bottom-20'>
				<div className='font-size-16 font-weight-600'>Sign up with a new account</div>
				<div className='divider m-top-15 m-bottom-15'></div>
				<div>
					{isLoading ? (
						<Spinner />
					) : (
						<>
							<form onSubmit={onSubmit}>
								<div className='p-bottom-10'>
									<div className='m-bottom-3'>Email address</div>
									<TextInput
										defaultValue={signupState.email}
										type='email'
										placeholder='name@email.com'
										onChange={(value) => {
											signupState.email = value;
										}}
									/>
								</div>
								<div className='p-bottom-10'>
									<div className='m-bottom-3'>Password</div>
									<TextInput
										defaultValue={signupState.password}
										type='password'
										placeholder=''
										onChange={(value) => {
											signupState.password = value;
										}}
									/>
								</div>
								<div className='p-bottom-10'>
									<div className='m-bottom-3'>Password again</div>
									<TextInput
										defaultValue={signupState.password2}
										type='password'
										placeholder=''
										onChange={(value) => {
											signupState.password2 = value;
										}}
									/>
								</div>
							</form>
							<div className='text-center p-top-10 p-bottom-10'>
								<button type='submit' className='shadow-sm animate-colors-75-ms btn btn-blue' onClick={onSubmit}>
									Register
								</button>
							</div>
							<div className='text-center p-top-10'>
								<Link href='/login'>
									<a>Already registered? Click here to login.</a>
								</Link>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};
