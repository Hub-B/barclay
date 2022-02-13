/*
 * JavaScript Utilities
 *
 * This .js file contains various utility functions.
 */

$(document).ready(function() {
	// Create default div for modal dialogs
	$("body").append('<div id="core-modal-dialog" style="display:none;"></div>');
	
    //Bind Events for PasswordreqList 
    $(".passwordReqList").focus(function(){
    	onFocusEventHandler($(this));
    }).blur(function(){
    	onBlurEventHandler();
    }).keyup(function(){
    	onKeyUpEventHandler($(this));
    });
    
    //Bind Events for User ID ReqList 
    $(".userIdReqList").focus(function(){
    	onFocusEventHandlerUserId($(this));
    }).blur(function(){
    	onBlurEventHandlerUserId();
    });
});

function pop(loc, width, height, toolbar) {
	var windowWidth = 450;
	var windowHeight = 400;
	if (width != null && width != "") {
		windowWidth = width;
	}
	if (height != null && height != "") {
		windowHeight = height;
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

function openModalUrl(title, url) {
	var dialog = {
		'maxWidth' : 800,
		'minWidth' : 400,
		'title' : title
	};
	openCoreModalUrl(url, dialog);
}

function openModalUrlSmall(title, url) {
	var dialog = {
		'width' : 450,
		'height' : 400,
		'title' : title
	};
	openCoreModalUrl(url, dialog);
}

function openCoreModalUrl(url, dialogOverrides) {
	$.get(url, function(data, textStatus, jqXHR) {
		var modalDialog = $('#core-modal-dialog');
		var dialogDefaults = {
			'maxWidth' : 900,
			'maxHeight' : 600,
			'modal' : true,
			'zIndex' : 300000, /* Needs to be set this high to overlay SmartGWT widgets */
			'autoOpen' : true,
			'resizable' : false, 
			'open' : function(event, ui) {
				$('.ui-dialog-titlebar').removeClass('ui-corner-all');
				// Fix for width:auto in IE7
				if ($.browser.msie && $.browser.version < 8) {
					var modalDialog = $(this);
					var contentWidth = modalDialog.width();
					var maxWidth = modalDialog.dialog('option', 'maxWidth');
					if (contentWidth > maxWidth) {
						modalDialog.width(maxWidth);
						contentWidth = maxWidth;
					}
					modalDialog.parent().find('.ui-dialog-titlebar').each(function () {
						$(this).width(contentWidth);
					});
					modalDialog.dialog('option', 'position', 'center');
				}
			}
		};
		modalDialog.html(data);
		modalDialog.dialog($.extend({}, dialogDefaults, dialogOverrides));
	});
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

function insertTaxIdMask(taxIdNumberFieldId){
	//Use Mask on TaxIdNumber
	$("#"+taxIdNumberFieldId).keyup(function(e) {
	    if(e.keyCode != 8) {
	        if($(this).val().match(/^\d{3}$/)) {
	        	$(this).val($(this).val() + "-");
	        }
	        else if($(this).val().match(/^\d{3}\-\d{2}$/)) {
	        	$(this).val($(this).val() + "-");
	        }
	        else if($(this).val().match(/^\d{3}\-\-$/)) {
	        	$(this).val($(this).val().substr(0,4));
	        }
	        else if($(this).val().match(/^\d{3}\-\d{2}\-\-$/)) {
	        	$(this).val($(this).val().substr(0,7));
	        }
	    }
	});
	$("#"+taxIdNumberFieldId).blur(function() {
	    var value = $(this).val().replace(/\D/g,'');
	    if(value.match(/^\d{9}$/)) {
	        var temp = "";
	        temp = value.substr(0,3);
	        temp += "-";
	        temp += value.substr(3,2);
	        temp += "-";
	        temp += value.substr(5,4);
	        $(this).val(temp);
	    }
	});
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

function insertPhoneNumberMask(phoneNumberFieldId){
	
	$("#"+phoneNumberFieldId).keyup(function(e) {
	    if(e.keyCode != 8) {
	        if($(this).val().match(/^\d{3}$/)) {
	        	$(this).val($(this).val() + "-");
	        }
	        else if($(this).val().match(/^\d{3}\-\d{3}$/)) {
	        	$(this).val($(this).val() + "-");
	        }
	        else if($(this).val().match(/^\d{3}\-\-$/)) {
	        	$(this).val($(this).val().substr(0,4));
	        }
	        else if($(this).val().match(/^\d{3}\-\d{3}\-\-$/)) {
	        	$(this).val($(this).val().substr(0,8));
	        }
	    }
	});
	$("#"+phoneNumberFieldId).blur(function() {
	    var value = $(this).val().replace(/\D/g,'');
	    if(value.match(/^\d{10}$/)) {
	        var temp = "";
	        temp = value.substr(0,3);
	        temp += "-";
	        temp += value.substr(3,3);
	        temp += "-";
	        temp += value.substr(6,4);
	        $(this).val(temp);
	    }
	});
}

function insertPlaceholder(fieldId){
	
	var field=$("#"+fieldId);
	if(field.attr('type')=="tel"){
		field.attr('placeholder','xxx-xxx-xxxx');
	}
	if(fieldId.indexOf("taxId") > -1){
		field.attr('placeholder','xxx-xx-xxxx');
	}
	if(field.attr('type')=="date"){
		field.attr('placeholder','mm/dd/yyyy');
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
		};
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

function findPos(obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
	}
	return [curleft,curtop];
}

function expandCollapse(detailElemID, imgId) {
	var detailElem = (document.getElementById) ? document.getElementById(detailElemID) : ((document.all) ? document.all[detailElemID] : null);
	var imageElem;
	if (imgId) {
		imageElem = (document.getElementById) ? document.getElementById(imgId) : ((document.all) ? document.all[imgId] : null);
	}
	if (detailElem.style.display == "") {
		detailElem.style.display = "none";
		if (imageElem) {
			imageElem.src = "images/arrow-right.png";
		}
	} else {
		detailElem.style.display = "";
		if (imageElem) {
			imageElem.src = "images/arrow-down.png";
		}
	}
}

/**
 * This function will push the footer to the bottom of the viewport if page content isn't
 * long enough to keep it down.
 */
function pushFooterToViewportBottom() {
	var viewportHeight = $(window).height();
	//var footerBottom = $("footer").get(0).getBoundingClientRect().bottom;
	var footerBottom = $("footer").offset().top + $("footer").height();
	var difference = viewportHeight - footerBottom;

	//Only make changes if footer is not beyond viewport bottom already.
	if(difference > 0) {
		var divContent =  $("div.content");				
		divContent.css("min-height", divContent.outerHeight() + difference);				
	}
}

function loadGoogleAPIScript(){
	
	var script = document.createElement('script');
		script.type='text/javascript';
		script.src="https://maps.googleapis.com/maps/api/js?libraries=places&" + "callback=places_initialize";
		document.body.appendChild(script);
		
}

function places_initialize() {
	
	var autocomplete;
	var componentForm = {
			 street_number: 'short_name',
			  route: 'long_name',
			  locality: 'long_name',
			  administrative_area_level_1: 'short_name',
			  country: 'short_name',
			  postal_code: 'short_name'
	};
	
	//Looking for text boxes which have set the addressAutoComplete feature ON
	var addressLineObjects = $(".addressAutoComplete");
	
	/* Following logic is to activate autocomplete on more than one address fields:
	 * a)Primary Address(Main) , 
	 * b) Secondary Address(Mailing)
	 * */
	
	if($(addressLineObjects[0]).length >0){
  /* Create the autocomplete object, restricting the search
   to geographical location types.*/
		var addressFieldId_primary = $(addressLineObjects[0]).attr("id");
		autocomplete_primary   = new google.maps.places.Autocomplete(
      /** @type {HTMLInputElement} */(document.getElementById(addressFieldId_primary)),
      { types: ['geocode'] });
  /* When the user selects an address from the dropdown,
   	 populate the address fields in the form.*/
	google.maps.event.addListener(autocomplete_primary, 'place_changed', function() {
    fillInAddress(autocomplete_primary,componentForm,addressFieldId_primary);
  });
	}
	
	if($(addressLineObjects[1]).length > 0){
  // Create the autocomplete object, restricting the search
  // to geographical location types.
		var addressFieldId_secondary = $(addressLineObjects[1]).attr("id");
		autocomplete_secondary   = new google.maps.places.Autocomplete(
      /** @type {HTMLInputElement} */(document.getElementById(addressFieldId_secondary)),
      { types: ['geocode'] });
  // When the user selects an address from the dropdown,
  // populate the address fields in the form.
  google.maps.event.addListener(autocomplete_secondary, 'place_changed', function() {
    fillInAddress(autocomplete_secondary,componentForm,addressFieldId_secondary);
  });
	}
	
	if($(addressLineObjects[2]).length > 0){
	  // Create the autocomplete object, restricting the search
	  // to geographical location types.
		var addressFieldId_tertiary = $(addressLineObjects[2]).attr("id");
		autocomplete_tertiary   = new google.maps.places.Autocomplete(
		  /** @type {HTMLInputElement} */(document.getElementById(addressFieldId_tertiary)),
		     { types: ['geocode'] });
		// When the user selects an address from the dropdown,
	 // populate the address fields in the form.
	 google.maps.event.addListener(autocomplete_tertiary, 'place_changed', function() {
	 fillInAddress(autocomplete_tertiary,componentForm,addressFieldId_tertiary);
   });
}
	
}

function fillInAddress(autocomplete,componentForm,addressFieldId) {
	  // Get the place details from the autocomplete object.
	  var place = autocomplete.getPlace();

	  // Get each component of the address from the place details
	  // and fill the corresponding field on the form.
	  for (var i = 0; i < place.address_components.length; i++) {
	    var addressType = place.address_components[i].types[0];
	    if (componentForm[addressType]) {
	      var val = place.address_components[i][componentForm[addressType]];
	      populateAddressField(addressType,val,addressFieldId);
	   
	    }
	  }
	}

/*
 *  Step 1:Create an Array with ID's of address field elements
 *  ex: var pageName_AddressTypeArray=['addressLine1_id','addressLine2_id','city_id','state_id','country_id','zipCode_id'];
 *  Step 2: Add the above created Array to the Map object with 'addressLine1_id' as its Key.
 *  ex: Map['addressLine1_id']=pageName_AddressTypeArray;
 *  Step 3: You should be all set :) 
 *  */
function   populateAddressField(addressType,value,addressFieldId){
	
	var Map={};
	var personalInfo_MainAddressArray=['mainAddress.addressLine1', 'mainAddress.addressLine2', 'mainAddress.city', 'mainAddress.state', 'mainAddress.country', 'mainAddress.zipCode'];
	var personalInfo_MailingAddressArray=['mailingAddress.addressLine1','mailingAddress.addressLine2','mailingAddress.city','mailingAddress.state','mailingAddress.country','mailingAddress.zipCode'];
	var personalInfo_PreviousAddressArray=['previousAddress.addressLine1','previousAddress.addressLine2','previousAddress.city','previousAddress.state','previousAddress.country','previousAddress.zipCode'];
	var addEditBeneficiaries_HomeAddressArray=['ACCTBENDTL_BENAD1','ACCTBENDTL_BENAD2','ACCTBENDTL_BENCITY','ACCTBENDTL_BENSTATE','ACCTBENDTL_BENCOUNTRY','ACCTBENDTL_BENZIP'];
	
	Map['mainAddress.addressLine1']=personalInfo_MainAddressArray;
	Map['mailingAddress.addressLine1']=personalInfo_MailingAddressArray;
	Map['previousAddress.addressLine1']=personalInfo_PreviousAddressArray;
	Map['ACCTBENDTL_BENAD1']=addEditBeneficiaries_HomeAddressArray;
	
		
	var addressFieldArray = Map[addressFieldId];
		
	switch(addressType){
	case  'street_number':
			 document.getElementById(addressFieldArray[0]).value = value;
			 break;
	case 'route': 
		     if( document.getElementById(addressFieldArray[0]).value.length < 10){
			 document.getElementById(addressFieldArray[0]).value = document.getElementById(addressFieldArray[0]).value + ' ' + value;
		     }else{
		    	 document.getElementById(addressFieldArray[0]).value = value;
		     }
			 document.getElementById(addressFieldArray[1]).value='';
			break;
	case 'locality':
			document.getElementById(addressFieldArray[2]).value = value;
			break;
	case 'administrative_area_level_1':
			document.getElementById(addressFieldArray[3]).value = value;
		break;
//	case  'country':
	//		document.getElementById(addressFieldArray[4]).value = value;
		//break;
	case  'postal_code':
			document.getElementById(addressFieldArray[5]).value = value;
		break;
	}
}

// Saving the page from Submitting when Enter is hit 
function preventEnterFromSubmit(){
			
	 $(window).keydown(function(event){
		    if(event.keyCode == 13) {
		      event.preventDefault();
		      return false;
		    }
		  });
}

/* --------------------------------------------------------------------------- */
/* Fancy Account Drop Down                                                     */
/*   See fadd.jsp for the accompanying HTML                                    */
/* ----------------------------------------------------------------------------*/
var FADD = {
	pres: "",    //Presentation - desktop or mobile/tablet
	PRES_DESK: "desktop",
	PRES_MOB: "mobile",
	open: false, //Is the mobile FADD open?
	baseURL: "", //The URL to navigate to on click of a FADD account.
	token: "",   //The CSRF token
	
	//Prepare the FADD by moving the selected account to the top and adding the resize handler.
	initialize: function(selectedAcct, baseURL, token) {
		FADD.baseURL = baseURL;
		FADD.token = token;
		
		var fadd = $("#fadd");
		fadd.prepend($("#fadd-cf-" + selectedAcct));
		fadd.prepend($("#fadd-" + selectedAcct));
		
		FADD.handleResize();
		$(window).resize(FADD.handleResize);
	},
	
	//On resize, determine if presentation must change, and if so, handle that
	handleResize: function() {
		//Hide
		var fadd = $("#fadd");
		fadd.hide();
		
		//Desktop
		if(window.matchMedia("(min-width: 60em)").matches && FADD.pres != FADD.PRES_DESK) {
			
			//Reset State
			$("#fadd .account").show();
			$("#fadd .account:first-child").removeClass("open");
			FADD.open = false;
			
			//Listen to desktop events
			FADD.unregisterEvents();
			FADD.registerCommonEvents();
			
			FADD.pres = FADD.PRES_DESK;
		} 
		//Mobile/Tablet
		else if(!window.matchMedia("(min-width: 60em)").matches && FADD.pres != FADD.PRES_MOB) {
			
			//Hide all accounts but the first
			$("#fadd .account").not("#fadd .account:first-child").hide();
			
			//Listen to mobile events
			FADD.unregisterEvents();
			FADD.registerCommonEvents();
			FADD.registerMobileEvents();
			
			FADD.pres = FADD.PRES_MOB;
		}
		
		//Show
		fadd.show();
	},
	
	//Register events used by both desktop and tablet/mobile presentation
	registerCommonEvents: function() {
		$("#fadd .account").not("#fadd .account:first-child").on({
			click: function() {
				var hash = $(this).data("hash");
				var location = FADD.baseURL + hash + "&" + FADD.token;
				document.location.href=location;
			}
		});
	},
	
	//Register events used only by tablet/mobile presentation
	registerMobileEvents: function() {
		$("#fadd .account:first-child").on({
			click: function() {
				if(FADD.open) {
					$("#fadd .account").not("#fadd .account:first-child").hide();
					$("#fadd .account:first-child").removeClass("open");
					FADD.open = false;
				} else {
					$("#fadd .account").not("#fadd .account:first-child").show();
					$("#fadd .account:first-child").addClass("open");
					FADD.open = true;
				}
			}
		});
	},
	
	//Unregister all event handlers
	unregisterEvents: function() {
		$("#fadd .account").off();
		$("#fadd .account:first-child").off();
	}
};

/*
JQuery function extension to turn an unordered list into a dyamically sized 
in-page navigational menu system with a more option to present a drop-down 
when not all options fit horizontally within the container.
*/
$.fn.inPageNav = function(autoHideList) {

	var mainUL = $(this);
	var moreUL = null;
	
	//Setup the main UL
	mainUL.addClass("ipn");
	mainUL.children('li').click( function() {
	    window.location = $(this).find('a').attr('href');
	});
	
	//Setup the more UL
	moreUL = $('<ul class="ipn-more"></ul>');
	$("body").append(moreUL);
	
	//Enclose main UL in wrapper
	var wrapper = $('<div class="ipn-wrapper"></div>');
	mainUL.after(wrapper);
	wrapper.append(mainUL);
					
	//For keeping track of wrapper width
	var lastWrapperWidth = null;
	
	//Setup auto-hide list
	if(autoHideList != null && autoHideList.length > 0) {
		for(var i=0; i < autoHideList.length; i++){
			mainUL.children('li[data-rel=' + autoHideList[i] + "]").addClass("auto-hide");
		}
	}
	
	//Do not auto-hide selected item + move to front
	mainUL.children("li.selected").removeClass("auto-hide");
	mainUL.prepend(mainUL.children("li.selected"));
	
	//Add more item & initiate first resize
	var moreItem = attachMoreItem(moreUL, mainUL);
	lastWrapperWidth = resizeHandler(mainUL, moreUL, wrapper, moreItem, null);
	
	//Attach resize handler
	$(window).resize(function() {
		lastWrapperWidth = resizeHandler(mainUL, moreUL, wrapper, moreItem, lastWrapperWidth);
	});
	
	//Attach click handler to close more
	$(document).click(function(e) {
		if(!$(e.target).is(moreItem)) {
			hideMore(moreUL, moreItem);
		}
	});
};

/*
Generates the more item to be displayed when there are hidden items in the main UL.
Attaches a click handler to the more item to show/hide the moreUL, and adds the more
item to the main UL.
*/
function attachMoreItem(moreUL, mainUL) {
	var moreItem = $("<li>I want to...&nbsp;&#x25BE</li>");
	
	//Attach click handler
	moreItem.click(function() {
		
		//If visible, hide
		if(moreUL.is(":visible")) {
			hideMore(moreUL, moreItem);
		}
		//If invisible, show
		else {
			showMore(moreUL, moreItem);
		}
	});
	
	mainUL.append(moreItem);
	return moreItem;
}

/*
 * Shows the more menu.
 */
function showMore(moreUL, moreItem) {

	//JQuery outerWidth is inaccurate in this version with partial pixels
	//Use native boundingClientRect for now.  JQuery Bug ID 9628
	var moreItemTop = moreItem.offset().top;
	var moreItemRight = moreItem[0].getBoundingClientRect().right;
	
	//Move more menu into position
	moreUL.css('top', moreItemTop + moreItem.height() + 2); //2px Border
	moreUL.css('right', $(window).width() - moreItemRight);
							
	//Show
	moreUL.css('position', 'absolute');
	moreUL.css('display', 'block');
	
	moreItem.css('border-bottom-width', 0);
	moreItem.css('border-bottom-right-radius', 0);
}

/*
 * Hides the more menu.
 */
function hideMore(moreUL, moreItem) {
	moreUL.css('display', 'none');
	moreItem.css('border-bottom-width', '1px');
	moreItem.css('border-bottom-right-radius', '3px');
}

/*
If more list items will fit in the selectorUL, they will be 
moved from the tempUL to the selectorUL. Returns the number of
elements that were moved.
*/
function addItems(selectorUL, moreUL, moreItem, width) {
	var count = 0;

	//Loop until tempUL has no more children, or selectorUL overflows
	while(moreUL.children(":not(.auto-hide)").length >= 1) {
	
		//Add to selectorUL from tempUL
		moreItem.before(moreUL.children(":not(.auto-hide)").first());
		
		//If selectorUL overflows, move back and leave loop
		if(selectorUL.children().last()[0].getBoundingClientRect().right > width) {
			moreUL.prepend(selectorUL.children().last().prev());
			break;
		} 
		//Otherwise, increment the number of elements moved
		else {
			count++;
		}
	}
	
	//If moreUL is empty, hide more option
	if(moreUL.children().length <= 0) {
		moreItem.detach();
	}
	
	return count;
}

/*
If the selectorUL has overflowed, list items will be removed and
appended to the tempUL until all items in selectorUL can fit.  Returns
the number of elements that were moved.
*/
function removeItems(selectorUL, moreUL, moreItem, width) {
	var count = 0;
	
	//Add more item
	selectorUL.append(moreItem);
	
	//Drop all auto-hides
	while(selectorUL.children(".auto-hide").length >= 1) {
		moreUL.prepend(selectorUL.children(".auto-hide").last());
	}
	
	//Loop until selectorUL has no more children, or selectorUL can fit items
	while(selectorUL.children().length >= 1) {
		
		//If last element in selectorUL does not fit, move to tempUL and increment count
		if(selectorUL.children().last()[0].getBoundingClientRect().right > width &&
				selectorUL.children().last().prev().length > 0) {
			moreUL.prepend(selectorUL.children().last().prev());
			count++;
		} 
		//Otherwise, leave loop
		else {
			break;
		}
	}
	
	//If no items in moreUL, remove more item
	if(moreUL.children().length <= 0) {
		moreItem.detach();
	}
	
	//If active item has dropped into more, move to front
	if(moreUL.children(".selected").length > 0 && selectorUL.children().length > 1) {
		selectorUL.prepend(moreUL.children(".selected"));
		
		//Recursive re-layout
		removeItems(selectorUL, moreUL, moreItem, width);
	}
	
	return count;
}

/*
Called each time the window resize event happens.  Determines whether the wrapper
has expanded or contracted, and calls the add/remove methods accordingly.  The UL
is hidden during resize evaluation and redisplayed on completion.  Returns the last
reported width of the wrapper so that the caller can track it.
*/
function resizeHandler(mainUL, moreUL, wrapper, moreItem, lastWrapperWidth) {
	//Hide the main UL and more UL until completed
	mainUL.css('visibility', 'hidden'); //Don't hide or can't calculate widths.
	hideMore(moreUL, moreItem);
	
	//Get new wrapper width
	var newWrapperWidth = wrapper.width();
	
	//Get right hand edge of wrapper
	var wrapperRight = wrapper[0].getBoundingClientRect().right;
	
	//If first call
	if(lastWrapperWidth == null) {
		removeItems(mainUL, moreUL, moreItem, wrapperRight);
	}
	//If expanded, attempt to add elements
	else if(newWrapperWidth > lastWrapperWidth) {
		addItems(mainUL, moreUL, moreItem, wrapperRight);
	}
	//If contracted, test if element removal is necessary
	else if(newWrapperWidth < lastWrapperWidth) {
		removeItems(mainUL, moreUL, moreItem, wrapperRight);
	}
	
	//Show the UL again
	mainUL.css('visibility', 'visible');
	
	return newWrapperWidth;
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

/**
* Automatically tab to next field.
*/	
function autoTab(input,len, e) {
	var keyCode = e.keyCode; 
	var filter = [0,8,9,16,17,18,35,36,37,38,39,40,46];
	if(input.value.length >= len && !containsElement(filter,keyCode)) {
		input.value = input.value.slice(0, len);
		input.form[(getIndex(input)+1) % input.form.length].focus();
	}

	function containsElement(arr, ele) {
		var found = false, index = 0;
		while(!found && index < arr.length)
		if(arr[index] == ele)
			found = true;
		else
			index++;
		return found;
	}
	
	function getIndex(input) {
		var index = -1, i = 0, found = false;
		while (i < input.form.length && index == -1)
		if (input.form[i] == input)index = i;
		else i++;
		return index;
	}
	return true;
}	

function zeroPad(element, count) {
	var numZeropad = element.value + '';
	while(numZeropad.length < count) {
	numZeropad = "0" + numZeropad;
	}
	element.value = numZeropad;
}

function decimalPlaces(num) {
	  var match = (''+num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
	  if (!match) { return 0; }
	  return Math.max(
	       0,
	       // Number of digits right of decimal point.
	       (match[1] ? match[1].length : 0)
	       // Adjust for scientific notation.
	       - (match[2] ? +match[2] : 0));
	}

// PasswordReq Check 

function onKeyUpEventHandler(inputControl){
	var passwdValue="";
	if(inputControl != null){
	 passwdValue= inputControl.val();}
	var isPasswordValid = "true";
	//Check for lowercase char
	if(passwdValue.match(/[a-z]/)){
		$("#lowercaseCheck").addClass("checkMark");
		$("#lowercaseText").addClass("bold");
	}else{
		$("#lowercaseCheck").removeClass("checkMark");
		$("#lowercaseText").removeClass("bold");
		isPasswordValid = "false";
	}
	//Check for UpperCase char
	if(passwdValue.match(/[A-Z]/)){
		$("#uppercaseCheck").addClass("checkMark");
		$("#uppercaseText").addClass("bold");
	}else{
		$("#uppercaseCheck").removeClass("checkMark");
		$("#uppercaseText").removeClass("bold");
		isPasswordValid = "false";
	}

	//Check for atleast one digit
	if(passwdValue.match(/\d/)){
		$("#oneNumberCheck").addClass("checkMark");
		$("#oneNumberText").addClass("bold");
	}else{
		$("#oneNumberCheck").removeClass("checkMark");
		$("#oneNumberText").removeClass("bold");
		isPasswordValid = "false";
	}
	//Check for char length between 8-20
	if(passwdValue.match(/.{8,20}/)){
		$("#eightCharsCheck").addClass("checkMark");
		$("#eightCharsText").addClass("bold");
	}else{
		$("#eightCharsCheck").removeClass("checkMark");
		$("#eightCharsText").removeClass("bold");
		isPasswordValid = "false";
	}
	$("#isPasswordValid").val(isPasswordValid);
}
function onFocusEventHandler(inputControl){
	
	var top = getPos(document.getElementById(inputControl.attr('id')),"Top");
	var left=getPos(document.getElementById(inputControl.attr('id')),"Left");
	$("#passwordReqCheckList").css("top",top);
	$("#passwordReqCheckList").css("left",left);
	$("#passwordReqCheckList").show();
	onKeyUpEventHandler(null);
}
function onBlurEventHandler(){
	$("#passwordReqCheckList").hide();
}

//UserId ReqList Handlers

function onFocusEventHandlerUserId(inputControl){
	
	var top = getPos(document.getElementById(inputControl.attr('id')),"Top");
	var left=getPos(document.getElementById(inputControl.attr('id')),"Left");
	$("#userIdReqCheckList").css("top",top);
	$("#userIdReqCheckList").css("left",left);
	$("#userIdReqCheckList").show();
}
function onBlurEventHandlerUserId(){
	$("#userIdReqCheckList").hide();
}

function getPos(el,sProp) {
	var iPos = 0;
	while (el!=null) {
		iPos+=el["offset" + sProp];
		el = el.offsetParent;
	}
	return iPos;
}