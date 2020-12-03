import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Size, sizeToPx } from './utils';
// TODO it's a good idea but needs more thinking...

interface MarginedChildrenProps {
  m?: Size; // margin
  mt?: Size; // margin-top
  mb?: Size; // margin-bottom
  ml?: Size; // margin-left
  mr?: Size; // margin-right
  mH?: Size; // margin-left && margin-right
  mV?: Size; // margin-top && margin-bottom
  applyToLast?: boolean;
}

const MarginedChildren: React.FC<MarginedChildrenProps> = ({
  m,
  mt,
  mb,
  ml,
  mr,
  mH,
  mV,
  applyToLast = true,
  children
}) => {
  console.log(children)
  return React.Children.map<any, any>(children, (child, i) => {
    console.log(child)
    if (child) {
      let marginedStyles: any = {
        margin: sizeToPx(m),
        marginHorizontal: sizeToPx(mH),
        marginVertical: sizeToPx(mV),
        marginTop: sizeToPx(mt),
        marginBottom: sizeToPx(mb),
        marginLeft: sizeToPx(ml),
        marginRight: sizeToPx(mr)
      };
      Object.keys(marginedStyles).forEach((k) => {
        const typedK = (k as unknown) as keyof typeof marginedStyles;
        if (marginedStyles[typedK] === 0) {
          delete marginedStyles[typedK];
        }
      });
      if (!applyToLast && Array.isArray(children) && i === children.length - 1) {
        marginedStyles = {};
      }
      return React.cloneElement(child, { style: [marginedStyles, child.props.style] });
    }

    return child;
  });
};

export default MarginedChildren;
