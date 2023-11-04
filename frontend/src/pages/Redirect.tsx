import React from 'react';
import { Link, useParams } from 'react-router-dom';

function Redirect() {
	const urlParams = new URLSearchParams(window.location.search);

	const code = urlParams.get('code');
	const scope = urlParams.get('scope');

	return (
		<div>
			{code} {scope}
		</div>
	);
}

export default Redirect;
