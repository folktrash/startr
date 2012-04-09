var fetch = window.FETCH || {};
FETCH = (function () {
	var property, method, api;
	method = {boot: function () {yepnope([{load: ['_/js/jquery-1.7.2.min.js','_/js/app.js'],complete: function () {APP.boot();}}]);}};
	api = {boot: function () {method.boot();}};
	return api;
}());