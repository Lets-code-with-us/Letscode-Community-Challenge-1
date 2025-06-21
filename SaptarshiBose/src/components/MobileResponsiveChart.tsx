
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import DashboardChart from '@/components/DashboardChart';

interface MobileResponsiveChartProps {
  charts: Array<{
    type: 'bar' | 'line' | 'scatter';
    title: string;
    dataKey: string;
    color: string;
    secondaryDataKey?: string;
  }>;
  filters?: {
    selectedCity: string;
    selectedRegion: string;
    selectedYear: string;
    selectedCategory: string;
  };
}

const MobileResponsiveChart = ({ charts, filters }: MobileResponsiveChartProps) => {
  const [currentChart, setCurrentChart] = useState(0);

  const nextChart = () => {
    setCurrentChart((prev) => (prev + 1) % charts.length);
  };

  const prevChart = () => {
    setCurrentChart((prev) => (prev - 1 + charts.length) % charts.length);
  };

  return (
    <div className="md:hidden">
      <div className="flex items-center justify-between mb-4">
        <Button variant="outline" size="sm" onClick={prevChart}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm text-gray-600">
          {currentChart + 1} of {charts.length}
        </span>
        <Button variant="outline" size="sm" onClick={nextChart}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <DashboardChart
        type={charts[currentChart].type}
        title={charts[currentChart].title}
        dataKey={charts[currentChart].dataKey}
        color={charts[currentChart].color}
        secondaryDataKey={charts[currentChart].secondaryDataKey}
        filters={filters}
      />
    </div>
  );
};

export default MobileResponsiveChart;
