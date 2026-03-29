"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';

const OrderSuccess = () => {
  const router = useRouter();
  const [statusIndex, setStatusIndex] = useState(0);

  const statuses = [
    { icon: "🕯️", label: "Rubbing the Lamp...", sub: "We've received your wish!" },
    { icon: "🍃", label: "Gathering Leaves...", sub: "Selecting the finest tea blend." },
    { icon: "🔥", label: "Brewing Magic...", sub: "Your chai is over the flames." },
    { icon: "✨", label: "Genie is Flying!", sub: "Out for delivery to your location." }
  ];

  useEffect(() => {
    // 🎊 Trigger Celebration
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#fac815', '#ffffff', '#fb923c']
    });

    // 🕒 Cycle through status updates
    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev < statuses.length - 1 ? prev + 1 : prev));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 pt-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_600px_at_50%_50%,#fac81515,transparent)] pointer-events-none" />

      <div className="max-w-xl w-full text-center relative z-10">
        {/* Floating Genie Icon */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="text-8xl mb-8 inline-block drop-shadow-[0_0_30px_rgba(250,204,21,0.4)]"
        >
          🧞‍♂️
        </motion.div>

        <motion.h1 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }}
          className="text-4xl md:text-6xl font-black italic text-yellow-400 mb-4 uppercase tracking-tighter"
        >   
          WISH GRANTED!
        </motion.h1>
        
        <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-12">
          Order ID: #CHAI-{Math.floor(Math.random() * 10000)}
        </p>

        {/* --- PROGRESS TRACKER --- */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 mb-10 shadow-2xl">
          <div className="flex flex-col items-center gap-6">
            <motion.div 
              key={statusIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl"
            >
              {statuses[statusIndex].icon}
            </motion.div>
            
            <div>
              <h3 className="text-xl font-black uppercase tracking-widest text-white mb-2">
                {statuses[statusIndex].label}
              </h3>
              <p className="text-gray-500 text-xs font-medium italic">
                {statuses[statusIndex].sub}
              </p>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full h-1.5 bg-white/5 rounded-full mt-4 overflow-hidden">
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: `${((statusIndex + 1) / statuses.length) * 100}%` }}
                className="h-full bg-yellow-400 shadow-[0_0_10px_#fac815]"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button 
            onClick={() => router.push('/')}
            className="px-8 py-4 rounded-2xl border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all"
          >
            Back to Home
          </button>
          <button 
            className="px-8 py-4 rounded-2xl bg-yellow-400 text-black text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-yellow-400/20"
          >
            Track on Map
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;