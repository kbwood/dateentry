/* http://keith-wood.name/dateEntry.html
   Slovak initialisation for the jQuery date entry extension
   Written by Vojtech Rinik (vojto@hmm.sk)  */
(function($) {
	$.dateEntry.regional['sk'] = {dateFormat: 'dmy.',
		monthNames: ['Január','Február','Marec','Apríl','Máj','Jún',
		'Júl','August','September','Október','November','December'],
		monthNamesShort: ['Jan','Feb','Mar','Apr','Máj','Jún',
		'Júl','Aug','Sep','Okt','Nov','Dec'],
		dayNames: ['Nedel\'a','Pondelok','Utorok','Streda','Štvrtok','Piatok','Sobota'],
		dayNamesShort: ['Ned','Pon','Uto','Str','Štv','Pia','Sob'],
		spinnerTexts: ['Teraz', 'Predchádzajúce pole', 'Nasledujúce pole', 'Zvýšiť', 'Znížiť']};
	$.dateEntry.setDefaults($.dateEntry.regional['sk']);
})(jQuery);
