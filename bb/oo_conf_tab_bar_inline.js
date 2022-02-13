/*
OnlineOpinion v5.9.9
Released: 08/02/2016. Compiled 08/02/2016 02:01:40 PM -0500
Branch: master 2a8b05f36a87035a4e8fac9b85c18815b63da4e3
Components: Full
UMD: disabled
The following code is Copyright 1998-2016 Opinionlab, Inc. All rights reserved. Unauthorized use is prohibited. This product and other products of OpinionLab, Inc. are protected by U.S. Patent No. 6606581, 6421724, 6785717 B1 and other patents pending. http://www.opinionlab.com
*/

/* global window, OOo */


(function (w, o) {
    'use strict';

    var OpinionLabInit = function () {

        o.oo_feedback = new o.Ocode({
            customVariables: {
                s_fid: o.readCookie('s_fid')
            }
        });
        
        if(window.innerWidth > 660){
            var mobile = false; 
            /* [+] Tab configuration */
            o.oo_tab = new o.Ocode({
                tab: {
                    position: 'right',
                    title: 'Feedback',
                    tabType: 2,
                    verbiage: 'Feedback',
                    iconPath: 'resources/onlineopinionV5/' //for vertical tab only
                },
                disableMobile: mobile,
                customVariables: {
                    s_fid: o.readCookie('s_fid')
                }
            });
        }

        /* [+] Bar configuration */
        if(o.Browser.isMobile == true && window.innerWidth < 660){
            o.oo_bar = new o.Ocode({
                bar: {
                    caption: 'Share website feedback'
                },
                disableMobile: false,
                customVariables: {
                    s_fid: o.readCookie('s_fid')
                }
            });
        }

        o.oo_launch = function(e, feedback) {
            var evt = e || window.event;
            o[feedback].show(evt);
        };

    };

    o.addEventListener(w, 'load', OpinionLabInit, false);

})(window, OOo);