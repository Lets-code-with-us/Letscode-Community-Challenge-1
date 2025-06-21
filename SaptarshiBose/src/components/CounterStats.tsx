
import { useEffect, useState } from 'react';

interface CounterProps {
  end: number;
  duration: number;
  label: string;
  suffix?: string;
}

const Counter = ({ end, duration, label, suffix = '' }: CounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const step = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [end, duration]);

  return (
    <div className="text-center p-6 bg-white rounded-lg shadow-sm border animate-counter">
      <div className="text-3xl font-bold text-primary mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-gray-600 font-medium">{label}</div>
    </div>
  );
};

const CounterStats = () => {
  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Comprehensive Data Coverage
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform analyzes extensive datasets to provide insights into India's urban development
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <Counter end={15} duration={2000} label="Cities Analyzed" />
          <Counter end={35} duration={2500} label="Metrics Tracked" suffix="+" />
          <Counter end={10} duration={2200} label="Years of Data" />
          <Counter end={500} duration={3000} label="Data Points" suffix="K+" />
        </div>
      </div>
    </section>
  );
};

export default CounterStats;
