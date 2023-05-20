import React from 'react';
import { VERSION, selectedOrderIdsState } from 'api';
import { selector, useRecoilValue } from 'recoil';

type ComponentProps = {
  message: string;
};

const nbSelectedOrderIdsState = selector({
  key: 'nbSelectedOrderIds',
  get: ({ get }) => get(selectedOrderIdsState).length,
});

const Component = ({ message }: ComponentProps) => {
  const nbSelectedOrderIds = useRecoilValue(nbSelectedOrderIdsState);
  return (
    <div>
      Micro frontend component (props message "{message}", API version:{' '}
      {VERSION}) Number of selected items: {nbSelectedOrderIds}
    </div>
  );
};

export default Component;
