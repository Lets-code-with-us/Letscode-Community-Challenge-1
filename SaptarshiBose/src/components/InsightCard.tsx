
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface InsightCardProps {
  title: string;
  summary: string;
  category: string;
  trend: 'positive' | 'negative' | 'neutral';
  value: string;
  details: string;
  delay?: number;
}

const InsightCard = ({ title, summary, category, trend, value, details, delay = 0 }: InsightCardProps) => {
  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'positive': return 'bg-accent-green text-white';
      case 'negative': return 'bg-accent-orange text-white';
      default: return 'bg-secondary text-white';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'positive': return '↗️';
      case 'negative': return '↘️';
      default: return '➡️';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow animate-scale-in" style={{ animationDelay: `${delay}ms` }}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900 flex-1">
            {title}
          </CardTitle>
          <Badge className={getTrendColor(trend)}>
            {getTrendIcon(trend)} {value}
          </Badge>
        </div>
        <Badge variant="outline" className="w-fit">
          {category}
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 mb-3 font-medium">
          {summary}
        </p>
        <p className="text-gray-600 text-sm">
          {details}
        </p>
      </CardContent>
    </Card>
  );
};

export default InsightCard;
