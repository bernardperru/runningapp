import { useSignupMutation, useLoginMutation } from '../../graphql';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const inputcss =
	'appearance-none border border-gray-300 py-2 px-4 my-2 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent';
//nytårs commit :)
const Login = () => {
	const navigate = useNavigate();
	const [formState, setFormState] = useState({
		login: true,
		email: '',
		password: '',
		name: '',
	});

	const [signup] = useSignupMutation({
		variables: {
			email: formState.email,
			password: formState.password,
			name: formState.name,
		},
		onCompleted: ({ signup }) => {
			if (signup?.token != null) {
				localStorage.setItem('token', signup.token);
				localStorage.setItem('hasRefreshToken', signup.hasRefreshToken.toString());
				navigate('/');
			}
		},
	});

	const [login] = useLoginMutation({
		variables: {
			email: formState.email,
			password: formState.password,
		},
		onCompleted: ({ login }) => {
			if (login?.token != null) {
				localStorage.setItem('token', login.token);
				localStorage.setItem('hasRefreshToken', login.hasRefreshToken.toString());
				navigate('/');
			}
		},
	});

	return (
		<div>
			<h4 className="mv3">{formState.login ? 'Login' : 'Sign Up'}</h4>
			<div className="flex flex-column">
				{!formState.login && (
					<input
						className={inputcss}
						value={formState.name}
						onChange={e =>
							setFormState({
								...formState,
								name: e.target.value,
							})
						}
						type="text"
						placeholder="Your name"
					/>
				)}
				<input
					className={inputcss}
					value={formState.email}
					onChange={e =>
						setFormState({
							...formState,
							email: e.target.value,
						})
					}
					type="text"
					placeholder="Your email address"
				/>
				<input
					className={inputcss}
					value={formState.password}
					onChange={e =>
						setFormState({
							...formState,
							password: e.target.value,
						})
					}
					type="password"
					placeholder="Choose a safe password"
				/>
			</div>
			<div className="">
				<button
					className="pointer mr2 button"
					onClick={() => {
						formState.login ? login() : signup();
					}}>
					{formState.login ? 'login' : 'create account'}
				</button>
			</div>
			<div>
				<button
					className="pointer button"
					onClick={e =>
						setFormState({
							...formState,
							login: !formState.login,
						})
					}>
					{formState.login ? 'need to create an account?' : 'already have an account?'}
				</button>
			</div>
		</div>
	);
};

export default Login;
