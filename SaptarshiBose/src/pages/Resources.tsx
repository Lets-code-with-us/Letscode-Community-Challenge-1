
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Resources = () => {
  const dataSources = [
    {
      name: 'World Bank - World Development Indicators',
      description: 'Comprehensive economic and development data for India',
      url: 'https://data.worldbank.org',
      type: 'Economic Data',
      coverage: 'National & State Level'
    },
    {
      name: 'India Open Government Data Portal',
      description: 'Official government datasets including census and urban statistics',
      url: 'https://data.gov.in',
      type: 'Government Data',
      coverage: 'City & District Level'
    },
    {
      name: 'UNDP Human Development Reports',
      description: 'Human Development Index and related social indicators',
      url: 'https://hdr.undp.org',
      type: 'Social Indicators',
      coverage: 'State & National Level'
    },
    {
      name: 'WHO Global Health Observatory',
      description: 'Health metrics and environmental health data',
      url: 'https://data.who.int',
      type: 'Health Data',
      coverage: 'National Level'
    },
    {
      name: 'Ministry of Statistics and Programme Implementation',
      description: 'Official statistical data from Government of India',
      url: 'https://mospi.gov.in',
      type: 'Official Statistics',
      coverage: 'Multi-level'
    },
    {
      name: 'Central Pollution Control Board',
      description: 'Air quality and environmental monitoring data',
      url: 'https://cpcb.nic.in',
      type: 'Environmental Data',
      coverage: 'City Level'
    }
  ];

  const handleDownload = () => {
    const downloadUrl = 'https://ykgbguijchgtsaolkgva.supabase.co/storage/v1/object/sign/datasets/IndianDevelopmentDataset.zip?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lYTI3NjY5Yy0yYjlhLTRjMDItODM5Zi02ZTE4NWRkZmE1N2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhc2V0cy9JbmRpYW5EZXZlbG9wbWVudERhdGFzZXQuemlwIiwiaWF0IjoxNzUwMDIyODg5LCJleHAiOjMxNTM3NzE4NDg2ODg5fQ.hTkfI-mgE7tt1rMrKITlcUHgz1vhr6q-4Hl_Hed_co8';
    window.open(downloadUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-muted">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            Data Sources & Resources
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl">
            Comprehensive list of datasets used in the IndiaMetrics dashboard. 
            All data sources are credible, publicly available, and regularly updated.
          </p>
        </div>

        {/* Quick Download */}
        <Card className="mb-12 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Sample Dataset</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Indian Development Dataset</h3>
                <p className="text-gray-600 mb-2">Comprehensive development metrics across Indian cities including economic, social, environmental, and governance indicators from 2019 to 2024</p>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="outline">ZIP Format</Badge>
                  <Badge variant="outline">Multi-sheet Excel</Badge>
                  <Badge variant="outline">30+ Cities</Badge>
                </div>
              </div>
              <Button 
                onClick={handleDownload}
                className="bg-accent-orange hover:bg-accent-orange/90 text-white whitespace-nowrap"
              >
                Download Dataset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Data Sources */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Primary Data Sources</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {dataSources.map((source, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-semibold flex-1">{source.name}</CardTitle>
                    <Badge variant="outline">{source.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-3">{source.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      <strong>Coverage:</strong> {source.coverage}
                    </div>
                    <a 
                      href={source.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm font-medium"
                    >
                      Visit Source →
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Key Metrics Explained */}
        <Card className="mb-12 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Key Metrics Explained</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">GDP per Capita</h3>
                  <p className="text-gray-600 text-sm">Gross Domestic Product divided by population, indicating economic output per person in thousands of rupees.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Human Development Index (HDI)</h3>
                  <p className="text-gray-600 text-sm">Composite index measuring life expectancy, education, and standard of living on a scale of 0-1.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Literacy Rate</h3>
                  <p className="text-gray-600 text-sm">Percentage of population aged 15 and above who can read and write.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Gini Coefficient</h3>
                  <p className="text-gray-600 text-sm">Measure of income inequality where 0 represents perfect equality and 1 represents maximum inequality.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Gender Inequality Index</h3>
                  <p className="text-gray-600 text-sm">Composite measure of gender disparities in health, empowerment, and economic status (0-1 scale).</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Air Quality Index (AQI)</h3>
                  <p className="text-gray-600 text-sm">Measure of air pollution level, with lower values indicating better air quality (0-500 scale).</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Internet Penetration</h3>
                  <p className="text-gray-600 text-sm">Percentage of population with access to internet services and digital connectivity.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Renewable Energy %</h3>
                  <p className="text-gray-600 text-sm">Proportion of total energy consumption from renewable sources like solar, wind, and hydro.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">CO2 Emissions per Capita</h3>
                  <p className="text-gray-600 text-sm">Annual carbon dioxide emissions per person in metric tons, indicating environmental impact.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Corruption Perceptions Index</h3>
                  <p className="text-gray-600 text-sm">Score from 0-100 measuring perceived levels of public sector corruption (higher = less corrupt).</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Attribution */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Data Attribution & Licensing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-700">
                All datasets used in this project are from publicly available sources and are used in accordance 
                with their respective licensing terms. We acknowledge and thank the following organizations for 
                making their data publicly accessible:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>World Bank:</strong> Data from World Bank WDI (India country data) used under Creative Commons license</li>
                <li>• <strong>Government of India:</strong> Official statistics from data.gov.in portal under Open Government License</li>
                <li>• <strong>WHO:</strong> Health data from WHO Global Health Observatory under Creative Commons license</li>
                <li>• <strong>UNDP:</strong> Human Development data used with attribution under open access policy</li>
              </ul>
              <p className="text-gray-700 text-sm">
                This project is created for educational and research purposes as part of the Let's Code community challenge. 
                All analysis and visualizations are our own interpretation of the publicly available data.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Resources;
