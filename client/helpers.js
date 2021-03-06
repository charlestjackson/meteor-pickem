
Handlebars.registerHelper('hourOptions', function(selectedHour) {
	var html = '';
	
	for (var hr = 0; hr < 24; hr++) {
		var formatted = (hr < 10 ? "0" + hr : hr.toString());
		if (hr === selectedHour)
			html += '<option selected>' + formatted + '</option>';
		else
			html += '<option>' + formatted + '</option>';
	}
	
	return new Handlebars.SafeString(html);
});

Handlebars.registerHelper('minuteOptions', function(selectedMinute) {
	var html = '';
	
	for (var min = 0; min < 60; min += 5) {
		var formatted = (min < 10 ? "0" + min : min.toString());
		
		if (min === selectedMinute)
			html += '<option selected>' + formatted + '</option>';
		else
			html += '<option>' + formatted + '</option>';
	}
	
	return new Handlebars.SafeString(html);
});

Handlebars.registerHelper('victorOptions', function() {
	var html = '';
	
	html += '<option></option>';
	
	if (this.actual === this.away) {
		html += '<option selected>' + this.away + '</option>';
	} else {
		html += '<option>' + this.away + '</option>';
	}
	
	if (this.actual === this.home) {
		html += '<option selected>' + this.home + '</option>';
	} else {
		html += '<option>' + this.home + '</option>';
	}
	
	return new Handlebars.SafeString(html);
})