import Image from "next/image";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export default function PopularStocksCarousel({stocks, setActiveTicker}:{stocks: {name: string, symbol: string, price: string, change: string, logo: string}[], setActiveTicker:Function}) {

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if(stocks.length > 0){
            setLoading(false);
        }
    }, [stocks]);

    return (
        <div className="popular-stocks-carousel my-10 p-2 w-256 mx-auto">
            <div className="text-2xl">Popular Stocks</div>

            <div className="stocks flex overflow-x-scroll">

                {loading ? 
                <div className="h-64 flex justify-center items-center w-full">
                <div className="loader h-50"></div>
                </div>
                :
                (stocks.length) && stocks.map((stock, index) => (
                    <Card className="stock p-5 m-5 w-200 flex-col justify-center items-center cursor-pointer" key={index} style={{flex: '0 0 20%'}} onClick={() => setActiveTicker(stock.symbol)}>
                        <div className="flex items-center justify-center">
                            <Image src={stock.logo} alt={stock.name}  width='50' height='50' className="mr-10"/>
                            <div>
                                <div className="text-2xl text-right">{stock.name}</div>
                                <div className="text-gray-500 text-right">({stock.symbol})</div>
                            </div>
                        </div>
                                <div className="w-full text-center text-xl mt-10">${stock.price}</div>
                    </Card>
                ))
                }

            </div>
        </div>
    )
}