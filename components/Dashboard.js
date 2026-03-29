"use client";
import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"; // Added for consistency with other pages

const Dashboard = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [form, setform] = useState({});

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-white overflow-hidden">
      {/* Radial Glow Background - Consistent with Home/About */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_400px_at_50%_150px,#3e3e3e,transparent)] opacity-50"></div>
      
      <div className="relative z-10 container mx-auto pt-28 pb-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">
            Creator <span className="text-yellow-400">Dashboard</span>
          </h1>
          <p className="text-gray-400 text-center mb-10">Manage your ChaiGenie profile and payment settings</p>

          <form 
            className="bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl max-w-3xl mx-auto space-y-6"
            onSubmit={(e) => e.preventDefault()} // Preventing default refresh
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* NAME */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-semibold text-yellow-400 ml-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
                  placeholder="Your display name"
                />
              </div>

              {/* EMAIL */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-semibold text-yellow-400 ml-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
                  placeholder="email@example.com"
                />
              </div>

              {/* USERNAME */}
              <div className="flex flex-col gap-2">
                <label htmlFor="username" className="text-sm font-semibold text-yellow-400 ml-1">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={form.username || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
                  placeholder="unique_handle"
                />
              </div>

              {/* PROFILE PICTURE */}
              <div className="flex flex-col gap-2">
                <label htmlFor="profilePic" className="text-sm font-semibold text-yellow-400 ml-1">Profile Picture URL</label>
                <input
                  type="text"
                  id="profilePic"
                  name="profilePic"
                  value={form.profilePic || ""}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
                />
              </div>
            </div>

            {/* COVER PICTURE */}
            <div className="flex flex-col gap-2">
              <label htmlFor="coverPic" className="text-sm font-semibold text-yellow-400 ml-1">Cover Picture URL</label>
              <input
                type="text"
                id="coverPic"
                name="coverPic"
                value={form.coverPic || ""}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
              />
            </div>

            <div className="pt-4 border-t border-white/10 my-6">
              <h3 className="text-lg font-bold text-white mb-4 italic text-center">Payment Credentials</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* RAZORPAY KEY ID */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="razorpayKeyId" className="text-sm font-semibold text-yellow-400 ml-1">Razorpay Key ID</label>
                  <input
                    type="text"
                    id="razorpayKeyId"
                    name="razorpayKeyId"
                    value={form.razorpayKeyId || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
                  />
                </div>

                {/* RAZORPAY KEY SECRET */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="razorpayKeySecret" className="text-sm font-semibold text-yellow-400 ml-1">Razorpay Key Secret</label>
                  <input
                    type="password"
                    id="razorpayKeySecret"
                    name="razorpayKeySecret"
                    value={form.razorpayKeySecret || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* SUBMIT */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full mt-6 bg-yellow-500 hover:bg-yellow-400 text-black py-4 rounded-2xl font-bold transition-all shadow-[0_0_20px_rgba(234,179,8,0.2)]"
            >
              Save Profile Details
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;