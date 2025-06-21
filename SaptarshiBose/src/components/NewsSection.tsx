
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Clock, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

const NewsSection = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Fetching news from Supabase edge function...');
      const { data, error: functionError } = await supabase.functions.invoke('news');
      
      if (functionError) {
        console.error('Supabase function error:', functionError);
        throw new Error(functionError.message || 'Failed to fetch news');
      }

      if (data && data.articles) {
        console.log('Successfully fetched', data.articles.length, 'articles');
        setArticles(data.articles);
      } else {
        console.warn('No articles found in response');
        setArticles([]);
      }
    } catch (err) {
      console.error('News fetch error:', err);
      setError('Unable to load news. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  // Sample data as fallback when no live articles are available
  const sampleArticles: NewsArticle[] = [
    {
      title: "India's Economic Growth Continues to Show Strong Momentum",
      description: "Latest economic indicators suggest sustained growth across multiple sectors including technology, manufacturing, and services.",
      url: "#",
      urlToImage: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400",
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      source: { name: "Economic Times" }
    },
    {
      title: "Digital Infrastructure Development Accelerates Across Indian States",
      description: "Government initiatives drive digital connectivity improvements in rural and urban areas nationwide.",
      url: "#",
      urlToImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400",
      publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      source: { name: "Tech News India" }
    },
    {
      title: "Environmental Initiatives Show Positive Impact on Air Quality",
      description: "New data reveals improvement in air quality metrics across major metropolitan areas following recent policy changes.",
      url: "#",
      urlToImage: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400",
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      source: { name: "Environment Today" }
    }
  ];

  const displayArticles = articles.length > 0 ? articles : sampleArticles;

  return (
    <Card className="mb-8 animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold">Latest India Development News</CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Stay updated with the latest developments across India
            </p>
          </div>
          <Button
            onClick={fetchNews}
            disabled={loading}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}
        
        {articles.length === 0 && !loading && !error && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <p className="text-blue-800 text-sm">
              📰 Live news is now connected! Click refresh to load the latest articles.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayArticles.slice(0, 6).map((article, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white/70 backdrop-blur-sm">
              <CardContent className="p-4">
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <Badge variant="secondary" className="text-xs">
                      {article.source.name}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatTimeAgo(article.publishedAt)}
                    </div>
                  </div>
                  <h3 className="font-semibold text-sm line-clamp-2 text-gray-900">
                    {article.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-3">
                    {article.description}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="w-full justify-start text-xs"
                  >
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      Read more <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsSection;
