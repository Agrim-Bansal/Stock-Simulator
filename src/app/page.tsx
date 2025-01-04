"use client";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import '@/lib/auth';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), async (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (isLoggedIn === undefined) {
    return (
      <div className="loader-container flex justify-center items-center h-screen w-full">
        <div className="loader">Loading...</div>
      </div>
  )}
  else if(isLoggedIn == true){
    window.location.href = '/dashboard';
  }else{
    window.location.href = '/login';
  }

  
  
  };