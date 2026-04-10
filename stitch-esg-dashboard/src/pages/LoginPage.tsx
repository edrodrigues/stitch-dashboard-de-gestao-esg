import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { LeafyGreen, Mail, Lock } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

type LoginForm = z.infer<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate('/dashboard');
    } catch {
      setError('Falha no login. Verifique suas credenciais.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setIsLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user document exists
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        // New user from Google - Create default company and profile
        const companyId = `comp_${Date.now()}`;
        await setDoc(doc(db, 'companies', companyId), {
          name: 'Minha Empresa ESG',
          industry: 'Not specified',
          region: 'Not specified',
          currentXP: 0,
          level: 1,
          esgScores: { environmental: 0, social: 0, governance: 0 }
        });

        await setDoc(userDocRef, {
          uid: user.uid,
          name: user.displayName || 'Mestre ESG',
          email: user.email,
          companyId: companyId,
          role: 'admin',
          avatarUrl: user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`
        });
      }

      navigate('/dashboard');
    } catch (err: unknown) {
      console.error("Google Login Error:", err);
      setError('Falha no login com Google.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border-2 border-slate-100 dark:border-slate-800 p-10 animate-in fade-in zoom-in duration-500">
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 rounded-[2rem] bg-primary flex items-center justify-center text-slate-900 mb-6 shadow-xl shadow-emerald-500/20 leaf-pulse">
            <LeafyGreen size={40} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter font-display">GUIA ESG</h1>
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] mt-1 font-display">Entre na sua jornada sustentável</p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-rose-50 dark:bg-rose-900/20 border-2 border-rose-100 dark:border-rose-800/50 rounded-2xl text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-tight flex items-center gap-3 animate-in slide-in-from-top-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shrink-0"></span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1 font-display">Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
              <input
                {...register('email')}
                type="email"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-primary/30 focus:bg-white dark:focus:bg-slate-800 rounded-2xl outline-none transition-all text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600"
                placeholder="exemplo@empresa.com"
              />
            </div>
            {errors.email && <p className="mt-1.5 text-[10px] text-rose-500 font-black uppercase tracking-wider ml-1">{errors.email.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1 font-display">Senha</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
              <input
                {...register('password')}
                type="password"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-primary/30 focus:bg-white dark:focus:bg-slate-800 rounded-2xl outline-none transition-all text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600"
                placeholder="••••••••"
              />
            </div>
            {errors.password && <p className="mt-1.5 text-[10px] text-rose-500 font-black uppercase tracking-wider ml-1">{errors.password.message}</p>}
          </div>

          <Button type="submit" variant="primary" size="lg" className="w-full py-5 text-xs font-black uppercase tracking-[0.2em] mt-6" isLoading={isLoading}>
            Entrar no Dashboard
          </Button>
        </form>

        <div className="my-10 flex items-center gap-4 text-slate-300 dark:text-slate-700">
          <div className="h-[2px] flex-1 bg-slate-100 dark:bg-slate-800"></div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">ou</span>
          <div className="h-[2px] flex-1 bg-slate-100 dark:bg-slate-800"></div>
        </div>

        <Button 
          type="button" 
          variant="outline" 
          size="lg"
          className="w-full py-5 gap-4 font-black text-xs uppercase tracking-widest border-2"
          onClick={handleGoogleLogin}
          isLoading={isLoading}
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
          <span>Continuar com Google</span>
        </Button>

        <p className="mt-10 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
          Não tem uma conta?{' '}
          <Link to="/register" className="text-primary hover:underline transition-all">
            Comece agora gratuitamente
          </Link>
        </p>
      </div>
    </div>
  );
};
