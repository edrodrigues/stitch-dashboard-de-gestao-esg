import React from 'react';
import { LeafyGreen, ShieldCheck, HelpCircle, FileText } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto px-4 md:px-8 pb-12 pt-4">
      <div className="max-w-7xl mx-auto">
        <div className="glass-surface rounded-[2.5rem] p-10 border-2 border-slate-100 dark:border-slate-800 shadow-2xl shadow-emerald-900/5">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-inner">
                <LeafyGreen size={24} />
              </div>
              <div>
                <h4 className="text-lg font-black uppercase tracking-tighter text-slate-900 dark:text-white font-display">GUIA ESG BRASIL</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest opacity-80 mt-0.5 font-display">Democratizando a sustentabilidade corporativa</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
              <a href="#" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-primary transition-all hover:-translate-y-0.5 font-display group">
                <HelpCircle size={14} className="group-hover:rotate-12 transition-transform" />
                Ajuda & FAQ
              </a>
              <a href="#" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-primary transition-all hover:-translate-y-0.5 font-display group">
                <ShieldCheck size={14} className="group-hover:rotate-12 transition-transform" />
                Privacidade
              </a>
              <a href="#" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-primary transition-all hover:-translate-y-0.5 font-display group">
                <FileText size={14} className="group-hover:rotate-12 transition-transform" />
                Termos de Uso
              </a>
            </div>

            <div className="text-center lg:text-right border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-slate-800 pt-8 lg:pt-0 lg:pl-10">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] leading-relaxed">
                © Manifesto Ambiental, 2026. <br className="hidden lg:block" /> Desenvolvido por <a href="https://www.futurereadylabs.com.br" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline transition-all">FRL_</a>.
              </p>
              <div className="flex items-center justify-center lg:justify-end gap-2 mt-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                <span className="text-[9px] font-black text-slate-900 dark:text-slate-100 uppercase tracking-[0.25em] font-display">SISTEMA OPERACIONAL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
