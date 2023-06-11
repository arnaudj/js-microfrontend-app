import React from 'react';

interface Props {
  label: string;
}
export default (props: Props) => {
  console.log('Button: props:', JSON.stringify(props));
  return <button>{props.label || 'A button'}</button>;
};
