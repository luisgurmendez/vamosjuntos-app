import moment from 'moment';
import React from 'react'
import { Text } from "components/Typography/Typography";

interface UserSinceProps {
  date: string;
}

const UserSince: React.FC<UserSinceProps> = ({ date }) => {

  return (
    <Text>Usuario desde {moment(date).format('MMM YYYY')}</Text>
  )

}

export default UserSince;
