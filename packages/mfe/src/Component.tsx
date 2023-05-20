import React from 'react';
import { VERSION } from 'api';

type ComponentProps = {
  message: string;
};

const Component = ({ message }: ComponentProps) => {
  return (
    <div>
      Component with props message "{message}" and API version: {VERSION}
    </div>
  );
};

export default Component;
