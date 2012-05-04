/* http://keith-wood.name/dateEntry.html
   Romanian initialisation for the jQuery date entry extension
   Written by Edmond L. (ll_edmond@walla.com)  */
(function($) {
	$.dateEntry.regional['ro'] = {dateFormat: 'mdy/',
		monthNames: ['Ianuarie','Februarie','Martie','Aprilie','Mai','Iunie',
		'Iulie','August','Septembrie','Octobrie','Noiembrie','Decembrie'],
		monthNamesShort: ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun',
		'Iul', 'Aug', 'Sep', 'Oct', 'Noi', 'Dec'],
		dayNames: ['Duminică', 'Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă'],
		dayNamesShort: ['Dum', 'Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sâm'],
		spinnerTexts: ['Acum', 'Campul Anterior', 'Campul Urmator', 'Mareste', 'Micsoreaza']};
	$.dateEntry.setDefaults($.dateEntry.regional['ro']);
})(jQuery);
