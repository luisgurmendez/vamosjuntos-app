import React from 'react';
import { Size, sizeToPx } from './utils';
// TODO it's a good idea but needs more thinking...

interface MarginedChildrenProps {
  margin: Size;
}

const MarginedChildren: React.FC<MarginedChildrenProps> = ({ margin, children }) => {
  return React.Children.map<any, any>(children, child => {
    console.log(child)
    if (child) {
      return React.cloneElement(child, { style: [{ margin: sizeToPx(margin), borderColor: 'red', borderWidth: 1 }, child.props.style] })
    }

    return child;
  })
}

export default MarginedChildren;

