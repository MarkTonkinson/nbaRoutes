var app = angular.module('nbaRoutes');

app.service('teamService', function($http, $q){
	this.addNewGame = function(gameObj){
		
		var url = "https://api.parse.com/1/classes/" + gameObj.homeTeam;
		
		if(parseInt(gameObj.homeTeamScore) > parseInt(gameObj.opponentScore)){ //parseInt() function, not a method
			gameObj.won = true;
		} else {
			gameObj.won =false;
		}
		
		return $http({
			method: 'POST',
			url: url,  //may need to put quotes around this if getting errors
			data: gameObj
		})	
	}

	this.getTeamData = function(team){
		var deferred = $q.defer();
		var url = 'https://api.parse.com/1/classes/' + team
		$http({
			method: 'GET',
			url: url,
		}).then(function(data){
			var results = data.data.results;
			var wins = 0;
			var losses = 0;
			for (var i = 0; i < results.length; i++) {
				if(results[i].won){
					wins = wins + 1;
				} else {
					losses = losses + 1;
				}
			}
			results.wins = wins;  //adding properties to the array
			results.losses = losses;  // by using our declared variable
			deferred.resolve(results);
		})
		return deferred.promise

	}
});