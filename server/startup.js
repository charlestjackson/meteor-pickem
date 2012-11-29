Meteor.publish('allteams', function() {
	return Teams.find({});
});

Meteor.publish('allmatchups', function() {
	return Matchups.find({});
});

Meteor.publish('mygames', function() {
	return Games.find({ owner: this.userId });
});


Meteor.startup(function () {
	// code to run on server at startup
	if (Matchups.find().count() == 0) {
		var hrs = new Date().getTimezoneOffset() / 60;
		
		Matchups.insert({ owner: adminId, week: 11, away: 'Miami Dolphins', awayIcon: 'dolphins.gif', home: 'Buffalo Bills', homeIcon: 'bills.gif', kickoff: new Date(2012, 10, 15, 20 - hrs, 20, 0).getTime()});
		Matchups.insert({ owner: adminId, week: 11, away: 'Arizona Cardinals', awayIcon: 'cardinals.gif', home: 'Atlanta Falcons', homeIcon: 'falcons.gif', kickoff: new Date(2012, 10, 18, 13 - hrs, 0, 0).getTime()});
		Matchups.insert({ owner: adminId, week: 11, away: 'Cleveland Browns', awayIcon: 'browns.gif', home: 'Dallas Cowboys', homeIcon: 'cowboys.gif',kickoff: new Date(2012, 10, 18, 13 - hrs, 0, 0).getTime()});
		Matchups.insert({ owner: adminId, week: 11, away: 'Green Bay Packers', awayIcon: 'packers.gif', home: 'Detroit Lions', homeIcon: 'lions.gif',kickoff: new Date(2012, 10, 18, 13 - hrs, 0, 0).getTime()});

	}
	
	if (Teams.find().count() == 0) {
		
		Teams.insert({ owner: adminId, name: 'San Francisco 49ers', icon: '49ers.gif', wins: 8, losses: 2, ties: 1 });
		Teams.insert({ owner: adminId, name: 'Chicago Bears', icon: 'bears.gif', wins: 8, losses: 3, ties: 0 });
		Teams.insert({ owner: adminId, name: 'Cincinnati Bengals', icon: 'bengals.gif', wins: 6, losses: 5, ties: 0 });
		Teams.insert({ owner: adminId, name: 'Buffalo Bills', icon: 'bills.gif', wins: 4, losses: 7, ties: 0 });
		Teams.insert({ owner: adminId, name: 'Denver Broncos', icon: 'broncos.gif', wins: 8, losses: 3, ties: 0 });
		Teams.insert({ owner: adminId, name: 'Cleveland Browns', icon: 'browns.gif', wins: 3, losses: 8, ties: 0 });
		Teams.insert({ owner: adminId, name: 'Tampa Bay Buccaneers', icon: 'buccaneers.gif', wins: 6, losses: 5, ties: 0 });
		Teams.insert({ owner: adminId, name: 'Arizona Cardinals', icon: 'cardinals.gif', wins: 4, losses: 7, ties: 0 });
		Teams.insert({ owner: adminId, name: 'San Diego Chargers', icon: 'chargers.gif', wins: 4, losses: 7, ties: 0 });
		Teams.insert({ owner: adminId, name: 'Kansas City Chiefs', icon: 'chiefs.gif', wins: 1, losses: 10, ties: 0 });
		Teams.insert({ owner: adminId, name: 'Indianapolis Colts', icon: 'colts.gif', wins: 7, losses: 4, ties: 0 });
		Teams.insert({ owner: adminId, name: 'Dallas Cowboys', icon: 'cowboys.gif', wins: 5, losses: 6, ties: 0 });
		Teams.insert({ owner: adminId, name: 'Miami Dolphins', icon: 'dolphins.gif', wins: 5, losses: 6, ties: 0 });
		Teams.insert({ owner: adminId, name: 'Philadelphia Eagles', icon: 'eagles.gif', wins: 3, losses: 8, ties: 0 });
		Teams.insert({ owner: adminId, name: 'Atlanta Falcons', icon: 'falcons.gif', wins: 10, losses: 1, ties: 0 });
		Teams.insert({ owner: adminId, name: 'New York Giants', icon: 'giants.gif', wins: 7, losses: 4, ties: 0 });
		Teams.insert({ owner: adminId, name: 'Jacksonville Jaguars', icon: 'jaguars.gif', wins: 2, losses: 9, ties: 0 });
		Teams.insert({ owner: adminId, name: 'New York Jets', icon: 'jets.gif', wins: 4, losses: 7, ties: 0 });
		Teams.insert({ owner: adminId, name: 'Detroit Lions', icon: 'lions.gif', wins: 4, losses: 7, ties: 0 });
		Teams.insert({ owner: adminId, name: 'Green Bay Packers', icon: 'packers.gif', wins: 7, losses: 4, ties: 0 });
		Teams.insert({ owner: adminId, name: 'Carolina Panthers', icon: 'panthers.gif', wins: 3, losses: 8, ties: 0 });
		Teams.insert({ owner: adminId, name: 'New England Patriots', icon: 'patriots.gif', wins: 8, losses: 3, ties: 0 });
		Teams.insert({ owner: adminId, name: 'Oakland Raiders', icon: 'raiders.gif', wins: 3, losses: 8, ties: 0 });
		Teams.insert({ owner: adminId, name: 'St. Louis Rams', icon: 'rams.gif', wins: 4, losses: 6, ties: 1 });
		Teams.insert({ owner: adminId, name: 'Baltimore Ravens', icon: 'ravens.gif', wins: 9, losses: 2, ties: 0 });
		Teams.insert({ owner: adminId, name: 'Washington Redskins', icon: 'redskins.gif', wins: 5, losses: 6, ties: 0 });
		Teams.insert({ owner: adminId, name: 'New Orleans Saints', icon: 'saints.gif', wins: 5, losses: 6, ties: 0 });
		Teams.insert({ owner: adminId, name: 'Seattle Seahawks', icon: 'seahawks.gif', wins: 6, losses: 5, ties: 0 });
		Teams.insert({ owner: adminId, name: 'Pittsburgh Steelers', icon: 'steelers.gif', wins: 6, losses: 5, ties: 0 });
		Teams.insert({ owner: adminId, name: 'Houston Texans', icon: 'texans.gif', wins: 10, losses: 1, ties: 0 });
		Teams.insert({ owner: adminId, name: 'Tennessee Titans', icon: 'titans.gif', wins: 4, losses: 7, ties: 0 });
		Teams.insert({ owner: adminId, name: 'Minnesota Vikings', icon: 'vikings.gif', wins: 6, losses: 5, ties: 0 });
	}
});