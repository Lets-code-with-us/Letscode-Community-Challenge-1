
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Twitter, Code, Database, TrendingUp, Users } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Database className="w-6 h-6" />,
      title: 'Comprehensive Data Analysis',
      description: 'Real-time insights from economic indicators, literacy rates, environmental metrics, and demographic trends across Indian cities and states'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Interactive Visualizations',
      description: 'Dynamic charts, interactive maps, and trend analysis tools that reveal patterns in India\'s development journey'
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: 'Modern Technology Stack',
      description: 'Built with React, TypeScript, and cutting-edge libraries for performance, scalability, and user experience'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Policy-Maker Focused',
      description: 'Designed for researchers, government officials, NGOs, and citizens to make informed decisions about development priorities'
    }
  ];

  const impacts = [
    {
      metric: '28 States & 8 UTs',
      description: 'Complete coverage of Indian administrative regions'
    },
    {
      metric: '50+ Key Metrics',
      description: 'Economic, social, and environmental indicators'
    },
    {
      metric: '10+ Years',
      description: 'Historical trend analysis and projections'
    },
    {
      metric: 'Real-time Updates',
      description: 'Latest data from government and international sources'
    }
  ];

  const techStack = [
    'React & TypeScript',
    'Tailwind CSS',
    'Recharts',
    'Tanstack Query',
    'Shadcn/ui',
    'Lucide Icons',
    'Interactive Maps',
    'APIs',         // Added
    'Supabase'      // Added
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary via-blue-600 to-accent-green">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center text-white animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              IndiaMetrics
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Transforming India's development data into actionable insights for sustainable growth, 
              evidence-based policy making, and informed decision-making across all sectors.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Mission Statement */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Our Mission: Data-Driven Development
          </h2>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            India's development story is complex and multifaceted. This platform bridges the gap between 
            raw government data and meaningful insights, making development metrics accessible to everyone 
            from policymakers to citizens. We believe that transparent, interactive data visualization 
            can accelerate India's progress toward sustainable development goals.
          </p>
        </div>

        {/* Impact Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {impacts.map((impact, index) => (
            <Card key={index} className="text-center animate-scale-in bg-gradient-to-br from-white to-blue-50 border-0 shadow-lg" style={{ animationDelay: `${index * 100}ms` }}>
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">{impact.metric}</div>
                <p className="text-gray-600 text-sm">{impact.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 animate-scale-in border-0 bg-white/70 backdrop-blur-sm" style={{ animationDelay: `${index * 150}ms` }}>
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Developer Section */}
        <Card className="mb-16 animate-fade-in bg-gradient-to-r from-gray-50 to-blue-50 border-0 shadow-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-3xl font-bold text-gray-900">Meet the Developer</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden shadow-lg">
              <img 
                src="https://avatars.githubusercontent.com/u/165061481?v=4" 
                alt="Saptarshi Bose" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Saptarshi Bose</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Full-stack developer passionate about leveraging technology for social impact. Specialized in 
              data visualization, interactive applications, and creating solutions that make complex information 
              accessible to drive positive change in society.
            </p>
            {/* <div className="flex flex-wrap justify-center space-x-4"> */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
              <Button variant="outline" size="lg" asChild className="group">
                <a href="https://www.linkedin.com/in/saptarshi-bose-a09436313/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-5 h-5 mr-2 group-hover:text-blue-600" />
                  LinkedIn
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild className="group">
                <a href="https://github.com/Sapfire007" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5 mr-2 group-hover:text-gray-900" />
                  GitHub
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild className="group">
                <a href="https://x.com/sapfire955" target="_blank" rel="noopener noreferrer">
                  <Twitter className="w-5 h-5 mr-2 group-hover:text-blue-400" />
                  Twitter
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tech Stack */}
        <Card className="mb-16 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Built With Modern Technologies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3 justify-center">
              {techStack.map((tech, index) => (
                <Badge key={index} variant="secondary" className="text-sm py-2 px-4 bg-primary/10 text-primary hover:bg-primary/20">
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="text-center bg-gradient-to-r from-primary to-accent-green text-white border-0 animate-scale-in">
          <CardContent className="p-12">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Explore India's Development Data?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Dive into comprehensive analytics and discover insights that shape India's future
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild className="bg-white text-primary hover:bg-gray-100">
                <a href="/dashboard">
                  Launch Dashboard
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                asChild 
                className="bg-accent-orange hover:bg-accent-orange/90 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border-accent-orange"
              >
                <a href="/insights">
                  View Insights
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default About;
