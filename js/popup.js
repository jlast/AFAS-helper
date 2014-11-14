if(typeof $ != "undefined")
{
	$(document).ready(function() {
		$("#import").click(function(){
			exportEvents();
		});
	});
}

function exportEvents()
{
	var events = DeserializeEvents();
	
	var code = "";
	
	code += "var $wc_entry = $('#P_C_W_Entry_Detail_EditGrid_EditRow');";
	code += "var $wc_projectEdit = $wc_entry.find('#P_C_W_Entry_Detail_EditGrid_re_PrId input');";
	code += "$wc_projectEdit.val('" + events[0].project + "');";
	code += "$wc_projectEdit.change();";
	code += "var $wc_articleEdit = $wc_entry.find('#P_C_W_Entry_Detail_EditGrid_re_BiId input');";
	code += "$wc_articleEdit.val('" + events[0].article + "');";
	code += "$wc_articleEdit.change();";
	code += "var $wc_descriptionEdit = $wc_entry.find('#P_C_W_Entry_Detail_EditGrid_re_Ds input');";
	code += "$wc_descriptionEdit.val('" + events[0].title + "');";
	
	chrome.tabs.getSelected(null, function(tab){
		chrome.tabs.executeScript(tab.id, {file: "js/libs/jquery-1.4.4.min.js"}, function(){
			chrome.tabs.executeScript(tab.id, {code: code});
		});
	});
}