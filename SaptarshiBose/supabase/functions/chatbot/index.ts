
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const WEBSITE_CONTEXT = `
You are a helpful assistant for IndiaMetrics, a comprehensive platform that tracks India's urban development and growth metrics. Here's what you need to know about the website:

ABOUT INDIAMETRICS:
- IndiaMetrics is a data visualization platform focused on India's urban development
- Provides interactive dashboards with economic, social, and environmental metrics
- Covers multiple Indian cities with comprehensive data analysis
- Offers AI-driven insights for informed decision-making

MAIN SECTIONS:
1. Dashboard - Interactive data visualization with charts, maps, and filters
2. Insights - AI-powered analysis and trends in Indian urban development  
3. About - Information about the platform and methodology
4. Resources - Datasets, research papers, and documentation
5. Contact - Ways to get in touch with the team

KEY FEATURES:
- Interactive India map showing city-wise data
- Comprehensive charts and graphs for data visualization
- Real-time filtering and data exploration
- Economic indicators (GDP, employment, investment)
- Social metrics (education, healthcare, infrastructure)
- Environmental data (air quality, sustainability measures)
- Historical data from 2018-2024 covering major Indian cities

DATA COVERAGE:
- Digital infrastructure metrics across 30 Indian cities (2019-2024)
- Economic development indicators
- Social progress measurements
- Environmental sustainability metrics

Always respond helpfully about IndiaMetrics features, data, and capabilities. If asked about something not related to IndiaMetrics or urban development in India, politely redirect the conversation back to the website's purpose.
`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

    if (!geminiApiKey) {
      throw new Error('Gemini API key not configured');
    }

    console.log('Processing chatbot message:', message);

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `${WEBSITE_CONTEXT}\n\nUser question: ${message}\n\nPlease provide a helpful response about IndiaMetrics platform. Keep responses concise and focused on the website's features and data.`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!response.ok) {
      console.error('Gemini API error:', response.status, await response.text());
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const reply = data.candidates[0]?.content?.parts[0]?.text || 'Sorry, I could not generate a response.';

    console.log('Generated response:', reply);

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in chatbot function:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to process your message. Please try again.',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
