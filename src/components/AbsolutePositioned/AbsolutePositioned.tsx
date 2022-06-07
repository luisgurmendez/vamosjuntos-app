import styled from 'styled-components/native';

interface AbsolutePositionedProps {
  top?: string | number;
  bottom?: string | number;
  left?: string | number;
  right?: string | number;
}

const AbsolutePositioned = styled.View<AbsolutePositionedProps>`
  z-index: 10;
  position: absolute;
  ${(props) => props.top !== undefined && `top: ${props.top};`}
  ${(props) => props.bottom !== undefined && `bottom: ${props.bottom};`}
  ${(props) => props.left !== undefined && `left: ${props.left};`}
  ${(props) => props.right !== undefined && `right: ${props.right};`}
`;
export default AbsolutePositioned;
