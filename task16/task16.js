

/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = [];
var regCity = /^[\u4e00-\u9fa5a-zA-Z]+$/;
var regData = /^[\d]+$/;
var trim = function(str){
	return str.replace(/\s+/g,'');
}
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
  var city = trim(document.getElementById('aqi-city-input').value);
  var aqi = trim(document.getElementById('aqi-value-input').value);
  //应用正则表达式的test方法匹配字符串，并去掉city和aqi的空格
  if (!regCity.test(city)){
  	alert("城市的名称必须为中英文字符");
  }else if(!regData.test(aqi)) {
  	alert("空气质量必须为整数");
  }else {
    aqiData[city] = aqi;
  }
  
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
var tb = document.getElementById("aqi-table");
var content = [];
var contentTitle = "<tr><td>"+"城市"+"</td><td>"+"空气质量"+"</td><td>"+"操作"+"</td></tr>";
//使用数组的键值对及此种for循环可以避免重复输入相同的数据，比利用array.push（data）更省内存
for(var key in aqiData){
	content += "<tr><td>"+key+"</td><td>"+aqiData[key]+"</td><td>"+"<button>删除</button>"+"</td></tr>";
}
              

tb.innerHTML = contentTitle + content;    

}
/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(e) {
  // 利用DOM元素节点，e.target代表捕捉到的点击对象，即<button>
  var delCity = e.target.parentNode.parentNode.firstChild.innerHTML;
  delete aqiData[delCity];
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  var add_btnElem = document.getElementById("add-btn");
  add_btnElem.addEventListener('click',addBtnHandle);

  var aqi_tableElem = document.getElementById("aqi-table");
  aqi_tableElem.addEventListener('click',delBtnHandle);

}
//未使用window.load，将script在html文件中放在</body>的前边，将元素先加载完毕后，才能捕捉到按键DOM结点。
init();