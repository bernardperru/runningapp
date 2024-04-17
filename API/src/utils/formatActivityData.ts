export function getZone(heartRate: number): number {
  heartRate = Math.floor(heartRate);
  if (98 <= heartRate && heartRate <= 116) {
    return 1;
  } else if (117 <= heartRate && heartRate <= 136) {
    return 2;
  } else if (137 <= heartRate && heartRate <= 155) {
    return 3;
  } else if (156 <= heartRate && heartRate <= 175) {
    return 4;
  } else if (175 < heartRate) {
    return 5;
  } else {
    return 0;
  }
}

export function getCurrentWeekAndYear(): { week: number; year: number } {
  const currentDate = new Date();
  const startOfYear = new Date(currentDate.getFullYear(), 0, 0);

  // Find the first Thursday of the year
  const firstThursday = new Date(startOfYear.getTime());
  firstThursday.setDate(
    firstThursday.getDate() + ((4 - startOfYear.getDay() + 7) % 7)
  ); // Adjust to the first Thursday

  // Calculate the difference in days between the current date and the first Thursday
  const diffDays = Math.floor(
    (currentDate.getTime() - firstThursday.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Calculate the week number according to ISO 8601
  let week = Math.floor((diffDays + 3) / 7) + 1; // Adding 1 to adjust for the first week

  // Adjust the year if the week belongs to the previous year
  let year = currentDate.getFullYear();
  if (week === 0) {
    year--;
    week = 52;
  } else if (
    week === 53 &&
    (new Date(year, 0, 1).getDay() !== 4 || diffDays >= 364)
  ) {
    year++;
    week = 1;
  }

  return { week: week, year: year };
}

export function getWeek(start_date: string): number {
  const date = new Date(start_date);
  const yearStart = new Date(date.getFullYear(), 0, 1);
  const day = (yearStart.getDay() + 6) % 7; // Day of week (0 - 6) where Monday is 0

  const days = Math.floor(
    (date.getTime() -
      yearStart.getTime() -
      (date.getTimezoneOffset() - yearStart.getTimezoneOffset()) * 60000) /
      86400000
  );

  return Math.ceil((days + day + 1) / 7);
}

export function getYear(start_date: string) {
  const date = new Date(start_date);
  return date.getFullYear();
}

export function calculateRunningPace(time: number, meters: number): number {
  // Calculate pace in seconds per kilometer
  const kilometers = meters / 1000;
  const paceInSeconds = time / kilometers;

  // Convert pace to minutes per kilometer
  const paceInMinutes = paceInSeconds / 60;

  // Extract the integer part (minutes) and the fractional part (seconds)
  const minutes = Math.floor(paceInMinutes);
  const seconds = (paceInMinutes - minutes) * 60;

  // Round seconds to two decimal places
  const roundedSeconds = Math.round(seconds * 100) / 100;

  // Combine minutes and rounded seconds into a float
  const paceFloat = parseFloat(`${minutes}.${roundedSeconds}`);

  return paceFloat;
}
