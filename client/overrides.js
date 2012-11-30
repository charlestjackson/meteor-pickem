/*****************
	Overrides
*****************/

Meteor.loginWithPassword = _.wrap(Meteor.loginWithPassword, function(login) {

	// Store the original arguments
	var args = _.toArray(arguments).slice(1),
		user = args[0],
		pass = args[1],
		origCallback = args[2];

	var newCallback = function(error, result) {
		var myGames = Games.findOne({ owner: Meteor.userId(), week: Session.get("currentWeek")});

		if (!myGames) {
			//console.log(Meteor.userId());
			Matchups.find({ week: Session.get("currentWeek") }).forEach(function(matchup) {
				matchup.owner = Meteor.userId();
				delete matchup._id;

				Games.insert(matchup);
			});
		}

		origCallback.call(this, error, result);
	}

	login(user, pass, newCallback);

});

Accounts.createUser = _.wrap(Accounts.createUser, function(createUser) {

	// Store the original arguments
	var args = _.toArray(arguments).slice(1),
		user = args[0];
		origCallback = args[1];

	var newCallback = function(error) {
		var myGames = Games.findOne({ owner: Meteor.userId(), week: Session.get("currentWeek")});
		
		if (!myGames) {
			//console.log(Meteor.userId());
			Matchups.find({ week: Session.get("currentWeek") }).forEach(function(matchup) {
				matchup.owner = Meteor.userId();
				delete matchup._id;

				Games.insert(matchup);
			});
		}
		
		origCallback.call(this, error);
	};

	createUser(user, newCallback);
});