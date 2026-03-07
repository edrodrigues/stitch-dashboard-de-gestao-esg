import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import {
  BarChart,
  BadgeDelta,
  DonutChart,
  List,
  ListItem
} from '@tremor/react';
import {
  FileDown,
  Database,
  Stars,
  Leaf,
  Zap,
  Recycle,
  Trophy,
  ArrowRight,
  Droplets,
  Users,
  Scale,
  Globe
} from 'lucide-react';

const carbonData = [
  { month: 'JAN', 'Toneladas': 0.42 },
  { month: 'FEV', 'Toneladas': 0.38 },
  { month: 'MAR', 'Toneladas': 0.31 },
  { month: 'ABR', 'Toneladas': 0.52 },
  { month: 'MAI', 'Toneladas': 0.28 },
  { month: 'JUN', 'Toneladas': 0.21 },
  { month: 'JUL', 'Toneladas': 0.35 },
  { month: 'AGO', 'Toneladas': 0.29 },
];

const regionalData = [
  { name: 'Sudeste', value: 45 },
  { name: 'Sul', value: 25 },
  { name: 'Centro-Oeste', value: 15 },
  { name: 'Norte/NE', value: 15 },
];

const dataFormatter = (number: number) => `${Intl.NumberFormat('us').format(number).toString()} t`;

export const ReportsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('environmental');

  const tabs = [
    { id: 'environmental', label: 'Meio Ambiente' },
    { id: 'social', label: 'Social' },
    { id: 'governance', label: 'Governança' },
    { id: 'supply', label: 'Suprimentos' },
  ];

  return (
    <DashboardLayout>
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-primary font-black text-sm uppercase tracking-widest mb-2">
              <Stars size={16} className="text-primary" />
              Desempenho Anual
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
              Relatório de Impacto ESG 2023
            </h1>
            <p className="mt-4 text-slate-500 dark:text-slate-400 text-lg leading-relaxed font-medium">
              Uma jornada visual pelas nossas pegadas ambientais, iniciativas sociais e padrões de governança em todo o Brasil.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="gap-2 border-2 px-5 py-6 rounded-2xl h-auto">
              <Database size={18} />
              Dados CSV
            </Button>
            <Button className="gap-2 px-6 py-6 rounded-2xl h-auto shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
              <FileDown size={18} />
              Baixar Livro de Impacto
            </Button>
          </div>
        </div>

        {/* Dashboard Navigation */}
        <div className="flex items-center p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-10 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all ${activeTab === tab.id
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'text-slate-500 dark:text-slate-400 hover:text-primary'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="p-2 border-primary/10 hover:border-primary transition-colors relative overflow-hidden group h-full">
            <div className="absolute -top-4 -right-4 p-6 opacity-10 group-hover:opacity-20 transition-opacity rotate-12">
              <Globe size={120} className="text-primary" />
            </div>
            <p className="text-primary font-black uppercase text-[10px] tracking-[0.2em] mb-2">Missão 01</p>
            <p className="text-slate-500 dark:text-slate-400 font-bold mb-1">Redução de Carbono</p>
            <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-4">
              1.240 <span className="text-lg font-bold text-slate-400 font-mono text-xs uppercase">Toneladas</span>
            </h3>
            <BadgeDelta deltaType="moderateIncrease" className="font-black uppercase text-[10px]">
              +12.4% vs ano anterior
            </BadgeDelta>
          </Card>

          <Card className="p-2 border-primary/10 hover:border-primary transition-colors relative overflow-hidden group h-full">
            <div className="absolute -top-4 -right-4 p-6 opacity-10 group-hover:opacity-20 transition-opacity -rotate-12">
              <Zap size={120} className="text-primary" />
            </div>
            <p className="text-primary font-black uppercase text-[10px] tracking-[0.2em] mb-2">Missão 02</p>
            <p className="text-slate-500 dark:text-slate-400 font-bold mb-1">Energia Renovável</p>
            <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-4">85.2%</h3>
            <BadgeDelta deltaType="increase" className="font-black uppercase text-[10px]">
              Meta: 90% até 2025
            </BadgeDelta>
          </Card>

          <Card className="p-2 border-primary/10 hover:border-primary transition-colors relative overflow-hidden group h-full">
            <div className="absolute -top-4 -right-4 p-6 opacity-10 group-hover:opacity-20 transition-opacity rotate-45">
              <Recycle size={120} className="text-primary" />
            </div>
            <p className="text-primary font-black uppercase text-[10px] tracking-[0.2em] mb-2">Missão 03</p>
            <p className="text-slate-500 dark:text-slate-400 font-bold mb-1">Resíduos Desviados</p>
            <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-4">92.0%</h3>
            <div className="inline-flex items-center gap-2 text-emerald-600 font-black px-3 py-1 bg-emerald-50 rounded-lg text-[10px] uppercase tracking-wider border border-emerald-100">
              <Trophy size={12} />
              Grau A+ de Desempenho
            </div>
          </Card>
        </div>

        {/* Visualization & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Chart Area */}
          <Card className="lg:col-span-2 p-2 border-slate-100 dark:border-slate-800 h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h4 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Nossa Jornada de Carbono</h4>
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">kg CO2e por receita em BRL</p>
              </div>
              <select className="bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-xl text-[10px] font-black text-slate-500 px-4 py-2 focus:ring-primary uppercase tracking-widest outline-none">
                <option>Últimos 12 Meses</option>
                <option>Últimos 2 Anos</option>
              </select>
            </div>

            <div className="h-80 w-full">
              <BarChart
                className="h-full"
                data={carbonData}
                index="month"
                categories={['Toneladas']}
                colors={['emerald']}
                valueFormatter={dataFormatter}
                yAxisWidth={48}
                showAnimation={true}
              />
            </div>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Escopo 1', value: '120 tCO2e', color: 'slate' },
                { label: 'Escopo 2', value: '450 tCO2e', color: 'slate' },
                { label: 'Escopo 3', value: '670 tCO2e', color: 'slate' },
                { label: 'Compensação', value: '-200 tCO2e', color: 'primary' },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-2xl border-2 transition-all hover:scale-105 ${item.color === 'primary'
                      ? 'bg-primary/5 border-primary/20'
                      : 'bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800'
                    }`}
                >
                  <p className={`text-[10px] uppercase font-black mb-1 ${item.color === 'primary' ? 'text-primary' : 'text-slate-400'
                    }`}>
                    {item.label}
                  </p>
                  <p className={`text-sm font-black font-mono ${item.color === 'primary' ? 'text-primary' : 'text-slate-700 dark:text-slate-200'
                    }`}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Qualitative Statements */}
          <div className="flex flex-col gap-6">
            <Card className="p-2 border-primary/10 bg-primary/5 dark:bg-primary/10 h-full flex flex-col" title="Resumo Estratégico">
              <div className="space-y-6 flex-1">
                {[
                  { icon: Droplets, title: 'Consumo de Água', desc: '22% de redução em processos intensivos' },
                  { icon: Users, title: 'Inclusão Social', desc: '45% de mulheres em cargos de liderança' },
                  { icon: Scale, title: 'Ética e Conformidade', desc: '100% da equipe treinada contra corrupção' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-slate-900 rounded-3xl border-4 border-primary/5 p-6 flex items-center justify-between group cursor-pointer hover:border-primary transition-all hover:translate-x-2 shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                        <item.icon size={24} />
                      </div>
                      <div>
                        <h5 className="font-black text-slate-900 dark:text-white text-sm uppercase tracking-tight">{item.title}</h5>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                    <ArrowRight size={18} className="text-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-8 py-4 border-2 border-primary/20 bg-white dark:bg-slate-900 text-primary font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-primary hover:text-white transition-all">
                Ver Nossa Metodologia
              </Button>
            </Card>
          </div>
        </div>

        {/* Regional Impact Map & Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="p-2 border-slate-100 dark:border-slate-800 flex flex-col" title="Distribuição ESG Regional">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-4">
              <DonutChart
                className="h-40"
                data={regionalData}
                category="value"
                index="name"
                colors={['emerald', 'teal', 'amber', 'rose']}
                showAnimation={true}
              />
              <List className="flex-1">
                {regionalData.map((item) => (
                  <ListItem key={item.name} className="uppercase font-black text-[10px] tracking-widest">
                    <span>{item.name}</span>
                    <span className="font-mono text-sm">{item.value}%</span>
                  </ListItem>
                ))}
              </List>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-6 h-full">
            {[
              { icon: Recycle, label: 'Taxa de Reciclagem', value: '78%', trend: '+5% desde o Q1' },
              { icon: Leaf, label: 'Ecoeficiência', value: '92/100', trend: 'Líder do Setor' },
              { icon: Users, label: 'Engajamento', value: '84%', trend: 'Score de Clima' },
              { icon: Scale, label: 'Compliance', value: '100%', trend: 'Zero Incidentes' },
            ].map((stat, i) => (
              <Card key={i} className="p-2 border-slate-100 dark:border-slate-800 flex flex-col justify-between hover:border-primary/30 transition-all group">
                <div>
                  <div className="h-12 w-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all">
                    <stat.icon size={24} />
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
                </div>
                <div className="mt-4">
                  <h5 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter font-mono">{stat.value}</h5>
                  <p className="text-[10px] text-primary font-black uppercase tracking-widest mt-1">{stat.trend}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer Info */}
        <div className="border-t border-slate-100 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] gap-4 mb-8">
          <p>© Manifesto Ambiental, 2026. Reporting verified by Bureau Veritas.</p>
          <div className="flex items-center gap-8">
            <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-primary transition-colors" href="#">Data Transparency</a>
            <a className="hover:text-primary transition-colors" href="#">Help Center</a>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
