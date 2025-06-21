
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const newsApiKey = Deno.env.get('NEWS_API_KEY');
    
    if (!newsApiKey) {
      console.error('NEWS_API_KEY is not configured');
      return new Response(
        JSON.stringify({ error: 'News API key not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Fetch news related to India development
    const newsUrl = `https://newsapi.org/v2/everything?q=India+development+economy+infrastructure&language=en&sortBy=publishedAt&pageSize=10&apiKey=${newsApiKey}`;
    
    console.log('Fetching news from:', newsUrl.replace(newsApiKey, '[REDACTED]'));
    
    const response = await fetch(newsUrl);
    
    if (!response.ok) {
      console.error('News API error:', response.status, response.statusText);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch news' }),
        { 
          status: response.status, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const data = await response.json();
    console.log('Successfully fetched', data.articles?.length || 0, 'articles');

    return new Response(
      JSON.stringify(data),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in news function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
