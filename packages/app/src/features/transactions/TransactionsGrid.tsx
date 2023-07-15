import { AgGridReact } from 'ds/AgGrid';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { OrderId, Transaction } from '../../model/Transaction';

interface TransactionsGridProps {
  onSelectionChange: (selection: string[]) => void;
  rowData: Transaction[];
}

export default function TransactionsGrid({
  rowData,
  onSelectionChange,
}: TransactionsGridProps) {
  const gridRef = useRef();
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

  useEffect(() => {
    if (rowData.length === 0) return;
    selectAllNodes(gridRef);
  }, [rowData]);

  const onSelectionChanged = () => {
    // @ts-ignore
    const selectedRows = gridRef.current.api.getSelectedRows();
    const newSelection = selectedRows
      .map((node: Transaction) => node.orderId)
      .filter((e: OrderId) => e !== undefined);
    onSelectionChange(newSelection);
  };

  return (
    <div>
      <div className="ag-theme-alpine" style={{ width: 710, height: 460 }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection="multiple"
          onSelectionChanged={onSelectionChanged}
        />
      </div>
    </div>
  );
}

function selectAllNodes(gridRef: React.MutableRefObject<undefined>) {
  const nodesToSelect: any[] = [];
  // @ts-ignore
  gridRef.current.api.forEachNode((node: any) => {
    if (node.data && node.data.instrument !== '') {
      nodesToSelect.push(node);
    }
  });
  // @ts-ignore
  gridRef.current.api.setNodesSelected({
    nodes: nodesToSelect,
    newValue: true,
  });
}
