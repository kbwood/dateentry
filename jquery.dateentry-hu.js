/* http://keith-wood.name/dateEntry.html
   Hungarian initialisation for the jQuery date entry extension
   Written by Karaszi Istvan (raszi@spam.raszi.hu)  */
(function($) {
	$.dateEntry.regional['hu'] = {dateFormat: 'ymd-',
		monthNames: ['Január', 'Február', 'Március', 'Április', 'Május', 'Június',
		'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'],
		monthNamesShort: ['Jan', 'Feb', 'Már', 'Ápr', 'Máj', 'Jún',
		'Júl', 'Aug', 'Szep', 'Okt', 'Nov', 'Dec'],
		dayNames: ['Vasámap', 'Hétfö', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat'],
		dayNamesShort: ['Vas', 'Hét', 'Ked', 'Sze', 'Csü', 'Pén', 'Szo'],
		spinnerTexts: ['Most', 'Előző mező', 'Következő mező', 'Növel', 'Csökkent']};
	$.dateEntry.setDefaults($.dateEntry.regional['hu']);
})(jQuery);
