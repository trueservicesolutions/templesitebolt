import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Divine Temple</h3>
            <p className="text-gray-400 mb-4">
              A place of spiritual growth, cultural preservation, and community service.
            </p>
            <p className="text-gray-400">
              Tax ID: 12-3456789<br />
              Non-Profit Organization
            </p>
            <div className="mt-4">
              <a 
                href="https://wa.me/12125556789"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-gray-400 hover:text-gold transition-colors"
              >
                <span className="mr-2">WhatsApp:</span>
                <span>+1 (212) 555-6789</span>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Programs', 'Gallery', 'Donate', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className="text-gray-400 hover:text-gold transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Programs</h4>
            <ul className="space-y-2">
              <li>
                <a href="#programs" className="text-gray-400 hover:text-gold transition-colors">
                  Daily Ceremonies
                </a>
              </li>
              <li>
                <a href="#programs" className="text-gray-400 hover:text-gold transition-colors">
                  Community Service
                </a>
              </li>
              <li>
                <a href="#programs" className="text-gray-400 hover:text-gold transition-colors">
                  Spiritual Education
                </a>
              </li>
              <li>
                <a href="#programs" className="text-gray-400 hover:text-gold transition-colors">
                  Cultural Classes
                </a>
              </li>
              <li>
                <a href="#programs" className="text-gray-400 hover:text-gold transition-colors">
                  Festival Celebrations
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Divine Temple. All rights reserved.
          </p>
          
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-gold transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-gold transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-gold transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;