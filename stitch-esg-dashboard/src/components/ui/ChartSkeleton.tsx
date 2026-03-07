import React from 'react';

export const ChartSkeleton: React.FC = () => (
  <div className="animate-pulse bg-slate-100 dark:bg-slate-800 rounded-2xl h-72 flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-700">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-4 border-slate-300 border-t-primary rounded-full animate-spin"></div>
      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Processando Dados...</span>
    </div>
  </div>
);
