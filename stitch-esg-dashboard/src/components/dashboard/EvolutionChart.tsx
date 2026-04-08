import React, { useState, useMemo, useEffect } from 'react';
import { AreaChart } from '@tremor/react';
import { Card } from '../ui/Card';
import type { EvolutionDataPoint } from '../../types';

type Pillar = 'all' | 'E' | 'S' | 'G';
type TimeRange = '6months' | 'all';

interface EvolutionChartProps {
  data: EvolutionDataPoint[];
  showBenchmark?: boolean;
  benchmarkData?: { value: number; label: string };
}

const PILLAR_COLORS = {
  all: ['emerald', 'amber', 'blue'],
  E: ['emerald'],
  S: ['amber'],
  G: ['blue'],
};

const PILLAR_LABELS = {
  all: 'Todos',
  E: 'Ambiental',
  S: 'Social',
  G: 'Governança',
};

export const EvolutionChart: React.FC<EvolutionChartProps> = ({ 
  data, 
  showBenchmark = false,
  benchmarkData 
}) => {
  const [selectedPillar, setSelectedPillar] = useState<Pillar>('all');
  const [timeRange, setTimeRange] = useState<TimeRange>('6months');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Filter data based on time range
  const filteredData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    if (timeRange === '6months') {
      return data.slice(-6);
    }
    return data;
  }, [data, timeRange]);

  // Prepare chart data based on selected pillar
  const chartData = useMemo(() => {
    return filteredData.map(point => {
      const baseData: Record<string, number | string> = {
        month: point.month,
      };

      if (selectedPillar === 'all') {
        baseData['Ambiental'] = point.environmental;
        baseData['Social'] = point.social;
        baseData['Governança'] = point.governance;
      } else if (selectedPillar === 'E') {
        baseData['Score'] = point.environmental;
      } else if (selectedPillar === 'S') {
        baseData['Score'] = point.social;
      } else if (selectedPillar === 'G') {
        baseData['Score'] = point.governance;
      }

      // Add benchmark line if enabled
      if (showBenchmark && benchmarkData) {
        baseData[benchmarkData.label] = benchmarkData.value;
      }

      return baseData;
    });
  }, [filteredData, selectedPillar, showBenchmark, benchmarkData]);

  // Determine categories based on pillar selection
  const categories = useMemo(() => {
    if (selectedPillar === 'all') {
      const cats = ['Ambiental', 'Social', 'Governança'];
      if (showBenchmark && benchmarkData) {
        cats.push(benchmarkData.label);
      }
      return cats;
    }
    const cats = ['Score'];
    if (showBenchmark && benchmarkData) {
      cats.push(benchmarkData.label);
    }
    return cats;
  }, [selectedPillar, showBenchmark, benchmarkData]);

  const valueFormatter = (number: number) => `${number}`;

  const CustomTooltip = ({ payload, active, label }: any) => {
    if (!active || !payload) return null;
    return (
      <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 p-3 rounded-xl shadow-xl shadow-emerald-900/10 border-b-4">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-100 dark:border-slate-800 pb-1">{label}</p>
        <div className="space-y-1">
          {payload.map((category: any, idx: number) => (
            <div key={idx} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full bg-${category.color}-500`} />
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{category.dataKey}</span>
              </div>
              <span className="text-xs font-black text-slate-900 dark:text-white font-mono">{category.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const getPillarButtonClass = (pillar: Pillar) => {
    const baseClass = "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all";
    if (selectedPillar === pillar) {
      switch (pillar) {
        case 'all':
          return `${baseClass} bg-slate-900 text-white shadow-lg`;
        case 'E':
          return `${baseClass} bg-emerald-500 text-white shadow-lg shadow-emerald-500/30`;
        case 'S':
          return `${baseClass} bg-amber-500 text-white shadow-lg shadow-amber-500/30`;
        case 'G':
          return `${baseClass} bg-blue-500 text-white shadow-lg shadow-blue-500/30`;
      }
    }
    return `${baseClass} text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white`;
  };

  return (
    <Card 
      title="Evolução da Jornada" 
      headerAction={
        <select 
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value as TimeRange)}
          className="text-xs font-bold uppercase tracking-widest bg-slate-50 dark:bg-slate-800 border-none rounded-lg focus:ring-primary focus:ring-2 p-2 cursor-pointer outline-none"
        >
          <option value="6months">Últimos 6 Meses</option>
          <option value="all">Desde o Início</option>
        </select>
      }
    >
      {/* Pillar Tabs */}
      <div className="flex items-center gap-2 mb-6 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl w-fit">
        {(Object.keys(PILLAR_LABELS) as Pillar[]).map((pillar) => (
          <button
            key={pillar}
            onClick={() => setSelectedPillar(pillar)}
            className={getPillarButtonClass(pillar)}
          >
            {PILLAR_LABELS[pillar]}
          </button>
        ))}
      </div>

      <div className="h-72">
        {chartData.length > 0 ? (
          <AreaChart
            className="h-full"
            data={chartData}
            index="month"
            categories={categories}
            colors={selectedPillar === 'all' ? PILLAR_COLORS[selectedPillar] : ['emerald']}
            valueFormatter={valueFormatter}
            yAxisWidth={48}
            showAnimation={!prefersReducedMotion}
            showLegend={categories.length > 1}
            showGridLines={true}
            curveType="monotone"
            minValue={0}
            maxValue={100}
            customTooltip={CustomTooltip}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-slate-400">
            <p className="text-sm font-medium">Nenhum dado de evolução disponível</p>
          </div>
        )}
      </div>

      {/* Legend for single pillar mode */}
      {selectedPillar !== 'all' && chartData.length > 0 && (
        <div className="mt-4 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-emerald-500" />
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
              {PILLAR_LABELS[selectedPillar]}
            </span>
          </div>
          {showBenchmark && benchmarkData && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-slate-400" />
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                {benchmarkData.label}
              </span>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default EvolutionChart;
