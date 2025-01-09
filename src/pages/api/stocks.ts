"use server";
// const apiKey = process.env.ALPHAVANTAGE_API_KEY;
const logoApiKey = process.env.API_NINJA_KEY;
const finnhubApiKey = process.env.FINNHUB_API_KEY;

export async function stockInfo(ticker:string) : Promise<[{'price': string, 'change percent': string}, {name: string, image: string}]>{
    const stock = await fetch(
        `https://api.api-ninjas.com/v1/stockprice?ticker=${ticker}`, 
        {
        headers:{'X-Api-Key': `${logoApiKey}`}
    }).then(res => res.json() as Promise<{'price': string, 'change percent': string}>);
    

    const logo = await fetch(
        `https://api.api-ninjas.com/v1/logo?ticker=${ticker}`, 
        {
        headers:{'X-Api-Key': `${logoApiKey}`}
    }).then(res => res.json() );

    return [stock, logo[0]];

}


export async function commonStocks() : (Promise<{name: string, symbol: string, price: string, change: string, logo: string}[]>){
    // const commonTickerList = ['AAPL', 'NVDA'];
    const commonTickerList = ['AAPL', 'NVDA', 'TSLA', 'MSFT', 'AMZN', 'GOOG', 'JPM', 'NFLX']
    const stocks = [];


    for(const ticker of commonTickerList){

        const [stock, logo] = await stockInfo(ticker);

        stocks.push({
            name: logo.name,
            symbol: ticker,
            price: (stock['price']),
            change: (stock['change percent']),
            logo: logo.image,
        });
    }
    return stocks;   
}

export async function stockLookup(query:string) {

    const response = await fetch(
        `https://finnhub.io/api/v1/search?q=${query}&exchange=US`, 
        {
        headers:{'X-Finnhub-Token': `${finnhubApiKey}`}
    }).then(res => res.json() as Promise<{count:number, result: {description: string, displaySymbol: string, symbol: string, type:string}[]}>);

    return response;
    
}