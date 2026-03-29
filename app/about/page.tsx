// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";

// export default function AboutPage() {
//   return (
//     <section className="min-h-screen bg-slate-950 text-white pt-32 px-6">
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="max-w-4xl mx-auto text-center"
//       >
//         <h1 className="text-4xl md:text-5xl font-bold mb-6">
//           About <span className="text-yellow-400">ChaiGenie</span> ☕
//         </h1>

//         <p className="text-gray-300 text-lg leading-relaxed mb-10">
//           ChaiGenie is a modern creator-support platform where fans can show
//           love by gifting chai. Simple taps, warm wishes, and meaningful
//           connections brewed together.
//         </p>

//         <div className="grid md:grid-cols-3 gap-8 mt-14">
//           {[
//             {
//               title: "For Creators",
//               desc: "Receive support, build community, and turn appreciation into fuel.",
//               icon: "/tea.png",
//             },
//             {
//               title: "For Fans",
//               desc: "Support your favorite creators with a small but powerful gesture.",
//               icon: "/cup.png",
//             },
//             {
//               title: "Built with Love",
//               desc: "Fast, secure, and crafted for modern creators.",
//               icon: "/heart.png",
//             },
//           ].map((item, i) => (
//             <motion.div
//               key={i}
//               whileHover={{ scale: 1.05 }}
//               className="bg-black/40 border border-yellow-400/20 rounded-2xl p-6 backdrop-blur-md"
//             >
//               <Image
//                 src={item.icon}
//                 alt={item.title}
//                 width={48}
//                 height={48}
//                 className="mx-auto mb-4"
//               />
//               <h3 className="text-xl font-semibold mb-2 text-yellow-400">
//                 {item.title}
//               </h3>
//               <p className="text-sm text-gray-300">{item.desc}</p>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>
//     </section>
//   );
// }

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutPage() {
  return (
    <section className="relative min-h-screen bg-slate-950 text-white pt-32 pb-20 px-6 overflow-hidden">
      {/* BACKGROUND DECORATION */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-yellow-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto"
      >
        {/* HERO SECTION */}
        <div className="text-center mb-20">
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight"
          >
            The Magic Behind <span className="bg-linear-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">ChaiGenie</span> ☕
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            We are on a mission to bridge the gap between creators and their community—one cup of chai at a time. No complex subscriptions, just pure appreciation.   
          </motion.p>
        </div>

        {/* STATS SECTION (Adds Credibility) */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24 border-y border-white/10 py-10"
        >
          {[
            { label: "Creators Supported", value: "10K+" },
            { label: "Chai Gifted", value: "500K+" },
            { label: "Transaction Security", value: "100%" },
            { label: "Platform Uptime", value: "99.9%" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold text-yellow-400">{stat.value}</div>
              <div className="text-xs uppercase tracking-widest text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CORE PILLARS */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Direct Support",
              desc: "Skip the middleman. Your support goes directly to the creators you love, instantly.",
              icon: "🚀",
            },
            {
              title: "Zero Friction",
              desc: "No accounts required for fans. Support with a single click using Razorpay.",
              icon: "⚡",
            },
            {
              title: "Community First",
              desc: "Personalized messages allow for real connections between fans and artists.",
              icon: "🤝",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl hover:border-yellow-400/50 transition-colors"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-yellow-400">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* FAQ / UX SECTION */}
        <motion.div variants={itemVariants} className="mt-32">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { q: "Is it really secure?", a: "Yes! We use industry-standard Razorpay encryption. We never store your card details." },
              { q: "How do I withdraw funds?", a: "Creators can link their bank accounts and withdraw earnings instantly to their UPI or Bank." },
            ].map((faq, i) => (
              <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <h4 className="font-bold text-yellow-400 mb-2">{faq.q}</h4>
                <p className="text-sm text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FINAL CALL TO ACTION */}
        <motion.div 
          variants={itemVariants}
          className="mt-32 text-center bg-gradient-to-b from-yellow-400/20 to-transparent p-12 rounded-[3rem] border border-yellow-400/20"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start your journey?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login" className="px-8 py-4 bg-yellow-400 text-black font-bold rounded-full hover:bg-yellow-300 transition-all">
              Join as a Creator
            </Link>
            <Link href="/" className="px-8 py-4 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-all">
              Explore Profiles
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
} 