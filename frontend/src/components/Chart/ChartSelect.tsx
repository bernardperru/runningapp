import { ChartForm } from '@/pages';
import { UseFormRegister } from 'react-hook-form';

interface SelectField<T> {
	key: keyof T;
	title: string;
}

interface Props<T> {
	label: string;
	options: SelectField<T>[];
	id: keyof ChartForm;
	register: UseFormRegister<ChartForm>;
}
export function ChartSelect<T>({ label, options, register, id }: Props<T>) {
	return (
		<div>
			{label}
			<select className="border border-black flex justify-center" {...register(id)}>
				{options.map((el, index) => (
					<option value={el.key.toString()} key={index}>
						{el.title}
					</option>
				))}
			</select>
		</div>
	);
}
