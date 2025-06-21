
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';

const PageTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    setIsTransitioning(true);
    setProgress(0);

    // Smooth progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setIsTransitioning(false), 200);
          return 100;
        }
        return prev + Math.random() * 12 + 8;
      });
    }, 60);

    return () => clearInterval(progressInterval);
  }, [location]);

  if (!isTransitioning) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      {/* Main loading container */}
      <div className="relative flex flex-col items-center justify-center">
        
        {/* Animated logo container */}
        <div className="relative mb-8">
          {/* Outer rotating ring */}
          <div className="w-20 h-20 border-4 border-gray-100 rounded-full animate-spin">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-primary rounded-full animate-spin" 
                 style={{ animationDuration: '1s' }}></div>
          </div>
          
          {/* Inner pulsing ring */}
          <div className="absolute inset-2 w-16 h-16 border-2 border-primary/20 rounded-full animate-pulse"></div>
          
          {/* Logo in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center animate-pulse">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
          </div>
          
          {/* Floating dots */}
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary/40 rounded-full animate-bounce"
              style={{
                top: `${30 + Math.sin(i * 2.1) * 25}%`,
                left: `${30 + Math.cos(i * 2.1) * 25}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1.5s'
              }}
            ></div>
          ))}
        </div>

        {/* Loading text with typing effect */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 animate-pulse">
            IndiaMetrics
          </h3>
          <p className="text-sm text-gray-500">
            {progress < 25 ? 'Loading...' :
             progress < 50 ? 'Preparing data...' :
             progress < 75 ? 'Almost there...' :
             'Ready!'}
          </p>
        </div>

        {/* Modern progress bar */}
        <div className="w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary via-blue-500 to-primary rounded-full transition-all duration-300 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/20 rounded-full animate-ping"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random()}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Subtle background animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 opacity-50"
          style={{ 
            transform: `rotate(${progress * 0.5}deg) scale(1.1)`,
            transition: 'transform 0.3s ease-out'
          }}
        ></div>
      </div>
    </div>
  );
};

export default PageTransition;
