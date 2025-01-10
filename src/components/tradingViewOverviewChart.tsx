// TradingViewWidget.jsx
import React, { useEffect } from 'react';

function TradingViewWidget({ticker}: {ticker:string}) {

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "symbols": [
            [
              "${ticker}"
            ]
          ],
          "chartOnly": true,
          "width": "100%",
          "height": "100%",
          "locale": "en",
          "colorTheme": "dark",
          "autosize": true,
          "showVolume": false,
          "showMA": false,
          "hideDateRanges": false,
          "hideMarketStatus": false,
          "hideSymbolLogo": false,
          "scalePosition": "right",
          "scaleMode": "Normal",
          "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
          "fontSize": "10",
          "noTimeScale": false,
          "valuesTracking": "1",
          "changeMode": "price-and-percent",
          "chartType": "area",
          "maLineColor": "#2962FF",
          "maLineWidth": 1,
          "maLength": 9,
          "headerFontSize": "medium",
          "backgroundColor": "rgba(0, 0, 0, 0)",
          "widgetFontColor": "rgba(255, 255, 255, 1)",
          "lineWidth": 2,
          "lineType": 0,
          "dateRanges": [
            "1d|1",
            "1m|30",
            "3m|60",
            "12m|1D",
            "60m|1W",
            "all|1M"
          ],
          "lineColor": "rgba(41, 98, 255, 1)"
        }`;

        document.getElementsByClassName("tradingview-widget-container__widget1")[0].appendChild(script);

      if(document.getElementsByClassName("tradingview-widget-container__widget1")[0].childNodes.length > 1){
        document.getElementsByClassName("tradingview-widget-container__widget1")[0].removeChild(
          document.getElementsByClassName("tradingview-widget-container__widget1")[0].childNodes[0]
        );
      }
    },
    []
  );

  return (
    <div className="tradingview-widget-container1 h-full w-full">
      <div className="tradingview-widget-container__widget1 h-full w-full"></div>
    </div>
  );
}

export default (TradingViewWidget);


