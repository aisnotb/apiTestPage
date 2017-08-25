function toggleTable(){
  //让表格和button 消失
    $("#tab_logic, #add_row_link, #delete_row_link").toggle();
    $("#add_more_link").toggleClass("changeButton");
    $("#add_more_link").text("键值对增加请求参数");

    $("#add_more_link").toggleClass("margin-left");
}

function addRow(){
  var numberOfRows = $("#addLine").find("tr").length+1;
    var content = $("#addLine").append([
      '<tr id="id">',
        '<td><label class="label-control"><span class="padding-right">'+ numberOfRows + '</span><input type="checkbox" value="false"></label></td>',
        '<td><input type="text" class="form-control" placeholder="参数名称"></td>',
        '<td><input type="text" class="form-control" placeholder="输入你的参数"></td></tr>'
    ].join(""));
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

//能少用变量就少用变量，模块化编程出错几率更小
