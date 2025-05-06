import React from 'react';
import { useTranslation } from 'react-i18next';

const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-16 md:py-24 bg-cream">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <img 
              src="https://images.pexels.com/photos/33688/delicate-arch-night-stars-landscape.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Temple interior with traditional architecture" 
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
          </div>
          
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-maroon mb-6">
              {t('about.title')}
            </h2>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              {t('about.description1')}
            </p>
            
            <p className="text-gray-700 mb-8 leading-relaxed">
              {t('about.description2')}
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-bold text-maroon mb-2">{t('about.vision.title')}</h3>
                <p className="text-gray-700 text-sm">{t('about.vision.text')}</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-bold text-maroon mb-2">{t('about.values.title')}</h3>
                <p className="text-gray-700 text-sm">{t('about.values.text')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;