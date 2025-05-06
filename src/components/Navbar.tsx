import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = ['home', 'about', 'programs', 'gallery', 'donate', 'contact'];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between md:justify-center relative">
          {/* Logo - Left on mobile, centered on desktop */}
          <a 
            href="#" 
            className={`flex items-center md:absolute md:left-0 ${
              isScrolled ? 'text-maroon' : 'text-white'
            }`}
          >
            <span className="text-2xl font-serif font-bold">
              Divine Temple
            </span>
          </a>
          
          {/* Center Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <nav>
              <ul className="flex space-x-2">
                {navItems.map((item) => (
                  <li key={item}>
                    <a 
                      href={`#${item}`} 
                      className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                        isScrolled 
                          ? 'text-gray-800 hover:bg-maroon/10 hover:text-maroon' 
                          : 'text-white hover:bg-white/20'
                      }`}
                    >
                      {t(`nav.${item}`)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Language Switcher - Right on desktop */}
          <div className="hidden md:block md:absolute md:right-0">
            <LanguageSwitcher />
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className={`h-6 w-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm">
          <ul className="py-4 px-4 space-y-2">
            {navItems.map((item) => (
              <li key={item}>
                <a 
                  href={`#${item}`} 
                  className="block py-2 px-4 rounded-full text-gray-800 hover:bg-maroon/10 hover:text-maroon transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(`nav.${item}`)}
                </a>
              </li>
            ))}
          </ul>
          <div className="px-4 pb-4">
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;