import { addDays, isEqual, subDays } from 'date-fns';
import { SECONDS_PER_HOUR, MILLISECONDS_IN_AN_HOUR, SECONDS_PER_DAY, MILLISECONDS_IN_A_DAY, MILLISECONDS_IN_A_SECOND, MILLISECONDS_IN_A_WEEK, SECONDS_PER_WEEK } from '../multicall/constants';


export function truncateTimestamp(timestamp: Date, minutes = 5): Date {
  const x = 1000 * 60 * (minutes ?? 5);
  return new Date(Math.floor(timestamp.getTime() / x) * x);
}

export function truncateTimestampToSeconds(timestamp: Date, seconds?: number): Date;
export function truncateTimestampToSeconds(timestamp: number, seconds?: number): number;
export function truncateTimestampToSeconds(timestamp: Date | number, seconds = 30): Date | number {
  if (typeof timestamp === 'number') {
    return timestamp - (timestamp % seconds);
  }
  const x = 1000 * seconds;
  return new Date(Math.floor(timestamp.getTime() / x) * x);
}

export function timestampToSeconds(timestamp: Date): number {
  return Math.floor(timestamp.getTime() / 1000);
}

export function secondsToTimestamp(seconds: number): Date {
  return new Date(seconds * 1000);
}

export function startOfHour(timestamp: Date): Date;
export function startOfHour(timestamp: number): number;
export function startOfHour(timestamp: Date | number): Date | number {
  if (typeof timestamp === 'number') {
    return timestamp - (timestamp % SECONDS_PER_HOUR);
  }
  const millisecondsSinceStart = timestamp.getTime();
  return new Date(millisecondsSinceStart - (millisecondsSinceStart % MILLISECONDS_IN_AN_HOUR));
}

export function startOfDayUTC(timestamp: Date): Date;
export function startOfDayUTC(timestamp: number): number;
export function startOfDayUTC(timestamp: Date | number): Date | number {
  if (typeof timestamp === 'number') {
    return timestamp - (timestamp % SECONDS_PER_DAY);
  }
  const millisecondsSinceStart = timestamp.getTime();
  return new Date(millisecondsSinceStart - (millisecondsSinceStart % MILLISECONDS_IN_A_DAY));
}

export function startOfWeekUTC(timestamp: Date): Date;
export function startOfWeekUTC(timestamp: number): number;
export function startOfWeekUTC(timestamp: Date | number): Date | number {
  // NOTE: set the week start to monday
  const type = typeof timestamp;
  if (type === 'number') {
    timestamp = new Date((timestamp as number) * MILLISECONDS_IN_A_SECOND);
  }
  const millisecondsSinceStart = (timestamp as Date).getTime(); // since 01-01-1970 (Thursday)
  const millisecondsUntilFirstMonday = 4 * MILLISECONDS_IN_A_DAY;
  const weekHasPasses = Math.floor((millisecondsSinceStart - millisecondsUntilFirstMonday) / MILLISECONDS_IN_A_WEEK);
  const lastMondayInMilliseconds = millisecondsUntilFirstMonday + weekHasPasses * MILLISECONDS_IN_A_WEEK;
  if (type === 'number') {
    return lastMondayInMilliseconds / MILLISECONDS_IN_A_SECOND;
  }
  return new Date(lastMondayInMilliseconds);
}

export function startOfWeekThursdayUTC(timestamp: Date): Date;
export function startOfWeekThursdayUTC(timestamp: number): number;
export function startOfWeekThursdayUTC(timestamp: Date | number): Date | number {
  // NOTE: set the week start to thursday
  if (typeof timestamp === 'number') {
    return timestamp - (timestamp % SECONDS_PER_WEEK);
  }
  const millisecondsSinceStart = timestamp.getTime(); // since 01-01-1970 (Thursday)
  const weekHasPasses = Math.floor(millisecondsSinceStart / MILLISECONDS_IN_A_WEEK);

  const lastThursdayInMilliseconds = weekHasPasses * MILLISECONDS_IN_A_WEEK;
  return new Date(lastThursdayInMilliseconds);
}

export function startOfDayUTCOrPrev(timestamp: Date): Date {
  let startDate = startOfDayUTC(timestamp);

  if (isEqual(timestamp, startDate)) {
    startDate = subDays(startDate, 1);
  }

  return startDate;
}

/**
 * Return the last thursday of the previous month
 * If we have past the last thursday of the month, return the last thursday of the current month
 * @param nowTimestamp
 */
export function getPreviousMonthEpochTimestamp(nowTimestamp: Date) {
  let prevMonthTimestamp = new Date(
    Math.floor(nowTimestamp.getTime() / MILLISECONDS_IN_A_WEEK) * MILLISECONDS_IN_A_WEEK,
  );

  // if next thursday is next month -> return the last thursday of the current month
  if (addDays(prevMonthTimestamp, 7).getUTCMonth() !== nowTimestamp.getUTCMonth()) {
    return prevMonthTimestamp;
  }

  // if the last thursday is the month first day -> return that first day
  while (prevMonthTimestamp.getUTCMonth() === nowTimestamp.getUTCMonth() && prevMonthTimestamp.getDate() !== 1) {
    prevMonthTimestamp = subDays(prevMonthTimestamp, 7);
  }

  return prevMonthTimestamp;
}

export function secondToTimeUTC(seconds: number) {
  return new Date(seconds * MILLISECONDS_IN_A_SECOND);
}

export function getCurrentTimestampInMilliseconds() {
  return Date.now();
}

export function getCurrentTimestamp() {
  return Math.floor(Date.now() / MILLISECONDS_IN_A_SECOND);
}

export function getTimestampInSeconds(timestamp: Date) {
  return Math.floor(timestamp.getTime() / MILLISECONDS_IN_A_SECOND);
}
