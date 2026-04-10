import React, { useEffect, useState } from 'react';
import { Card } from '../components/ui/Card';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { EvolutionChart } from '../components/dashboard/EvolutionChart';
import { RecentMissions } from '../components/dashboard/RecentMissions';
import { HeroJourney } from '../components/dashboard/HeroJourney';
import { LevelUpModal, type Particle } from '../components/dashboard/LevelUpModal';
import { OnboardingTour } from '../components/dashboard/OnboardingTour';
import { Leaf, Users, Gavel, Trophy, Rocket } from 'lucide-react';
import { BarChart, BadgeDelta, ProgressCircle, CategoryBar } from '@tremor/react';
import { useAuth } from '../context/useAuth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import type { Company } from '../types';
import { getGoalsDataForChart, getDeltaType, formatDelta } from '../utils/scoreCalculator';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevelInfo] = useState({ level: 1, name: 'Elementar' });
  const [particles] = useState<Particle[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const companyId = userDoc.data().companyId;
          const companyDoc = await getDoc(doc(db, 'companies', companyId));
          
          if (companyDoc.exists()) {
            setCompany({ id: companyDoc.id, ...companyDoc.data() } as Company);
          }
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const chartData = company?.evolutionData || [];

  const goalsData = getGoalsDataForChart(company?.goals);

  const esgAverage = company ? Math.round(
    (company.esgScores.environmental + company.esgScores.social + company.esgScores.governance) / 3
  ) : 0;

  const getLetterScore = (score: number) => {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B+';
    if (score >= 60) return 'B';
    if (score >= 50) return 'C+';
    if (score >= 40) return 'C';
    return 'D';
  };

  const CustomTooltip = ({ payload, active, label }: any) => {
    if (!active || !payload) return null;
    return (
      <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 p-3 rounded-xl shadow-xl shadow-emerald-900/10 border-b-4">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-100 dark:border-slate-800 pb-1">{label}</p>
        <div className="space-y-1">
          {payload.map((category: any, idx: number) => (
            <div key={idx} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{category.dataKey}</span>
              </div>
              <span className="text-xs font-black text-slate-900 dark:text-white font-mono">{category.value}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

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
      <OnboardingTour />
      <LevelUpModal 
        isOpen={showLevelUp} 
        onClose={() => setShowLevelUp(false)} 
        level={newLevelInfo.level} 
        levelName={newLevelInfo.name} 
        particles={particles}
      />

      <div className="mb-8">
        <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100 uppercase">
          Olá, {user?.displayName || 'Mestre ESG'}! 👋
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1 font-bold text-xs tracking-wide opacity-80">
          Panorama atual de impacto da <span className="text-primary font-black">{company?.name}</span>
        </p>
      </div>

      <HeroJourney currentXP={company?.currentXP || 0} />

      {/* Ghost Rankings / Comparative Gamification - Simplified */}
      <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex items-center gap-6 group cursor-help">
          <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-300 group-hover:text-primary transition-all shadow-sm group-hover:shadow-md">
            <Trophy size={28} />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-end mb-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Próximo Marco</p>
              <span className="text-xs font-black text-primary">+250 XP</span>
            </div>
            <h4 className="text-sm font-black text-slate-600 dark:text-slate-200 uppercase tracking-tight">Top 10 do Setor</h4>
            <div className="mt-2 w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-[65%] rounded-full opacity-60"></div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 group cursor-help">
          <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-300 group-hover:text-teal-500 transition-all shadow-sm group-hover:shadow-md">
            <Rocket size={28} />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-end mb-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Selo de Elite</p>
              <span className="text-xs font-black text-teal-500">+500 XP</span>
            </div>
            <h4 className="text-sm font-black text-slate-600 dark:text-slate-200 uppercase tracking-tight">Mestre da Água</h4>
            <div className="mt-2 w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-teal-500 h-full w-[30%] rounded-full opacity-60"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Score Overview - Simplified Hierarchy */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-4 text-environmental font-bold text-sm">
            <Leaf size={18} />
            <span>Ambiental</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-7xl font-black text-slate-900 dark:text-white tracking-tighter">
              {company?.esgScores?.environmental || 0}
            </span>
            <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">pts</span>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <BadgeDelta deltaType={getDeltaType(company?.esgDelta?.environmental || 0)} className="font-bold text-xs">
              {formatDelta(company?.esgDelta?.environmental || 0)}
            </BadgeDelta>
            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">E-Score</span>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-4 text-social font-bold text-sm">
            <Users size={18} />
            <span>Social</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-7xl font-black text-slate-900 dark:text-white tracking-tighter">
              {company?.esgScores?.social || 0}
            </span>
            <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">pts</span>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <BadgeDelta deltaType={getDeltaType(company?.esgDelta?.social || 0)} className="font-bold text-xs">
              {formatDelta(company?.esgDelta?.social || 0)}
            </BadgeDelta>
            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">S-Score</span>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-4 text-governance font-bold text-sm">
            <Gavel size={18} />
            <span>Governança</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-7xl font-black text-slate-900 dark:text-white tracking-tighter">
              {company?.esgScores?.governance || 0}
            </span>
            <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">pts</span>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <BadgeDelta deltaType={getDeltaType(company?.esgDelta?.governance || 0)} className="font-bold text-xs">
              {formatDelta(company?.esgDelta?.governance || 0)}
            </BadgeDelta>
            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">G-Score</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <EvolutionChart data={chartData} />
        
        <Card title="Recursos do Nível" subtitle="Metas batidas por categoria">
          <div className="h-72 mt-4">
            {goalsData.length > 0 && goalsData.some(g => g['Atingido'] > 0) ? (
              <BarChart
                className="h-full"
                data={goalsData}
                index="name"
                categories={['Atingido']}
                colors={['emerald']}
                valueFormatter={(number: number) => `${number}%`}
                showAnimation={true}
                showLegend={false}
                yAxisWidth={48}
                customTooltip={CustomTooltip}
              />
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400">
                <div className="text-center">
                  <p className="text-sm font-bold tracking-tight">Nenhuma meta definida</p>
                  <p className="text-xs mt-1 opacity-70">Configure suas metas para acompanhar o progresso</p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <RecentMissions />
        </div>
        
        <div className="space-y-6">
          <Card className="p-8 flex flex-col items-center justify-center border-b-4">
            <p className="text-xs font-bold text-slate-400 mb-8 uppercase tracking-widest">Perfil de maturidade atual</p>
            
            <ProgressCircle
              value={esgAverage}
              size="xl"
              color="emerald"
              showAnimation={true}
              className="scale-150 my-8"
            >
              <div className="text-center">
                <span className="text-4xl font-black text-slate-900 dark:text-white drop-shadow-sm font-mono">
                  {getLetterScore(esgAverage)}
                </span>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Grade</p>
              </div>
            </ProgressCircle>

            <div className="w-full space-y-6 mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold tracking-tight">
                  <span className="text-teal-600 dark:text-teal-400">Ambiental (E)</span>
                  <span className="text-slate-900 dark:text-slate-100">{company?.esgScores?.environmental || 0}%</span>
                </div>
                <CategoryBar 
                  values={[company?.esgScores?.environmental || 0, 100 - (company?.esgScores?.environmental || 0)]} 
                  colors={['emerald', 'slate']} 
                  showLabels={false}
                  className="h-2"
                  tooltip={`Ambiental: ${company?.esgScores?.environmental || 0}%`}
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold tracking-tight">
                  <span className="text-orange-600 dark:text-orange-400">Social (S)</span>
                  <span className="text-slate-900 dark:text-slate-100">{company?.esgScores?.social || 0}%</span>
                </div>
                <CategoryBar 
                  values={[company?.esgScores?.social || 0, 100 - (company?.esgScores?.social || 0)]} 
                  colors={['orange', 'slate']} 
                  showLabels={false}
                  className="h-2"
                  tooltip={`Social: ${company?.esgScores?.social || 0}%`}
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold tracking-tight">
                  <span className="text-indigo-600 dark:text-indigo-400">Governança (G)</span>
                  <span className="text-slate-900 dark:text-slate-100">{company?.esgScores?.governance || 0}%</span>
                </div>
                <CategoryBar 
                  values={[company?.esgScores?.governance || 0, 100 - (company?.esgScores?.governance || 0)]} 
                  colors={['indigo', 'slate']} 
                  showLabels={false}
                  className="h-2"
                  tooltip={`Governança: ${company?.esgScores?.governance || 0}%`}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};
