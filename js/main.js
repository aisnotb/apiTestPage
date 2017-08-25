$(document).ready(function(){
	var ele = "";
	$("#sendButton").on('click', function(){
			var url = "platform:system-gettime";
			var localData = "test2.json";
			call(url,renderDiv, {}, localData);
	});

	function processObject(item, obj){
		if(obj instanceof Array){
				//deal with array
				ele += "<p>" + "[" + "</p>";
				for (var i = 0; i < obj.length; i++) {
					//consider array contains array
					if (typeof(obj[i]) != 'object' ) {
							ele +="<p>" + obj[i] + '' + "</p>";
					}else {
						processObject('', obj[i]);
					}
				}
				ele += "<p>" + "]" + "</p>";
		}else if(typeof(obj) == 'object') {
			//if this property is a object
			ele += "<p>" + item + " {"+ "</p>";
			for(var item in obj){
				 if(typeof(obj[item])!='object' || obj[item] == null){
					 	ele+="<p>" + item + ":" + obj[item] + "</p>";
				 }else{
					 	processObject(item,obj[item]);
				 }
			}
			ele+= "<p>" + "}"　+ "</p>";
 		}
	}

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

})
