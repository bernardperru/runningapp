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

export function calculateRunningPace(time: number, meters: number): string {
  // Calculate pace in seconds per kilometer
  const kilometers = meters / 1000;
  const paceInSeconds = time / kilometers;

  // Calculate minutes and seconds
  const minutes = Math.floor(paceInSeconds / 60);
  const seconds = Math.round(paceInSeconds % 60);

  // Format the result as a string (MM:SS)
  const formattedPace = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  return formattedPace;
}
