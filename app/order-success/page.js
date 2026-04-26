"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// 🛠️ DYNAMICALLY IMPORT LEAFLET COMPONENTS
const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(m => m.Popup), { ssr: false });

// Import CSS only (Safe for SSR)
import 'leaflet/dist/leaflet.css';

const OrderSuccessContent = () => {
  const router = useRouter();
  const [statusIndex, setStatusIndex] = useState(0);
  const [orderId, setOrderId] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [genieIcon, setGenieIcon] = useState(null);

  const pickupLocation = [28.6432, 77.2917];

  const statuses = [
    { icon: "🕯️", label: "Rubbing the Lamp...", sub: "We've received your wish!" },
    { icon: "🍃", label: "Gathering Leaves...", sub: "Selecting the finest tea blend." },
    { icon: "🔥", label: "Brewing Magic...", sub: "Your chai is over the flames." },
    { icon: "✨", label: "Genie is Flying!", sub: "Out for delivery to your location." }
  ];

  useEffect(() => {
    setIsClient(true);
    setOrderId(Math.floor(Math.random() * 10000));

    // Fix: Move Leaflet icon logic inside useEffect
    const initLeaflet = async () => {
        const L = (await import('leaflet')).default;
        const icon = L.icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/754/754848.png',
            iconSize: [45, 45],
            iconAnchor: [22, 45],
        });
        setGenieIcon(icon);
    };
    initLeaflet();

    const runConfetti = async () => {
      const confetti = (await import('canvas-confetti')).default;
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    };
    runConfetti();

    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev < statuses.length - 1 ? prev + 1 : prev));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 pt-24 relative overflow-hidden">
      <div className="max-w-2xl w-full text-center relative z-10">
        <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity }} className="text-8xl mb-8">
          🧞‍♂️
        </motion.div>

        <h1 className="text-4xl md:text-6xl font-black italic text-yellow-400 mb-2 uppercase">WISH GRANTED!</h1>
        <p className="text-gray-500 font-mono text-sm mb-10 tracking-widest">ORDER ID: #CHAI-{orderId}</p>

        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-8 backdrop-blur-md">
          <div className="text-4xl mb-2">{statuses[statusIndex].icon}</div>
          <h3 className="text-xl font-bold">{statuses[statusIndex].label}</h3>
          <p className="text-sm text-gray-400">{statuses[statusIndex].sub}</p>
          <div className="w-full bg-white/10 h-1.5 rounded-full mt-6 overflow-hidden">
            <motion.div animate={{ width: `${((statusIndex + 1) / statuses.length) * 100}%` }} className="bg-yellow-400 h-full" />
          </div>
        </div>

        <div className="mt-6 h-[400px] w-full rounded-2xl overflow-hidden border border-yellow-400/30 shadow-2xl relative z-0">
          <MapContainer center={pickupLocation} zoom={15} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; OpenStreetMap'
            />
            {genieIcon && (
              <Marker position={pickupLocation} icon={genieIcon}>
                <Popup>Genie is brewing here! ☕</Popup>
              </Marker>
            )}
          </MapContainer>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 z-[1000] px-4 py-2 rounded-full border border-white/10 text-[10px] text-yellow-400 font-bold uppercase tracking-widest">
            Live from Mausam Vihar
          </div>
        </div>

        <button onClick={() => router.push('/')} className="mt-8 px-8 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all font-bold uppercase text-xs tracking-widest">
          Back to Home
        </button>
      </div>
    </div>
  );
};

const OrderSuccess = () => (
  <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-yellow-400">Summoning...</div>}>
    <OrderSuccessContent />
  </Suspense>
);

export default OrderSuccess;