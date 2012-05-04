/* http://keith-wood.name/dateEntry.html
   French initialisation for the jQuery date entry extension
   Written by Keith Wood (kbwood{at}iinet.com.au) March 2009. */
(function($) {
	$.dateEntry.regional['fr'] = {dateFormat: 'dmy/',
		monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin',
		'Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
		monthNamesShort: ['Jan','Fév','Mar','Avr','Mai','Jun',
		'Jul','Aoû','Sep','Oct','Nov','Déc'],
		dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
		dayNamesShort: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
		spinnerTexts: ['Maintenant', 'Précédent', 'Suivant', 'Augmenter', 'Diminuer']};
	$.dateEntry.setDefaults($.dateEntry.regional['fr']);
})(jQuery);
