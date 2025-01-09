"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StockTable from "@/components/watchlist-table";
import { getWatchlist } from "@/lib/firestore";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import '@/lib/auth';


export default function Home() {
  // const [isLoggedIn, setIsLoggedIn] = useState(true);
  const router = useRouter();
  const [stocks, setStocks] = useState<{ticker:string, logo:string, name:string, markingPrice:string}[]>([]);

  useEffect(() => {
    sessionStorage.setItem("user", "bhg");
    if (typeof window !== "undefined" && sessionStorage.getItem("user") == '') {
      router.push("/login")
    }

    

    onAuthStateChanged(getAuth(), (user) => {
      if(user){
        getWatchlist().then((data) => {
          const stocks = data.map((stock) => {
            return {
              ticker: stock.ticker,
              logo: stock.logo,
              name: stock.name,
              markingPrice: stock.markingPrice
            }
          });
          setStocks(stocks);
        });
      }
    });

  }, []);


  return (
    <>
      <div className="flex justify-center items-center h-20 text-white text-3xl">
        Stock Watchlist
      </div>

      <StockTable stocks={stocks} setStocks={({stocks} : {stocks: {ticker:string, logo:string, name:string, markingPrice:string}[]}) => setStocks(stocks)}/>
    </>
  )};