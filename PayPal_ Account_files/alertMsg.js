(function(dust){dust.register("widgets\/alertMsg",body_0);function body_0(chk,ctx){return chk.w("<span class=\"icon icon-small icon-critical-small\" aria-hidden=\"true\"></span><span class=\"msg\" role=\"alert\">").f(ctx.get(["message"], false),ctx,"h",["s"]).w("</span>");}body_0.__dustBody=!0;return body_0;})(dust);