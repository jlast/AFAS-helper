var year = new Date().getFullYear();
var month = new Date().getMonth();
var day = new Date().getDate();

var projecten = [];
if(typeof(localStorage["projecten"]) !== "undefined" && IsJsonString(localStorage["projecten"]))
{
	var projectenJSONDestringed = JSON.parse(localStorage["projecten"]);
	if(typeof(projectenJSONDestringed) === "object")
	{
		projecten = projectenJSONDestringed;
	}
}
var articles = [];
if(typeof(localStorage["articles"]) !== "undefined" && IsJsonString(localStorage["articles"]))
{
	var articlesJSONDestringed = JSON.parse(localStorage["articles"]);
	if(typeof(articlesJSONDestringed) === "object")
	{
		articles = articlesJSONDestringed;
	}
}
var presets = [];
if(typeof(localStorage["presets"]) !== "undefined" && IsJsonString(localStorage["presets"]))
{
	var presetsJSONDestringed = JSON.parse(localStorage["presets"]);
	if(typeof(presetsJSONDestringed) === "object")
	{
		presets = presetsJSONDestringed;
	}
}

$(document).ready(function() {
	$( "#tabs" ).tabs();
	initCalendar();
	initConfigureTools();
});

function initConfigureTools()
{
	initProjectCreate();
	initArticleCreate();
	initPresetCreate();
}

function initProjectCreate()
{
	updateProjectTable();
	$('#ProjectCreate').click(function(){
		var Projectcode = $('#ProjectCode').val();
		var ProjectDescription = $('#ProjectDescription').val();
		if(Projectcode != "" && ProjectDescription != "")
		{
			var project = {Projectcode: Projectcode, ProjectDescription: ProjectDescription}
			projecten.push(project);
			localStorage["projecten"] = JSON.stringify(projecten);
			updateProjectTable();
		}
		$('#ProjectCode').val("");
		$('#ProjectDescription').val("");
	});
}

function updateProjectTable()
{
	updateDropdowns();
	$("#projects tr").has("td").remove();
	for(var i = 0; i < projecten.length; i++)
	{
		var project = projecten[i];
		var projectcode = $("<td>" + project.Projectcode + "</td>");
		var projectdescription = $("<td>" + project.ProjectDescription + "</td>");
		var projectdeleterow = $("<td><a class='js--removeproject' href='#' data-id='" + i + "' >x</a></td>");
		var row = $("<tr></tr>").append(projectcode).append(projectdescription).append(projectdeleterow)
		$("#projects").append(row);
	}
	$(".js--removeproject").click(function(){
		removeProject($(this).data('id'));
	});
}

function removeProject(index)
{
	projecten.splice(index, 1);
	localStorage["projecten"] = JSON.stringify(projecten);
	updateProjectTable();
}

function initArticleCreate()
{
	updateArticleTable();
	$('#ArticleCreate').click(function(){
		var Article = $('#Article').val();
		var ArticleDescription = $('#Articledescription').val();
		if(Article != "" && ArticleDescription != "")
		{
			var article = {Article: Article, ArticleDescription: ArticleDescription}
			articles.push(article);
			localStorage["articles"] = JSON.stringify(articles);
			updateArticleTable();
		}
		$('#Article').val("");
		$('#Articledescription').val("");
	});
}

function updateArticleTable()
{
	updateDropdowns();
	$("#articles tr").has("td").remove();
	for(var i = 0; i < articles.length; i++)
	{
		var article = articles[i];
		var articlecode = $("<td>" + article.Article + "</td>");
		var articledescription = $("<td>" + article.ArticleDescription + "</td>");
		var articledeleterow = $("<td><a class='js--removearticle' href='#' data-id='" + i + "' >x</a></td>");
		var row = $("<tr></tr>").append(articlecode).append(articledescription).append(articledeleterow)
		$("#articles").append(row);
	}
	$(".js--removearticle").click(function(){
		removeArticle($(this).data('id'));
	});
}

function removeArticle(index)
{
	articles.splice(index, 1);
	localStorage["articles"] = JSON.stringify(articles);
	updateArticleTable();
}

function updateDropdowns()
{
	$("#presetprojectselect option:gt(0)").remove();
	$("#presetarticleselect option:gt(0)").remove();
	$("#createDateDialog .project option:gt(0)").remove();
	$("#createDateDialog .article option:gt(0)").remove();
	$("#editDateDialog .project option:gt(0)").remove();
	$("#editDateDialog .article option:gt(0)").remove();
	for(var i = 0; i < projecten.length; i++)
	{	
		var project = projecten[i];
		var option = "<option value='" + project.Projectcode + "'>" + project.ProjectDescription + "</option>";
		$("#presetprojectselect").append(option);
		$("#createDateDialog .project").append(option);
		$("#editDateDialog .project").append(option);
	}
	for(var i = 0; i < articles.length; i++)
	{	
		var article = articles[i];
		var option = "<option value='" + article.Article + "'>" + article.ArticleDescription + "</option>";
		$("#presetarticleselect").append(option);
		$("#createDateDialog .article").append(option);
		$("#editDateDialog .article").append(option);
	}
}

function initPresetCreate()
{
	updatePresetTable();
	$('#presetCreate').click(function(){
		var presetproject = $('#presetprojectselect').val();
		var presetarticle = $('#presetarticleselect').val();
		var presetname = $('#presetname').val();
		if(presetproject != "" && presetarticle != "")
		{
			var preset = {Name: presetname, Project: presetproject, Article: presetarticle}
			presets.push(preset);
			localStorage["presets"] = JSON.stringify(presets);
			updatePresetTable();
		}
		$('#presetproject').val("");
		$('#presetarticle').val("");
	});
}

function updatePresetTable()
{
	$("#presets tr").has("td").remove();
	for(var i = 0; i < presets.length; i++)
	{
		var preset = presets[i];
		var presetname = $("<td>" + preset.Name + "</td>");
		var project = "";
		for(var i = 0; i < projecten.length; i++)
		{
			if(projecten[i].Projectcode == preset.Project)
			{
				project = projecten[i].ProjectDescription;
			}
		}
		var articlename = "";
		for(var i = 0; i < articles.length; i++)
		{
			if(articles[i].Article == preset.Article)
			{
				articlename = articles[i].ArticleDescription;
			}
		}
		var projectcode = $("<td>" + preset.Project + "</td>");
		var projectdescription = $("<td>" + project + "</td>");
		var article = $("<td>" + preset.Article + "</td>");
		var articleDescription = $("<td>" + articlename + "</td>");
		var presetdeleterow = $("<td><a class='js--removepreset' href='#' data-id='" + i + "' >x</a></td>");
		var row = $("<tr></tr>").append(presetname).append(projectcode).append(projectdescription).append(article).append(articleDescription).append(presetdeleterow)
		$("#presets").append(row);
		
		$("#createDateDialog .presets, #editDateDialog .presets").each(function(){
			var pr = preset;
			var presetButton = $('<input type="button" value="' + pr.Name + '">')
			$(this).append(presetButton);
			presetButton.click(function(){
				var pre = pr;
				$(this).closest(".js--dialog").find(".project").val(pr.Project);
				$(this).closest(".js--dialog").find(".article").val(pr.Article);
			});
		});
	}
	$(".js--removepreset").click(function(){
		removePreset($(this).data('id'));
	});
}

function removePreset(index)
{
	presets.splice(index, 1);
	localStorage["presets"] = JSON.stringify(presets);
	updatePresetTable();
}

function finalizeCreateEvent($event)
{
	var description = $("#createDateDialog .beschrijving").val();
	var project = $("#createDateDialog .project").val();
	var article = $("#createDateDialog .article").val();
	
	$event.find(".wc-title").text(description);
	var content = $("<div class='wc-content' />");
	content.html("project: <span class='wc-project'>" + project + "</span><br/>article: <span class='wc-article'>" + article + "</span>");
	content.insertAfter($event.find(".wc-title"));
	
	$("#createDateDialog .beschrijving").val("");
	$("#createDateDialog .project").val("");
	$("#createDateDialog .article").val("");
	
	SerializeEvents();
}

function finalizeEditEvent($event)
{
	var description = $("#editDateDialog .beschrijving").val();
	var project = $("#editDateDialog .project").val();
	var article = $("#editDateDialog .article").val();
	
	$event.find(".wc-title").text(description);
	var content = $("<div class='wc-content' />");
	content.html("project: <span class='wc-project'>" + project + "</span><br/>article: <span class='wc-article'>" + article + "</span>");
	$event.find(".wc-content").remove();
	content.insertAfter($event.find(".wc-title"));
	
	SerializeEvents();
}

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function deleteEvent($event)
{
	$event.remove();
}

function initCalendar(){
	
	$('#calendar').weekCalendar({
	  timeslotsPerHour: 2,
	  timeslotHeigh: 30,
	  hourLine: true,
	  height: function($calendar) {
		return $(window).height() - $('h1').outerHeight(true);
	  },
	  eventRender : function(calEvent, $event) {
		if (calEvent.end.getTime() < new Date().getTime()) {
		  $event.css('backgroundColor', '#aaa');
		  $event.find('.time').css({'backgroundColor': '#999', 'border':'1px solid #888'});
		}
	  },
	  eventNew: function(calEvent, $event) {
		if($( "#createDateDialog" ).is(':data(uiDialog)'))
		{
			$( "#createDateDialog" ).dialog("open");
			$( "#createDateDialog" ).dialog("open", function(){
			});
		}
		else
		{
			$( "#createDateDialog" ).dialog({
				width: 500,
				resizable: false,
				open: function(event, ui) {
					$(this).parent().find('.ui-dialog-titlebar-close').unbind('click');
					$(this).parent().find('.ui-dialog-titlebar-close').bind('click', function(e) {
						deleteEvent($event);
						$("#createDateDialog").dialog( "close" );
					})
				},
				buttons: [
					{
						text: "Cancel",
						click: function()
						{
							deleteEvent($event);
							$( this ).dialog( "close" );
						}
					},
					{
						text: "Create",
						click: function()
						{
							finalizeCreateEvent($event);
							$( this ).dialog( "close" );
						}
					}
				]
			});
		}
	  },
	  eventDrop: function(calEvent, $event) {
		displayMessage('<strong>Moved Event</strong><br/>Start: ' + calEvent.start + '<br/>End: ' + calEvent.end);
	  },
	  eventResize: function(calEvent, $event) {
		displayMessage('<strong>Resized Event</strong><br/>Start: ' + calEvent.start + '<br/>End: ' + calEvent.end);
	  },
	  eventClick: function(calEvent, $event) {
		$( "#editDateDialog" ).dialog({
			width: 500,
			resizable: false,
			open: function(event, ui){
				var description = $event.find('.wc-title').text();
				var project = $event.find('.wc-project').text();
				var article = $event.find('.wc-article').text();
				$("#editDateDialog .beschrijving").val(description);
				$("#editDateDialog .project").val(project);
				$("#editDateDialog .article").val(article);
			},
			buttons: [
				{
					text: "Cancel",
					click: function()
					{
						$( this ).dialog( "close" );
					}
				},
				{
					text: "Edit",
					click: function()
					{
						finalizeEditEvent($event);
						$( this ).dialog( "close" );
					}
				},
				{
					text: "Remove",
					click: function()
					{
						deleteEvent($event);
						$( this ).dialog( "close" );
					}
				}
			]
		});
	  },
	  eventMouseover: function(calEvent, $event) {
		displayMessage('<strong>Mouseover Event</strong><br/>Start: ' + calEvent.start + '<br/>End: ' + calEvent.end);
	  },
	  eventMouseout: function(calEvent, $event) {
		displayMessage('<strong>Mouseout Event</strong><br/>Start: ' + calEvent.start + '<br/>End: ' + calEvent.end);
	  },
	  noEvents: function() {
		displayMessage('There are no events for this week');
	  }
  });

	function displayMessage(message) {
	  $('#message').html(message).fadeIn();
	}

	$('<div id="message" class="ui-corner-all"></div>').prependTo($('body'));
}

function SerializeEvents()
{
	
}