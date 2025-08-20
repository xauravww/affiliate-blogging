import { useState } from 'react';
import { FiSmartphone, FiMonitor, FiHeadphones, FiHome, FiShoppingBag, FiCamera, FiWatch, FiAirplay } from 'react-icons/fi';

const TrendingCategories = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const categories = [
    {
      id: 1,
      name: 'Electronics',
      icon: FiSmartphone,
      color: 'from-blue-500 to-blue-600',
      deals: '150+ deals',
      description: 'Latest smartphones, tablets & gadgets'
    },
    {
      id: 2,
      name: 'Computers',
      icon: FiMonitor,
      color: 'from-purple-500 to-purple-600',
      deals: '89+ deals',
      description: 'Laptops, desktops & accessories'
    },
    {
      id: 3,
      name: 'Audio',
      icon: FiHeadphones,
      color: 'from-green-500 to-green-600',
      deals: '67+ deals',
      description: 'Headphones, speakers & audio gear'
    },
    {
      id: 4,
      name: 'Home & Garden',
      icon: FiHome,
      color: 'from-orange-500 to-orange-600',
      deals: '120+ deals',
      description: 'Home appliances & garden tools'
    },
    {
      id: 5,
      name: 'Fashion',
      icon: FiShoppingBag,
      color: 'from-pink-500 to-pink-600',
      deals: '200+ deals',
      description: 'Clothing, shoes & accessories'
    },
    {
      id: 6,
      name: 'Photography',
      icon: FiCamera,
      color: 'from-indigo-500 to-indigo-600',
      deals: '45+ deals',
      description: 'Cameras, lenses & photography gear'
    },
    {
      id: 7,
      name: 'Wearables',
      icon: FiWatch,
      color: 'from-teal-500 to-teal-600',
      deals: '78+ deals',
      description: 'Smartwatches & fitness trackers'
    },
    {
      id: 8,
      name: 'Gaming',
      icon: FiAirplay,
      color: 'from-red-500 to-red-600',
      deals: '95+ deals',
      description: 'Gaming consoles & accessories'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-800 mb-4">
            Trending Categories
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Explore our most popular product categories and discover amazing deals across different niches.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.id}
                className="group relative cursor-pointer"
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <div className={`
                  relative overflow-hidden rounded-2xl p-6 text-center transition-all duration-300 transform
                  ${hoveredCategory === category.id ? 'scale-105 shadow-xl' : 'scale-100 shadow-medium'}
                  bg-gradient-to-br ${category.color}
                `}>
                  <div className="relative z-10">
                    <div className="w-12 h-12 mx-auto mb-4 text-white">
                      <IconComponent size={48} />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {category.name}
                    </h3>
                    <p className="text-sm text-white/90 mb-3">
                      {category.deals}
                    </p>
                    <p className={`text-xs text-white/80 transition-all duration-300 ${
                      hoveredCategory === category.id ? 'opacity-100' : 'opacity-0'
                    }`}>
                      {category.description}
                    </p>
                  </div>
                  
                  {/* Animated background effect */}
                  <div className={`
                    absolute inset-0 bg-white/10 transition-all duration-300
                    ${hoveredCategory === category.id ? 'opacity-100' : 'opacity-0'}
                  `} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrendingCategories;
