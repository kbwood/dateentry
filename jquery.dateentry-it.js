/* http://keith-wood.name/dateEntry.html
   Italian initialisation for the jQuery date entry extension
   Written by Apaella (apaella@gmail.com). */
(function($) {
	$.dateEntry.regional['it'] = {dateFormat: 'dmy/',
		monthNames: ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno',
		'Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'],
		monthNamesShort: ['Gen','Feb','Mar','Apr','Mag','Giu',
		'Lug','Ago','Set','Ott','Nov','Dic'],
		dayNames: ['Domenica','Lunedì','Martedì','Mercoledì','Giovedì','Venerdì','Sabato'],
		dayNamesShort: ['Dom','Lun','Mar','Mer','Gio','Ven','Sab'],
		spinnerTexts: ['Adesso', 'Precedente', 'Successivo', 'Aumenta', 'Diminuisci']};
	$.dateEntry.setDefaults($.dateEntry.regional['it']);
})(jQuery);
