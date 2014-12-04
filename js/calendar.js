var Calendar = {
    TimeRegex: /(^[0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]$)/i,
    TimeSlotHeight: 20,
    HourString: "[timefrom] to [timeto]",
	Events: [],
	Id: 1, //index start at 1 since 0 is equal to empty string
    Init: function() {
        var self = this;
        self.TimeSlotHeight = self.DeserializeZoom();
        self.InitDialogs();
        self.InitWeekCalendar();
    },
    InitDialogs: function() {
        $('.js--dialog').dialog({
            modal: true,
            width: 500,
            resizable: false,
            autoOpen: false,
			closeOnEscape: false,
			closeText: '_close'
        });
		$('.dropdowninput').next('.ui-icon').click(function(){
			$(this).prev('.dropdowninput').focus();
		});
    },
    InitWeekCalendar: function() {
        var self = this;
        $('.calendar').empty().removeData();
        $('.calendar').weekCalendar({
            firstDayOfWeek: 1,
            data: self.DeserializeEvents(),
            timeslotsPerHour: 2,
            timeslotHeight: self.TimeSlotHeight,
            hourLine: true,
			defaultEventLength: 1,
            date: new Date(new Date(new Date().setHours(9)).setMinutes(0)),
            newEventText: '',
			buttonText: {today : "today", lastWeek : "_lastweek", nextWeek : "_nextweek"},
            height: function($calendar) {
                return $(window).height() - 100;
            },
			eventSerialize: function(){
				self.SerializeEvents();
			},
            eventRender: function(calEvent, $event) {
                if (calEvent.end.getTime() < new Date().getTime()) {
                    $event.css('backgroundColor', '#aaa');
                    $event.find('.time').css({
                        'backgroundColor': '#999',
                        'border': '1px solid #888'
                    });
                }
                $event.data('start', calEvent.start);
                $event.data('end', calEvent.end);
                $(this).find('.beschrijving').focus();
				self.RenderEvent(calEvent, $event);
            },
            eventNew: function(calEvent, $event) {
                self.NewEvent(calEvent, $event);
            },
            eventClick: function(calEvent, $event) {
                self.EditEvent(calEvent, $event);
            },
			eventDrop: function(calEvent, oldcalEvent, $event) {
				self.DeleteEvent(oldcalEvent, $event);
				$('.calendar').weekCalendar('updateEvent', calEvent);
			},
			eventResize: function(calEvent, oldcalEvent, $event) {
				self.DeleteEvent(oldcalEvent, $event);	
				$('.calendar').weekCalendar('updateEvent', calEvent);
				self.SerializeEvents();
			},
			calendarAfterLoad: function(calendar){
                self.CreateTools(calendar);
				self.CreateTimeRows(calendar);
				self.SetTotalValues();
			},
			eventHeader: function(calEvent, calendar) {
                var preset = '(' + calEvent.preset + ')';
                if(typeof calEvent.preset === "undefined" || calEvent.preset === '')
                {
                    preset = '';
                }
				return calEvent.title + ' ' + preset;
			},
            eventBody: function(calEvent, calendar){
                var projectcontent = calEvent.projectname + ' (' + calEvent.project + ')';
                var articlecontent = calEvent.articlename + ' (' + calEvent.article + ')';
                if(typeof calEvent.projectname === "undefined" || calEvent.projectname === '')
                {
                    projectcontent = calEvent.project;
                    if(typeof calEvent.project === "undefined" || calEvent.project === '')
                    {
                        projectcontent = "";
                    }
                }
                if(typeof calEvent.articlename === "undefined" || calEvent.articlename === '')
                {
                    articlecontent = calEvent.article;
                    if(typeof calEvent.article === "undefined" || calEvent.article === '')
                    {
                        articlecontent = "";
                    }
                }

                return projectcontent + '<br/>' + articlecontent;
            }
        });
    },
    CreateTools: function(calendar){
        var self = this;
        var zoomin = $('<button class="fa fa-search-plus" />');
        var zoomout = $('<button class="fa fa-search-minus" />');
        var div = $('<div class="wc-tools"></div>').append(zoomin).append(zoomout);
        var container = $('<div class="wc-zoom-bottomheader text--right" />').append(div);
        calendar.find('.wc-container').append(container);
        zoomin.click(function(e){
            e.preventDefault();
            self.ZoomIn();
        });
        zoomout.click(function(e){
            e.preventDefault();
            self.ZoomOut();
        });
    },
    ZoomIn: function(){
        var self = this;
        if(!(self.TimeSlotHeight * 1.5 > 45))
        {
            self.TimeSlotHeight = self.TimeSlotHeight * 1.5;
            self.InitWeekCalendar();
            self.SerializeZoom();
        }
    },
    ZoomOut: function(){
        var self = this;
        if(!(self.TimeSlotHeight / 1.5 < 13))
        {
            self.TimeSlotHeight = self.TimeSlotHeight / 1.5;
            self.InitWeekCalendar();
            self.SerializeZoom();
        }
    },
	CreateTimeRows: function(calendar){
        var self = this;
		calendar.find('.wc-bottomheader').remove();
		var timerow = $('<tr class="timerows"><td class="wc-time-column-bottomheader"></td></tr>');
		for(var i = 0; i < 7; i++)
		{
			timerow.append('<td class="wc-day-column-bottomheader wc-day-total"></td>');
		}
		timerow.append('<td class="wc-scrollbar-shim"></td>');
		var table = $('<table class="wc-timerow"></table>').append(timerow).append('<tr class="wc-grandtotal-row"><td class="wc-grandtotal" colspan="8"></td></tr>');
		var div = $('<div class="wc-bottomheader"></div>').append(table);
		calendar.find('.wc-container').append(div);
	},
    NewEvent: function(calEvent, $event) {
        var self = this;
        $('#createDateDialog').dialog({
            open: function(event, ui) {
                $(this).data('preset', '');
				BindAnalytics();
                $(this).parent().find('.ui-dialog-titlebar-close').unbind('click');
                $(this).parent().find('.ui-dialog-titlebar-close').bind('click', function(e) {
                    self.DeleteEvent(calEvent, $event);
                    $('#createDateDialog').dialog('close');
                })
				$(this).find('.js--beschrijving').val('');
				$(this).find('.js--projectinput').val('');
				$(this).find('.js--articleinput').val('');
				
                self.SetTime(calEvent);
                self.SetStyling($(this));
                self.AddButtonIcon($(this).parent(), 'Cancel', 'fa-ban');
                self.AddButtonIcon($(this).parent(), 'Create', 'fa-plus');
            },
            buttons: [{
                text: 'Create',
                click: function() {
                    self.DeleteEvent(calEvent, $event);
					self.AssignId(calEvent);
                    if (self.FinalizeDialogEvent($(this), calEvent, $event, true)) {
						$('.calendar').weekCalendar('updateEvent', calEvent);
						self.SerializeEvents();
                        $(this).dialog('close');
                    }
                }
            },{
                text: 'Cancel',
                click: function() {
                    self.DeleteEvent(calEvent, $event);
                    $(this).dialog('close');
                }
            }]
        });
        $('#createDateDialog').dialog("open");
    },
	AssignId : function(calEvent){
        var self = this;
		calEvent.id = self.Id;
		self.Id++;
	},
    AddButtonIcon: function($dialog, text, icon) {
        $dialog.find('.ui-dialog-buttonpane').
        find('button:contains("' + text + '")').button({
            icons: {
                primary: "fa " + icon
            }
        });
    },
    EditEvent: function(calEvent, $event) {
        var self = this;
        $('#editDateDialog').dialog({
            open: function(event, ui) {
                $(this).data('preset', calEvent.preset);
				BindAnalytics();
                $('#editDateDialog .js--beschrijving').val(calEvent.title);
                if(typeof calEvent.articlename !== "undefined")
                {
                    $('#editDateDialog .js--projectinput').val(calEvent.projectname);
                    $('#editDateDialog .js--projectinput').data('value', calEvent.project);
                }
                else
                {
                    $('#editDateDialog .js--projectinput').val(calEvent.project);
                }
                if(typeof calEvent.articlename !== "undefined")
                {
                    $('#editDateDialog .js--articleinput').val(calEvent.articlename);
                    $('#editDateDialog .js--articleinput').data('value', calEvent.article);
                }
                else
                {
                    $('#editDateDialog .js--articleinput').val(calEvent.article);
                }
                $(this).find('.js--beschrijving').focus();

                self.SetTime(calEvent);
                self.SetStyling($(this));
                self.AddButtonIcon($(this).parent(), 'Cancel', 'fa-ban');
                self.AddButtonIcon($(this).parent(), 'Edit', 'fa-cog');
                self.AddButtonIcon($(this).parent(), 'Remove', 'fa-remove');
            },
            buttons: [{
                text: 'Edit',
                click: function() {
                    self.DeleteEvent(calEvent, $event);
                    if (self.FinalizeDialogEvent($(this), calEvent, $event, true)) {
						$('.calendar').weekCalendar('updateEvent', calEvent);
						self.SerializeEvents();
                        $(this).dialog('close');
                    }
                }
            }, {
                text: 'Remove',
                click: function() {
                    self.DeleteEvent(calEvent, $event);
                    $(this).dialog('close');
                }
            }, {
                text: 'Cancel',
                click: function() {
                    $(this).dialog('close');
                }
            }]
        });
        $('#editDateDialog').dialog("open");
    },
    SetStyling: function($dialog) {
        $dialog.find('input[type=button], a, button').button();
        $dialog.find('input:text, input:password')
            .button()
            .css({
                'font': 'inherit',
                'color': 'inherit',
                'text-align': 'left',
                'outline': 'none',
                'cursor': 'text',
                'background': 'white'
            });
    },
    SetTime: function(calEvent) {
        var self = this;
        var date = new Date(Date.parse(calEvent.start));
        var enddate = new Date(Date.parse(calEvent.end));

        $('.js--fromtime').val(date.getHours() + ':' + ('0' + date.getMinutes()).slice(-2));
        $('.js--totime').val(enddate.getHours() + ':' + ('0' + enddate.getMinutes()).slice(-2));
    },
	RenderEvent: function(calEvent, $event){
        var self = this;
		//update the hourstring
		var hourstring = self.HourString;
		hourstring = hourstring.replace("[timefrom]", formatDate(calEvent.start, 'h:i a'));
		hourstring = hourstring.replace("[timeto]", formatDate(calEvent.end, 'h:i a'));
		
		$event.data('start', calEvent.start);
		$event.data('end', calEvent.end);
		
		var hourfrom = calEvent.start.getHours();
		var minutefrom = calEvent.start.getMinutes();
		var hourto = calEvent.end.getHours();
		var minuteto = calEvent.end.getMinutes();

		$event.css('top', (hourfrom * 2 + minutefrom / 30) * self.TimeSlotHeight);
		$event.css('height', ((hourto * 2 + minuteto / 30) - (hourfrom * 2 + minutefrom / 30)) * self.TimeSlotHeight);
	},
    FinalizeDialogEvent: function($dialog, calEvent, $event) {
        var self = this;
		if($dialog != null)
		{
			var description = $dialog.find('.js--beschrijving').val();
            var project = $dialog.find('.js--projectinput').data('value');
            var projectname;
            if(typeof project === 'undefined' || project === '')
            {
                project = $dialog.find('.js--projectinput').val();
            }
            else
            {
                projectname = $dialog.find('.js--projectinput').val();
            }
            var article = $dialog.find('.js--articleinput').data('value');
            var articlename;
            if(typeof article === 'undefined' || article === '')
            {
                article = $dialog.find('.js--articleinput').val();
            }
            else
            {
                articlename = $dialog.find('.js--articleinput').val();
            }
            var preset = $dialog.data('preset');

			var fromtime = $dialog.find('.js--fromtime').val();
			var totime = $dialog.find('.js--totime').val();

			if (typeof description == 'undefined' && typeof project == 'undefined' && typeof article == 'undefined' && typeof fromtime == 'undefined' && typeof totime == 'undefined') {
				if (typeof calEvent.description != 'undefined') {
					description = calEvent.description;
				}
				if (typeof calEvent.project != 'undefined') {
					project = calEvent.project;
				}
				if (typeof calEvent.article != 'undefined') {
					article = calEvent.article;
				}
				if (typeof calEvent.start != 'undefined') {
					fromtime = calEvent.start.getHours() + ':' + ('0' + calEvent.start.getMinutes()).slice(-2);
				}
				if (typeof calEvent.end != 'undefined') {
					totime = calEvent.end.getHours() + ':' + ('0' + calEvent.end.getMinutes()).slice(-2);
				}
			}

			var valid = self.ValidateEvent($dialog, description, project, article, fromtime, totime);
			if (!valid) {
				return false;
			}

			var hourfrom = self.GetHours(fromtime);
			var minutefrom = self.GetMinutes(fromtime);
			var hourto = self.GetHours(totime);
			var minuteto = self.GetMinutes(totime);

			var startdate = new Date(Date.parse(calEvent.start));
			startdate.setHours(hourfrom);
			startdate.setMinutes(minutefrom);
			var enddate = new Date(Date.parse(calEvent.end));
			enddate.setHours(hourto);
			enddate.setMinutes(minuteto);
			
			self.AssignId(calEvent);
			calEvent.title = description;
			calEvent.start = startdate;
			calEvent.end = enddate;
            calEvent.project = project;
            calEvent.projectname = projectname;
			calEvent.article = article;
            calEvent.articlename = articlename;
            calEvent.preset = preset;

			$dialog.find('.beschrijving').val('');
			$dialog.find('.project').val('');
            $dialog.find('.project').data('value', '');
			$dialog.find('.article').val('');
            $dialog.find('.article').data('value', '');
		}
        return true;
    },
    ValidateEvent: function($dialog, description, project, article, fromtime, totime) {
        var self = this;
        var invalidclass = 'invalid';
        var valid = true;

        $dialog.find('.js--input').removeClass(invalidclass);

        var hourfrom = self.GetHours(fromtime);
        var minutefrom = self.GetMinutes(fromtime);
        var hourto = self.GetHours(totime);
        var minuteto = self.GetMinutes(totime);

        if (description == '') {
            $dialog.find('.js--beschrijving').addClass(invalidclass);
            valid = false;
        }
        if (project == '') {
            $dialog.find('.js--projectinput').addClass(invalidclass);
            valid = false;
        }
        if (article == '') {
            $dialog.find('.js--articleinput').addClass(invalidclass);
            valid = false;
        }
        if (hourfrom === '' || minutefrom === '' || hourfrom * 60 + minutefrom >= hourto * 60 + minuteto) {
            $dialog.find('.js--fromtime').addClass(invalidclass);
            valid = false;
        }
        if (hourto === '' || minuteto === '' || hourfrom * 60 + minutefrom >= hourto * 60 + minuteto) {
            $dialog.find('.js--totime').addClass(invalidclass);
            valid = false;
        }
        return valid;
    },
    GetHours: function(hourminute) {
        var self = this;
        var match = hourminute.match(self.TimeRegex);
        if (match != null && match.length > 2) {
            return parseInt(match[1]);
        }
        return "";
    },
    GetMinutes: function(hourminute) {
        var self = this;
        var match = hourminute.match(self.TimeRegex);
        if (match != null && match.length > 2) {
            return parseInt(match[2]);
        }
        return "";
    },
    DeleteEvent: function(calEvent) {
        var self = this;
		$('.calendar').weekCalendar('removeEvent', calEvent.id);
		
        self.SerializeEvents();
    },
	SetTotalValues: function(){
		var self = this;
		events = self.DeserializeEvents();
		var startdate = $('.calendar').data('startDate');
		var shownweek = startdate.getWeekNumber();
		events = $.grep(events, function(el, i){
			var arr = el.start.split(/-|T|:/i);
			var date = new Date(arr[0], arr[1] -1, arr[2], arr[3], arr[4]);
			if(shownweek == date.getWeekNumber())
			{
				return true;
			}
			return false;
		});
		var totals = [0,0,0,0,0,0,0];
        for(var i = 0; i < events.length; i++){
			var event = events[i];
			var arrstart = events[i].start.split(/-|T|:/i);
			var eventdatestart = new Date(arrstart[0], arrstart[1] -1, arrstart[2], arrstart[3], arrstart[4]);
			var arrend = events[i].end.split(/-|T|:/i);
			var eventdateend = new Date(arrend[0], arrend[1] -1, arrend[2], arrend[3], arrend[4]);
			
			var diff = new Date(eventdatestart - startdate);
			var days = diff.getDate() - 1;
			
			var duration = new Date(eventdateend - eventdatestart);
			totals[days] += duration.getUTCHours() * 60 + duration.getUTCMinutes();
		};
		var grandtotal = 0;
		for(var day = 0; day < totals.length; day++){
			grandtotal += totals[day];
			var time = Math.floor(totals[day] / 60) + ":" + ("0" + totals[day] % 60).slice(-2);
			$('.wc-day-total:eq(' + day + ')').text(time);
		};
		var time = Math.floor(grandtotal / 60) + ":" + ("0" + grandtotal % 60).slice(-2);
		$('.wc-grandtotal').text(time);
	},
    DeserializeEvents: function() {
		var self = this;
        var events = [];
        if (typeof(localStorage['events']) !== 'undefined' && IsJsonString(localStorage['events'])) {
            var eventsJSONDestringed = JSON.parse(localStorage['events']);
            if (typeof(eventsJSONDestringed) === 'object') {
                events = eventsJSONDestringed;
            }
        }

        var data = [];

        for (var i = 0; i < events.length; i++) {
            var event = events[i];
            if (typeof event.start != 'undefined' && typeof event.end != 'undefined') {
                self.AssignId(event);
                data.push(event);
            }
        }
        return data;
    },
    SerializeEvents: function() {
		var self = this;
        var $events = $('.wc-cal-event');
        var events = self.DeserializeEvents();
		var startdate = $('.calendar').data('startDate');
		//sustain data not in this week.
		var shownweek = startdate.getWeekNumber();
		events = $.grep(events, function(el, i){
			var arr = el.start.split(/-|T|:/i);
			var date = new Date(arr[0], arr[1] -1, arr[2], arr[3], arr[4]);
			if(shownweek == date.getWeekNumber())
			{
				return false;
			}
			return true;
		});
        $events.each(function() {
            var event = $(this).data('calEvent');
            events.push(event);
        });
        localStorage['events'] = JSON.stringify(events);
		self.SetTotalValues();
    },
    DeserializeZoom: function(){
        var self = this;
        var zoom = localStorage['zoomlevel'];
        if(isNaN(zoom))
        {
            zoom = 20;
        }
        return zoom;
    },
    SerializeZoom: function(){
        var self = this;
        localStorage['zoomlevel'] = self.TimeSlotHeight;
    }
};