/* http://keith-wood.name/dateEntry.html
   Icelandic initialisation for the jQuery time entry extension
   Written by Már Örlygsson (http://mar.anomy.net/) */
(function($) {
	$.dateEntry.regional['is'] = {dateFormat: 'dmy.',
		monthNames: ['janúar','febrúar','mars','apríl','maí','júní',
		'júlí','ágúst','september','október','nóvember','desember'],
		monthNamesShort: ['jan','feb','mar','apr','maí','jún',
		'júl','ágú','sep','okt','nóv','des'],
		dayNames: ['sunnudagur','mánudagur','þriðjudagur','miðvikudagur','fimmtudagur','föstudagur','laugardagur'],
		dayNamesShort: ['sun','mán','þri','mið','fim','fös','lau'],
		spinnerTexts: ['Dagurinn í dag', 'Fyrra svæði', 'Næsta svæði', 'Hækka', 'Lækka']};
	$.dateEntry.setDefaults($.dateEntry.regional['is']);
})(jQuery);
