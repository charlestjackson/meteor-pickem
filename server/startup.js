
Meteor.startup(function () {
	// code to run on server at startup
	if (Matchups.find().count() == 0) {
		var hrs = new Date().getTimezoneOffset() / 60;
		
		Matchups.insert({ owner: adminId, week: 11, away: 'Miami Dolphins', awayIcon: 'dolphins.gif', home: 'Buffalo Bills', homeIcon: 'bills.gif', kickoff: new Date(2012, 10, 15, 20 - hrs, 20, 0).getTime()});
		Matchups.insert({ owner: adminId, week: 11, away: 'Arizona Cardinals', awayIcon: 'cardinals.gif', home: 'Atlanta Falcons', homeIcon: 'falcons.gif', kickoff: new Date(2012, 10, 18, 13 - hrs, 0, 0).getTime()});
		Matchups.insert({ owner: adminId, week: 11, away: 'Cleveland Browns', awayIcon: 'browns.gif', home: 'Dallas Cowboys', homeIcon: 'cowboys.gif',kickoff: new Date(2012, 10, 18, 13 - hrs, 0, 0).getTime()});
		Matchups.insert({ owner: adminId, week: 11, away: 'Green Bay Packers', awayIcon: 'packers.gif', home: 'Detroit Lions', homeIcon: 'lions.gif',kickoff: new Date(2012, 10, 18, 13 - hrs, 0, 0).getTime()});

	}
});