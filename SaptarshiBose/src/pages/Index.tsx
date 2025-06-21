
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import CounterStats from '@/components/CounterStats';
import FeatureGrid from '@/components/FeatureGrid';
import Footer from '@/components/Footer';
import TransitionLink from '@/components/TransitionLink';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            IndiaMetrics
            <span className="block text-3xl md:text-4xl text-blue-200 mt-2">
              India Growth Metrics
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Explore how cities in India are growing through economic, social, and environmental lenses. 
            Comprehensive data visualization for informed decision-making.
          </p>
          <TransitionLink to="/dashboard">
            <Button 
              size="lg" 
              className="bg-accent-orange hover:bg-accent-orange/90 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              Launch Dashboard
            </Button>
          </TransitionLink>
        </div>
      </div>

      {/* Counter Stats */}
      <CounterStats />

      {/* Feature Grid */}
      <FeatureGrid />

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Explore India's Development Story?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Dive deep into comprehensive data analysis with interactive charts, maps, and AI-driven insights
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <TransitionLink to="/dashboard">
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-primary hover:bg-gray-100"
              >
                Explore Dashboard
              </Button>
            </TransitionLink>
            <TransitionLink to="/insights">
              <Button 
                size="lg" 
                className="bg-accent-orange hover:bg-accent-orange/90 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                View Insights
              </Button>
            </TransitionLink>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
