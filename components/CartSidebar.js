"use client";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function CartSidebar({ isOpen, onClose }) {
  const { cartItems, removeFromCart, updateQuantity, subtotal } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          
          {/* Sidebar */}
          <motion.div 
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            className="fixed right-0 top-0 h-full w-full md:w-[400px] bg-[#0b0b0e] border-l border-white/10 z-[101] p-8 flex flex-col shadow-2xl"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black italic text-yellow-400">YOUR WISHES</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white">✕ Close</button>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar space-y-6">
              {cartItems.length === 0 ? (
                <p className="text-center text-gray-500 mt-20 italic">The Genie&apos;s lamp is empty...</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center bg-white/5 p-4 rounded-2xl">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-white/10">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm">{item.name}</h4>
                      <p className="text-yellow-400 font-bold text-xs">₹{item.price}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <button onClick={() => updateQuantity(item.id, -1)} className="bg-white/10 px-2 rounded">-</button>
                        <span className="text-xs">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="bg-white/10 px-2 rounded">+</button>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500/50 hover:text-red-500 text-xs">Remove</button>
                  </div>
                ))
              )}
            </div>

            {/* BILLING SECTION */}
            <div className="border-t border-white/10 pt-6 mt-6 space-y-4">
              <div className="flex justify-between text-gray-400 text-sm">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-400 text-sm">
                <span>GST (5%)</span>
                <span>₹{(subtotal * 0.05).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white font-black text-xl">
                <span>TOTAL BILL</span>
                <span className="text-yellow-400">₹{(subtotal * 1.05).toFixed(0)}</span>
              </div>
              <button className="w-full bg-yellow-400 text-black py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-yellow-300 transition-all">
                Grant My Wishes (Checkout)
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}