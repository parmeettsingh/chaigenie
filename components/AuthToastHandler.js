/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { notify } from "@/utils/toast";

export default function AuthToastHandler() {
  const { data: session, status } = useSession();
  const [hasWelcomed, setHasWelcomed] = useState(false);

  useEffect(() => {
    // Trigger welcome toast only once when authenticated
    if (status === "authenticated" && session?.user && !hasWelcomed) {
      const timer = setTimeout(() => {
        notify.success(`Welcome back, ${session.user.name.split(" ")[0]}! ✨`);
        setHasWelcomed(true);
      }, 1000); // 1-second delay for a premium feel

      return () => clearTimeout(timer);
    }
    
    // Reset if user logs out so they can be welcomed again next time
    if (status === "unauthenticated") {
      setHasWelcomed(false);
    }
  }, [status, session, hasWelcomed]);

  return null; 
}