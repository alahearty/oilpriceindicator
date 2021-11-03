import axios from 'axios'
const options = {
    method: 'GET',
    url: 'https://api.eia.gov/series/?api_key=48058faf8f89c26e0c0e8f86f6c1ef2f&series_id=STEO.BREPUUS.A',
};
const state = {
    Dates:[],
    Prices:[],
    priceChange:10,
    Messages:[],
    email: [],
    from: 'CypherCrescent',
    subject: 'Current Oil Price',
    priceCount:0,
    dateCount : 0,
    currentPrice:0,
    chartOptions: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
              type: 'datetime',
              categories: [],
              tickAmount: 5,
              title: {
                text: 'Year'
              }
            },
            fill: {
                type: 'gradient',
                gradient: {
                  shade: 'dark',
                  gradientToColors: [ '#FDD835'],
                  shadeIntensity: 1,
                  type: 'vertical',
                  opacityFrom: 1,
                  opacityTo: 1,
                  stops: [0, 100, 100, 100]
                },
              },
              stroke: {
                width: 2,
                curve: 'smooth'
              },
            yaxis: {
                title: {
                  text: 'Price - USD',
                  style: {
                    fontSize: "16px",
                    color: '#0000ff',
                }
                }
              },
            title: {
              text: 'Current Crude Oil Indicator Price',
              align: 'center',
              style: {
                fontSize: "16px",
                color: '#0000ff',
            }
            },
            markers: {
                size: 5
              },
      },
      series: [{
            name: 'Oil Price',
            data: []
          }],
};


const getters = {
    GetChartData:state=>{
        return state.chartOptions
    },
    GetChartSeries:state=>{
        return state.series
    },
    GetDates:state=>{
        return state.Dates
    },
    GetPrices:state=>{
        return state.Prices
    },
    GetCurrentPrice:state=> {
        return state.Prices[state.Prices.length-1]
    },
    GetCurrentDate:state=>{
        return state.Dates[state.Dates.length-1]
    },
    GetLastMessage:state=>{
        return state.Messages[state.Messages.length-1]
    },
    GetAllMessages: state=>{
        return state.Messages
    },
    GetPriceChange: state=>{
        return state.priceChange
    }
}
const mutations = {
    SetPriceChangeValue(state, payload){
        state.priceChange = payload
    },
    GetPriceData(state, payload){
        let val = state.priceCount + 2
        console.log(payload.price);
        if(val < payload[0].data.length)
        {
            for (let index = state.priceCount; index <= val && state.priceCount < payload[0].data.length; index++) {
            
                if (Math.abs(state.currentPrice - payload[0].data[index][1]) >= state.priceChange) {
                    console.log(state.currentPrice)
                    console.log(payload[0].data[index][1])
                    state.currentPrice = payload[0].data[index][1]
                }
                state.Prices.push(parseFloat(payload[0].data[index][1]).toFixed(2))
                state.Dates.push(payload[0].data[index][0])
                state.priceCount++;
            }
            if (state.Messages[state.Messages.length-1] != `Today's oil Price is $${state.currentPrice}`)
            {
                state.Messages.push(`Today's oil Price is $${state.currentPrice}`)
            }
            state.chartOptions = {...state.chartOptions, xaxis: {...state.chartOptions.xaxis, categories: state.Dates}}
            state.series = [{...state.series, data: state.Prices}]
            console.log(state.chartOptions)
            console.log(state.series)
        }
    }
}
const actions = {
    async RealTimeData({commit}){
        await axios.request(options)
        .then((response)=> commit('GetPriceData', response.data.series))
        .catch((e)=>console.log("Errors:",e));

    },
    SetPriceChange({commit}, payload){
        commit('SetPriceChangeValue', payload)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}