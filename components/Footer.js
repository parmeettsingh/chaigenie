  "use client";

  import React from "react";
  import { motion } from "framer-motion";

  const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
      <footer className="w-full bg-black backdrop-blur-xl border-t border-yellow-400 text-white px-6 py-6 mt-0 relative z-50">

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center text-center gap-4"
        >

          {/* SVG Social Icons */}
          <div className="flex items-center gap-6">

            {/* Instagram */}
            <a href="#" className="hover:opacity-80 transition" aria-label="Instagram">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="white" xmlns="http://www.instagram.com/parmeettsingh">
                <path d="M7 2C4.24 2 2 4.24 2 7V17C2 19.76 4.24 22 7 22H17C19.76 22 22 19.76 22 17V7C22 4.24 19.76 2 17 2H7ZM12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7ZM18 6.5C18 7.33 17.33 8 16.5 8C15.67 8 15 7.33 15 6.5C15 5.67 15.67 5 16.5 5C17.33 5 18 5.67 18 6.5Z"/>
              </svg>
            </a>

            {/* GitHub */}
            <a href="#" className="hover:opacity-80 transition" aria-label="GitHub">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="white" xmlns="http://www.github.com/parmeettsingh">
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.43 7.86 10.96.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.73.08-.72.08-.72 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.76.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18.92-.26 1.9-.39 2.88-.39s1.96.13 2.88.39c2.21-1.49 3.18-1.18 3.18-1.18.63 1.58.23 2.75.11 3.04.74.8 1.19 1.82 1.19 3.08 0 4.43-2.69 5.41-5.25 5.69.42.36.8 1.09.8 2.22 0 1.6-.02 2.89-.02 3.28 0 .31.21.68.8.56C20.21 21.43 23.5 17.1 23.5 12 23.5 5.65 18.35.5 12 .5Z"/>
              </svg>
            </a>

            {/* Twitter */}
            <a href="#" className="hover:opacity-80 transition" aria-label="Twitter">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 5.8c-.8.3-1.6.5-2.5.6.9-.5 1.6-1.4 1.9-2.4-.8.5-1.8.9-2.8 1.1C17.8 3.9 16.6 3.3 15.3 3.3c-2.5 0-4.4 2.3-3.9 4.7C7.7 7.9 4.9 6.3 3.1 3.9c-.9 1.6-.4 3.8 1.2 4.9-.7 0-1.4-.2-2-.6 0 1.8 1.2 3.5 3.1 3.9-.5.1-1 .2-1.5.2-.4 0-.7 0-1.1-.1.7 2.1 2.6 3.6 4.9 3.6-2.2 1.7-4.9 2.4-7.5 2.1C3.3 20.1 6.1 21 9 21c8.9 0 13.8-7.7 13.5-14.6.9-.6 1.6-1.4 2.2-2.3Z"/>
              </svg>
            </a>

          </div>

          {/* Footer Text */}
          <p className="text-lg text-yellow-100/80">
            © {currentYear} ChaiGenie. All rights reserved.
          </p>
        </motion.div>
      </footer>
    );
  };

  export default Footer;
