import { GoogleChart } from 'ds/GoogleChart';
import { Typography } from 'ds/Typography';
import React, { useEffect } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import Widget from '../../components/Widget';
import { activePositionCashAllocationState, activePositionsState, instrumentPriceFamilyState } from '../../state';

const chartOptions = {
  title: 'Allocation',
  is3D: true,
};

export default function AssetsAllocation() {
  const allocations = useRecoilValue(activePositionCashAllocationState);
  const positions = useRecoilValue(activePositionsState);
  const setInstrumentDummyPrices = useRecoilCallback(({ set }) => () => {
    set(instrumentPriceFamilyState('BTC-USD'), 21000);
    set(instrumentPriceFamilyState('AAPL-USD'), 165);
  });
  useEffect(() => {
    setInstrumentDummyPrices();
  }, []);

  const flattenAllocations = () => [
    ['Instrument', 'Cash value'],
    ...Array.from(allocations.entries()).map((e) => [e[0], e[1]]),
  ];

  return (
    <Widget title="Assets allocation" subTitle="At current cash value">
      <GoogleChart
        chartType="PieChart"
        data={flattenAllocations()}
        options={chartOptions}
        width="100%"
        height="300px"
      />
      <Typography>Instrument quantities:</Typography>
      {Array.from(positions.entries()).map((p) => (
        <Typography key={'qty-' + p[0]}>
          - {p[0]}: {Number(p[1].quantity.toFixed(2))} units
        </Typography>
      ))}
    </Widget>
  );
}
