angular.module('recommandModule', [])

.controller('recommandCtrl', function ($scope, information, $http) {
  $http.get('/fetchAllRatings').then(function (allRatings) {
    var allFriends = {};
    for (var rating in allRatings) {
      if (allFriends[rating.name] === undefined){
        allFriends[rating.name] = {
          count: 1,
          pic:rating.pic,	
          accum: [rating.activityLevel, rating.spendingLevel, rating.partyingLevel, rating.nerdyLevel, rating.talkativeLevel]
        }
      }else {
      	allFriends[rating.name].count += 1;
      	allFriends[rating.name].accum[0] += rating.activityLevel;
        allFriends[rating.name].accum[1] += rating.spendingLevel;
        allFriends[rating.name].accum[2] += rating.partyingLevel;
        allFriends[rating.name].accum[3] += rating.nerdyLevel;
        allFriends[rating.name].accum[4] += rating.talkativeLevel;
      }
    }

    var allFriendsArray = [];
    var currentUserInfo = allFriends[information.currentUserFirstname];
    currentUserInfo.average= [];
    currentUserInfo.average.push(Math.round(allFriends[friend].accum[0]/allFriends[friend].count*10)/10);
  	currentUserInfo.average.push(Math.round(allFriends[friend].accum[1]/allFriends[friend].count*10)/10);
  	currentUserInfo.average.push(Math.round(allFriends[friend].accum[2]/allFriends[friend].count*10)/10);
  	currentUserInfo.average.push(Math.round(allFriends[friend].accum[3]/allFriends[friend].count*10)/10);
  	currentUserInfo.average.push(Math.round(allFriends[friend].accum[4]/allFriends[friend].count*10)/10);
    for (var friend in allFriends) {
    	allFriends[friend].absDiffAccum = Math.abs(currentUserInfo.average[0]-Math.round(allFriends[friend].accum[0]/allFriends[friend].count*10)/10) 
                                        + Math.abs(currentUserInfo.average[1]-Math.round(allFriends[friend].accum[1]/allFriends[friend].count*10)/10)
                                        + Math.abs(currentUserInfo.average[2]-Math.round(allFriends[friend].accum[2]/allFriends[friend].count*10)/10)
                                        + Math.abs(currentUserInfo.average[3]-Math.round(allFriends[friend].accum[3]/allFriends[friend].count*10)/10)
                                        + Math.abs(currentUserInfo.average[4]-Math.round(allFriends[friend].accum[4]/allFriends[friend].count*10)/10);
      allFriendsArray.push(allFriends[friend]);
    }
    allFriendsArray.sort(function(a, b) {
    	return a.absDiffAccum - b.absDiffAccum;
    })
    $scope.bestFits = allFriendsArray.slice(0,5);
  })
})