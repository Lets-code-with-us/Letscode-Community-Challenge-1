
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const usePageTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  const navigateWithTransition = useCallback((path: string) => {
    setIsTransitioning(true);
    
    // Small delay to show the transition
    setTimeout(() => {
      navigate(path);
      setIsTransitioning(false);
    }, 1500);
  }, [navigate]);

  return { navigateWithTransition, isTransitioning };
};
