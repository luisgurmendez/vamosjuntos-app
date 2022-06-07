import moment from 'moment';

export function toMoment(date: moment.Moment | string): moment.Moment {
  return typeof date === 'string' ? moment(date) : date;
}

export const getDateText = (date: moment.Moment | string): string => {
  const _date = toMoment(date);
  if (moment().isSame(_date, 'day')) {
    return 'Hoy';
  }

  if (moment().add(1, 'day').isSame(_date, 'day')) {
    return 'Mañana';
  }

  return _date.format('[El] dddd DD [de] MMMM');
};


export const getTimeText = (date: moment.Moment | string): string => {
  const _date = toMoment(date);
  return _date.format('[a las] HH:mm')
}

export const getDateTimeText = (date: moment.Moment | string): string => {
  const _date = toMoment(date);
  return `${getDateText(_date)} ${getTimeText(_date)}`
}