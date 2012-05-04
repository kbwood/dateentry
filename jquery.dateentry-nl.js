/* http://keith-wood.name/dateEntry.html
   Dutch initialisation written for the jQuery date entry extension.
   Glenn plas (glenn.plas@telenet.be) and Mathias Bynens (http://mathiasbynens.be/). */
(function($) {
	$.dateEntry.regional['nl'] = {dateFormat: 'dmy/',
		monthNames: ['januari', 'februari', 'maart', 'april', 'mei', 'juni',
		'juli', 'augustus', 'september', 'oktober', 'november', 'december'],
		monthNamesShort: ['jan', 'feb', 'maa', 'apr', 'mei', 'jun',
		'jul', 'aug', 'sep', 'okt', 'nov', 'dec'],
		dayNames: ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
		dayNamesShort: ['zon', 'maa', 'din', 'woe', 'don', 'vri', 'zat'],
		spinnerTexts: ['Nu', 'Vorig veld', 'Volgend veld','Verhoog', 'Verlaag']};
	$.dateEntry.setDefaults($.dateEntry.regional['nl']);
})(jQuery);
