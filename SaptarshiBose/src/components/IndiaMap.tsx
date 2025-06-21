
import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import ReactDatamaps from 'react-india-states-map';

interface IndiaMapProps {
  selectedCity: string;
  selectedRegion: string;
  selectedMetric: string;
}

const stateData = [
  // Major metros and states with comprehensive data
  { id: 'MH', name: 'Maharashtra', gdp: 310, literacy: 89.2, aqi: 161, renewable: 18.5, population: 112.4, region: 'West' },
  { id: 'DL', name: 'Delhi', gdp: 293, literacy: 86.3, aqi: 178, renewable: 15.2, population: 32.9, region: 'North' },
  { id: 'KA', name: 'Karnataka', gdp: 245, literacy: 87.7, aqi: 145, renewable: 28.3, population: 67.5, region: 'South' },
  { id: 'TN', name: 'Tamil Nadu', gdp: 201, literacy: 90.2, aqi: 139, renewable: 22.1, population: 77.8, region: 'South' },
  { id: 'TG', name: 'Telangana', gdp: 185, literacy: 83.1, aqi: 142, renewable: 25.7, population: 39.1, region: 'South' },
  { id: 'GJ', name: 'Gujarat', gdp: 167, literacy: 86.2, aqi: 134, renewable: 31.2, population: 70.0, region: 'West' },
  { id: 'WB', name: 'West Bengal', gdp: 156, literacy: 87.1, aqi: 156, renewable: 19.8, population: 99.6, region: 'East' },
  { id: 'RJ', name: 'Rajasthan', gdp: 142, literacy: 84.8, aqi: 167, renewable: 26.4, population: 81.0, region: 'North' },
  { id: 'UP', name: 'Uttar Pradesh', gdp: 128, literacy: 84.1, aqi: 149, renewable: 24.1, population: 237.9, region: 'North' },
  { id: 'KL', name: 'Kerala', gdp: 134, literacy: 85.5, aqi: 143, renewable: 22.8, population: 35.1, region: 'South' },
  { id: 'MP', name: 'Madhya Pradesh', gdp: 115, literacy: 82.4, aqi: 164, renewable: 17.2, population: 85.4, region: 'Central' },
  { id: 'AS', name: 'Assam', gdp: 198, literacy: 94.1, aqi: 98, renewable: 45.2, population: 35.6, region: 'Northeast' },
  { id: 'CH', name: 'Chandigarh', gdp: 108, literacy: 80.3, aqi: 153, renewable: 21.8, population: 1.2, region: 'North' },
  { id: 'HR', name: 'Haryana', gdp: 267, literacy: 86.8, aqi: 128, renewable: 33.4, population: 28.9, region: 'North' },
  { id: 'PB', name: 'Punjab', gdp: 192, literacy: 78.2, aqi: 118, renewable: 67.3, population: 30.1, region: 'North' }
];

const IndiaMap = ({ selectedCity, selectedRegion, selectedMetric }: IndiaMapProps) => {
  const [activeState, setActiveState] = useState<any>(null);

  // Filter data based on selections
  const filteredData = useMemo(() => {
    let filtered = [...stateData];
    
    if (selectedRegion !== 'All Regions') {
      filtered = filtered.filter(item => item.region === selectedRegion);
    }

    return filtered.sort((a, b) => {
      const metricKey = selectedMetric === 'aqi' ? 'aqi' : 'gdp';
      return selectedMetric === 'aqi' 
        ? a[metricKey] - b[metricKey] // Lower AQI is better
        : b[metricKey] - a[metricKey]; // Higher GDP is better
    });
  }, [selectedCity, selectedRegion, selectedMetric]);

  const getMetricValue = (state: any, metric: string) => {
    switch (metric) {
      case 'aqi': return state.aqi;
      case 'literacy': return state.literacy;
      case 'renewable': return state.renewable;
      default: return state.gdp;
    }
  };

  const getMetricColor = (state: any, metric: string) => {
    const value = getMetricValue(state, metric);
    
    switch (metric) {
      case 'aqi':
        if (value <= 100) return '#16a34a'; // Good
        if (value <= 150) return '#eab308'; // Moderate
        if (value <= 200) return '#f97316'; // Poor
        return '#dc2626'; // Very Poor
      
      case 'literacy':
        if (value >= 90) return '#16a34a'; // Excellent
        if (value >= 85) return '#eab308'; // Good
        if (value >= 80) return '#f97316'; // Average
        return '#dc2626'; // Below Average
      
      case 'renewable':
        if (value >= 40) return '#16a34a'; // High
        if (value >= 25) return '#eab308'; // Medium
        if (value >= 15) return '#f97316'; // Low
        return '#dc2626'; // Very Low
      
      default: // GDP
        if (value >= 250) return '#16a34a'; // High
        if (value >= 200) return '#eab308'; // Medium-High
        if (value >= 150) return '#f97316'; // Medium
        return '#dc2626'; // Low
    }
  };

  const getMetricLabel = (metric: string) => {
    switch (metric) {
      case 'aqi': return 'Air Quality Index';
      case 'literacy': return 'Literacy Rate (%)';
      case 'renewable': return 'Renewable Energy (%)';
      default: return 'GDP per Capita (₹ Thousands)';
    }
  };

  const getPerformanceIcon = (state: any, metric: string) => {
    const value = getMetricValue(state, metric);
    
    if (metric === 'aqi') {
      return value <= 150 ? <TrendingUp className="w-4 h-4 text-green-600" /> : <TrendingDown className="w-4 h-4 text-red-600" />;
    } else {
      const threshold = metric === 'gdp' ? 180 : metric === 'literacy' ? 85 : 25;
      return value >= threshold ? <TrendingUp className="w-4 h-4 text-green-600" /> : <TrendingDown className="w-4 h-4 text-orange-600" />;
    }
  };

  const onLocationClick = (event: any) => {
    const stateId = event.target.id;
    const stateName = event.target.getAttribute('name');
    const stateInfo = stateData.find(state => state.id === stateId || state.name === stateName);
    
    if (stateInfo) {
      setActiveState(activeState?.id === stateInfo.id ? null : stateInfo);
    }
    
    console.log('State clicked:', stateId, stateName);
  };

  return (
    <Card className="mb-8 animate-fade-in overflow-hidden">
      <CardHeader>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-bold">Interactive India Development Map</CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Comprehensive development metrics and indicators across Indian states
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs">
              {getMetricLabel(selectedMetric)}
            </Badge>
            {selectedRegion !== 'All Regions' && (
              <Badge variant="outline" className="text-xs">Region: {selectedRegion}</Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {/* Map and States Panel Container */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Map Container - Fixed to allow both horizontal and vertical scrolling */}
          <div className="flex-1">
            <div className="w-full h-[600px] border-2 border-gray-200 rounded-lg bg-gradient-to-b from-blue-50 to-green-50 overflow-auto">
              <div className="min-w-[800px] min-h-[600px] relative md:min-w-0 md:min-h-0">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full">
                    <ReactDatamaps
                      mapLayout={{
                        title: 'India Development Map',
                        geo: {
                          colorScale: ['#e3f2fd', '#1976d2'],
                          dataMode: 'region',
                          scope: 'india',
                          resolution: 50
                        }
                      }}
                      onClick={onLocationClick}
                      mapStyle={{
                        fill: '#f8fafc',
                        stroke: '#e2e8f0',
                        strokeWidth: 1,
                        cursor: 'pointer'
                      }}
                      hoverStyle={{
                        fill: '#ddd6fe',
                        stroke: '#8b5cf6',
                        strokeWidth: 2,
                        cursor: 'pointer'
                      }}
                    />
                  </div>
                </div>

                {/* Detailed popup for selected state */}
                {activeState && (
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-xl border max-w-xs z-30">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-lg text-gray-900">{activeState.name}</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setActiveState(null)}
                        className="h-6 w-6 p-0"
                      >
                        ×
                      </Button>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Region:</span>
                        <span className="font-medium">{activeState.region}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">GDP per Capita:</span>
                        <div className="flex items-center gap-1">
                          <span className="font-medium text-green-600">₹{activeState.gdp}k</span>
                          {getPerformanceIcon(activeState, 'gdp')}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Literacy Rate:</span>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">{activeState.literacy}%</span>
                          {getPerformanceIcon(activeState, 'literacy')}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">AQI:</span>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">{activeState.aqi}</span>
                          {getPerformanceIcon(activeState, 'aqi')}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Renewable Energy:</span>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">{activeState.renewable}%</span>
                          {getPerformanceIcon(activeState, 'renewable')}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Population:</span>
                        <span className="font-medium">{activeState.population}M</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Activity className="w-3 h-3" />
                        <span>Explore other states to compare</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Enhanced Top GDP States Panel */}
          <div className="lg:w-96">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4 h-[600px]">
              <h4 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-900">
                <MapPin className="w-5 h-5 text-blue-600" />
                Top Performing States
              </h4>
              
              <ScrollArea className="h-[520px] pr-2">
                <div className="space-y-3">
                  {stateData
                    .sort((a, b) => b.gdp - a.gdp)
                    .slice(0, 12)
                    .map((state, index) => (
                      <div 
                        key={state.id} 
                        className="bg-gradient-to-r from-gray-50 to-blue-50 p-3 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => setActiveState(activeState?.id === state.id ? null : state)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                              {index + 1}
                            </span>
                            <span className="font-semibold text-gray-900">{state.name}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {state.region}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-600">GDP:</span>
                            <span className="font-semibold text-green-600">₹{state.gdp}k</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Population:</span>
                            <span className="font-medium">{state.population}M</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Literacy:</span>
                            <span className="font-medium text-blue-600">{state.literacy}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">AQI:</span>
                            <span className={`font-medium ${state.aqi <= 150 ? 'text-green-600' : 'text-orange-600'}`}>
                              {state.aqi}
                            </span>
                          </div>
                          <div className="flex justify-between col-span-2">
                            <span className="text-gray-600">Renewable Energy:</span>
                            <span className="font-medium text-green-600">{state.renewable}%</span>
                          </div>
                        </div>
                        
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            {getPerformanceIcon(state, 'gdp')}
                            <span className="text-xs text-gray-500">Economic Growth</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {getPerformanceIcon(state, 'aqi')}
                            <span className="text-xs text-gray-500">Air Quality</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </ScrollArea>
              
              <div className="mt-3 pt-3 border-t text-center">
                <p className="text-xs text-gray-500">
                  💡 Select any state card for detailed analysis
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
          <h4 className="text-sm font-semibold mb-3">{getMetricLabel(selectedMetric)} Legend</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            {selectedMetric === 'aqi' ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  <span>Good (≤100)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                  <span>Moderate (101-150)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                  <span>Poor (151-200)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-600"></div>
                  <span>Very Poor (&gt;200)</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  <span>High (≥250k)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                  <span>Medium-High (200-249k)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                  <span>Medium (150-199k)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-600"></div>
                  <span>Low (&lt;150k)</span>
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Data Summary */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-primary">{filteredData.length}</div>
            <div className="text-xs text-gray-600">States Shown</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-green-600">
              ₹{Math.round(filteredData.reduce((acc, item) => acc + item.gdp, 0) / filteredData.length)}k
            </div>
            <div className="text-xs text-gray-600">Avg GDP</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-blue-600">
              {Math.round(filteredData.reduce((acc, item) => acc + item.literacy, 0) / filteredData.length)}%
            </div>
            <div className="text-xs text-gray-600">Avg Literacy</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-orange-600">
              {Math.round(filteredData.reduce((acc, item) => acc + item.aqi, 0) / filteredData.length)}
            </div>
            <div className="text-xs text-gray-600">Avg AQI</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IndiaMap;
