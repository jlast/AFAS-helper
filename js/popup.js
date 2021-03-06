var page = 'weekcalendarpopuppixel';

if (typeof $ != 'undefined') {
    $(document).ready(function() {
        $('#import').click(function(event) {
			event.preventDefault();
			var category = 'button';
			var action = 'click';
			var label = $(this).text();
			TrackAnalytics(page, category, action, label);
			exportEvents();
		});
		BindAnalytics();
    });
}

function exportEvents() {
    var code = "";
    var events = Calendar.DeserializeEvents();

    code += "$('#P_C_W_Entry_Selection_E7_ButtonEntryWebPart_Select_E7').click(); " + 
    "var $wc_entry = $('#P_C_W_Entry_Detail_EditGrid_EditRow');" + 
    "var $wc_date; " + 
    "var $wc_start; " + 
    "var $wc_end; " + 
    "var $wc_projectEdit = $wc_entry.find('#P_C_W_Entry_Detail_EditGrid_re_PrId input'); " + 
    "var $wc_articleEdit = $wc_entry.find('#P_C_W_Entry_Detail_EditGrid_re_BiId input'); " + 
    "var $wc_descriptionEdit; " + 
    "var $newrowbutton = $('#P_C_W_Entry_Detail_E3_ImageEntryWebPart_AddRow_E3'); " + 
	"var $deleterowbutton = $('#P_C_W_Entry_Detail_E5_ButtonEntryWebPart_DeleteRow_E5'); " +
    "var $projectdescription; " + 
    "var $articledescription; " + 
    "var intimeout = false; " + 
    "var descriptionedit = false; " + 
	"var waitForNewLine = false; " +
    "var descriptiontobe=''; " + 
    "var datestring=''; " + 
	"var weeknumberafas = $('#P_C_W_Entry_Selection_PeId_MainControl').val(); " + 
    "var actions = [";
    for (var i = 0; i < events.length; i++) {
    	if(events[i].isregistered)
    	{
    		continue;
    	}

		var date = new Date(Date.parse(events[i].start));
		var enddate = new Date(Date.parse(events[i].end));
		var weeknumber = date.getWeekNumber();
		code += "function(){ " + 
		 "if('" + weeknumber + "' === weeknumberafas){ " + 
			"if($wc_projectEdit.val() !== '' && $wc_articleEdit !== ''){ $newrowbutton.click(); }" + 
			"datestring = '" + date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + "'; " + 
			"startdate = '" + date.getHours() + ":" + date.getMinutes() + "';" +
			"enddate = '" + enddate.getHours() + ":" + enddate.getMinutes() + "';" +
			"$wc_entry = $('#P_C_W_Entry_Detail_EditGrid_EditRow'); " + 
			"$wc_date = $wc_entry.find('#P_C_W_Entry_Detail_EditGrid_re_DaTi input'); " + 
			"$wc_start = $wc_entry.find('#P_C_W_Entry_Detail_EditGrid_re_StTi input'); " + 
			"$wc_end = $wc_entry.find('#P_C_W_Entry_Detail_EditGrid_re_EnTi input'); " + 
			"$wc_projectEdit = $wc_entry.find('#P_C_W_Entry_Detail_EditGrid_re_PrId input'); " + 
			"$wc_articleEdit = $wc_entry.find('#P_C_W_Entry_Detail_EditGrid_re_BiId input'); " + 
			"$wc_descriptionEdit = $wc_entry.find('#P_C_W_Entry_Detail_EditGrid_re_Ds input'); " + 
			"$wc_date.val(datestring); " + 
			"$wc_date.focus(); " + 
			"$wc_date.keydown(); " + 
			"$wc_date.keyup(); " + 
			"$wc_date.change(); " + 
			"$wc_date.blur(); " + 
			"$wc_start.val(startdate); " + 
			"$wc_start.focus(); " + 
			"$wc_start.keydown(); " + 
			"$wc_start.keyup(); " + 
			"$wc_start.change(); " + 
			"$wc_start.blur(); " + 
			"$wc_end.val(enddate); " + 
			"$wc_end.focus(); " + 
			"$wc_end.keydown(); " + 
			"$wc_end.keyup(); " + 
			"$wc_end.change(); " + 
			"$wc_end.blur(); " + 
			"$wc_projectEdit.val('" + events[i].project + "'); " + 
			"$wc_projectEdit.focus(); " + 
			"$wc_projectEdit.keydown(); " + 
			"$wc_projectEdit.keyup(); " + 
			"$wc_projectEdit.change(); " + 
			"$wc_projectEdit.blur(); " + 
			"$wc_articleEdit.val('" + events[i].article + "'); " + 
			"$wc_articleEdit.focus(); " + 
			"$wc_articleEdit.keydown(); " + 
			"$wc_articleEdit.keyup(); " + 
			"$wc_articleEdit.change(); " + 
			"$wc_articleEdit.blur(); " + 
			"descriptiontobe='" + events[i].title + "'; " + 
			"$projectdescription = $wc_entry.find('#P_C_W_Entry_Detail_EditGrid_re_LAY_PtPrj_Ds input'); " + 
			"$articledescription = $wc_entry.find('#P_C_W_Entry_Detail_EditGrid_re_LAY_FbBit_Ds input'); " + 
			"waitForNewLine = false; " +
			"intimeout = false; " + 
			"advance(); " + 
		"} " + 
		"else { advance() }" +
		"}," +
		"function(){ " + 
		 "if('" + weeknumber + "' === weeknumberafas){ " + 
			"intimeout = true; " + 
			"setTimeout(advance, 250); " + 
		"} " + 
		"else { advance() }" +
		"}, " + 
		"function(){ " + 
		 "if('" + weeknumber + "'  === weeknumberafas){ " + 
			"descriptionedit = true; " + 
			"$wc_descriptionEdit.val(descriptiontobe); " + 
			"$wc_descriptionEdit.focus(); " + 
			"$wc_descriptionEdit.keydown(); " + 
			"$wc_descriptionEdit.keyup(); " + 
			"$wc_descriptionEdit.change(); " + 
			"$wc_descriptionEdit.blur(); " + 
			"advance(); " + 
		"} " + 
		"else { advance() }" +
		"}, " + 
		"function(){ " + 
		 "if('" + weeknumber + "'  === weeknumberafas){ " + 
			"intimeout = true; " + 
			"setTimeout(advance, 250); " + 
		"} " + 
		"else { advance() }" +
		"}," +
		"function(){ " + 
		 "if('" + weeknumber + "'  === weeknumberafas){ " + 
			"descriptiontobe=''; " + 
			"descriptionedit = false; " + 
			"intimeout = false; " + 
			"waitForNewLine = true; " + 
			"$newrowbutton.click();" +
			"advance(); " + 
		"} " + 
		"else { advance() }" +
		"}," +
		"function(){ " + 
		 "if('" + weeknumber + "'  === weeknumberafas){ " + 
			"intimeout = true; " +
			"setTimeout(advance, 250); " + 
		"} " + 
		"else { advance() }" +
		"},";
		events[i].isregistered = true;
    }
	//remove the last row, else you can't save
	code += "function(){$deleterowbutton.click(); }"
    code += "]; " + 
    "function advance() { " + 
    	"if(intimeout){ " + 
    		"if(descriptionedit){ " + 
    			"if($wc_descriptionEdit.val() != descriptiontobe){ " + 
    				"if(actions.length > 0){actions[0]();} " + 
    			"} " + 
    			"else{ " + 
    				"actions.shift(); " + 
    				"if(actions.length > 0){actions[0]();} " + 
    			"} " + 
    		"}else if(waitForNewLine){" +
				"if($projectdescription.val() != '' || $articledescription.val() != ''){" +
					"if(actions.length > 0){actions[0]();} " + 
				"}" +
    			"else{ " + 
    				"actions.shift(); " + 
    				"if(actions.length > 0){actions[0]();} " + 
    			"} " + 
			"}else{ " + 
    			"if($projectdescription.val() == '' || $articledescription.val() == ''){ " + 
    				"if(actions.length > 0){actions[0]();} " + 
    			"}else{ " + 
    				"actions.shift(); " + 
    				"if(actions.length > 0){actions[0]();} " + 
    			"} " + 
    		"} " + 
    	"}else{ " + 
    		"actions.shift(); " + 
    		"if(actions.length > 0){actions[0]();} " + 
    	"} " + 
    "} " + 
    "actions[0]();"

    Calendar.SerializeEvents(events);

    var script = "";
    script += "var s = document.createElement('script');";
    script += "s.textContent = \"" + code + "\";";
    script += "s.onload = function() {";
    script += "this.parentNode.removeChild(this);";
    script += "};";
    script += "document.head.appendChild(s);"

    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.executeScript(tab.id, {
            file: "js/libs/jquery-1.4.4.min.js"
        }, function() {
            chrome.tabs.executeScript(tab.id, {
                code: script
            });
        });
    });
}