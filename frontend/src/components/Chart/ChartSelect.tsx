import { ChartForm } from '@/pages';
import { UseControllerProps, useController } from 'react-hook-form';

interface SelectField<T> {
	key: keyof T;
	title: string;
}

type ChartSelectProps<T> = {
	controlProps: UseControllerProps<ChartForm>;
	options: SelectField<T>[];
	label: string;
};

export function ChartSelect<T>({ controlProps, options, label }: ChartSelectProps<T>) {
	const { field, fieldState } = useController(controlProps);

	return (
		<div>
			{label}
			<select className="border border-black flex justify-center" {...field} placeholder={controlProps.name}>
				{options.map((el, index) => (
					<option value={el.key.toString()} key={index}>
						{el.title}
					</option>
				))}
			</select>
		</div>
	);
}
