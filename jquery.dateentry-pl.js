/* http://keith-wood.name/dateEntry.html
   Polish initialisation for the jQuery date entry extension. 
   Polish translation by Jacek Wysocki (jacek.wysocki@gmail.com). */
(function($) {
	$.dateEntry.regional['pl'] = {dateFormat: 'ymd-',
		monthNames: ['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec',
		'Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'],
		monthNamesShort: ['Sty','Lut','Mar','Kwi','Maj','Cze',
		'Lip','Sie','Wrz','Paź','Lis','Gru'],
		dayNames: ['Niedziela','Poniedzialek','Wtorek','Środa','Czwartek','Piątek','Sobota'],
		dayNamesShort: ['Nie','Pon','Wto','Śro','Czw','Pią','Sob'],
		spinnerTexts: ['Teraz', 'Poprzednie pole', 'Następne pole', 'Zwiększ wartość', 'Zmniejsz wartość']};
	$.dateEntry.setDefaults($.dateEntry.regional['pl']);
})(jQuery);
