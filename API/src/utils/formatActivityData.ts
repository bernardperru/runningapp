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

export function getWeek(start_date: string) {
  const currentDate = new Date(start_date);
  const startDate = new Date(currentDate.getFullYear(), 0, 1);
  const days = Math.floor(
    (currentDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)
  );
  const weekNumber = Math.ceil(days / 7);

  return weekNumber;
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
