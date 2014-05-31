/* http://keith-wood.name/dateEntry.html
   Lithuanian initialisation for the jQuery date entry extension
   Written by Andrej Andrejev and Arturas Paleicikas <arturas@avalon.lt>. */
(function($) {
	$.dateEntry.regionalOptions['lt'] = {dateFormat: 'ymd-',
		monthNames: ['Sausis','Vasaris','Kovas','Balandis','Gegužė','Birželis',
		'Liepa','Rugpjūtis','Rugsėjis','Spalis','Lapkritis','Gruodis'],
		monthNamesShort: ['Sau','Vas','Kov','Bal','Geg','Bir',
		'Lie','Rugp','Rugs','Spa','Lap','Gru'],
		dayNames: ['sekmadienis','pirmadienis','antradienis','trečiadienis','ketvirtadienis','penktadienis','šeštadienis'],
		dayNamesShort: ['sek','pir','ant','tre','ket','pen','šeš'],
		spinnerTexts: ['Dabar', 'Ankstesnis laukas', 'Kitas laukas', 'Daugiau', 'Mažiau'],
		isRTL: false};
	$.dateEntry.setDefaults($.dateEntry.regionalOptions['lt']);
})(jQuery);
