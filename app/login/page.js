"use client";
import React, { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();

  // FIX: Move navigation to useEffect to prevent the render-phase error
  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-white overflow-hidden flex items-center justify-center py-12 px-4">
      {/* Background Decorative Elements to match other pages */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)] opacity-40"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">
            Welcome <span className="text-yellow-400">Back.</span>
          </h1>
          <p className="text-slate-400 mt-3 font-medium">
            Login/Signup to ChaiGenie app
          </p>
        </div>

        <div className="flex flex-col gap-4 items-center">
          {/* Google Button */}
          <button 
            onClick={() => signIn("google")}
            className="flex items-center w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold hover:bg-white/10 hover:border-yellow-400/50 transition-all group"
          >
            <svg className="h-5 w-5 mr-3" viewBox="0 0 48 48">
              <path fill="#FBBC05" d="M9.8,24c0-1.5,0.3-3,0.7-4.4l-7.9-6C1.1,16.7,0.2,20.3,0.2,24s0.9,7.3,2.4,10.4l7.9-6C10.1,27,9.8,25.5,9.8,24z"/>
              <path fill="#EB4335" d="M23.7,10.1c3.3,0,6.3,1.2,8.7,3.1l6.8-6.8C35,2.8,29.7,0.5,23.7,0.5C14.4,0.5,6.4,5.8,2.6,13.6l7.9,6C12.4,14.1,17.5,10.1,23.7,10.1z"/>
              <path fill="#34A853" d="M23.7,37.9c-6.2,0-11.4-4-13.2-9.5l-7.9,6c3.8,7.8,11.8,13.1,21.1,13.1c5.7,0,11.2-2,15.3-5.8l-7.5-5.8C29.4,37.1,26.7,37.9,23.7,37.9z"/>
              <path fill="#4285F4" d="M46.1,24c0-1.4-0.2-2.9-0.5-4.3H23.7v9.1h12.6c-0.6,3.1-2.4,5.5-4.8,7l7.5,5.8C43.3,37.6,46.1,31.6,46.1,24z"/>
            </svg>
            <span className="group-hover:text-yellow-400 transition-colors">Continue with Google</span>
          </button>

          {/* Github Button */}
          <button 
            onClick={() => signIn("github")} 
            className="flex items-center w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold hover:bg-white/10 hover:border-yellow-400/50 transition-all group"
          > 
            <svg className="h-5 w-5 mr-3 fill-white" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span className="group-hover:text-yellow-400 transition-colors">Continue with Github</span>
          </button>

          {/* LinkedIn (Simplified Icon for Cleanliness) */}
          <button className="flex items-center w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold hover:bg-white/10 hover:border-yellow-400/50 transition-all group">
            <div className="bg-[#0077b5] h-5 w-5 mr-3 flex items-center justify-center rounded-sm text-[10px] font-bold">in</div>
            <span className="group-hover:text-yellow-400 transition-colors">Continue with LinkedIn</span>
          </button>

          {/* Twitter (X) */}
          <button className="flex items-center w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold hover:bg-white/10 hover:border-yellow-400/50 transition-all group">
            <span className="h-5 w-5 mr-3 flex items-center justify-center font-black text-lg italic">X</span>
            <span className="group-hover:text-yellow-400 transition-colors">Continue with Twitter</span>
          </button>

          {/* Apple */}
          <button className="flex items-center w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold hover:bg-white/10 hover:border-yellow-400/50 transition-all group">
            <svg className="h-5 w-5 mr-3 fill-white" viewBox="0 0 384 512">
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
            </svg>
            <span className="group-hover:text-yellow-400 transition-colors">Continue with Apple</span>
          </button>

        </div>
        
        <p className="text-center text-slate-500 text-xs mt-8 px-4">
          By continuing, you agree to ChaiGenie s Terms of Service and Privacy Policy.
        </p>
      </motion.div>
    </div>
  );
};

export default Login;