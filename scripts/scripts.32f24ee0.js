angular.module("ui-calendar",[]).directive("calendarUi",[function(){return{restrict:"E",scope:{selected:"=",defaultView:"@"},require:"^calendarUi",controller:["$scope",function(a){this.nextNew=function(){a.todayAvailable=!1}}],controllerAs:"calendarCtrl",transclude:!0,templateUrl:"scripts/directives/templates/calendar.html",link:function(a,b,c,d){var e=d;a.defaultView?a.selectedView=a.defaultView:a.selectedView="month",a.next=function(){e.next=!0},a.previous=function(){e.previous=!0},a.gotoToday=function(){e.selected=moment()},a.selectView=function(b){a.selectedView=b}}}}]),angular.module("ui-calendar").directive("dayView",[function(){function a(a,b){b.selected=b.selected||moment();var c=b.selected.clone();a.selectedDate={name:c.format("dd").substring(0,1),number:c.date(),isCurrentMonth:c.isSame(new Date,"month"),isToday:c.isSame(new Date,"day"),date:c},c.isSame(new Date,"day")?b.todayAvailable=!0:b.todayAvailable=!1}return{restrict:"E",scope:{},require:"^calendarUi",templateUrl:"scripts/directives/templates/dayview.html",link:function(b,c,d,e){var f=e;a(b,f),b.$watch(function(a){return f.selected},function(c){void 0!==c&&a(b,f)}),b.$watch(function(a){return f.next},function(c){if(void 0!==c&&1==c){f.todayAvailable=!1;var d=f.selected;f.selected=d.add(1,"d").clone(),f.next=!1,a(b,f)}}),b.$watch(function(a){return f.previous},function(c){if(void 0!==c&&1==c){f.todayAvailable=!1;var d=f.selected;f.selected=d.subtract(1,"d").clone(),f.previous=!1,a(b,f)}})}}}]),angular.module("ui-calendar").directive("monthView",[function(){function a(a,d){d.todayAvailable=!1,d.selected=d.selected||moment(),a.month=d.selected.clone();var e=d.selected.clone();e.date(1),b(e.day(0)),c(a,e,a.month,d)}function b(a){return a.day(0).hour(0).minute(0).second(0).millisecond(0)}function c(a,b,c,e){a.weeks=[];for(var f=!1,g=b.clone(),h=g.month(),i=0;!f;)a.weeks.push({days:d(g.clone(),c,a,e)}),g.add(1,"w"),f=i++>2&&h!==g.month(),h=g.month()}function d(a,b,c,d){for(var e=[],f=0;7>f;f++){var g=!1;6==f&&(g=!0),e.push({name:a.format("dd").substring(0,1),number:a.date(),isCurrentMonth:a.month()===b.month(),isToday:a.isSame(new Date,"day"),date:a,lastDayOfWeek:g}),a=a.clone(),a.isSame(new Date,"day")&&(d.todayAvailable=!0),a.add(1,"d")}return e}return{restrict:"E",scope:{},templateUrl:"scripts/directives/templates/monthview.html",require:"^calendarUi",link:function(d,e,f,g){var h=g;a(d,h),d.$watch(function(a){return h.selected},function(b){void 0!==b&&a(d,h)}),d.$watch(function(a){return h.next},function(a){if(void 0!==a&&1==a){h.todayAvailable=!1;var e=d.month.clone();b(e.month(e.month()+1).date(1)),d.month.month(d.month.month()+1),h.selected=d.month,c(d,e,d.month,h),h.next=!1}}),d.$watch(function(a){return h.previous},function(a){if(void 0!==a&&1==a){h.todayAvailable=!1;var e=d.month.clone();b(e.month(e.month()-1).date(1)),d.month.month(d.month.month()-1),h.selected=d.month,c(d,e,d.month,h),h.previous=!1}})}}}]),angular.module("ui-calendar").directive("weekView",[function(){function a(a,c){c.todayAvailable=!1,c.selected=c.selected||moment();var d=c.selected;a.days=b(d,a,c)}function b(a,b,c){for(var d=[],e=0;7>e;e++){var f=!1;6==e&&(f=!0),d.push({name:a.format("dd").substring(0,1),number:a.date(),isToday:a.isSame(new Date,"day"),date:a,lastDayOfWeek:f}),a=a.clone(),a.isSame(new Date,"day")&&(c.todayAvailable=!0),a.add(1,"d")}return c.startDate=d[0].date,c.endDate=d[6].date,d}return{restrict:"E",scope:{},require:"^calendarUi",templateUrl:"scripts/directives/templates/weekview.html",link:function(b,c,d,e){var f=e;a(b,f),b.$watch(function(a){return f.selected},function(c){void 0!==c&&a(b,f)}),b.$watch(function(a){return f.next},function(c){if(void 0!==c&&1==c){f.todayAvailable=!1;var d=f.selected;d.add(1,"w"),f.selected=d.clone(),f.next=!1,a(b,f)}}),b.$watch(function(a){return f.previous},function(c){if(void 0!==c&&1==c){f.todayAvailable=!1;var d=f.selected;d.subtract(1,"w"),f.selected=d.clone(),f.previous=!1,a(b,f)}})}}}]),angular.module("ui-calendar").directive("datepicker",[function(){return{restrict:"E",require:"^calendarUi",compile:function(a,b){var c="<input type='date' class='datepicker' placeholder='Select Date'></input>",d=$(c);return a.replaceWith(d),function(a,b,c,d){var e=d;a.$watch(function(a){return e.selected},function(a){void 0!==a&&b.pickadate().pickadate("picker").set("select",a.valueOf())}),b.pickadate({selectMonths:!0,selectYears:15,onClose:function(){goto(new Date)},onSet:function(b){void 0!=b.select&&e.selected!=b.select&&(a.$apply(function(){d.selected=moment(b.select)}),this.close())}})}}}}]),angular.module("app",["ui-calendar"]).controller("appController",["$scope",function(a){var b=moment();a.day=b}]);