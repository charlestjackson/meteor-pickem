var adminId = 'b3b31f73-83ef-4e8a-b185-6bc2465088d8';

Matchups = new Meteor.Collection("matchups");
Games = new Meteor.Collection("games");

Games.allow({
	insert: function (userId, game) {
		//console.log('userid: ' + userId + ', owner: ' + game.owner);
		return userId && game.owner === userId;
	},
	update: function(userId, games, fields, modifier) {
		return _.all(games, function(game) {
			// admin user can do anything
			if (userId === adminId) 
				return true;
				
			if (userId !== game.owner)
				return false;
				
			var allowed = ['awaySelected', 'homeSelected'];
			if (_.difference(fields, allowed).length)
				return false; // tried to write to forbidden field
				
			return true;
		});
	},
	remove: function(userId, games) {
      return _.all(games, function(game) {
        return userId === game.owner;
      });
	}
});

Matchups.allow( {
	insert: function(userId, matchup) {
		return userId && matchup.owner === userId;
	},
	
	update: function(userId, matchups, fields, modifier) {
		return _.all(matchups, function(matchup) {
			// admin user can do anything
			if (userId === adminId)
				return true;
			
			if (userId != matchup.owner && userId != adminId) 
				return false;
				
			var allowed = ['kickoff', 'week'];
			if (_.difference(fields, allowed).length)
				return false;
				
			return true;
		});
	},
	
	remove: function(userId, matchups) {
		return _.all(matchups, function(matchup) {
			return userId === matchup.owner;
		})
	}
});