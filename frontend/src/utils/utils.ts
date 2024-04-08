export function averageOrSum(value: number, denominator: number, type: string): number {
	if (type === 'avg') {
		return value / denominator;
	}
	return value;
}

export function getCurrentWeekAndYear(): { week: number; year: number } {
	const now = new Date();
	const startOfYear = new Date(now.getFullYear(), 0, 0);
	const diff = now.getTime() - startOfYear.getTime();
	const oneWeek = 1000 * 60 * 60 * 24 * 7;
	const week = Math.floor(diff / oneWeek) + 1;
	const year = now.getFullYear();
	return { week, year };
}

function addZero(value: number): string {
	if (value < 10) {
		return '0' + value.toString();
	}
	return value.toString();
}

export function format(key: string, value: string | number) {
	switch (key) {
		case 'distance':
			return (parseFloat(value.toString()) / 1000).toFixed(2) + ' km';
		case 'average_cadence':
			return parseFloat(value.toString()).toFixed(0) + ' spm';
		case 'elapsed_time':
			const hours = Math.floor(parseFloat(value.toString()) / 3600);
			const newValue = parseFloat(value.toString()) - hours * 3600;
			const minutes = Math.floor(newValue / 60);
			const seconds = newValue - minutes * 60;
			return addZero(hours) + ':' + addZero(minutes) + ':' + addZero(seconds) + '';
		case 'average_heartrate':
			return parseFloat(value.toString()).toFixed(0) + ' bpm';
		case 'start_date':
			const date = new Date(value);
			return date.toDateString();
		case 'summary_polyline':
			return '';
		case 'average_pace':
			return value;
		default:
			return value;
	}
}

export function formatDate(value: string) {
	const date = new Date(value);
	return date.toDateString();
}

export function formatTime(value: number): string {
	const hours = Math.floor(value / 3600);
	const newValue = value - hours * 3600;
	const minutes = Math.floor(newValue / 60);
	const seconds = newValue - minutes * 60;
	return addZero(hours) + ':' + addZero(minutes) + ':' + addZero(seconds) + '';
}
