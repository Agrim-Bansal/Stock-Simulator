"use client";
import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
import SearchBox from "@/components/search-box";
import PopularStocksCarousel from "@/components/popular-stocks-carousel";
import { commonStocks } from "@/pages/api/stocks";
import StockTable from "@/components/stock-table";
import StockInfoBox from "@/components/stock-info-box";

export default function Home() {
  // const [isLoggedIn, setIsLoggedIn] = useState(true);
  // const router = useRouter();
  // const [stocks, setStocks] = useState<{name: string, symbol: string, price: string, change: string, logo: string}[]>([{name: 'Apple', symbol: 'APL', price: '0', change: '0', logo: 'https://api-ninjas-data.s3.us-west-2.amazonaws.com/logos/l476432a3e85a0aa21c23f5abd2975a89b6820d63.png'}]);
  const [stocks, setStocks] = useState<{name: string, symbol: string, price: string, change: string, logo: string}[]>([]);
  const [activeTicker, setActiveTicker] = useState<string>('');

  useEffect(() => {

    setCommonStocks();

  }, []);

  async function setCommonStocks(){
    const stocks = await commonStocks();
    setStocks(stocks);
  }


  return (

    <>

    <SearchBox className="search-box" setActiveTicker={(ticker:string) => setActiveTicker(ticker)} />
    
    <PopularStocksCarousel stocks={stocks} setActiveTicker={(ticker:string) => setActiveTicker(ticker)}/> 

    <StockTable setActiveTicker={(ticker:string) => setActiveTicker(ticker)}/>

    <StockInfoBox ticker={activeTicker} key={activeTicker} />

    </>

    
  )};