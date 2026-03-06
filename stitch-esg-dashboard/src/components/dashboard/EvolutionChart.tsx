import React from 'react';
import { AreaChart } from '@tremor/react';
import { Card } from '../ui/Card';

interface EvolutionChartProps {
  data: { month: string; score: number }[];
}

const valueFormatter = (number: number) => `${number} XP`;

export const EvolutionChart: React.FC<EvolutionChartProps> = ({ data }) => {
  return (
    <Card 
      title="Evolução da Jornada" 
      headerAction={
        <select className="text-[10px] font-black uppercase tracking-widest bg-slate-50 dark:bg-slate-800 border-none rounded-lg focus:ring-primary focus:ring-2 p-2 cursor-pointer outline-none">
          <option>Últimos 6 Meses</option>
          <option>Desde o Início</option>
        </select>
      }
    >
      <div className="h-72 mt-4">
        <AreaChart
          className="h-full"
          data={data}
          index="month"
          categories={['score']}
          colors={['emerald']}
          valueFormatter={valueFormatter}
          yAxisWidth={40}
          showAnimation={true}
          showLegend={false}
          showGridLines={true}
          curveType="monotone"
        />
      </div>
    </Card>
  );
};
