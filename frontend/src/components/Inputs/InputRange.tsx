type InputRangeProps = {
	type: string;
	placeholder: {
		from: string;
		to: string;
	};
};

export function InputRange() {
	return (
		<div>
			<input type="number" placeholder="from (km)" />
			-
			<input type="number" placeholder="to (km)" />
		</div>
	);
}
