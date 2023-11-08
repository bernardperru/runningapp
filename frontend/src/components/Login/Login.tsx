import { useSignUpMutation } from '../../graphql';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const inputcss =
	'appearance-none border border-gray-300 py-2 px-4 my-2 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent';

const Login = () => {
	const navigate = useNavigate();
	const [formState, setFormState] = useState({
		login: true,
		email: '',
		password: '',
		name: '',
	});

	const [signup] = useSignUpMutation({
		variables: {
			email: formState.email,
			password: formState.password,
			name: formState.name,
		},
	});

	// const [login] = useLoginMutation({
	// 	variables: {
	// 		email: formState.email,
	// 		password: formState.password,
	// 	},
	// 	onCompleted: ({ login }) => {
	// 		console.log(login);
	// 		navigate('/home');
	// 	},
	// });

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
					onClick={async () => {
						const response = await signup();
						console.log(response);
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

// import { useEffect, useState } from 'react';

// export default function Login() {
// 	const [email, setEmail] = useState('');
// 	const [password, setPassword] = useState('');

// 	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
// 		event.preventDefault();
// 		console.log('email:', email);
// 		console.log('password:', password);

// 		//validate the email and password
// 	};

// 	return (
// 		<div className="">
// 			<form onSubmit={handleSubmit}>
// 				<div>
// 					<input
// 						onChange={event => setEmail(event.target.value)}
// 						value={email}
// 						type="text"
// 						id="email"
// 						className="appearance-none border border-gray-300 py-2 px-4 my-2 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
// 						placeholder="Email"
// 					/>
// 				</div>
// 				<div>
// 					<input
// 						onChange={event => setPassword(event.target.value)}
// 						value={password}
// 						type="text"
// 						id="password"
// 						className="appearance-none border border-gray-300 py-2 px-4 my-2 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
// 						placeholder="Password"
// 					/>
// 				</div>
// 				<button>Login</button>
// 			</form>
// 		</div>
// 	);
// }
