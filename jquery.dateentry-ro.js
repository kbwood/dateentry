/* http://keith-wood.name/dateEntry.html
   Romanian initialisation for the jQuery date entry extension
   Written by Edmond L. (ll_edmond@walla.com)  */
(function($) {
	$.dateEntry.regional['ro'] = {dateFormat: 'mdy/',
		monthNames: ['Ianuarie','Februarie','Martie','Aprilie','Mai','Junie',
		'Julie','August','Septembrie','Octobrie','Noiembrie','Decembrie'],
		monthNamesShort: ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun',
		'Jul', 'Aug', 'Sep', 'Oct', 'Noi', 'Dec'],
		dayNames: ['Duminica', 'Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri', 'Sambata'],
		dayNamesShort: ['Dum', 'Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sam'],
		spinnerTexts: ['Acum', 'Campul Anterior', 'Campul Urmator', 'Mareste', 'Micsoreaza']};
	$.dateEntry.setDefaults($.dateEntry.regional['ro']);
})(jQuery);
