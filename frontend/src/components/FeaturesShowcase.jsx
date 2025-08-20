import { FiShield, FiZap, FiBell, FiTrendingUp, FiHeart, FiSearch } from 'react-icons/fi';

const FeaturesShowcase = () => {
  const features = [
    {
      icon: FiShield,
      title: 'Verified Deals',
      description: 'All deals are manually verified and tested before being featured on our platform.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: FiZap,
      title: 'Lightning Fast',
      description: 'Get instant notifications about flash sales and limited-time offers.',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: FiBell,
      title: 'Smart Alerts',
      description: 'Never miss a deal with our intelligent price drop and deal alert system.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: FiTrendingUp,
      title: 'Price Tracking',
      description: 'Track price history and get the best time to buy recommendations.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: FiHeart,
      title: 'Wishlist & Favorites',
      description: 'Save your favorite products and get notified when they go on sale.',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: FiSearch,
      title: 'Smart Search',
      description: 'Find exactly what you\'re looking for with our advanced search filters.',
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-800 mb-4">
            Why Choose Rupay Savvy?
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            We're not just another deal site. We're your smart shopping companion with features designed to save you time and money.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden bg-white rounded-2xl p-8 shadow-medium hover:shadow-large transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 mb-6 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent size={32} />
                  </div>
                  
                  <h3 className="text-xl font-display font-bold text-neutral-800 mb-4 group-hover:text-neutral-900 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-neutral-600 leading-relaxed group-hover:text-neutral-700 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-neutral-100 to-transparent rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500" />
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-neutral-50 to-transparent rounded-full translate-y-8 -translate-x-8 group-hover:scale-125 transition-transform duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesShowcase;
