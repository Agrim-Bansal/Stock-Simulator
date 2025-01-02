"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  // const [isLoggedIn, setIsLoggedIn] = useState(true);
  const router = useRouter();

  useEffect(() => {
    sessionStorage.setItem("user", "bhg");
    if (typeof window !== "undefined" && sessionStorage.getItem("user") == '') {
      router.push("/login")
    }
  }, []);


  return (
    <>
      Stock Simulator
    </>
  )};