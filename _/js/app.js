var app = window.app || {};

app = (function () {
	var method = {boot: function () {app.Harness.boot();}};
	var api    = {boot: function () {method.boot();}};
	return api;
}());

app.Harness = (function () {
	var method = {
		boot: function () {//boot all the things!
			app.Analytics.boot();
			app.Module.boot();
		}
	};
	var api = {boot: method.boot};
	return api;
}());

app.Module = (function () {
	var property = {
		locale: {}
	};
	var method = {
		boot: function () {
			method.helloWorld();
			method.getLocation();
		},
		helloWorld: function () {
			app.Dev.log('hello world!');
		},
		getLocation: function () {
			navigator.geolocation.getCurrentPosition(function (position) {method.setLocation(position);});
		},
		setLocation: function (position) {
			property.locale.lat = position.coords.latitude;
			property.locale.lon = position.coords.longitude;
			APP.Dev.log('you seem to be here: ', property.locale);
		}
	};
	var api = {
		boot: method.boot
	};
	return api;
}());

app.Analytics = (function () {
	var property = {
		account: 'XXXXXXXX-X'
	};
	var method = {
		boot: function () {
			app.Dev.log('GA code here');
			//set glocal array for GA with account number
			//load ga via yepnope
		}
	};
	var api = {boot: function () {method.boot();}};
	return api;
}());

app.Dev = (function () {
	var property = {
		debugMode: true,
		label: null
	};
	var method = {
		consoleLog: function (message, thing) {
			if (property.debugMode && typeof (console) !== 'undefined') {
				if (thing) {
					console.log(message, thing);
				} else {
					console.log(message);
				}
			}
		},
		consoleGroup: function (label) {
			if (property.debugMode && typeof (console) !== 'undefined' && console.groupCollapsed) {
				console.groupCollapsed(label);
			}
		},
		consoleGroupEnd: function () {
			if (property.debugMode && typeof (console) !== 'undefined' && console.groupEnd) {
				console.groupEnd();
			}
		},
		time: function (label) {
			if (property.debugMode && typeof (console) !== 'undefined' && console.time) {
				property.label = label;
				console.time(label);
			}
		},
		timeEnd: function () {
			if (property.debugMode && typeof (console) !== 'undefined' && console.timeEnd) {
				console.timeEnd(property.label);
				property.label = null;
			}
		}
	};
	var api = {
		log: method.consoleLog,
		logGroupStart: method.consoleGroup,
		logGroupEnd: method.consoleGroupEnd
	};
	return api;
}());