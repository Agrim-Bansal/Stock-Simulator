"use client";
import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import SearchBox from "@/components/search-box";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import TradingViewWidget from "@/components/tradingViewSymbolInfo";
import TradingViewChart from "@/components/tradingViewOverviewChart";

function Home({}) {
  const searchParams = useSearchParams();
  let initialTicker = "";

  if (searchParams?.has("ticker")) {
    initialTicker = searchParams.get("ticker")!;
  }

  const [activeTicker, setActiveTicker] = useState<string>(initialTicker);
  const router = useRouter();

  useEffect(() => {
    sessionStorage.setItem("user", "bhg");
    if (typeof window !== "undefined" && sessionStorage.getItem("user") == '') {
      router.push("/login")
    }
    if (searchParams?.has("ticker")) {
      setActiveTicker(searchParams.get("ticker")!);
    }

  }, [searchParams]);

  function clear(){
    (document.getElementById('qty')! as HTMLInputElement).value = '';
    (document.getElementById('Action')! as HTMLSelectElement).options[0].selected = true;
    
  }


  return (
    <div className="w-256 mx-auto text-2xl text-center">
      <SearchBox setActiveTicker={(ticker:string) => router.push(`/trade?ticker=${ticker}`)}/>
      {/* <SearchBox setActiveTicker={ (ticker) => console.log('hi there') }/> */}
      {/* <SearchBox className="search-box" setActiveTicker={(ticker:string) => setActiveTicker(ticker)} /> */}
        

      {activeTicker !='' &&
      <div className="mx-auto w-256 flex my-12">
        <div className="flex w-128 h-96 flex-wrap">
          <TradingViewWidget ticker={activeTicker} key={activeTicker}/>
        </div>
        <div className="flex w-128 h-96 flex-wrap">
          <TradingViewChart ticker={activeTicker} key={activeTicker}/>
        </div>
      </div>
      }

      <div className="tradeOptions mt-16">
      <div className="flex">

          <div className="flex flex-col items-start justify-start disabled">
            
            <div className="text-lg text-gray-200">Action</div>
            <select name="Action" id="Action" className="bg-black text-white focus:outline-none font-semibold w-128 p-5 border border-gray-500" >
              <option value="Buy">Buy</option>
              <option value="Sell">Sell</option>
              <option value="Short">Short</option>
            </select>   

          </div>

          <div className="flex flex-col items-start justify-start mx-auto">
            
            <div className="text-lg text-gray-200">Quantity</div>
            <input type='number' name="Quanity" id="qty" className="bg-black text-white mx-auto focus:outline-none font-semibold w-64 p-5 border border-gray-500" /> 
          </div>
        
        </div>
      </div>

        <div className="flex my-16 w-256 justify-evenly">
          <button className='bg-primary text-primary-foreground rounded-lg p-2 w-96' onClick={()=>router.push('/trade?ticker=AAPL')}>Perform Trade</button>
          <button type='reset' className='bg-destructive text-destructive-foreground rounded-lg p-2 w-96' onClick={clear}>Clear</button>
        </div>



    </div>


  )};

export default function suspenseWrapper() {
  return(
    <Suspense>
      <Home />
    </Suspense>
  )};