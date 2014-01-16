/* http://keith-wood.name/dateEntry.html
   Date entry for jQuery v2.0.0.
   Written by Keith Wood (kbwood{at}iinet.com.au) March 2009.
   Licensed under the MIT (https://github.com/jquery/jquery/blob/master/MIT-LICENSE.txt) license.
   Please attribute the author if you use it. */

(function($) { // Hide scope, no $ conflict

	var pluginName = 'dateEntry';

	/** Create the date entry plugin.
		<p>Sets an input field to add a spinner for date entry.</p>
		<p>The time can be entered via directly typing the value,
		via the arrow keys, or via spinner buttons.
		It is configurable to different date formats, to enforce
		a minimum and/or maximum time, and to change the spinner image.</p>
		<p>Expects HTML like:</p>
		<pre>&lt;input type="text"></pre>
		<p>Provide inline configuration like:</p>
		<pre>&lt;input type="text" data-dateEntry="name: 'value'"></pre>
	 	@module DateEntry
		@augments JQPlugin
		@example $(selector).dateEntry()
 $(selector).dateEntry({minDate: new Date(2014, 1-1, 1)}) */
	$.JQPlugin.createPlugin({
	
		/** The name of the plugin. */
		name: pluginName,
			
		/** Date entry before show callback.
			Triggered when the input field is focussed.
			@callback beforeShowCallback
			@param input {Element} The current input field.
			@return {object} Any changes to the instance settings.
			@example beforeShow: function(input) {
	// Cross-populate minimum/maximum times for a range
 	return {minDate: (input.id === 'dateTo' ?
 		$('#dateFrom').dateEntry('getDate') : null), 
 		maxDate: (input.id === 'dateFrom' ?
 		$('#dateTo').dateEntry('getDate') : null)};
 } */
			
		/** Default settings for the plugin.
			@property [appendText=''] {string} Display text following the input box, e.g. showing the format.
			@property [initialField=0] {number} The field to highlight initially.
			@property [tabToExit=false] {boolean} True for tab key to go to next element,
						false for tab key to step through internal fields.
			@property [useMouseWheel=true] {boolean} True to use mouse wheel for increment/decrement if possible,
						false to never use it.
			@property [defaultDate=null] {Date|number|string} The date to use if none has been set,
						or <code>null</code> for now. Specify as a <code>Date</code> object, as a number of days
						offset from today, or as a string of offsets from today, using 'Y' for years, 'M' for months,
						'W' for weeks, or 'D' for days.
			@property [minDate=null] {Date|number|string} The earliest selectable date,
						or <code>null</code> for no limit. See <code>defaultDate</code> for possible formats.
			@property [maxDate=null] {Date|number|string} The latest selectable date,
						or <code>null</code> for no limit. See <code>defaultDate</code> for possible formats.
			@property [spinnerImage='spinnerDefault.png'] {string} The URL of the images to use for the date spinner -
						seven images packed horizontally for normal, each button pressed
						(centre, previous, next, increment, decrement), and disabled.
			@property [spinnerSize=[20,20,8]] {number[]} The width and height of the spinner image,
						and size of centre button for current date.
			@property [spinnerBigImage=''] {string} The URL of the images to use for the expanded date spinner -
						seven images packed horizontally for normal, each button pressed
						(centre, previous, next, increment, decrement), and disabled.
			@property [spinnerBigSize=[40,40,16]] {number[]} The width and height of the expanded spinner image,
						and size of centre button for current date.
			@property [spinnerIncDecOnly=false] {boolean} True for increment/decrement buttons only, false for all.
			@property [spinnerRepeat=[500,250]] {number[]} Initial and subsequent waits in milliseconds
						for repeats on the spinner buttons.
			@property [beforeShow=null] {beforeShowCallback} Function that takes an input field and
						returns a set of custom settings for the date entry.
			@property [altField=null] {string|Element|jQuery} Selector, element, or jQuery object
						for an alternate field to keep synchronised.
			@property [altFormat=null] {string} A separate format for the alternate field.
						See <code>dateFormat</code> for options.
			@example {defaultDate: new Date(2013, 12-1, 25), minDate: +1, maxDate: '+2M +2W'} */
		defaultOptions: {
			appendText: '',
			initialField: 0,
			tabToExit: false,
			useMouseWheel: true,
			defaultDate: null,
			minDate: null,
			maxDate: null,
			spinnerImage: 'spinnerDefault.png',
			spinnerSize: [20, 20, 8],
			spinnerBigImage: '',
			spinnerBigSize: [40, 40, 16],
			spinnerIncDecOnly: false,
			spinnerRepeat: [500, 250],
			beforeShow: null,
			altField: null,
			altFormat: null
		},

		/** Localisations for the plugin.
			Entries are objects indexed by the language code ('' being the default US/English).
			Each object has the following attributes.
			@property [dateFormat='mdy/'] {string} The format of the date text:
						first three fields in order ('y' for year, 'Y' for two-digit year,
						'm' for month, 'n' for abbreviated month name, 'N' for full month name,
						'd' for day, 'w' for abbreviated day name and number,
						'W' for full day name and number), followed by separator(s).
						The first separator is used for display, while others are accepted during parsing.
			@property [monthNames=['January','February','March','April','May','June','July','August','September','October','November','December']]
						{string[]} The names of the months.
			@property [monthNamesShort=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']]
						{string[]} The abbreviated names of the months.
			@property [dayNames=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']]
						{string[]} The names of the days.
			@property [dayNamesShort=['Sun','Mon','Tue','Wed','Thu','Fri','Sat']]
						{string[]} The abbreviated names of the days.
			@property [spinnerTexts=['Today','Previous_field','Next_field','Increment','Decrement']]
						{string[]} The popup texts for the spinner image areas. */
		regionalOptions: { // Available regional settings, indexed by language/country code
			'': { // Default regional settings - English/US
				dateFormat: 'mdy/',
				monthNames: ['January', 'February', 'March', 'April', 'May', 'June',
					'July', 'August', 'September', 'October', 'November', 'December'],
				monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
					'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
				dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
				dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
				spinnerTexts: ['Today', 'Previous field', 'Next field', 'Increment', 'Decrement']
			}
		},
		
		_getters: ['getDate', 'isDisabled'],

		_appendClass: pluginName + '-append', // Class name for the appended content
		_controlClass: pluginName + '-control', // Class name for the date entry control
		_expandClass: pluginName + '-expand', // Class name for the expanded spinner

		_disabledInputs: [], // List of date inputs that have been disabled

		_instSettings: function(elem, options) {
			return {_field: 0, _selectedYear: 0, _selectedMonth: 0, _selectedDay: 0};
		},
		
		_postAttach: function(elem, inst) {
			elem.on('focus.' + inst.name, this._doFocus).
				on('blur.' + inst.name, this._doBlur).
				on('click.' + inst.name, this._doClick).
				on('keydown.' + inst.name, this._doKeyDown).
				on('keypress.' + inst.name, this._doKeyPress).
				on('paste.' + inst.name, function(event) { // Check pastes
					setTimeout(function() { plugin._parseDate(inst); }, 1);
				});
		},

		_optionsChanged: function(elem, inst, options) {
			var currentDate = this._extractDate(elem.val(), inst);
			$.extend(inst.options, options);
			inst._field = 0;
			if (currentDate) {
				this._setDate(inst, currentDate);
			}
			// Remove stuff dependent on old settings
			elem.next('span.' + this._appendClass).remove();
			elem.parent().find('span.' + this._controlClass).remove();
			if ($.fn.mousewheel) {
				elem.unmousewheel();
			}
			// And re-add if requested
			var spinner = (!inst.options.spinnerImage ? null :
				$('<span class="' + this._controlClass + '" style="display: inline-block; ' +
				'background: url(\'' + inst.options.spinnerImage + '\') 0 0 no-repeat; width: ' + 
				inst.options.spinnerSize[0] + 'px; height: ' + inst.options.spinnerSize[1] + 'px;"></span>'));
			elem.after(inst.options.appendText ? '<span class="' + this._appendClass + '">' +
				inst.options.appendText + '</span>' : '').after(spinner || '');
			// Allow mouse wheel usage
			if (inst.options.useMouseWheel && $.fn.mousewheel) {
				elem.mousewheel(this._doMouseWheel);
			}
			if (spinner) {
				spinner.mousedown(this._handleSpinner).mouseup(this._endSpinner).
					mouseover(this._expandSpinner).mouseout(this._endSpinner).
					mousemove(this._describeSpinner);
			}
		},

		/** Enable a date entry input and any associated spinner.
			@param elem {Element} The single input field.
			@example $(selector).dateEntry('enable') */
		enable: function(elem) {
			this._enableDisable(elem, false);
		},

		/** Disable a date entry input and any associated spinner.
			@param elem {Element} The single input field.
			@example $(selector).dateEntry('disable') */
		disable: function(elem) {
			this._enableDisable(elem, true);
		},

		/** Enable or disable a date entry input and any associated spinner.
			@private
			@param elem {Element} The single input field.
			@param disable {boolean} True to disable, false to enable. */
		_enableDisable: function(elem, disable) {
			var inst = this._getInst(elem);
			if (!inst) {
				return;
			}
			elem.disabled = disable;
			if (elem.nextSibling && elem.nextSibling.nodeName.toLowerCase() === 'span') {
				this._changeSpinner(inst, elem.nextSibling, (disable ? 5 : -1));
			}
			this._disabledInputs = $.map(this._disabledInputs,
				function(value) { return (value === elem ? null : value); }); // Delete entry
			if (disable) {
				this._disabledInputs.push(elem);
			}
		},

		/** Check whether an input field has been disabled.
			@param elem {Element} The input field to check.
			@return {boolean} True if this field has been disabled, false if it is enabled.
			@example if ($(selector).dateEntry('isDisabled')) {...} */
		isDisabled: function(elem) {
			return $.inArray(elem, this._disabledInputs) > -1;
		},

		_preDestroy: function(elem, inst) {
			elem = $(elem).off('.' + pluginName);
			if ($.fn.mousewheel) {
				elem.unmousewheel();
			}
			this._disabledInputs = $.map(this._disabledInputs,
				function(value) { return (value === elem[0] ? null : value); }); // Delete entry
			elem.siblings('.' + this._appendClass + ',.' + this._controlClass).remove();
		},

		/** Initialise the current date for a date entry input field.
			@param elem {Element} The input field to update.
			@param date {Date|number|string} The new date or offset or <code>null</code> to clear.
					An actual date or offset in days from today or units and periods of offsets from today.
			@example $(selector).dateEntry('setDate', new Date(2013, 12-1, 25))
 $(selector).dateEntry('setDate', +10)
 $(selector).dateEntry('setDate', '+1M +7D')
 $(selector).dateEntry('setDate', null) */
		setDate: function(elem, date) {
			var inst = this._getInst(elem);
			if (inst) {
				if (date === null || date === '') {
					$(elem).val('');
				}
				else {
					this._setDate(inst, date ? (typeof date === 'object' ?
						new Date(date.getTime()) : date) : null);
				}
			}
		},

		/** Retrieve the current date for a date entry input field.
			@param elem {Element} The input field to update.
			@return {Date} The current date or <code>null</code> if none.
			@example var date = $(selector).dateEntry('getDate') */
		getDate: function(elem) {
			var inst = this._getInst(elem);
			return (inst ? this._extractDate(inst.elem.val(), inst) : null);
		},

		/** Initialise date entry.
			@private
			@param elem {Element|Event} The input field or the focus event. */
		_doFocus: function(elem) {
			var input = (elem.nodeName && elem.nodeName.toLowerCase() === 'input' ? elem : this);
			if (plugin._lastInput === input || plugin.isDisabled(input)) {
				plugin._focussed = false;
				return;
			}
			var inst = plugin._getInst(input);
			plugin._focussed = true;
			plugin._lastInput = input;
			plugin._blurredInput = null;
			$.extend(inst.options, ($.isFunction(inst.options.beforeShow) ?
				inst.options.beforeShow.apply(input, [input]) : {}));
			plugin._parseDate(inst);
			setTimeout(function() { plugin._showField(inst); }, 10);
		},

		/** Note that the field has been exited.
			@private
			@param event {Event} The blur event. */
		_doBlur: function(event) {
			plugin._blurredInput = plugin._lastInput;
			plugin._lastInput = null;
		},

		/** Select appropriate field portion on click, if already in the field.
			@private
			@param event {Event} The click event. */
		_doClick: function(event) {
			var input = event.target;
			var inst = plugin._getInst(input);
			var prevField = inst._field;
			if (!plugin._focussed) {
				inst._field = 0;
				if (input.selectionStart !== null) { // Use input select range
					var end = 0;
					for (var field = 0; field < 3; field++) {
						end += plugin._fieldLength(inst, field, inst.options.dateFormat) + 1;
						inst._field = field;
						if (input.selectionStart < end) {
							break;
						}
					}
				}
				else if (input.createTextRange) { // Check against bounding boxes
					var src = $(event.srcElement);
					var range = input.createTextRange();
					var convert = function(value) {
						return {thin: 2, medium: 4, thick: 6}[value] || value;
					};
					var offsetX = event.clientX + document.documentElement.scrollLeft -
						(src.offset().left + parseInt(convert(src.css('border-left-width')), 10)) -
						range.offsetLeft; // Position - left edge - alignment
					var end = 0;
					for (var field = 0; field < 3; field++) {
						end += plugin._fieldLength(inst, field, inst.options.dateFormat) + 1;
						range.collapse();
						range.moveEnd('character', end);
						inst._field = field;
						if (offsetX < range.boundingWidth) { // And compare
							break;
						}
					}
				}
			}
			if (prevField !== inst._field) {
				inst._lastChr = '';
			}
			plugin._showField(inst);
			plugin._focussed = false;
		},

		/** Handle keystrokes in the field.
			@private
			@param event {Event} The keydown event.
			@return {boolean} True to continue, false to stop processing. */
		_doKeyDown: function(event) {
			if (event.keyCode >= 48) { // >= '0'
				return true;
			}
			var inst = plugin._getInst(event.target);
			switch (event.keyCode) {
				case 9: return (inst.options.tabToExit ? true : (event.shiftKey ?
							// Move to previous date field, or out if at the beginning
							plugin._changeField(inst, -1, true) :
							// Move to next date field, or out if at the end
							plugin._changeField(inst, +1, true)));
				case 35: if (event.ctrlKey) { // Clear date on ctrl+end
							plugin._setValue(inst, '');
						}
						else { // Last field on end
							inst._field = 2;
							plugin._adjustField(inst, 0);
						}
						break;
				case 36: if (event.ctrlKey) { // Current date on ctrl+home
							plugin._setDate(inst);
						}
						else { // First field on home
							inst._field = 0;
							plugin._adjustField(inst, 0);
						}
						break;
				case 37: plugin._changeField(inst, -1, false); break; // Previous field on left
				case 38: plugin._adjustField(inst, +1); break; // Increment date field on up
				case 39: plugin._changeField(inst, +1, false); break; // Next field on right
				case 40: plugin._adjustField(inst, -1); break; // Decrement date field on down
				case 46: plugin._setValue(inst, ''); break; // Clear date on delete
				default: return true;
			}
			return false;
		},

		/** Disallow unwanted characters.
			@private
			@param event {Event} The keypress event.
			@return {boolean} True to continue, false to stop processing. */
		_doKeyPress: function(event) {
			var chr = String.fromCharCode(event.charCode === undefined ? event.keyCode : event.charCode);
			if (chr < ' ') {
				return true;
			}
			var inst = plugin._getInst(event.target);
			plugin._handleKeyPress(inst, chr);
			return false;
		},

		/** Update date based on keystroke entered.
			@private
			@param inst {object} The instance settings.
			@param chr {string} The new character. */
		_handleKeyPress: function(inst, chr) {
			if (inst.options.dateFormat.substring(3).indexOf(chr) > -1) {
				this._changeField(inst, +1, false);
			}
			else if (chr >= '0' && chr <= '9') { // Allow direct entry of date
				var field = inst.options.dateFormat.charAt(inst._field);
				var key = parseInt(chr, 10);
				var value = parseInt((inst._lastChr || '') + chr, 10);
				var year = (field !== 'y' && field !== 'Y' ? inst._selectedYear : value);
				var month = (field !== 'm' && field !== 'n' && field !== 'N' ?
					inst._selectedMonth + 1 : (value >= 1 && value <= 12 ? value :
					(key > 0 ? key : inst._selectedMonth + 1)));
				var day = (field !== 'd' && field !== 'w' && field !== 'W' ?
					inst._selectedDay : (value >= 1 &&
					value <= this._getDaysInMonth(year, month - 1) ? value :
					(key > 0 ? key : inst._selectedDay)));
				this._setDate(inst, new Date(year, month - 1, day, 12));
				inst._lastChr = (field !== 'y' ? '' :
					inst._lastChr.substr(Math.max(0, inst._lastChr.length - 2))) + chr;
			}
			else { // Allow text entry by month name
				var field = inst.options.dateFormat.charAt(inst._field);
				if (field === 'n' || field === 'N') {
					inst._lastChr += chr.toLowerCase();
					var names = inst.options[field === 'n' ? 'monthNamesShort' : 'monthNames'];
					var findMonth = function() {
						for (var i = 0; i < names.length; i++) {
							if (names[i].toLowerCase().substring(0, inst._lastChr.length) === inst._lastChr) {
								return i;
								break;
							}
						}
						return -1;
					};
					var month = findMonth();
					if (month === -1) {
						inst._lastChr = chr.toLowerCase();
						month = findMonth();
					}
					if (month === -1) {
						inst._lastChr = '';
					}
					else {
						var year = inst._selectedYear;
						var day = Math.min(inst._selectedDay, this._getDaysInMonth(year, month));
						this._setDate(inst, new Date(year, month, day, 12));
					}
				}
			}
		},

		/** Increment/decrement on mouse wheel activity.
			@private
			@param event {Event} The mouse wheel event.
			@param delta {number} The amount of change. */
		_doMouseWheel: function(event, delta) {
			if (plugin.isDisabled(event.target)) {
				return;
			}
			var inst = plugin._getInst(event.target);
			inst.elem.focus();
			if (!inst.elem.val()) {
				plugin._parseDate(inst);
			}
			plugin._adjustField(inst, delta);
			event.preventDefault();
		},

		/** Expand the spinner, if possible, to make it easier to use.
			@private
			@param event {Event} The mouse over event. */
		_expandSpinner: function(event) {
			var spinner = plugin._getSpinnerTarget(event);
			var inst = plugin._getInst(plugin._getInput(spinner));
			if (plugin.isDisabled(inst.elem[0])) {
				return;
			}
			if (inst.options.spinnerBigImage) {
				inst._expanded = true;
				var offset = $(spinner).offset();
				var relative = null;
				$(spinner).parents().each(function() {
					var parent = $(this);
					if (parent.css('position') === 'relative' || parent.css('position') === 'absolute') {
						relative = parent.offset();
					}
					return !relative;
				});
				$('<div class="' + plugin._expandClass + '" style="position: absolute; left: ' +
					(offset.left - (inst.options.spinnerBigSize[0] - inst.options.spinnerSize[0]) / 2 -
					(relative ? relative.left : 0)) + 'px; top: ' +
					(offset.top - (inst.options.spinnerBigSize[1] - inst.options.spinnerSize[1]) / 2 -
					(relative ? relative.top : 0)) + 'px; width: ' +
					inst.options.spinnerBigSize[0] + 'px; height: ' +
					inst.options.spinnerBigSize[1] + 'px; background: transparent url(' +
					inst.options.spinnerBigImage + ') no-repeat 0px 0px; z-index: 10;"></div>').
					mousedown(plugin._handleSpinner).mouseup(plugin._endSpinner).
					mouseout(plugin._endExpand).mousemove(plugin._describeSpinner).
					insertAfter(spinner);
			}
		},

		/** Locate the actual input field from the spinner.
			@private
			@param spinner {Element} The current spinner.
			@return {Element} The corresponding input. */
		_getInput: function(spinner) {
			return $(spinner).siblings('.' + this._getMarker())[0];
		},

		/** Change the title based on position within the spinner.
			@private
			@param event {Event} The mouse move event. */
		_describeSpinner: function(event) {
			var spinner = plugin._getSpinnerTarget(event);
			var inst = plugin._getInst(plugin._getInput(spinner));
			spinner.title = inst.options.spinnerTexts[plugin._getSpinnerRegion(inst, event)];
		},

		/** Handle a click on the spinner.
			@private
			@param event {Event} The mouse click event. */
		_handleSpinner: function(event) {
			var spinner = plugin._getSpinnerTarget(event);
			var input = plugin._getInput(spinner);
			if (plugin.isDisabled(input)) {
				return;
			}
			if (input === plugin._blurredInput) {
				plugin._lastInput = input;
				plugin._blurredInput = null;
			}
			var inst = plugin._getInst(input);
			plugin._doFocus(input);
			var region = plugin._getSpinnerRegion(inst, event);
			plugin._changeSpinner(inst, spinner, region);
			plugin._actionSpinner(inst, region);
			plugin._timer = null;
			plugin._handlingSpinner = true;
			if (region >= 3 && inst.options.spinnerRepeat[0]) { // Repeat increment/decrement
				plugin._timer = setTimeout(
					function() { plugin._repeatSpinner(inst, region); },
					inst.options.spinnerRepeat[0]);
				$(spinner).one('mouseout', plugin._releaseSpinner).
					one('mouseup', plugin._releaseSpinner);
			}
		},

		/** Action a click on the spinner.
			@private
			@param inst {object} The instance settings.
			@param region {number} The spinner "button". */
		_actionSpinner: function(inst, region) {
			if (!inst.elem.val()) {
				plugin._parseDate(inst);
			}
			switch (region) {
				case 0: this._setDate(inst); break;
				case 1: this._changeField(inst, -1, false); break;
				case 2: this._changeField(inst, +1, false); break;
				case 3: this._adjustField(inst, +1); break;
				case 4: this._adjustField(inst, -1); break;
			}
		},

		/** Repeat a click on the spinner.
			@private
			@param inst {object} The instance settings.
			@param region {number} The spinner "button". */
		_repeatSpinner: function(inst, region) {
			if (!plugin._timer) {
				return;
			}
			plugin._lastInput = plugin._blurredInput;
			this._actionSpinner(inst, region);
			this._timer = setTimeout(
				function() { plugin._repeatSpinner(inst, region); },
				inst.options.spinnerRepeat[1]);
		},

		/** Stop a spinner repeat.
			@private
			@param event {Event} The mouse event. */
		_releaseSpinner: function(event) {
			clearTimeout(plugin._timer);
			plugin._timer = null;
		},

		/** Tidy up after an expanded spinner.
			@private
			@param event {Event} The mouse event. */
		_endExpand: function(event) {
			plugin._timer = null;
			var spinner = plugin._getSpinnerTarget(event);
			var input = plugin._getInput(spinner);
			var inst = plugin._getInst(input);
			$(spinner).remove();
			inst._expanded = false;
		},

		/** Tidy up after a spinner click.
			@private
			@param event {Event} The mouse event. */
		_endSpinner: function(event) {
			plugin._timer = null;
			var spinner = plugin._getSpinnerTarget(event);
			var input = plugin._getInput(spinner);
			var inst = plugin._getInst(input);
			if (!plugin.isDisabled(input)) {
				plugin._changeSpinner(inst, spinner, -1);
			}
			if (plugin._handlingSpinner) {
				plugin._lastInput = plugin._blurredInput;
			}
			if (plugin._lastInput && plugin._handlingSpinner) {
				plugin._showField(inst);
			}
			plugin._handlingSpinner = false;
		},

		/** Retrieve the spinner from the event.
			@private
			@param event {Event} The mouse click event.
			@return {Element} The target field. */
		_getSpinnerTarget: function(event) {
			return event.target || event.srcElement;
		},

		/** Determine which "button" within the spinner was clicked.
			@private
			@param inst {object} The instance settings.
			@param event {Event} The mouse event.
			@return {number} The spinner "button" number. */
		_getSpinnerRegion: function(inst, event) {
			var spinner = this._getSpinnerTarget(event);
			var pos = $(spinner).offset();
			var scrolled = [document.documentElement.scrollLeft || document.body.scrollLeft,
				document.documentElement.scrollTop || document.body.scrollTop];
			var left = (inst.options.spinnerIncDecOnly ? 99 : event.clientX + scrolled[0] - pos.left);
			var top = event.clientY + scrolled[1] - pos.top;
			var spinnerSize = inst.options[inst._expanded ? 'spinnerBigSize' : 'spinnerSize'];
			var right = (inst.options.spinnerIncDecOnly ? 99 : spinnerSize[0] - 1 - left);
			var bottom = spinnerSize[1] - 1 - top;
			if (spinnerSize[2] > 0 && Math.abs(left - right) <= spinnerSize[2] &&
					Math.abs(top - bottom) <= spinnerSize[2]) {
				return 0; // Centre button
			}
			var min = Math.min(left, top, right, bottom);
			return (min === left ? 1 : (min === right ? 2 : (min === top ? 3 : 4))); // Nearest edge
		},

		/** Change the spinner image depending on the button clicked.
			@private
			@param inst {object} The instance settings.
			@param spinner {Element} The spinner control.
			@param region {number} The spinner "button". */
		_changeSpinner: function(inst, spinner, region) {
			$(spinner).css('background-position', '-' + ((region + 1) *
				inst.options[inst._expanded ? 'spinnerBigSize' : 'spinnerSize'][0]) + 'px 0px');
		},

		/** Extract the date value from the input field, or default to now.
			@private
			@param inst {object} The instance settings. */
		_parseDate: function(inst) {
			var currentDate = this._extractDate(inst.elem.val(), inst) ||
				this._normaliseDate(this._determineDate(inst.options.defaultDate, inst) || new Date());
			inst._selectedYear = currentDate.getFullYear();
			inst._selectedMonth = currentDate.getMonth();
			inst._selectedDay = currentDate.getDate();
			inst._lastChr = '';
			inst._field = Math.max(0, Math.min(2, inst.options.initialField));
			if (inst.elem.val() !== '') {
				this._showDate(inst);
			}
		},

		/** Extract the date value from a string.
			@private
			@param value {string} The date text.
			@param inst {object} The instance settings.
			@return {Date} The retrieved date or <code>null</code> if no value. */
		_extractDate: function(value, inst) {
			var formatOptionsLength = inst.options.dateFormat.length - 1;
			if(formatOptionsLength == 2 && !this._validTwoFormFormat(inst.options.dateFormat)) {
				throw("Valid date format not given");
			}

			var values = value.split(
						new RegExp('[\\' + inst.options.dateFormat.substring(formatOptionsLength).split('').join('\\') + ']'));
			if(values.length != formatOptionsLength) { throw("Given date (" + value + ") format doesn't match specified format (" + inst.options.dateFormat + ")"); }
			var year = 0;
			var month = 0;
			var day = 0;
			for (var i = 0; i < formatOptionsLength; i++) {
				var num = parseInt(values[i], 10);
				num = (isNaN(num) ? 0 : num);
				var field = inst.options.dateFormat.charAt(i);
				switch (field) {
					case 'y': year = num; break;
					case 'Y':
						year = (num % 100) + (new Date().getFullYear() - new Date().getFullYear() % 100);
						break;
					case 'm': month = num; break;
					case 'n': case 'N': 
						month = $.inArray(values[i],
							inst.options[field === 'N' ? 'monthNames' : 'monthNamesShort']) + 1;
						break;
					case 'w': case 'W':
						if (inst.options.dateFormat.charAt(3) === ' ') {
							values.splice(i, 1);
							num = parseInt(values[i], 10);
						}
						else {
							num = parseInt(values[i].replace(/^.* /, ''), 10);
						}
						num = (isNaN(num) ? 0 : num); // Fall through
					case 'd': day = num; break;
				}
			}
			return this._createDate(year, month, day)
		},

		_validTwoFormFormat: function(dateFormat) {
			var dayGiven = /d|w/i.test(dateFormat),
					yearGiven = /y/i.test(dateFormat);
			if(dayGiven && yearGiven){ return false }
			return true;
		},

		_createDate: function(year, month, day) {
			if(year && month && day) { return new Date(year, month - 1, day, 12); }
			else if(year && month) { return new Date(year, month - 1, 1, 12); }
			else if(month && day) { return new Date(new Date().getFullYear(), month - 1, day, 12); }
			else { return null }
		},

		/** Set the selected date into the input field.
			@private
			@param inst {object} The instance settings. */
		_showDate: function(inst) {
			this._setValue(inst, this._formatDate(inst, inst.options.dateFormat));
			this._showField(inst);
		},

		/** Format a date as requested.
			@private
			@param inst {object} The instance settings.
			@param format {string} The date format to use.
			@return {string} The formatted date. */
		_formatDate: function(inst, format) {
			var currentDate = '';
			for (var i = 0; i < format.length - 1; i++) {
				currentDate += (i === 0 ? '' : format.charAt(format.length - 1));
				var field = format.charAt(i);
				switch (field) {
					case 'y':
						currentDate += this._formatNumber(inst._selectedYear);
						break;
					case 'Y':
						currentDate += this._formatNumber(inst._selectedYear % 100);
						break;
					case 'm':
						currentDate += this._formatNumber(inst._selectedMonth + 1);
						break;
					case 'n': case 'N':
						currentDate += inst.options[field === 'N' ?
							'monthNames' : 'monthNamesShort'][inst._selectedMonth];
						break;
					case 'd':
						currentDate += this._formatNumber(inst._selectedDay);
						break;
					case 'w': case 'W':
						currentDate += inst.options[field === 'W' ? 'dayNames' : 'dayNamesShort'][
							new Date(inst._selectedYear, inst._selectedMonth, inst._selectedDay, 12).getDay()] +
							' ' + this._formatNumber(inst._selectedDay);
						break;
				}
			}
			return currentDate;
		},

		/** Highlight the current date field.
			@private
			@param inst {object} The instance settings. */
		_showField: function(inst) {
			var input = inst.elem[0];
			if (inst.elem.is(':hidden') || plugin._lastInput !== input) {
				return;
			}
			var start = 0;
			for (var i = 0; i < inst._field; i++) {
				start += this._fieldLength(inst, i, inst.options.dateFormat) + 1;
			}
			var end = start + this._fieldLength(inst, i, inst.options.dateFormat);
			if (input.setSelectionRange) { // Mozilla
				input.setSelectionRange(start, end);
			}
			else if (input.createTextRange) { // IE
				var range = input.createTextRange();
				range.moveStart('character', start);
				range.moveEnd('character', end - inst.elem.val().length);
				range.select();
			}
			if (!input.disabled) {
				input.focus();
			}
		},

		/** Calculate the field length.
			@private
			@param inst {object} The instance settings.
			@param field {number} The field number (0-2).
			@param dateFormat {string} The format for the date display.
			@return {number} The length of this subfield. */
		_fieldLength: function(inst, field, dateFormat) {
			field = dateFormat.charAt(field);
			switch (field) {
				case 'y': return 4;
				case 'n': case 'N':
					return inst.options[field === 'N' ? 'monthNames' : 'monthNamesShort']
						[inst._selectedMonth].length;
				case 'w': case 'W':
					return inst.options[field === 'W' ? 'dayNames' : 'dayNamesShort']
						[new Date(inst._selectedYear, inst._selectedMonth, inst._selectedDay, 12).
						getDay()].length + 3;
				default: return 2;
			}
		},

		/** Ensure displayed single number has a leading zero.
			@private
			@param value {number} The current value.
			@return {string} Number with at least two digits. */
		_formatNumber: function(value) {
			return (value < 10 ? '0' : '') + value;
		},

		/** Update the input field and notify listeners.
			@private
			@param inst {object} The instance settings.
			@param value {string} The new value. */
		_setValue: function(inst, value) {
			if (value !== inst.elem.val()) {
				if (inst.options.altField) {
					$(inst.options.altField).val(!value ? '' : this._formatDate(inst,
						inst.options.altFormat || inst.options.dateFormat));
				}
				inst.elem.val(value).trigger('change');
			}
		},

		/** Move to previous/next field, or out of field altogether if appropriate.
			@private
			@param inst {object} The instance settings.
			@param offset {number} The direction of change (-1, +1).
			@param moveOut {boolean} True if can move out of the field.
			@return {boolean} True if exiting the field, false if not. */
		_changeField: function(inst, offset, moveOut) {
			var fieldCount = inst.options.dateFormat.length - 2;
			var atFirstLast = (inst.elem.val() === '' || inst._field === (offset === -1 ? 0 : fieldCount));
			if (!atFirstLast) {
				inst._field += offset;
			}
			this._showField(inst);
			inst._lastChr = '';
			return (atFirstLast && moveOut);
		},

		/** Update the current field in the direction indicated.
			@private
			@param inst {object} The instance settings.
			@param offset {number} The amount to change by. */
		_adjustField: function(inst, offset) {
			if (inst.elem.val() === '') {
				offset = 0;
			}
			var field = inst.options.dateFormat.charAt(inst._field);
			var year = inst._selectedYear + (field === 'y' || field === 'Y' ? offset : 0);
			var month = inst._selectedMonth +
				(field === 'm' || field === 'n' || field === 'N' ? offset : 0);
			var day = (field === 'd' || field === 'w' || field === 'W' ?
				inst._selectedDay + offset :
				Math.min(inst._selectedDay, this._getDaysInMonth(year, month)));
			this._setDate(inst, new Date(year, month, day, 12));
		},

		/** Find the number of days in a given month.
			@private
			@param year {number} The full year.
			@param month {number} The month (0 to 11).
			@return {number} The number of days in this month. */
		_getDaysInMonth: function(year, month) {
			return new Date(year, month + 1, 0, 12).getDate();
		},

		/** Check against minimum/maximum and display date.
			@private
			@param inst {object} The instance settings.
			@param date {Date|number|string} An actual date or offset in days from now or
						units and periods of offsets from now. */
		_setDate: function(inst, date) {
			// Normalise to base time
			date = this._normaliseDate(
				this._determineDate(date || inst.options.defaultDate, inst) || new Date());
			var minDate = this._normaliseDate(this._determineDate(inst.options.minDate, inst));
			var maxDate = this._normaliseDate(this._determineDate(inst.options.maxDate, inst));
			// Ensure it is within the bounds set
			date = (minDate && date < minDate ? minDate :
				(maxDate && date > maxDate ? maxDate : date));
			inst._selectedYear = date.getFullYear();
			inst._selectedMonth = date.getMonth();
			inst._selectedDay = date.getDate();
			this._showDate(inst);
		},

		/** A date may be specified as an exact value or a relative one.
			@private
			@param setting {Date|string|number} An actual date or date in current format or
						offset in days from now or units and periods of offsets from now.
			@param inst {object} The instance settings.
			@return {Date} The calculated date. */
		_determineDate: function(setting, inst) {
			var offsetNumeric = function(offset) { // E.g. +300, -2
				var date = plugin._normaliseDate(new Date());
				date.setDate(date.getDate() + offset);
				return date;
			};
			var offsetString = function(offset) { // E.g. '+2m', '-1w', '+3m +10d'
				var date = plugin._extractDate(offset, inst);
				if (date) {
					return date;
				}
				offset = offset.toLowerCase();
				date = plugin._normaliseDate(new Date());
				var year = date.getFullYear();
				var month = date.getMonth();
				var day = date.getDate();
				var pattern = /([+-]?[0-9]+)\s*(d|w|m|y)?/g;
				var matches = pattern.exec(offset);
				while (matches) {
					switch (matches[2] || 'd') {
						case 'd':
							day += parseInt(matches[1], 10); break;
						case 'w':
							day += parseInt(matches[1], 10) * 7; break;
						case 'm':
							month += parseInt(matches[1], 10); break;
						case 'y':
							year += parseInt(matches[1], 10); break;
					}
					matches = pattern.exec(offset);
				}
				return new Date(year, month, day, 12);
			};
			return (setting ? (typeof setting === 'string' ? offsetString(setting) :
				(typeof setting === 'number' ? offsetNumeric(setting) : setting)) : null);
		},

		/** Normalise date object to a common time.
			@private
			@param date {Date} The original date.
			@return {Date} The normalised date. */
		_normaliseDate: function(date) {
			if (date) {
				date.setHours(12, 0, 0, 0);
			}
			return date;
		}
	});
	
	var plugin = $.dateEntry;

})(jQuery);
