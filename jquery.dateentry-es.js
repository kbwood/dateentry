/* http://keith-wood.name/dateEntry.html
   Spanish initialisation for the jQuery date entry extension
   Written by diegok (diego@freekeylabs.com) and Vester (xvester@gmail.com). */
(function($) {
	$.dateEntry.regional['es'] = {dateFormat: 'dmy/',
		monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
		'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
		monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun',
		'Jul','Ago','Sep','Oct','Nov','Dic'],
		dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
		dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
		spinnerTexts: ['Ahora', 'Campo anterior', 'Siguiente campo', 'Aumentar', 'Disminuir']};
	$.dateEntry.setDefaults($.dateEntry.regional['es']);
})(jQuery);
