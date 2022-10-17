import React from 'react'
import styled from 'styled-components/native';
import { colors } from 'utils/colors';
import { Body } from 'components/Typography/Typography';
import { TextStyle } from 'react-native';
import { Ride, RideStatus } from 'types/models';
import { useSelector } from 'react-redux';
import { getUser } from 'state/user/selectors';
import moment from 'moment';
import Button from 'components/Button/Button';
import AbsolutePositioned from 'components/AbsolutePositioned/AbsolutePositioned';

interface RideFooterProps {
  ride: Ride;
  onCancelRide: () => void;
  onCompleteRide: () => void;
}

const RideFooter: React.FC<RideFooterProps> = ({ ride, onCancelRide, onCompleteRide }) => {
  const isPassedDate = moment().diff(moment(ride.date)) > 0;
  const user = useSelector(getUser);
  const isDriver = user && user.id === ride.driver.id;
  const isPassenger = user !== undefined && ride.passengers.map(p => p.user.id).includes(user!.id);
  const footerButtonTextStyle: TextStyle = { fontSize: 20, fontWeight: "bold" };

  if (ride.status === RideStatus.PENDING) {
    return (
      <Footer>
        {(isDriver || isPassenger) && (
          <FooterButton
            type="danger"
            textStyle={footerButtonTextStyle}
            onPress={onCancelRide}
          >
            {isDriver ? 'Cancelar viaje' : 'Bajarme del viaje'}
          </FooterButton>
        )}

        {isPassedDate &&
          <FooterButton onPress={onCompleteRide} textStyle={footerButtonTextStyle}>
            Completado
          </FooterButton>
        }
      </Footer>
    )
  }

  if (ride.status === RideStatus.COMPLETED) {
    return (<Footer><Body style={{ color: colors.success }}>Completado</Body></Footer>)
  }

  if (ride.status === RideStatus.CANCELED) {
    return (
      <AbsolutePositioned bottom={60} left={20} pointerEvents={"box-none"}>
        <CancelledTextContainer pointerEvents={"box-none"} style={{ transform: [{ rotate: '-15deg' }] }}>
          <CancelledText>CANCELADO</CancelledText>
        </CancelledTextContainer>
      </AbsolutePositioned>
    )
  }
  return (null)
}

export default RideFooter;

const Footer = styled.View`
  display: flex;
  flex-direction: row;
  margin-horizontal: 8px;
  padding: 8px;
  justify-content: center;
`

const FooterButton = styled(Button)`
  flex: 1;
  margin-horizontal: 4px;
`

const CancelledText = styled.Text`
  font-size: 45px;
  color: ${colors.danger};
  font-family: Times New Roman;

`

const CancelledTextContainer = styled.View`
  padding: 16px;
  borderWidth: 4px;
  borderColor: ${colors.danger};
  borderStyle: dashed;
  borderRadius: 2px;
`
