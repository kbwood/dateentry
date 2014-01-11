/* http://keith-wood.name/dateEntry.html
   Russian (UTF-8) initialisation for the jQuery date entry extension.
   Written by Andrew Stromnov (stromnov@gmail.com). */
(function($) {
	$.dateEntry.regionalOptions['ru'] = {dateFormat: 'dmy.',
		monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь',
		'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
		monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн',
		'Июл','Авг','Сен','Окт','Ноя','Дек'],
		dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
		dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
		spinnerTexts: ['Сейчас', 'Предыдущее поле', 'Следующее поле', 'Больше', 'Меньше']};
	$.dateEntry.setDefaults($.dateEntry.regionalOptions['ru']);
})(jQuery);
