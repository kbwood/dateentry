/* http://keith-wood.name/dateEntry.html
   German initialisation for the jQuery date entry extension
   Written by Eyk Schulz (eyk.schulz@gmx.net) and Milian Wolff (mail@milianw.de) */
(function($) {
	$.dateEntry.regional['de'] = {dateFormat: 'dmy.',
		monthNames: ['Januar','Februar','März','April','Mai','Juni',
		'Juli','August','September','Oktober','November','Dezember'],
		monthNamesShort: ['Jan','Feb','Mär','Apr','Mai','Jun',
		'Jul','Aug','Sep','Okt','Nov','Dez'],
		dayNames: ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'],
		dayNamesShort: ['So','Mo','Di','Mi','Do','Fr','Sa'],
		spinnerTexts: ['Jetzt', 'vorheriges Feld', 'nächstes Feld', 'hoch', 'runter']};
	$.dateEntry.setDefaults($.dateEntry.regional['de']);
})(jQuery);
