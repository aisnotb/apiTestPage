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
		//visited
		setValue();
	}else{
		alert('your browser does not support session storage, your data maybe lost!');
	}

	//on form change populate data into memory
	$("#chooseType").on('click', function(){
		 console.log("HTTP method changed");
	});

	$("#urlAddress, #addLine").on('change', function(){
		populateStorage();
	});

function setValue(){
	var httpMethod = sessionStorage.getItem('httpMethod');
	console.log("HTTP method is :" + httpMethod);
	var inputAddress = sessionStorage.getItem('inputAddress');
	$('#chooseType').text(  (httpMethod == "" || "null") ? "GET" : httpMethod) ;
	$('#urlAddress').text(  (inputAddress == "" || "null") ? inputAddress : "") ;
  var values = sessionStorage.getItem("values");
	console.log(values);
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
	sessionStorage.setItem('httpMethod', $("#chooseType").text());
	sessionStorage.setItem('inputAddress', $.trim( $("#urlAddress").val() ));

	var rowArr = $("#addLine tr");
	var valueArray = [];
	$.each(rowArr, function(){
		var input = $(this).find("input.form-control");
		var key = $.trim( $(input[0]).val());
		var value = $.trim( $(input[1]).val() );
		valueArray.push({"key":key,"value":value});
		// sessionStorage.setItem("abc", {"key": "values"});
	})
	sessionStorage.setItem("values", JSON.stringify( valueArray ));
}

function deleteStorage(){
	sessionStorage.removeItem("values");
	var rowArr = $("#addLine tr");
	var valueArray = [];
	$.each(rowArr, function(){
		var input = $(this).find("input.form-control");
		var key = $.trim( $(input[0]).val());
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
			var localData = $("#urlAddress").val();
			var method =$('#chooseType').find("span").text();
			call(url,renderDiv, {}, localData,null,null,method);
	});

	//选择测试方式
	$(".urlType").on('click', function(){
		var method = $(this).find("span").text();
		if (method === 'POST') {
				$("#post_link").removeClass('hidden');
		}else{
			 $("#post_link").addClass('hidden');
		}
		$("#chooseType").text(method);
		sessionStorage.setItem('httpMethod', method);
	});

	function renderDiv(res){
		// var json = JSON.stringify(res);
		console.log(res);
		Process(res);
	};

	$("#add_row_link").on('click', function(){
			addRow();
	});

	$("#delete_row_link").on('click', function(){
			deleteRow();
			deleteStorage();
	});

	$("#add_more_link").on('click', function(){
			//点击按钮时候1 要隐藏表格 2 要隐藏add 和delete button
			//再次点击的时候需要 恢复 这两个组件
			toggleTable();
	});

	//enter keyevent
	$("#addLine tr").find("td:nth-child(3)").on('keypress',function(e){
		if (e.which == 13) {
			alert('you clicked on the second one');
			addRow();
		}
	});

	//open side navigation bar
	$("#menu-link").on('click', function(){
		$("#my-side-nav").css("width", "200px");
		// $("#my-side-nav").css("margin-right","20px");
		$(".container").css("margin-right","10px");
		$("#my-side-nav").css("margin-left", "5px");

		//animate the right half page
		$(".container").animate({
			"margin-right": "+=30",
		}, 1000, function(){
			console.log("openning side nav animation complete!");
		});
	});

	//close side nav
	$(".closebtn").on("click", function(){
		$(".container").css("margin-right","auto");
		$("#my-side-nav").css("width", "0px");
		$(".container").animate({
			"margin-left": "auto",
			"margin-right": "auto"
		},1000, function(){
			console.log("Closing nav animation complete!");
		})
	})
});
