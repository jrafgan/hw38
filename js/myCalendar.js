
var dateFormat=function(){var t=/d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,e=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,a=/[^-+\dA-Z]/g,m=function(t,e){for(t=String(t),e=e||2;t.length<e;)t="0"+t;return t};return function(d,n,r){var y=dateFormat;if(1!=arguments.length||"[object String]"!=Object.prototype.toString.call(d)||/\d/.test(d)||(n=d,d=void 0),d=d?new Date(d):new Date,isNaN(d))throw SyntaxError("invalid date");"UTC:"==(n=String(y.masks[n]||n||y.masks.default)).slice(0,4)&&(n=n.slice(4),r=!0);var s=r?"getUTC":"get",i=d[s+"Date"](),o=d[s+"Day"](),u=d[s+"Month"](),M=d[s+"FullYear"](),l=d[s+"Hours"](),T=d[s+"Minutes"](),h=d[s+"Seconds"](),c=d[s+"Milliseconds"](),g=r?0:d.getTimezoneOffset(),S={d:i,dd:m(i),ddd:y.i18n.dayNames[o],dddd:y.i18n.dayNames[o+7],m:u+1,mm:m(u+1),mmm:y.i18n.monthNames[u],mmmm:y.i18n.monthNames[u+12],yy:String(M).slice(2),yyyy:M,h:l%12||12,hh:m(l%12||12),H:l,HH:m(l),M:T,MM:m(T),s:h,ss:m(h),l:m(c,3),L:m(c>99?Math.round(c/10):c),t:l<12?"a":"p",tt:l<12?"am":"pm",T:l<12?"A":"P",TT:l<12?"AM":"PM",Z:r?"UTC":(String(d).match(e)||[""]).pop().replace(a,""),o:(g>0?"-":"+")+m(100*Math.floor(Math.abs(g)/60)+Math.abs(g)%60,4),S:["th","st","nd","rd"][i%10>3?0:(i%100-i%10!=10)*i%10]};return n.replace(t,function(t){return t in S?S[t]:t.slice(1,t.length-1)})}}();dateFormat.masks={default:"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:ss",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"},dateFormat.i18n={dayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"]},Date.prototype.format=function(t,e){return dateFormat(this,t,e)};


(function($){
    var currentDate = new Date();
    var Calendar = {
        monthName: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        weekdayName: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        target: '#myCalendar input[data-target="calendar"]',

        currentYear: currentDate.getFullYear(),
        currentMonth: currentDate.getMonth(),

        isInitialized: false,

        createCalendar: function (year, month, color) {
            if (color === undefined) {
                color = "#0097a7";
            }
            var calendar = $('<div id="calendar" style="background:' + color + '"><div class="cdr-header"><div class="cdr-year">' + year + '</div><div class="cdr-month"> <button type="button" class="btn" id="btn-prev"></button> <p>' + Calendar.monthName[month] + '</p><button type="button" class="btn" id="btn-next"></button></div></div><div class="cdr-content"><table><tbody></tbody></table></div></div>');
            var thead = $('<thead>');
            for (var w = 0; w < Calendar.weekdayName.length; w++) {
                thead.append($('<th>').text(Calendar.weekdayName[w]));
            }

            $('#myCalendar').append(calendar);
            $('#calendar table').append(thead);

            this.getCalendarBody(year, month);

            $('#btn-next').on('click', function () {
                Calendar.currentMonth++;
                if (Calendar.currentMonth > 11) {
                    Calendar.currentYear++;
                    Calendar.currentMonth = 0;
                }
                $('.cdr-year').html(Calendar.currentYear);
                $('.cdr-month p').text(Calendar.monthName[Calendar.currentMonth]);
                Calendar.getCalendarBody(Calendar.currentYear, Calendar.currentMonth);
            });

            $('#btn-prev').on('click', function () {
                Calendar.currentMonth--;
                if (Calendar.currentMonth < 0) {
                    Calendar.currentYear--;
                    Calendar.currentMonth = 11;
                }
                $('.cdr-year').html(Calendar.currentYear);
                $('.cdr-month p').text(Calendar.monthName[Calendar.currentMonth]);
                $('#calendar').css({"background": color});
                Calendar.getCalendarBody(Calendar.currentYear, Calendar.currentMonth);
            });
        },

        getCalendarBody: function(year, month) {
            var d = new Date(year, month, 1);
            var isFirstRowSet = false;
            var tbody = $('tbody');
            tbody.html('');

            var prevMonth = new Date(year, month, 0);
            var prevCounter = prevMonth.getDate();
            var nextCounter = 1;

            // Set Monday as index 0
            var day = d.getDay() - 1;
            if (day < 0) {
                day = 6;
            }

            while (d.getMonth() <= month && !(month === 11 && d.getMonth() === 0)) {
                var tr = $('<tr>');
                var i = 0;
                while (i < 7) {
                    var td = $('<td>');
                    if (!isFirstRowSet) {
                        if (i < day) {
                            td.text('*');
                            td.addClass('prevMonth');
                        } else {
                            td.text(d.getDate());
                            td.addClass('currentMonth');
                            d.setDate(d.getDate() + 1);
                        }
                    } else {
                        if (d.getMonth() === month) {
                            td.text(d.getDate());
                            td.addClass('currentMonth');
                            d.setDate(d.getDate() + 1);
                        } else {
                            td.text(nextCounter++);
                            td.addClass('nextMonth');
                            d.setDate(d.getDate() + 1);
                        }
                    }
                    tr.append(td);
                    i++;
                }
                isFirstRowSet = true;
                tbody.append(tr);
            }

            var prev = $('.prevMonth');
            for (var j = (prev.length-1); j >= 0; j--) {
                $(prev[j]).text(prevCounter);
                prevCounter--;
            }
        }
    };

    $.fn.initCalendar = function(settings){
        Calendar = $.extend(Calendar, settings);
        this.append($('<label for="date">Date:</label><input type="text" data-target="calendar" id="date">'));

        $(Calendar.target).on('click', function(){
            if (Calendar.restrictUserEdit === true || Calendar.restrictUserEdit !== undefined) {
                $(this).attr('disabled', 'true');
            }
            if (!Calendar.isInitialized) {
                Calendar.createCalendar(Calendar.currentYear, Calendar.currentMonth, Calendar.background);
                Calendar.isInitialized = true;
            }
            $('#calendar').css({"display": "block"});
        });

        $(document).on('click', '.currentMonth', function () {
            if (Calendar.setActiveChosenDate === true) {
                $('.currentMonth').removeClass('active');
                $(this).addClass('active');
            }
            var now = new Date($('.cdr-year').text(), Calendar.monthName.indexOf($('.cdr-month p').text()), parseInt($(this).text()));
            if (Calendar.format === undefined) {
                Calendar.format = "dd-mm-yyyy";
            }
            $(Calendar.target).val(dateFormat(now, Calendar.format));
            $('#calendar').css({"display": "block"});
            $(Calendar.target).removeAttr('disabled');
        });
    }
})(jQuery);