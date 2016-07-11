/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
//返回几个数呢？
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {     //91天，13周   利用循环得到91天的键值对
    datStr = getDateStr(dat);   //将日期变为字符串形式，
    returnData[datStr] = Math.ceil(Math.random() * seed);   //向上取整
    dat.setDate(dat.getDate() + 1);  //dat为横坐标日期
  }
  return returnData;   //是一个键值对，横坐标为datStr(字符串形式)为键，纵坐标为随机数（整数）
}

/* chartData = 
   returnData = {
  2016-01-01: 随机数；
  2016-01-02：随机数；
   }

 */

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: 0,
  nowGraTime: "day"
}

//绑定事件函数
function on(obj,eventName,handler){
  if(obj.addEventListener){
     obj.addEventListener(eventName,handler,false);
   }else if(obj.attachEvent){
     obj.attachEvent('on'+eventName,handler);
   }else {
    obj['on'+eventName] = handler;
   }
 // try{  // Chrome、FireFox、Opera、Safari、IE9.0及其以上版本
 //   obj.addEventListener(eventName,handler,false);
 // }catch(e){
 //  try{  // IE8.0及其以下版本
 //    obj.attachEvent('on'+eventName,handler);
 //  }catch(e){   // 早期浏览器
 //    obj['on'+eventName] = handler;
 //  }
 // }
}

var citySelect = document.getElementById('city-select');
var aqiChart = document.getElementById('aqi-chart-wrap');
/**
 * 渲染图表
 */
function renderChart() {
  
  //rgb(234,255,255);
  var color = {};
  var content = "";
  for(var key in chartData){
    color = 'rgb('+parseInt(255*Math.random())+','+parseInt(255*Math.random())+','+
               parseInt(255*Math.random())+')';
    content += "<div class='chart-item' style='height:"+chartData[key]+"px;background-color:"+color+";'></div>"

  }
  aqiChart.innerHTML = content;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  var graTime = document.getElementByTagName('input');
  for(var i=0;i<graTime.length;i++){
    if(graTime[i].checked&&graTime.value!=pageState.nowGraTime){
      pageState.nowGraTime = graTime[i].value;
    }
  }
  // 设置对应数据 根据nowGratime


  
  // 调用图表渲染函数
  renderChart();
}


/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化
    if(citySelect.selectedIndex!=pageState.nowSelectCity){
       pageState.nowSelectCity = citySelect.selectedIndex;
    } 
      
  // 设置对应数据 根据nowSelectCity
   var keyName = [];
   for(keyName[keyName.length] in aqiSourceData); //将aqiAourceData的键名存放到keyName中
    /* keyName = {北京，上海，广州...} */
   
   chartData = aqiSourceData[keyName[pageState.nowSelectCity]];   //aqiSourceData(广州)啥都不是
   //for(var i=0;i<keyName.length;i++){
    document.write(keyName[pageState.nowSelectCity]);
   //}
  // 调用图表渲染函数
   renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var time = document.getElementById('form-gra-time');
  on(time,'click',graTimeChange);
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  //<option>北京</option>
  var content='';
  for(var key in aqiSourceData){
     content += "<option>"+key+"</option>";
  }  
  citySelect.innerHTML =  content;
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  
  on(citySelect,'change',citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式         初始化为北京、天
  /*chartData = {
    2016-01-01:随机数；
    2016-01-02:随机数；
    ...
  }
   或charData = {
  "第几周"：sum（随机数）/7
   }
   或charData = {
  "第几月"：sum（随机数）/30
   }
  */
  for(var key in aqiSourceData) {
    chartData = aqiSourceData[key];
    
  }
    document.write(chartData);
  // 处理好的数据存到 chartData 中
  renderChart();
  
}

/**
 * 初始化函数
 */
function init() {
  
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
  
  

}

init();
