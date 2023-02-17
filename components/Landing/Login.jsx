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

export const Login = () => {
	const { app } = useContext(AppContext);
	const { loginState } = app;
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const onSubmit = async (e) => {
		e.preventDefault();

		if (isEmpty(loginState.email)) {
			toast.error('Please enter your email.');
			return;
		}
		if (isEmpty(loginState.password)) {
			toast.error('Please enter your password.');
			return;
		}

		setIsLoading(true);

		const res = await request({
			url: '/api/auth',
			method: 'POST',
			body: {
				email: loginState.email,
				password: loginState.password,
			},
		});
		if (res) {
			toast.success('You have been logged in.');
		} else {
			toast.error('Wrong email or password.');
		}
		setIsLoading(false);
	};

	return (
		<div className='text-center signup-form'>
			<div className='p-rel text-left d-in-bl margin-auto signup-window card shadow-sm bg-color  p-top-15 p-right-20 p-left-20 p-bottom-20'>
				<div className='font-size-16 font-weight-600'>Login to your account</div>
				<div className='divider m-top-15 m-bottom-15'></div>
				{isLoading ? (
					<Spinner />
				) : (
					<form className='signup-form' onSubmit={onSubmit}>
						<div className='p-bottom-10'>
							<div className='m-bottom-3'>Email</div>
							<TextInput
								defaultValue={loginState.email}
								type='email'
								placeholder='name@email.com'
								onChange={(value) => {
									loginState.email = value;
								}}
							/>
						</div>
						<div className='p-bottom-10'>
							<div className='m-bottom-3'>Password</div>
							<TextInput
								defaultValue={loginState.password}
								type='password'
								placeholder=''
								onChange={(value) => {
									loginState.password = value;
								}}
							/>
						</div>
						<div className='text-center p-top-10 p-bottom-10'>
							<button className='shadow-sm animate-colors-75-ms btn btn-blue' onClick={onSubmit}>
								Login
							</button>
						</div>
						<div className='text-center p-top-10'>
							<Link href='/signup'>
								<a>Don't have an account? Click here to register.</a>
							</Link>
						</div>
					</form>
				)}
			</div>
		</div>
	);
};
