import React from 'react';
import { NONCE, VERSION, selectedOrderIdsState } from 'api';
import { selector, useRecoilValue, useSetRecoilState } from 'recoil';
import { Button } from 'ds/Button';
import { Typography } from 'ds/Typography';

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
    <div style={{ border: 'solid green' }}>
      <Typography variant="body1">
        Micro frontend running with API: version={VERSION}, nonce={NONCE}
      </Typography>
      <Typography variant="body1">
        Number of selected items: {nbSelectedOrderIds}
      </Typography>
      <Button variant="contained" onClick={() => setSelectedOrderIdsState([])}>
        Reset count
      </Button>
    </div>
  );
};

export default Component;
