export interface IColumnType<T> {
	key: string;
	title: string;
}

interface Props<T> {
	data: T[];
	columns: IColumnType<T>[];
}

export const TablePage: React.FunctionComponent = () => {
	return <div></div>;
};
