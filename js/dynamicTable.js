function addRow(){
  var numberOfRows = $("#addLine").find("tr").length+1;
  console.log($("#addLine").find("tr").length);
    var content = $("#addLine").append([
      '<tr id="id">'+numberOfRows,
        '<td><span class="tdIndex">'+ numberOfRows + '</span><input type="checkbox" value="false"></td>',
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
      console.log($(this).html());
      $(this).find(".tdIndex").text(index+1);
    });
}
