import { useAppSelector } from '@/app/hooks';
import Card from '@/components/Card';
import { selectStatsData } from '@/services/stats/statsSlice';
import { Select } from 'flowbite-react';
import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const attributeOptions = [
  {
    label: 'Weight',
    key: 'weight',
  },
  {
    label: 'Muscle %',
    key: 'muscle',
  },
  {
    label: 'Body Fat %',
    key: 'bodyFat',
  },
  {
    label: 'Muscle Kg',
    key: 'muscleKg',
  },
  {
    label: 'Body Fat Kg',
    key: 'bodyFatKg',
  },
  {
    label: 'Visceral',
    key: 'visceral',
  },
  {
    label: 'BMI',
    key: 'bmi',
  },
];

export default function ProgressChartCard() {
  const stats = useAppSelector(selectStatsData);
  const lineChartData = (stats?.lineChart as any) || null;
  const [attribute, setAttribute] = useState('weight');

  return (
    <Card className="w-full">
      <div className="flex flex-col items-center justify-center gap-3 py-3 h-full">
        <div className="w-full flex items-center justify-between px-6">
          <h6>Last 10 records progress</h6>
          <Select onChange={e => setAttribute(e.target.value)}>
            {attributeOptions.map(op => (
              <option
                key={op.key}
                value={op.key}
              >
                {op.label}
              </option>
            ))}
          </Select>
        </div>
        <ResponsiveContainer
          width="100%"
          height="100%"
          minHeight="300px"
        >
          <LineChart
            data={lineChartData}
            width={300}
            height={300}
            margin={{ right: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              angle={45}
              tick={{ fontSize: '0.6rem', fill: 'red' }}
              dx={20}
              dy={20}
              height={60}
            />
            <YAxis
              type="number"
              tick={{ fontSize: '0.6rem', fill: 'red' }}
              domain={['dataMin - 5', 'dataMax + 5']}
              allowDataOverflow={true}
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey={attribute}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
