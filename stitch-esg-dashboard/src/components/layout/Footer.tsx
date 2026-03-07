import React from 'react';
import { LeafyGreen, ShieldCheck, HelpCircle, FileText } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto px-4 md:px-8 pb-8 pt-4">
      <div className="max-w-7xl mx-auto">
        <div className="glass-surface rounded-3xl p-8 border-2 border-slate-100 dark:border-slate-800 shadow-xl shadow-emerald-900/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <LeafyGreen size={20} />
              </div>
              <div>
                <h4 className="text-sm font-black uppercase tracking-tighter text-slate-900 dark:text-white">GUIA ESG BRASIL</h4>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest opacity-70">Democratizando a sustentabilidade corporativa</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              <a href="#" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-primary transition-colors">
                <HelpCircle size={14} />
                Ajuda & FAQ
              </a>
              <a href="#" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-primary transition-colors">
                <ShieldCheck size={14} />
                Privacidade
              </a>
              <a href="#" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-primary transition-colors">
                <FileText size={14} />
                Termos de Uso
              </a>
            </div>

            <div className="text-center md:text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                © {new Date().getFullYear()} Stitch. All rights reserved.
              </p>
              <div className="flex items-center justify-center md:justify-end gap-2 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">SISTEMA OPERACIONAL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
