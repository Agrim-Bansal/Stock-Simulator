"use client";
import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import SearchBox from "@/components/search-box";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import TradingViewWidget from "@/components/tradingViewSymbolInfo";
import TradingViewChart from "@/components/tradingViewOverviewChart";
import { getPortfolio, makeTrade } from "@/lib/firestore";
import { stockInfo } from "@/pages/api/stocks";


function Trade({}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmTrade, setConfirmTrade] = useState<boolean>(false);
  const searchParams = useSearchParams();
  let initialTicker = "";
  const [message, setMessage] = useState<string>('');
  const [stockPrice, setStockPrice] = useState<string>('0');
  const [qty, setQty] = useState<string>('0');

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
    setMessage('');

  }, [searchParams]);

  useEffect(() => {
    const updateStockPrice = async ()=>{
      const tickerPrice = (await stockInfo(activeTicker))[0].price; 
      setStockPrice(tickerPrice);
    }
    updateStockPrice();
  },[activeTicker])

  useEffect(() => {
    clearMessage();
  },[activeTicker, qty])


  function clear(){
    (document.getElementById('qty')! as HTMLInputElement).value = '';
    (document.getElementById('Action')! as HTMLSelectElement).options[0].selected = true;
  }



  async function tradeConfirmation(){
    const trade = (document.getElementById('Action')! as HTMLSelectElement).value;
    if (activeTicker == ''){
      setMessage('Select a stock');
      return;
    }
    else if(qty == '' || trade == ''){
      setMessage('Please fill all fields');
      return;
    }else if(activeTicker == ''){
      setMessage('Please select a Stock');
      return;
    }else if(qty == '0'){
      setMessage('Quantity cannot be 0');
      return;
    } else if(parseFloat(qty) < 0){
      setMessage('Quantity cannot be negative');
      return;
    }

    setConfirmTrade(true);
  }

  async function execTrade(){

    const trade = (document.getElementById('Action')! as HTMLSelectElement).value;

    setLoading(true);

    const portfolio = await getPortfolio();
    
    
    if (trade == 'Buy'){
      if(parseFloat(portfolio?.money) < (parseFloat(stockPrice) * parseFloat(qty))){
        setMessage('Insufficient Funds');
        setLoading(false);
        setConfirmTrade(false);
        return;
      }
      await makeTrade({action: 'buy', quantity: parseFloat(qty), ticker: activeTicker});

      setMessage('Trade Executed Successfully');
      
    }else if (trade == 'Sell'){
      if(parseInt(portfolio?.stock.get(activeTicker)) < parseInt(qty)){
        setMessage('Insufficient Stocks');
        setLoading(false);
        setConfirmTrade(false);
        return;
      }

      await makeTrade({action: 'sell', quantity: parseFloat(qty), ticker: activeTicker});

    }else if (trade == 'Short'){
      if(parseFloat(portfolio?.money) < (parseFloat(stockPrice) * parseFloat(qty))){
        setMessage('Insufficient Funds');
        setLoading(false);
        setConfirmTrade(false);
        return;
      }
      await makeTrade({action: 'short', quantity: parseFloat(qty), ticker: activeTicker});
    }

    setLoading(false);  
    setConfirmTrade(false);
  }

  function clearMessage(){
    setMessage('');
  }


  return (
      <div className="w-256 mx-auto text-2xl flex flex-col">

      <SearchBox setActiveTicker={(ticker:string) => router.push(`/trade?ticker=${ticker}`)}/>
        

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

      <div className="tradeOptions mt-8">
      <div className="flex">

          <div className="flex flex-col items-start justify-start disabled">
            
            <div className="text-lg text-gray-200">Action</div>
            <select name="Action" id="Action" onChange={clearMessage} className="bg-black text-white focus:outline-none font-semibold w-128 p-5 border border-gray-500" >
              <option value="Buy">Buy</option>
              <option value="Sell">Sell</option>
              <option value="Short">Short</option>
            </select>   

          </div>

          <div className="flex flex-col items-start justify-start mx-auto">
            
            <div className="text-lg text-gray-200">Quantity</div>
            <input type='number' name="Quanity" onChange={(e) =>  setQty(e.target.value)} id="qty" className="bg-black text-white mx-auto focus:outline-none font-semibold w-64 p-5 border border-gray-500" /> 
          </div>
        
        </div>
      </div>

      {
        message != '' &&
        <div className="text-center text-xl text-red-200 mt-10">{message}</div>
      }

        <div className="flex my-16 w-256 justify-evenly">
          <button className='bg-primary text-primary-foreground rounded-lg p-2 w-96' onClick={tradeConfirmation}>Execute Trade</button>
          <button type='reset' className='bg-destructive text-destructive-foreground rounded-lg p-2 w-96' onClick={clear}>Clear</button>
        </div>
      

      <div className={`transition-500 flex justify-center z-2 text-gray-200 w-screen h-screen fixed top-0 left-0 text-white backdrop-blur-sm transition-10000 ${(confirmTrade) ? '' : 'scale-0'}`}>
        <div className="flex flex-col justify-evenly card w-96 bg-white my-auto h-80 p-8 rounded-lg text-black">
          
          <div className="flex justify-between">
            <div>Stock</div>
            <div>{activeTicker}</div>
          </div>

          <div className="flex justify-between">
            <div>Quantity</div>
            <div>{qty}</div>
          </div>

          <div className="flex justify-between">
            <div>Price</div>
            <div>{stockPrice}</div>
          </div>

          <div className="flex justify-between">
            <div>Total Amount</div>
            <div>$ {(parseInt(qty) * parseFloat(stockPrice)).toFixed(2)}</div>
          </div>
          
          <div className="flex justify-between">
            <button onClick={() => setConfirmTrade(false)} className="bg-destructive text-destructive-foreground rounded-lg p-2 m-1 w-36">Close</button>
            <button onClick={execTrade} className="bg-accent text-accent-foreground rounded-lg p-2 w-36">Confirm</button>
          </div>


        </div>
      </div>


      {loading &&
      <div className="w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
        <div className="loader"></div>
      </div>
    }

    </div>

    
  )};

export default function suspenseWrapper() {
  return(
    <Suspense>
      <Trade />
    </Suspense>
  )};