import { ChartForm } from '@/pages';
import { UseFormRegister, useFormContext } from 'react-hook-form';

interface SelectField<T> {
	key: keyof T;
	title: string;
}

interface Props<T> {
	label: string;
	options: SelectField<T>[];
	id: keyof T;
}

export function ChartSelect<T>({ label, options, id }: Props<T>) {
	const { register } = useFormContext();
	return (
		<div>
			{label}
			<select className="border border-black flex justify-center" {...register(id.toString())}>
				{options.map((el, index) => (
					<option value={el.key.toString()} key={index}>
						{el.title}
					</option>
				))}
			</select>
		</div>
	);
}
