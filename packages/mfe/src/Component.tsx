import React from 'react';
import { VERSION, selectedOrderIdsState } from 'api';
import { selector, useRecoilValue, useSetRecoilState } from 'recoil';
import Button from 'ds/Button';
import Typography from 'ds/Typography';

type ComponentProps = {
  message: string;
};

const nbSelectedOrderIdsState = selector({
  key: 'nbSelectedOrderIds',
  get: ({ get }) => get(selectedOrderIdsState).length,
});

const Component = ({ message }: ComponentProps) => {
  const nbSelectedOrderIds = useRecoilValue(nbSelectedOrderIdsState);
  const setSelectedOrderIdsState = useSetRecoilState(selectedOrderIdsState);

  return (
    <>
      <Typography variant="body1" gutterBottom>
        Micro frontend component (props message "{message}", API version:{' '}
        {VERSION}) Number of selected items: {nbSelectedOrderIds}
      </Typography>
      <Button variant="contained" onClick={() => setSelectedOrderIdsState([])}>
        Reset count
      </Button>
    </>
  );
};

export default Component;
