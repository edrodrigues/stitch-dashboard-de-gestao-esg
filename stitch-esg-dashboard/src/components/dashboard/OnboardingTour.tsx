import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { X, ChevronRight, Rocket, Trophy, Target } from 'lucide-react';

interface TourStep {
  title: string;
  description: string;
  target: string;
  icon: React.ElementType;
}

const TOUR_STEPS: TourStep[] = [
  {
    title: "Bem-vindo ao seu Hub ESG!",
    description: "Aqui você transformará o impacto da sua empresa em uma jornada épica. Vamos conhecer os comandos básicos?",
    target: "welcome",
    icon: Rocket
  },
  {
    title: "Sua Pontuação de Impacto",
    description: "Estes são seus scores atuais nos pilares Ambiental, Social e Governança. Complete missões para aumentá-los!",
    target: "scores",
    icon: Trophy
  },
  {
    title: "Missões e Desafios",
    description: "Aqui você encontrará as próximas ações recomendadas para elevar o nível de maturidade da sua empresa.",
    target: "missions",
    icon: Target
  }
];

export const OnboardingTour: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('has_seen_onboarding_tour');
    if (!hasSeenTour) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      completeTour();
    }
  };

  const completeTour = () => {
    setIsVisible(false);
    localStorage.setItem('has_seen_onboarding_tour', 'true');
  };

  if (!isVisible) return null;

  const step = TOUR_STEPS[currentStep];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-500">
      <Card variant="chunky" className="max-w-md w-full relative overflow-hidden border-t-8 border-primary">
        <button 
          onClick={completeTour}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center p-2">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 success-pulse">
            <step.icon size={32} />
          </div>

          <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-2">
            {step.title}
          </h3>
          
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
            {step.description}
          </p>

          <div className="flex items-center justify-between w-full mt-4">
            <div className="flex gap-1.5">
              {TOUR_STEPS.map((_, idx) => (
                <div 
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentStep ? 'w-8 bg-primary' : 'w-2 bg-slate-200'}`}
                />
              ))}
            </div>

            <Button onClick={handleNext} className="gap-2 px-6">
              {currentStep === TOUR_STEPS.length - 1 ? 'Começar Jornada' : 'Próximo'}
              <ChevronRight size={18} />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
