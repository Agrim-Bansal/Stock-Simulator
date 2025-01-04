"use client";
import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
import SearchBox from "@/components/search-box";
import PopularStocksCarousel from "@/components/popular-stocks-carousel";
import { commonStocks } from "@/pages/stocks";

export default function Home() {
  // const [isLoggedIn, setIsLoggedIn] = useState(true);
  // const router = useRouter();
  const [stocks, setStocks] = useState<{name: string, symbol: string, price: string, change: string, logo: string}[]>([{name: 'Apple', symbol: 'APL', price: '0', change: '0', logo: 'https://api-ninjas-data.s3.us-west-2.amazonaws.com/logos/l476432a3e85a0aa21c23f5abd2975a89b6820d63.png'}]);


  useEffect(() => {

    setCommonStocks();

  }, []);

  async function setCommonStocks(){
    const stocks = await commonStocks();
    setStocks(stocks);
  }


  return (

    <>

    <SearchBox className="search-box" />
    
    <PopularStocksCarousel stocks={stocks} />
    

    </>


    
  )};