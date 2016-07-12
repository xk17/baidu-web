$ = function(el){
	return document.querySelector(el);
}
$$ = function(el){
	return document.querySelectorAll(el);
}
function selectIdentify(){
	if($('#in_school').checked){
		$('#school_identified').className='show';
		$('#outschool_identified').className = 'hide';
	}else{
		$('#school_identified').className = 'hide';
		$('#outschool_identified').className = 'show';
	}
}


// 对象由{} 表示，数组由[]表示
var options = [
	BJ={
	text: ["北京邮电大学","北京大学"],
	value: ["BY","BD"]
	},
	SH={
	text: ["上海大学","上海交通大学","同济大学"],
	value: ["SD","SJ","TJ"]
	},
	HZ={
	text: ["杭州电子科技大学"],
	value: ["HD"]
	}
];
var objOption;
function changeCity(){
	var selected = $('#city').selectedIndex;
	$('#school').innerHTML = null;
	for (var i = 0; i < options[selected].value.length; i++) {
		objOption = document.createElement("option");
	    objOption.text = options[selected].text[i];
		objOption.value = options[selected].value[i];
		$('#school').add(objOption);
	}
}

$('#city').addEventListener("change",function(){
	changeCity();
	});
$('#select_identify').addEventListener("change", function(){
	selectIdentify();
});
// 
// var option;
// var optionsBJ = {
// 	text: ["北京邮电大学","北京大学"],
// 	value: ["BY","BD"]
// 	};
// var optionsSH = {
// 	text: ["上海大学","上海交通大学"],
// 	value: ["SD","SJ"]
// 	};


// function changeCity(){
// 	$('#school').innerHTML = null;
// 	if ($('#city').value== "BJ") {
// 		for (var i = 0; i < optionsBJ.text.length; i++) {
// 			objOption = document.createElement("option");
// 			objOption.text = optionsBJ.text[i];
// 			objOption.value = optionsBJ.value[i];
// 			$('#school').add(objOption);
// 		}
// 	}else if($('#city').value == "SH") {
// 		for (var i = 0; i < optionsSH.text.length; i++) {
// 			objOption = document.createElement("option");
// 			objOption.text = optionsSH.text[i];
// 			objOption.value = optionsSH.value[i];
// 			$('#school').add(objOption);
// 		}
// 	}
// }

