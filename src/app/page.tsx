"use client";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import '@/lib/auth';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(undefined);

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
    return <div>Loading...</div>;}
  else if(isLoggedIn == true){
    window.location.href = '/dashboard';
  }else{
    window.location.href = '/login';
  }

  
  };