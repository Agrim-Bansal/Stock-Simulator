"use client";
import {useEffect, useState } from "react";
import TradingViewWidget from "@/components/tradingViewMarketOverview";
import { getHoldings, getPortfolio, getShortsWithPrice, getTrades,  } from "@/lib/firestore";
// import { stockInfo } from "@/pages/api/stocks";
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import HistoryTable from "@/components/history-table";
import HoldingsTable from "@/components/holdings-table";
import ShortsTable from "@/components/shorts-table";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();

  const [loading, setLoading] = useState(false);
  const [holdingsLoading, setHoldingsLoading] = useState(false);
  const [portfolio, setPortfolio] = useState<{money: number, stocks : {[key:string] : number}}>({money: 0, stocks: {}});
  const [history, setHistory] = useState<{action: string, quantity: number, ticker: string, timestamp: number, price: number}[]>([]);
  const [holdings, setHoldings] = useState<{ticker: string, quantity: number, price: number}[]>([]);
  const [shorts, setShorts] = useState<{ticker:string, quantity:number, price:number, newPrice:number}[]>([]);

  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(getAuth(), async (user) => {
        if (user) {
          setIsLoggedIn(true);
          setLoading(true);
          getPortfolio()
          .then((portfolio) => {
            setPortfolio(portfolio);
            setLoading(false);
            setHoldings(Object.keys(portfolio.stocks).map((ticker) => {
              return {ticker: ticker, quantity: portfolio.stocks[ticker], price: 0};
            }));
          });

          getTrades()
          .then((history) => {
            setHistory(history);
          });

          getShortsWithPrice()
          .then((shorts) => {
            setShorts(shorts);
          });

        } else {
          setIsLoggedIn(false);
        }
      });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setHoldingsLoading(true);
    getHoldings()
    .then((holdings) => {
      console.log(holdings)
      setHoldings(holdings)
      setHoldingsLoading(false);
    });
  },[portfolio]);

  function getTotalValue(){
    let totalValue = portfolio.money;
    holdings.forEach((stock) => {
      totalValue += stock.price * stock.quantity;
    });
    shorts.forEach((stock) => {
      totalValue += (stock.price-stock.newPrice) * stock.quantity;
    });
    return totalValue;
  }

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
            
            <div className="flex my-5 w-full justify-between items-end">
              { holdingsLoading? 
                <div className="totalValue text-5xl text-green-500">Loading...</div>
                :
                <div className="totalValue text-5xl text-green-500">$
                {getTotalValue().toFixed(2)} 
                </div>
              }

              <div className="text-xl font-300 text-right">Total Account Value</div>
            </div>

            <div className="flex my-5 justify-between items-end">
              <div className="liquidMoney text-5xl text-green-500">${portfolio?.money}</div>
              <div className="text-xl font-300">Cash</div>
            </div>

            </div>

            <div className="w-3/5 mx-5">
              <div className="text-2xl w-full text-center">Market OverView</div>
              <TradingViewWidget/>
            </div>

        </div>

        <div className="Holdings">
          <div className="text-2xl">Holdings</div>
          <HoldingsTable stocks={holdings} key={portfolio.money} loading={holdingsLoading}/>
        </div>

        <div>
          <div className="text-2xl">Shorts</div>
          <ShortsTable key={portfolio.money} stocks={shorts}/>
        </div>

        <div className="Trade History">
          <div className="text-2xl">Trading History</div>
          <HistoryTable stocks={history} key={portfolio.money}/>
        </div>

        </>

      }
    </div>
  )};