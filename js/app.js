var calendarApp = angular.module('calendarApp', []);
calendarApp.controller('CalendarAppController', function ($scope) {
  $scope.days = {
	0: {name: 'Monday',
     visible: true},
    1: {name: 'Tuesday',
     visible: true},
    2: {name: 'Wednesday',
     visible: true},
    3: {name: 'Thursday',
     visible: true},
    4: {name: 'Friday',
     visible: true},
    5: {name: 'Saturday',
     visible: false},
    6: {name: 'Sunday',
     visible: false}
  };
  $scope.appointments = [];
  $scope.amount = 24;
  $scope.weekendtext = "Show weekend";
  $scope.number = 5;
  $scope.workhourmin = 8;
  $scope.workhourmax = 17;
  $scope.startdrag = {dag: 0, uur: 0}
  $scope.dragover = {uur: 0}
  
  $scope.getNumber = function(num) {
	return new Array(num);   
  };
  
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
  };
  
  $scope.timestamp = function(index)
  {
	var hours = (index + 11) % 12 + 1;
	if(hours == 12 && index / 12 < 1)
	{
		hours += " am";
	}
	if(hours == 12 && index / 12 >= 1)
	{
		hours += " pm";
	}
	return hours;
  };
  
  $scope.daysvisible = function()
  {
	var days = $scope.days;
	var amountvisible = 0;
	for (var day in days) {
		if (days[day]) {
			if(days[day].visible)
			{
				amountvisible += 1;
			}
		}
	}
	return amountvisible;
  };
  
  $scope.inrange = function(index)
  {
	if(index < $scope.workhourmin || index > $scope.workhourmax)
	{
		return "inrange";
	}
	return "";
  };
  $scope.mousedown = function(day, hour)
  {
	$scope.startdrag.dag = day;
	$scope.startdrag.uur = hour;
  };
  $scope.mousemove = function(day, hour)
  {
	if($scope.startdrag.dag > 0 && $scope.dragover.uur > 0)
	{
		$scope.dragover.uur = hour;
	}
  };
  $scope.mouseup = function(day, hour)
  {
	var object = {day: $scope.startdrag.dag, hourfrom : $scope.startdrag.uur, hourto: hour};
	$scope.appointments.push(object);
	$scope.startdrag.dag = 0;
	$scope.startdrag.uur = 0;
	$scope.dragover.dag = 0;
	$scope.dragover.uur = 0;
  };
  $scope.getDragAppointment = function(day, hour)
  {
	if($scope.startdrag.dag == day && $scope.startdrag.hour <= hour && $scope.dragover.hour >= hour)
	{
		return "dragappointment";
	}
	return "";
  }
  $scope.getAppointment = function(day, hour)
  {
	var appointments = $scope.appointments;
	for(var i = 0; i < appointments.length; i++)
	{
		var appointment = appointments[i];
		if(appointment.day == day && appointment.hourfrom <= hour && appointment.hourto >= hour)
		{
			return "appointment";
		}
	}
	return "";
  }
});