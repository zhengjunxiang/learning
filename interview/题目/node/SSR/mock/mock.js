const fs = require('fs');
const path = require('path');

let dataCache = null;

function loadData() {
  if(!dataCache) {
    const file = path.resolve(__dirname, './data.json');
    const data = JSON.parse(fs.readFileSync(file, {encoding: 'utf-8'}));
    const reports = data.dailyReports; // 数组格式的数据
    dataCache = {};
    // 把数组数据转换成以日期为key的JSON格式并缓存起来
    reports.forEach((report) => {
      dataCache[report.updatedDate] = report;
    });
  }
  return dataCache;
}

function getCoronavirusByDate(date){
    const dailyData=loadData()[date] || {}
    if(dailyData.countries){
        dailyData.countries.sort((a,b)=>{
            return b.confirmed - a.confirmed
        })
    }
    return dailyData
}

function getCoronavirusKeyIndex(){
    return Object.keys(loadData())
}

module.exports={
    getCoronavirusByDate,
    getCoronavirusKeyIndex
}
