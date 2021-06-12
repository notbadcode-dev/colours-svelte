import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';

dayjs.extend(isToday);
dayjs.extend(isYesterday);

export function getSinceFromDate(date) {
    const days = this.getSinceDays(date);
    if (this.dayIsToday(date)) {
        return 'today';
    } else if (this.dayIsYesterday(date)) {
        return 'yerterday';
    } else if (this.getSinceDays(date) < 7) {
        return `${this.getSinceDays(date)} days`;
    } else if (this.getSinceWeeks(date) === 1) {
        return `${this.getSinceWeeks(date)} week`;
    } else if (this.getSinceDays(date) > 7 && this.getSinceWeeks(date) < 4) {
        return `${this.getSinceWeeks(date)} weeks`;
    } else if (this.getSinceMonths(date) === 1) {
        return `${this.getSinceMonths(date)} moth`;
    } else if (this.getSinceWeeks(date) > 4 && this.getSinceMonths(date) < 12) {
        return `${this.getSinceMonths(date)} moths`;
    } else if (this.getSinceYears(date) === 1 || (this.getSinceYears(date) > 1 && this.getSinceYears(date) < 2)) {
        return `${this.getSinceYears(date)} year`
    } else if (this.getSinceYears(date) <= 5)  {
        return `${this.getSinceYears(date)} years`
    } else if (this.getSinceYears(date) > 5 ) {
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
