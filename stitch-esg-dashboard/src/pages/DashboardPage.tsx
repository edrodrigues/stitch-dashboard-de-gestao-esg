import React, { useEffect, useState } from 'react';
import { Card } from '../components/ui/Card';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { EvolutionChart } from '../components/dashboard/EvolutionChart';
import { RecentMissions } from '../components/dashboard/RecentMissions';
import { HeroJourney } from '../components/dashboard/HeroJourney';
import { LevelUpModal, type Particle } from '../components/dashboard/LevelUpModal';
import { Leaf, Users, Gavel, PlusCircle, Mail, CloudSync, Zap } from 'lucide-react';
import { BarChart, BadgeDelta, ProgressCircle, CategoryBar } from '@tremor/react';
import { useAuth } from '../context/useAuth';
import { doc, getDoc, collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../firebase';
import type { Company, Mission } from '../types';
import { getGoalsDataForChart, getDeltaType, formatDelta } from '../utils/scoreCalculator';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [company, setCompany] = useState<Company | null>(null);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevelInfo, setNewLevelInfo] = useState({ level: 1, name: 'Elementar' });
  const [particles, setParticles] = useState<Particle[]>([]);

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
            
            const missionsQuery = query(
              collection(db, 'missions'),
              where('companyId', '==', companyId),
              limit(5)
            );
            const missionsSnap = await getDocs(missionsQuery);
            const missionsList = missionsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Mission));
            setMissions(missionsList);
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

  const getLevelInfo = (xp: number) => {
    if (xp >= 4000) return { level: 5, name: 'Transformador' };
    if (xp >= 3000) return { level: 4, name: 'Proativo' };
    if (xp >= 2000) return { level: 3, name: 'Engajado' };
    if (xp >= 1000) return { level: 2, name: 'Consciente' };
    return { level: 1, name: 'Elementar' };
  };

  const handleSimulateXP = () => {
    if (!company) return;
    const newXP = company.currentXP + 500;
    const oldLevel = getLevelInfo(company.currentXP).level;
    const newLevel = getLevelInfo(newXP);
    
    setCompany({ ...company, currentXP: newXP });
    
    if (newLevel.level > oldLevel) {
      const newParticles = [...Array(20)].map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 2}s`,
      }));
      setParticles(newParticles);
      setNewLevelInfo(newLevel);
      setShowLevelUp(true);
    }
  };

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
        <p className="text-slate-500 dark:text-slate-400 mt-1 font-bold uppercase text-[10px] tracking-widest opacity-70">
          Panorama atual de impacto da <span className="text-primary font-black">{company?.name}</span>.
        </p>
      </div>

      <HeroJourney currentXP={company?.currentXP || 0} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card variant="chunky">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Ambiental</span>
            <div className="p-2 bg-environmental text-white rounded-xl shadow-lg shadow-emerald-500/20">
              <Leaf size={20} />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-4xl font-black text-slate-900 dark:text-slate-100 font-mono">{company?.esgScores?.environmental || 0}</p>
              <div className="mt-2">
                <BadgeDelta deltaType={getDeltaType(company?.esgDelta?.environmental || 0)} className="font-black text-[10px] uppercase">
                  {formatDelta(company?.esgDelta?.environmental || 0)} XP
                </BadgeDelta>
              </div>
            </div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-50 italic">E-Score</div>
          </div>
        </Card>

        <Card variant="chunky">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Social</span>
            <div className="p-2 bg-social text-white rounded-xl shadow-lg shadow-amber-500/20">
              <Users size={20} />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-4xl font-black text-slate-900 dark:text-slate-100 font-mono">{company?.esgScores?.social || 0}</p>
              <div className="mt-2">
                <BadgeDelta deltaType={getDeltaType(company?.esgDelta?.social || 0)} className="font-black text-[10px] uppercase">
                  {formatDelta(company?.esgDelta?.social || 0)} XP
                </BadgeDelta>
              </div>
            </div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-50 italic">S-Score</div>
          </div>
        </Card>

        <Card variant="chunky">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Governança</span>
            <div className="p-2 bg-governance text-white rounded-xl shadow-lg shadow-blue-500/20">
              <Gavel size={20} />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-4xl font-black text-slate-900 dark:text-slate-100 font-mono">{company?.esgScores?.governance || 0}</p>
              <div className="mt-2">
                <BadgeDelta deltaType={getDeltaType(company?.esgDelta?.governance || 0)} className="font-black text-[10px] uppercase">
                  {formatDelta(company?.esgDelta?.governance || 0)} XP
                </BadgeDelta>
              </div>
            </div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-50 italic">G-Score</div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <EvolutionChart data={chartData} />
        
        <Card title="Recursos do Nível" subtitle="Metas batidas por categoria">
          <div className="h-72 mt-4">
            <BarChart
              className="h-full"
              data={goalsData}
              index="name"
              categories={['Atingido']}
              colors={['emerald']}
              valueFormatter={(number: number) => `${number}%`}
              showAnimation={true}
              showLegend={false}
              yAxisWidth={40}
            />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <RecentMissions missions={missions} />
        </div>
        
        <div className="space-y-6">
          <Card className="p-8 flex flex-col items-center justify-center border-b-8">
            <p className="text-[10px] font-black text-slate-400 mb-8 uppercase tracking-[0.2em]">PERFIL DE MATURIDADE ATUAL</p>
            
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
                <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest mt-1">Grade</p>
              </div>
            </ProgressCircle>

            <div className="w-full space-y-6 mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="text-teal-500">Ambiental (E)</span>
                  <span>{company?.esgScores?.environmental || 0}%</span>
                </div>
                <CategoryBar 
                  values={[company?.esgScores?.environmental || 0, 100 - (company?.esgScores?.environmental || 0)]} 
                  colors={['emerald', 'slate']} 
                  showLabels={false}
                  className="h-2"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="text-orange-500">Social (S)</span>
                  <span>{company?.esgScores?.social || 0}%</span>
                </div>
                <CategoryBar 
                  values={[company?.esgScores?.social || 0, 100 - (company?.esgScores?.social || 0)]} 
                  colors={['orange', 'slate']} 
                  showLabels={false}
                  className="h-2"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="text-indigo-500">Governança (G)</span>
                  <span>{company?.esgScores?.governance || 0}%</span>
                </div>
                <CategoryBar 
                  values={[company?.esgScores?.governance || 0, 100 - (company?.esgScores?.governance || 0)]} 
                  colors={['indigo', 'slate']} 
                  showLabels={false}
                  className="h-2"
                />
              </div>
            </div>
          </Card>

          <Card title="Ações Rápidas">
            <div className="space-y-4">
              <button 
                onClick={handleSimulateXP}
                className="w-full p-4 flex items-center gap-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 hover:border-primary/30 hover:bg-primary/5 transition-all text-left group"
              >
                <div className="w-12 h-12 rounded-xl bg-yellow-500/10 text-yellow-500 flex items-center justify-center group-hover:bg-yellow-500 group-hover:text-white transition-all shadow-sm">
                  <Zap size={24} />
                </div>
                <div>
                  <p className="font-black text-xs text-slate-900 dark:text-slate-100 uppercase tracking-tight">Simular Progresso</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">+500 XP (Teste Level Up)</p>
                </div>
              </button>

              <button className="w-full p-4 flex items-center gap-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 hover:border-primary/30 hover:bg-primary/5 transition-all text-left group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                  <PlusCircle size={24} />
                </div>
                <div>
                  <p className="font-black text-xs text-slate-900 dark:text-slate-100 uppercase tracking-tight">Novo Lançamento</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Métricas de emissão ou sociais</p>
                </div>
              </button>
              <button className="w-full p-4 flex items-center gap-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 hover:border-primary/30 hover:bg-primary/5 transition-all text-left group">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all shadow-sm">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="font-black text-xs text-slate-900 dark:text-slate-100 uppercase tracking-tight">Enviar Relatório</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Sumário trimestral automático</p>
                </div>
              </button>
              <button className="w-full p-4 flex items-center gap-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 hover:border-primary/30 hover:bg-primary/5 transition-all text-left group">
                <div className="w-12 h-12 rounded-xl bg-slate-500/10 text-slate-500 flex items-center justify-center group-hover:bg-slate-500 group-hover:text-white transition-all shadow-sm">
                  <CloudSync size={24} />
                </div>
                <div>
                  <p className="font-black text-xs text-slate-900 dark:text-slate-100 uppercase tracking-tight">Sincronizar APIs</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">GRI, SASB e TCFD</p>
                </div>
              </button>
              
              <div className="mt-6 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Status do Sistema</p>
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em]">
                  <span className="flex items-center gap-2 text-emerald-600">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span> 
                    Connected
                  </span>
                  <span className="font-mono text-slate-400">V2.4.0</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};
