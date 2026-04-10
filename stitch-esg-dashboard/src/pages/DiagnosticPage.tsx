import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import type { Question, QuestionOption, DiagnosticResponses } from '../types';
import { useAuth } from '../context/useAuth';
import { db } from '../firebase';
import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { Check, Lightbulb, Rocket, ChevronRight, ChevronLeft } from 'lucide-react';
import { calculateESGScore, calculateESGDelta, calculateGoalsFromScores } from '../utils/scoreCalculator';
import { diagnosticQuestions } from '../data/questions';

export const DiagnosticPage: React.FC = () => {
  const { user, refreshAuth } = useAuth();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<DiagnosticResponses>({});
  const [loading, setLoading] = useState(true);
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [isFinishing, setIsFinishing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [diagnosticId, setDiagnosticId] = useState<string | null>(null);
  const [companyId, setCompanyId] = useState<string | null>(null);

  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSavedRef = useRef<string>('');
  const questionnaireRef = useRef<HTMLDivElement>(null);

  const isQuestionVisible = useCallback((question: Question) => {
    if (!question.dependsOn) return true;
    return answers[question.dependsOn.questionId] === question.dependsOn.value;
  }, [answers]);

  const visibleQuestions = useMemo(() => {
    return questions.filter(q => isQuestionVisible(q));
  }, [questions, isQuestionVisible]);

  const currentVisibleQuestion = visibleQuestions[currentStep];
  const currentCategory = currentVisibleQuestion?.category || 'form';

  const theme = useMemo(() => {
    switch (currentCategory) {
      case 'environmental':
        return {
          color: 'emerald-500',
          bg: 'bg-emerald-500',
          text: 'text-emerald-500',
          border: 'border-emerald-500',
          borderLight: 'border-emerald-500/20',
          bgLight: 'bg-emerald-500/5',
          bgSelected: 'bg-emerald-500/10',
          shadow: 'shadow-emerald-500/20',
          ring: 'focus:border-emerald-500',
          hover: 'hover:border-emerald-500/30'
        };
      case 'social':
        return {
          color: 'rose-500',
          bg: 'bg-rose-500',
          text: 'text-rose-500',
          border: 'border-rose-500',
          borderLight: 'border-rose-500/20',
          bgLight: 'bg-rose-500/5',
          bgSelected: 'bg-rose-500/10',
          shadow: 'shadow-rose-500/20',
          ring: 'focus:border-rose-500',
          hover: 'hover:border-rose-500/30'
        };
      case 'governance':
        return {
          color: 'blue-500',
          bg: 'bg-blue-500',
          text: 'text-blue-500',
          border: 'border-blue-500',
          borderLight: 'border-blue-500/20',
          bgLight: 'bg-blue-500/5',
          bgSelected: 'bg-blue-500/10',
          shadow: 'shadow-blue-500/20',
          ring: 'focus:border-blue-500',
          hover: 'hover:border-blue-500/30'
        };
      default:
        return {
          color: 'primary',
          bg: 'bg-primary',
          text: 'text-primary',
          border: 'border-primary',
          borderLight: 'border-primary/20',
          bgLight: 'bg-primary/5',
          bgSelected: 'bg-primary/10',
          shadow: 'shadow-emerald-500/20',
          ring: 'focus:border-primary',
          hover: 'hover:border-primary/30'
        };
    }
  }, [currentCategory]);

  const answeredVisible = useMemo(
    () => visibleQuestions.filter(q => answers[q.id] !== undefined).length,
    [visibleQuestions, answers]
  );
  const progress = visibleQuestions.length > 0
    ? Math.round((answeredVisible / visibleQuestions.length) * 100)
    : 0;

  const saveProgress = useCallback(async (answersToSave: DiagnosticResponses, force = false) => {
    const answersKey = JSON.stringify(answersToSave);

    if (!force && answersKey === lastSavedRef.current) return;
    if (!user || !companyId || !diagnosticId) return;

    lastSavedRef.current = answersKey;

    try {
      await updateDoc(doc(db, 'diagnostics', diagnosticId), {
        companyId,
        responses: answersToSave,
        completed: false,
        lastUpdated: Timestamp.now()
      });
    } catch (err) {
      console.error("Error saving progress:", err);
      lastSavedRef.current = '';
    }
  }, [user, companyId, diagnosticId]);

  const debouncedSave = useCallback((answersToSave: DiagnosticResponses) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = setTimeout(() => {
      saveProgress(answersToSave);
    }, 1500);
  }, [saveProgress]);

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const loadQuestions = async () => {
      setLoadingQuestions(true);
      try {
        const q = query(collection(db, 'questions'));
        const querySnapshot = await getDocs(q);
        let fetchedQuestions = querySnapshot.docs.map(doc => ({
          ...doc.data()
        } as Question));

        if (fetchedQuestions.length === 0) {
          console.log("DiagnosticPage: No questions in Firestore, using local fallback.");
          fetchedQuestions = diagnosticQuestions;
        }

        // Custom sort to maintain category order: form -> environmental -> social -> governance
        const categoryOrder = { 'form': 0, 'environmental': 1, 'social': 2, 'governance': 3 };
        fetchedQuestions.sort((a, b) => {
          if (categoryOrder[a.category as keyof typeof categoryOrder] !== categoryOrder[b.category as keyof typeof categoryOrder]) {
            return categoryOrder[a.category as keyof typeof categoryOrder] - categoryOrder[b.category as keyof typeof categoryOrder];
          }
          return a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: 'base' });
        });

        setQuestions(fetchedQuestions);
      } catch (err) {
        console.error("Error loading questions from Firestore:", err);
      } finally {
        setLoadingQuestions(false);
      }
    };

    loadQuestions();
  }, []);

  useEffect(() => {
    const loadDiagnostic = async () => {
      if (!user || loadingQuestions) {
        console.log("DiagnosticPage: No user or still loading questions");
        return;
      }

      setLoading(true);
      console.log("DiagnosticPage: Loading diagnostic for user", user.uid);

      try {
        let userDoc = await getDoc(doc(db, 'users', user.uid));

        if (!userDoc.exists()) {
          console.warn("DiagnosticPage: User document not found, creating default profile...");
          const newCompanyId = `comp_${Date.now()}`;
          const newCompanyRef = doc(db, 'companies', newCompanyId);

          await setDoc(newCompanyRef, {
            name: 'Minha Empresa ESG',
            industry: 'Not specified',
            region: 'Not specified',
            currentXP: 0,
            level: 1,
            esgScores: { environmental: 0, social: 0, governance: 0 },
            createdAt: Timestamp.now()
          });

          await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            name: user.displayName || 'Mestre ESG',
            email: user.email,
            companyId: newCompanyId,
            role: 'admin',
            avatarUrl: user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`
          });

          userDoc = await getDoc(doc(db, 'users', user.uid));
        }

        const cid = userDoc.data()?.companyId;
        setCompanyId(cid);
        console.log("DiagnosticPage: Found companyId:", cid);

        const q = query(
          collection(db, 'diagnostics'),
          where('companyId', '==', cid)
        );

        const querySnapshot = await getDocs(q);
        const incompleteDoc = querySnapshot.docs.find(doc => doc.data().completed === false);

        if (incompleteDoc) {
          const diagData = incompleteDoc.data();
          setDiagnosticId(incompleteDoc.id);
          setAnswers(diagData.responses || {});
          lastSavedRef.current = JSON.stringify(diagData.responses || {});
          console.log("DiagnosticPage: Found existing diagnostic:", incompleteDoc.id);

          const savedAnswers = diagData.responses || {};
          // Use visibleQuestions from the already loaded questions
          const visibleForSaved = questions.filter(q => {
            if (!q.dependsOn) return true;
            return savedAnswers[q.dependsOn.questionId] === q.dependsOn.value;
          });

          const answeredVisibleCount = visibleForSaved.filter(q => savedAnswers[q.id] !== undefined).length;
          if (answeredVisibleCount < visibleForSaved.length) {
            setCurrentStep(answeredVisibleCount);
          } else {
            setCurrentStep(Math.max(0, visibleForSaved.length - 1));
          }
        } else {
          // Create new diagnostic if none exists
          console.log("DiagnosticPage: No existing diagnostic found, creating new one...");
          const newDiagRef = doc(collection(db, 'diagnostics'));

          setDiagnosticId(newDiagRef.id);
          setAnswers({});
          setCurrentStep(0);
          console.log("DiagnosticPage: Created local diagnostic ref:", newDiagRef.id);

          await setDoc(newDiagRef, {
            companyId: cid,
            responses: {},
            completed: false,
            createdAt: Timestamp.now(),
            lastUpdated: Timestamp.now()
          });

          console.log("DiagnosticPage: Successfully saved new diagnostic online:", newDiagRef.id);
        }
      } catch (err: unknown) {
        console.error("Error loading diagnostic:", err);
        const error = err as { code?: string; message?: string };
        if (error.code === 'unavailable' || error.message?.includes('offline')) {
          console.warn("DiagnosticPage: Firestore is offline, using cached data if available.");
        } else {
          alert("Houve um erro ao conectar com o banco de dados. Verifique sua conexão.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (!loadingQuestions) {
      loadDiagnostic();
    }
  }, [user, loadingQuestions, questions]);

  const handleOptionSelect = (value: number | string) => {
    const newAnswers = { ...answers, [currentVisibleQuestion.id]: value };
    setAnswers(newAnswers);
    debouncedSave(newAnswers);
  };

  const handleTextChange = (value: string) => {
    const newAnswers = { ...answers, [currentVisibleQuestion.id]: value };
    setAnswers(newAnswers);
    debouncedSave(newAnswers);
  };

  const handleCheckboxToggle = useCallback((value: string | number) => {
    const rawAnswers = answers[currentVisibleQuestion.id];
    const currentAnswers = Array.isArray(rawAnswers) ? rawAnswers : [];
    let newSelection: (string | number)[];

    if (currentAnswers.includes(value)) {
      newSelection = currentAnswers.filter(item => item !== value);
    } else {
      newSelection = [...currentAnswers, value];
    }

    const newAnswers = { ...answers, [currentVisibleQuestion.id]: newSelection };
    setAnswers(newAnswers);
    debouncedSave(newAnswers);
  }, [answers, currentVisibleQuestion, debouncedSave]);

  const finishDiagnostic = useCallback(async () => {
    console.log("DiagnosticPage: Attempting to finish diagnostic...", {
      hasUser: !!user,
      diagnosticId,
      companyId
    });

    if (!user || !diagnosticId || !companyId) {
      console.error("Dados faltantes para finalizar diagnóstico:", {
        userId: user?.uid,
        diagnosticId,
        companyId
      });
      alert(`Não foi possível finalizar o diagnóstico no momento. Faltam dados de conexão. Recarregue a página e tente novamente.`);
      return;
    }

    await saveProgress(answers, true);
    setIsFinishing(true);

    try {
      await updateDoc(doc(db, 'diagnostics', diagnosticId), {
        completed: true,
        responses: answers,
        completedAt: Timestamp.now()
      });

      const companyRef = doc(db, 'companies', companyId);
      const companyDoc = await getDoc(companyRef);
      const companyOldData = companyDoc.exists() ? companyDoc.data() : {};

      const currentXP = companyOldData.currentXP || 0;
      const previousScores = companyOldData.esgScores || { environmental: 0, social: 0, governance: 0 };

      const newScores = calculateESGScore(answers, questions);
      const newDelta = calculateESGDelta(newScores, previousScores);
      const newGoals = calculateGoalsFromScores(newScores.environmental, newScores.social, newScores.governance);

      const esgAvg = Math.round((newScores.environmental + newScores.social + newScores.governance) / 3);
      const months = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
      const currentMonth = months[new Date().getMonth()];

      const evolutionData = companyOldData.evolutionData || [];
      const monthIndex = evolutionData.findIndex((d: { month: string }) => d.month === currentMonth);
      if (monthIndex >= 0) {
        evolutionData[monthIndex].score = esgAvg;
      } else {
        evolutionData.push({ month: currentMonth, score: esgAvg });
      }

      const companyData: Record<string, unknown> = {
        formData: answers,
        lastDiagnosticDate: Timestamp.now(),
        currentXP: currentXP + 500,
        esgScores: newScores,
        esgDelta: newDelta,
        goals: newGoals,
        evolutionData: evolutionData
      };

      if (answers['form_1.1']) {
        companyData.name = answers['form_1.1'];
      }

      await updateDoc(companyRef, companyData);

      if (refreshAuth) await refreshAuth();

      setShowSuccess(true);

      setTimeout(() => {
        navigate('/environmental');
      }, 2000);
    } catch (err: unknown) {
      console.error("Error finishing diagnostic:", err);
      setIsFinishing(false);
      alert("Houve um erro ao salvar seu diagnóstico. Por favor, tente novamente.");
    }
  }, [user, diagnosticId, companyId, answers, questions, saveProgress, refreshAuth, navigate]);


  const isNextDisabled = useMemo(() => {
    if (!currentVisibleQuestion || !diagnosticId || isFinishing) return true;

    // For numeric questions with multiple fields (options)
    if (currentVisibleQuestion.inputType === 'number' && currentVisibleQuestion.options && currentVisibleQuestion.options.length > 0) {
      // Check if at least one field is filled (or we could require all, but usually at least one is better for UX)
      return !currentVisibleQuestion.options.some((_, idx) => {
        const val = answers[`${currentVisibleQuestion.id}_${idx}`];
        return val !== undefined && val !== '';
      });
    }

    // For checkboxes (must have at least one selected)
    if (currentVisibleQuestion.inputType === 'checkbox') {
      const selected = answers[currentVisibleQuestion.id];
      return !selected || !Array.isArray(selected) || selected.length === 0;
    }

    // Default for radio, text, select, date
    return answers[currentVisibleQuestion.id] === undefined || answers[currentVisibleQuestion.id] === '';
  }, [currentVisibleQuestion, answers, diagnosticId, isFinishing]);

  const handleNext = useCallback(async () => {
    if (currentStep < visibleQuestions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      finishDiagnostic();
    }
  }, [currentStep, visibleQuestions.length, finishDiagnostic]);

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleKeyDown = useCallback((e: React.KeyboardEvent | KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (currentVisibleQuestion && answers[currentVisibleQuestion.id] !== undefined) {
        handleNext();
      }
    }
  }, [answers, currentVisibleQuestion, handleNext]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const scrollToQuestionnaire = () => {
    questionnaireRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const navigateToCategory = (cat: string) => {
    const visibleIndex = visibleQuestions.findIndex(q => q.category === cat);
    if (visibleIndex !== -1) {
      setCurrentStep(visibleIndex);
    }
  };

  if (loading || loadingQuestions) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-96 gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin shadow-lg"></div>
          <p className="text-slate-500 font-black uppercase text-[10px] tracking-widest animate-pulse">
            Carregando Missão...
          </p>
        </div>
      </DashboardLayout>
    );
  }

  if (visibleQuestions.length === 0) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-96 text-center">
          <h3 className="text-xl font-black uppercase tracking-tighter mb-2">Nenhuma pergunta encontrada</h3>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
            Ocorreu um erro ao carregar as perguntas do banco de dados.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="mb-8">
          <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tighter uppercase">
            Questionário Inicial
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">
            Preencha os dados da sua empresa para continuar com o questionário ESG.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-3xl border-2 border-slate-100 dark:border-slate-800 shadow-xl shadow-emerald-900/5">
            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Progresso da Missão</p>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">{progress}% Concluído</h3>
              </div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider">{answeredVisible} / {visibleQuestions.length} Dados</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-4 rounded-full overflow-hidden mb-4">
              <div
                className="bg-primary h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-xs font-medium text-slate-400 tracking-tight">
              Nível atual da missão: <span className="text-primary font-bold">Iniciante ESG</span>
            </p>
          </div>

          <div className="bg-primary text-slate-900 p-8 rounded-3xl shadow-xl flex flex-col justify-between border-b-4 border-emerald-600 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
              <Rocket size={120} />
            </div>
            <div className="relative z-10">
              <h4 className="text-xl font-black mb-2 flex items-center gap-2 uppercase tracking-tighter">
                <Rocket size={20} /> Próximo Passo!
              </h4>
              <p className="text-slate-900/80 text-sm font-bold tracking-tight leading-relaxed">
                Responda o questionário dessa página para ganhar 500 XP e avançar à próxima página.
              </p>
            </div>
            <Button
              className="mt-6 bg-white text-primary font-bold py-3 px-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-50 transition-all uppercase text-xs tracking-widest shadow-lg relative z-10"
              onClick={scrollToQuestionnaire}
            >
              Iniciar Missão
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap border-b-2 border-slate-100 dark:border-slate-800 gap-2 md:gap-8 mb-8">
          <button
            onClick={() => navigateToCategory('form')}
            className={`pb-4 px-2 border-b-4 font-bold uppercase tracking-wider text-xs flex items-center gap-2 transition-all
              ${currentCategory === 'form' ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-slate-600'}
            `}
          >
            <span className="material-symbols-outlined text-lg">description</span> Dados da Empresa
          </button>

          {['environmental', 'social', 'governance'].map(cat => (
            <button
              key={cat}
              onClick={() => navigateToCategory(cat)}
              className={`pb-4 px-2 border-b-4 font-bold uppercase tracking-wider text-xs flex items-center gap-2 transition-all
                  ${currentCategory === cat 
                    ? cat === 'environmental' ? 'border-emerald-500 text-emerald-500' : 
                      cat === 'social' ? 'border-rose-500 text-rose-500' : 
                      'border-blue-500 text-blue-500'
                    : 'border-transparent text-slate-400 hover:text-slate-600'}
                `}
            >
              <span className="material-symbols-outlined text-lg">
                {cat === 'environmental' ? 'eco' : cat === 'social' ? 'groups' : 'policy'}
              </span>
              {cat === 'environmental' ? 'Ambiental' : cat === 'social' ? 'Social' : 'Governança'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10" ref={questionnaireRef}>
          <div className="lg:col-span-12 space-y-8 max-w-4xl mx-auto w-full">
            <Card className="border-b-4">
              <div className="mb-8">
                <span className={`inline-block px-3 py-1 rounded-full ${theme.bgLight} ${theme.text} text-xs font-bold mb-4 uppercase tracking-wider border ${theme.borderLight}`}>
                  {currentCategory === 'form' ? 'Dados da Empresa' :
                    currentCategory === 'environmental' ? 'Eixo Ambiental' :
                      currentCategory === 'social' ? 'Eixo Social' : 'Eixo Governança'}
                  {currentVisibleQuestion.subcategory && ` • ${currentVisibleQuestion.subcategory}`} - Passo {currentStep + 1} de {visibleQuestions.length}
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 leading-tight uppercase tracking-tight">
                  {currentVisibleQuestion.text}
                </h3>
                {currentVisibleQuestion.description && (
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium tracking-tight">
                    {currentVisibleQuestion.description}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                {(!currentVisibleQuestion.inputType || currentVisibleQuestion.inputType === 'radio') && currentVisibleQuestion.options?.map((option: QuestionOption, idx: number) => (
                  <label
                    key={idx}
                    htmlFor={`${currentVisibleQuestion.id}_${idx}`}
                    className={`flex items-center p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 group
                      ${answers[currentVisibleQuestion.id] === option.value
                        ? `${theme.border} ${theme.bgLight} shadow-lg scale-[1.01]`
                        : `border-slate-100 dark:border-slate-800 ${theme.hover} hover:bg-slate-50 dark:hover:bg-slate-800`
                      }
                      focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-primary
                    `}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                      ${answers[currentVisibleQuestion.id] === option.value
                        ? `${theme.border} ${theme.bg}`
                        : `border-slate-300 dark:border-slate-600 group-hover:${theme.border}`}
                    `}>
                      {answers[currentVisibleQuestion.id] === option.value && <Check size={14} className="text-white" strokeWidth={4} />}
                    </div>
                    <input
                      type="radio"
                      id={`${currentVisibleQuestion.id}_${idx}`}
                      name={currentVisibleQuestion.id}
                      className="sr-only"
                      checked={answers[currentVisibleQuestion.id] === option.value}
                      onChange={() => handleOptionSelect(option.value)}
                    />
                    <div className="ml-4 flex flex-col">
                      <span className={`font-bold text-sm tracking-tight transition-colors
                          ${answers[currentVisibleQuestion.id] === option.value ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}
                        `}>
                        {option.label}
                      </span>
                    </div>
                  </label>
                ))}

                {currentVisibleQuestion.inputType === 'checkbox' && currentVisibleQuestion.options?.map((option: QuestionOption, idx: number) => {
                  const rawValues = answers[currentVisibleQuestion.id];
                  const currentValues = Array.isArray(rawValues) ? rawValues : [];
                  const isChecked = currentValues.includes(option.value);
                  return (
                    <label
                      key={idx}
                      htmlFor={`${currentVisibleQuestion.id}_${idx}`}
                      className={`flex items-center p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 group
                        ${isChecked
                          ? `${theme.border} ${theme.bgLight} shadow-lg scale-[1.01]`
                          : `border-slate-100 dark:border-slate-800 ${theme.hover} hover:bg-slate-50 dark:hover:bg-slate-800`
                        }
                        focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-primary
                      `}
                    >
                      <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all
                        ${isChecked
                          ? `${theme.border} ${theme.bg}`
                          : `border-slate-300 dark:border-slate-600 group-hover:${theme.border}`}
                      `}>
                        {isChecked && <Check size={14} className="text-white" strokeWidth={4} />}
                      </div>
                      <input
                        type="checkbox"
                        id={`${currentVisibleQuestion.id}_${idx}`}
                        className="sr-only"
                        checked={isChecked}
                        onChange={() => handleCheckboxToggle(option.value)}
                      />
                      <div className="ml-4 flex flex-col">
                        <span className={`font-bold text-sm tracking-tight transition-colors
                            ${isChecked ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}
                          `}>
                          {option.label}
                        </span>
                      </div>
                    </label>
                  );
                })}

                {currentVisibleQuestion.inputType === 'text' && (
                  <input
                    type="text"
                    value={(answers[currentVisibleQuestion.id] as string) || ''}
                    onChange={(e) => handleTextChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className={`w-full p-4 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl ${theme.ring} focus:ring-0 text-slate-900 dark:text-white font-bold text-sm tracking-tight placeholder:text-slate-300 dark:placeholder:text-slate-700`}
                    placeholder="Digite sua resposta..."
                    autoFocus
                  />
                )}

                {currentVisibleQuestion.inputType === 'number' && (
                  <div className="space-y-4">
                    {currentVisibleQuestion.options && currentVisibleQuestion.options.length > 0 ? (
                      currentVisibleQuestion.options.map((option, idx) => (
                        <div key={idx} className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-2">
                            {option.label}
                          </label>
                          <input
                            type="number"
                            value={(answers[`${currentVisibleQuestion.id}_${idx}`] as number | string) || ''}
                            onChange={(e) => {
                              const newAnswers = { ...answers, [`${currentVisibleQuestion.id}_${idx}`]: e.target.value };
                              setAnswers(newAnswers);
                              debouncedSave(newAnswers);
                            }}
                            onKeyDown={handleKeyDown}
                            className={`w-full p-4 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl ${theme.ring} focus:ring-0 text-slate-900 dark:text-white font-bold text-sm tracking-tight placeholder:text-slate-300 dark:placeholder:text-slate-700 font-mono`}
                            placeholder="0"
                            autoFocus={idx === 0}
                          />
                        </div>
                      ))
                    ) : (
                      <input
                        type="number"
                        value={(answers[currentVisibleQuestion.id] as number | string) || ''}
                        onChange={(e) => handleTextChange(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className={`w-full p-4 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl ${theme.ring} focus:ring-0 text-slate-900 dark:text-white font-bold text-sm tracking-tight placeholder:text-slate-300 dark:placeholder:text-slate-700 font-mono`}
                        placeholder="0"
                        autoFocus
                      />
                    )}
                  </div>
                )}

                {currentVisibleQuestion.inputType === 'date' && (
                  <input
                    type="date"
                    value={(answers[currentVisibleQuestion.id] as string) || ''}
                    onChange={(e) => handleTextChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className={`w-full p-4 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl ${theme.ring} focus:ring-0 text-slate-900 dark:text-white font-bold text-sm tracking-tight`}
                    autoFocus
                  />
                )}

                {currentVisibleQuestion.inputType === 'select' && currentVisibleQuestion.options && (
                  <select
                    value={(answers[currentVisibleQuestion.id] as string) || ''}
                    onChange={(e) => handleOptionSelect(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className={`w-full p-4 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl ${theme.ring} focus:ring-0 text-slate-900 dark:text-white font-bold text-sm tracking-tight cursor-pointer appearance-none`}
                  >
                    <option value="" className="text-slate-400">Selecione uma opção</option>
                    {currentVisibleQuestion.options.map((option: QuestionOption, idx: number) => (
                      <option key={idx} value={option.value as string} className="bg-white dark:bg-slate-900">
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="mt-10 pt-8 border-t-2 border-slate-100 dark:border-slate-800 flex justify-between">
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className="px-8 py-4 border-2 rounded-2xl font-bold uppercase text-xs tracking-wider"
                >
                  <ChevronLeft size={18} className="mr-2" /> Voltar
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={isNextDisabled}
                  isLoading={isFinishing && !showSuccess} className={`px-10 py-4 rounded-2xl font-bold uppercase text-xs tracking-wider shadow-xl transition-all duration-300
                    ${showSuccess
                      ? 'bg-emerald-500 text-white shadow-emerald-500/40'
                      : `${theme.bg} text-white ${theme.shadow}`}
                  `}
                >
                  {showSuccess ? (
                    <span className="flex items-center gap-2">
                      <Check size={18} strokeWidth={4} /> Pronto!
                    </span>
                  ) : currentStep === visibleQuestions.length - 1 ? (
                    'Finalizar e Continuar'
                  ) : (
                    'Próximo'
                  )}
                  {!showSuccess && currentStep !== visibleQuestions.length - 1 && <ChevronRight size={18} className="ml-2" />}
                </Button>
              </div>
            </Card>

            {showSuccess && (
              <div className="fixed inset-0 flex items-center justify-center z-[100] animate-in fade-in zoom-in duration-300 bg-slate-900/20 backdrop-blur-sm">
                <div className={`bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl border-2 ${theme.borderLight} flex flex-col items-center text-center max-w-sm mx-4 success-pulse`}>
                  <div className={`w-20 h-20 ${theme.bgSelected} ${theme.text} rounded-full flex items-center justify-center mb-6 animate-bounce`}>
                    <Check size={40} strokeWidth={4} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-2">Salvo com Sucesso!</h3>
                  <p className="text-slate-500 dark:text-slate-400 font-bold uppercase text-xs tracking-widest leading-relaxed">
                    Seu diagnóstico foi registrado. Desbloqueando trilha Ambiental...
                  </p>
                </div>
              </div>
            )}

            {currentVisibleQuestion.options?.find((o: QuestionOption) => o.value === answers[currentVisibleQuestion.id])?.message && (
              <div className={`${theme.bgLight} border-2 border-dashed ${theme.borderLight} p-8 rounded-3xl`}>
                <div className="flex gap-6">
                  <div className={`${theme.bgSelected} p-3 rounded-2xl ${theme.text}`}>
                    <Lightbulb size={28} />
                  </div>
                  <div>
                    <h4 className={`font-bold ${theme.text} mb-1 uppercase tracking-wider text-xs`}>Informação Relevante</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-tight leading-relaxed">
                      {currentVisibleQuestion.options.find((o: QuestionOption) => o.value === answers[currentVisibleQuestion.id])?.message}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

