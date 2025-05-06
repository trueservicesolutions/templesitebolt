import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const collections = [
  { id: 'ceremonies', name: 'Ceremonies', count: 346 },
  { id: 'culture', name: 'Culture', count: 831 },
  { id: 'community', name: 'Community', count: 954 },
  { id: 'festivals', name: 'Festivals', count: 567 },
  { id: 'education', name: 'Education', count: 423 }
];

const galleryImages = {
  ceremonies: [
    {
      main: "https://images.pexels.com/photos/2986011/pexels-photo-2986011.jpeg",
      thumbnails: [
        "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg",
        "https://images.pexels.com/photos/2983472/pexels-photo-2983472.jpeg",
        "https://images.pexels.com/photos/2983475/pexels-photo-2983475.jpeg"
      ]
    },
    {
      main: "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg",
      thumbnails: [
        "https://images.pexels.com/photos/2986011/pexels-photo-2986011.jpeg",
        "https://images.pexels.com/photos/2983472/pexels-photo-2983472.jpeg",
        "https://images.pexels.com/photos/2983475/pexels-photo-2983475.jpeg"
      ]
    }
  ],
  culture: [
    {
      main: "https://images.pexels.com/photos/2419574/pexels-photo-2419574.jpeg",
      thumbnails: [
        "https://images.pexels.com/photos/2419575/pexels-photo-2419575.jpeg",
        "https://images.pexels.com/photos/2419576/pexels-photo-2419576.jpeg",
        "https://images.pexels.com/photos/2419577/pexels-photo-2419577.jpeg"
      ]
    },
    {
      main: "https://images.pexels.com/photos/2419575/pexels-photo-2419575.jpeg",
      thumbnails: [
        "https://images.pexels.com/photos/2419574/pexels-photo-2419574.jpeg",
        "https://images.pexels.com/photos/2419576/pexels-photo-2419576.jpeg",
        "https://images.pexels.com/photos/2419577/pexels-photo-2419577.jpeg"
      ]
    }
  ],
  community: [
    {
      main: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
      thumbnails: [
        "https://images.pexels.com/photos/1181672/pexels-photo-1181672.jpeg",
        "https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg",
        "https://images.pexels.com/photos/1181674/pexels-photo-1181674.jpeg"
      ]
    },
    {
      main: "https://images.pexels.com/photos/1181672/pexels-photo-1181672.jpeg",
      thumbnails: [
        "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
        "https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg",
        "https://images.pexels.com/photos/1181674/pexels-photo-1181674.jpeg"
      ]
    }
  ],
  festivals: [
    {
      main: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
      thumbnails: [
        "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg",
        "https://images.pexels.com/photos/1190299/pexels-photo-1190299.jpeg",
        "https://images.pexels.com/photos/1190300/pexels-photo-1190300.jpeg"
      ]
    },
    {
      main: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg",
      thumbnails: [
        "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
        "https://images.pexels.com/photos/1190299/pexels-photo-1190299.jpeg",
        "https://images.pexels.com/photos/1190300/pexels-photo-1190300.jpeg"
      ]
    }
  ],
  education: [
    {
      main: "https://images.pexels.com/photos/3769981/pexels-photo-3769981.jpeg",
      thumbnails: [
        "https://images.pexels.com/photos/3769982/pexels-photo-3769982.jpeg",
        "https://images.pexels.com/photos/3769983/pexels-photo-3769983.jpeg",
        "https://images.pexels.com/photos/3769984/pexels-photo-3769984.jpeg"
      ]
    },
    {
      main: "https://images.pexels.com/photos/3769982/pexels-photo-3769982.jpeg",
      thumbnails: [
        "https://images.pexels.com/photos/3769981/pexels-photo-3769981.jpeg",
        "https://images.pexels.com/photos/3769983/pexels-photo-3769983.jpeg",
        "https://images.pexels.com/photos/3769984/pexels-photo-3769984.jpeg"
      ]
    }
  ]
};

const Gallery: React.FC = () => {
  const { t } = useTranslation();
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<{url: string; collection: string} | null>(null);

  const openLightbox = (imageUrl: string, collection: string) => {
    setCurrentImage({ url: imageUrl, collection });
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentImage(null);
  };

  const getNextImage = () => {
    if (!currentImage) return;
    const collection = galleryImages[currentImage.collection];
    const allImages = collection.reduce((acc, set) => {
      return [...acc, set.main, ...set.thumbnails];
    }, [] as string[]);
    
    const currentIndex = allImages.indexOf(currentImage.url);
    const nextIndex = (currentIndex + 1) % allImages.length;
    setCurrentImage({ url: allImages[nextIndex], collection: currentImage.collection });
  };

  const getPrevImage = () => {
    if (!currentImage) return;
    const collection = galleryImages[currentImage.collection];
    const allImages = collection.reduce((acc, set) => {
      return [...acc, set.main, ...set.thumbnails];
    }, [] as string[]);
    
    const currentIndex = allImages.indexOf(currentImage.url);
    const prevIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    setCurrentImage({ url: allImages[prevIndex], collection: currentImage.collection });
  };

  return (
    <section id="gallery" className="py-16 md:py-24 bg-cream">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-maroon mb-4">
            {t('gallery.title')}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            {t('gallery.subtitle')}
          </p>
        </div>

        {/* Collections Filter */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Popular Collections</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCollection(null)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                !selectedCollection ? 'bg-maroon text-white' : 'bg-white hover:bg-maroon/10'
              }`}
            >
              All
            </button>
            {collections.map((collection) => (
              <button
                key={collection.id}
                onClick={() => setSelectedCollection(collection.id)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  selectedCollection === collection.id
                    ? 'bg-maroon text-white'
                    : 'bg-white hover:bg-maroon/10'
                }`}
              >
                {collection.name}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections
            .filter(collection => !selectedCollection || selectedCollection === collection.id)
            .map((collection) => (
              <div
                key={collection.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-[1.02]"
              >
                {/* Main Image */}
                <div 
                  className="relative aspect-[4/3] overflow-hidden cursor-pointer"
                  onClick={() => openLightbox(galleryImages[collection.id][0].main, collection.id)}
                >
                  <img
                    src={galleryImages[collection.id][0].main}
                    alt={collection.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Thumbnails */}
                <div className="grid grid-cols-3 gap-1 p-1">
                  {galleryImages[collection.id][0].thumbnails.map((thumb, idx) => (
                    <div 
                      key={idx} 
                      className="aspect-square overflow-hidden cursor-pointer"
                      onClick={() => openLightbox(thumb, collection.id)}
                    >
                      <img
                        src={thumb}
                        alt={`${collection.name} thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover hover:opacity-75 transition-all duration-300 hover:scale-110"
                      />
                    </div>
                  ))}
                </div>

                {/* Collection Info */}
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg">{collection.name}</h3>
                    <p className="text-gray-500 text-sm">{collection.count} photos</p>
                  </div>
                  <button
                    onClick={() => setSelectedCollection(collection.id)}
                    className="text-maroon hover:text-gold transition-colors"
                  >
                    View All →
                  </button>
                </div>
              </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && currentImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 transition-colors"
            aria-label="Close lightbox"
          >
            <X className="h-8 w-8" />
          </button>
          
          <button
            onClick={getPrevImage}
            className="absolute left-4 text-white/80 hover:text-white p-2 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-10 w-10" />
          </button>

          <img
            src={currentImage.url}
            alt="Enlarged view"
            className="max-w-[90vw] max-h-[90vh] object-contain"
          />

          <button
            onClick={getNextImage}
            className="absolute right-4 text-white/80 hover:text-white p-2 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="h-10 w-10" />
          </button>
        </div>
      )}
    </section>
  );
};

export default Gallery;