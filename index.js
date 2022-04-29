
const opt_desktop = {
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
}
const opt_mobile = {
  width: 680,
  height: 360,
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
}

const opt2 = {
  upColor: "#00ff00",
  downColor: "#ff0000",
  borderDownColor: "rgba(255, 144, 0, 1)",
  borderUpColor: "rgba(255, 144, 0, 1)",
  wickDownColor: "rgba(255, 144, 0, 1)",
  wickUpColor: "rgba(255, 144, 0, 1)",
}


const chart1 = LightweightCharts.createChart(document.getElementById("chart1"), opt_desktop);
const chart2 = LightweightCharts.createChart(document.getElementById("chart2"), opt_mobile);
const candleSeries1 = chart1.addCandlestickSeries(opt2);
const candleSeries2 = chart2.addCandlestickSeries(opt2);
fetch("https://forex.hasindusithmin.repl.co/data/eurusd=x/5m")
  .then((res) => res.json())
  .then((data) => {
    candleSeries1.setData(data);
    candleSeries2.setData(data);
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

const demo = ()=>{
  alert(`width:${screen.width} height:${screen.height}`)
}