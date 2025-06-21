
import { useState, useMemo } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import DashboardChart from '@/components/DashboardChart';
import DashboardFilters from '@/components/DashboardFilters';
import IndiaMap from '@/components/IndiaMap';
import NewsSection from '@/components/NewsSection';
import MobileResponsiveChart from '@/components/MobileResponsiveChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Dashboard = () => {
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedYear, setSelectedYear] = useState('2023');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  // Calculate filtered stats based on current filters
  const filteredStats = useMemo(() => {
    // This would normally filter actual data based on selections
    // For now, we'll show different values based on filters to demonstrate functionality
    const baseStats = {
      gdp: selectedCity !== 'All Cities' ? '₹2.3L' : '₹2.1L',
      literacy: '86.2%',
      aqi: selectedCategory === 'Environment' ? '145' : '152',
      renewable: selectedYear === '2023' ? '23.4%' : '21.2%',
      hdi: selectedYear === '2023' ? '0.712' : '0.695'
    };
    return baseStats;
  }, [selectedCity, selectedYear, selectedCategory]);

  // Comprehensive chart configurations with all requested metrics
  const economicCharts = [
    // Core Economic Indicators
    { type: 'bar' as const, title: 'GDP (Gross Domestic Product) (₹ Thousands)', dataKey: 'gdp', color: '#1e40af' },
    { type: 'bar' as const, title: 'GNI (Gross National Income) (₹ Thousands)', dataKey: 'gni', color: '#1d4ed8' },
    { type: 'line' as const, title: 'Unemployment Rate (%)', dataKey: 'unemployment', color: '#dc2626' },
    { type: 'bar' as const, title: 'Inflation Rate (%)', dataKey: 'inflation', color: '#f97316' },
    { type: 'line' as const, title: 'Foreign Direct Investment (Billions USD)', dataKey: 'fdi', color: '#059669' },
    { type: 'bar' as const, title: 'Export/Import Ratio', dataKey: 'exportImportRatio', color: '#7c3aed' },
    { type: 'line' as const, title: 'Public Debt as % of GDP', dataKey: 'publicDebt', color: '#be123c' },
    { type: 'line' as const, title: 'Gini Coefficient (Income Inequality)', dataKey: 'giniCoefficient', color: '#7c2d12' }
  ];

  const socialCharts = [
    // Social Development Indicators
    { type: 'line' as const, title: 'Human Development Index (HDI)', dataKey: 'hdi', color: '#16a34a' },
    { type: 'bar' as const, title: 'Life Expectancy (Years)', dataKey: 'lifeExpectancy', color: '#059669' },
    { type: 'bar' as const, title: 'Infant Mortality Rate (per 1000 births)', dataKey: 'infantMortality', color: '#dc2626' },
    { type: 'line' as const, title: 'Literacy Rate (%)', dataKey: 'literacy', color: '#16a34a' },
    { type: 'bar' as const, title: 'Education Index', dataKey: 'educationIndex', color: '#2563eb' },
    { type: 'line' as const, title: 'Gender Inequality Index', dataKey: 'genderInequality', color: '#be185d' },
    { type: 'line' as const, title: 'Population Growth Rate (%)', dataKey: 'populationGrowth', color: '#7c3aed' },
    { type: 'bar' as const, title: 'Urban Population (%)', dataKey: 'urbanPopulation', color: '#0891b2' },
    { type: 'bar' as const, title: 'Poverty Rate (%)', dataKey: 'povertyRate', color: '#b91c1c' },
    { type: 'line' as const, title: 'Social Protection Coverage (%)', dataKey: 'socialProtection', color: '#16a34a' }
  ];

  const healthCharts = [
    // Health & Well-being Indicators  
    { type: 'bar' as const, title: 'Healthcare Expenditure per Capita (USD)', dataKey: 'healthcareExpenditure', color: '#dc2626' },
    { type: 'line' as const, title: 'Physicians per 1000 people', dataKey: 'physiciansPerThousand', color: '#059669' },
    { type: 'bar' as const, title: 'Hospital Beds per 1000 people', dataKey: 'hospitalBeds', color: '#2563eb' },
    { type: 'line' as const, title: 'Access to Clean Water (%)', dataKey: 'cleanWaterAccess', color: '#0891b2' },
    { type: 'bar' as const, title: 'Vaccination Coverage (%)', dataKey: 'vaccinationCoverage', color: '#16a34a' }
  ];

  const environmentCharts = [
    // Environment & Sustainability Indicators
    { type: 'bar' as const, title: 'Air Quality Index (AQI)', dataKey: 'aqi', color: '#f97316' },
    { type: 'line' as const, title: 'Renewable Energy (%)', dataKey: 'renewable', color: '#16a34a' },
    { type: 'bar' as const, title: 'CO2 Emissions per Capita (tons)', dataKey: 'co2Emissions', color: '#7f1d1d' },
    { type: 'line' as const, title: 'Forest Area (%)', dataKey: 'forestArea', color: '#15803d' },
    { type: 'bar' as const, title: 'Environmental Performance Index', dataKey: 'environmentalIndex', color: '#059669' }
  ];

  const governanceCharts = [
    // Governance & Infrastructure Indicators
    { type: 'line' as const, title: 'Internet Penetration (%)', dataKey: 'internetPenetration', color: '#2563eb' },
    { type: 'bar' as const, title: 'Corruption Perceptions Index', dataKey: 'corruptionIndex', color: '#7c3aed' },
    { type: 'line' as const, title: 'Mobile Phone Subscriptions (per 100 people)', dataKey: 'mobileSubscriptions', color: '#059669' },
    { type: 'bar' as const, title: 'Infrastructure Quality Index', dataKey: 'infrastructureQuality', color: '#0891b2' },
    { type: 'line' as const, title: 'Political Stability Index', dataKey: 'politicalStability', color: '#be123c' }
  ];

  const filters = { selectedCity, selectedRegion: 'All Regions', selectedYear, selectedCategory };

  return (
    <div className="min-h-screen bg-muted">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            India Development Dashboard
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl">
            Comprehensive visualization of development metrics across Indian cities. 
            Explore economic, social, health, environmental, and governance indicators.
          </p>
        </div>

        {/* News Section */}
        <div className="mb-8">
          <NewsSection />
        </div>

        {/* Filters */}
        <DashboardFilters
          selectedCity={selectedCity}
          selectedYear={selectedYear}
          selectedCategory={selectedCategory}
          onCityChange={setSelectedCity}
          onYearChange={setSelectedYear}
          onCategoryChange={setSelectedCategory}
        />

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-6 mb-8">
          <Card className="animate-scale-in">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs md:text-sm font-medium text-gray-600">Avg GDP per Capita</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg md:text-2xl font-bold text-primary">{filteredStats.gdp}</div>
              <p className="text-xs text-accent-green">+5.2% from last year</p>
            </CardContent>
          </Card>

          <Card className="animate-scale-in" style={{ animationDelay: '100ms' }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs md:text-sm font-medium text-gray-600">Avg Literacy Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg md:text-2xl font-bold text-primary">{filteredStats.literacy}</div>
              <p className="text-xs text-accent-green">+1.8% from last year</p>
            </CardContent>
          </Card>

          <Card className="animate-scale-in" style={{ animationDelay: '200ms' }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs md:text-sm font-medium text-gray-600">Avg AQI</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg md:text-2xl font-bold text-accent-orange">{filteredStats.aqi}</div>
              <p className="text-xs text-accent-green">-6.1% from last year</p>
            </CardContent>
          </Card>

          <Card className="animate-scale-in" style={{ animationDelay: '300ms' }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs md:text-sm font-medium text-gray-600">Renewable Energy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg md:text-2xl font-bold text-accent-green">{filteredStats.renewable}</div>
              <p className="text-xs text-accent-green">+12.3% from last year</p>
            </CardContent>
          </Card>

          <Card className="animate-scale-in col-span-2 md:col-span-1" style={{ animationDelay: '400ms' }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs md:text-sm font-medium text-gray-600">Avg HDI</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg md:text-2xl font-bold text-primary">{filteredStats.hdi}</div>
              <p className="text-xs text-accent-green">+2.4% from last year</p>
            </CardContent>
          </Card>
        </div>

        {/* HDI vs GDP Relationship Chart */}
        <div className="mb-8">
          <DashboardChart
            type="scatter"
            title="HDI vs GDP per Capita - Relationship between Human Development and Economic Prosperity"
            dataKey="gdp"
            secondaryDataKey="hdi"
            color="#8b5cf6"
            filters={filters}
          />
        </div>

        {/* Comprehensive Categorized Charts with Enhanced Tabs */}
        <Tabs defaultValue="economic" className="mb-8">
          <div className="relative p-1 rounded-lg bg-gradient-to-r from-purple-600 via-pink-600 via-blue-600 via-green-600 to-purple-600 bg-[length:400%_400%] animate-[gradient-shift_8s_ease-in-out_infinite]">
            <div className="overflow-x-auto">
              <TabsList className="flex w-full min-w-max md:grid md:grid-cols-5 bg-white/95 backdrop-blur-sm">
                <TabsTrigger 
                  value="economic" 
                  className="flex-shrink-0 px-4 py-2 text-xs md:text-sm font-medium hover:bg-white/80 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-purple-700 data-[state=active]:text-white data-[state=active]:font-bold data-[state=active]:shadow-lg data-[state=active]:scale-105 data-[state=active]:border-2 data-[state=active]:border-purple-300 transition-all duration-300 transform whitespace-nowrap"
                >
                  Economic
                </TabsTrigger>
                <TabsTrigger 
                  value="social" 
                  className="flex-shrink-0 px-4 py-2 text-xs md:text-sm font-medium hover:bg-white/80 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-600 data-[state=active]:to-pink-700 data-[state=active]:text-white data-[state=active]:font-bold data-[state=active]:shadow-lg data-[state=active]:scale-105 data-[state=active]:border-2 data-[state=active]:border-pink-300 transition-all duration-300 transform whitespace-nowrap"
                >
                  Social
                </TabsTrigger>
                <TabsTrigger 
                  value="health" 
                  className="flex-shrink-0 px-4 py-2 text-xs md:text-sm font-medium hover:bg-white/80 data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-red-700 data-[state=active]:text-white data-[state=active]:font-bold data-[state=active]:shadow-lg data-[state=active]:scale-105 data-[state=active]:border-2 data-[state=active]:border-red-300 transition-all duration-300 transform whitespace-nowrap"
                >
                  Health
                </TabsTrigger>
                <TabsTrigger 
                  value="environment" 
                  className="flex-shrink-0 px-4 py-2 text-xs md:text-sm font-medium hover:bg-white/80 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-700 data-[state=active]:text-white data-[state=active]:font-bold data-[state=active]:shadow-lg data-[state=active]:scale-105 data-[state=active]:border-2 data-[state=active]:border-green-300 transition-all duration-300 transform whitespace-nowrap"
                >
                  Environment
                </TabsTrigger>
                <TabsTrigger 
                  value="governance" 
                  className="flex-shrink-0 px-4 py-2 text-xs md:text-sm font-medium hover:bg-white/80 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:font-bold data-[state=active]:shadow-lg data-[state=active]:scale-105 data-[state=active]:border-2 data-[state=active]:border-blue-300 transition-all duration-300 transform whitespace-nowrap"
                >
                  Governance
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <TabsContent value="economic" className="space-y-6">
            {/* Desktop Layout */}
            <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-6">
              {economicCharts.map((chart, index) => (
                <DashboardChart
                  key={index}
                  type={chart.type}
                  title={chart.title}
                  dataKey={chart.dataKey}
                  color={chart.color}
                  filters={filters}
                />
              ))}
            </div>
            {/* Mobile Layout */}
            <MobileResponsiveChart charts={economicCharts} filters={filters} />
          </TabsContent>

          <TabsContent value="social" className="space-y-6">
            {/* Desktop Layout */}
            <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-6">
              {socialCharts.map((chart, index) => (
                <DashboardChart
                  key={index}
                  type={chart.type}
                  title={chart.title}
                  dataKey={chart.dataKey}
                  color={chart.color}
                  filters={filters}
                />
              ))}
            </div>
            {/* Mobile Layout */}
            <MobileResponsiveChart charts={socialCharts} filters={filters} />
          </TabsContent>

          <TabsContent value="health" className="space-y-6">
            {/* Desktop Layout */}
            <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-6">
              {healthCharts.map((chart, index) => (
                <DashboardChart
                  key={index}
                  type={chart.type}
                  title={chart.title}
                  dataKey={chart.dataKey}
                  color={chart.color}
                  filters={filters}
                />
              ))}
            </div>
            {/* Mobile Layout */}
            <MobileResponsiveChart charts={healthCharts} filters={filters} />
          </TabsContent>

          <TabsContent value="environment" className="space-y-6">
            {/* Desktop Layout */}
            <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-6">
              {environmentCharts.map((chart, index) => (
                <DashboardChart
                  key={index}
                  type={chart.type}
                  title={chart.title}
                  dataKey={chart.dataKey}
                  color={chart.color}
                  filters={filters}
                />
              ))}
            </div>
            {/* Mobile Layout */}
            <MobileResponsiveChart charts={environmentCharts} filters={filters} />
          </TabsContent>

          <TabsContent value="governance" className="space-y-6">
            {/* Desktop Layout */}
            <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-6">
              {governanceCharts.map((chart, index) => (
                <DashboardChart
                  key={index}
                  type={chart.type}
                  title={chart.title}
                  dataKey={chart.dataKey}
                  color={chart.color}
                  filters={filters}
                />
              ))}
            </div>
            {/* Mobile Layout */}
            <MobileResponsiveChart charts={governanceCharts} filters={filters} />
          </TabsContent>
        </Tabs>

        {/* Interactive India Map */}
        <div className="mb-8">
          <IndiaMap 
            selectedCity={selectedCity}
            selectedRegion="All Regions"
            selectedMetric={selectedCategory === 'Environment' ? 'aqi' : 'gdp'}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
