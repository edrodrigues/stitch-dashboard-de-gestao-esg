import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Leaf, TrendingUp, Zap, Recycle, Droplets } from 'lucide-react';
import { AreaChart, BadgeDelta } from '@tremor/react';
import { useAuth } from '../context/useAuth';
import { doc, getDoc, collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';
import type { Company } from '../types';
import { getRecommendationsForAnswers, type Recommendation } from '../data/environmentalRecommendations';

const chartData = [
  { date: 'JAN', 'Eficiência': 45 },
  { date: 'FEV', 'Eficiência': 52 },
  { date: 'MAR', 'Eficiência': 48 },
  { date: 'ABR', 'Eficiência': 61 },
  { date: 'MAI', 'Eficiência': 55 },
  { date: 'JUN', 'Eficiência': 67 },
  { date: 'JUL', 'Eficiência': 72 },
];

export const EnvironmentalPage: React.FC = () => {
  const { user } = useAuth();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  const [energyScore, setEnergyScore] = useState(85);
  const [wasteScore, setWasteScore] = useState(92);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const companyId = userDoc.data().companyId;
          const companyDoc = await getDoc(doc(db, 'companies', companyId));
          if (companyDoc.exists()) {
            const companyData = { id: companyDoc.id, ...companyDoc.data() } as Company;
            setCompany(companyData);
            
            if (companyData.goals) {
              setEnergyScore(companyData.goals.energia);
              setWasteScore(companyData.goals.residuos);
            }
          }

          const diagnosticsQuery = query(
            collection(db, 'diagnostics'),
            where('companyId', '==', companyId),
            orderBy('lastUpdated', 'desc'),
            limit(1)
          );
          const diagnosticsSnapshot = await getDocs(diagnosticsQuery);
          
          if (!diagnosticsSnapshot.empty) {
            const diagnosticData = diagnosticsSnapshot.docs[0].data();
            if (diagnosticData.responses) {
              const dynamicRecommendations = getRecommendationsForAnswers(diagnosticData.responses, 5);
              setRecommendations(dynamicRecommendations);
            }
          }
        }
      } catch (err) {
        console.error("Error fetching environmental data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const defaultRecommendations: Recommendation[] = [
    { 
      id: 'default-energy',
      icon: Zap, 
      title: 'Migrar para Mercado Livre de Energia', 
      points: '+500 XP', 
      impact: 'Alto Impacto', 
      color: 'text-amber-500',
      bg: 'bg-amber-500/10' 
    },
    { 
      id: 'default-waste',
      icon: Recycle, 
      title: 'Programa de Logística Reversa', 
      points: '+400 XP', 
      impact: 'Estratégico', 
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10'
    },
    { 
      id: 'default-water',
      icon: Droplets, 
      title: 'Monitoramento de Efluentes em Tempo Real', 
      points: '+300 XP', 
      impact: 'Tecnológico', 
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    }
  ];

  const displayRecommendations = recommendations.length > 0 ? recommendations : defaultRecommendations;

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-environmental text-slate-900 rounded-xl shadow-lg shadow-emerald-500/20">
                <Leaf size={24} />
              </div>
              <h2 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
                Ambiental (E)
              </h2>
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] tracking-widest opacity-70">
              Impacto ecológico da <span className="text-primary font-black italic">{company?.name}</span>.
            </p>
          </div>
          <div className="flex gap-3">
            <BadgeDelta deltaType="increase" className="font-black uppercase text-[10px]">Líder do Setor</BadgeDelta>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card variant="chunky">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Score Ambiental</span>
              <div className="p-2 bg-environmental/10 text-environmental rounded-lg">
                <TrendingUp size={20} />
              </div>
            </div>
            <p className="text-4xl font-black text-slate-900 dark:text-slate-100 font-mono">{company?.esgScores?.environmental || 0}</p>
            <p className="text-environmental text-[8px] font-black uppercase tracking-widest mt-2 bg-emerald-500/5 py-1 px-2 rounded-lg border border-emerald-500/10 w-fit italic">
              Nível: Guardião das Águas
            </p>
          </Card>

          <Card variant="chunky">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Energia</span>
              <div className="p-2 bg-yellow-500/10 text-yellow-500 rounded-lg">
                <Zap size={20} />
              </div>
            </div>
            <p className="text-4xl font-black text-slate-900 dark:text-slate-100 font-mono py-2">{energyScore}%</p>
            <p className="text-slate-400 text-[8px] font-black uppercase tracking-widest mt-2 italic">Fontes Renováveis (%)</p>
          </Card>

          <Card variant="chunky">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Resíduos</span>
              <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg">
                <Recycle size={20} />
              </div>
            </div>
            <p className="text-4xl font-black text-slate-900 dark:text-slate-100 font-mono py-2">{wasteScore}%</p>
            <p className="text-slate-400 text-[8px] font-black uppercase tracking-widest mt-2 italic">Taxa de Reciclagem (%)</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card title="Evolução da Pegada" subtitle="Indicadores de performance mensal">
            <div className="h-72 mt-4">
              <AreaChart
                className="h-full"
                data={chartData}
                index="date"
                categories={['Eficiência']}
                colors={['emerald']}
                valueFormatter={(number: number) => `${number} pts`}
                showAnimation={true}
                showLegend={false}
                yAxisWidth={40}
              />
            </div>
          </Card>

          <Card title="Sugestões de Melhoria" subtitle="Ações recomendadas baseadas no seu diagnóstico">
            <div className="space-y-4">
              {displayRecommendations.map((suggestion) => (
                <div key={suggestion.id} className="flex items-center justify-between p-5 rounded-2xl border-2 border-slate-100 dark:border-slate-800 hover:border-primary/30 transition-all group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 ${suggestion.bg} ${suggestion.color} rounded-xl group-hover:scale-110 transition-transform`}>
                      <suggestion.icon size={24} />
                    </div>
                    <div>
                      <p className="font-black text-xs text-slate-900 dark:text-slate-100 uppercase tracking-tight">{suggestion.title}</p>
                      <p className="text-[10px] text-primary font-black uppercase tracking-widest mt-1 italic">{suggestion.points}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-xl text-[8px] font-black uppercase tracking-widest border-2 ${suggestion.bg} ${suggestion.color} border-current opacity-80`}>
                    {suggestion.impact}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};