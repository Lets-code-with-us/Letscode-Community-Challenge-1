import { useState, useMemo, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, ScatterChart, Scatter } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download, Share } from 'lucide-react';
import html2canvas from 'html2canvas';
import { toast } from 'sonner';

// Comprehensive expanded data with all requested metrics
const cityData = [
  { 
    city: 'Mumbai', gdp: 310, population: 20.4, literacy: 89.2, aqi: 161, renewable: 18.5, hdi: 0.891, region: 'West',
    // Economic Indicators
    gni: 325, unemployment: 3.2, inflation: 4.5, fdi: 15.8, exportImportRatio: 1.2, publicDebt: 28.5,
    // Social Development
    lifeExpectancy: 74.2, infantMortality: 28, educationIndex: 0.67, genderInequality: 0.524,
    populationGrowth: 1.8, urbanPopulation: 92.3,
    // Health & Well-being
    healthcareExpenditure: 1850, physiciansPerThousand: 1.2, hospitalBeds: 0.9, cleanWaterAccess: 87.5, vaccinationCoverage: 94.2,
    // Environment & Sustainability
    co2Emissions: 2.1, forestArea: 12.3, environmentalIndex: 42.1,
    // Governance & Infrastructure
    internetPenetration: 78.3, corruptionIndex: 40, mobileSubscriptions: 142.5, infrastructureQuality: 68.2, politicalStability: 55.8,
    // Economic Equality
    giniCoefficient: 0.36, povertyRate: 12.8, socialProtection: 65.2
  },
  { 
    city: 'Delhi', gdp: 293, population: 32.9, literacy: 86.3, aqi: 178, renewable: 15.2, hdi: 0.750, region: 'North',
    // Economic Indicators
    gni: 305, unemployment: 4.1, inflation: 4.8, fdi: 12.3, exportImportRatio: 0.8, publicDebt: 32.1,
    // Social Development
    lifeExpectancy: 71.5, infantMortality: 32, educationIndex: 0.62, genderInequality: 0.547,
    populationGrowth: 2.1, urbanPopulation: 88.7,
    // Health & Well-being
    healthcareExpenditure: 1650, physiciansPerThousand: 1.1, hospitalBeds: 1.2, cleanWaterAccess: 82.3, vaccinationCoverage: 91.8,
    // Environment & Sustainability
    co2Emissions: 2.8, forestArea: 8.9, environmentalIndex: 35.6,
    // Governance & Infrastructure
    internetPenetration: 82.1, corruptionIndex: 38, mobileSubscriptions: 138.9, infrastructureQuality: 72.5, politicalStability: 52.3,
    // Economic Equality
    giniCoefficient: 0.39, povertyRate: 15.2, socialProtection: 58.7
  },
  { 
    city: 'Bangalore', gdp: 245, population: 13.6, literacy: 87.7, aqi: 145, renewable: 28.3, hdi: 0.945, region: 'South',
    // Economic Indicators
    gni: 258, unemployment: 2.8, inflation: 3.9, fdi: 18.5, exportImportRatio: 1.8, publicDebt: 24.2,
    // Social Development
    lifeExpectancy: 76.8, infantMortality: 22, educationIndex: 0.75, genderInequality: 0.487,
    populationGrowth: 2.3, urbanPopulation: 89.5,
    // Health & Well-being
    healthcareExpenditure: 2100, physiciansPerThousand: 1.5, hospitalBeds: 1.1, cleanWaterAccess: 91.2, vaccinationCoverage: 96.8,
    // Environment & Sustainability
    co2Emissions: 1.9, forestArea: 15.7, environmentalIndex: 48.3,
    // Governance & Infrastructure
    internetPenetration: 85.4, corruptionIndex: 45, mobileSubscriptions: 156.2, infrastructureQuality: 75.8, politicalStability: 62.1,
    // Economic Equality
    giniCoefficient: 0.33, povertyRate: 8.7, socialProtection: 72.5
  },
  { 
    city: 'Chennai', gdp: 201, population: 11.5, literacy: 90.2, aqi: 139, renewable: 22.1, hdi: 0.708, region: 'South',
    // Economic Indicators
    gni: 215, unemployment: 3.5, inflation: 4.2, fdi: 11.2, exportImportRatio: 1.4, publicDebt: 26.8,
    // Social Development
    lifeExpectancy: 73.6, infantMortality: 26, educationIndex: 0.71, genderInequality: 0.512,
    populationGrowth: 1.6, urbanPopulation: 85.2,
    // Health & Well-being
    healthcareExpenditure: 1750, physiciansPerThousand: 1.3, hospitalBeds: 1.0, cleanWaterAccess: 88.9, vaccinationCoverage: 93.5,
    // Environment & Sustainability
    co2Emissions: 2.0, forestArea: 13.8, environmentalIndex: 44.7,
    // Governance & Infrastructure
    internetPenetration: 79.8, corruptionIndex: 42, mobileSubscriptions: 145.3, infrastructureQuality: 69.4, politicalStability: 58.9,
    // Economic Equality
    giniCoefficient: 0.35, povertyRate: 11.3, socialProtection: 67.8
  },
  { 
    city: 'Hyderabad', gdp: 185, population: 10.3, literacy: 83.1, aqi: 142, renewable: 25.7, hdi: 0.669, region: 'South',
    // Economic Indicators
    gni: 198, unemployment: 3.8, inflation: 4.1, fdi: 13.7, exportImportRatio: 1.1, publicDebt: 29.3,
    // Social Development
    lifeExpectancy: 72.4, infantMortality: 29, educationIndex: 0.65, genderInequality: 0.532,
    populationGrowth: 2.0, urbanPopulation: 83.6,
    // Health & Well-being
    healthcareExpenditure: 1600, physiciansPerThousand: 1.0, hospitalBeds: 0.8, cleanWaterAccess: 85.7, vaccinationCoverage: 92.1,
    // Environment & Sustainability
    co2Emissions: 2.2, forestArea: 11.4, environmentalIndex: 41.2,
    // Governance & Infrastructure
    internetPenetration: 81.2, corruptionIndex: 41, mobileSubscriptions: 148.7, infrastructureQuality: 71.3, politicalStability: 57.4,
    // Economic Equality
    giniCoefficient: 0.37, povertyRate: 13.1, socialProtection: 63.9
  },
  { 
    city: 'Pune', gdp: 167, population: 7.2, literacy: 86.2, aqi: 134, renewable: 31.2, hdi: 0.761, region: 'West',
    // Economic Indicators
    gni: 178, unemployment: 3.1, inflation: 3.8, fdi: 9.8, exportImportRatio: 1.3, publicDebt: 22.7,
    // Social Development
    lifeExpectancy: 75.1, infantMortality: 24, educationIndex: 0.69, genderInequality: 0.495,
    populationGrowth: 1.9, urbanPopulation: 86.8,
    // Health & Well-being
    healthcareExpenditure: 1900, physiciansPerThousand: 1.4, hospitalBeds: 1.0, cleanWaterAccess: 89.6, vaccinationCoverage: 95.3,
    // Environment & Sustainability
    co2Emissions: 1.8, forestArea: 16.2, environmentalIndex: 46.8,
    // Governance & Infrastructure
    internetPenetration: 83.7, corruptionIndex: 43, mobileSubscriptions: 152.1, infrastructureQuality: 73.6, politicalStability: 60.2,
    // Economic Equality
    giniCoefficient: 0.34, povertyRate: 9.8, socialProtection: 70.1
  },
  { 
    city: 'Kolkata', gdp: 156, population: 15.0, literacy: 87.1, aqi: 156, renewable: 19.8, hdi: 0.641, region: 'East',
    // Economic Indicators
    gni: 165, unemployment: 4.6, inflation: 5.1, fdi: 7.2, exportImportRatio: 0.9, publicDebt: 35.4,
    // Social Development
    lifeExpectancy: 70.8, infantMortality: 35, educationIndex: 0.61, genderInequality: 0.558,
    populationGrowth: 1.4, urbanPopulation: 81.3,
    // Health & Well-being
    healthcareExpenditure: 1400, physiciansPerThousand: 0.9, hospitalBeds: 1.3, cleanWaterAccess: 79.2, vaccinationCoverage: 89.7,
    // Environment & Sustainability
    co2Emissions: 2.5, forestArea: 9.6, environmentalIndex: 37.9,
    // Governance & Infrastructure
    internetPenetration: 75.4, corruptionIndex: 36, mobileSubscriptions: 135.8, infrastructureQuality: 64.2, politicalStability: 49.8,
    // Economic Equality
    giniCoefficient: 0.41, povertyRate: 18.4, socialProtection: 55.3
  },
  { 
    city: 'Ahmedabad', gdp: 142, population: 8.4, literacy: 84.8, aqi: 167, renewable: 26.4, hdi: 0.708, region: 'West',
    // Economic Indicators
    gni: 152, unemployment: 3.9, inflation: 4.3, fdi: 8.5, exportImportRatio: 1.0, publicDebt: 30.1,
    // Social Development
    lifeExpectancy: 73.2, infantMortality: 31, educationIndex: 0.63, genderInequality: 0.541,
    populationGrowth: 1.7, urbanPopulation: 84.7,
    // Health & Well-being
    healthcareExpenditure: 1550, physiciansPerThousand: 1.0, hospitalBeds: 0.9, cleanWaterAccess: 83.4, vaccinationCoverage: 90.8,
    // Environment & Sustainability
    co2Emissions: 2.3, forestArea: 10.2, environmentalIndex: 39.5,
    // Governance & Infrastructure
    internetPenetration: 77.9, corruptionIndex: 39, mobileSubscriptions: 141.6, infrastructureQuality: 67.8, politicalStability: 54.1,
    // Economic Equality
    giniCoefficient: 0.38, povertyRate: 14.7, socialProtection: 61.2
  },
  { 
    city: 'Jaipur', gdp: 128, population: 3.9, literacy: 84.1, aqi: 149, renewable: 24.1, hdi: 0.663, region: 'North',
    // Economic Indicators
    gni: 138, unemployment: 4.2, inflation: 4.7, fdi: 6.8, exportImportRatio: 0.7, publicDebt: 33.2,
    // Social Development
    lifeExpectancy: 71.9, infantMortality: 33, educationIndex: 0.60, genderInequality: 0.551,
    populationGrowth: 1.8, urbanPopulation: 78.9,
    // Health & Well-being
    healthcareExpenditure: 1350, physiciansPerThousand: 0.8, hospitalBeds: 0.7, cleanWaterAccess: 80.6, vaccinationCoverage: 88.4,
    // Environment & Sustainability
    co2Emissions: 2.4, forestArea: 8.3, environmentalIndex: 36.2,
    // Governance & Infrastructure
    internetPenetration: 74.6, corruptionIndex: 37, mobileSubscriptions: 132.4, infrastructureQuality: 62.5, politicalStability: 51.7,
    // Economic Equality
    giniCoefficient: 0.40, povertyRate: 16.9, socialProtection: 57.8
  },
  { 
    city: 'Surat', gdp: 134, population: 6.5, literacy: 85.5, aqi: 143, renewable: 22.8, hdi: 0.745, region: 'West',
    // Economic Indicators
    gni: 145, unemployment: 3.3, inflation: 4.0, fdi: 7.9, exportImportRatio: 1.6, publicDebt: 25.9,
    // Social Development
    lifeExpectancy: 74.7, infantMortality: 27, educationIndex: 0.66, genderInequality: 0.518,
    populationGrowth: 2.2, urbanPopulation: 87.1,
    // Health & Well-being
    healthcareExpenditure: 1700, physiciansPerThousand: 1.1, hospitalBeds: 0.8, cleanWaterAccess: 86.3, vaccinationCoverage: 93.7,
    // Environment & Sustainability
    co2Emissions: 2.1, forestArea: 12.7, environmentalIndex: 43.6,
    // Governance & Infrastructure
    internetPenetration: 80.3, corruptionIndex: 40, mobileSubscriptions: 147.2, infrastructureQuality: 69.9, politicalStability: 56.8,
    // Economic Equality
    giniCoefficient: 0.36, povertyRate: 12.1, socialProtection: 66.5
  }
];

// Updated yearly data with comprehensive metrics
const yearlyData = [
  { 
    year: 2018, gdp: 180, literacy: 82.1, renewable: 16.2, aqi: 168, hdi: 0.647,
    // Economic
    gni: 185, unemployment: 4.8, inflation: 5.2, fdi: 9.2, exportImportRatio: 1.0, publicDebt: 31.5,
    // Social
    lifeExpectancy: 70.5, infantMortality: 35, educationIndex: 0.58, genderInequality: 0.55,
    populationGrowth: 1.9, urbanPopulation: 80.2,
    // Health
    healthcareExpenditure: 1450, physiciansPerThousand: 0.9, hospitalBeds: 0.8, cleanWaterAccess: 78.5, vaccinationCoverage: 87.2,
    // Environment
    co2Emissions: 2.8, forestArea: 10.5, environmentalIndex: 38.2,
    // Governance
    internetPenetration: 65.2, corruptionIndex: 35, mobileSubscriptions: 125.8, infrastructureQuality: 62.1, politicalStability: 48.5,
    // Equality
    giniCoefficient: 0.42, povertyRate: 19.8, socialProtection: 52.3
  },
  { 
    year: 2019, gdp: 195, literacy: 83.4, renewable: 18.7, aqi: 165, hdi: 0.658,
    // Economic
    gni: 201, unemployment: 4.5, inflation: 4.9, fdi: 10.1, exportImportRatio: 1.1, publicDebt: 30.8,
    // Social
    lifeExpectancy: 71.2, infantMortality: 33, educationIndex: 0.60, genderInequality: 0.54,
    populationGrowth: 1.8, urbanPopulation: 81.5,
    // Health
    healthcareExpenditure: 1520, physiciansPerThousand: 1.0, hospitalBeds: 0.9, cleanWaterAccess: 80.8, vaccinationCoverage: 89.1,
    // Environment
    co2Emissions: 2.7, forestArea: 11.2, environmentalIndex: 39.8,
    // Governance
    internetPenetration: 68.7, corruptionIndex: 36, mobileSubscriptions: 132.4, infrastructureQuality: 64.3, politicalStability: 50.2,
    // Equality
    giniCoefficient: 0.41, povertyRate: 18.5, socialProtection: 55.1
  },
  { 
    year: 2020, gdp: 187, literacy: 84.1, renewable: 20.3, aqi: 159, hdi: 0.665,
    // Economic
    gni: 193, unemployment: 5.8, inflation: 6.2, fdi: 8.7, exportImportRatio: 0.9, publicDebt: 33.2,
    // Social
    lifeExpectancy: 71.8, infantMortality: 31, educationIndex: 0.61, genderInequality: 0.53,
    populationGrowth: 1.7, urbanPopulation: 82.8,
    // Health
    healthcareExpenditure: 1580, physiciansPerThousand: 1.0, hospitalBeds: 0.9, cleanWaterAccess: 82.1, vaccinationCoverage: 88.9,
    // Environment
    co2Emissions: 2.5, forestArea: 11.8, environmentalIndex: 41.2,
    // Governance
    internetPenetration: 72.1, corruptionIndex: 37, mobileSubscriptions: 138.9, infrastructureQuality: 65.8, politicalStability: 49.8,
    // Equality
    giniCoefficient: 0.40, povertyRate: 17.2, socialProtection: 57.8
  },
  { 
    year: 2021, gdp: 203, literacy: 84.9, renewable: 22.8, aqi: 155, hdi: 0.678,
    // Economic
    gni: 210, unemployment: 4.9, inflation: 5.1, fdi: 11.5, exportImportRatio: 1.2, publicDebt: 31.8,
    // Social
    lifeExpectancy: 72.3, infantMortality: 30, educationIndex: 0.63, genderInequality: 0.52,
    populationGrowth: 1.6, urbanPopulation: 84.1,
    // Health
    healthcareExpenditure: 1650, physiciansPerThousand: 1.1, hospitalBeds: 1.0, cleanWaterAccess: 84.7, vaccinationCoverage: 91.3,
    // Environment
    co2Emissions: 2.4, forestArea: 12.4, environmentalIndex: 42.8,
    // Governance
    internetPenetration: 75.8, corruptionIndex: 39, mobileSubscriptions: 143.7, infrastructureQuality: 68.2, politicalStability: 52.4,
    // Equality
    giniCoefficient: 0.39, povertyRate: 15.8, socialProtection: 60.5
  },
  { 
    year: 2022, gdp: 218, literacy: 85.6, renewable: 24.9, aqi: 152, hdi: 0.695,
    // Economic
    gni: 226, unemployment: 4.2, inflation: 4.6, fdi: 12.8, exportImportRatio: 1.3, publicDebt: 29.5,
    // Social
    lifeExpectancy: 72.9, infantMortality: 28, educationIndex: 0.65, genderInequality: 0.51,
    populationGrowth: 1.5, urbanPopulation: 85.4,
    // Health
    healthcareExpenditure: 1720, physiciansPerThousand: 1.2, hospitalBeds: 1.0, cleanWaterAccess: 86.9, vaccinationCoverage: 93.1,
    // Environment
    co2Emissions: 2.3, forestArea: 13.1, environmentalIndex: 44.5,
    // Governance
    internetPenetration: 78.9, corruptionIndex: 41, mobileSubscriptions: 148.2, infrastructureQuality: 70.1, politicalStability: 54.7,
    // Equality
    giniCoefficient: 0.38, povertyRate: 14.3, socialProtection: 63.2
  },
  { 
    year: 2023, gdp: 234, literacy: 86.2, renewable: 27.1, aqi: 148, hdi: 0.712,
    // Economic
    gni: 242, unemployment: 3.8, inflation: 4.1, fdi: 14.2, exportImportRatio: 1.4, publicDebt: 27.8,
    // Social
    lifeExpectancy: 73.4, infantMortality: 26, educationIndex: 0.67, genderInequality: 0.50,
    populationGrowth: 1.4, urbanPopulation: 86.7,
    // Health
    healthcareExpenditure: 1790, physiciansPerThousand: 1.3, hospitalBeds: 1.1, cleanWaterAccess: 88.4, vaccinationCoverage: 94.8,
    // Environment
    co2Emissions: 2.2, forestArea: 13.8, environmentalIndex: 46.2,
    // Governance
    internetPenetration: 81.4, corruptionIndex: 42, mobileSubscriptions: 152.8, infrastructureQuality: 72.5, politicalStability: 56.9,
    // Equality
    giniCoefficient: 0.37, povertyRate: 12.9, socialProtection: 65.8
  }
];

interface DashboardChartProps {
  type: 'bar' | 'line' | 'scatter';
  title: string;
  dataKey: string;
  color: string;
  filters?: {
    selectedCity: string;
    selectedRegion: string;
    selectedYear: string;
    selectedCategory: string;
  };
  secondaryDataKey?: string;
  secondaryColor?: string;
}

const DashboardChart = ({ type, title, dataKey, color, filters, secondaryDataKey, secondaryColor }: DashboardChartProps) => {
  const [chartType, setChartType] = useState<'city' | 'trend'>('city');
  const chartRef = useRef<HTMLDivElement>(null);
  
  // Filter data based on applied filters
  const filteredData = useMemo(() => {
    if (chartType === 'trend') {
      return yearlyData;
    }

    let filtered = [...cityData];
    
    if (filters?.selectedCity && filters.selectedCity !== 'All Cities') {
      filtered = filtered.filter(item => item.city === filters.selectedCity);
    }
    
    if (filters?.selectedRegion && filters.selectedRegion !== 'All Regions') {
      filtered = filtered.filter(item => item.region === filters.selectedRegion);
    }

    // Sort by the current metric for better visualization
    filtered.sort((a, b) => (b[dataKey as keyof typeof a] as number) - (a[dataKey as keyof typeof a] as number));
    
    return filtered;
  }, [chartType, filters, dataKey]);

  const xAxisKey = chartType === 'city' ? 'city' : 'year';

  // Special formatting for different chart types
  const isAQIChart = title.includes('Air Quality Index');
  const isScatterChart = type === 'scatter';
  const chartTitle = isAQIChart && chartType === 'trend' 
    ? 'Air Quality Index Trend (Lower is Better)' 
    : title;

  const downloadChart = async () => {
    if (!chartRef.current) return;
    
    try {
      const canvas = await html2canvas(chartRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
        useCORS: true
      });
      
      const link = document.createElement('a');
      link.download = `${title.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
      link.href = canvas.toDataURL();
      link.click();
      
      toast.success('Chart downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download chart');
    }
  };

  const shareChart = async () => {
    if (!chartRef.current) return;
    
    try {
      const canvas = await html2canvas(chartRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
        useCORS: true
      });
      
      canvas.toBlob(async (blob) => {
        if (blob && navigator.share) {
          const file = new File([blob], `${title.replace(/[^a-zA-Z0-9]/g, '_')}.png`, { type: 'image/png' });
          try {
            await navigator.share({
              files: [file],
              title: title,
              text: `Check out this ${title} visualization from IndiaMetrics`
            });
          } catch (error) {
            // Fallback: copy image to clipboard
            try {
              await navigator.clipboard.write([
                new ClipboardItem({ 'image/png': blob })
              ]);
              toast.success('Chart copied to clipboard!');
            } catch (clipboardError) {
              toast.error('Sharing not supported on this device');
            }
          }
        } else {
          // Fallback: copy to clipboard
          try {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob! })
            ]);
            toast.success('Chart copied to clipboard!');
          } catch (error) {
            toast.error('Sharing not supported on this device');
          }
        }
      });
    } catch (error) {
      toast.error('Failed to share chart');
    }
  };

  return (
    <Card className="w-full animate-scale-in" ref={chartRef}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">{chartTitle}</CardTitle>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={downloadChart}
            className="h-8 w-8 p-0"
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={shareChart}
            className="h-8 w-8 p-0"
          >
            <Share className="h-4 w-4" />
          </Button>
          {!isScatterChart && (
            <Select value={chartType} onValueChange={(value: 'city' | 'trend') => setChartType(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="city">By City</SelectItem>
                <SelectItem value="trend">Trend</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          {type === 'scatter' ? (
            <ScatterChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey={dataKey}
                type="number"
                domain={['dataMin - 10', 'dataMax + 10']}
                tick={{ fontSize: 12 }}
                name="GDP per Capita (₹ Thousands)"
              />
              <YAxis 
                dataKey={secondaryDataKey}
                type="number"
                domain={[0.6, 1.0]}
                tick={{ fontSize: 12 }}
                name="HDI"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value, name, props) => [
                  `${props.payload.city}: HDI ${props.payload.hdi}, GDP ₹${props.payload.gdp}K`,
                  'City Data'
                ]}
              />
              <Scatter dataKey={secondaryDataKey} fill={color} />
            </ScatterChart>
          ) : type === 'bar' ? (
            <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey={xAxisKey} 
                tick={{ fontSize: 12 }}
                angle={chartType === 'city' ? -45 : 0}
                textAnchor={chartType === 'city' ? 'end' : 'middle'}
                height={chartType === 'city' ? 60 : 30}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value, name) => [
                  typeof value === 'number' ? value.toFixed(1) : value,
                  name === 'aqi' ? 'AQI' : name
                ]}
              />
              <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} />
            </BarChart>
          ) : (
            <LineChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey={xAxisKey} 
                tick={{ fontSize: 12 }}
                angle={chartType === 'city' ? -45 : 0}
                textAnchor={chartType === 'city' ? 'end' : 'middle'}
                height={chartType === 'city' ? 60 : 30}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value, name) => [
                  typeof value === 'number' ? value.toFixed(1) : value,
                  name === 'aqi' ? 'AQI' : name
                ]}
              />
              <Line 
                type="monotone" 
                dataKey={dataKey} 
                stroke={color} 
                strokeWidth={3}
                dot={{ fill: color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: color, strokeWidth: 2, fill: 'white' }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
        {isAQIChart && (
          <div className="mt-2 text-xs text-gray-600 text-center">
            {chartType === 'trend' && "AQI values: 0-50 Good, 51-100 Satisfactory, 101-200 Moderate, 201+ Poor"}
          </div>
        )}
        {isScatterChart && (
          <div className="mt-2 text-xs text-gray-600 text-center">
            Each point represents a city showing the relationship between economic prosperity and human development
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardChart;
