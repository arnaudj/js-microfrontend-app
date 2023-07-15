import {
  NONCE,
  VERSION,
  isDebugModeEnabledState,
  selectedOrderIdsState,
} from 'api';
import { Typography } from 'ds/Typography';
import React from 'react';
import { selector, useRecoilValue } from 'recoil';
import AssetsAllocation from './features/assetsallocation/AssetsAllocation';

type ComponentProps = {
  message: string;
};

const nbSelectedOrderIdsState = selector({
  key: 'nbSelectedOrderIds',
  get: ({ get }) => get(selectedOrderIdsState).length,
});

const Component = ({ message }: ComponentProps) => {
  const nbSelectedOrderIds = useRecoilValue(nbSelectedOrderIdsState);
  const isDebugModeEnabled = useRecoilValue(isDebugModeEnabledState);

  return (
    <div
      style={{
        width: '400px',
        border: isDebugModeEnabled ? 'dashed green' : undefined,
      }}
    >
      <AssetsAllocation />
      <Typography variant="body1">
        Number of selected items: {nbSelectedOrderIds}
      </Typography>
      {isDebugModeEnabled && (
        <Typography variant="body1">
          Micro frontend running with API: version={VERSION}, nonce={NONCE}
        </Typography>
      )}
    </div>
  );
};

export default Component;
