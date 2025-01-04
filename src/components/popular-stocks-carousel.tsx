import Image from "next/image";
import { Card } from "@/components/ui/card";

export default function PopularStocksCarousel({stocks}:{stocks: {name: string, symbol: string, price: string, change: string, logo: string}[]}) {
    return (
        <div className="popular-stocks-carousel bg-zinc-900 m-10">
            <div className="text-2xl">Popular Stocks</div>

            <div className="stocks flex overflow-x-scroll w-full">
                {(stocks.length) && stocks.map((stock, index) => (
                    <Card className="stock p-5 m-5 w-200 flex-col justify-center items-center " key={index}>
                        <div className="flex items-center justify-center">
                            <Image src={stock.logo} alt={stock.name}  width='50' height='50' className="mr-10"/>
                            <div>
                                <div className="text-2xl text-right">{stock.name}</div>
                                <div className="text-gray-500 text-right">({stock.symbol})</div>
                            </div>
                        </div>
                                <div className="w-full text-center text-xl">${stock.price}</div>
                                {
                                    stock.change.search('-') == -1 ?
                                    <div className="w-full text-center text-xl text-green-500">{stock.change}%</div>
                                    :
                                    <div className="w-full text-center text-xl text-red-500">{stock.change}%</div>

                                }
                    </Card>
                ))}
            </div>
        </div>
    )
}