$(document).ready(function() {
	
	$("button.has-dropdown").click(function(event) {
		event.stopPropagation();
		var menuId = $(this).attr("name");
		var position = $(this).position();
		var height = $(this).outerHeight();
		var width = $(this).outerWidth();
		showMenu(menuId, position,height,width);
	}).focusout(function(){
		menuTimer = setTimeout("hideMenu()", 250);
	});
	
//Sub-Menu click event
	$(".dropdown").click(function(event) {
		event.stopPropagation();
	}).mouseover(function() {
		clearTimeout(menuTimer);
	}).mouseleave(function() {
		menuTimer = setTimeout("hideMenu()", 250);
	}).focusout(function(){
		menuTimer = setTimeout("hideMenu()", 250);
	});
	
	function showMenu(menuId, position,height,width) {
		clearTimeout(menuTimer);
		hideMenu();
		var menu = document.getElementById(menuId);
		if (menu) {
			menu.style.top = (position.top + height-3) + "px";
			menu.style.left =position.left + 14 + "px";
			menu.style.width=width;
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
});