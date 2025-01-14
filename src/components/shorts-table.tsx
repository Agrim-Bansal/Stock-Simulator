
import Link from 'next/link';

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
function TableRow(stock:{symbol:string, newPrice:number, shortPrice:number, index:number, quantity:number}){
    const change = (stock.shortPrice) - (stock.newPrice);
    return(
        <div className={`flex justify-evenly py-4 px-5 flex items-center justify-center border-b ${stock.index % 2 === 0 ? 'bg-gray-800' : ' bg-gray-950'}`}>

            <div className="basis-1/4 font-normal flex items-center justify-center">{stock.symbol}</div>
            <div className="basis-1/4 font-normal flex items-center justify-center">{stock.quantity}</div>

            <div className={`basis-1/4 font-bold flex items-center justify-center`} > {stock.shortPrice} &nbsp; <div className="text-sm font-extralight"> USD </div> </div>
            {stock.newPrice === 0 ?
            <div className='loader'></div>
                :
            <div className={`basis-1/4 font-bold flex items-center justify-center ${change<=0? 'text-green-400' : 'text-red-400'}`} > {stock.newPrice} &nbsp; <div className="text-sm font-extralight"> USD </div> </div>
            
            }
            <div className={`basis-1/4 font-bold flex items-center justify-center ${change>=0? 'text-green-400' : 'text-red-400'}`} >{(change*stock.quantity).toFixed(2)}  &nbsp; <div className="text-sm font-extralight"> USD </div>  </div>
            <div className="basis-1/5 font-bold flex items-center justify-center text-md cursor-pointer" onClick={()=> window.location.href = `/trade?ticker=${stock.symbol}` }>Cover/Increase</div>

        </div>
    )
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export default function ShortsTable({stocks}:{stocks : {ticker:string, quantity:number, price:number, newPrice:number}[]}){


    return(
        <div className="stock-table my-10 p-2 w-256 mx-auto table font-extralight bg-gray-950 text-white text-center"> 

                <div className="table-header-group bg-gray-950 ">
                    <div className="flex border h-16 text-xl">
                        <div className="basis-1/6 border self-center h-full align-middle flex items-center justify-center">Stock</div>
                        <div className="basis-1/6 border self-center h-full flex items-center justify-center">Quantity</div>
                        <div className="basis-1/6 border self-center h-full flex items-center justify-center">Short Price</div>
                        <div className="basis-1/6 border self-center h-full flex items-center justify-center">Current Price</div>
                        <div className="basis-1/6 border self-center h-full flex items-center justify-center">Total Gain / Loss</div>
                        <div className="basis-1/6 border self-center h-full flex items-center justify-center">Actions</div>
                    </div>
                </div>
                {stocks?.length ?
                <div className="flex-group overflow-y-auto h-96 text-lg">
                    {
                        stocks?.map((stock, index) => {
                            return <TableRow symbol={stock.ticker} quantity={stock.quantity} shortPrice={stock.price} newPrice={stock.newPrice} key={index} index={index} />
                        })
                    }
                </div> :

                <div className="flex justify-center items-center h-20 text-white text-2xl">
                    No Short Sell Trades Made. Go to &nbsp; <Link href="/trade" className='text-blue-800'> Trade </Link> &nbsp; to make shorts.
                </div>
}
        </div>
    )

}