
const currencies = ['eurusd', 'usdjpy', 'gbpusd', 'audusd', 'nzdusd', 'eurjpy', 'gbpjpy', 'eurgbp', 'eurcad', 'eursek', 'eurchf', 'eurhuf', 'eurjpy', 'usdcny', 'usdhkd', 'usdsgd', 'usdinr', 'usdmxn', 'usdphp', 'usdidr', 'usdthb', 'usdmyr', 'usdzar', 'usdrub']
const timeframs = ['5m','15m','30m','60m','1h']
const selectForCurrency = document.createElement('select');
const selectForTimeFrame = document.createElement('select');
const button = document.createElement('button');
window.addEventListener('DOMContentLoaded', (event) => {
    selectForCurrency.className = 'w3-input w3-half'
    for (let currency of currencies) {
      const opt = document.createElement('option');
      opt.value = currency;
      opt.innerText = currency;
      selectForCurrency.appendChild(opt);
    }
    
    selectForTimeFrame.className = 'w3-input w3-half'
    for (let timefram of timeframs) {
      const opt = document.createElement('option');
      opt.value = timefram;
      opt.innerText = timefram;
      selectForTimeFrame.appendChild(opt);
    }
    button.className = 'w3-input';
    button.innerText = 'click'
    document.getElementById('select').appendChild(selectForCurrency)
    document.getElementById('select').appendChild(selectForTimeFrame)
    document.getElementById('select').appendChild(button)
});


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
  width: 375,
  height: 225,
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
// fetch("https://forex.hasindusithmin.repl.co/data/eurusd=x/5m")
//   .then((res) => res.json())
//   .then((data) => {
//     candleSeries1.setData(data);
//     candleSeries2.setData(data);
//   });

button.onclick = ()=>{
  const cross = selectForCurrency.value;
  const timeframe = selectForTimeFrame.value;
  fetch(`https://forex-codeunity.herokuapp.com/yahoo/history/${cross}?interval=${timeframe}`)
    .then(res=>res.json())
    .then(data=>{
      const candlestick = [];
      data.forEach(dt=>{
        let candle = {}
        candle['time'] = dt.Datetime/1000+19800;
        candle['open'] = parseFloat(dt.Open.toFixed(4));
        candle['high'] = parseFloat(dt.High.toFixed(4));
        candle['low'] = parseFloat(dt.Low.toFixed(4));
        candle['close'] = parseFloat(dt.Close.toFixed(4));
        candlestick.push(candle)
      })
      candleSeries1.setData(candlestick);
      candleSeries2.setData(candlestick)
    })
}

