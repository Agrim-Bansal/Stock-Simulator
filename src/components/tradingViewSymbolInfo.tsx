// TradingViewWidget.jsx
import React, { useEffect } from 'react';

function TradingViewWidget({ticker} : {ticker:string}) {

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "symbol": "${ticker}",
          "width": "100%",
          "locale": "en",
          "colorTheme": "dark",
          "isTransparent": true
        }`;
        
      document.getElementsByClassName("tradingview-widget-container__widget")[0].appendChild(script);

      if(document.getElementsByClassName("tradingview-widget-container__widget")[0].childNodes.length > 1){
        document.getElementsByClassName("tradingview-widget-container__widget")[0].removeChild(
          document.getElementsByClassName("tradingview-widget-container__widget")[0].childNodes[0]
        );
      }
    },
    []
  );

  return (
    <div className="tradingview-widget-container h-full w-full">
      <div className="tradingview-widget-container__widget h-full w-full"></div>
    </div>
  );
}

export default (TradingViewWidget);



