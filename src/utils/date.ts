import moment from 'moment';

export const getDateText = (date: moment.Moment): string => {
  if (moment().isSame(date, 'day')) {
    return 'Hoy';
  }

  if (moment().add(1, 'day').isSame(date, 'day')) {
    return 'Mañana';
  }

  return date.format('[El] dddd DD [de] MMMM');
};


export const getTimeText = (date: moment.Moment): string => {
  return date.format('[a las ] HH:mm')
}