
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';

interface DashboardFiltersProps {
  selectedCity: string;
  selectedYear: string;
  selectedCategory: string;
  onCityChange: (city: string) => void;
  onYearChange: (year: string) => void;
  onCategoryChange: (category: string) => void;
}

const DashboardFilters = ({
  selectedCity,
  selectedYear,
  selectedCategory,
  onCityChange,
  onYearChange,
  onCategoryChange
}: DashboardFiltersProps) => {
  const cities = ['All Cities', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata', 'Ahmedabad'];
  const years = ['2023', '2022', '2021', '2020', '2019', '2018'];
  const categories = ['All Categories', 'Economic', 'Social', 'Health', 'Environment'];

  return (
    <Card className="mb-6 animate-fade-in">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">City</label>
            <Select value={selectedCity} onValueChange={onCityChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Year</label>
            <Select value={selectedYear} onValueChange={onYearChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Category</label>
            <Select value={selectedCategory} onValueChange={onCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardFilters;
