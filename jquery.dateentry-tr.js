/* http://keith-wood.name/dateEntry.html
   Turkish initialisation for the jQuery date entry extension
   Written by Vural Dinçer and Izzet Emre Erkan (kara@karalamalar.net) */
(function($) {
	$.dateEntry.regional['tr'] = {dateFormat: 'dmy.',
		monthNames: ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran',
		'Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'],
		monthNamesShort: ['Oca','Şub','Mar','Nis','May','Haz',
		'Tem','Ağu','Eyl','Eki','Kas','Ara'],
		dayNames: ['Pazar','Pazartesi','Salı','Çarşamba','Perşembe','Cuma','Cumartesi'],
		dayNamesShort: ['Pz','Pt','Sa','Ça','Pe','Cu','Ct'],
		spinnerTexts: ['şu an', 'önceki alan', 'sonraki alan', 'arttır', 'azalt']};
	$.dateEntry.setDefaults($.dateEntry.regional['tr']);
})(jQuery);
