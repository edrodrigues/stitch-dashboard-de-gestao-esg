import React, { useEffect, useRef, useState, type ReactNode } from 'react';

interface LazyOnVisibleProps {
  children: ReactNode;
  fallback?: ReactNode;
  threshold?: number;
}

export const LazyOnVisible: React.FC<LazyOnVisibleProps> = ({ 
  children, 
  fallback = null, 
  threshold = 0.1 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return <div ref={ref} className="w-full h-full">{isVisible ? children : fallback}</div>;
};
