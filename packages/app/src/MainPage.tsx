import { FederationBoundary } from '@module-federation/utilities/src/utils/react';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { TransactionsGridContainer } from './features/transactions';

const dynamicImport = () => import('mfe/Component').then((m) => m.default);
const fallback = () =>
  import('./EmptyFallbackComponent').then((m) => m.default);

const App = () => {
  return (
    <>
      <TransactionsGridContainer />
      <FederationBoundary
        dynamicImporter={dynamicImport}
        fallback={fallback}
        customBoundary={ErrorBoundary}
      />
    </>
  );
};

export default App;
