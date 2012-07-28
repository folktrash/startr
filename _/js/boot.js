var boot = window.boot || {};
boot = (function () {
	var property, method, api;
	method = {strap: function () {yepnope([{load: ['_/js/lib/jq.js','_/js/app.js'],complete: function () {app.boot();}}]);}};
	api = {strap: function () {method.strap();}};
	return api;
}());