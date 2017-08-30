/*
  能少用变量就少用变量，模块化编程出错几率更小
*/
function toggleTable(){
    //让表格和button 消失
    $("#tab_logic, #add_row_link, #delete_row_link").toggle();
    // $("#add_more_link").toggleClass("changeButton");
    if($("#add_more_link").data("flag") != 1){
      $("#add_more_link").text("键值增加参数");
      $("#add_more_link").data("flag",1);
      $("#add_more_link").removeClass("margin-left");
    }else{
      $("#add_more_link").text("批量增加JSON参数");
        $("#add_more_link").data("flag",0);
        $("#add_more_link").addClass("margin-left");
    }

    $("#bulkAddDiv").toggleClass('hidden');
}

function addRow(){
  var numberOfRows = $("#addLine").find("tr").length+1;
    var content = $("#addLine").append([
      '<tr id="id'+ numberOfRows + '">',
        '<td><label class="label-control"><span class="padding-right">'+ numberOfRows + '</span><input type="checkbox" value="false"></label></td>',
        '<td><input type="text" class="form-control" placeholder="参数名称"></td>',
        '<td><input type="text" class="form-control" placeholder="输入你的参数"></td></tr>'
    ].join(""));
    $("#id"+numberOfRows).find("td:nth-child(3)").on('keypress',function(e){
  		if (e.which == 13) {
  			addRow();
  		}
  	});
}

function deleteRow(){
    $("input[type='checkbox']:checked").parents("tr").remove();
    update();
}

function update(){
    $.each($("tr[id^='id']>td:first-child"),function(index){
      // console.log($(this).html());
      $(this).find(".padding-right").text(index+1);
    });
}
