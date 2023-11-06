import { useEffect, useState } from 'react';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log('email:', email);
		console.log('password:', password);

		//validate the email and password
	};

	return (
		<div className="">
			<form onSubmit={handleSubmit}>
				<div>
					<input
						onChange={event => setEmail(event.target.value)}
						value={email}
						type="text"
						id="email"
						className="appearance-none border border-gray-300 py-2 px-4 my-2 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
						placeholder="Email"
					/>
				</div>
				<div>
					<input
						onChange={event => setPassword(event.target.value)}
						value={password}
						type="text"
						id="password"
						className="appearance-none border border-gray-300 py-2 px-4 my-2 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
						placeholder="Password"
					/>
				</div>
				<button>Login</button>
			</form>
		</div>
	);
}
