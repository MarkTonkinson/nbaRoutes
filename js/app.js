var app = angular.module('nbaRoutes', ['ngRoute']);

app.config(function($routeProvider, $httpProvider){
  $httpProvider.interceptors.push('httpRequestInterceptor');

  $routeProvider.when('/',{  //this slash may need to be index.html as well as the one in the otherwise.
  	templateUrl: 'js/home/homeTmpl.html',
  	controller: 'homeCtrl'
  }).when('/teams/:team',{
  	templateUrl: 'js/teams/teamtmpl.html',
  	controller: 'teamCtrl',//this calls the team controller and therefore resolve knows everthing taht is in it
  	resolve: {
  		teamData: function($route, teamService){ //do I need to inject teamService in this function?
  			return teamService.getTeamData($route.current.params.team);
  		}
  	}
  }).otherwise('/', {
  	templateUrl: 'js/home/homeTmpl.html',
  	controller: 'homeCtrl'
  });

});