(function ($) {


	'use strict';


	var adapter;


	$.ageGateCookieAdapter = adapter = {};


	adapter.get = function getCookie () {

		var epochString = Cookies.get('jquery-age-gate');

		return typeof epochString === 'string' ? new Date(parseInt(epochString, 10)) : undefined;

	};


	adapter.set = function setCookie (birthdate, expiryDays) {

		var secondsInADay = 86400;

		Cookies.set('jquery-age-gate', birthdate.valueOf().toString(), expiryDays * secondsInADay);

	};


})(jQuery);
