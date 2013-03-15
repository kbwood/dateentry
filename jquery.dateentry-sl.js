/* http://keith-wood.name/dateEntry.html
   Slovenian initialisation for the jQuery date entry extension
   Written by Štefan Baebler */
(function($) {
	$.dateEntry.regional['sl'] = {dateFormat: 'dmy.',
		monthNames: ['januar','februar','marec','april','maj','junij',
		'julij','avgust','september','oktober','november','december'],
		monthNamesShort: ['jan','feb','mar','apr','maj','jun',
		'jul','avg','sep','okt','nov','dec'],
		dayNames: ['nedelja','ponedeljek','torek','sreda','četrtek','petek','sobota'],
		dayNamesShort: ['ne','po','to','sr','če','pe','so'],
		spinnerTexts: ['Danes', 'Prejšnje polje', 'Naslednje polje', 'Povečaj', 'Zmanjšaj']};
	$.dateEntry.setDefaults($.dateEntry.regional['sl']);
})(jQuery);