/* http://keith-wood.name/dateEntry.html
   Japanese initialisation for the jQuery date entry extension
   Written by Yuuki Takahashi (yuuki&#64fb69.jp). */
(function($) {
	$.dateEntry.regional['ja'] = {dateFormat: 'ymd/',
		monthNames: ['1月','2月','3月','4月','5月','6月',
		'7月','8月','9月','10月','11月','12月'],
		monthNamesShort: ['1月','2月','3月','4月','5月','6月',
		'7月','8月','9月','10月','11月','12月'],
		dayNames: ['日曜日','月曜日','火曜日','水曜日','木曜日','金曜日','土曜日'],
		dayNamesShort: ['日','月','火','水','木','金','土'],
		spinnerTexts: ['現在時刻', '前へ', '次へ', '増やす', '減らす']};
	$.dateEntry.setDefaults($.dateEntry.regional['ja']);
})(jQuery);
