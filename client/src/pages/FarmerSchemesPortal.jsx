import React, { useState } from 'react';
import { Search, Sprout, DollarSign, Lightbulb, ChevronRight } from 'lucide-react';

export default function FarmerSchemesPortal() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const schemesData = [
    {
      id: 1,
      category: "subsidy",
      title: "PM-KISAN Yojana",
      titleHindi: "प्रधानमंत्री किसान सम्मान निधि",
      description: "Direct income support of ₹6000 per year in three installments to all landholding farmers",
      benefit: "₹6,000/year",
      eligibility: "All landholding farmers",
      howToApply: "Visit pmkisan.gov.in or nearest CSC"
    },
    {
      id: 2,
      category: "subsidy",
      title: "Kisan Credit Card (KCC)",
      titleHindi: "किसान क्रेडिट कार्ड",
      description: "Provides adequate and timely credit for agricultural needs with low interest rates",
      benefit: "Up to ₹3 lakh at 4% interest",
      eligibility: "Farmers with cultivable land",
      howToApply: "Apply at nearest bank branch"
    },
    {
      id: 3,
      category: "subsidy",
      title: "Pradhan Mantri Fasal Bima Yojana",
      titleHindi: "प्रधानमंत्री फसल बीमा योजना",
      description: "Crop insurance scheme providing coverage against crop loss due to natural calamities",
      benefit: "2% premium for Kharif, 1.5% for Rabi",
      eligibility: "All farmers growing notified crops",
      howToApply: "Through banks or insurance companies"
    },
    {
      id: 4,
      category: "subsidy",
      title: "Soil Health Card Scheme",
      titleHindi: "मृदा स्वास्थ्य कार्ड योजना",
      description: "Provides soil health cards to farmers with recommendations on nutrients and fertilizers",
      benefit: "Free soil testing",
      eligibility: "All farmers",
      howToApply: "Contact agriculture department"
    },
    {
      id: 5,
      category: "technology",
      title: "Drip Irrigation System",
      titleHindi: "ड्रिप सिंचाई प्रणाली",
      description: "Water-efficient irrigation technology that saves up to 60% water and increases yield by 40-50%",
      benefit: "60% water saving, 40-50% yield increase",
      eligibility: "Subsidy available under PMKSY",
      howToApply: "Agriculture department or horticulture board"
    },
    {
      id: 6,
      category: "technology",
      title: "Solar Pump Installation",
      titleHindi: "सोलर पंप स्थापना",
      description: "Solar-powered irrigation pumps with 90% subsidy reducing electricity costs",
      benefit: "90% subsidy, zero electricity bill",
      eligibility: "Farmers with irrigation needs",
      howToApply: "PM-KUSUM scheme portal"
    },
    {
      id: 7,
      category: "technology",
      title: "Drone Technology for Spraying",
      titleHindi: "कीटनाशक छिड़काव के लिए ड्रोन",
      description: "Agricultural drones for pesticide spraying, reducing labor cost and increasing efficiency",
      benefit: "10x faster spraying, 30% cost reduction",
      eligibility: "Available on rent or purchase",
      howToApply: "Contact Kisan Drone Service Centers"
    },
    {
      id: 8,
      category: "technology",
      title: "Mobile Soil Testing Labs",
      titleHindi: "मोबाइल मृदा परीक्षण प्रयोगशाला",
      description: "On-spot soil testing facility providing immediate results and fertilizer recommendations",
      benefit: "Instant soil health report",
      eligibility: "All farmers",
      howToApply: "Book through agriculture department app"
    },
    {
      id: 9,
      category: "scheme",
      title: "National Agriculture Market (e-NAM)",
      titleHindi: "राष्ट्रीय कृषि बाज़ार",
      description: "Online trading platform for agricultural commodities ensuring better price discovery",
      benefit: "Better market access and prices",
      eligibility: "All farmers",
      howToApply: "Register on enam.gov.in"
    },
    {
      id: 10,
      category: "scheme",
      title: "Paramparagat Krishi Vikas Yojana",
      titleHindi: "परम्परागत कृषि विकास योजना",
      description: "Promotes organic farming with financial assistance of ₹50,000 per hectare over 3 years",
      benefit: "₹50,000/hectare for 3 years",
      eligibility: "Farmers willing to adopt organic farming",
      howToApply: "Through organic farming clusters"
    },
    {
      id: 11,
      category: "technology",
      title: "Precision Agriculture Tools",
      titleHindi: "सटीक कृषि उपकरण",
      description: "GPS and sensor-based farming tools for optimal resource utilization and yield management",
      benefit: "20-30% input cost reduction",
      eligibility: "Progressive farmers with tech adoption",
      howToApply: "Agriculture technology companies"
    },
    {
      id: 12,
      category: "scheme",
      title: "Kisan Rail Service",
      titleHindi: "किसान रेल सेवा",
      description: "Special trains for quick transportation of perishable agricultural products",
      benefit: "50% subsidy on freight charges",
      eligibility: "Farmers, FPOs, traders",
      howToApply: "Book through Indian Railways"
    }
  ];

  const filteredData = schemesData.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.titleHindi.includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = activeTab === 'all' || item.category === activeTab;
    
    return matchesSearch && matchesTab;
  });

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'subsidy':
        return <DollarSign className="w-5 h-5" />;
      case 'technology':
        return <Lightbulb className="w-5 h-5" />;
      case 'scheme':
        return <Sprout className="w-5 h-5" />;
      default:
        return <Sprout className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'subsidy':
        return 'bg-blue-100 text-blue-700';
      case 'technology':
        return 'bg-purple-100 text-purple-700';
      case 'scheme':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-green-800 mb-2">
            किसान योजना पोर्टल
          </h1>
          <p className="text-gray-700 text-lg md:text-xl font-medium">Farmer Schemes & Technologies</p>
          <p className="text-sm text-gray-600 mt-2">Empowering farmers with subsidies, schemes, and modern technologies</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search schemes, subsidies or technologies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-green-300 rounded-lg focus:outline-none focus:border-green-500 shadow-sm text-sm md:text-base"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-8 flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 md:px-6 py-2 rounded-full font-medium transition-all ${
              activeTab === 'all'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab('subsidy')}
            className={`px-4 md:px-6 py-2 rounded-full font-medium transition-all ${
              activeTab === 'subsidy'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Subsidies
          </button>
          <button
            onClick={() => setActiveTab('scheme')}
            className={`px-4 md:px-6 py-2 rounded-full font-medium transition-all ${
              activeTab === 'scheme'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Schemes
          </button>
          <button
            onClick={() => setActiveTab('technology')}
            className={`px-4 md:px-6 py-2 rounded-full font-medium transition-all ${
              activeTab === 'technology'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Technologies
          </button>
        </div>

        {/* Cards Grid */}
        {filteredData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                {/* Category Badge */}
                <div className={`px-4 py-2 flex items-center gap-2 ${getCategoryColor(item.category)}`}>
                  {getCategoryIcon(item.category)}
                  <span className="text-xs font-semibold uppercase">
                    {item.category}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 font-medium">
                    {item.titleHindi}
                  </p>
                  <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Benefits & Eligibility */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2">
                      <span className="text-green-600 font-bold text-xs mt-0.5">💰</span>
                      <div>
                        <p className="text-xs text-gray-500">Benefit</p>
                        <p className="text-sm font-semibold text-green-700">{item.benefit}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold text-xs mt-0.5">✓</span>
                      <div>
                        <p className="text-xs text-gray-500">Eligibility</p>
                        <p className="text-sm text-gray-700">{item.eligibility}</p>
                      </div>
                    </div>
                  </div>

                  {/* How to Apply */}
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">How to Apply</p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-700">{item.howToApply}</p>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No schemes or technologies found matching your search</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 bg-white rounded-xl shadow-md p-6 text-center">
          <p className="text-sm text-gray-700 mb-2">
            <strong>Need Help?</strong> Contact your nearest agriculture office or call toll-free
          </p>
          <p className="text-2xl font-bold text-green-700">1800-180-1551</p>
          <p className="text-xs text-gray-500 mt-4">
            * Information is for guidance only. Please verify details with respective departments before applying.
          </p>
        </div>
      </div>
    </div>
  );
}