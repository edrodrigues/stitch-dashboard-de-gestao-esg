import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/useAuth';
import { Building2, MapPin, Tag, Globe } from 'lucide-react';
import type { Company } from '../types';

export const OrganizationPage: React.FC = () => {
  const { user } = useAuth();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyData = async () => {
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
      } catch (err: unknown) {
        console.error("Error fetching company data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
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
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">Minha Organização</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Gerencie a identidade e informações corporativas da sua empresa na jornada ESG.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card title="Perfil Corporativo" subtitle="Dados principais da organização">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Razão Social / Nome Fantasia</label>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-800">
                    <Building2 size={18} className="text-slate-400" />
                    <span className="text-sm font-medium">{company?.name || 'Não informado'}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Setor de Atuação</label>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-800">
                    <Tag size={18} className="text-slate-400" />
                    <span className="text-sm font-medium">{company?.industry || 'Não informado'}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Região de Operação</label>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-800">
                    <MapPin size={18} className="text-slate-400" />
                    <span className="text-sm font-medium">{company?.region || 'Brasil'}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Website</label>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-800">
                    <Globe size={18} className="text-slate-400" />
                    <span className="text-sm font-medium">www.{company?.name?.toLowerCase().replace(/\s/g, '') || 'empresa'}.com.br</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button variant="outline">Editar Perfil Corporativo</Button>
              </div>
            </div>
          </Card>

          <Card title="Impacto e Desempenho" subtitle="Status atual na jornada de sustentabilidade">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 text-center">
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Nível ESG</p>
                <p className="text-2xl font-black text-primary">{company?.level || 1}</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Total de XP</p>
                <p className="text-2xl font-black text-slate-900 dark:text-slate-100">{company?.currentXP || 0}</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Missões Finais</p>
                <p className="text-2xl font-black text-slate-900 dark:text-slate-100">0</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Certificação</p>
                <p className="text-sm font-bold text-slate-900 dark:text-slate-100 italic">Iniciante</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="text-center">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-3xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6 border-4 border-white dark:border-slate-900 shadow-xl overflow-hidden group">
                <img 
                  src={`https://api.dicebear.com/7.x/identicon/svg?seed=${company?.name || 'default'}`} 
                  alt="Company Logo" 
                  className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{company?.name || 'Sua Empresa'}</h3>
              <p className="text-sm text-slate-500 mb-6 italic">Empresa Parceira Stitch</p>
              <Button className="w-full" variant="outline">Atualizar Logotipo</Button>
            </div>
          </Card>
          
          <div className="p-6 bg-slate-900 dark:bg-slate-800 rounded-2xl text-white shadow-xl">
            <h4 className="font-black uppercase tracking-tight mb-2 text-primary">Conselho do Mestre</h4>
            <p className="text-sm font-medium opacity-80 mb-4 leading-relaxed">
              Organizações que mantêm seus dados atualizados têm 30% mais engajamento nas missões ESG.
            </p>
            <Button className="w-full bg-white/10 hover:bg-white/20 border-none text-white text-xs">Ver Dicas de Gestão</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
