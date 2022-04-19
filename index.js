const chart = LightweightCharts.createChart(document.getElementById("chart"), {
  width: 1000,
  height: 500,
  layout: {
    backgroundColor: "#000000",
    textColor: "rgba(255, 255, 255, 0.9)",
  },
  grid: {
    vertLines: {
      color: "rgba(197, 203, 206, 0.5)",
    },
    horzLines: {
      color: "rgba(197, 203, 206, 0.5)",
    },
  },
  crosshair: {
    mode: LightweightCharts.CrosshairMode.Normal,
  },
  priceScale: {
    borderColor: "rgba(197, 203, 206, 0.8)",
  },
  timeScale: {
    borderColor: "rgba(197, 203, 206, 0.8)",
    timeVisible: true,
    secondsVisible: false,
  },
});

const candleSeries = chart.addCandlestickSeries({
  upColor: "#00ff00",
  downColor: "#ff0000",
  borderDownColor: "rgba(255, 144, 0, 1)",
  borderUpColor: "rgba(255, 144, 0, 1)",
  wickDownColor: "rgba(255, 144, 0, 1)",
  wickUpColor: "rgba(255, 144, 0, 1)",
});

fetch("https://forex.hasindusithmin.repl.co/data/eurusd=x/5m")
  .then((res1) => res1.json())
  .then((data1) => {
    candleSeries.setData(data1);
    fetch("https://sr.hasindusithmin.repl.co/sr/eurusd/5mins")
      .then((res2) => res2.json())
      .then((data2) => {
        for( key in data2){
            if (key !== 'name'){
                candleSeries.createPriceLine({
                price: data2[key],
                color: "#be1238",
                lineWidth: 2,
                lineStyle: LightweightCharts.LineStyle.Solid,
                axisLabelVisible: true,
                title: `${key}`,
                });
            }
        }
        
      });
  });

// const binanceSocket = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@kline_15m");

// binanceSocket.onmessage = function (event) {
// 	const message = JSON.parse(event.data);

// 	const candlestick = message.k;

// 	console.log(candlestick)

// 	candleSeries.update({
// 		time: candlestick.t / 1000,
// 		open: candlestick.o,
// 		high: candlestick.h,
// 		low: candlestick.l,
// 		close: candlestick.c
// 	})
// }

