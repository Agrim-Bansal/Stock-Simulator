
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
function TableRow(stock:{timestamp:number, quantity:number ,symbol:string, price:number, action:string, index:number}){
    const dateTime = new Date(stock.timestamp);
    return(
        <div className={`flex justify-evenly py-4 px-5 text-xl flex items-center justify-center border-b ${stock.index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'}`}>

            <div className="basis-1/4 font-normal flex items-center justify-center">{stock.symbol}</div>
            
            <div className={`basis-1/4 font-normal flex items-center justify-center ${stock.action == 'buy' ? 'text-red-500': 'text-green-500'}`}>{stock.action.toUpperCase()} </div>

            <div className={`basis-1/4 font-normal flex items-center justify-center ${stock.action == 'buy' ? 'text-green-500': 'text-red-500'}`} >{stock.action == 'buy' ? '+': '-'} {stock.quantity} &nbsp; </div>

            <div className={`basis-1/4 font-bold flex items-center justify-center `} > {stock.price} &nbsp; <div className="text-sm font-extralight"> USD </div> </div>
            
            <div className={`basis-1/4 font-bold flex items-center justify-center ${stock.action == 'buy' ? 'text-red-500': 'text-green-500'}`} >{stock.action == 'buy' ? '-': '+'} {(stock.price * stock.quantity).toFixed(2)} &nbsp; <div className="text-sm font-extralight"> USD </div> </div>

            <div className="basis-1/5 font-extralight flex items-center justify-between text-md cursor-pointer">{dateTime.toLocaleDateString()} {dateTime.toLocaleTimeString()}</div>
        </div>
    )
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export default function HistoryTable({stocks} : {stocks : {ticker:string, action:string, timestamp:number, quantity:number, price:number}[]}){

    return(
        <div className="stock-table my-10 p-2 w-256 mx-auto table font-extralight bg-gray-950 text-white text-center"> 

                <div className="table-header-group bg-gray-950 ">
                    <div className="flex border h-16 text-xl">
                        <div className="basis-1/5 border self-center h-full flex items-center justify-center">Ticker</div>
                        <div className="basis-1/5 border self-center h-full flex items-center justify-center">Action</div>
                        <div className="basis-1/5 border self-center h-full flex items-center justify-center">Quanitity</div>
                        <div className="basis-1/5 border self-center h-full flex items-center justify-center">Price</div>
                        <div className="basis-1/5 border self-center h-full flex items-center justify-center">Total Amount</div>
                        <div className="basis-1/5 border self-center h-full flex items-center justify-center">Date-Time</div>
                    </div>
                </div>

                {stocks?.length ?
                <div className="flex-group overflow-y-auto h-96 text-lg">
                    {
                        stocks?.map((stock, index) => {
                            return <TableRow quantity={stock.quantity} timestamp={stock.timestamp} action={stock.action} symbol={stock.ticker} price={stock.price}  key={index} index={index} />
                        })
                    }
                </div> :

                <div className="flex justify-center items-center h-20 text-white text-2xl">
                    No Trades Done Yet
                </div>
}
        </div>
    )

}