var tips = document.getElementsByTagName('p'); 
var password = document.getElementsByName('password');
var input = document.getElementsByTagName('input'); 
var check= new Array(5);
function getStrLength(str){
		var cStr = str.match(/[^\x00-\xff]/ig);
		return str.length + (cStr == null?0 :cStr.length);
}

function rule_tip(thisform){
		switch (thisform.name){
			case "character": tips[0].style.visibility = "visible"; break;
			case "password" : tips[1].style.visibility = "visible"; break;
			case "password_affirm" : tips[2].style.visibility = "visible"; break;
			case "email" : tips[3].style.visibility = "visible"; break;
			case "phone" : tips[4].style.visibility = "visible"; break;
		}
}

function validate_form(field){
	with(field){
		console.log(typeof field);
		console.log(typeof tips[0]);
		console.log(typeof field.nextSibling);
		console.log(field.nextSibling);
		console.log(tips[0]);
	    if (value=='null'||value=='') {
	    	//文本信息也是一个节点，是节点类型包括标签、文本
			field.nextSibling.nextSibling.innerHTML = "此选项不能为空";
			check[0] = false;
			return false;
		}else if(getStrLength(value)<4 || getStrLength(value)>16){
			    field.nextSibling.nextSibling.innerHTML = "请输入4-16个字符，您输入了"+getStrLength(value)+"个字符"; 
                //field.disable = true;
                check[0] = false;
				return false;
		}else {
				field.nextSibling.nextSibling.innerHTML = "格式正确";
				check[0] = true;
				input[1].focus();
				return true;
		}		
	}
}

function validate_pass(field){
	with(field){
		if(value.match(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/)){
			field.nextSibling.nextSibling.innerHTML = "格式正确";
			check[1] = true;
			input[2].focus();
			return true;
		}else {
			field.nextSibling.nextSibling.innerHTML = "请输入6-10个数字和字母，您输入了"+getStrLength(value)+"个字符";
			check[1] = false;
			return false;
		}
	}
}

function validate_pass_affirm(field){
	with(field){
		if(value!=password[0].value){
			field.nextSibling.nextSibling.innerHTML = "密码输入错误";
			check[2] = false;
			return false;
		}else {
			field.nextSibling.nextSibling.innerHTML = "输入正确";
			check[2] = true;
			input[3].focus();
			return true;
		}
	}
}

function validate_email(field){
	with(field){
		apos=value.indexOf("@");
		dotpos=value.lastIndexOf(".");
		if (value=='null'||value=='') {
			field.nextSibling.nextSibling.innerHTML = "未输入邮箱";
		}else if (apos<1||dotpos-apos<2)  {
			field.nextSibling.nextSibling.innerHTML = "邮箱格式错误";
			check[3] = false;
			return false;
		}else {
			field.nextSibling.nextSibling.innerHTML = "输入正确";
			check[3] = true;
			input[4].focus();
			return true;
		}
	}
}

function validate_phone(field){
	with(field){
		if (value=='null'||value=='') {
	    	//文本信息也是一个节点，是节点类型包括标签、文本
			field.nextSibling.nextSibling.innerHTML = "此选项不能为空";
			check[4] = false;
			return false;
		}else if(getStrLength(value)!=11){
			    field.nextSibling.nextSibling.innerHTML = "输入错误";
			    check[4] = false;
				return false;
		}else {
				field.nextSibling.nextSibling.innerHTML = "格式正确";
				check[4] = true;
				return true;
		}		
	}
}

function do_check(){
	var flag = 0;
	for(var i=0;i<5;i++){
		if(check[i]==true){
			flag += 1;
		}		
	}
	if (flag==5) {
		return true;
	}else {
		alert("输入错误");
		return false; 
    }
}    

// 点击回车以后，先执行alert，说明先执行=9，但是并没有用？？！
function to_next(form){
	if(window.event.keyCode == 13){
		window.event.keyCode = 9;
	}else return false;
}