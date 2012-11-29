// Simulates PHP's date function
// from http://jacwright.com/projects/javascript/date_format/
Date.prototype.format=function(format){var returnStr='';var replace=Date.replaceChars;for(var i=0;i<format.length;i++){var curChar=format.charAt(i);if(i-1>=0&&format.charAt(i-1)=="\\"){returnStr+=curChar}else if(replace[curChar]){returnStr+=replace[curChar].call(this)}else if(curChar!="\\"){returnStr+=curChar}}return returnStr};Date.replaceChars={shortMonths:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],longMonths:['January','February','March','April','May','June','July','August','September','October','November','December'],shortDays:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],longDays:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],d:function(){return(this.getDate()<10?'0':'')+this.getDate()},D:function(){return Date.replaceChars.shortDays[this.getDay()]},j:function(){return this.getDate()},l:function(){return Date.replaceChars.longDays[this.getDay()]},N:function(){return this.getDay()+1},S:function(){return(this.getDate()%10==1&&this.getDate()!=11?'st':(this.getDate()%10==2&&this.getDate()!=12?'nd':(this.getDate()%10==3&&this.getDate()!=13?'rd':'th')))},w:function(){return this.getDay()},z:function(){var d=new Date(this.getFullYear(),0,1);return Math.ceil((this-d)/86400000)}, W:function(){var d=new Date(this.getFullYear(),0,1);return Math.ceil((((this-d)/86400000)+d.getDay()+1)/7)},F:function(){return Date.replaceChars.longMonths[this.getMonth()]},m:function(){return(this.getMonth()<9?'0':'')+(this.getMonth()+1)},M:function(){return Date.replaceChars.shortMonths[this.getMonth()]},n:function(){return this.getMonth()+1},t:function(){var d=new Date();return new Date(d.getFullYear(),d.getMonth(),0).getDate()},L:function(){var year=this.getFullYear();return(year%400==0||(year%100!=0&&year%4==0))},o:function(){var d=new Date(this.valueOf());d.setDate(d.getDate()-((this.getDay()+6)%7)+3);return d.getFullYear()},Y:function(){return this.getFullYear()},y:function(){return(''+this.getFullYear()).substr(2)},a:function(){return this.getHours()<12?'am':'pm'},A:function(){return this.getHours()<12?'AM':'PM'},B:function(){return Math.floor((((this.getUTCHours()+1)%24)+this.getUTCMinutes()/60+this.getUTCSeconds()/ 3600) * 1000/24)}, g:function(){return this.getHours()%12||12},G:function(){return this.getHours()},h:function(){return((this.getHours()%12||12)<10?'0':'')+(this.getHours()%12||12)},H:function(){return(this.getHours()<10?'0':'')+this.getHours()},i:function(){return(this.getMinutes()<10?'0':'')+this.getMinutes()},s:function(){return(this.getSeconds()<10?'0':'')+this.getSeconds()},u:function(){var m=this.getMilliseconds();return(m<10?'00':(m<100?'0':''))+m},e:function(){return"Not Yet Supported"},I:function(){return"Not Yet Supported"},O:function(){return(-this.getTimezoneOffset()<0?'-':'+')+(Math.abs(this.getTimezoneOffset()/60)<10?'0':'')+(Math.abs(this.getTimezoneOffset()/60))+'00'},P:function(){return(-this.getTimezoneOffset()<0?'-':'+')+(Math.abs(this.getTimezoneOffset()/60)<10?'0':'')+(Math.abs(this.getTimezoneOffset()/60))+':00'},T:function(){var m=this.getMonth();this.setMonth(0);var result=this.toTimeString().replace(/^.+ \(?([^\)]+)\)?$/,'$1');this.setMonth(m);return result},Z:function(){return-this.getTimezoneOffset()*60},c:function(){return this.format("Y-m-d\\TH:i:sP")},r:function(){return this.toString()},U:function(){return this.getTime()/1000}};

if (!Session.get("currentWeek"))
	Session.set("currentWeek", 13);

Session.set("dpDateFormat", "mm-dd-yyyy");

/*************************
	Global functions
*************************/

function isAdmin() {
	return Meteor.userId() && Meteor.userId() === adminId;
}

function weeks() {
	return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
}

function isCurrentWeek(week) {
	return Session.equals("currentWeek", parseInt(week));
}

function adjustDateUp(millis) {
	return millis + (new Date().getTimezoneOffset() * 60 * 1000);
}

function adjustDateDown(millis) {
	return millis - (new Date().getTimezoneOffset() * 60 * 1000)
}

/********************
	Template.page
********************/

Template.page.showCreateDialog = function() {
	return Session.get("showCreateDialog");
}

Template.page.showModifyDialog = function() {
	return Session.get("modifyDialog");
}

/**********************
	Template.weeks
**********************/

Template.weeks.allWeeks = function() {
	return weeks();
}

Template.weeks.isCurrentWeek = function() {
	return isCurrentWeek(this);
}

Template.weeks.events = {
	'click .week' : function() {
		Session.set("currentWeek", this);
	}
}

/*********************
	Template.games
*********************/

Template.games.games = function() {
	return Games.find({ week: Session.get("currentWeek"), owner: Meteor.userId() }, { sort: { kickoff: 1, home: 1 } });	
};

Template.games.canCreate = function() {
	return isAdmin();
}

Template.games.events = {
	'click .createGame' : function() {
		Session.set('showCreateDialog', true);
	}
	
}

/*******************
	Template.game
*******************/

Template.game.kickoff = function() {
	var millis = adjustDateUp(this.kickoff);
	//var millis = this.kickoff + (new Date().getTimezoneOffset() * 60 * 1000);
	return new Date(millis).format("D M d h:i A");
}

Template.game.canModify = function() {
	return isAdmin();
}

Template.game.events = {
	'click .pick-away': function(e) {
		console.log('picked ' + this.away);
		Games.update({ _id: this._id}, { $set: { awaySelected: true, homeSelected: false } });
	},
	'click .pick-home': function() {
		console.log('picked ' + this.home);
		Games.update({ _id: this._id}, { $set: { homeSelected: true, awaySelected: false } });
	},
	'click .delete-game' : function(event, template) {
		var home = this.home;
		var away = this.away;
		var id = this._id;
		var week = this.week;
		
		Games.remove({ _id: id });
		Matchups.remove({ home: home, away: away, week: week });
	},
	'click .modify-game' : function() {
		Session.set("modifyDialog", { away: this.away, home: this.home });
	}
};

/*****************************
	Template.createDialog
*****************************/

Template.createDialog.teams = function() {
	return teams;
}

Template.createDialog.weeks = function() {
	return weeks();
}

Template.createDialog.isCurrentWeek = function() {
	return isCurrentWeek(this);
}

Template.createDialog.rendered = function() {
	if (!Session.get("kickoffDate")) {
		Session.set("kickoffDate", new Date());
	}
	
	$('#kickoff-dp').datepicker();
}

Template.createDialog.lastKickoffDate = function() {
	var dt = new Date();
	
	if (Session.get("kickoffDate")) 
		dt = new Date(Session.get("kickoffDate"));
		
	return dt.format("m-d-Y");
}

Template.createDialog.error = function () {
  return Session.get("createError");
};

Template.createDialog.dateFormat = function() {
	return Session.get("dpDateFormat");
}

Template.createDialog.hours = function() {
	var hrs = new Array();
	for (var i = 11; i < 24; i++) {
		if (i < 10 )
			hrs.push("0" + i);
		else	
			hrs.push(i.toString());
	}
	
	return hrs;
}

Template.createDialog.minutes = function() {
	var mins = new Array();
	for (var i = 0; i < 60; i = i + 5) {
		if (i < 10) 
			mins.push("0" + i);
		else
			mins.push(i.toString());
	}
	return mins;
}

Template.createDialog.events({
	'click .save': function (event, template) {
		var away = template.find(".away").value;
		var home = template.find(".home").value;
		var week = parseInt(template.find(".week").value);
		var kickoff = DPGlobal.parseDate(template.find(".kickoff").value, DPGlobal.parseFormat(Session.get("dpDateFormat")));
		kickoff.setHours(template.find(".time-hour").value);
		kickoff.setMinutes(template.find(".time-minute").value);
		kickoff.setSeconds(0);
		kickoff = adjustDateDown(kickoff.getTime());//kickoff.getTime() - (kickoff.getTimezoneOffset() * 60 * 1000);
		
		var awayIcon = icons[away];
		var homeIcon = icons[home];
		
		Matchups.insert({ owner: adminId, week: week, away: away, awayIcon: awayIcon, home: home, homeIcon: homeIcon, kickoff: kickoff });
		Games.insert({ owner: Meteor.userId(), week: week, away: away, awayIcon: awayIcon, home: home, homeIcon: homeIcon, kickoff: kickoff });
		
		Session.set("showCreateDialog", false);
	},

	'click .cancel': function () {
		Session.set("showCreateDialog", false);
	}
});

/*****************************
	Template.modifyDialog
*****************************/

Template.modifyDialog.currentMatchup = function() {
	if (!Session.get("modifyDialog"))
		return;
	return Matchups.findOne({ home: Session.get("modifyDialog").home, away: Session.get("modifyDialog").away });
}

Template.modifyDialog.isSelectedWeek = function() {
	return isCurrentWeek(this);
}

Template.modifyDialog.weeks = function() {
	return weeks();
}

Template.modifyDialog.rendered = function() {
	if (!Session.get("kickoffDate")) {
		Session.set("kickoffDate", new Date());
	}
	
	$('#kickoff-dp').datepicker();
}

Template.modifyDialog.kickoffDate = function() {
	var dt = new Date(adjustDateUp(this.kickoff));
	
	var month = dt.getMonth() + 1;
	var day = dt.getDate();
	var year = dt.getFullYear();
	return month + "-" + day + "-" + year;
}

Template.modifyDialog.kickoffHour = function() {
	var dt = new Date(adjustDateUp(this.kickoff));
	
	return dt.getHours();
}

Template.modifyDialog.kickoffMinute = function(minute) {
	var dt = new Date(adjustDateUp(this.kickoff));
	
	return dt.getMinutes();
}

Template.modifyDialog.lastKickoffDate = function() {
	var dt = new Date();
	
	if (Session.get("kickoffDate")) 
		dt = new Date(Session.get("kickoffDate"));
		
	return dt.format("m-d-Y");
}

Template.modifyDialog.error = function () {
  return Session.get("createError");
};

Template.modifyDialog.dateFormat = function() {
	return Session.get("dpDateFormat");
}

Template.modifyDialog.events({
	'click .save': function (event, template) {
		var away = template.find(".away").value;
		var home = template.find(".home").value;
		var week = parseInt(template.find(".week").value);
		var origWeek = parseInt(template.find('.orig-week').value);
		var kickoff = DPGlobal.parseDate(template.find(".kickoff").value, DPGlobal.parseFormat(Session.get("dpDateFormat")));
		kickoff.setHours(template.find(".time-hour").value);
		kickoff.setMinutes(template.find(".time-minute").value);
		kickoff.setSeconds(0);
		kickoff = adjustDateDown(kickoff.getTime());
		
		Matchups.update({ home: home, away: away, week: origWeek }, 
			            { $set: { week: week, kickoff: kickoff }}, 
			            { multi: false });
			
		Games.update({ home: home, away: away, week: origWeek },
			         { $set: { week: week, kickoff: kickoff }},
			         { multi: true });
		//Matchups.insert({ owner: adminId, week: week, away: away, awayIcon: awayIcon, home: home, homeIcon: homeIcon, kickoff: kickoff });
		//Games.insert({ owner: Meteor.userId(), week: week, away: away, awayIcon: awayIcon, home: home, homeIcon: homeIcon, kickoff: kickoff });
		
		Session.set("modifyDialog", undefined);
	},

	'click .cancel': function () {
		Session.set("modifyDialog", undefined);
	}
});


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