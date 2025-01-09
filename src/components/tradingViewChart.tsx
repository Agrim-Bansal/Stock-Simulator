// TradingViewWidget.jsx
import React, { useEffect } from 'react';

function TradingViewWidget({ticker} : {ticker:string}) {

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "autosize": true,
          "symbol": "${ticker}",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "3",
          "backgroundColor": "rgba(0, 0, 0, 1)",
          "locale": "en",
          "allow_symbol_change": true,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
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
    <div className="tradingview-widget-container" style={{ height: "100%", width: "100%" }}>
      <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
    </div>
  );
}

export default (TradingViewWidget);
