/* http://keith-wood.name/dateEntry.html
   Swedish initialisation for the jQuery date entry extension.
   Written by Anders Ekdahl ( anders@nomadiz.se). */
(function($) {
	$.dateEntry.regional['sv'] = {dateFormat: 'ymd-',
        monthNames: ['Januari','Februari','Mars','April','Maj','Juni',
        'Juli','Augusti','September','Oktober','November','December'],
        monthNamesShort: ['Jan','Feb','Mar','Apr','Maj','Jun',
        'Jul','Aug','Sep','Okt','Nov','Dec'],
		dayNames: ['Söndag','Måndag','Tisdag','Onsdag','Torsdag','Fredag','Lördag'],
		dayNamesShort: ['Sön','Mån','Tis','Ons','Tor','Fre','Lör'],
		spinnerTexts: ['Nu', 'Förra fältet', 'Nästa fält', 'öka', 'minska']};
    $.dateEntry.setDefaults($.dateEntry.regional['sv']); 
})(jQuery);
