/**
 * Created by synerzip on 09/07/15.
 */

var scripts = document.getElementsByTagName("script");
var currentScriptPath = scripts[scripts.length - 1].src;
angular.module("ui-calendar", [])
    .directive("calendarUi", [function () {
        return {
            restrict: 'E',
            scope: {
                selected: "=",
                defaultView:"@"
            },
            require: "^calendarUi",
            controller: function($scope) {
                this.nextNew = function() {
                    $scope.todayAvailable = false;
                }
            },
            controllerAs:'calendarCtrl',
            transclude:true,

            templateUrl: currentScriptPath.substring(0, currentScriptPath.lastIndexOf('/') + 1) + 'templates/calendar.html',

            link: function (scope, element, attrs, controller) {
                var calendarCtrl = controller;
                if(scope.defaultView){
                    scope.selectedView = scope.defaultView;
                }else{
                    scope.selectedView = 'month';
                }

                scope.next = function(){
                    calendarCtrl.next = true;
                };

                scope.previous = function(){
                    calendarCtrl.previous = true;
                };

                scope.gotoToday = function () {
                    calendarCtrl.selected = moment();

                };

                scope.selectView = function(view){
                    scope.selectedView = view;
                };
            }
        };


    }]);
