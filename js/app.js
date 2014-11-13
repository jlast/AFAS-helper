var calendarApp = angular.module('calendarApp', []);
calendarApp.controller('CalendarAppController', function ($scope) {
  $scope.days = [
    {name: 'Monday',
     visible: true},
    {name: 'Tuesday',
     visible: true},
    {name: 'Wednesday',
     visible: true},
    {name: 'Thursday',
     visible: true},
    {name: 'Friday',
     visible: true},
    {name: 'Saturday',
     visible: false},
    {name: 'Sunday',
     visible: false}
  ];
  $scope.amount = 48;
  $scope.weekendtext = "Show weekend";
  $scope.number = 5;
  
  $scope.getNumber = function(num) {
	return new Array(num);   
  }
  
  $scope.showweekends = function()
  {
	$scope.days[5].visible = !$scope.days[5].visible;
	$scope.days[6].visible = !$scope.days[6].visible;
	if($scope.weekendtext == "Show weekend")
	{
		$scope.weekendtext = "Hide weekend";
	}
	else
	{
		$scope.weekendtext = "Show weekend";
	}
  }
  
  $scope.daysvisible = function()
  {
	var days = $scope.days;
	var amountvisible = 0;
	for (index = 0; index < days.length; ++index) {
		var day = days[index];
		if(day.visible)
		{
			amountvisible += 1;
		}
	}
	return amountvisible;
  }
});