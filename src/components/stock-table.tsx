import symbolInfo from '@/data/symbolInfo.json'
import Image from 'next/image'

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
function TableRow(stock:{symbol:string, logo:string, name:string, price:number, change:number, marketCap:number, volume:number, industry:string, index:number, onClick:Function}){
    return(
        <div className={`flex justify-evenly py-4 px-5 flex items-center justify-center border-b ${stock.index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'}`}>
            <div className="basis-1/6 font-bold flex items-center justify-between text-sm cursor-pointer" onClick={() => stock.onClick()}>
            <Image src={stock.logo? stock.logo : "/@/app/icon.png"} alt={stock.name} height='30' width='30' /> 
            {stock.name}
            </div>
            <div className="basis-1/6 font-normal flex items-center justify-center">{stock.symbol}</div>
            <div className={`basis-1/6 font-light flex items-center justify-center`} > {stock.price} &nbsp; <div className="text-sm font-extralight"> USD </div> </div>
            <div className={`basis-1/6 font-light flex items-center justify-center ${stock.change>0? 'text-green-400' : 'text-red-400'}`} > {stock.change} &nbsp; <div className="text-sm font-extralight"> USD </div> </div>
            <div className={`basis-1/6 font-light flex items-center justify-center ${stock.change>0? 'text-green-400' : 'text-red-400'}`} >{(stock.change*100/stock.price).toFixed(2)}%</div>
            <div className="basis-1/6 font-normal flex items-center justify-center" >{stock.volume}M</div>
            <div className="basis-1/6 font-normal flex items-center justify-center" >{stock.marketCap}M</div>
            <div className="basis-1/6 font-semibold flex items-center justify-center text-sm">{stock.industry}</div> 
        </div>
    )
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export default function StockTable({setActiveTicker}:{setActiveTicker:Function}){

    return(
        <div className="stock-table my-10 p-2 w-256 mx-auto table font-extralight bg-gray-950 text-white text-center"> 

                <div className="table-header-group bg-gray-950 ">
                    <div className="flex border h-16 text-xl">
                        <div className="basis-1/6 border self-center h-full align-middle flex items-center justify-center">Stock</div>
                        <div className="basis-1/6 border self-center h-full flex items-center justify-center">Ticker</div>
                        <div className="basis-1/6 border self-center h-full flex items-center justify-center">Price</div>
                        <div className="basis-1/6 border self-center h-full flex items-center justify-center">Change</div>
                        <div className="basis-1/6 border self-center h-full flex items-center justify-center">Change %</div>
                        <div className="basis-1/6 border self-center h-full flex items-center justify-center">Volume</div>
                        <div className="basis-1/6 border self-center h-full flex items-center justify-center">Market Cap</div>
                        <div className="basis-1/6 border self-center h-full flex items-center justify-center">Industry</div>
                    </div>
                </div>

                <div className="flex-group overflow-y-auto h-96 text-lg">
                    {
                        symbolInfo.map((stock, index) => {
                            return <TableRow symbol={stock.symbol} logo={stock.logoUrl!} name={stock.name} price={parseFloat(stock.price.toFixed(2))} change={parseFloat(stock.change.toFixed(2))} marketCap={parseInt(`${stock.marketCap}`) } volume={stock.volume} industry={stock.industry!} key={index} index={index} onClick={()=>setActiveTicker(stock.symbol)}/>
                        })
                    }
                </div>

        </div>
    )

}