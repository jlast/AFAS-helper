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
	
	var events = DeserializeEvents();
	
	code += "$('#P_C_W_Entry_Selection_E7_ButtonEntryWebPart_Select_E7').click();"
	code += "var $wc_entry;"
	code += "var $wc_projectEdit;"
	code += "var $wc_date;"
	code += "var $wc_start;"
	code += "var $wc_end;"
	code += "var $wc_articleEdit;"
	code += "var $wc_descriptionEdit;"
	code += "var $newrowbutton = $('#P_C_W_Entry_Detail_E3_ImageEntryWebPart_AddRow_E3');"
	code += "var $projectdescription;"
	code += "var $articledescription;"
	code += "var intimeout = false;"
	code += "var descriptionedit = false;"
	code += "var descriptiontobe='';"
	code += "var datestring='';"
	code += "var actions = ["
	for(var i = 0; i < events.length; i++)
	{
		var date = new Date(Date.parse(events[i].start));
		var enddate = new Date(Date.parse(events[i].end));
		code += "function(){"
		code += "	datestring = '" + date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + "';"
		code += "	$wc_entry = $('#P_C_W_Entry_Detail_EditGrid_EditRow');"
		code += "	$wc_date = $wc_entry.find('#P_C_W_Entry_Detail_EditGrid_re_DaTi input');"
		code += "	$wc_start = $wc_entry.find('#P_C_W_Entry_Detail_EditGrid_re_StTi input');"
		code += "	$wc_end = $wc_entry.find('#P_C_W_Entry_Detail_EditGrid_re_EnTi input');"
		code += "	$wc_projectEdit = $wc_entry.find('#P_C_W_Entry_Detail_EditGrid_re_PrId input');"
		code += "	$wc_articleEdit = $wc_entry.find('#P_C_W_Entry_Detail_EditGrid_re_BiId input');"
		code += "	$wc_descriptionEdit = $wc_entry.find('#P_C_W_Entry_Detail_EditGrid_re_Ds input');"
		code += "	$wc_date.val(datestring);"
		code += "	$wc_date.focus();"
		code += "	$wc_date.keydown();"
		code += "	$wc_date.keyup();"
		code += "	$wc_date.change();"
		code += "	$wc_date.blur();"
		code += "	$wc_start.val('" + date.getHours() + ":" + date.getMinutes() + "');"
		code += "	$wc_start.focus();"
		code += "	$wc_start.keydown();"
		code += "	$wc_start.keyup();"
		code += "	$wc_start.change();"
		code += "	$wc_start.blur();"
		code += "	$wc_end.val('" + enddate.getHours() + ":" + enddate.getMinutes() + "');"
		code += "	$wc_end.focus();"
		code += "	$wc_end.keydown();"
		code += "	$wc_end.keyup();"
		code += "	$wc_end.change();"
		code += "	$wc_end.blur();"
		code += "	$wc_projectEdit.val('" + events[i].project + "');"
		code += "	$wc_projectEdit.focus();"
		code += "	$wc_projectEdit.keydown();"
		code += "	$wc_projectEdit.keyup();"
		code += "	$wc_projectEdit.change();"
		code += "	$wc_projectEdit.blur();"
		code += "	$wc_articleEdit.val('" + events[i].article + "');"
		code += "	$wc_articleEdit.focus();"
		code += "	$wc_articleEdit.keydown();"
		code += "	$wc_articleEdit.keyup();"
		code += "	$wc_articleEdit.change();"
		code += "	$wc_articleEdit.blur();"
		code += "	descriptiontobe='" + events[i].title + "';"
		code += "	$projectdescription = $wc_entry.find('#P_C_W_Entry_Detail_EditGrid_re_LAY_PtPrj_Ds input');"
		code += "	$articledescription = $wc_entry.find('#P_C_W_Entry_Detail_EditGrid_re_LAY_FbBit_Ds input');"
		code += "	intimeout = false;"
		code += "	advance();"
		code += "},"
		code += "function(){"
		code += "	intimeout = true;"
		code += "	setTimeout(advance, 250);"
		code += "},"
		code += "function(){"
		code += "	descriptionedit = false;"
		code += "	$wc_descriptionEdit.val(descriptiontobe);"
		code += "	$wc_descriptionEdit.focus();"
		code += "	$wc_descriptionEdit.keydown();"
		code += "	$wc_descriptionEdit.keyup();"
		code += "	$wc_descriptionEdit.change();"
		code += "	$wc_descriptionEdit.blur();"
		code += "	advance();"
		code += "},"
		code += "function(){"
		code += "	intimeout = true;"
		code += "	setTimeout(advance, 250);"
		code += "},"
		code += "function(){"
		code += "	descriptiontobe='';"
		code += "	descriptionedit = false;"
		code += "	$newrowbutton.click();"
		code += "	intimeout = false;"
		code += "	advance();"
		code += "},"
	}
	code += "];"
	code += "function advance() {"
	code += "	if(intimeout){"
	code += "		if(descriptionedit){"
	code += "			if($wc_descriptionEdit.val() != descriptiontobe){"
	code += "				if(actions.length > 0){actions[0]();}"
	code += "			}"
	code += "			else{"
	code += "				actions.shift();"
	code += "				if(actions.length > 0){actions[0]();}"
	code += "			}"
	code += "		}else{"
	code += "			if($projectdescription.val() == '' || $articledescription.val() == ''){"
	code += "				if(actions.length > 0){actions[0]();}"
	code += "			}else{"
	code += "				actions.shift();"
	code += "				if(actions.length > 0){actions[0]();}"
	code += "			}"
	code += "		}"
	code += "	}else{"
	code += "		actions.shift();"
	code += "		if(actions.length > 0){actions[0]();}"
	code += "	}"
	code += "}"
	code += "actions[0]();"
	
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