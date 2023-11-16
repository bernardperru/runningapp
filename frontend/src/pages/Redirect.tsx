import { useAddRefreshTokenMutation } from '../graphql';
import { useNavigate } from 'react-router-dom';

function Redirect() {
	const navigate = useNavigate();
	const urlParams = new URLSearchParams(window.location.search);
	const code = urlParams.get('code');
	const scope = urlParams.get('scope');

	const [addRefreshToken] = useAddRefreshTokenMutation({
		variables: {
			accessToken: code ? code : '',
		},
		onCompleted: ({ addRefreshToken }) => {
			localStorage.setItem('hasRefreshToken', addRefreshToken ? addRefreshToken.hasRefreshToken.toString() : 'false');
		},
	});

	if (code !== '' && localStorage.getItem('hasRefreshToken') === 'false') {
		addRefreshToken();
		navigate('/');
	}

	return <div></div>;
}

export default Redirect;
