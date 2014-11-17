var _gaq = _gaq || [];
if (typeof $ != 'undefined') {
    $(document).ready(function() {
        $('#import').click(function(event) {
			event.preventDefault();
			exportEvents();
		});
		  _gaq.push(['_setAccount', 'UA-24278616-2']);
		  _gaq.push(['_setDomainName', 'none']);

		  _gaq.push(['_trackPageview']);

		  (function() {
			var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
			ga.src = '/js/analytics.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		  })();
    });
}

function exportEvents() {
    var code = "";
    var events = Calendar.DeserializeEvents();

    code += "$('#P_C_W_Entry_Selection_E7_ButtonEntryWebPart_Select_E7').click(); " + 
    "var $wc_entry; " + 
    "var $wc_projectEdit; " + 
    "var $wc_date; " + 
    "var $wc_start; " + 
    "var $wc_end; " + 
    "var $wc_articleEdit; " + 
    "var $wc_descriptionEdit; " + 
    "var $newrowbutton = $('#P_C_W_Entry_Detail_E3_ImageEntryWebPart_AddRow_E3'); " + 
    "var $projectdescription; " + 
    "var $articledescription; " + 
    "var intimeout = false; " + 
    "var descriptionedit = false; " + 
    "var descriptiontobe=''; " + 
    "var datestring=''; " + 
	"var weeknumberafas = $('#P_C_W_Entry_Selection_PeId_MainControl').val(); " + 
    "var actions = [";
    for (var i = 0; i < events.length; i++) {
        var date = new Date(Date.parse(events[i].start));
        var enddate = new Date(Date.parse(events[i].end));
		var weeknumber = date.getWeekNumber();
        code += "function(){ " + 
		 "if('" + weeknumber + "' === weeknumberafas){ " + 
        	"datestring = '" + date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + "'; " + 
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
        	"$wc_start.val('" + date.getHours() + ":" + date.getMinutes() + "'); " + 
        	"$wc_start.focus(); " + 
        	"$wc_start.keydown(); " + 
        	"$wc_start.keyup(); " + 
        	"$wc_start.change(); " + 
        	"$wc_start.blur(); " + 
        	"$wc_end.val('" + enddate.getHours() + ":" + enddate.getMinutes() + "'); " + 
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
        	"intimeout = false; " + 
        	"advance(); " + 
		"} " + 
		"else { advance() }" +
        "},"
		code += "function(){ " + 
		 "if('" + weeknumber + "' === weeknumberafas){ " + 
        	"intimeout = true; " + 
        	"setTimeout(advance, 250); " + 
		"} " + 
		"else { advance() }" +
        "}, " + 
        "function(){ " + 
		 "if('" + weeknumber + "'  === weeknumberafas){ " + 
        	"descriptionedit = false; " + 
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
        "},"
		code += "function(){ " + 
		 "if('" + weeknumber + "'  === weeknumberafas){ " + 
        	"descriptiontobe=''; " + 
        	"descriptionedit = false; " + 
        	"$newrowbutton.click(); " + 
        	"intimeout = false; " + 
        	"advance(); " + 
		"} " + 
		"else { advance() }" +
        "},"
    }
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