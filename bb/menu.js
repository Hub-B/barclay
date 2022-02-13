
	var menuTimer;
	var currentMenu = "";
	var summaryPageMenuOption=["accountlist.do"];
	var transferMenuOptions= ["pendingtransfers.do","postedtransfers.do","transferfunds.do"];
	var externalAccountMenuOptions=["externalaccounts.do","pendingexternalaccounts.do","externalaccountadd.do"];
	var remoteDepositMenuOptions=["remotedeposit.do"];
	var statementsMenuOptions=["statements.do"];
	var documentsMenuOptions=["taxdocuments.do","notices.do"];
	
var menuOptionsMap = new Map();
menuOptionsMap.set("summaryPageMenuOption",summaryPageMenuOption);
menuOptionsMap.set("transferMenuOptions",transferMenuOptions);
menuOptionsMap.set("remoteDepositMenuOptions",remoteDepositMenuOptions);
menuOptionsMap.set("externalAccountMenuOptions",externalAccountMenuOptions);
menuOptionsMap.set("statementsMenuOptions",statementsMenuOptions);
menuOptionsMap.set("documentsMenuOptions",documentsMenuOptions);

	$(document).ready(function() {
		
		var experience = getExperience();
	
		if(experience != 3){//Only for Tablet and Mobile form factors
			 
		//	setActiveMobileMenu();
			
		}
	
		setActiveMenu();
		
		//Mobile menu with expandable section
		$("li.hasExpandableSection").click(function(event){
			$("ul",this).toggle("slow");
			$(this).children('a').toggleClass("has-rightArrow-BCLY").toggleClass("has-downArrow-BCLY");
			$(this).toggleClass("noBottomBorder");
			
		});
		
		$(".has-dropdown>a").click(function(event) {
			event.stopPropagation();
			var menuId = $(this).attr("name");
			var position = $(this).parent().position();
			showMenu(menuId, position);
		}).mouseout(function() {
			menuTimer = setTimeout("hideMenu()", 250);
		});
		
	//Sub-Menu click event
		$(".dropdown").click(function(event) {
			event.stopPropagation();
		}).mouseover(function() {
			clearTimeout(menuTimer);
		}).mouseout(function() {
			menuTimer = setTimeout("hideMenu()", 250);
		});
	  
	});
	
	
	

	function showMenu(menuId, position) {
		clearTimeout(menuTimer);
		hideMenu();
		var menu = document.getElementById(menuId);
		if (menu) {
			menu.style.top = 45 + "px";
			menu.style.left =-11 + "px";
			menu.style.display = "block";
			currentMenu = menuId;
		}
	}
	
	function hideMenu() {
		if (currentMenu != "") {
			var menu = document.getElementById(currentMenu);
			if (menu) {
				menu.style.display = "none";
				currentMenu = "";
			}
		}
	}
	
	function extractPageName(hrefString) {
		var arr = hrefString.split('/');
		var lastPart = arr[arr.length-1].toLowerCase();
		if (lastPart.indexOf("?") != -1) {
			lastPart = lastPart.substring(0, lastPart.indexOf("?"));
		} else if (lastPart.indexOf("#") != -1) {
			lastPart = lastPart.substring(0, lastPart.indexOf("#"));
		}
		return lastPart;
	}
	
	function fetchCurrentMenuOptionsArray(currentPageName){
		 var currentMenuOptionArray ="";
		menuOptionsMap.forEach(function(value, key) {
			  if($.inArray(currentPageName,value) != -1){
				  currentMenuOptionArray = value;
				  
			  }
			}, menuOptionsMap);
		return currentMenuOptionArray;
	}

	function setActiveMenuListItem(arr, crtPage) {
		for (var i = 0; i < arr.length; ++i) {
			if (extractPageName(arr[i].href) == crtPage) {
				arr[i].className="active";
				return true;
			}
		}
		return false;
	}

	function setActiveMobileMenuListItem(arr, crtPage) {
		for (var i = 0; i < arr.length; ++i) {
			if (extractPageName(arr[i].href) == crtPage) {
				arr[i].className="activeMenu";
				return true;
			}
		}
		return false;
	}
	function setActiveMenu() {
		var hrefString = document.location.href ? document.location.href : document.location;
		var currPage = extractPageName(hrefString);
		var menuItems = $("#navigation ul.main-menu li>a");
		
		
		for (var i = 0; i < menuItems.length; ++i) {
			if (menuItems[i].getAttribute("name")) {
				var relValue = menuItems[i].getAttribute("name");
				if($('#' + relValue + ' a').length > 0){
				var isActive = setActiveMenuListItem($('#' + relValue + ' a'), currPage);
				}
				else{
					$("#menuTop .has-dropdown:first").addClass("active");
				
				}
				
				if (isActive) {
					$(menuItems[i].parentNode).addClass("active");
					$("li.home").removeClass("active");
					break;
				}
			
			} else {
				currentPageIsPartOfThisMenuOptionsArray=fetchCurrentMenuOptionsArray(currPage);
				if ( $.inArray(extractPageName(menuItems[i].href),currentPageIsPartOfThisMenuOptionsArray) != -1) {
					$(menuItems[i].parentNode).addClass("active");
					break;
				}
			}
		}
	}
	
	function setActiveMobileMenu(){
		
		var hrefString = document.location.href ? document.location.href : document.location;
		var currPage = extractPageName(hrefString);
		var menuItems = $(".has-dropdown a.mobileItem");
		
		//Loop through all menu items
		for (var i = 0; i < menuItems.length; ++i) {
			if (menuItems.eq(i).data("rel")) {
				var relValue = menuItems.eq(i).data("rel");
				if($('#' + relValue + ' a').length > 0){
				var isActive = setActiveMobileMenuListItem($('#' + relValue + ' a'), currPage);
				}
				
				if (isActive) {
					$(menuItems[i].parentNode).addClass("currentlyOpen open");
					$(".currentlyOpen ul.dropdown").css("display","block");
					$(".currentlyOpen a.mobileItem").trigger("click");
					break;
				}
			
			} else {
				if (extractPageName(menuItems[i].href) == currPage) {
					//Because there is no child menu option and Menu destination is by itself, add CurrentlyOpen style to it.
					if(currPage== "remotedeposit.do"){
						$(menuItems[i].parentNode).addClass("currentlyOpen");
					}else{
					$(menuItems[i].parentNode).addClass("activeMenu");}
					break;
				}
			}
		}
	}