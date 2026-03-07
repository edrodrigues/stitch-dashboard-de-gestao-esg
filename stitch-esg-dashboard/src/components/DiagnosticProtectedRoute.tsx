import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export interface DiagnosticProtectedRouteProps {
  children: React.ReactNode;
  requireFullDiagnostic?: boolean;
}

export const DiagnosticProtectedRoute: React.FC<DiagnosticProtectedRouteProps> = ({ 
  children, 
  requireFullDiagnostic = false 
}) => {
  const { user, loading, isDiagnosticCompleted, isIdentificationComplete } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Se não completou a identificação básica (FORM.json), sempre redireciona
  if (!isIdentificationComplete) {
    return <Navigate to="/diagnostic" />;
  }

  // Se a rota exige o diagnóstico completo (E+S+G)
  if (requireFullDiagnostic && !isDiagnosticCompleted) {
    return <Navigate to="/diagnostic" />;
  }

  return <>{children}</>;
};
