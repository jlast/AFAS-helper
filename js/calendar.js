var Calendar = {
    TimeRegex: /(^[0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]$)/i,
    TimeSlotHeight: 20,
    HourString: "[timefrom] to [timeto]",
	Events: [],
	Id: 1, //index start at 1 since 0 is equal to empty string
    Init: function() {
        var self = this;
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
        $('.calendar').weekCalendar({
            firstDayOfWeek: 1,
            data: self.DeserializeEvents(),
            timeslotsPerHour: 2,
            timeslotHeigh: 30,
            hourLine: true,
			buttonText: {today : "today", lastWeek : "_lastweek", nextWeek : "_nextweek"},
            height: function($calendar) {
                return $(window).height() - 113;
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
			},
			eventResize: function(calEvent, oldcalEvent, $event) {
				self.DeleteEvent(oldcalEvent, $event);	
				$('.calendar').weekCalendar('updateEvent', calEvent);
				self.SerializeEvents();
			},
        });
    },
    NewEvent: function(calEvent, $event) {
        var self = this;
        $('#createDateDialog').dialog({
            open: function(event, ui) {
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
                self.AddButtonIcon($(this).parent(), 'Cancel', 'ui-icon-cancel');
                self.AddButtonIcon($(this).parent(), 'Create', 'ui-icon-plus');
            },
            buttons: [{
                text: 'Cancel',
                click: function() {
                    self.DeleteEvent(calEvent, $event);
                    $(this).dialog('close');
                }
            }, {
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
                primary: icon
            }
        });
    },
    EditEvent: function(calEvent, $event) {
        var self = this;
        $('#editDateDialog').dialog({
            open: function(event, ui) {
				BindAnalytics();
                var description = $event.find('.wc-title').text();
                var project = $event.find('.wc-project').text();
                var article = $event.find('.wc-article').text();
                $('#editDateDialog .js--beschrijving').val(description);
                $('#editDateDialog .js--projectinput').val(project);
                $('#editDateDialog .js--articleinput').val(article);
                $(this).find('.js--beschrijving').focus();

                self.SetTime(calEvent);
                self.SetStyling($(this));
                self.AddButtonIcon($(this).parent(), 'Cancel', 'ui-icon-cancel');
                self.AddButtonIcon($(this).parent(), 'Edit', 'ui-icon-gear');
                self.AddButtonIcon($(this).parent(), 'Remove', 'ui-icon-close');
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
		$event.find('.wc-time').text(hourstring);
		
		$event.data('start', calEvent.start);
		$event.data('end', calEvent.end);
		
		var hourfrom = calEvent.start.getHours();
		var minutefrom = calEvent.start.getMinutes();
		var hourto = calEvent.end.getHours();
		var minuteto = calEvent.end.getMinutes();

		$event.css('top', (hourfrom * 2 + minutefrom / 30) * self.TimeSlotHeight);
		$event.css('height', ((hourto * 2 + minuteto / 30) - (hourfrom * 2 + minutefrom / 30)) * self.TimeSlotHeight);

		$event.find('.wc-title').text(calEvent.title);
		$event.find('.wc-content').remove();
		
		var content = $('<div class="wc-content" />');
		content.html('project: <span class="wc-project">' + calEvent.project + '</span><br/>article: <span class="wc-article">' + calEvent.article + '</span>');
		content.insertAfter($event.find('.wc-title'));
	},
    FinalizeDialogEvent: function($dialog, calEvent, $event) {
        var self = this;
		if($dialog != null)
		{
			var description = $dialog.find('.js--beschrijving').val();
			var project = $dialog.find('.js--projectinput').val();
			var article = $dialog.find('.js--articleinput').val();

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
			calEvent.article = article;
			calEvent.project = project;

			$dialog.find('.beschrijving').val('');
			$dialog.find('.project').val('');
			$dialog.find('.article').val('');
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
		if(calEvent !== null){
			$('.calendar').weekCalendar('removeEvent', calEvent.id);
		}
		
        self.SerializeEvents();
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
            var dataobject = {};
            if (typeof event.start != 'undefined' && typeof event.end != 'undefined') {
                self.AssignId(dataobject);
                dataobject.start = event.start;
                dataobject.end = event.end;
                dataobject.title = event.title;
                dataobject.project = event.project;
                dataobject.article = event.article;
                data.push(dataobject);
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
            var event = {};
            var $day = $(this).closest('.wc-day-column');
            event.start = $(this).data('start');
            event.end = $(this).data('end');
            event.title = $(this).find('.wc-title').text();
            event.project = $(this).find('.wc-project').text();
            event.article = $(this).find('.wc-article').text();
            events.push(event);
        });
        localStorage['events'] = JSON.stringify(events);
    }
};