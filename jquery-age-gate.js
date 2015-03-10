(function ($) {


	'use strict';


	var options = {
		whitelistSelector: 'meta[name="age-restricted"][content="false"]',
		backdropId: 'age-gate-backdrop',
		activeBackdropClass: 'active',
		dialogSrc: '#age-gate-dialog',
		activeDialogClass: 'active',
		invalidAgeDialogClass: 'invalid',
		minimumAgeSelector: '[name="age-gate-minimum"]',
		parseUserDateFunction: defaultParseFunction,
		enterButtonSelector: '.age-gate-enter',
		focusSelector: 'input[name="age-gate-month"]',
		expiration: Infinity
	};


	$.ageGate = function ageGate (suppliedOptions) {


		var cookieBirthdate = $.ageGateCookieAdapter ? $.ageGateCookieAdapter.get() : undefined,
			deferredVerification = new $.Deferred(),
			$backdrop,
			$dialog;


		if ($.isPlainObject(suppliedOptions)) {
		
			$.extend(options, suppliedOptions);
		
		}


		if ($(options.whitelistSelector).length) {

			return;

		}


		// We could check the date but that would break the minimum age form control. We'll assume that if we set the cookie, the user passed the gate.

		if (cookieBirthdate instanceof Date) {

			return;

		}


		$backdrop = $(document.createElement('div'))
			.attr('id', options.backdropId);
        
        
		// Try finding the dialog in the DOM

		try {

			$dialog = $(options.dialogSrc);

		}

		catch (error) {

			$dialog = $();

		}

		if ($dialog.length) {

            $dialog.before($backdrop);

            window.setTimeout(activateBackdrop, 0);

            window.setTimeout(activateDialog, 0);
            
		}

		// If that doesn't work, try loading it over HTTP

		else {
            
            $backdrop.appendTo('body');
            
            window.setTimeout(activateBackdrop, 0);

			$.ajax({ url: options.dialogSrc })
				.done(insertDialogAndActivate)
				.fail(handleLoadFailure);

		}


		function insertDialogAndActivate (dialogHtml) {

			$dialog = $(dialogHtml).appendTo('body');
			
			activateDialog();

		}


		function handleLoadFailure () {

			$backdrop.remove();

			throw new Error('jQuery.ageGate was unable to find ' + options.dialogSrc);

		}
        
        
        function activateBackdrop () {
                
            $backdrop.addClass(options.activeBackdropClass);

        }


		function activateDialog () {

			$dialog
				.on('keypress', handleKeyPress)
				.on('click', options.enterButtonSelector, handleEnterClick)
				.addClass(options.activeDialogClass);

			$dialog
				.find(options.focusSelector)
				.focus();

		}


		function handleKeyPress (event) {

			// Enter

			if (event.which === 13) {

				// In case the focus is in a form element
			
				event.preventDefault();

				checkAge();
			
			}

		}


		function handleEnterClick (event) {

			// In case the event target is an anchor

			event.preventDefault();

			checkAge();

		}


		function checkAge () {

			var now = new Date(),
				minimumAge = parseInt($dialog.find(options.minimumAgeSelector).val(), 10),
				nowMinusMinumumAge = new Date(now.getFullYear() - minimumAge, now.getMonth(), now.getDay()),
				birthdate = options.parseUserDateFunction();

			if (nowMinusMinumumAge >= birthdate) {

				$dialog.removeClass(options.invalidAgeDialogClass);

				$dialog.trigger('agevalidated');

				deferredVerification.resolve($dialog);

				deactivateAgeGate();

				if ($.ageGateCookieAdapter) {
					$.ageGateCookieAdapter.set(birthdate, options.expiration);
				}

			}

			else {

				$dialog.addClass(options.invalidAgeDialogClass);

				$dialog.trigger('ageinvalidated');

			}

		}


		function deactivateAgeGate () {

			$dialog
				.removeClass(options.activeDialogClass)
				.off();

			$backdrop
				.removeClass(options.activeBackdropClass)
				.off();
            
		}


		return deferredVerification.promise();


	};


    function defaultParseFunction () {

        var birthYear = parseInt($('input[name="age-gate-year"]').val(), 10),
            birthMonth = parseInt($('input[name="age-gate-month"]').val(), 10),
            birthDay = parseInt($('input[name="age-gate-day"]').val(), 10),
            birthdate = new Date(birthYear, birthMonth, birthDay);

        return birthdate;

    }


})(jQuery);
