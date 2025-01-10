"use client";
import { SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StockTable from "@/components/watchlist-table";
import { getWatchlist } from "@/lib/firestore";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import '@/lib/auth';
import { stockInfo } from "@/pages/api/stocks";

export default function Home() {
  // const [isLoggedIn, setIsLoggedIn] = useState(true);
  const router = useRouter();
  const [stocks, setStocks] = useState<{ticker:string, logo:string, name:string, markedPrice:string}[]>([]);
  const [prices, setPrices] = useState<{ticker:string, price:string}[]>([]);

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
              markedPrice: stock.markedPrice,
            }
          });
          setStocks(stocks);
          setPrices(stocks?.map((stock) => {return {ticker: stock.ticker, price: '0'};}));
        });
      }
    });
    
  }, []);

  useEffect(() => {
    updatePrices(stocks);
    // setPrices(stocks?.map((stock) => {return {ticker: stock.ticker, price: '0'};}));
    console.log(stocks);
  }, [stocks]);


  async function updatePrices(stocks: {ticker:string, logo:string, name:string, markedPrice:string}[]){
    const prices = [];

    for (let i = 0; i < stocks?.length; i++) {
      const stock = stocks[i];
      const response = await stockInfo(stock.ticker);
      const data = await response[0];
      prices.push({ticker: stock.ticker, price: data.price});
    }

    setPrices(prices);

  }

  return (
    <>
      <div className="flex justify-center items-center h-20 text-white text-3xl">
        Stock Watchlist
      </div>

      <StockTable stocks={stocks} key={stocks?.length} prices={prices} setStocks={(stocks: SetStateAction<{ ticker: string; logo: string; name: string; markedPrice: string; }[]>) => setStocks(stocks)} setPrices={(prices: SetStateAction<{ ticker: string; price: string; }[]>)=> setPrices(prices)}/>

    </>
  )};