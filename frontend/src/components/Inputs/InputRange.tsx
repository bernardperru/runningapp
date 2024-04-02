import { ChartForm } from '@/pages';
import { UseControllerProps, useController } from 'react-hook-form';

type InputRangeProps<T> = {
	to: UseControllerProps<ChartForm>;
	from: UseControllerProps<ChartForm>;
	type: string;
	label: string;
	placeholder: {
		from: string;
		to: string;
	};
};

export function InputRange<T>({ to, from, placeholder, type, label }: InputRangeProps<T>) {
	const { field, fieldState } = useController(to);
	const { field: field1, fieldState: fieldState1 } = useController(from);

	return (
		<div className="flex flex-col">
			{label}
			<div>
				<input {...field1} className="border border-black" type={type} placeholder={placeholder.from} />
				{' - '}
				<input {...field} className="border border-black" type={type} placeholder={placeholder.to} />
			</div>
		</div>
	);
}
