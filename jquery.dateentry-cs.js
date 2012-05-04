/* http://keith-wood.name/dateEntry.html
   Czech initialisation for the jQuery date entry extension
   Written by Stanislav Kurinec (stenly.kurinec@gmail.com) and Tomas Muller (tomas@tomas-muller.net) */
(function($) {
	$.dateEntry.regional['cs'] = {dateFormat: 'dmy.',
		monthNames: ['leden','únor','březen','duben','květen','červen',
		'červenec','srpen','září','říjen','listopad','prosinec'],
		monthNamesShort: ['led','úno','bře','dub','kvě','čer',
		'čvc','srp','zář','říj','lis','pro'],
		dayNames: ['neděle', 'pondělí', 'úterý', 'středa', 'čtvrtek', 'pátek', 'sobota'],
		dayNamesShort: ['ne', 'po', 'út', 'st', 'čt', 'pá', 'so'],
		spinnerTexts: ['Nyní', 'Předchozí pole', 'Následující pole', 'Zvýšit', 'Snížit']};
	$.dateEntry.setDefaults($.dateEntry.regional['cs']);
})(jQuery);
