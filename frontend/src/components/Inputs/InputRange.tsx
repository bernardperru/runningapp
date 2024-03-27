import { UseFormRegister, useFormContext } from 'react-hook-form';

type InputRangeProps<T> = {
	id: {
		to: keyof T;
		from: keyof T;
	};
	type: string;
	label: string;
	placeholder: {
		from: string;
		to: string;
	};
};

export function InputRange<T>({ id, placeholder, type, label }: InputRangeProps<T>) {
	const { register } = useFormContext();

	return (
		<div className="flex flex-col">
			{label}
			<div>
				<input type={type} placeholder={placeholder.from} {...register(id.from.toString())} />
				-
				<input type={type} placeholder={placeholder.to} {...register(id.to.toString())} />
			</div>
		</div>
	);
}
