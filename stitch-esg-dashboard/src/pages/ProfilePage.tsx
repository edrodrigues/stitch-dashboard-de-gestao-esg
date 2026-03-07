import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/useAuth';
import { User, Mail, Shield, Award, Briefcase } from 'lucide-react';
import type { UserProfile } from '../types';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setProfile({ uid: user.uid, ...userDoc.data() } as UserProfile);
        }
      } catch (err: unknown) {
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  if (loading) return (
    <DashboardLayout>
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">Meu Perfil</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Gerencie suas informações pessoais e sua identidade como líder ESG.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card title="Informações Pessoais" subtitle="Seus dados de identificação na plataforma">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Nome Completo</label>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-800">
                    <User size={18} className="text-slate-400" />
                    <span className="text-sm font-medium">{user?.displayName || 'Mestre ESG'}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">E-mail</label>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-800">
                    <Mail size={18} className="text-slate-400" />
                    <span className="text-sm font-medium">{user?.email}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Cargo / Função</label>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-800">
                    <Briefcase size={18} className="text-slate-400" />
                    <span className="text-sm font-medium">{profile?.role || 'Gerente de Impacto'}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Nível de Acesso</label>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-800">
                    <Shield size={18} className="text-slate-400" />
                    <span className="text-sm font-medium text-emerald-500 font-bold">Administrador</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button variant="outline">Editar Perfil</Button>
              </div>
            </div>
          </Card>

          <Card title="Minhas Conquistas" subtitle="Reconhecimentos individuais por sua liderança">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-3 p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                <div className="p-2 bg-emerald-500 rounded-lg text-white">
                  <Award size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase">Selo</p>
                  <p className="text-sm font-black text-slate-900 dark:text-slate-100 tracking-tight">PIONEIRO ESG</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 opacity-60">
                <div className="p-2 bg-slate-400 rounded-lg text-white text-center">
                  <Award size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Selo</p>
                  <p className="text-sm font-black text-slate-400 tracking-tight">ECO-ESTRATEGISTA</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="text-center">
            <div className="flex flex-col items-center">
              <div className="relative group">
                <div 
                  className="w-32 h-32 rounded-full bg-slate-200 bg-cover bg-center border-4 border-primary shadow-xl mb-6 transition-transform group-hover:scale-105 duration-300"
                  style={{ backgroundImage: `url('${user?.photoURL ?? `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.uid || 'Felix'}`}')` }}
                />
                <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer mb-6">
                  <span className="text-white text-[10px] font-black uppercase">Alterar Foto</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{user?.displayName || 'Mestre ESG'}</h3>
              <p className="text-sm text-slate-500 mb-6 uppercase tracking-widest font-bold opacity-70">Gerente de Impacto</p>
              <Button className="w-full" variant="outline">Preferências de Conta</Button>
            </div>
          </Card>
          
          <div className="p-6 bg-gradient-to-br from-indigo-600 to-primary rounded-2xl text-white shadow-xl shadow-indigo-500/20">
            <h4 className="font-black uppercase tracking-tight mb-2">Engajamento Pessoal</h4>
            <p className="text-sm font-bold opacity-80 mb-4">Você está no Top 5% de usuários mais ativos deste mês!</p>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black">NÍVEL 12</span>
              <span className="text-[10px] font-black">1.250 XP</span>
            </div>
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="w-[75%] h-full bg-white"></div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
