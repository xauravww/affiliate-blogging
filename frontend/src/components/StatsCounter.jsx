import { useState, useEffect, useRef } from 'react';
import { FiTrendingUp, FiUsers, FiShoppingCart, FiStar } from 'react-icons/fi';

const StatsCounter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    deals: 0,
    users: 0,
    savings: 0,
    rating: 0
  });
  
  const sectionRef = useRef(null);

  const stats = [
    {
      id: 'deals',
      icon: FiTrendingUp,
      label: 'Active Deals',
      target: 1250,
      suffix: '+',
      color: 'text-blue-500'
    },
    {
      id: 'users',
      icon: FiUsers,
      label: 'Happy Customers',
      target: 15000,
      suffix: '+',
      color: 'text-green-500'
    },
    {
      id: 'savings',
      icon: FiShoppingCart,
      label: 'Money Saved',
      target: 2500000,
      prefix: '₹',
      suffix: '+',
      color: 'text-orange-500'
    },
    {
      id: 'rating',
      icon: FiStar,
      label: 'Average Rating',
      target: 4.8,
      suffix: '/5',
      decimal: true,
      color: 'text-yellow-500'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const animateCounters = () => {
    stats.forEach((stat) => {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = stat.target / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.target) {
          current = stat.target;
          clearInterval(timer);
        }
        
        setCounts(prev => ({
          ...prev,
          [stat.id]: stat.decimal ? current.toFixed(1) : Math.floor(current)
        }));
      }, duration / steps);
    });
  };

  const formatNumber = (num, stat) => {
    if (stat.id === 'savings') {
      return (num / 100000).toFixed(1) + 'L'; // Convert to lakhs
    }
    if (stat.decimal) {
      return parseFloat(num).toFixed(1);
    }
    return num.toLocaleString();
  };

  return (
    <section ref={sectionRef} className="py-16 bg-gradient-to-r from-neutral-50 to-neutral-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-800 mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Join thousands of smart shoppers who trust Rupay Savvy for the best deals and savings.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.id}
                className="text-center group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-medium hover:shadow-large transition-all duration-300 transform hover:scale-105">
                  <div className={`w-16 h-16 mx-auto mb-4 ${stat.color} bg-neutral-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent size={32} />
                  </div>
                  
                  <div className="text-3xl md:text-4xl font-bold text-neutral-800 mb-2">
                    {stat.prefix && <span className="text-2xl">{stat.prefix}</span>}
                    {formatNumber(counts[stat.id], stat)}
                    {stat.suffix && <span className="text-2xl">{stat.suffix}</span>}
                  </div>
                  
                  <p className="text-neutral-600 font-medium">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
