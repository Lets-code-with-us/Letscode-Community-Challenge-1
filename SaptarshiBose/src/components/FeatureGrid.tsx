
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    title: 'HDI Index',
    description: 'Human Development Index tracking quality of life',
    value: '0.645',
    trend: '+2.3%',
    color: 'text-accent-green',
    bgColor: 'bg-green-50'
  },
  {
    title: 'GDP per Capita',
    description: 'Economic output per person in major cities',
    value: '₹1.2L',
    trend: '+5.7%',
    color: 'text-primary',
    bgColor: 'bg-blue-50'
  },
  {
    title: 'AQI Levels',
    description: 'Air Quality Index monitoring environmental health',
    value: '156',
    trend: '-8.2%',
    color: 'text-accent-orange',
    bgColor: 'bg-orange-50'
  },
  {
    title: 'Literacy Rate',
    description: 'Educational attainment across urban areas',
    value: '84.7%',
    trend: '+1.9%',
    color: 'text-accent-green',
    bgColor: 'bg-green-50'
  },
  {
    title: 'Internet Penetration',
    description: 'Digital connectivity and access rates',
    value: '78.3%',
    trend: '+12.4%',
    color: 'text-primary',
    bgColor: 'bg-blue-50'
  },
  {
    title: 'Renewable Energy',
    description: 'Clean energy adoption percentage',
    value: '23.1%',
    trend: '+15.6%',
    color: 'text-accent-green',
    bgColor: 'bg-green-50'
  }
];

const FeatureGrid = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Key Development Metrics
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Track the most important indicators of urban development across India's major cities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4`}>
                  <div className={`w-6 h-6 ${feature.color} font-bold text-xl`}>
                    {feature.title.charAt(0)}
                  </div>
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {feature.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">
                    {feature.value}
                  </span>
                  <span className={`text-sm font-medium ${feature.color}`}>
                    {feature.trend}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
