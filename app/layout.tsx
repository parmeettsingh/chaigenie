import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";
import BackToTop from "@/components/BackToTop";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import AuthToastHandler from "@/components/AuthToastHandler.js";
import { CartProvider } from "@/context/CartContext";
import GenieChat from "@/components/GenieChat";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChaiGenie – Tap, Wish, Sip",
  description: "A smarter way to satisfy your chai cravings.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]`}
      >
        <SessionWrapper>
          <CartProvider>
            <AuthToastHandler /> 

            <Navbar />

            <main className="min-h-screen flex-1 relative w-full bg-slate-950 text-white">
              <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)] "></div>
              <div className="relative z-10">{children}</div>
            </main>
            
            {/* Genie Chat placed here to access Context if needed */}
            <GenieChat /> 
            
            <BackToTop />
            <Footer />

            <ToastContainer 
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              stacked 
            />
          </CartProvider>
        </SessionWrapper>
      </body> 
    </html>
  );
}