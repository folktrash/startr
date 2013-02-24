var boot = window.boot || {};
boot = (function () {
	var method = {strap: function () {yepnope([{load: ['_/js/lib/jquery-1.9.1.min.js','_/js/app.js'],complete: function () {app.boot();}}]);}};
	var api = {strap: function () {method.strap();}};
	return api;
}());