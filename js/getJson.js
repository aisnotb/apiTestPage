function genarateHearder(){
	return null;
};
function call(url,callback,data,localData,params,async,isDiffer,type){
	var options = {
		debug:true,
	}
	//params : callback 的携带参数
	var settings = {
		url : "",
		data : null,
		callback : function(){},
		isDiffer : false,
		type : "get",
		async : true,
		localData : "",
		params : null
	};

	var isApi = false;

	if($.isPlainObject(url)){
		$.extend(settings,url);
	}else if(url != null){
		if(url.indexOf(":")<0){
			settings.url = url;
		}else{
			isApi = true;
			settings.url = "/api";
		}

	}else{
		return;
	}
	if(callback != null){
		if(!$.isFunction(callback)){
			alert("callback is not a function!");
			return;
		}
		settings.callback = callback;
	}

	if(data != null)
		settings.data = data;
	if(localData != null)
		settings.localData = localData;
	if(params != null)
		settings.params = params;
	if(async != null)
		settings.async = async;
	if(isDiffer != null)
		settings.isDiffer = isDiffer;
	if(type != null)
		settings.type = type;

	if(!$.isPlainObject(settings.data)){
		settings.data = JSON.parse(settings.data);
	}

	if(isApi){
		var paramData = {};
		if(settings.data != null){
			paramData = settings.data;
		}
		paramData.cmd = url;
		settings.data = paramData;
	}
	//alert(options.debug ? settings.localData : settings.url);
	$.ajax({
		async: settings.async,
		type: settings.type,
		url: options.debug ? settings.localData : settings.url,
		dataType: settings.isDiffer ? "jsonp" : "json",
		data: settings.data,
		headers : genarateHearder(),
		success: function(result){
			if(result.success){
				callback(result.data,settings.params);
			}
		},
		error: function(data){
		 alert(JSON.stringify(data));
		}
	});
}
