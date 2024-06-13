import { useAppSelector } from '@/app/hooks';
import Card from '@/components/Card';
import { selectStatsData } from '@/services/stats/statsSlice';
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

export default function ProgressChartCard() {
  const stats = useAppSelector(selectStatsData);
  const lineChartData = (stats?.lineChart as any) || null;

  return (
    <Card className="w-full">
      <div className="flex flex-col items-center justify-center gap-3 py-3 h-full">
        <h6>Last 10 records progress</h6>
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
              dataKey="weight"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
