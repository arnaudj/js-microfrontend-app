import { FederationBoundary } from '@module-federation/utilities/src/utils/react';
import { VERSION, selectedOrderIdsState } from 'api';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useRecoilState } from 'recoil';
import { Item } from './Item';

const dynamicImport = () => import('mfe/Component').then((m) => m.default);
const fallback = () =>
  import('./EmptyFallbackComponent').then((m) => m.default);

const App = () => {
  const [selectedOrderIds, setSelectedOrderIds] = useRecoilState(
    selectedOrderIdsState
  );
  return (
    <>
      <h1>App version {VERSION}.</h1>
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <Item
            key={i}
            id={'item ' + i}
            label={'Item ' + i}
            selectedOrderIds={selectedOrderIds}
            setSelectedOrderIds={setSelectedOrderIds}
          />
        ))}
      <FederationBoundary
        dynamicImporter={dynamicImport}
        fallback={fallback}
        customBoundary={ErrorBoundary}
      />
    </>
  );
};

export default App;
