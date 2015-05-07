(function ($) {


	'use strict';


	var adapter;


	$.ageGateCookieAdapter = adapter = {};


	adapter.get = function getCookie () {

		var epochString = $.cookie('jquery-age-gate');

		return typeof epochString === 'string' ? new Date(parseInt(epochString, 10)) : undefined;

	};


	adapter.set = function setCookie (birthdate, expiryDays) {

		$.cookie('jquery-age-gate', birthdate.valueOf().toString(), {
			expires: expiryDays,
			path: '/'
		});

	};


})(jQuery);
