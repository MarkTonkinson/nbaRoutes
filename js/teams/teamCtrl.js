var app = angular.module('nbaRoutes');

app.controller('teamCtrl', function($scope, $routeParams, teamService, teamData){
	$scope.teamData = teamData;
	console.log($scope.teamData);
	$scope.newGame = {};
	$scope.showNewGameForm = false;
	$scope.toggleNewGameForm = function(){
		$scope.showNewGameForm = !$scope.showNewGameForm;
	} //why do I have a false and a toggle?
	if($routeParams.team === 'utahjazz'){
		$scope.homeTeam = 'Utah Jazz';
		$scope.logoPath = "images/jazz-logo.png";
	} else if ($routeParams.team  === 'miamiheat'){
		$scope.homeTeam = "Miami Heat";
		$scope.logoPath = "images/heat-logo.png";
	} else if ($routeParams.team === 'losangeleslakers'){
		$scope.homeTeam = "Los Angeles Lakers";
		$scope.logoPath = "images/lakers-logo.png";
	}
	$scope.submitGame = function(){

		$scope.newGame.homeTeam = $scope.homeTeam.split(' ').join('').toLowerCase();//the homeTeam is a new object we are creating that
		//doesn't call on the other one because its a scope object
		teamService.addNewGame($scope.newGame)//takes the whole object  - all the newGame properties added on the template
		.then(function(){
			teamService.getTeamData($scope.newGame.homeTeam)
			.then(function(data){ //don't I need something inside of here
				$scope.teamData = data;
				$scope.newGame = {};
				$scope.showNewGameForm = false;
			})
		});
		
	}

});