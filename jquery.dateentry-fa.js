/* http://keith-wood.name/dateEntry.html
   Persian (Farsi) initialisation for the jQuery date entry extension
   Written by benyblack and Javad Mowlanezhad (jmowla@gmail.com). */
(function($) {
	$.dateEntry.regionalOptions['fa'] = {dateFormat: 'ymd/',
		monthNames: ['فروردين','ارديبهشت','خرداد','تير','مرداد','شهريور',
		'مهر','آبان','آذر','دي','بهمن','اسفند'],
		monthNamesShort: ['1','2','3','4','5','6',
		'7','8','9','10','11','12'],
		dayNames: ['يکشنبه','دوشنبه','سه‌شنبه','چهارشنبه','پنجشنبه','جمعه','شنبه'],
		dayNamesShort: ['ي','د','س','چ','پ','ج', 'ش'],
		spinnerTexts: ['اکنون', 'قبلی', 'بعدی', 'افزایش', 'کاهش'],
		isRTL: true};
	$.dateEntry.setDefaults($.dateEntry.regionalOptions['fa']);
})(jQuery);
