  // "use client";

  // import { motion, AnimatePresence } from "framer-motion";
  // import Image from "next/image";
  // import Link from "next/link";
  // import { useState } from "react";
  // import MenuItem from "@/components/MenuItem";

  // export default function Home() {
  //   const [showMenu, setShowMenu] = useState(false);
  //   const products = [
  //     { id: 1, name: "Masala Chai", price: 40, description: "Authentic Indian spiced tea.", image: "/masala.jpg" },
  //     { id: 2, name: "Ginger Tea", price: 30, description: "Freshly grated ginger brew.", image: "/ginger.jpg" },
  //   ];
    
  //   // Inside your Page component:
  //   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-10">
  //     {products.map(product => (
  //       <MenuItem key={product.id} item={product} />
  //     ))}
  //   </div>

  //   return (
  //     <main className="relative min-h-[86.5vh] w-full bg-slate-950 text-white overflow-x-hidden">
  //       {/* Radial Glow Background */}
  //       <div className="absolute inset-0 bg-[radial-gradient(circle_400px_at_50%_150px,#3e3e3e,transparent)] opacity-50"></div>

  //       {/* Hero Section */}
  //       <div className="relative z-10 flex flex-col items-center text-center pt-28 md:pt-36 px-4 md:px-6 pb-20">
  //         <motion.div
  //           initial={{ opacity: 0, y: -20 }}
  //           animate={{ opacity: 1, y: 0 }}
  //           transition={{ duration: 0.8 }}
  //           className="flex items-center justify-center gap-3 mb-4 flex-wrap"
  //         >
  //           <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
  //             Welcome to <span className="text-yellow-400">ChaiGenie</span>
  //           </h1>
  //           <Image
  //             src="/tea.png"
  //             alt="Tea icon"
  //             width={60}
  //             height={60}
  //             className="w-12 h-12 sm:w-16 sm:h-16"
  //           />
  //         </motion.div>

  //         <motion.p
  //           initial={{ opacity: 0 }}
  //           animate={{ opacity: 1 }}
  //           transition={{ delay: 0.4, duration: 0.8 }}
  //           className="text-base sm:text-lg md:text-xl text-gray-300 max-w-xl md:max-w-2xl mb-10 px-2"
  //         >
  //           Experience the magic of chai delivered fresh, hot, and fast — right
  //           when you wish for it. Because every craving deserves a genie.
  //         </motion.p>

  //         {/* Buttons */}
  //         <motion.div
  //           initial={{ opacity: 0 }}
  //           animate={{ opacity: 1 }}
  //           transition={{ delay: 0.6, duration: 0.8 }}
  //           className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center mt-2"
  //         >
  //           <Link href="/menu">
  //             <motion.button
  //               whileHover={{ scale: 1.05 }}
  //               whileTap={{ scale: 0.95 }}
  //               className="px-8 py-3 rounded-xl bg-yellow-500 text-black font-bold hover:bg-yellow-400 transition-all w-full sm:w-auto text-sm sm:text-base shadow-[0_0_20px_rgba(234,179,8,0.2)]"
  //             >
  //               Order Now
  //             </motion.button>
  //           </Link>

  //           <motion.button
  //             onClick={() => setShowMenu(!showMenu)}
  //             whileHover={{ scale: 1.05 }}
  //             whileTap={{ scale: 0.95 }}
  //             className="px-8 py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 transition-all w-full sm:w-auto text-sm sm:text-base backdrop-blur-md"
  //           >
  //             {showMenu ? "Close Menu" : "Explore Menu"}
  //           </motion.button>
  //         </motion.div>
  //       </div>

  //       {/* EXPLORE MENU SECTION (Appears on click) */}
  //       <AnimatePresence>
  //         {showMenu && (
  //           <motion.div
  //             initial={{ opacity: 0, height: 0 }}
  //             animate={{ opacity: 1, height: "auto" }}
  //             exit={{ opacity: 0, height: 0 }}
  //             className="relative z-20 max-w-6xl mx-auto px-6 mb-20"
  //           >
  //             <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white/5 p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-xl">
  //               {[
  //                 { n: "Masala Chai", p: "₹40", i: "/tea.png" },
  //                 { n: "Cold Coffee", p: "₹120", i: "/tea.png" },
  //                 { n: "Croissant", p: "₹150", i: "/tea.png" },
  //                 { n: "Choco Cake", p: "₹90", i: "/tea.png" },
  //               ].map((item, idx) => (
  //                 <motion.div 
  //                   key={idx} 
  //                   whileHover={{ y: -5 }}
  //                   className="bg-black/40 p-4 rounded-2xl border border-white/5 text-center"
  //                 >
  //                   <div className="text-3xl mb-2">🍪</div>
  //                   <h4 className="font-bold text-sm">{item.n}</h4>
  //                   <p className="text-yellow-400 font-bold text-xs">{item.p}</p>
  //                   <button className="mt-3 text-[10px] bg-white text-black px-3 py-1 rounded-full font-bold">Add</button>
  //                 </motion.div>
  //               ))}
  //             </div>
  //           </motion.div>
  //         )}
  //       </AnimatePresence>

  //       {/* Why Choose Section (Updated with About-style Cards) */}
  //       <div className="relative z-10 mt-20 md:mt-24 px-4 md:px-6 pb-20">
  //         <motion.h2
  //           initial={{ opacity: 0 }}
  //           whileInView={{ opacity: 1 }}
  //           className="text-3xl sm:text-4xl font-bold text-center mb-16"
  //         >
  //           Why Choose <span className="text-yellow-400">ChaiGenie?</span>
  //         </motion.h2>

  //         <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
  //           {[
  //             { title: "Fresh & Hot", desc: "Delivered at perfect temperature — every single time.", icon: "🔥" },
  //             { title: "Fast Delivery", desc: "Your chai cravings fulfilled in minutes, not hours.", icon: "⚡" },
  //             { title: "Made With Love", desc: "Authentic taste crafted by local experts.", icon: "❤️" },
  //           ].map((card, index) => (
  //             <motion.div
  //               key={index}
  //               initial={{ opacity: 0, y: 30 }}
  //               whileInView={{ opacity: 1, y: 0 }}
  //               whileHover={{ y: -10 }} // Animation from About Page
  //               transition={{ duration: 0.5, delay: index * 0.1 }}
  //               viewport={{ once: true }}
  //               className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md text-center hover:border-yellow-400/40 transition-colors"
  //             >
  //               <div className="text-4xl mb-4">{card.icon}</div>
  //               <h3 className="text-xl font-bold mb-2 text-yellow-400">{card.title}</h3>
  //               <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
  //             </motion.div>
  //           ))}
  //         </div>

  //         <div className="w-full flex justify-center my-14 opacity-20">
  //           <div className="h-px bg-white rounded-full w-3/4"></div>
  //         </div>

  //         {/* Fans Section */}
  //         <div className="text-white container mx-auto px-4 mt-24 mb-10">
  //           <h2 className="text-3xl font-bold text-center my-20">
  //             Your Fans Can Buy You <span className="text-yellow-400">Chai</span>
  //           </h2>

  //           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
  //             {[
  //               { t: "Supporter Fan", d: "Appreciation through a warm cup.", i: "/man.png" },
  //               { t: "Money Support", d: "Simple financial backing via tea.", i: "/rupee.png" },
  //               { t: "Follow Journey", d: "Follow and support every order.", i: "/follow.png" },
  //             ].map((item, idx) => (
  //               <motion.div
  //                 key={idx}
  //                 initial={{ opacity: 0, y: 40 }}
  //                 whileInView={{ opacity: 1, y: 0 }}
  //                 whileHover={{ scale: 1.05 }}
  //                 className="flex flex-col items-center text-center space-y-4 p-6 bg-white/5 rounded-4xl border border-white/5"
  //               >
  //                 <div className="p-4 bg-slate-800 rounded-full shadow-xl">
  //                   <Image width={60} height={60} src={item.i} alt={item.t} />
  //                 </div>
  //                 <h3 className="text-xl font-bold text-yellow-400">{item.t}</h3>
  //                 <p className="text-gray-400 text-sm leading-relaxed">{item.d}</p>
  //               </motion.div>
  //             ))}
  //           </div>
  //         </div>

  //         {/* Learn More (Leads to About Page) */}
  //         <div className="mt-40 text-center max-w-3xl mx-auto px-4">
  //           <h2 className="text-4xl font-bold mb-6">Learn More <span className="text-yellow-400">About Us</span></h2>
  //           <p className="text-gray-400 text-lg mb-10">Connecting emotions, creators, and fans in one magical experience.</p>
  //           <Link href="/about">
  //             <motion.button
  //               whileHover={{ scale: 1.05 }}
  //               whileTap={{ scale: 0.95 }}
  //               className="px-10 py-4 bg-yellow-500 text-black rounded-full font-bold hover:bg-yellow-400 transition-all"
  //             >
  //               Go to About Page
  //             </motion.button>
  //           </Link>
  //         </div>

  //         {/* Video Section */}
  //         <motion.div 
  //           initial={{ opacity: 0 }} 
  //           whileInView={{ opacity: 1 }} 
  //           className="mt-32 mb-16 flex justify-center"
  //         >
  //           <div className="w-full max-w-4xl aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10">
  //             <iframe
  //               className="w-full h-full"
  //               src="https://www.youtube.com/embed/5IwmuaKE7tA"
  //               title="Chai Recipe"
  //               allowFullScreen
  //             />
  //           </div>
  //         </motion.div>
  //       </div>
  //     </main> 
  //   );
  // }
    
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  // Products data moved to menu.js, kept this clean for the Landing Page experience
  
  return (
    <main className="relative min-h-[86.5vh] w-full bg-slate-950 text-white overflow-x-hidden">
      {/* Radial Glow Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_400px_at_50%_150px,#3e3e3e,transparent)] opacity-50"></div>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center text-center pt-28 md:pt-36 px-4 md:px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-3 mb-4 flex-wrap"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Welcome to <span className="text-yellow-400">ChaiGenie</span>
          </h1>
          <Image
            src="/tea.png"
            alt="Tea icon"
            width={60}
            height={60}
            className="w-12 h-12 sm:w-16 sm:h-16"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-base sm:text-lg md:text-xl text-gray-300 max-w-xl md:max-w-2xl mb-10 px-2"
        >
          Experience the magic of chai delivered fresh, hot, and fast — right
          when you wish for it. Because every craving deserves a genie.
        </motion.p>

        {/* Buttons - Both now redirect to Menu */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center mt-2"
        >
          <Link href="/menu">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-xl bg-yellow-500 text-black font-bold hover:bg-yellow-400 transition-all w-full sm:w-auto text-sm sm:text-base shadow-[0_0_20px_rgba(234,179,8,0.3)]"
            >
              Order Now
            </motion.button>
          </Link>

          <Link href="/menu">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 transition-all w-full sm:w-auto text-sm sm:text-base backdrop-blur-md"
            >
              Explore Menu
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Why Choose Section */}
      <div className="relative z-10 mt-20 md:mt-24 px-4 md:px-6 pb-20">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl sm:text-4xl font-bold text-center mb-16"
        >
          Why Choose <span className="text-yellow-400">ChaiGenie?</span>
        </motion.h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
          {[
            { title: "Fresh & Hot", desc: "Delivered at perfect temperature — every single time.", icon: "🔥" },
            { title: "Fast Delivery", desc: "Your chai cravings fulfilled in minutes, not hours.", icon: "⚡" },
            { title: "Made With Love", desc: "Authentic taste crafted by local experts.", icon: "❤️" },
          ].map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md text-center hover:border-yellow-400/40 transition-colors"
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-yellow-400">{card.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="w-full flex justify-center my-14 opacity-20">
          <div className="h-px bg-white rounded-full w-3/4"></div>
        </div>

        {/* Fans Section */}
        <div className="text-white container mx-auto px-4 mt-24 mb-10">
          <h2 className="text-3xl font-bold text-center my-20">
            Your Fans Can Buy You <span className="text-yellow-400">Chai</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            {[
              { t: "Supporter Fan", d: "Appreciation through a warm cup.", i: "/man.png" },
              { t: "Money Support", d: "Simple financial backing via tea.", i: "/rupee.png" },
              { t: "Follow Journey", d: "Follow and support every order.", i: "/follow.png" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center text-center space-y-4 p-6 bg-white/5 rounded-[2.5rem] border border-white/5"
              >
                <div className="p-4 bg-slate-800 rounded-full shadow-xl">
                  <Image width={60} height={60} src={item.i} alt={item.t} />
                </div>
                <h3 className="text-xl font-bold text-yellow-400">{item.t}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.d}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Learn More Section */}
        <div className="mt-40 text-center max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Learn More <span className="text-yellow-400">About Us</span></h2>
          <p className="text-gray-400 text-lg mb-10">Connecting emotions, creators, and fans in one magical experience.</p>
          <Link href="/about">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-yellow-500 text-black rounded-full font-bold hover:bg-yellow-400 transition-all shadow-lg"
            >
              Go to About Page
            </motion.button>
          </Link>
        </div>

        {/* Video Section */}
        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          className="mt-32 mb-16 flex justify-center"
        >
          <div className="w-full max-w-4xl aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/5IwmuaKE7tA"
              title="Chai Recipe"
              allowFullScreen
            />
          </div>
        </motion.div>
      </div>
    </main>
  );
}