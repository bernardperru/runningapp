import { ChartForm } from '@/pages';
import { UseFormRegister, useFormContext } from 'react-hook-form';

interface SelectField<T> {
	key: keyof T;
	title: string;
}

export interface ChartSelectProps<T, B> {
	label: string;
	options: SelectField<T>[];
	id: keyof B;
}

export function ChartSelect<T, B>({ label, options, id }: ChartSelectProps<T, B>) {
	const { register } = useFormContext();
	return (
		<div>
			{label}
			<select className="border border-black flex justify-center" {...register(id as string)}>
				{options.map((el, index) => (
					<option value={el.key.toString()} key={index}>
						{el.title}
					</option>
				))}
			</select>
		</div>
	);
}
