"use client";
import {useEffect, useState } from "react";
import TradingViewWidget from "@/components/tradingViewChart";
import { getPortfolio, getTrades,  } from "@/lib/firestore";
import { stockInfo } from "@/pages/api/stocks";
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import HistoryTable from "@/components/history-table";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();

  const [loading, setLoading] = useState(false);
  const [portfolio, setPortfolio] = useState<{money: number, stocks : {[key:string] : number}}>({money: 0, stocks: {}});
  const [totalValue, setTotalValue] = useState(0);
  const [history, setHistory] = useState<{action: string, quantity: number, ticker: string, timestamp: number, price: number}[]>([]);

  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(getAuth(), async (user) => {
        if (user) {
          setIsLoggedIn(true);
          setLoading(true);
          getPortfolio()
          .then((portfolio) => {
            setPortfolio(portfolio);
            setTotalValue(portfolio.money);
            setLoading(false);
          });

          getTrades()
          .then((history) => {
            setHistory(history);
          });



        } else {
          setIsLoggedIn(false);
        }
      });
    return () => unsubscribe();
  }, []);

  useEffect(() => {

    const stocks = portfolio?.stocks;

    for (const stock in stocks){
      stockInfo(stock).then((stockInfo) => {
        const stockPrice = stockInfo[0].price;
        setTotalValue(totalValue + parseFloat(stockPrice) * (stocks[stock]));
      });
    }

  },[portfolio]);



  if (isLoggedIn === undefined) {
    return (
      <div className="loader-container flex justify-center items-center h-screen w-full">
        <div className="loader"></div>
      </div>
  )}
  else if(isLoggedIn == true){
  
  }else{
    window.location.href = '/login';
  }

  return (
    <div className="w-256 mx-auto h-full flex flex-col">
      { loading?
        <div className="loader mx-auto my-auto top-1/2"></div>
        :
        <>
        <div className="flex h-96 mt-10">

            <div className="w-2/5 mx-5 flex flex-col justify-center">
            
            <div className="flex my-5 justify-between items-end">
              <div className="totalValue text-5xl text-green-500">${totalValue} </div>
              <div className="text-xl font-300">Total Account Value</div>
            </div>

            <div className="flex my-5 justify-between items-end">
              <div className="liquidMoney text-5xl text-green-500">${portfolio?.money}</div>
              <div className="text-xl font-300">Money</div>
            </div>

            </div>

            <div className="w-3/5 mx-5">
              <TradingViewWidget ticker="AAPL"/>
            </div>

        </div>


        <div className="Holdings">
          <div className="text-2xl">Holdings</div>
          <HistoryTable stocks={history} key={portfolio.money}/>
        </div>

        <div className="Trade History">
          <div className="text-2xl">Trading History</div>
          <HistoryTable stocks={history} key={portfolio.money}/>
        </div>

        </>

      }
    </div>
  )};