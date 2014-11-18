var eventdata = '';

function RemoveByIndex(array, index) {
    array.splice(index, 1);
}

function EqualHeight(group) {
    group.css('height', '');
    tallest = 0;
    group.each(function() {
        thisHeight = $(this).height();
        if (thisHeight > tallest) {
            tallest = thisHeight;
        }
    });
    group.height(tallest);
}

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function BindAnalytics(){
	$('button, .button, a, input[type=button]').not('.js--analyticsbound').addClass('js--analyticsbound').click(function(){
		var category = 'button';
		var action = 'click';
		var label = $(this).text();
		if($(this).is('input[type=button]')){
			label = $(this).val()
		};
		if(label === '')
		{
			label = "_unknown";
		}
		if($(this).hasClass('presetbutton'))
		{
			label = "_presetbutton";
		}
		TrackAnalytics(page, category, action, label);
	});	
};

function TrackAnalytics(page, category, action, label){
	var iframe = $('<iframe class="pixel"></iframe>');
	iframe.attr('src', 'http://www.jeroenvdlast.nl/' + page + '.html?category=' + category + '&action=' + action + '&label=' + label);
	$('body').append(iframe);
}

Date.prototype.getWeekNumber = function(){
    var d = new Date(+this);
    d.setHours(0,0,0);
    d.setDate(d.getDate()+4-(d.getDay()||7));
    return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
};

function formatDate(date, format) {
    var returnStr = '';
    for (var i = 0; i < format.length; i++) {
        var curChar = format.charAt(i);
        if (i != 0 && format.charAt(i - 1) == '\\') {
            returnStr += curChar;
        } else if (this._replaceChars[curChar]) {
            returnStr += this._replaceChars[curChar](date, this);
        } else if (curChar != '\\') {
            returnStr += curChar;
        }
    }
    return returnStr;
}
_replaceChars = {
    // Day
    d: function(date) {
        return (date.getDate() < 10 ? '0' : '') + date.getDate();
    },
    D: function(date, calendar) {
        return calendar.options.shortDays[date.getDay()];
    },
    j: function(date) {
        return date.getDate();
    },
    l: function(date, calendar) {
        return calendar.options.longDays[date.getDay()];
    },
    N: function(date) {
        var _d = date.getDay();
        return _d ? _d : 7;
    },
    S: function(date) {
        return (date.getDate() % 10 == 1 && date.getDate() != 11 ? 'st' : (date.getDate() % 10 == 2 && date.getDate() != 12 ? 'nd' : (date.getDate() % 10 == 3 && date.getDate() != 13 ? 'rd' : 'th')));
    },
    w: function(date) {
        return date.getDay();
    },
    z: function(date) {
        var d = new Date(date.getFullYear(), 0, 1);
        return Math.ceil((date - d) / 86400000);
    }, // Fixed now
    // Week
    W: function(date) {
        var d = new Date(date.getFullYear(), 0, 1);
        return Math.ceil((((date - d) / 86400000) + d.getDay() + 1) / 7);
    }, // Fixed now
    // Month
    F: function(date, calendar) {
        return calendar.options.longMonths[date.getMonth()];
    },
    m: function(date) {
        return (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1);
    },
    M: function(date, calendar) {
        return calendar.options.shortMonths[date.getMonth()];
    },
    n: function(date) {
        return date.getMonth() + 1;
    },
    t: function(date) {
        var d = date;
        return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()
    }, // Fixed now, gets #days of date
    // Year
    L: function(date) {
        var year = date.getFullYear();
        return (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0));
    }, // Fixed now
    o: function(date) {
        var d = new Date(date.valueOf());
        d.setDate(d.getDate() - ((date.getDay() + 6) % 7) + 3);
        return d.getFullYear();
    }, //Fixed now
    Y: function(date) {
        return date.getFullYear();
    },
    y: function(date) {
        return ('' + date.getFullYear()).substr(2);
    },
    // Time
    a: function(date) {
        return date.getHours() < 12 ? 'am' : 'pm';
    },
    A: function(date) {
        return date.getHours() < 12 ? 'AM' : 'PM';
    },
    B: function(date) {
        return Math.floor((((date.getUTCHours() + 1) % 24) + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600) * 1000 / 24);
    }, // Fixed now
    g: function(date) {
        return date.getHours() % 12 || 12;
    },
    G: function(date) {
        return date.getHours();
    },
    h: function(date) {
        return ((date.getHours() % 12 || 12) < 10 ? '0' : '') + (date.getHours() % 12 || 12);
    },
    H: function(date) {
        return (date.getHours() < 10 ? '0' : '') + date.getHours();
    },
    i: function(date) {
        return (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    },
    s: function(date) {
        return (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();
    },
    u: function(date) {
        var m = date.getMilliseconds();
        return (m < 10 ? '00' : (m < 100 ? '0' : '')) + m;
    },
    // Timezone
    e: function(date) {
        return 'Not Yet Supported';
    },
    I: function(date) {
        return 'Not Yet Supported';
    },
    O: function(date) {
        return (-date.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(date.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(date.getTimezoneOffset() / 60)) + '00';
    },
    P: function(date) {
        return (-date.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(date.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(date.getTimezoneOffset() / 60)) + ':00';
    }, // Fixed now
    T: function(date) {
        var m = date.getMonth();
        date.setMonth(0);
        var result = date.toTimeString().replace(/^.+ \(?([^\)]+)\)?$/, '$1');
        date.setMonth(m);
        return result;
    },
    Z: function(date) {
        return -date.getTimezoneOffset() * 60;
    },
    // Full Date/Time
    c: function(date, calendar) {
        return calendar._formatDate(date, 'Y-m-d\\TH:i:sP');
    }, // Fixed now
    r: function(date, calendar) {
        return calendar._formatDate(date, 'D, d M Y H:i:s O');
    },
    U: function(date) {
        return date.getTime() / 1000;
    }
}