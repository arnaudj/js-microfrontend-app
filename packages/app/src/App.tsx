import { FederationBoundary } from '@module-federation/utilities/src/utils/react';
import { VERSION } from 'api';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const dynamicImport = () => import('mfe/Component').then((m) => m.default);
const fallback = () =>
  import('./EmptyFallbackComponent').then((m) => m.default);

const App = () => {
  return (
    <>
      <h1>App version {VERSION}.</h1>
      <FederationBoundary
        dynamicImporter={dynamicImport}
        fallback={fallback}
        customBoundary={ErrorBoundary}
      />
    </>
  );
};

export default App;
