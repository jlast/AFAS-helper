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
	
	code += "var $wc_entry;"
	code += "var $wc_projectEdit;"
	code += "var $wc_articleEdit;"
	code += "var $wc_descriptionEdit;"
	code += "var $newrowbutton = $('#P_C_W_Entry_Detail_E3_ImageEntryWebPart_AddRow_E3');"
	code += "var $projectdescription;"
	code += "var $articledescription;"
	for(var i = 0; i < events.length; i++)
	{
		code += "$wc_entry = $('#P_C_W_Entry_Detail_EditGrid_EditRow');";
		code += "$wc_projectEdit = $wc_entry.find('#P_C_W_Entry_Detail_EditGrid_re_PrId input');";
		code += "$wc_articleEdit = $wc_entry.find('#P_C_W_Entry_Detail_EditGrid_re_BiId input');";
		code += "$wc_descriptionEdit = $wc_entry.find('#P_C_W_Entry_Detail_EditGrid_re_Ds input');";
		code += "$wc_projectEdit.val('" + events[i].project + "');";
		code += "$wc_projectEdit.keyup();";
		code += "$wc_projectEdit.blur();";
		code += "$wc_projectEdit.change();";
		code += "$wc_articleEdit.val('" + events[i].article + "');";
		code += "$wc_articleEdit.keyup();";
		code += "$wc_articleEdit.blur();";
		code += "$wc_articleEdit.change();";
		code += "$wc_descriptionEdit.val('" + events[i].title + "');";
		code += "$projectdescription = $wc_entry.find('#P_C_W_Entry_Detail_EditGrid_re_LAY_PtPrj_Ds input');"
		code += "$articledescription = $wc_entry.find('#P_C_W_Entry_Detail_EditGrid_re_LAY_FbBit_Ds input');"
		//code += "while($projectdescription.val() == '' || $articledescription.val() == '');"
		code += "$newrowbutton.click();"
	}
	
	var script = "";
	script += "var s = document.createElement('script');";
	script += "s.textContent = \"" + code + "\";";
	script += "s.onload = function() {";
	script += "this.parentNode.removeChild(this);";
	script += "};";
	script += "document.head.appendChild(s);"
	
	chrome.tabs.getSelected(null, function(tab){
		chrome.tabs.executeScript(tab.id, {file: "js/libs/jquery-1.4.4.min.js"}, function(){
			chrome.tabs.executeScript(tab.id, {code: script});
		});
	});
}