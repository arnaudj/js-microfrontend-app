import React from 'react';
import { VERSION } from 'api';

type ComponentProps = {
  message: string;
};

const Component = ({ message }: ComponentProps) => {
  return (
    <div>
      Micro frontend component (props message "{message}", API version:{' '}
      {VERSION})
    </div>
  );
};

export default Component;
