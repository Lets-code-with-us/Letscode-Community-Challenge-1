
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import InsightCard from '@/components/InsightCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const insights = [
  {
    title: 'Bangalore Leads in Internet Penetration',
    summary: 'Bangalore achieves highest digital connectivity at 94% internet penetration rate',
    category: 'Technology',
    trend: 'positive' as const,
    value: '94%',
    details: 'According to the dataset, Bangalore leads all major Indian cities in internet penetration, driven by its status as the IT capital and strong digital infrastructure investments.'
  },
  {
    title: 'Delhi Air Quality Shows Improvement',
    summary: 'AQI levels in Delhi decreased by 8.2% compared to previous year',
    category: 'Environment',
    trend: 'positive' as const,
    value: '-8.2%',
    details: 'Despite still being above safe levels, Delhi shows consistent improvement in air quality management through policy interventions and increased renewable energy adoption.'
  },
  {
    title: 'Chennai Achieves Highest Literacy Rate',
    summary: 'Chennai maintains educational excellence with 90.2% literacy rate',
    category: 'Education',
    trend: 'positive' as const,
    value: '90.2%',
    details: 'Chennai demonstrates strong educational infrastructure and policy implementation, maintaining the highest literacy rate among major Indian metropolitan areas.'
  },
  {
    title: 'Renewable Energy Growth Accelerates',
    summary: 'Average renewable energy adoption increased by 12.3% across cities',
    category: 'Sustainability',
    trend: 'positive' as const,
    value: '+12.3%',
    details: 'Indian cities show strong commitment to clean energy with Pune leading at 31.2% renewable energy usage, followed by Bangalore at 28.3%.'
  },
  {
    title: 'Economic Recovery Post-Pandemic',
    summary: 'GDP per capita shows strong recovery with 5.7% average growth',
    category: 'Economy',
    trend: 'positive' as const,
    value: '+5.7%',
    details: 'Major Indian cities demonstrate economic resilience with Mumbai and Delhi leading in GDP per capita recovery, indicating strong post-pandemic economic fundamentals.'
  },
  {
    title: 'Healthcare Infrastructure Needs Attention',
    summary: 'HDI growth remains modest at 2.3% indicating healthcare challenges',
    category: 'Health',
    trend: 'neutral' as const,
    value: '+2.3%',
    details: 'While improving, Human Development Index growth suggests need for accelerated investment in healthcare infrastructure and services across urban areas.'
  }
];

const Insights = () => {
  return (
    <div className="min-h-screen bg-muted">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI-Driven Development Insights
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Automated analysis of key trends and patterns in India's urban development data. 
            These insights are generated from comprehensive datasets spanning multiple years and cities.
          </p>
        </div>

        {/* Key Findings Summary */}
        <Card className="mb-8 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Key Findings Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-accent-green mb-2">5 Cities</div>
                <div className="text-sm text-gray-600">Show Above Average Growth</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-2">86.2%</div>
                <div className="text-sm text-gray-600">Average Literacy Rate</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-accent-orange mb-2">23.4%</div>
                <div className="text-sm text-gray-600">Renewable Energy Adoption</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Performing Cities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="text-lg">Economic Leader</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary mb-2">Mumbai</div>
                <div className="text-sm text-gray-600">₹3.1L GDP per capita</div>
                <div className="text-xs text-accent-green mt-1">+6.2% growth</div>
              </CardContent>
            </Card>

            <Card className="animate-scale-in" style={{ animationDelay: '100ms' }}>
              <CardHeader>
                <CardTitle className="text-lg">Education Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary mb-2">Chennai</div>
                <div className="text-sm text-gray-600">90.2% literacy rate</div>
                <div className="text-xs text-accent-green mt-1">Consistent leader</div>
              </CardContent>
            </Card>

            <Card className="animate-scale-in" style={{ animationDelay: '200ms' }}>
              <CardHeader>
                <CardTitle className="text-lg">Green Energy Champion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary mb-2">Pune</div>
                <div className="text-sm text-gray-600">31.2% renewable energy</div>
                <div className="text-xs text-accent-green mt-1">Leading sustainability</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Insights */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Analysis</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {insights.map((insight, index) => (
              <InsightCard
                key={index}
                {...insight}
                delay={index * 100}
              />
            ))}
          </div>
        </div>

        {/* Projections */}
        <Card className="mb-8 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">2030 Projections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-900">Average Literacy Rate</div>
                  <div className="text-sm text-gray-600">Based on current trends</div>
                </div>
                <div className="text-xl font-bold text-accent-green">92.5%</div>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-900">Renewable Energy Adoption</div>
                  <div className="text-sm text-gray-600">Projected growth trajectory</div>
                </div>
                <div className="text-xl font-bold text-accent-green">45.2%</div>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-900">Average GDP per Capita</div>
                  <div className="text-sm text-gray-600">Economic growth forecast</div>
                </div>
                <div className="text-xl font-bold text-primary">₹3.8L</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Insights;
