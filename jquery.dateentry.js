/* http://keith-wood.name/dateEntry.html
   Date entry for jQuery v1.1.1.
   Written by Keith Wood (kbwood{at}iinet.com.au) March 2009.
   Licensed under the MIT (https://github.com/jquery/jquery/blob/master/MIT-LICENSE.txt) license.
   Please attribute the author if you use it. */

/* Turn an input field into an entry point for a date value.
   The date can be entered via directly typing the value,
   via the arrow keys, or via spinner buttons.
   It is configurable to reorder the fields, to enforce a minimum
   and/or maximum date, and to change the spinner image.
   Attach it with $('input selector').dateEntry(); for default settings,
   or configure it with options like:
   $('input selector').dateEntry(
      {spinnerImage: 'spinnerSquare.png', spinnerSize: [20, 20, 0]}); */

(function($) { // Hide scope, no $ conflict

/* DateEntry manager.
   Use the singleton instance of this class, $.dateEntry, to interact with the date
   entry functionality. Settings for fields are maintained in an instance object,
   allowing multiple different settings on the same page. */
function DateEntry() {
	this._disabledInputs = []; // List of date inputs that have been disabled
	this.regional = []; // Available regional settings, indexed by language code
	this.regional[''] = { // Default regional settings
		dateFormat: 'mdy/', // The format of the date text:
			// first three fields in order ('y' for year, 'Y' for two-digit year,
			// 'm' for month, 'n' for abbreviated month name, 'N' for full month name,
			// 'd' for day, 'w' for abbreviated day name and number,
			// 'W' for full day name and number), followed by separator(s) 
		monthNames: ['January', 'February', 'March', 'April', 'May', 'June',
			'July', 'August', 'September', 'October', 'November', 'December'], // Names of the months
		monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
			'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // Abbreviated names of the months
		dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		// Names of the days
		dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], // Abbreviated names of the days
		spinnerTexts: ['Today', 'Previous field', 'Next field', 'Increment', 'Decrement']
		// The popup texts for the spinner image areas
	};
	this._defaults = {
		appendText: '', // Display text following the input box, e.g. showing the format
		initialField: 0, // The field to highlight initially
		useMouseWheel: true, // True to use mouse wheel for increment/decrement if possible,
			// false to never use it
		defaultDate: null, // The date to use if none has been set, leave at null for now
		minDate: null, // The earliest selectable date, or null for no limit
		maxDate: null, // The latest selectable date, or null for no limit
		spinnerImage: 'spinnerDefault.png', // The URL of the images to use for the date spinner
			// Seven images packed horizontally for normal, each button pressed, and disabled
		spinnerSize: [20, 20, 8], // The width and height of the spinner image,
			// and size of centre button for current date
		spinnerBigImage: '', // The URL of the images to use for the expanded date spinner
			// Seven images packed horizontally for normal, each button pressed, and disabled
		spinnerBigSize: [40, 40, 16], // The width and height of the expanded spinner image,
			// and size of centre button for current date
		spinnerIncDecOnly: false, // True for increment/decrement buttons only, false for all
		spinnerRepeat: [500, 250], // Initial and subsequent waits in milliseconds
			// for repeats on the spinner buttons
		beforeShow: null, // Function that takes an input field and
			// returns a set of custom settings for the date entry
		altField: null, // Selector, element or jQuery object for an alternate field to keep synchronised
		altFormat: null // A separate format for the alternate field
	};
	$.extend(this._defaults, this.regional['']);
}

$.extend(DateEntry.prototype, {
	/* Class name added to elements to indicate already configured with date entry. */
	markerClassName: 'hasDateEntry',
	/* Name of the data property for instance settings. */
	propertyName: 'dateEntry',

	/* Class name for the appended content. */
	_appendClass: 'dateEntry_append',
	/* Class name for the date entry control. */
	_controlClass: 'dateEntry_control',
	/* Class name for the expanded spinner. */
	_expandClass: 'dateEntry_expand',

	/* Override the default settings for all instances of the date entry.
	   @param  options  (object) the new settings to use as defaults (anonymous object)
	   @return  (DateEntry) this object */
	setDefaults: function(options) {
		$.extend(this._defaults, options || {});
		return this;
	},

	/* Attach the date entry handler to an input field.
	   @param  target   (element) the field to attach to
	   @param  options  (object) custom settings for this instance */
	_attachPlugin: function(target, options) {
		var input = $(target);
		if (input.hasClass(this.markerClassName)) {
			return;
		}
		var inst = {options: $.extend({}, this._defaults, options), input: input,
			_field: 0, _selectedYear: 0, _selectedMonth: 0, _selectedDay: 0};
		input.data(this.propertyName, inst).addClass(this.markerClassName).
			bind('focus.' + this.propertyName, this._doFocus).
			bind('blur.' + this.propertyName, this._doBlur).
			bind('click.' + this.propertyName, this._doClick).
			bind('keydown.' + this.propertyName, this._doKeyDown).
			bind('keypress.' + this.propertyName, this._doKeyPress).
			bind('paste.' + this.propertyName, function(event) { // Check pastes
				setTimeout(function() { plugin._parseDate(inst); }, 1);
			});
		this._optionPlugin(target, options);
	},

	/* Retrieve or reconfigure the settings for a date entry control.
	   @param  target   (element) the control to affect
	   @param  options  (object) the new options for this instance or
	                    (string) an individual property name
	   @param  value    (any) the individual property value (omit if options
	                    is an object or to retrieve the value of a setting)
	   @return  (any) if retrieving a value */
	_optionPlugin: function(target, options, value) {
		target = $(target);
		var inst = target.data(this.propertyName);
		if (!options || (typeof options == 'string' && value == null)) { // Get option
			var name = options;
			options = (inst || {}).options;
			return (options && name ? options[name] : options);
		}

		if (!target.hasClass(this.markerClassName)) {
			return;
		}
		options = options || {};
		if (typeof options == 'string') {
			var name = options;
			options = {};
			options[name] = value;
		}
		var currentDate = this._extractDate(target.val(), inst);
		$.extend(inst.options, options);
		inst._field = 0;
		if (currentDate) {
			this._setDate(inst, currentDate);
		}
		// Remove stuff dependent on old settings
		target.next('span.' + this._appendClass).remove();
		target.parent().find('span.' + this._controlClass).remove();
		if ($.fn.mousewheel) {
			target.unmousewheel();
		}
		// And re-add if requested
		var spinner = (!inst.options.spinnerImage ? null :
			$('<span class="' + this._controlClass + '" style="display: inline-block; ' +
			'background: url(\'' + inst.options.spinnerImage + '\') 0 0 no-repeat; width: ' + 
			inst.options.spinnerSize[0] + 'px; height: ' + inst.options.spinnerSize[1] + 'px;"></span>'));
		target.after(inst.options.appendText ? '<span class="' + this._appendClass + '">' +
			inst.options.appendText + '</span>' : '').after(spinner || '');
		// Allow mouse wheel usage
		if (inst.options.useMouseWheel && $.fn.mousewheel) {
			target.mousewheel(this._doMouseWheel);
		}
		if (spinner) {
			spinner.mousedown(this._handleSpinner).mouseup(this._endSpinner).
				mouseover(this._expandSpinner).mouseout(this._endSpinner).
				mousemove(this._describeSpinner);
		}
	},

	/* Enable a date entry input and any associated spinner.
	   @param  target  (element) single input field */
	_enablePlugin: function(target) {
		this._enableDisable(target, false);
	},

	/* Disable a date entry input and any associated spinner.
	   @param  target  (element) single input field */
	_disablePlugin: function(target) {
		this._enableDisable(target, true);
	},

	/* Enable or disable a date entry input and any associated spinner.
	   @param  target   (element) single input field
	   @param  disable  (boolean) true to disable, false to enable */
	_enableDisable: function(target, disable) {
		var inst = $.data(target, this.propertyName);
		if (!inst) {
			return;
		}
		target.disabled = disable;
		if (target.nextSibling && target.nextSibling.nodeName.toLowerCase() == 'span') {
			plugin._changeSpinner(inst, target.nextSibling, (disable ? 5 : -1));
		}
		plugin._disabledInputs = $.map(plugin._disabledInputs,
			function(value) { return (value == target ? null : value); }); // Delete entry
		if (disable) {
			plugin._disabledInputs.push(target);
		}
	},

	/* Check whether an input field has been disabled.
	   @param  target  (element) input field to check
	   @return  (boolean) true if this field has been disabled, false if it is enabled */
	_isDisabledPlugin: function(target) {
		return $.inArray(target, this._disabledInputs) > -1;
	},

	/* Remove the date entry functionality from an input.
	   @param  target  (element) the control to affect */
	_destroyPlugin: function(target) {
		target = $(target);
		if (!target.hasClass(this.markerClassName)) {
			return;
		}
		target.removeClass(this.markerClassName).removeData(this.propertyName).
			unbind('.' + this.propertyName);
		if ($.fn.mousewheel) {
			target.unmousewheel();
		}
		this._disabledInputs = $.map(this._disabledInputs,
			function(value) { return (value == target[0] ? null : value); }); // Delete entry
		target.siblings('.' + this._appendClass + ',.' + this._controlClass).remove();
	},

	/* Initialise the current date for a date entry input field.
	   @param  target  (element) input field to update
	   @param  date    (Date) the new date or null for now */
	_setDatePlugin: function(target, date) {
		var inst = $.data(target, this.propertyName);
		if (inst) {
			if (date === null || date === '') {
				inst.input.val('');
			}
			else {
				this._setDate(inst, date ? (typeof date == 'object' ?
					new Date(date.getTime()) : date) : null);
			}
		}
	},

	/* Retrieve the current date for a date entry input field.
	   @param  target  (element) input field to update
	   @return  (Date) current date or null if none */
	_getDatePlugin: function(target) {
		var inst = $.data(target, this.propertyName);
		return (inst ? this._extractDate(inst.input.val(), inst) : null);
	},

	/* Initialise date entry.
	   @param  target  (element) the input field or
	                   (event) the focus event */
	_doFocus: function(target) {
		var input = (target.nodeName && target.nodeName.toLowerCase() == 'input' ? target : this);
		if (plugin._lastInput == input || plugin._isDisabledPlugin(input)) {
			plugin._focussed = false;
			return;
		}
		var inst = $.data(input, plugin.propertyName);
		plugin._focussed = true;
		plugin._lastInput = input;
		plugin._blurredInput = null;
		$.extend(inst.options, ($.isFunction(inst.options.beforeShow) ?
			inst.options.beforeShow.apply(input, [input]) : {}));
		plugin._parseDate(inst);
		setTimeout(function() { plugin._showField(inst); }, 10);
	},

	/* Note that the field has been exited.
	   @param  event  (event) the blur event */
	_doBlur: function(event) {
		plugin._blurredInput = plugin._lastInput;
		plugin._lastInput = null;
	},

	/* Select appropriate field portion on click, if already in the field.
	   @param  event  (event) the click event */
	_doClick: function(event) {
		var input = event.target;
		var inst = $.data(input, plugin.propertyName);
		if (!plugin._focussed) {
			inst._field = 0;
			if (input.selectionStart != null) { // Use input select range
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
		plugin._showField(inst);
		plugin._focussed = false;
	},

	/* Handle keystrokes in the field.
	   @param  event  (event) the keydown event
	   @return  (boolean) true to continue, false to stop processing */
	_doKeyDown: function(event) {
		if (event.keyCode >= 48) { // >= '0'
			return true;
		}
		var inst = $.data(event.target, plugin.propertyName);
		switch (event.keyCode) {
			case 9: return (event.shiftKey ?
						// Move to previous date field, or out if at the beginning
						plugin._changeField(inst, -1, true) :
						// Move to next date field, or out if at the end
						plugin._changeField(inst, +1, true));
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

	/* Disallow unwanted characters.
	   @param  event  (event) the keypress event
	   @return  (boolean) true to continue, false to stop processing */
	_doKeyPress: function(event) {
		var chr = String.fromCharCode(event.charCode == undefined ? event.keyCode : event.charCode);
		if (chr < ' ') {
			return true;
		}
		var inst = $.data(event.target, plugin.propertyName);
		plugin._handleKeyPress(inst, chr);
		return false;
	},

	/* Increment/decrement on mouse wheel activity.
	   @param  event  (event) the mouse wheel event
	   @param  delta  (number) the amount of change */
	_doMouseWheel: function(event, delta) {
		if (plugin._isDisabledPlugin(event.target)) {
			return;
		}
		var inst = $.data(event.target, plugin.propertyName);
		inst.input.focus();
		if (!inst.input.val()) {
			plugin._parseDate(inst);
		}
		plugin._adjustField(inst, delta);
		event.preventDefault();
	},

	/* Expand the spinner, if possible, to make it easier to use.
	   @param  event  (event) the mouse over event */
	_expandSpinner: function(event) {
		var spinner = plugin._getSpinnerTarget(event);
		var inst = $.data(plugin._getInput(spinner), plugin.propertyName);
		if (plugin._isDisabledPlugin(inst.input[0])) {
			return;
		}
		if (inst.options.spinnerBigImage) {
			inst._expanded = true;
			var offset = $(spinner).offset();
			var relative = null;
			$(spinner).parents().each(function() {
				var parent = $(this);
				if (parent.css('position') == 'relative' ||
						parent.css('position') == 'absolute') {
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

	/* Locate the actual input field from the spinner.
	   @param  spinner  (element) the current spinner
	   @return  (element) the corresponding input */
	_getInput: function(spinner) {
		return $(spinner).siblings('.' + plugin.markerClassName)[0];
	},

	/* Change the title based on position within the spinner.
	   @param  event  (event) the mouse move event */
	_describeSpinner: function(event) {
		var spinner = plugin._getSpinnerTarget(event);
		var inst = $.data(plugin._getInput(spinner), plugin.propertyName);
		spinner.title = inst.options.spinnerTexts[plugin._getSpinnerRegion(inst, event)];
	},

	/* Handle a click on the spinner.
	   @param  event  (event) the mouse click event */
	_handleSpinner: function(event) {
		var spinner = plugin._getSpinnerTarget(event);
		var input = plugin._getInput(spinner);
		if (plugin._isDisabledPlugin(input)) {
			return;
		}
		if (input == plugin._blurredInput) {
			plugin._lastInput = input;
			plugin._blurredInput = null;
		}
		var inst = $.data(input, plugin.propertyName);
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

	/* Action a click on the spinner.
	   @param  inst    (object) the instance settings
	   @param  region  (number) the spinner "button" */
	_actionSpinner: function(inst, region) {
		if (!inst.input.val()) {
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

	/* Repeat a click on the spinner.
	   @param  inst    (object) the instance settings
	   @param  region  (number) the spinner "button" */
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

	/* Stop a spinner repeat.
	   @param  event  (event) the mouse event */
	_releaseSpinner: function(event) {
		clearTimeout(plugin._timer);
		plugin._timer = null;
	},

	/* Tidy up after an expanded spinner.
	   @param  event  (event) the mouse event */
	_endExpand: function(event) {
		plugin._timer = null;
		var spinner = plugin._getSpinnerTarget(event);
		var input = plugin._getInput(spinner);
		var inst = $.data(input, plugin.propertyName);
		$(spinner).remove();
		inst._expanded = false;
	},

	/* Tidy up after a spinner click.
	   @param  event  (event) the mouse event */
	_endSpinner: function(event) {
		plugin._timer = null;
		var spinner = plugin._getSpinnerTarget(event);
		var input = plugin._getInput(spinner);
		var inst = $.data(input, plugin.propertyName);
		if (!plugin._isDisabledPlugin(input)) {
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

	/* Retrieve the spinner from the event.
	   @param  event  (event) the mouse click event
	   @return  (element) the target field */
	_getSpinnerTarget: function(event) {
		return event.target || event.srcElement;
	},

	/* Determine which "button" within the spinner was clicked.
	   @param  inst   (object) the instance settings
	   @param  event  (event) the mouse event
	   @return  (number) the spinner "button" number */
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
		return (min == left ? 1 : (min == right ? 2 : (min == top ? 3 : 4))); // Nearest edge
	},

	/* Change the spinner image depending on button clicked.
	   @param  inst     (object) the instance settings
	   @param  spinner  (element) the spinner control
	   @param  region   (number) the spinner "button" */
	_changeSpinner: function(inst, spinner, region) {
		$(spinner).css('background-position', '-' + ((region + 1) *
			inst.options[inst._expanded ? 'spinnerBigSize' : 'spinnerSize'][0]) + 'px 0px');
	},

	/* Extract the date value from the input field, or default to now.
	   @param  inst  (object) the instance settings */
	_parseDate: function(inst) {
		var currentDate = this._extractDate(inst.input.val(), inst) ||
			this._normaliseDate(this._determineDate(inst.options.defaultDate, inst) || new Date());
		inst._selectedYear = currentDate.getFullYear();
		inst._selectedMonth = currentDate.getMonth();
		inst._selectedDay = currentDate.getDate();
		inst._lastChr = '';
		inst._field = Math.max(0, Math.min(2, inst.options.initialField));
		if (inst.input.val() != '') {
			this._showDate(inst);
		}
	},

	/* Extract the date value from a string.
	   @param  value  (string) the date text
	   @param  inst   (object) the instance settings
	   @return  (Date) the retrieved date or null if no value */
	_extractDate: function(value, inst) {
		var values = value.split(
			new RegExp('[\\' + inst.options.dateFormat.substring(3).split('').join('\\') + ']'));
		var year = 0;
		var month = 0;
		var day = 0;
		for (var i = 0; i < 3; i++) {
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
						inst.options[field == 'N' ? 'monthNames' : 'monthNamesShort']) + 1;
					break;
				case 'w': case 'W':
					if (inst.options.dateFormat.charAt(3) == ' ') {
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
		return (year && month && day ? new Date(year, month - 1, day, 12) : null);
	},

	/* Set the selected date into the input field.
	   @param  inst  (object) the instance settings */
	_showDate: function(inst) {
		this._setValue(inst, this._formatDate(inst, inst.options.dateFormat));
		this._showField(inst);
	},

	/* Format a date as requested.
	   @param  inst    (object) the instance settings
	   @param  format  (string) the date format to use
	   @return  (string) the formatted date */
	_formatDate: function(inst, format) {
		var currentDate = '';
		for (var i = 0; i < 3; i++) {
			currentDate += (i == 0 ? '' : format.charAt(3));
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
					currentDate += inst.options[field == 'N' ?
						'monthNames' : 'monthNamesShort'][inst._selectedMonth];
					break;
				case 'd':
					currentDate += this._formatNumber(inst._selectedDay);
					break;
				case 'w': case 'W':
					currentDate += inst.options[field == 'W' ? 'dayNames' : 'dayNamesShort'][
						new Date(inst._selectedYear, inst._selectedMonth, inst._selectedDay, 12).getDay()] +
						' ' + this._formatNumber(inst._selectedDay);
					break;
			}
		}
		return currentDate;
	},

	/* Highlight the current date field.
	   @param  inst  (object) the instance settings */
	_showField: function(inst) {
		var input = inst.input[0];
		if (inst.input.is(':hidden') || plugin._lastInput != input) {
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
			range.moveEnd('character', end - inst.input.val().length);
			range.select();
		}
		if (!input.disabled) {
			input.focus();
		}
	},

	/* Calculate the field length.
	   @param  inst        (object) the instance settings
	   @param  field       (number) the field number (0-2)
	   @param  dateFormat  (string) the format for the date display
	   @return  (number) the length of this subfield */
	_fieldLength: function(inst, field, dateFormat) {
		field = dateFormat.charAt(field);
		switch (field) {
			case 'y': return 4;
			case 'n': case 'N':
				return inst.options[field == 'N' ? 'monthNames' : 'monthNamesShort']
					[inst._selectedMonth].length;
			case 'w': case 'W':
				return inst.options[field == 'W' ? 'dayNames' : 'dayNamesShort']
					[new Date(inst._selectedYear, inst._selectedMonth, inst._selectedDay, 12).
					getDay()].length + 3;
			default: return 2;
		}
	},

	/* Ensure displayed single number has a leading zero.
	   @param  value  (number) current value
	   @return  (string) number with at least two digits */
	_formatNumber: function(value) {
		return (value < 10 ? '0' : '') + value;
	},

	/* Update the input field and notify listeners.
	   @param  inst   (object) the instance settings
	   @param  value  (string) the new value */
	_setValue: function(inst, value) {
		if (value != inst.input.val()) {
			if (inst.options.altField) {
				$(inst.options.altField).val(!value ? '' : this._formatDate(inst,
					inst.options.altFormat || inst.options.dateFormat));
			}
			inst.input.val(value).trigger('change');
		}
	},

	/* Move to previous/next field, or out of field altogether if appropriate.
	   @param  inst     (object) the instance settings
	   @param  offset   (number) the direction of change (-1, +1)
	   @param  moveOut  (boolean) true if can move out of the field
	   @return  (boolean) true if exitting the field, false if not */
	_changeField: function(inst, offset, moveOut) {
		var atFirstLast = (inst.input.val() == '' || inst._field == (offset == -1 ? 0 : 2));
		if (!atFirstLast) {
			inst._field += offset;
		}
		this._showField(inst);
		inst._lastChr = '';
		return (atFirstLast && moveOut);
	},

	/* Update the current field in the direction indicated.
	   @param  inst    (object) the instance settings
	   @param  offset  (number) the amount to change by */
	_adjustField: function(inst, offset) {
		if (inst.input.val() == '') {
			offset = 0;
		}
		var field = inst.options.dateFormat.charAt(inst._field);
		var year = inst._selectedYear + (field == 'y' || field == 'Y' ? offset : 0);
		var month = inst._selectedMonth +
			(field == 'm' || field == 'n' || field == 'N' ? offset : 0);
		var day = (field == 'd' || field == 'w' || field == 'W' ?
			inst._selectedDay + offset :
			Math.min(inst._selectedDay, this._getDaysInMonth(year, month)));
		this._setDate(inst, new Date(year, month, day, 12));
	},

	/* Find the number of days in a given month.
	   @param  year   (number) the full year
	   @param  month  (number) the month (0 to 11)
	   @return  (number) the number of days in this month */
	_getDaysInMonth: function(year, month) {
		return new Date(year, month + 1, 0, 12).getDate();
	},

	/* Check against minimum/maximum and display date.
	   @param  inst  (object) the instance settings
	   @param  date  (Date) an actual date or
	                 (number) offset in days from now or
					 (string) units and periods of offsets from now */
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

	/* A date may be specified as an exact value or a relative one.
	   @param  setting  (Date) an actual date or
	                    (string) date in current format
	                    (number) offset in days from now or
	                    (string) units and periods of offsets from now
	   @param  inst     (object) the instance settings
	   @return  (Date) the calculated date */
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
		return (setting ? (typeof setting == 'string' ? offsetString(setting) :
			(typeof setting == 'number' ? offsetNumeric(setting) : setting)) : null);
	},

	/* Normalise date object to a common time.
	   @param  date  (Date) the original date
	   @return  (Date) the normalised date */
	_normaliseDate: function(date) {
		if (date) {
			date.setHours(12, 0, 0, 0);
		}
		return date;
	},

	/* Update date based on keystroke entered.
	   @param  inst  (object) the instance settings
	   @param  chr   (ch) the new character */
	_handleKeyPress: function(inst, chr) {
		if (inst.options.dateFormat.substring(3).indexOf(chr) > -1) {
			this._changeField(inst, +1, false);
		}
		else if (chr >= '0' && chr <= '9') { // Allow direct entry of date
			var field = inst.options.dateFormat.charAt(inst._field);
			var key = parseInt(chr, 10);
			var value = parseInt((inst._lastChr || '') + chr, 10);
			var year = (field != 'y' && field != 'Y' ? inst._selectedYear : value);
			var month = (field != 'm' && field != 'n' && field != 'N' ?
				inst._selectedMonth + 1 : (value >= 1 && value <= 12 ? value :
				(key > 0 ? key : inst._selectedMonth + 1)));
			var day = (field != 'd' && field != 'w' && field != 'W' ?
				inst._selectedDay : (value >= 1 &&
				value <= this._getDaysInMonth(year, month - 1) ? value :
				(key > 0 ? key : inst._selectedDay)));
			this._setDate(inst, new Date(year, month - 1, day, 12));
			inst._lastChr = (field != 'y' ? '' :
				inst._lastChr.substr(Math.max(0, inst._lastChr.length - 2))) + chr;
		}
		else { // Allow text entry by month name
			var field = inst.options.dateFormat.charAt(inst._field);
			if (field == 'n' || field == 'N') {
				inst._lastChr += chr.toLowerCase();
				var names = inst.options[field == 'n' ? 'monthNamesShort' : 'monthNames'];
				var findMonth = function() {
					for (var i = 0; i < names.length; i++) {
						if (names[i].toLowerCase().substring(0, inst._lastChr.length) == inst._lastChr) {
							return i;
							break;
						}
					}
					return -1;
				};
				var month = findMonth();
				if (month == -1) {
					inst._lastChr = chr.toLowerCase();
					month = findMonth();
				}
				if (month == -1) {
					inst._lastChr = '';
				}
				else {
					var year = inst._selectedYear;
					var day = Math.min(inst._selectedDay, this._getDaysInMonth(year, month));
					this._setDate(inst, new Date(year, month, day, 12));
				}
			}
		}
	}
});

// The list of commands that return values and don't permit chaining
var getters = ['getDate', 'isDisabled'];

/* Determine whether a command is a getter and doesn't permit chaining.
   @param  command    (string, optional) the command to run
   @param  otherArgs  ([], optional) any other arguments for the command
   @return  true if the command is a getter, false if not */
function isNotChained(command, otherArgs) {
	if (command == 'option' && (otherArgs.length == 0 ||
			(otherArgs.length == 1 && typeof otherArgs[0] == 'string'))) {
		return true;
	}
	return $.inArray(command, getters) > -1;
}

/* Attach the date entry functionality to a jQuery selection.
   @param  options  (object) the new settings to use for these instances (optional) or
                    (string) the command to run (optional)
   @return  (jQuery) for chaining further calls or
            (any) getter value */
$.fn.dateEntry = function(options) {
	var otherArgs = Array.prototype.slice.call(arguments, 1);
	if (isNotChained(options, otherArgs)) {
		return plugin['_' + options + 'Plugin'].
			apply(plugin, [this[0]].concat(otherArgs));
	}
	return this.each(function() {
		if (typeof options == 'string') {
			if (!plugin['_' + options + 'Plugin']) {
				throw 'Unknown command: ' + options;
			}
			plugin['_' + options + 'Plugin'].
				apply(plugin, [this].concat(otherArgs));
		}
		else {
			// Check for settings on the control itself
			var inlineSettings = ($.fn.metadata ? $(this).metadata() : {});
			plugin._attachPlugin(this, $.extend({}, inlineSettings, options || {}));
		}
	});
};

/* Initialise the date entry functionality. */
var plugin = $.dateEntry = new DateEntry(); // Singleton instance

})(jQuery);
