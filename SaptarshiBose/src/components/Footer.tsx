
import { TrendingUp } from 'lucide-react';
import TransitionLink from '@/components/TransitionLink';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-xl">IndiaMetrics</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Exploring India's urban development through comprehensive data analysis and visualization. 
              Making complex development metrics accessible to everyone.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/Sapfire007/IndiaMetrics" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                GitHub
              </a>
              <a href="https://discord.gg/VMd5bag4R5" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                Discord
              </a>
              <a href="https://x.com/sapfire955" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                Twitter
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><TransitionLink to="/" className="text-gray-400 hover:text-white transition-colors">Home</TransitionLink></li>
              <li><TransitionLink to="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</TransitionLink></li>
              <li><TransitionLink to="/insights" className="text-gray-400 hover:text-white transition-colors">Insights</TransitionLink></li>
              <li><TransitionLink to="/about" className="text-gray-400 hover:text-white transition-colors">About</TransitionLink></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><TransitionLink to="/resources" className="text-gray-400 hover:text-white transition-colors">Data Sources</TransitionLink></li>
              <li><TransitionLink to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</TransitionLink></li>
              <li><a href="https://github.com/Sapfire007/IndiaMetrics/blob/main/README.md" target='_blank' className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="https://github.com/Sapfire007/IndiaMetrics/blob/main/README.md" target='_blank' className="text-gray-400 hover:text-white transition-colors">API</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 IndiaMetrics. Built for the Let's Code community challenge.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
