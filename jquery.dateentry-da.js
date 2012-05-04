/* http://keith-wood.name/dateEntry.html
   Danish initialisation for the jQuery date entry extension.
   Written by Jacob Blom Andersen ( jba{at}netcompany.com ) */
(function($) {
	$.dateEntry.regional['da'] = {dateFormat: 'ymd-',
		monthNames: ['Januar','Februar','Marts','April','Maj','Juni',
		'Juli','August','September','Oktober','November','December'],
		monthNamesShort: ['Jan','Feb','Mar','Apr','Maj','Jun',
		'Jul','Aug','Sep','Okt','Nov','Dec'],
		dayNames: ['Søndag','Mandag','Tirsdag','Onsdag','Torsdag','Fredag','Lørdag'],
		dayNamesShort: ['Søn','Man','Tir','Ons','Tor','Fre','Lør'],
		spinnerTexts: ['Idag', 'Forrige felt', 'Næste felt', 'Øg', 'Formindsk']};
	$.dateEntry.setDefaults($.dateEntry.regional['da']);
})(jQuery);
