const btnstyle = ''
const currencies = ['eurusd', 'usdjpy', 'gbpusd', 'audusd', 'nzdusd', 'eurjpy', 'gbpjpy', 'eurgbp', 'eurcad', 'eursek', 'eurchf', 'eurhuf', 'eurjpy', 'usdcny', 'usdhkd', 'usdsgd', 'usdinr', 'usdmxn', 'usdphp', 'usdidr', 'usdthb', 'usdmyr', 'usdzar', 'usdrub']
const timeframs = ['5m', '15m', '30m', '60m', '1h']
const functions = ['cdldoji', 'cdldojistar', 'cdl2crows', 'cdl3blackcrows', 'cdl3inside', 'cdl3linestrike', 'cdl3outside', 'cdl3starsinsouth', 'cdl3whitesoldiers', 'cdlabandonedbaby', 'cdladvanceblock', 'cdlbelthold', 'cdlbreakaway', 'cdlclosingmarubozu', 'cdlconcealbabyswall', 'cdlcounterattack', 'cdldarkcloudcover', 'cdldragonflydoji', 'cdlengulfing', 'cdleveningdojistar', 'cdleveningstar', 'cdlgapsidesidewhite', 'cdlgravestonedoji', 'cdlhammer', 'cdlhangingman', 'cdlharami', 'cdlharamicross', 'cdlhighwave', 'cdlhikkake', 'cdlhikkakemod', 'cdlhomingpigeon', 'cdlidentical3crows', 'cdlinneck', 'cdlinvertedhammer', 'cdlkicking', 'cdlkickingbylength', 'cdlladderbottom', 'cdllongleggeddoji', 'cdllongline', 'cdlmarubozu', 'cdlmatchinglow', 'cdlmathold', 'cdlmorningdojistar', 'cdlmorningstar', 'cdlonneck', 'cdlpiercing', 'cdlrickshawman', 'cdlrisefall3methods', 'cdlseparatinglines', 'cdlshootingstar', 'cdlshortline', 'cdlspinningtop', 'cdlstalledpattern', 'cdlsticksandwich', 'cdltakuri', 'cdltasukigap', 'cdlthrusting', 'cdltristar', 'cdlunique3river', 'cdlupsidegap2crows', 'cdlxsidegap3methods']
const selectForCurrency = document.createElement('select');
const selectForTimeFrame = document.createElement('select');
const selectForFunctons = document.createElement('select');
const button = document.createElement('button');
window.addEventListener('DOMContentLoaded', (event) => {
    selectForCurrency.className = btnstyle
    for (let currency of currencies) {
        const opt = document.createElement('option');
        opt.value = currency;
        opt.innerText = currency.toUpperCase();
        selectForCurrency.appendChild(opt);
    }

    selectForTimeFrame.className = btnstyle
    for (let timefram of timeframs) {
        const opt = document.createElement('option');
        opt.value = timefram;
        opt.innerText = timefram;
        selectForTimeFrame.appendChild(opt);
    }
    selectForFunctons.className = btnstyle;
    for (let func of functions) {
        const opt = document.createElement('option');
        opt.value = func;
        opt.innerText = func.toUpperCase();
        selectForFunctons.appendChild(opt);
    }
    button.className = btnstyle;
    button.innerText = 'click'
    button.style.color = 'red'
    document.getElementById('select').appendChild(selectForCurrency)
    document.getElementById('select').appendChild(selectForTimeFrame)
    document.getElementById('select').appendChild(selectForFunctons)
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


button.onclick = () => {
        const cross = selectForCurrency.value;
        const timeframe = selectForTimeFrame.value;
        const func = selectForFunctons.value;
        fetch(`https://forex-codeunity.herokuapp.com/yahoo/history/${cross}?interval=${timeframe}`)
            .then(res => res.json())
            .then(data => {
                const candlestick = [];
                data.forEach(dt => {
                    let candle = {}
                    candle['time'] = dt.Datetime / 1000 + 19800;
                    candle['open'] = parseFloat(dt.Open.toFixed(4));
                    candle['high'] = parseFloat(dt.High.toFixed(4));
                    candle['low'] = parseFloat(dt.Low.toFixed(4));
                    candle['close'] = parseFloat(dt.Close.toFixed(4));
                    candlestick.push(candle)
                })
                candleSeries1.setData(candlestick);
                candleSeries2.setData(candlestick);
                fetch(`https://pattern-codeunity.herokuapp.com/point/${cross}/${timeframe}/${func}`)
                    .then(r => r.json())
                    .then(dt => {
                        const markers = []
                        dt.forEach(d => {
                            markers.push({ time: d, position: 'aboveBar', color: '#ffffff', shape: 'arrowDown' })
                        })
                        candleSeries1.setMarkers(markers)
                        candleSeries2.setMarkers(markers)

                    })
            })
    }
    //