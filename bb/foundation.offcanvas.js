;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.offcanvas = {
    name : 'offcanvas',

    version : '5.0.0',

    settings : {},

    init : function (scope, method, options) {
      this.events();
    },

    events : function () {
      $(this.scope).off('.offcanvas')
        .on('click.fndtn.offcanvas', '.left-off-canvas-toggle', function (e) {
          e.preventDefault();
          $(this).closest('.off-canvas-wrap').toggleClass('move-right');
          if(!($(".currentlyOpen ul.dropdown").is(":visible"))){
        	  
        	  $(".currentlyOpen ul.dropdown").css("display","block");
        	/* Note: Modify script for ADA accessibility should a version update be require review the script. Visible .offcanvas */  
        	if ($(".off-canvas-wrap").hasClass("move-right")){
        		setHiddenCanvasMenuVisible();
        	}else{
        		setHiddenCanvasMenuHidden();
        	}
        	  
          }
        })
        .on('click.fndtn.offcanvas', '.exit-off-canvas', function (e) {
          e.preventDefault();
          $(".off-canvas-wrap").removeClass("move-right");
          /* Note: Modify script for ADA accessibility should a version update be require review the script. Hide .offcanvas  */
          setHiddenCanvasMenuHidden();
        })
        .on('click.fndtn.offcanvas', '.right-off-canvas-toggle', function (e) {
          e.preventDefault();
          $(this).closest(".off-canvas-wrap").toggleClass("move-left");
        })
        .on('click.fndtn.offcanvas', '.exit-off-canvas', function (e) {
          e.preventDefault();
          $(".off-canvas-wrap").removeClass("move-left");
        });
    },

    reflow : function () {}
  };
}(jQuery, this, this.document));
