import React, { useState } from "react";
import { Search } from "lucide-react";

export default function APMC() {
  const [searchTerm, setSearchTerm] = useState("");

  const mandiData = [
    {
      mandi: "Indore Mandi",
      crops: [
        { name: "Wheat (Gehun)", price: 2150, unit: "quintal", change: "+50" },
        { name: "Rice (Chawal)", price: 3200, unit: "quintal", change: "-30" },
        { name: "Soybean", price: 4500, unit: "quintal", change: "+120" },
        { name: "Gram (Chana)", price: 5100, unit: "quintal", change: "+80" },
        {
          name: "Cotton (Kapas)",
          price: 6800,
          unit: "quintal",
          change: "-100",
        },
        { name: "Onion (Pyaz)", price: 1200, unit: "quintal", change: "+200" },
        {
          name: "Tomato (Tamatar)",
          price: 800,
          unit: "quintal",
          change: "-150",
        },
        { name: "Potato (Aloo)", price: 1500, unit: "quintal", change: "+50" },
      ],
    },
    {
      mandi: "Dewas Mandi",
      crops: [
        { name: "Wheat (Gehun)", price: 2100, unit: "quintal", change: "+30" },
        { name: "Rice (Chawal)", price: 3150, unit: "quintal", change: "-20" },
        { name: "Soybean", price: 4450, unit: "quintal", change: "+100" },
        { name: "Gram (Chana)", price: 5050, unit: "quintal", change: "+60" },
        { name: "Cotton (Kapas)", price: 6750, unit: "quintal", change: "-80" },
        { name: "Onion (Pyaz)", price: 1150, unit: "quintal", change: "+180" },
        {
          name: "Tomato (Tamatar)",
          price: 850,
          unit: "quintal",
          change: "-100",
        },
        { name: "Potato (Aloo)", price: 1450, unit: "quintal", change: "+30" },
      ],
    },
    {
      mandi: "Ujjain Mandi",
      crops: [
        { name: "Wheat (Gehun)", price: 2120, unit: "quintal", change: "+40" },
        { name: "Rice (Chawal)", price: 3180, unit: "quintal", change: "-25" },
        { name: "Soybean", price: 4480, unit: "quintal", change: "+110" },
        { name: "Gram (Chana)", price: 5080, unit: "quintal", change: "+70" },
        { name: "Cotton (Kapas)", price: 6780, unit: "quintal", change: "-90" },
        { name: "Onion (Pyaz)", price: 1180, unit: "quintal", change: "+190" },
        {
          name: "Tomato (Tamatar)",
          price: 820,
          unit: "quintal",
          change: "-130",
        },
        { name: "Potato (Aloo)", price: 1480, unit: "quintal", change: "+40" },
      ],
    },
    {
      mandi: "Bhopal Mandi",
      crops: [
        { name: "Wheat (Gehun)", price: 2180, unit: "quintal", change: "+60" },
        { name: "Rice (Chawal)", price: 3220, unit: "quintal", change: "-35" },
        { name: "Soybean", price: 4520, unit: "quintal", change: "+130" },
        { name: "Gram (Chana)", price: 5120, unit: "quintal", change: "+90" },
        {
          name: "Cotton (Kapas)",
          price: 6820,
          unit: "quintal",
          change: "-110",
        },
        { name: "Onion (Pyaz)", price: 1220, unit: "quintal", change: "+210" },
        {
          name: "Tomato (Tamatar)",
          price: 780,
          unit: "quintal",
          change: "-160",
        },
        { name: "Potato (Aloo)", price: 1520, unit: "quintal", change: "+60" },
      ],
    },
    {
      mandi: "Ratlam Mandi",
      crops: [
        { name: "Wheat (Gehun)", price: 2090, unit: "quintal", change: "+25" },
        { name: "Rice (Chawal)", price: 3140, unit: "quintal", change: "-15" },
        { name: "Soybean", price: 4430, unit: "quintal", change: "+95" },
        { name: "Gram (Chana)", price: 5030, unit: "quintal", change: "+55" },
        { name: "Cotton (Kapas)", price: 6730, unit: "quintal", change: "-75" },
        { name: "Onion (Pyaz)", price: 1130, unit: "quintal", change: "+170" },
        {
          name: "Tomato (Tamatar)",
          price: 870,
          unit: "quintal",
          change: "-90",
        },
        { name: "Potato (Aloo)", price: 1430, unit: "quintal", change: "+25" },
      ],
    },
    {
      mandi: "Mandsaur Mandi",
      crops: [
        { name: "Wheat (Gehun)", price: 2140, unit: "quintal", change: "+45" },
        { name: "Rice (Chawal)", price: 3190, unit: "quintal", change: "-28" },
        { name: "Soybean", price: 4490, unit: "quintal", change: "+115" },
        { name: "Gram (Chana)", price: 5090, unit: "quintal", change: "+75" },
        { name: "Cotton (Kapas)", price: 6790, unit: "quintal", change: "-95" },
        { name: "Onion (Pyaz)", price: 1190, unit: "quintal", change: "+195" },
        {
          name: "Tomato (Tamatar)",
          price: 810,
          unit: "quintal",
          change: "-140",
        },
        { name: "Potato (Aloo)", price: 1490, unit: "quintal", change: "+45" },
      ],
    },
    {
      mandi: "Jabalpur Mandi",
      crops: [
        { name: "Wheat (Gehun)", price: 2160, unit: "quintal", change: "+55" },
        { name: "Rice (Chawal)", price: 3210, unit: "quintal", change: "-32" },
        { name: "Soybean", price: 4510, unit: "quintal", change: "+125" },
        { name: "Gram (Chana)", price: 5110, unit: "quintal", change: "+85" },
        {
          name: "Cotton (Kapas)",
          price: 6810,
          unit: "quintal",
          change: "-105",
        },
        { name: "Onion (Pyaz)", price: 1210, unit: "quintal", change: "+205" },
        {
          name: "Tomato (Tamatar)",
          price: 790,
          unit: "quintal",
          change: "-155",
        },
        { name: "Potato (Aloo)", price: 1510, unit: "quintal", change: "+55" },
      ],
    },
  ];

  const filteredData = mandiData
    .map((mandi) => ({
      ...mandi,
      crops: mandi.crops.filter((crop) =>
        crop.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter(
      (mandi) =>
        mandi.crops.length > 0 ||
        mandi.mandi.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-2">
            Today's Market Prices
          </h1>
          <p className="text-gray-600 text-sm md:text-base"> आज का मंडी भाव </p>
          <p className="text-sm text-gray-500 mt-1">
            Date: {new Date().toLocaleDateString("en-IN")}
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by mandi or crop name (e.g., Indore, Wheat)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-green-300 rounded-lg focus:outline-none focus:border-green-500 shadow-sm"
            />
          </div>
        </div>

        {/* Mandi Cards */}
        {filteredData.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredData.map((mandi, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                {/* Mandi Header */}
                <div className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-4">
                  <h2 className="text-xl md:text-2xl font-bold">
                    {mandi.mandi}
                  </h2>
                </div>

                {/* Crops List */}
                <div className="divide-y divide-gray-200">
                  {mandi.crops.map((crop, cropIdx) => (
                    <div
                      key={cropIdx}
                      className="p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 text-sm md:text-base">
                            {crop.name}
                          </h3>
                          <p className="text-xs text-gray-500">
                            per {crop.unit}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg md:text-xl font-bold text-green-700">
                            ₹{crop.price}
                          </p>
                          <p
                            className={`text-xs font-medium ${
                              crop.change.startsWith("+")
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {crop.change}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No mandis or crops found matching your search
            </p>
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            * Prices are indicative and may vary. Please verify at your local
            mandi.
          </p>
        </div>
      </div>
    </div>
  );
}
