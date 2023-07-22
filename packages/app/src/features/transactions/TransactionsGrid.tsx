import { OrderId, Transaction } from 'api';
import { AgGridReact } from 'ds/AgGrid';
import React, { useEffect, useMemo, useState } from 'react';

interface TransactionsGridProps {
  onSelectionChange: (selection: string[]) => void;
  rowData: Transaction[];
  containerProps: object;
}

export default function TransactionsGrid({
  rowData,
  onSelectionChange,
  containerProps,
}: TransactionsGridProps) {
  const [gridAPI, setGridAPI] = useState();
  const [columnDefs, setColumnDefs] = useState([
    {
      field: 'date',
      filter: true,
      width: 220,
      headerCheckboxSelection: true,
      checkboxSelection: true,
      showDisabledCheckboxes: true,
    },
    { field: 'instrument', filter: true, width: 120 },
    { field: 'side', filter: true, width: 120 },
    { field: 'price', filter: true, width: 120 },
    { field: 'quantity', filter: true, width: 120 },
  ]);

  const defaultColDef = useMemo(
    () => ({ sortable: true, resizable: true }),
    []
  );

  const onGridReady = (e: any) => {
    setGridAPI(e.api);
  };

  useEffect(() => {
    if (rowData.length === 0 || !gridAPI) return;
    selectAllNodes(gridAPI);
  }, [rowData, gridAPI]);

  const onSelectionChanged = () => {
    // @ts-ignore
    const selectedRows = gridAPI.getSelectedRows();
    const newSelection = selectedRows
      .map((node: Transaction) => node.orderId)
      .filter((e: OrderId) => e !== undefined);
    onSelectionChange(newSelection);
  };

  return (
    <div>
      <div {...containerProps}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection="multiple"
          onSelectionChanged={onSelectionChanged}
          onGridReady={onGridReady}
        />
      </div>
    </div>
  );
}

function selectAllNodes(gridAPI: any) {
  const nodesToSelect: any[] = [];
  // @ts-ignore
  gridAPI.forEachNode((node: any) => {
    if (node.data && node.data.instrument !== '') {
      nodesToSelect.push(node);
    }
  });
  // @ts-ignore
  gridAPI.setNodesSelected({
    nodes: nodesToSelect,
    newValue: true,
  });
}
