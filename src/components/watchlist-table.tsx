
import Image from 'next/image'
import {removeFromWatchlist} from '@/lib/firestore'
import Link from 'next/link';

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
function TableRow(stock:{symbol:string, logo:string, name:string, price:string, markedPrice:string, index:number, onClick:Function}){
    const change = parseFloat(stock.price) - parseFloat(stock.markedPrice);
    return(
        <div className={`flex justify-evenly py-4 px-5 flex items-center justify-center border-b ${stock.index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'}`}>
            <div className="basis-1/5 font-bold flex items-center justify-between text-lg cursor-pointer">
            <Image src={stock.logo? stock.logo : "/@/app/icon.png"} alt={stock.name} height='30' width='30' /> 
            {stock.name}
            </div>
            <div className="basis-1/4 font-normal flex items-center justify-center">{stock.symbol}</div>
            <div className={`basis-1/4 font-light flex items-center justify-center`} > {stock.markedPrice} &nbsp; <div className="text-sm font-extralight"> USD </div> </div>
            {stock.price === '0' ?
            <div className='loader'></div>
                :
            <div className={`basis-1/4 font-light flex items-center justify-center ${change>=0? 'text-green-400' : 'text-red-400'}`} > {stock.price} &nbsp; <div className="text-sm font-extralight"> USD </div> </div>
            
            }
            <div className={`basis-1/4 font-light flex items-center justify-center ${change>=0? 'text-green-400' : 'text-red-400'}`} >{change/parseFloat(stock.markedPrice) * 100}%</div>
            <div className="basis-1/4 font-light flex items-center justify-center"> 
            <button className='bg-destructive text-destructive-foreground rounded-lg p-2 m-1' onClick={() => stock.onClick()}>Delete</button> 
            <Link href={`/trade?stock=${stock.symbol}`}><button className='bg-primary text-primary-foreground rounded-lg p-2 m-1'>Trade</button> </Link>
            </div>
        </div>
    )
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export default function StockTable({stocks, setStocks, setPrices, prices}:{stocks : {ticker:string, logo:string, name:string, markedPrice:string}[], setStocks:Function, prices: {ticker:string, price:string}[], setPrices: Function}){

    function removeFromWatchlistHandler (ticker: string){
        removeFromWatchlist(ticker)
        console.log(stocks.filter(stock => stock.ticker !== ticker));
        
        setStocks(stocks.filter(stock => stock.ticker !== ticker));
        setPrices(prices.filter(price => price.ticker !== ticker));

    }

    return(
        <div className="stock-table my-10 p-2 w-256 mx-auto table font-extralight bg-gray-950 text-white text-center"> 

                <div className="table-header-group bg-gray-950 ">
                    <div className="flex border h-16 text-xl">
                        <div className="basis-1/5 border self-center h-full align-middle flex items-center justify-center">Stock</div>
                        <div className="basis-1/5 border self-center h-full flex items-center justify-center">Ticker</div>
                        <div className="basis-1/5 border self-center h-full flex items-center justify-center">Marked Price</div>
                        <div className="basis-1/5 border self-center h-full flex items-center justify-center">Current Price</div>
                        <div className="basis-1/5 border self-center h-full flex items-center justify-center">Change %</div>
                        <div className="basis-1/5 border self-center h-full flex items-center justify-center">Action</div>
                    </div>
                </div>
                {stocks?.length ?
                <div className="flex-group overflow-y-auto h-96 text-lg">
                    {
                        stocks?.map((stock, index) => {
                            return <TableRow symbol={stock.ticker} logo={stock.logo!} name={stock.name} markedPrice={stock.markedPrice} price={prices[index]['price']} key={index} index={index} onClick={()=>{removeFromWatchlistHandler(stock.ticker)}}/>
                        })
                    }
                </div> :

                <div className="flex justify-center items-center h-20 text-white text-2xl">
                    No Stocks in Watchlist. Go to &nbsp; <Link href="/research" className='text-blue-800'> Research </Link> &nbsp; to add stocks.
                </div>
}
        </div>
    )

}