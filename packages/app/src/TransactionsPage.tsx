import { FederationBoundary } from '@module-federation/utilities/src/utils/react';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { TransactionsGridContainer } from './features/transactions';
import { Stack } from 'ds/Stack';
import { useRecoilState } from 'recoil';
import { isDebugModeEnabledState } from 'api';

const dynamicImport = () => import('mfe/Component').then((m) => m.default);
const fallback = () =>
  import('./EmptyFallbackComponent').then((m) => m.default);

const TransactionsPage = () => {
  const [isDebugModeEnabled, setIsDebugModeEnabled] = useRecoilState(
    isDebugModeEnabledState
  );
  return (
    <Stack direction="column" spacing={1}>
      <Stack direction="row" spacing={1}>
        <TransactionsGridContainer />
        <FederationBoundary
          dynamicImporter={dynamicImport}
          fallback={fallback}
          customBoundary={ErrorBoundary}
        />
      </Stack>
      <div>
        <span>
          <input
            type="checkbox"
            id="debugMode"
            name="debugMode"
            checked={isDebugModeEnabled}
            onChange={() => setIsDebugModeEnabled((prev) => !prev)}
          />
          <label htmlFor="debugMode">Debug mode</label>
        </span>
      </div>
    </Stack>
  );
};

export default TransactionsPage;
