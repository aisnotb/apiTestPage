$(document).ready(function(){
	//check availbility of the session storage
	function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}

if(storageAvailable('sessionStorage')){
	// visited
	setValue();
}else{
	alert('your browser does not support session storage, your data maybe lost!');
}

//on form change populate data into memory
$("#urlAddress, #addLine").on('change', function(){
		populateStorage();
});

function setValue(){
	var httpMethod = sessionStorage.getItem('httpMethod');
	var inputAddress = sessionStorage.getItem('inputAddress');
	$('#chooseType').text(  (httpMethod == ""|| "null") ? "GET" : httpMethod) ;
	$('#urlAddress').text(  (inputAddress == ""|| "null") ? inputAddress : "") ;
  var values = sessionStorage.getItem("values");
	if(values && values.length>0){
		var item = JSON.parse(values);
		var rowArr = $("#addLine");
		var input = rowArr.find("input.form-control");
		$(input[0]).val(item[0].key);
		$(input[1]).val(item[0].value);
			for(var i=1;i<item.length;i++){
					rowArr.append([
			      '<tr id="id'+ (i+1) + '">',
			        '<td><label class="label-control"><span class="padding-right">'+ (i+1) + '</span><input type="checkbox" value="false"></label></td>',
			        '<td><input type="text" class="form-control" placeholder="参数名称" value="'+item[i].key+'"></td>',
			        '<td><input type="text" class="form-control" placeholder="输入你的参数" value="'+item[i].value+'"></td></tr>'
			    ].join(""));
			};
	}
}

function populateStorage(){
	//{"httpMethod":"","inputAddress":"","values":[{"key":"","value":""},{"key":"","value":""},{"key":"","value":""}]}
	// sessionStorage.clear();
	// console.log($.trim( $("#chooseType").text() ));
	// console.log(sessionStorage);
	// return;
	sessionStorage.setItem('httpMethod', $("#chooseType").text());
	sessionStorage.setItem('inputAddress', $.trim( $("#urlAddress").val() ));

	var rowArr = $("#addLine tr");
	var valueArray = [];
	$.each(rowArr, function(){
		var input = $(this).find("input.form-control");
		var key = $.trim( $(input[0]).val() );
		var value = $.trim( $(input[1]).val() );
		valueArray.push({"key":key,"value":value});
		// sessionStorage.setItem("abc", {"key": "values"});
	})
	sessionStorage.setItem("values", JSON.stringify( valueArray ));

}

	//hide this textarea
	$("#RawJson").hide();

	var ele = "";
	$("#sendButton").on('click', function(){
			var url = "platform:system-gettime";
			var localData = "test2.json";
			call(url,renderDiv, {}, localData);
	});

	//选择测试方式
	$(".urlType").on('click', function(){
		$("#chooseType").text( $(this).find("span").text() );
	});

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
	});
});
