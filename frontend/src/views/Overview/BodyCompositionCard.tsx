import { useAppSelector } from '@/app/hooks';
import Card from '@/components/Card';
import { selectStatsData } from '@/services/stats/statsSlice';
import { Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const RADIAN = Math.PI / 180;
const COLORS = ['#00C49F', '#ff5454', '#FFBB28'];

interface RenderCustomizedLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: RenderCustomizedLabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function BodyCompositionCard() {
  const stats = useAppSelector(selectStatsData);
  const pieChartData = (stats?.pieChart as any) || [];

  return (
    <Card className="w-full md:w-1/3 md:min-w-fit">
      <div className="flex flex-col items-center justify-center gap-3 py-3 h-full">
        <h6>Body composition</h6>
        <ResponsiveContainer
          width="100%"
          height="100%"
          minHeight="300px"
        >
          <PieChart
            width={400}
            height={300}
          >
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieChartData.map((_entry: any, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
