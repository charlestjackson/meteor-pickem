var teams =  [ 
	"Arizona Cardinals", 
	"Atlanta Falcons", 
	"Baltimore Ravens",
	"Buffalo Bills",
	"Carolina Panthers",
	"Chicago Bears", 
	"Cincinnati Bengals",
	"Cleveland Browns",
	"Dallas Cowboys",
	"Denver Broncos",
	"Detroit Lions", 
	"Green Bay Packers",
	"Houston Texans",
	"Indianapolis Colts",
	"Jacksonville Jaguars",
	"Kansas City Chiefs", 
	"Miami Dolphins",
	"Minnesota Vikings", 
	"New England Patriots", 
	"New Orleans Saints", 
	"New York Giants",
	"New York Jets",
	"Oakland Raiders",
	"Philadelphia Eagles",
	"Pittsburgh Steelers",
	"San Diego Chargers",
	"San Francisco 49ers", 
	"Seattle Seahawks",
	"St. Louis Rams",
	"Tampa Bay Buccaneers",
	"Tennessee Titans",
	"Washington Redskins",
];

var icons = {
	"Arizona Cardinals" : "cardinals.gif",
	"Atlanta Falcons" : "falcons.gif",
	"Baltimore Ravens" : "ravens.gif",
	"Buffalo Bills" : "bills.gif",
	"Carolina Panthers" : "panthers.gif",
	"Chicago Bears" : "bears.gif",
	"Cincinnati Bengals" : "bengals.gif",
	"Cleveland Browns" : "browns.gif",
	"Dallas Cowboys" : "cowboys.gif",
	"Denver Broncos" : "broncos.gif",
	"Detroit Lions" : "lions.gif", 
	"Green Bay Packers" : "packers.gif",
	"Houston Texans" : "texans.gif",
	"Indianapolis Colts" : "colts.gif",
	"Jacksonville Jaguars" : "jaguars.gif",
	"Kansas City Chiefs" : "chiefs.gif", 
	"Miami Dolphins" : "dolphins.gif",
	"Minnesota Vikings" : "vikings.gif", 
	"New England Patriots" : "patriots.gif", 
	"New Orleans Saints" : "saints.gif", 
	"New York Giants" : "giants.gif",
	"New York Jets" : "jets.gif",
	"Oakland Raiders" : "raiders.gif",
	"Philadelphia Eagles" : "eagles.gif",
	"Pittsburgh Steelers" : "steelers.gif",
	"San Diego Chargers" : "chargers.gif",
	"San Francisco 49ers" : "49ers.gif", 
	"Seattle Seahawks" : "seahawks.gif",
	"St. Louis Rams" : "rams.gif",
	"Tampa Bay Buccaneers" : "buccaneers.gif",
	"Tennessee Titans" : "titans.gif",
	"Washington Redskins" : "redskins.gif"
};


var DPGlobal = {
	modes: [
		{
			clsName: 'days',
			navFnc: 'Month',
			navStep: 1
		},
		{
			clsName: 'months',
			navFnc: 'FullYear',
			navStep: 1
		},
		{
			clsName: 'years',
			navFnc: 'FullYear',
			navStep: 10
	}],
	dates:{
		days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
		daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
		daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
		months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	},
	isLeapYear: function (year) {
		return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0))
	},
	getDaysInMonth: function (year, month) {
		return [31, (DPGlobal.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
	},
	parseFormat: function(format){
		var separator = format.match(/[.\/\-\s].*?/),
			parts = format.split(/\W+/);
		if (!separator || !parts || parts.length === 0){
			throw new Error("Invalid date format.");
		}
		return {separator: separator, parts: parts};
	},
	parseDate: function(date, format) {
		var parts = date.split(format.separator),
			date = new Date(),
			val;
		date.setHours(0);
		date.setMinutes(0);
		date.setSeconds(0);
		date.setMilliseconds(0);
		if (parts.length === format.parts.length) {
			for (var i=0, cnt = format.parts.length; i < cnt; i++) {
				val = parseInt(parts[i], 10)||1;
				switch(format.parts[i]) {
					case 'dd':
					case 'd':
						date.setDate(val);
						break;
					case 'mm':
					case 'm':
						date.setMonth(val - 1);
						break;
					case 'yy':
						date.setFullYear(2000 + val);
						break;
					case 'yyyy':
						date.setFullYear(val);
						break;
				}
			}
		}
		return date;
	},
	formatDate: function(date, format){
		var val = {
			d: date.getDate(),
			m: date.getMonth() + 1,
			yy: date.getFullYear().toString().substring(2),
			yyyy: date.getFullYear()
		};
		val.dd = (val.d < 10 ? '0' : '') + val.d;
		val.mm = (val.m < 10 ? '0' : '') + val.m;
		var date = [];
		for (var i=0, cnt = format.parts.length; i < cnt; i++) {
			date.push(val[format.parts[i]]);
		}
		return date.join(format.separator);
	}
};