"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { notify } from "@/utils/toast";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { cartItems, removeFromCart, updateQuantity, subtotal } = useCart();

  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const menuItems = ["Home", "About"];

  const handleSignOut = () => {
    notify.info("Logging you out... Come back for more chai! ☕");
    setTimeout(() => {
      signOut({ callbackUrl: "/" });
    }, 1500);
  };

  const handleMenuClick = (item) => {
    setOpen(false);
    if (item === "Home") {
      router.push("/");
      router.refresh();
    }
    if (item === "About") {
      router.push("/about");
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#0b0b0e]/70 backdrop-blur-xl border-b border-yellow-400 text-white px-5 py-4 flex items-center justify-between">
        {/* LOGO */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            router.push("/");
            router.refresh();
          }}
          className="text-2xl font-bold tracking-wide flex items-center gap-1 cursor-pointer"
        >
          <span className="text-yellow-400">Chai</span>Genie
          <Image src="/tea.png" alt="Tea icon" width={24} height={24} />
        </motion.div>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex items-center gap-8 text-sm relative">
          {menuItems.map((item, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer hover:text-yellow-400 transition"
              onClick={() => handleMenuClick(item)}
            >
              {item}
            </motion.li>
          ))}

          {/* CART ICON */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="relative cursor-pointer mr-2"
            onClick={() => setCartOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-lg">
                {cartItems.length}
              </span>
            )}
          </motion.div>

          {/* AUTH SECTION (DESKTOP) */}
          {!session ? (
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Login
              </motion.button>
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="inline-flex items-center justify-center text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-400 shadow-xs font-medium rounded-lg text-sm px-4 py-2.5"
              >
                {session.user?.name?.split(" ")[0]}
                <svg className="w-4 h-4 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute right-0 mt-3 z-10 bg-[#0b0b0e] border border-white/10 rounded-xl shadow-lg w-44"
                  >
                    <ul className="p-2 text-sm font-medium">
                      <li><Link href="/dashboard" className="inline-flex items-center w-full p-2 hover:bg-white/10 rounded" onClick={() => setDropdownOpen(false)}>Dashboard</Link></li>
                      <li><Link href={`/${session.user.name}`} className="inline-flex items-center w-full p-2 hover:bg-white/10 rounded" onClick={() => setDropdownOpen(false)}>Your Page</Link></li>
                      <li><button onClick={() => { setDropdownOpen(false); handleSignOut(); }} className="inline-flex items-center w-full p-2 hover:bg-red-500/20 text-red-400 rounded">Sign out</button></li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </ul>

        {/* MOBILE MENU BUTTON & CART */}
        <div className="flex items-center gap-4 md:hidden">
          <div className="relative" onClick={() => setCartOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartItems.length > 0 && <span className="absolute -top-2 -right-2 bg-white text-black text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full">{cartItems.length}</span>}
          </div>
          <button onClick={() => setOpen(!open)} className="relative z-[60]">
            <motion.div animate={{ rotate: open ? 90 : 0 }}>
              <div className="space-y-1">
                <motion.div animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="w-6 h-0.5 bg-white"></motion.div>
                <motion.div animate={open ? { opacity: 0 } : { opacity: 1 }} className="w-6 h-0.5 bg-white"></motion.div>
                <motion.div animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} className="w-6 h-0.5 bg-white"></motion.div>
              </div>
            </motion.div>
          </button>
        </div>

        {/* MOBILE SIDEBAR */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-screen w-2/3 bg-[#0b0b0e] border-l border-yellow-400 z-[55] flex flex-col p-10 pt-24 gap-6 md:hidden"
            >
              {menuItems.map((item, index) => (
                <button key={index} onClick={() => handleMenuClick(item)} className="text-xl font-bold text-left hover:text-yellow-400">{item}</button>
              ))}

              {/* Logged in options for Mobile */}
              {session && (
                <>
                  <div className="h-[1px] bg-white/10 w-full my-2" /> 
                  <Link href="/dashboard" onClick={() => setOpen(false)} className="text-xl font-bold text-left hover:text-yellow-400">Dashboard</Link>
                  <Link href={`/${session.user.name}`} onClick={() => setOpen(false)} className="text-xl font-bold text-left hover:text-yellow-400">Your Page</Link>
                </>
              )}

              {!session ? (
                <Link href="/login" onClick={() => setOpen(false)}>
                  <button className="text-white bg-purple-600 font-medium rounded-lg text-sm px-5 py-2.5 w-full mt-4">Login</button>
                </Link>
              ) : (
                <button 
                  onClick={() => { setOpen(false); handleSignOut(); }} 
                  className="text-red-400 font-bold text-left mt-auto pb-10"
                >
                  Sign Out
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ================= CART SIDEBAR (DRAWER) ================= */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCartOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 20 }} className="fixed right-0 top-0 h-full w-full md:w-[400px] bg-[#0b0b0e] border-l border-white/10 z-[101] p-8 flex flex-col shadow-2xl">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black italic text-yellow-400">YOUR CART</h2>
                <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white">✕</button>
              </div>

              <div className="flex-1 overflow-y-auto no-scrollbar space-y-6">
                {cartItems.length === 0 ? (
                  <div className="text-center mt-20">
                    <p className="text-gray-500 italic">No magic here yet... Add some items!</p>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-white/10 shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-sm">{item.name}</h4>
                        <p className="text-yellow-400 font-black text-xs">₹{item.price}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <button onClick={() => updateQuantity(item.id, -1)} className="bg-white/10 w-6 h-6 flex items-center justify-center rounded text-xs">-</button>
                          <span className="text-xs font-bold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="bg-white/10 w-6 h-6 flex items-center justify-center rounded text-xs">+</button>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500/50 hover:text-red-500 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* BILLING SECTION */}
              {cartItems.length > 0 && (
                <div className="border-t border-white/10 pt-6 mt-6 space-y-4">
                  <div className="flex justify-between text-gray-400 text-sm">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-400 text-sm">
                    <span>GST (5%)</span>
                    <span>₹{(subtotal * 0.05).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-white font-black text-2xl pt-2">
                    <span>TOTAL</span>
                    <span className="text-yellow-400">₹{(subtotal * 1.05).toFixed(0)}</span>
                  </div>
                  <button onClick={() => {
                    setCartOpen(false);
                    router.push('/checkout');
                  }} 
                  className="w-full bg-yellow-400 text-black py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-yellow-300 transition-all shadow-xl">
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;