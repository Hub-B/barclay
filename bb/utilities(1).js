/*
 * JavaScript Utilities
 *
 * This .js file contains various utility functions.
 */

/**
 * Function to popUp a URL in a new window.
 */
function pop(loc, width, height, toolbar) {
	if (width == null || width == "") {
		var windowWidth = 450;
	} else {
		var windowWidth = width;
	}
	if (height == null || height == "") {
		var windowHeight = 400;
	} else {
		var windowHeight = height;
	}
	if (toolbar) {
		toolbar = "yes";
	} else {
		toolbar = "no";
	}		
	var winTop = (screen.height / 2) - (windowHeight / 2);
	var winLeft = (screen.width / 2) - (windowWidth / 2);
	var windowOptions = "resizable=yes,toolbar=" + toolbar + ",scrollbars=yes,location=no,directories=no,status=no,menubar=no,width=" + windowWidth + ",height=" + windowHeight + ",left=" + winLeft + ",top=" + winTop + ",screenX=" + winLeft + ",screenY=" + winTop;
	popWindow = this.open(loc, "popWindow", windowOptions);
	popWindow.focus();
}

/**
 * Given form and field name strings, returns element reference.
 * For radio button fields, fldName should be passed in with radio button index (fldName[1]).
 */
function getElement(formName, fldName) {
	if (formName.length > 0 && fldName.length > 0 ) {
		var formLength = document.forms.length;
		var fieldElementIndex = null;
		var fieldSearchIndex = 0;
		var fldNameIndex = "";
		// Check if fldName has an index
		var beginIndex = fldName.lastIndexOf('[');
		if (beginIndex >= 0) {
			var endIndex = fldName.lastIndexOf(']');
			// If end bracket is the last character in the name, this is a radio button.
			if (endIndex == (fldName.length - 1)) {
				fieldElementIndex = fldName.substring(beginIndex + 1, endIndex);
				fldNameIndex = fldName.substring(0, beginIndex);
			}
		}
		for (var formIndex = 0; formIndex < formLength; ++formIndex) {
			if (document.forms[formIndex].name == formName) {
				var formElementLength = document.forms[formIndex].elements.length;
				for (var formElementIndex = 0; formElementIndex < formElementLength; ++formElementIndex) {
					if (document.forms[formIndex].elements[formElementIndex].name == fldName || document.forms[formIndex].elements[formElementIndex].name == fldNameIndex) {
						if (document.forms[formIndex].elements[formElementIndex].type == 'radio' && fieldElementIndex != null) {
							if (fieldElementIndex == fieldSearchIndex) {
								return document.forms[formIndex].elements[formElementIndex];
							} else {
								++fieldSearchIndex;
							}
						} else {
							return document.forms[formIndex].elements[formElementIndex];
						}
					}
				}
			}
		}
	}
	return null;
}

/*
 * Returns the value of the selected radio button
 */
function getRadioElementValue(formName, fldName) {
	for (var formIndex = 0; formIndex < document.forms.length; ++formIndex) {
		if (document.forms[formIndex].name == formName) {
			for (var formElementIndex = 0; formElementIndex < document.forms[formIndex].elements.length; ++formElementIndex) {
				if (document.forms[formIndex].elements[formElementIndex].name == fldName && document.forms[formIndex].elements[formElementIndex].type == "radio" && document.forms[formIndex].elements[formElementIndex].checked) {
					return document.forms[formIndex].elements[formElementIndex].value;
				}
			}
		}
	}
	return null;
}

/*
 * Returns the object of the selected radio button
 */
function getSelectedRadioElement(formName, fldName) {
	for (var formIndex = 0; formIndex < document.forms.length; ++formIndex) {
		if (document.forms[formIndex].name == formName) {
			for (var formElementIndex = 0; formElementIndex < document.forms[formIndex].elements.length; ++formElementIndex) {
				if (document.forms[formIndex].elements[formElementIndex].name == fldName && document.forms[formIndex].elements[formElementIndex].type == "radio" && document.forms[formIndex].elements[formElementIndex].checked) {
					return document.forms[formIndex].elements[formElementIndex];
				}
			}
		}
	}
	return null;
}
 
/**
 * Given form, clears out all values of elements within the form.
 */
function clearForm(frm) {
	for (var formElementIndex = 0; formElementIndex < frm.elements.length; ++formElementIndex) {
		var elementType = frm.elements[formElementIndex].type;
		var elem = frm.elements[formElementIndex];
		switch (elementType) {
			case 'button':
				break;
			case 'checkbox':
				if (elem.defaultChecked) {
					elem.checked = true;
				} else {
					elem.checked = false;
				}
				break;
			case 'hidden':
				break;
			case 'radio':
				break;
			case 'reset':
				break;
			case 'select-one':
				elem.selectedIndex = 0;
			case 'submit':
				break;
			default : //file, password, select-multiple, text, textarea
				elem.value = "";
				break;
		}
	}
}

/**
 * LTrim(string) - Returns a copy of a string without leading spaces.
 */
function LTrim(str) {
	// We don't want to trim JUST spaces, but also tabs, line feeds, etc.
	var whitespace = new String(" \t\n\r");
	var s = new String(str);
	if (whitespace.indexOf(s.charAt(0)) != -1) {
		// We have a string with leading blank(s)
		var j=0, i = s.length;
		// Iterate from the far left of string until we don't have any more whitespace
		while (j < i && whitespace.indexOf(s.charAt(j)) != -1) {
			j++;
		}
		// Get the substring from the first non-whitespace character to the end of the string
		s = s.substring(j, i);
	}
	return s;
}

/**
 * RTrim(string) - Returns a copy of a string without trailing spaces.
 */
function RTrim(str) {
	// We don't want to trim JUST spaces, but also tabs, line feeds, etc.
	var whitespace = new String(" \t\n\r");
	var s = new String(str);
	if (whitespace.indexOf(s.charAt(s.length-1)) != -1) {
  // We have a string with trailing blank(s)
  var i = s.length - 1;
		// Iterate from the far right of string until we don't have any more whitespace
		while (i >= 0 && whitespace.indexOf(s.charAt(i)) != -1) {
			i--;
		}
		// Get the substring from the front of the string to where the last non-whitespace character is...
		s = s.substring(0, i+1);
	}
	return s;
}

/**
 * Trim(string) - Returns a copy of a string without leading or trailing spaces
 */
function Trim(str) {
	return RTrim(LTrim(str));
}

/**
 * Enable/Disable fields
 *
 * PARAMETERS:
 *		- formName (string): Name of form that contains the fields to enable/disable.
 *		- fieldArray (array): Array of field names to enable/disable.
 *		- disable (boolean): Determines whether to enable or disable the elements in the array.
 *		- clearValues (boolean): Determines whether to clear the values when disabling.
 */
function enableDisableFields(formName, fieldArray, disable, clearValues) {
	for (var i = 0; i < fieldArray.length; i++) {
		fieldElement = getElement(formName, fieldArray[i]);
		if (fieldElement != null) {
			if (disable) {
				if (clearValues) {
					if (fieldElement.type == "select-one") {
						fieldElement.selectedIndex = 0;
					} else if (fieldElement.type == "checkbox" || fieldElement.type == "radio") {
						fieldElement.checked = false;
					} else {
						fieldElement.value = "";
					}
				}
				fieldElement.className = "disabled";
			} else {
				if (fieldElement.disabled) {
					fieldElement.className = "enabled";
				}
			}
			fieldElement.disabled = disable;
		}
	}
}

/**
 * Auto-formatting function for tax id
 */
function formatSSN(ssnElement) {
	var ssnString = Trim(ssnElement.value);
	// Check to see if it is a corporate taxid before formatting
	if (ssnString.length == 10 && ssnString.substr(2,1) == "-") {
		return;
	}
	ssnString = ssnString.replace(/[^0-9]/g, '');
	// If it is the correct size and does not contain characters, reformat
	if (ssnString.length == 9) {
		ssnElement.value = ssnString.substr(0,3) + "-" + ssnString.substr(3,2) + "-" + ssnString.substr(5,4);
	}
}

/**
 * Auto-formatting function for tax id
 */
function formatCorporateSSN(ssnElement) {
	var ssnString = Trim(ssnElement.value);
	ssnString = ssnString.replace(/[^0-9]/g, '');
	// If it is the correct size and does not contain characters, reformat
	if (ssnString.length == 9) {
		ssnElement.value = ssnString.substr(0, 2) + "-" + ssnString.substr(2);
	}
}

/**
 * Auto-formatting function for phone numbers
 */
function formatPhone(phoneElement) {
	var phoneString = Trim(phoneElement.value);
	phoneString = phoneString.replace(/[^0-9]/g, '');
	// If it is the correct size and does not contain characters, reformat
	if (phoneString.length == 10) {
		phoneElement.value = phoneString.substr(0,3) + "-" + phoneString.substr(3,3) + "-" + phoneString.substr(6,4);
	}
}

/**
 * Auto-formatting function for dates
 * - This function assumes entry of 4-digit year
 */
function formatDate(dateElement) {
	var dateString = Trim(dateElement.value);
	dateString = dateString.replace(/[^0-9]/g, '/');
	var dateStringLength = dateString.length;
	// If "/" does not exist in the string, add them
	if (dateString.indexOf("/") < 0) {
		if (dateStringLength == 6) {
			// Assume mdyyyy
			dateString = dateString.substr(0,1) + "/" + dateString.substr(1,1) + "/" + dateString.substr(2,4);		
		} else if (dateStringLength == 8){
			dateString = dateString.substr(0,2) + "/" + dateString.substr(2,2) + "/" + dateString.substr(4,4);						
		} else {
			// mmdyyyy or mddyyyy or non 4-digit year
			return;
		}
	}
	var dateElementArray = dateString.split("/");
	if (dateElementArray.length == 3) {
		var month = dateElementArray[0];
		var day = dateElementArray[1];
		var year = dateElementArray[2];
		if (month.length < 3 && parseInt(month, 10) > 0 && day.length < 3 && parseInt(day, 10) > 0 && year.length == 4 && parseInt(year, 10) > 0) {
			if (month.length == 1 && parseInt(month, 10) < 10) {
				month = "0" + month;
			}
			if (day.length == 1 && parseInt(day, 10) < 10) {
				day = "0" + day;
			}
			dateElement.value = month + "/" + day + "/" + year;
		}
	}
}


/**
 * Auto-formatting function for dates
 * - This function assumes entry of 4-digit year
 */
function formatMonthDay(dateElement) {
	var dateString = Trim(dateElement.value);
	dateString = dateString.replace(/[^0-9]/g, '/');
	var dateStringLength = dateString.length;

	// If "/" does not exist in the string, add them
	if (dateString.indexOf("/") < 0) {
		if (dateStringLength == 4) {
			// Assume mdyyyy
			dateString = dateString.substr(0,2) + "/" + dateString.substr(2,2);		
		} else {
			return;
		}
	}

	var dateElementArray = dateString.split("/");
	if (dateElementArray.length == 2) {
		var month = dateElementArray[0];
		var day = dateElementArray[1];
		if (month.length < 3 && parseInt(month, 10) > 0 && day.length < 3 && parseInt(day, 10) > 0) {
			if (month.length == 1 && parseInt(month, 10) < 10) {
				month = "0" + month;
			}
			if (day.length == 1 && parseInt(day, 10) < 10) {
				day = "0" + day;
			}
			dateElement.value = month + "/" + day;
		}
	}
}

/**
 * Creates a method which returns an XMLHttpRequest object for AJAX calls.
 */
function getXmlHttp() {
	var xmlHttp = null;
	if (typeof(XMLHttpRequest) != "undefined") {
	    xmlHttp = new XMLHttpRequest();
	} else {
	    try {
	        xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
	    } catch (e) {
	        try {
	            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	        } catch (E) {
	        }
	    }
	}
	return xmlHttp;
}

/**
	* Load event handler
	*/
function addLoadEvent(onloadFunction) {
	var existingOnload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = onloadFunction;
	} else {
		window.onload = function() {
  		existingOnload();
  		onloadFunction();
		}
	}
}


function qs() {
	var qsParm = new Array();
	var query = window.location.search.substring(1);
	var parms = query.split('&');
	for (var i=0; i<parms.length; i++) {
		var pos = parms[i].indexOf('=');
		if (pos > 0) {
			var key = parms[i].substring(0,pos);
			var val = parms[i].substring(pos+1);
			qsParm[key] = val;
		}
	}
	return qsParm;
}
function show(el,m) {
	if (m) {
		m.style.display='inline';
		m.style.pixelLeft = getPos(el,"Left") + el.offsetWidth;
		m.style.pixelTop = getPos(el,"Top") + el.offsetHeight-20; 
	}
	if (el ==null)
		setTimeout("show(null)", 10000);		
}

function hide(m) {
	m.style.display='none';
}

function getPos(el,sProp) {
	var iPos = 0;
	while (el!=null) {
		iPos+=el["offset" + sProp];
		el = el.offsetParent;
	}
	return iPos;
}