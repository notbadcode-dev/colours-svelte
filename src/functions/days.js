import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';

dayjs.extend(isToday);
dayjs.extend(isYesterday);

export function getSinceFromDate(date) {
    const days = getSinceDays(date);
    if (dayIsToday(date)) {
        return 'today';
    } else if (dayIsYesterday(date)) {
        return 'yerterday';
    } else if (getSinceDays(date) < 7) {
        return `${getSinceDays(date)} days`;
    } else if (getSinceWeeks(date) === 1) {
        return `${getSinceWeeks(date)} week`;
    } else if (getSinceDays(date) > 7 && getSinceWeeks(date) < 4) {
        return `${getSinceWeeks(date)} weeks`;
    } else if (getSinceMonths(date) === 1) {
        return `${getSinceMonths(date)} moth`;
    } else if (getSinceWeeks(date) > 4 && getSinceMonths(date) < 12) {
        return `${getSinceMonths(date)} moths`;
    } else if (getSinceYears(date) === 1 || (getSinceYears(date) > 1 && getSinceYears(date) < 2)) {
        return `${getSinceYears(date)} year`
    } else if (getSinceYears(date) <= 5)  {
        return `${getSinceYears(date)} years`
    } else if (getSinceYears(date) > 5 ) {
        return 'a long time';
    }
}

function dayIsToday(date) {
    return dayjs(date).isToday();
}

function dayIsYesterday(date) {
    return dayjs(date).isYesterday();
}

function getSinceDays(date) {
    return dayjs(dayjs()).diff(date, 'day');
}

function getSinceWeeks(date) {
    return dayjs(dayjs()).diff(date, 'week');
}

function getSinceMonths(date) {
    return dayjs(dayjs()).diff(date, 'month');
}

function getSinceYears(date) {
    return dayjs(dayjs()).diff(date, 'year');
}
