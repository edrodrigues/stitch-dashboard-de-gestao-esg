import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Bell, Sun, Lock, Shield, Eye, Smartphone } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">Configurações</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Personalize sua experiência e gerencie as preferências da sua conta.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card title="Preferências de Interface" subtitle="Ajuste como a plataforma aparece para você">
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-200 dark:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300">
                    <Sun size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100">Modo de Exibição</p>
                    <p className="text-xs text-slate-500">Alternar entre tema claro e escuro</p>
                  </div>
                </div>
                <div className="flex bg-slate-200 dark:bg-slate-700 p-1 rounded-xl">
                  <button className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-600 shadow-sm text-[10px] font-black uppercase tracking-wider">Sistema</button>
                  <button className="px-3 py-1.5 rounded-lg text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-wider hover:text-slate-900 dark:hover:text-slate-100 transition-colors">Escuro</button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-200 dark:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300">
                    <Smartphone size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100">Resumo Semanal</p>
                    <p className="text-xs text-slate-500">Receber notificações push sobre seu progresso</p>
                  </div>
                </div>
                <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </Card>

          <Card title="Segurança e Privacidade" subtitle="Proteja sua conta e seus dados corporativos">
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl transition-colors group">
                <div className="flex items-center gap-3">
                  <Lock size={18} className="text-slate-400 group-hover:text-primary transition-colors" />
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Alterar Senha de Acesso</span>
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Atualizado há 3 meses</span>
              </button>
              
              <div className="h-[1px] bg-slate-100 dark:bg-slate-800"></div>
              
              <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl transition-colors group">
                <div className="flex items-center gap-3">
                  <Shield size={18} className="text-slate-400 group-hover:text-primary transition-colors" />
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Autenticação em Duas Etapas</span>
                </div>
                <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Desativado</span>
              </button>

              <div className="h-[1px] bg-slate-100 dark:bg-slate-800"></div>

              <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl transition-colors group">
                <div className="flex items-center gap-3">
                  <Eye size={18} className="text-slate-400 group-hover:text-primary transition-colors" />
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Visibilidade do Perfil Corporativo</span>
                </div>
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Público</span>
              </button>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h4 className="font-black uppercase tracking-tight mb-4 text-slate-900 dark:text-slate-100">Notificações</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-1 shrink-0">
                  <Bell size={14} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Alertas de Missão</p>
                  <p className="text-[10px] text-slate-500">Notificar quando uma nova missão estiver disponível.</p>
                </div>
              </div>
              <Button className="w-full text-xs" variant="outline">Gerenciar Alertas</Button>
            </div>
          </div>
          
          <div className="p-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl text-center">
            <p className="text-xs font-bold text-slate-400 uppercase mb-4">Suporte Técnico</p>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-6">Precisa de ajuda com as configurações avançadas?</p>
            <Button className="w-full" variant="outline">Falar com Mentor Stitch</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
