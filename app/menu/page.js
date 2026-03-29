"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { notify } from '@/utils/toast';
import { useCart } from '../../context/CartContext'; // Ensure this path is correct

const FULL_MENU = [
  // CHAI VARIETIES
  { id: 1, name: "Masala Chai", price: 40, category: "Chai", description: "The OG. Ginger, cardamom, and clove blend.", image: "/Menu/masalachai.jpg" },
  { id: 2, name: "Kesar Pista Chai", price: 110, category: "Chai", description: "Royal saffron with crushed pistachios.", image: "/Menu/kesarchai.jpg" },
  { id: 3, name: "Irani Dum Chai", price: 60, category: "Chai", description: "Thick, creamy, and slow-brewed to perfection.", image: "/Menu/iranichai.jpg" },
  { id: 4, name: "Sulaimani Lemon", price: 35, category: "Chai", description: "Black tea with a zesty lemon punch.", image: "/Menu/sulaimanichai.jpg" },

  // COFFEE VARIETIES
  { id: 5, name: "Hazelnut Latte", price: 180, category: "Coffee", description: "Espresso with steamed milk and nutty syrup.", image: "/menu/hazelnut.jpg" },
  { id: 6, name: "Vietnamese Iced", price: 160, category: "Coffee", description: "Strong brew with sweetened condensed milk.", image: "/menu/vietnamese.jpg" },
  { id: 7, name: "Caramel Macchiato", price: 210, category: "Coffee", description: "Vanilla-marked espresso with caramel drizzle.", image: "/menu/caramel.jpg" },
  { id: 17, name: "Classic Cappucino", price: 150, category: "Coffee", description: "Rich, velvety foam with a double espresso shot.", image: "/menu/cappucino.jpg" },

  // CROISSANTS
  { id: 9, name: "Butter Croissant", price: 150, category: "Croissants", description: "A flaky, buttery trip to Paris.", image: "/Menu/butter.jpg" },
  { id: 10, name: "Pain au Chocolat", price: 180, category: "Croissants", description: "Classic croissant with dark chocolate ribs.", image: "/Menu/pain.jpg" },
  { id: 11, name: "Cheese & Jalapeño", price: 210, category: "Croissants", description: "Savory bake with melting cheddar.", image: "/Menu/jalapeno.jpg" },
  { id: 18, name: "Biscoff Croissant", price: 240, category: "Croissants", description: "Topped with speculoos crumble and cream.", image: "/Menu/biscoff.jpg" },

  // CAKES
  { id: 13, name: "Red Velvet Jar", price: 190, category: "Cakes", description: "Layered cake with cream cheese frosting.", image: "/Menu/red.jpg" },
  { id: 14, name: "Blueberry Bliss", price: 220, category: "Cakes", description: "New York style cheesecake with berry swirl.", image: "/Menu/blueb.jpg" },
  { id: 15, name: "Death by Chocolate", price: 280, category: "Cakes", description: "For the brave. Pure Ganache goodness.", image: "/Menu/death.jpg" },
  { id: 19, name: "Lemon Tart", price: 170, category: "Cakes", description: "Zesty citrus curd in a buttery shortcrust.", image: "/Menu/lemon.jpg" },
];

const MenuPage = () => {
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMenu = FULL_MENU.filter(item => {
    const matchesTab = activeTab === "All" || item.category === activeTab;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-28 pb-20 px-4 md:px-8">
      
      {/* --- PROMO BANNER --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto mb-16 relative group"
      >
        <div className="absolute inset-0 bg-yellow-400/20 blur-[100px] rounded-full scale-75 opacity-50 pointer-events-none" />
        <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-400 p-8 md:p-14 flex flex-col md:flex-row items-center justify-between shadow-[0_30px_60px_-15px_rgba(250,204,21,0.3)]">
          <div className="relative z-10 text-black text-center md:text-left flex-1">
            <motion.span 
              initial={{ x: -20 }} animate={{ x: 0 }}
              className="bg-black text-white text-[11px] font-black px-4 py-1.5 rounded-full uppercase mb-6 inline-block tracking-widest"
            >
              Today&apos;s Special Wish
            </motion.span>
            <h2 className="text-5xl md:text-7xl font-black leading-[0.9] mb-4 drop-shadow-sm">
              CHAI + <br/> <span className="text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.2)]">CAKE COMBO</span>
            </h2>
            <div className="flex items-center gap-4 justify-center md:justify-start mb-8">
              <p className="text-black text-2xl font-bold italic opacity-80 line-through">₹249</p>
              <p className="text-black text-4xl font-black">₹149</p>
            </div>
            <button 
              onClick={() => notify.success("Combo Wish Granted! ✨")}
              className="bg-black text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-wider hover:scale-105 transition-transform active:scale-95 shadow-xl"
            >
              Claim Wish Now
            </button>
          </div>

          <div className="mt-10 md:mt-0 relative w-64 h-64 md:w-[400px] md:h-[300px] flex justify-center items-center">
             <motion.div 
               animate={{ y: [0, -15, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="relative w-full h-full"
             >
               <Image 
                 src="/Menu/masalachai.jpg" 
                 alt="Promo" 
                 fill 
                 className="object-cover rounded-[2rem] rotate-6 border-4 border-white shadow-2xl" 
               />
             </motion.div>
          </div>
        </div>
      </motion.div>

      {/* --- SEARCH & FILTERS --- */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row items-center gap-6 justify-between bg-white/5 backdrop-blur-xl p-5 rounded-[2.5rem] border border-white/10 shadow-2xl">
          <div className="relative w-full md:w-96">
            <input 
              type="text" 
              placeholder="What are you craving?"
              className="w-full bg-slate-900/50 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-yellow-400/50 transition-all text-sm"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar w-full md:w-auto px-2">
            {["All", "Chai", "Coffee", "Croissants", "Cakes"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-7 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                  activeTab === cat ? "bg-yellow-400 text-black shadow-lg shadow-yellow-400/20" : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- MENU GRID --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <AnimatePresence mode='popLayout'>
          {filteredMenu.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -10 }}
              className="bg-[#0b0b0e] border border-white/5 rounded-[2.5rem] overflow-hidden group hover:border-yellow-400/30 transition-all shadow-2xl flex flex-col h-full"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0e] via-transparent to-transparent opacity-80" />
                <span className="absolute bottom-4 left-6 bg-yellow-400 text-black text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-xl">
                  {item.category}
                </span>
              </div>

              <div className="p-7 flex flex-col flex-1 text-center">
                <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-400 transition-colors">{item.name}</h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-6 line-clamp-2 px-2">{item.description}</p>
                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="text-left">
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Price</p>
                    <p className="text-xl font-black text-white">₹{item.price}</p>
                  </div>
                  <motion.button 
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      addToCart(item);
                      notify.success(`Wish Granted: ${item.name} added! ✨`);
                    }}
                    className="bg-yellow-400 hover:bg-yellow-300 text-black p-4 rounded-2xl shadow-lg transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MenuPage;