$(document).ready(function(){

	//hide this textarea
	$("#RawJson").hide();

	var ele = "";
	$("#sendButton").on('click', function(){
			var url = "platform:system-gettime";
			var localData = "test2.json";
			call(url,renderDiv, {}, localData);
	});

	// function processObject(item, obj){
	// 	if(obj instanceof Array){
	// 			//deal with array
	// 			ele += "<p>" + "[" + "</p>";
	// 			for (var i = 0; i < obj.length; i++) {
	// 				//consider array contains array
	// 				if (typeof(obj[i]) != 'object' ) {
	// 						ele +="<p>" + obj[i] + '' + "</p>";
	// 				}else {
	// 					processObject('', obj[i]);
	// 				}
	// 			}
	// 			ele += "<p>" + "]" + "</p>";
	// 	}else if(typeof(obj) == 'object') {
	// 		//if this property is a object
	// 		ele += "<p>" + item + " {"+ "</p>";
	// 		for(var item in obj){
	// 			 if(typeof(obj[item])!='object' || obj[item] == null){
	// 				 	ele+="<p>" + item + ":" + obj[item] + "</p>";
	// 			 }else{
	// 				 	processObject(item,obj[item]);
	// 			 }
	// 		}
	// 		ele+= "<p>" + "}"　+ "</p>";
 // 		}
	// }

	function renderDiv(res){
		// var json = JSON.stringify(res);
		console.log(res);
		Process();
	};

	$("#add_row_link").on('click', function(){
			addRow();
	});

	$("#delete_row_link").on('click', function(){
			deleteRow();
	});

	$("#add_more_link").on('click', function(){
		//点击按钮时候1 要隐藏表格 2 要隐藏add 和delete button
		//再次点击的时候需要 恢复 这两个组件
			toggleTable();
			$("#buttons").toggle();
			$("#buttons").toggleClass();
	});

})
