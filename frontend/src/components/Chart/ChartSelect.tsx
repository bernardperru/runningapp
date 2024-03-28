import { ChartForm } from '@/pages';
import { ChartActivity } from '@/utils';
import { FieldValue, FieldValues, UseControllerProps, useController } from 'react-hook-form';

interface SelectField<T> {
	key: keyof T;
	title: string;
}

type ChartSelectProps = {
	controlProps: UseControllerProps<ChartForm>;
	options: SelectField<ChartActivity>[];
	label: string;
};

export function ChartSelect({ controlProps, options, label }: ChartSelectProps) {
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
