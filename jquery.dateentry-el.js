/* http://keith-wood.name/dateEntry.html
   Greek initialisation for the jQuery date entry extension
   Written by MarkS (CowsCanFly@airport.net) */
(function($) {
	$.dateEntry.regionalOptions['el'] = {dateFormat: 'wnY ',
		monthNames: ['Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος',
		'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος'],
        monthNamesShort: ['Ιαν', 'Φεβ', 'Μαρ', 'Απρ', 'Μαι', 'Ιουν', 
		'Ιουλ', 'Αυγ','Σεπ', 'Οκτ', 'Νοε', 'Δεκ'],
		dayNames: ['Κυριακή', 'Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο'],
		dayNamesShort: ['Κυρ', 'Δευ', 'Τρι', 'Τετ', 'Πεμ', 'Παρ', 'Σαβ'],
		spinnerTexts: ['Τώρα', 'προηγούμενο Πεδίο', 'επόμενο Πεδίο', 'Αύξηση', 'Μείωση']};
	$.dateEntry.setDefaults($.dateEntry.regionalOptions['el']);
})(jQuery);