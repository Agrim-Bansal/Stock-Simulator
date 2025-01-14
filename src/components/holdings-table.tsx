
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
function TableRow(stock:{quantity:number, symbol:string, price:number, index:number, loading:boolean}){

    return(
        <div className={`flex justify-evenly py-4  text-xl flex items-center justify-center border-b ${stock.index % 2 === 0 ? 'bg-gray-800' : ' bg-gray-950'}`}>

            <div className="basis-1/5 font-normal flex items-center justify-center">{stock.symbol}</div>

            <div className={`basis-1/5 font-normal flex items-center justify-center `} > {stock.quantity} &nbsp; </div>
            {stock.loading ?
                <div className="basis-1/2">Loading...</div> :
                <>
                <div className={`basis-1/5 font-bold flex items-center justify-center `} > {stock.price} &nbsp; <div className="text-sm font-extralight"> USD </div> </div>
                <div className={`basis-1/5 font-bold flex items-center justify-center `} > {(stock.price * stock.quantity).toFixed(2)} &nbsp; <div className="text-sm font-extralight"> USD </div> </div>
                </>
            }


            <div className="basis-1/5 font-light flex items-center justify-center text-md cursor-pointer" onClick={()=> window.location.href = `/trade?ticker=${stock.symbol}` }>Buy/Sell</div>
        </div>
    )
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export default function HoldingsTable({stocks, loading} : {stocks : {ticker:string, quantity:number, price:number}[], loading:boolean}){

    return(
        <div className="stock-table my-10 p-2 w-256 mx-auto table font-extralight bg-gray-950 text-white text-center"> 

                <div className="table-header-group bg-gray-950 ">
                    <div className="flex border h-16 text-xl">
                        <div className="basis-1/5 border self-center h-full flex items-center justify-center">Ticker</div>
                        <div className="basis-1/5 border self-center h-full flex items-center justify-center">Quanitity</div>
                        <div className="basis-1/5 border self-center h-full flex items-center justify-center">Price</div>
                        <div className="basis-1/5 border self-center h-full flex items-center justify-center">Total Value</div>
                        <div className="basis-1/5 border self-center h-full flex items-center justify-center">Trade</div>
                    </div>
                </div>

                {stocks?.length ?
                <div className="flex-group overflow-y-auto h-96 text-lg">
                    {
                        stocks?.map((stock, index) => {
                            return <TableRow quantity={stock.quantity} symbol={stock.ticker} price={stock.price}  key={index} index={index} loading={loading}/>
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