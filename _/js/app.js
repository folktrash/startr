var app = window.APP || {};
APP = (function () {
	var method, api;
	method = {boot: function () {APP.Harness.boot();}};
	api    = {boot: function () {method.boot();}};
	return api;
}());

APP.Harness = (function () {
	var property, method, api;
	method = {
		boot: function () {
			APP.Analytics.boot();
			APP.Module.boot();
			//boot all the things!
		}
	};
	api = {boot: function () {method.boot();}};
	return api;
}());

APP.Module = (function () {
	var property, method, api;
	property = {
		locale: {}
	};
	method = {
		boot: function () {
			APP.Dev.logGroupStart('APP.Module.boot();');
			method.helloWorld();
			method.getLocation();
			APP.Dev.logGroupEnd();
		},
		helloWorld: function () {
			APP.Dev.log('hello world!');
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
	api = {//put pointers here to expose methods
		boot: function () {method.boot();}
	};
	return api;
}());

APP.Analytics = (function () {
	var property, method, api;
	property = {
		account: 'XXXXXXXX-X'
	};
	method = {
		boot: function () {
			APP.Dev.log('GA code here');
			//set glocal array for GA with account number
			//load ga via yepnope
		}
	};
	api = {boot: function () {method.boot();}};
	return api;
}());

APP.Dev = (function () {
	var property, method, api;
	property = {
		debugMode: true,
		label: null
	};
	method = {//implementation
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
	api = {//interface
		log: function (message, thing) {
			method.consoleLog(message, thing);
		},
		logGroupStart: function (label) {
			method.consoleGroup(label);
		},
		logGroupEnd: function () {
			method.consoleGroupEnd();
		}
	};
	return api;
}());


//http://folktrash.com