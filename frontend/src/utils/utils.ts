export function averageOrSum(value: number, denominator: number, type: string): number {
	if (type === 'avg') {
		return value / denominator;
	}
	return value;
}

// export function getCurrentWeekAndYear(): { week: number; year: number } {
// 	const currentDate = new Date();
// 	const startOfYear = new Date(currentDate.getFullYear(), 0, 0);
// 	const diff =
// 		currentDate.getTime() -
// 		startOfYear.getTime() +
// 		(startOfYear.getTimezoneOffset() - currentDate.getTimezoneOffset()) * 60 * 1000;
// 	const oneWeek = 1000 * 60 * 60 * 24 * 7;
// 	const week = Math.floor(diff / oneWeek) + 1; // Adding 1 to adjust for the first week
// 	const year = currentDate.getFullYear();
// 	//
// 	return { week: week, year: year };
// }

export function getCurrentWeekAndYear(): { week: number; year: number } {
	const currentDate = new Date();
	const startOfYear = new Date(currentDate.getFullYear(), 0, 0);

	// Find the first Thursday of the year
	const firstThursday = new Date(startOfYear.getTime());
	firstThursday.setDate(firstThursday.getDate() + ((4 - startOfYear.getDay() + 7) % 7)); // Adjust to the first Thursday

	// Calculate the difference in days between the current date and the first Thursday
	const diffDays = Math.floor((currentDate.getTime() - firstThursday.getTime()) / (1000 * 60 * 60 * 24));

	// Calculate the week number according to ISO 8601
	let week = Math.floor((diffDays + 3) / 7) + 1; // Adding 1 to adjust for the first week

	// Adjust the year if the week belongs to the previous year
	let year = currentDate.getFullYear();
	if (week === 0) {
		year--;
		week = 52;
	} else if (week === 53 && (new Date(year, 0, 1).getDay() !== 4 || diffDays >= 364)) {
		year++;
		week = 1;
	}

	return { week: week, year: year };
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
