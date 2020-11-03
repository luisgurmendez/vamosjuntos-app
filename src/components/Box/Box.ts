import styled from 'styled-components/native';
import { Size, sizeToPx } from './utils';

export interface BoxProps {
  m?: Size; // margin
  mt?: Size; // margin-top
  mb?: Size; // margin-bottom
  ml?: Size; // margin-left
  mr?: Size; // margin-right
  mH?: Size; // margin-left && margin-right
  mV?: Size; // margin-top && margin-bottom
  p?: Size; // padding
  pt?: Size; // padding-top
  pb?: Size; // padding-bottom
  pl?: Size; // padding-left
  pr?: Size; // padding-rigth
  pH?: Size; // padding-right && padding-left
  pV?: Size; // padding-top && padding-bottom
}
export const Box = styled.View<BoxProps>`
  ${props => props.m !== undefined && `margin: ${sizeToPx(props.m)}px`};
  ${props => props.mH !== undefined && `margin-left: ${sizeToPx(props.mH)}px; margin-right: ${sizeToPx(props.mH)}px`};
  ${props => props.mV !== undefined && `margin-top ${sizeToPx(props.mV)}px; margin-bottom ${sizeToPx(props.mV)}px`};
  ${props => props.mt !== undefined && `margin-top: ${sizeToPx(props.mt)}px`};
  ${props => props.mb !== undefined && `margin-bottom: ${sizeToPx(props.mb)}px`};
  ${props => props.ml !== undefined && `margin-left: ${sizeToPx(props.ml)}px`};
  ${props => props.mr !== undefined && `margin-right: ${sizeToPx(props.mr)}px`};
  ${props => props.p !== undefined && `padding: ${sizeToPx(props.p)}px`};
  ${props => props.pH !== undefined && `padding-left: ${sizeToPx(props.pH)}px; padding-right: ${sizeToPx(props.pH)}px`};
  ${props => props.pV !== undefined && `padding-top: ${sizeToPx(props.pV)}px; padding-bottom: ${sizeToPx(props.pV)}px; `};
  ${props => props.pt !== undefined && `padding-top: ${sizeToPx(props.pt)}px`};
  ${props => props.pb !== undefined && `padding-bottom: ${sizeToPx(props.pb)}px`};
  ${props => props.pl !== undefined && `padding-left: ${sizeToPx(props.pl)}px`};
  ${props => props.pr !== undefined && `padding-right: ${sizeToPx(props.pr)}px`};
`
