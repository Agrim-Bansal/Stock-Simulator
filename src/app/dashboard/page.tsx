"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChartCandlestick } from "lucide-react";

export default function Home() {
  // const [isLoggedIn, setIsLoggedIn] = useState(true);
  const router = useRouter();

  useEffect(() => {
    sessionStorage.setItem("user", "bhg");
    if (typeof window !== "undefined" && sessionStorage.getItem("user") == '') {
      router.push("/login")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <>
    <ChartCandlestick size={32} color="white"/>
     <div className="text-xl">Stock Simulator</div>    
</>
  )};