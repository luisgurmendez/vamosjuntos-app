import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { usePlatform } from 'hooks/usePlatform';
import PlainButton from 'components/Button/PlainButton';
import { Box } from 'components/Box/Box';

interface HourInputProps {
  onTimeChange?: (date: moment.Moment) => void;
  date: moment.Moment;
}

const TimePicker: React.FC<HourInputProps> = ({ onTimeChange, date }) => {

  const [show, setShow] = useState(false);
  const { isAndroid } = usePlatform();

  const handleTimeChange = (e: any, timeDate?: Date) => {
    if (isAndroid) {
      setShow(false);
    }

    if (timeDate) {
      const _date = date.clone();
      _date.set({ hour: timeDate.getHours(), minutes: timeDate.getMinutes() });
      onTimeChange && onTimeChange(_date);
    }

  }

  const handleAndroidOpenTimePicker = () => {
    setShow(true);
  }

  return (
    <>
      {(!isAndroid || show) && <DateTimePicker onChange={handleTimeChange} mode="time" display={"spinner"} value={date.toDate()} />}
      {isAndroid && (
        <Box mb="xlg">
          <PlainButton onPress={handleAndroidOpenTimePicker}>Elegi hora</PlainButton>
        </Box>
      )}
    </>
  );
};

export default TimePicker;

