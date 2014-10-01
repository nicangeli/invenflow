(function() {
window.Bobcat = window.$B = window.Bobcat || {}, "function" == typeof $B.timerCheck && $B.timerCheck("application or application-editor.js run"), 
window.console || (window.console = {
log:function() {},
error:function() {},
warn:function() {}
});
}).call(this), function(e, t) {
e.rails !== t && e.error("jquery-ujs has already been loaded!");
var o;
e.rails = o = {
linkClickSelector:"a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]",
buttonClickSelector:"button[data-remote]",
inputChangeSelector:"select[data-remote], input[data-remote], textarea[data-remote]",
formSubmitSelector:"form",
formInputClickSelector:"form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])",
disableSelector:"input[data-disable-with], button[data-disable-with], textarea[data-disable-with]",
enableSelector:"input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled",
requiredInputSelector:"input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",
fileInputSelector:"input[type=file]",
linkDisableSelector:"a[data-disable-with]",
CSRFProtection:function(t) {
var o = e('meta[name="csrf-token"]').attr("content");
o && t.setRequestHeader("X-CSRF-Token", o);
},
fire:function(t, o, n) {
var r = e.Event(o);
return t.trigger(r, n), r.result !== !1;
},
confirm:function(e) {
return confirm(e);
},
ajax:function(t) {
return e.ajax(t);
},
href:function(e) {
return e.attr("href");
},
handleRemote:function(n) {
var r, i, a, s, l, u, d, c;
if (o.fire(n, "ajax:before")) {
if (s = n.data("cross-domain"), l = s === t ? null :s, u = n.data("with-credentials") || null, 
d = n.data("type") || e.ajaxSettings && e.ajaxSettings.dataType, n.is("form")) {
r = n.attr("method"), i = n.attr("action"), a = n.serializeArray();
var p = n.data("ujs:submit-button");
p && (a.push(p), n.data("ujs:submit-button", null));
} else n.is(o.inputChangeSelector) ? (r = n.data("method"), i = n.data("url"), a = n.serialize(), 
n.data("params") && (a = a + "&" + n.data("params"))) :n.is(o.buttonClickSelector) ? (r = n.data("method") || "get", 
i = n.data("url"), a = n.serialize(), n.data("params") && (a = a + "&" + n.data("params"))) :(r = n.data("method"), 
i = o.href(n), a = n.data("params") || null);
c = {
type:r || "GET",
data:a,
dataType:d,
beforeSend:function(e, r) {
return r.dataType === t && e.setRequestHeader("accept", "*/*;q=0.5, " + r.accepts.script), 
o.fire(n, "ajax:beforeSend", [ e, r ]);
},
success:function(e, t, o) {
n.trigger("ajax:success", [ e, t, o ]);
},
complete:function(e, t) {
n.trigger("ajax:complete", [ e, t ]);
},
error:function(e, t, o) {
n.trigger("ajax:error", [ e, t, o ]);
},
crossDomain:l
}, u && (c.xhrFields = {
withCredentials:u
}), i && (c.url = i);
var h = o.ajax(c);
return n.trigger("ajax:send", h), h;
}
return !1;
},
handleMethod:function(n) {
var r = o.href(n), i = n.data("method"), a = n.attr("target"), s = e("meta[name=csrf-token]").attr("content"), l = e("meta[name=csrf-param]").attr("content"), u = e('<form method="post" action="' + r + '"></form>'), d = '<input name="_method" value="' + i + '" type="hidden" />';
l !== t && s !== t && (d += '<input name="' + l + '" value="' + s + '" type="hidden" />'), 
a && u.attr("target", a), u.hide().append(d).appendTo("body"), u.submit();
},
disableFormElements:function(t) {
t.find(o.disableSelector).each(function() {
var t = e(this), o = t.is("button") ? "html" :"val";
t.data("ujs:enable-with", t[o]()), t[o](t.data("disable-with")), t.prop("disabled", !0);
});
},
enableFormElements:function(t) {
t.find(o.enableSelector).each(function() {
var t = e(this), o = t.is("button") ? "html" :"val";
t.data("ujs:enable-with") && t[o](t.data("ujs:enable-with")), t.prop("disabled", !1);
});
},
allowAction:function(e) {
var t, n = e.data("confirm"), r = !1;
return n ? (o.fire(e, "confirm") && (r = o.confirm(n), t = o.fire(e, "confirm:complete", [ r ])), 
r && t) :!0;
},
blankInputs:function(t, o, n) {
var r, i, a = e(), s = o || "input,textarea", l = t.find(s);
return l.each(function() {
if (r = e(this), i = r.is("input[type=checkbox],input[type=radio]") ? r.is(":checked") :r.val(), 
!i == !n) {
if (r.is("input[type=radio]") && l.filter('input[type=radio]:checked[name="' + r.attr("name") + '"]').length) return !0;
a = a.add(r);
}
}), a.length ? a :!1;
},
nonBlankInputs:function(e, t) {
return o.blankInputs(e, t, !0);
},
stopEverything:function(t) {
return e(t.target).trigger("ujs:everythingStopped"), t.stopImmediatePropagation(), 
!1;
},
disableElement:function(e) {
e.data("ujs:enable-with", e.html()), e.html(e.data("disable-with")), e.bind("click.railsDisable", function(e) {
return o.stopEverything(e);
});
},
enableElement:function(e) {
e.data("ujs:enable-with") !== t && (e.html(e.data("ujs:enable-with")), e.removeData("ujs:enable-with")), 
e.unbind("click.railsDisable");
}
}, o.fire(e(document), "rails:attachBindings") && (e.ajaxPrefilter(function(e, t, n) {
e.crossDomain || o.CSRFProtection(n);
}), e(document).delegate(o.linkDisableSelector, "ajax:complete", function() {
o.enableElement(e(this));
}), e(document).delegate(o.linkClickSelector, "click.rails", function(n) {
var r = e(this), i = r.data("method"), a = r.data("params");
if (!o.allowAction(r)) return o.stopEverything(n);
if (r.is(o.linkDisableSelector) && o.disableElement(r), r.data("remote") !== t) {
if (!(!n.metaKey && !n.ctrlKey || i && "GET" !== i || a)) return !0;
var s = o.handleRemote(r);
return s === !1 ? o.enableElement(r) :s.error(function() {
o.enableElement(r);
}), !1;
}
return r.data("method") ? (o.handleMethod(r), !1) :void 0;
}), e(document).delegate(o.buttonClickSelector, "click.rails", function(t) {
var n = e(this);
return o.allowAction(n) ? (o.handleRemote(n), !1) :o.stopEverything(t);
}), e(document).delegate(o.inputChangeSelector, "change.rails", function(t) {
var n = e(this);
return o.allowAction(n) ? (o.handleRemote(n), !1) :o.stopEverything(t);
}), e(document).delegate(o.formSubmitSelector, "submit.rails", function(n) {
var r = e(this), i = r.data("remote") !== t, a = o.blankInputs(r, o.requiredInputSelector), s = o.nonBlankInputs(r, o.fileInputSelector);
if (!o.allowAction(r)) return o.stopEverything(n);
if (a && r.attr("novalidate") == t && o.fire(r, "ajax:aborted:required", [ a ])) return o.stopEverything(n);
if (i) {
if (s) {
setTimeout(function() {
o.disableFormElements(r);
}, 13);
var l = o.fire(r, "ajax:aborted:file", [ s ]);
return l || setTimeout(function() {
o.enableFormElements(r);
}, 13), l;
}
return o.handleRemote(r), !1;
}
setTimeout(function() {
o.disableFormElements(r);
}, 13);
}), e(document).delegate(o.formInputClickSelector, "click.rails", function(t) {
var n = e(this);
if (!o.allowAction(n)) return o.stopEverything(t);
var r = n.attr("name"), i = r ? {
name:r,
value:n.val()
} :null;
n.closest("form").data("ujs:submit-button", i);
}), e(document).delegate(o.formSubmitSelector, "ajax:beforeSend.rails", function(t) {
this == t.target && o.disableFormElements(e(this));
}), e(document).delegate(o.formSubmitSelector, "ajax:complete.rails", function(t) {
this == t.target && o.enableFormElements(e(this));
}), e(function() {
var t = e("meta[name=csrf-token]").attr("content"), o = e("meta[name=csrf-param]").attr("content");
e('form input[name="' + o + '"]').val(t);
}));
}(jQuery), function() {
var e, t;
jQuery.uaMatch = function(e) {
e = e.toLowerCase();
var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
return {
browser:t[1] || "",
version:t[2] || "0"
};
}, e = jQuery.uaMatch(navigator.userAgent), t = {}, e.browser && (t[e.browser] = !0, 
t.version = e.version), t.chrome ? t.webkit = !0 :t.webkit && (t.safari = !0), jQuery.browser = t, 
jQuery.sub = function() {
function e(t, o) {
return new e.fn.init(t, o);
}
jQuery.extend(!0, e, this), e.superclass = this, e.fn = e.prototype = this(), e.fn.constructor = e, 
e.sub = this.sub, e.fn.init = function(o, n) {
return n && n instanceof jQuery && !(n instanceof e) && (n = e(n)), jQuery.fn.init.call(this, o, n, t);
}, e.fn.init.prototype = e.fn;
var t = e(document);
return e;
};
}(), /*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
function(e) {
"function" == typeof define && define.amd && define.amd.jQuery ? define([ "jquery" ], e) :e(jQuery);
}(function(e) {
function t(e) {
return e;
}
function o(e) {
return decodeURIComponent(e.replace(r, " "));
}
function n(e) {
0 === e.indexOf('"') && (e = e.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
try {
return i.json ? JSON.parse(e) :e;
} catch (t) {}
}
var r = /\+/g, i = e.cookie = function(r, a, s) {
if (void 0 !== a) {
if (s = e.extend({}, i.defaults, s), "number" == typeof s.expires) {
var l = s.expires, u = s.expires = new Date();
u.setDate(u.getDate() + l);
}
return a = i.json ? JSON.stringify(a) :String(a), document.cookie = [ encodeURIComponent(r), "=", i.raw ? a :encodeURIComponent(a), s.expires ? "; expires=" + s.expires.toUTCString() :"", s.path ? "; path=" + s.path :"", s.domain ? "; domain=" + s.domain :"", s.secure ? "; secure" :"" ].join("");
}
for (var d = i.raw ? t :o, c = document.cookie.split("; "), p = r ? void 0 :{}, h = 0, g = c.length; g > h; h++) {
var m = c[h].split("="), f = d(m.shift()), _ = d(m.join("="));
if (r && r === f) {
p = n(_);
break;
}
r || (p[f] = n(_));
}
return p;
};
i.defaults = {}, e.removeCookie = function(t, o) {
return void 0 !== e.cookie(t) ? (e.cookie(t, "", e.extend(o, {
expires:-1
})), !0) :!1;
};
}), function(e) {
function t(e) {
return "object" == typeof e ? e :{
top:e,
left:e
};
}
var o = e.scrollTo = function(t, o, n) {
e(window).scrollTo(t, o, n);
};
o.defaults = {
axis:"xy",
duration:parseFloat(e.fn.jquery) >= 1.3 ? 0 :1
}, o.window = function() {
return e(window)._scrollable();
}, e.fn._scrollable = function() {
return this.map(function() {
var t = this, o = !t.nodeName || -1 != e.inArray(t.nodeName.toLowerCase(), [ "iframe", "#document", "html", "body" ]);
if (!o) return t;
var n = (t.contentWindow || t).document || t.ownerDocument || t;
return e.browser.safari || "BackCompat" == n.compatMode ? n.body :n.documentElement;
});
}, e.fn.scrollTo = function(n, r, i) {
return "object" == typeof r && (i = r, r = 0), "function" == typeof i && (i = {
onAfter:i
}), "max" == n && (n = 9e9), i = e.extend({}, o.defaults, i), r = r || i.speed || i.duration, 
i.queue = i.queue && i.axis.length > 1, i.queue && (r /= 2), i.offset = t(i.offset), 
i.over = t(i.over), this._scrollable().each(function() {
function a(e) {
u.animate(c, r, i.easing, e && function() {
e.call(this, n, i);
});
}
var s, l = this, u = e(l), d = n, c = {}, p = u.is("html,body");
switch (typeof d) {
case "number":
case "string":
if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(d)) {
d = t(d);
break;
}
d = e(d, this);

case "object":
(d.is || d.style) && (s = (d = e(d)).offset());
}
e.each(i.axis.split(""), function(e, t) {
var n = "x" == t ? "Left" :"Top", r = n.toLowerCase(), h = "scroll" + n, g = l[h], m = o.max(l, t);
if (s) c[h] = s[r] + (p ? 0 :g - u.offset()[r]), i.margin && (c[h] -= parseInt(d.css("margin" + n)) || 0, 
c[h] -= parseInt(d.css("border" + n + "Width")) || 0), c[h] += i.offset[r] || 0, 
i.over[r] && (c[h] += d["x" == t ? "width" :"height"]() * i.over[r]); else {
var f = d[r];
c[h] = f.slice && "%" == f.slice(-1) ? parseFloat(f) / 100 * m :f;
}
/^\d+$/.test(c[h]) && (c[h] = c[h] <= 0 ? 0 :Math.min(c[h], m)), !e && i.queue && (g != c[h] && a(i.onAfterFirst), 
delete c[h]);
}), a(i.onAfter);
}).end();
}, o.max = function(t, o) {
var n = "x" == o ? "Width" :"Height", r = "scroll" + n;
if (!e(t).is("html,body")) return t[r] - e(t)[n.toLowerCase()]();
var i = "client" + n, a = t.ownerDocument.documentElement, s = t.ownerDocument.body;
return Math.max(a[r], s[r]) - Math.min(a[i], s[i]);
};
}(jQuery), /*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/
jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
def:"easeOutQuad",
swing:function(e, t, o, n, r) {
return (t /= r / 2) < 1 ? n / 2 * t * t + o :-n / 2 * (--t * (t - 2) - 1) + o;
},
easeInQuad:function(e, t, o, n, r) {
return n * (t /= r) * t + o;
},
easeOutQuad:function(e, t, o, n, r) {
return -n * (t /= r) * (t - 2) + o;
},
easeInOutQuad:function(e, t, o, n, r) {
return (t /= r / 2) < 1 ? n / 2 * t * t + o :-n / 2 * (--t * (t - 2) - 1) + o;
},
easeInCubic:function(e, t, o, n, r) {
return n * (t /= r) * t * t + o;
},
easeOutCubic:function(e, t, o, n, r) {
return n * ((t = t / r - 1) * t * t + 1) + o;
},
easeInOutCubic:function(e, t, o, n, r) {
return (t /= r / 2) < 1 ? n / 2 * t * t * t + o :n / 2 * ((t -= 2) * t * t + 2) + o;
},
easeInQuart:function(e, t, o, n, r) {
return n * (t /= r) * t * t * t + o;
},
easeOutQuart:function(e, t, o, n, r) {
return -n * ((t = t / r - 1) * t * t * t - 1) + o;
},
easeInOutQuart:function(e, t, o, n, r) {
return (t /= r / 2) < 1 ? n / 2 * t * t * t * t + o :-n / 2 * ((t -= 2) * t * t * t - 2) + o;
},
easeInQuint:function(e, t, o, n, r) {
return n * (t /= r) * t * t * t * t + o;
},
easeOutQuint:function(e, t, o, n, r) {
return n * ((t = t / r - 1) * t * t * t * t + 1) + o;
},
easeInOutQuint:function(e, t, o, n, r) {
return (t /= r / 2) < 1 ? n / 2 * t * t * t * t * t + o :n / 2 * ((t -= 2) * t * t * t * t + 2) + o;
},
easeInSine:function(e, t, o, n, r) {
return -n * Math.cos(t / r * (Math.PI / 2)) + n + o;
},
easeOutSine:function(e, t, o, n, r) {
return n * Math.sin(t / r * (Math.PI / 2)) + o;
},
easeInOutSine:function(e, t, o, n, r) {
return -n / 2 * (Math.cos(Math.PI * t / r) - 1) + o;
},
easeInExpo:function(e, t, o, n, r) {
return 0 == t ? o :n * Math.pow(2, 10 * (t / r - 1)) + o;
},
easeOutExpo:function(e, t, o, n, r) {
return t == r ? o + n :n * (-Math.pow(2, -10 * t / r) + 1) + o;
},
easeInOutExpo:function(e, t, o, n, r) {
return 0 == t ? o :t == r ? o + n :(t /= r / 2) < 1 ? n / 2 * Math.pow(2, 10 * (t - 1)) + o :n / 2 * (-Math.pow(2, -10 * --t) + 2) + o;
},
easeInCirc:function(e, t, o, n, r) {
return -n * (Math.sqrt(1 - (t /= r) * t) - 1) + o;
},
easeOutCirc:function(e, t, o, n, r) {
return n * Math.sqrt(1 - (t = t / r - 1) * t) + o;
},
easeInOutCirc:function(e, t, o, n, r) {
return (t /= r / 2) < 1 ? -n / 2 * (Math.sqrt(1 - t * t) - 1) + o :n / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + o;
},
easeInElastic:function(e, t, o, n, r) {
var i = 1.70158, a = 0, s = n;
if (0 == t) return o;
if (1 == (t /= r)) return o + n;
if (a || (a = .3 * r), s < Math.abs(n)) {
s = n;
var i = a / 4;
} else var i = a / (2 * Math.PI) * Math.asin(n / s);
return -(s * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t * r - i) * Math.PI / a)) + o;
},
easeOutElastic:function(e, t, o, n, r) {
var i = 1.70158, a = 0, s = n;
if (0 == t) return o;
if (1 == (t /= r)) return o + n;
if (a || (a = .3 * r), s < Math.abs(n)) {
s = n;
var i = a / 4;
} else var i = a / (2 * Math.PI) * Math.asin(n / s);
return s * Math.pow(2, -10 * t) * Math.sin(2 * (t * r - i) * Math.PI / a) + n + o;
},
easeInOutElastic:function(e, t, o, n, r) {
var i = 1.70158, a = 0, s = n;
if (0 == t) return o;
if (2 == (t /= r / 2)) return o + n;
if (a || (a = .3 * r * 1.5), s < Math.abs(n)) {
s = n;
var i = a / 4;
} else var i = a / (2 * Math.PI) * Math.asin(n / s);
return 1 > t ? -.5 * s * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t * r - i) * Math.PI / a) + o :s * Math.pow(2, -10 * (t -= 1)) * Math.sin(2 * (t * r - i) * Math.PI / a) * .5 + n + o;
},
easeInBack:function(e, t, o, n, r, i) {
return void 0 == i && (i = 1.70158), n * (t /= r) * t * ((i + 1) * t - i) + o;
},
easeOutBack:function(e, t, o, n, r, i) {
return void 0 == i && (i = 1.70158), n * ((t = t / r - 1) * t * ((i + 1) * t + i) + 1) + o;
},
easeInOutBack:function(e, t, o, n, r, i) {
return void 0 == i && (i = 1.70158), (t /= r / 2) < 1 ? n / 2 * t * t * (((i *= 1.525) + 1) * t - i) + o :n / 2 * ((t -= 2) * t * (((i *= 1.525) + 1) * t + i) + 2) + o;
},
easeInBounce:function(e, t, o, n, r) {
return n - jQuery.easing.easeOutBounce(e, r - t, 0, n, r) + o;
},
easeOutBounce:function(e, t, o, n, r) {
return (t /= r) < 1 / 2.75 ? 7.5625 * n * t * t + o :2 / 2.75 > t ? n * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + o :2.5 / 2.75 > t ? n * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + o :n * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + o;
},
easeInOutBounce:function(e, t, o, n, r) {
return r / 2 > t ? .5 * jQuery.easing.easeInBounce(e, 2 * t, 0, n, r) + o :.5 * jQuery.easing.easeOutBounce(e, 2 * t - r, 0, n, r) + .5 * n + o;
}
}), /*!
jQuery Waypoints - v2.0.5
Copyright (c) 2011-2014 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
function() {
var e = [].indexOf || function(e) {
for (var t = 0, o = this.length; o > t; t++) if (t in this && this[t] === e) return t;
return -1;
}, t = [].slice;
!function(e, t) {
return "function" == typeof define && define.amd ? define("waypoints", [ "jquery" ], function(o) {
return t(o, e);
}) :t(e.jQuery, e);
}(window, function(o, n) {
var r, i, a, s, l, u, d, c, p, h, g, m, f, _, y, w;
return r = o(n), c = e.call(n, "ontouchstart") >= 0, s = {
horizontal:{},
vertical:{}
}, l = 1, d = {}, u = "waypoints-context-id", g = "resize.waypoints", m = "scroll.waypoints", 
f = 1, _ = "waypoints-waypoint-ids", y = "waypoint", w = "waypoints", i = function() {
function e(e) {
var t = this;
this.$element = e, this.element = e[0], this.didResize = !1, this.didScroll = !1, 
this.id = "context" + l++, this.oldScroll = {
x:e.scrollLeft(),
y:e.scrollTop()
}, this.waypoints = {
horizontal:{},
vertical:{}
}, this.element[u] = this.id, d[this.id] = this, e.bind(m, function() {
var e;
return t.didScroll || c ? void 0 :(t.didScroll = !0, e = function() {
return t.doScroll(), t.didScroll = !1;
}, n.setTimeout(e, o[w].settings.scrollThrottle));
}), e.bind(g, function() {
var e;
return t.didResize ? void 0 :(t.didResize = !0, e = function() {
return o[w]("refresh"), t.didResize = !1;
}, n.setTimeout(e, o[w].settings.resizeThrottle));
});
}
return e.prototype.doScroll = function() {
var e, t = this;
return e = {
horizontal:{
newScroll:this.$element.scrollLeft(),
oldScroll:this.oldScroll.x,
forward:"right",
backward:"left"
},
vertical:{
newScroll:this.$element.scrollTop(),
oldScroll:this.oldScroll.y,
forward:"down",
backward:"up"
}
}, !c || e.vertical.oldScroll && e.vertical.newScroll || o[w]("refresh"), o.each(e, function(e, n) {
var r, i, a;
return a = [], i = n.newScroll > n.oldScroll, r = i ? n.forward :n.backward, o.each(t.waypoints[e], function(e, t) {
var o, r;
return n.oldScroll < (o = t.offset) && o <= n.newScroll ? a.push(t) :n.newScroll < (r = t.offset) && r <= n.oldScroll ? a.push(t) :void 0;
}), a.sort(function(e, t) {
return e.offset - t.offset;
}), i || a.reverse(), o.each(a, function(e, t) {
return t.options.continuous || e === a.length - 1 ? t.trigger([ r ]) :void 0;
});
}), this.oldScroll = {
x:e.horizontal.newScroll,
y:e.vertical.newScroll
};
}, e.prototype.refresh = function() {
var e, t, n, r = this;
return n = o.isWindow(this.element), t = this.$element.offset(), this.doScroll(), 
e = {
horizontal:{
contextOffset:n ? 0 :t.left,
contextScroll:n ? 0 :this.oldScroll.x,
contextDimension:this.$element.width(),
oldScroll:this.oldScroll.x,
forward:"right",
backward:"left",
offsetProp:"left"
},
vertical:{
contextOffset:n ? 0 :t.top,
contextScroll:n ? 0 :this.oldScroll.y,
contextDimension:n ? o[w]("viewportHeight") :this.$element.height(),
oldScroll:this.oldScroll.y,
forward:"down",
backward:"up",
offsetProp:"top"
}
}, o.each(e, function(e, t) {
return o.each(r.waypoints[e], function(e, n) {
var r, i, a, s, l;
return r = n.options.offset, a = n.offset, i = o.isWindow(n.element) ? 0 :n.$element.offset()[t.offsetProp], 
o.isFunction(r) ? r = r.apply(n.element) :"string" == typeof r && (r = parseFloat(r), 
n.options.offset.indexOf("%") > -1 && (r = Math.ceil(t.contextDimension * r / 100))), 
n.offset = i - t.contextOffset + t.contextScroll - r, n.options.onlyOnScroll && null != a || !n.enabled ? void 0 :null !== a && a < (s = t.oldScroll) && s <= n.offset ? n.trigger([ t.backward ]) :null !== a && a > (l = t.oldScroll) && l >= n.offset ? n.trigger([ t.forward ]) :null === a && t.oldScroll >= n.offset ? n.trigger([ t.forward ]) :void 0;
});
});
}, e.prototype.checkEmpty = function() {
return o.isEmptyObject(this.waypoints.horizontal) && o.isEmptyObject(this.waypoints.vertical) ? (this.$element.unbind([ g, m ].join(" ")), 
delete d[this.id]) :void 0;
}, e;
}(), a = function() {
function e(e, t, n) {
var r, i;
"bottom-in-view" === n.offset && (n.offset = function() {
var e;
return e = o[w]("viewportHeight"), o.isWindow(t.element) || (e = t.$element.height()), 
e - o(this).outerHeight();
}), this.$element = e, this.element = e[0], this.axis = n.horizontal ? "horizontal" :"vertical", 
this.callback = n.handler, this.context = t, this.enabled = n.enabled, this.id = "waypoints" + f++, 
this.offset = null, this.options = n, t.waypoints[this.axis][this.id] = this, s[this.axis][this.id] = this, 
r = null != (i = this.element[_]) ? i :[], r.push(this.id), this.element[_] = r;
}
return e.prototype.trigger = function(e) {
return this.enabled ? (null != this.callback && this.callback.apply(this.element, e), 
this.options.triggerOnce ? this.destroy() :void 0) :void 0;
}, e.prototype.disable = function() {
return this.enabled = !1;
}, e.prototype.enable = function() {
return this.context.refresh(), this.enabled = !0;
}, e.prototype.destroy = function() {
return delete s[this.axis][this.id], delete this.context.waypoints[this.axis][this.id], 
this.context.checkEmpty();
}, e.getWaypointsByElement = function(e) {
var t, n;
return (n = e[_]) ? (t = o.extend({}, s.horizontal, s.vertical), o.map(n, function(e) {
return t[e];
})) :[];
}, e;
}(), h = {
init:function(e, t) {
var n;
return t = o.extend({}, o.fn[y].defaults, t), null == (n = t.handler) && (t.handler = e), 
this.each(function() {
var e, n, r, s;
return e = o(this), r = null != (s = t.context) ? s :o.fn[y].defaults.context, o.isWindow(r) || (r = e.closest(r)), 
r = o(r), n = d[r[0][u]], n || (n = new i(r)), new a(e, n, t);
}), o[w]("refresh"), this;
},
disable:function() {
return h._invoke.call(this, "disable");
},
enable:function() {
return h._invoke.call(this, "enable");
},
destroy:function() {
return h._invoke.call(this, "destroy");
},
prev:function(e, t) {
return h._traverse.call(this, e, t, function(e, t, o) {
return t > 0 ? e.push(o[t - 1]) :void 0;
});
},
next:function(e, t) {
return h._traverse.call(this, e, t, function(e, t, o) {
return t < o.length - 1 ? e.push(o[t + 1]) :void 0;
});
},
_traverse:function(e, t, r) {
var i, a;
return null == e && (e = "vertical"), null == t && (t = n), a = p.aggregate(t), 
i = [], this.each(function() {
var t;
return t = o.inArray(this, a[e]), r(i, t, a[e]);
}), this.pushStack(i);
},
_invoke:function(e) {
return this.each(function() {
var t;
return t = a.getWaypointsByElement(this), o.each(t, function(t, o) {
return o[e](), !0;
});
}), this;
}
}, o.fn[y] = function() {
var e, n;
return n = arguments[0], e = 2 <= arguments.length ? t.call(arguments, 1) :[], h[n] ? h[n].apply(this, e) :o.isFunction(n) ? h.init.apply(this, arguments) :o.isPlainObject(n) ? h.init.apply(this, [ null, n ]) :n ? o.error("The " + n + " method does not exist in jQuery Waypoints.") :o.error("jQuery Waypoints needs a callback function or handler option.");
}, o.fn[y].defaults = {
context:n,
continuous:!0,
enabled:!0,
horizontal:!1,
offset:0,
triggerOnce:!1
}, p = {
refresh:function() {
return o.each(d, function(e, t) {
return t.refresh();
});
},
viewportHeight:function() {
var e;
return null != (e = n.innerHeight) ? e :r.height();
},
aggregate:function(e) {
var t, n, r;
return t = s, e && (t = null != (r = d[o(e)[0][u]]) ? r.waypoints :void 0), t ? (n = {
horizontal:[],
vertical:[]
}, o.each(n, function(e, r) {
return o.each(t[e], function(e, t) {
return r.push(t);
}), r.sort(function(e, t) {
return e.offset - t.offset;
}), n[e] = o.map(r, function(e) {
return e.element;
}), n[e] = o.unique(n[e]);
}), n) :[];
},
above:function(e) {
return null == e && (e = n), p._filter(e, "vertical", function(e, t) {
return t.offset <= e.oldScroll.y;
});
},
below:function(e) {
return null == e && (e = n), p._filter(e, "vertical", function(e, t) {
return t.offset > e.oldScroll.y;
});
},
left:function(e) {
return null == e && (e = n), p._filter(e, "horizontal", function(e, t) {
return t.offset <= e.oldScroll.x;
});
},
right:function(e) {
return null == e && (e = n), p._filter(e, "horizontal", function(e, t) {
return t.offset > e.oldScroll.x;
});
},
enable:function() {
return p._invoke("enable");
},
disable:function() {
return p._invoke("disable");
},
destroy:function() {
return p._invoke("destroy");
},
extendFn:function(e, t) {
return h[e] = t;
},
_invoke:function(e) {
var t;
return t = o.extend({}, s.vertical, s.horizontal), o.each(t, function(t, o) {
return o[e](), !0;
});
},
_filter:function(e, t, n) {
var r, i;
return (r = d[o(e)[0][u]]) ? (i = [], o.each(r.waypoints[t], function(e, t) {
return n(r, t) ? i.push(t) :void 0;
}), i.sort(function(e, t) {
return e.offset - t.offset;
}), o.map(i, function(e) {
return e.element;
})) :[];
}
}, o[w] = function() {
var e, o;
return o = arguments[0], e = 2 <= arguments.length ? t.call(arguments, 1) :[], p[o] ? p[o].apply(null, e) :p.aggregate.call(null, o);
}, o[w].settings = {
resizeThrottle:100,
scrollThrottle:30
}, r.on("load.waypoints", function() {
return o[w]("refresh");
});
});
}.call(this), /*!
 * jQuery Templates Plugin
 * http://github.com/jquery/jquery-tmpl
 *
 * Copyright Software Freedom Conservancy, Inc.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
function(e) {
function t(t, o, n, r) {
var i = {
data:r || (o ? o.data :{}),
_wrap:o ? o._wrap :null,
tmpl:null,
parent:o || null,
nodes:[],
calls:u,
nest:d,
wrap:c,
html:p,
update:h
};
return t && e.extend(i, t, {
nodes:[],
parent:o
}), n && (i.tmpl = n, i._ctnt = i._ctnt || i.tmpl(e, i), i.key = ++b, (M.length ? w :y)[b] = i), 
i;
}
function o(t, r, i) {
var a, s = i ? e.map(i, function(e) {
return "string" == typeof e ? t.key ? e.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g, "$1 " + f + '="' + t.key + '" $2') :e :o(e, t, e._ctnt);
}) :t;
return r ? s :(s = s.join(""), s.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/, function(t, o, r, i) {
a = e(r).get(), l(a), o && (a = n(o).concat(a)), i && (a = a.concat(n(i)));
}), a ? a :n(s));
}
function n(t) {
var o = document.createElement("div");
return o.innerHTML = t, e.makeArray(o.childNodes);
}
function r(t) {
return new Function("jQuery", "$item", "var $=jQuery,call,_=[],$data=$item.data;with($data){_.push('" + e.trim(t).replace(/([\\'])/g, "\\$1").replace(/[\r\t\n]/g, " ").replace(/\$\{([^\}]*)\}/g, "{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g, function(t, o, n, r, i, s, l) {
var u, d, c, p = e.tmpl.tag[n];
if (!p) throw "Template command not found: " + n;
return u = p._default || [], s && !/\w$/.test(i) && (i += s, s = ""), i ? (i = a(i), 
l = l ? "," + a(l) + ")" :s ? ")" :"", d = s ? i.indexOf(".") > -1 ? i + s :"(" + i + ").call($item" + l :i, 
c = s ? d :"(typeof(" + i + ")==='function'?(" + i + ").call($item):(" + i + "))") :c = d = u.$1 || "null", 
r = a(r), "');" + p[o ? "close" :"open"].split("$notnull_1").join(i ? "typeof(" + i + ")!=='undefined' && (" + i + ")!=null" :"true").split("$1a").join(c).split("$1").join(d).split("$2").join(r ? r.replace(/\s*([^\(]+)\s*(\((.*?)\))?/g, function(e, t, o, n) {
return n = n ? "," + n + ")" :o ? ")" :"", n ? "(" + t + ").call($item" + n :e;
}) :u.$2 || "") + "_.push('";
}) + "');}return _;");
}
function i(t, n) {
t._wrap = o(t, !0, e.isArray(n) ? n :[ _.test(n) ? n :e(n).html() ]).join("");
}
function a(e) {
return e ? e.replace(/\\'/g, "'").replace(/\\\\/g, "\\") :null;
}
function s(e) {
var t = document.createElement("div");
return t.appendChild(e.cloneNode(!0)), t.innerHTML;
}
function l(o) {
function n(o) {
function n(e) {
e += u, a = d[e] = d[e] || t(a, y[a.parent.key + u] || a.parent, null, !0);
}
var r, i, a, s, l = o;
if (s = o.getAttribute(f)) {
for (;l.parentNode && 1 === (l = l.parentNode).nodeType && !(r = l.getAttribute(f)); ) ;
r !== s && (l = l.parentNode ? 11 === l.nodeType ? 0 :l.getAttribute(f) || 0 :0, 
(a = y[s]) || (a = w[s], a = t(a, y[l] || w[l], null, !0), a.key = ++b, y[b] = a), 
k && n(s)), o.removeAttribute(f);
} else k && (a = e.data(o, "tmplItem")) && (n(a.key), y[a.key] = a, l = e.data(o.parentNode, "tmplItem"), 
l = l ? l.key :0);
if (a) {
for (i = a; i && i.key != l; ) i.nodes.push(o), i = i.parent;
delete a._ctnt, delete a._wrap, e.data(o, "tmplItem", a);
}
}
var r, i, a, s, l, u = "_" + k, d = {};
for (a = 0, s = o.length; s > a; a++) if (1 === (r = o[a]).nodeType) {
for (i = r.getElementsByTagName("*"), l = i.length - 1; l >= 0; l--) n(i[l]);
n(r);
}
}
function u(e, t, o, n) {
return e ? (M.push({
_:e,
tmpl:t,
item:this,
data:o,
options:n
}), void 0) :M.pop();
}
function d(t, o, n) {
return e.tmpl(e.template(t), o, n, this);
}
function c(t, o) {
var n = t.options || {};
return n.wrapped = o, e.tmpl(e.template(t.tmpl), t.data, n, t.item);
}
function p(t, o) {
var n = this._wrap;
return e.map(e(e.isArray(n) ? n.join("") :n).filter(t || "*"), function(e) {
return o ? e.innerText || e.textContent :e.outerHTML || s(e);
});
}
function h() {
var t = this.nodes;
e.tmpl(null, null, null, this).insertBefore(t[0]), e(t).remove();
}
var g, m = e.fn.domManip, f = "_tmplitem", _ = /^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /, y = {}, w = {}, v = {
key:0,
data:{}
}, b = 0, k = 0, M = [];
e.each({
appendTo:"append",
prependTo:"prepend",
insertBefore:"before",
insertAfter:"after",
replaceAll:"replaceWith"
}, function(t, o) {
e.fn[t] = function(n) {
var r, i, a, s, l = [], u = e(n), d = 1 === this.length && this[0].parentNode;
if (g = y || {}, d && 11 === d.nodeType && 1 === d.childNodes.length && 1 === u.length) u[o](this[0]), 
l = this; else {
for (i = 0, a = u.length; a > i; i++) k = i, r = (i > 0 ? this.clone(!0) :this).get(), 
e.fn[o].apply(e(u[i]), r), l = l.concat(r);
k = 0, l = this.pushStack(l, t, u.selector);
}
return s = g, g = null, e.tmpl.complete(s), l;
};
}), e.fn.extend({
tmpl:function(t, o, n) {
return e.tmpl(this[0], t, o, n);
},
tmplItem:function() {
return e.tmplItem(this[0]);
},
template:function(t) {
return e.template(t, this[0]);
},
domManip:function(t, o, n) {
if (t[0] && t[0].nodeType) {
for (var r, i = e.makeArray(arguments), a = t.length, s = 0; a > s && !(r = e.data(t[s++], "tmplItem")); ) ;
a > 1 && (i[0] = [ e.makeArray(t) ]), r && k && (i[2] = function(t) {
e.tmpl.afterManip(this, t, n);
}), m.apply(this, i);
} else m.apply(this, arguments);
return k = 0, g || e.tmpl.complete(y), this;
}
}), e.extend({
tmpl:function(n, r, a, s) {
var l, u = !s;
if (u) s = v, n = e.template[n] || e.template(null, n), w = {}; else if (!n) return n = s.tmpl, 
y[s.key] = s, s.nodes = [], s.wrapped && i(s, s.wrapped), e(o(s, null, s.tmpl(e, s)));
return n ? ("function" == typeof r && (r = r.call(s || {})), a && a.wrapped && i(a, a.wrapped), 
l = e.isArray(r) ? e.map(r, function(e) {
return e ? t(a, s, n, e) :null;
}) :[ t(a, s, n, r) ], u ? e(o(s, null, l)) :l) :[];
},
tmplItem:function(t) {
var o;
for (t instanceof e && (t = t[0]); t && 1 === t.nodeType && !(o = e.data(t, "tmplItem")) && (t = t.parentNode); ) ;
return o || v;
},
template:function(t, o) {
return o ? ("string" == typeof o ? o = r(o) :o instanceof e && (o = o[0] || {}), 
o.nodeType && (o = e.data(o, "tmpl") || e.data(o, "tmpl", r(o.innerHTML))), "string" == typeof t ? e.template[t] = o :o) :t ? "string" != typeof t ? e.template(null, t) :e.template[t] || e.template(null, _.test(t) ? t :e(t)) :null;
},
encode:function(e) {
return ("" + e).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;");
}
}), e.extend(e.tmpl, {
tag:{
tmpl:{
_default:{
$2:"null"
},
open:"if($notnull_1){_=_.concat($item.nest($1,$2));}"
},
wrap:{
_default:{
$2:"null"
},
open:"$item.calls(_,$1,$2);_=[];",
close:"call=$item.calls();_=call._.concat($item.wrap(call,_));"
},
each:{
_default:{
$2:"$index, $value"
},
open:"if($notnull_1){$.each($1a,function($2){with(this){",
close:"}});}"
},
"if":{
open:"if(($notnull_1) && $1a){",
close:"}"
},
"else":{
_default:{
$1:"true"
},
open:"}else if(($notnull_1) && $1a){"
},
html:{
open:"if($notnull_1){_.push($1a);}"
},
"=":{
_default:{
$1:"$data"
},
open:"if($notnull_1){_.push($.encode($1a));}"
},
"!":{
open:""
}
},
complete:function() {
y = {};
},
afterManip:function(t, o, n) {
var r = 11 === o.nodeType ? e.makeArray(o.childNodes) :1 === o.nodeType ? [ o ] :[];
n.call(t, o), l(r), k++;
}
});
}(jQuery), function(e) {
function t() {
var e = "[jquery.form] " + Array.prototype.join.call(arguments, "");
window.console && window.console.log ? window.console.log(e) :window.opera && window.opera.postError && window.opera.postError(e);
}
e.fn.ajaxSubmit = function(o) {
function n(n) {
function i(e) {
var t = e.contentWindow ? e.contentWindow.document :e.contentDocument ? e.contentDocument :e.document;
return t;
}
function a() {
function o() {
try {
var e = i(m).readyState;
t("state = " + e), "uninitialized" == e.toLowerCase() && setTimeout(o, 50);
} catch (n) {
t("Server abort: ", n, " (", n.name, ")"), l(L), v && clearTimeout(v), v = void 0;
}
}
var n = s.attr("target"), a = s.attr("action");
b.setAttribute("target", h), r || b.setAttribute("method", "POST"), a != c.url && b.setAttribute("action", c.url), 
c.skipEncodingOverride || r && !/post/i.test(r) || s.attr({
encoding:"multipart/form-data",
enctype:"multipart/form-data"
}), c.timeout && (v = setTimeout(function() {
w = !0, l(M);
}, c.timeout));
var u = [];
try {
if (c.extraData) for (var d in c.extraData) u.push(e('<input type="hidden" name="' + d + '" />').attr("value", c.extraData[d]).appendTo(b)[0]);
c.iframeTarget || (g.appendTo("body"), m.attachEvent ? m.attachEvent("onload", l) :m.addEventListener("load", l, !1)), 
setTimeout(o, 15), b.submit();
} finally {
b.setAttribute("action", a), n ? b.setAttribute("target", n) :s.removeAttr("target"), 
e(u).remove();
}
}
function l(o) {
if (!f.aborted && !D) {
try {
S = i(m);
} catch (n) {
t("cannot access response document: ", n), o = L;
}
if (o === M && f) return f.abort("timeout"), void 0;
if (o == L && f) return f.abort("server abort"), void 0;
if (S && S.location.href != c.iframeSrc || w) {
m.detachEvent ? m.detachEvent("onload", l) :m.removeEventListener("load", l, !1);
var r, a = "success";
try {
if (w) throw "timeout";
var s = "xml" == c.dataType || S.XMLDocument || e.isXMLDoc(S);
if (t("isXml=" + s), !s && window.opera && (null == S.body || "" == S.body.innerHTML) && --Y) return t("requeing onLoad callback, DOM not available"), 
setTimeout(l, 250), void 0;
var u = S.body ? S.body :S.documentElement;
f.responseText = u ? u.innerHTML :null, f.responseXML = S.XMLDocument ? S.XMLDocument :S, 
s && (c.dataType = "xml"), f.getResponseHeader = function(e) {
var t = {
"content-type":c.dataType
};
return t[e];
}, u && (f.status = Number(u.getAttribute("status")) || f.status, f.statusText = u.getAttribute("statusText") || f.statusText);
var d = c.dataType || "", h = /(json|script|text)/.test(d.toLowerCase());
if (h || c.textarea) {
var _ = S.getElementsByTagName("textarea")[0];
if (_) f.responseText = _.value, f.status = Number(_.getAttribute("status")) || f.status, 
f.statusText = _.getAttribute("statusText") || f.statusText; else if (h) {
var y = S.getElementsByTagName("pre")[0], b = S.getElementsByTagName("body")[0];
y ? f.responseText = y.textContent ? y.textContent :y.innerHTML :b && (f.responseText = b.innerHTML);
}
} else "xml" != c.dataType || f.responseXML || null == f.responseText || (f.responseXML = x(f.responseText));
try {
T = C(f, c.dataType, c);
} catch (o) {
a = "parsererror", f.error = r = o || a;
}
} catch (o) {
t("error caught: ", o), a = "error", f.error = r = o || a;
}
f.aborted && (t("upload aborted"), a = null), f.status && (a = f.status >= 200 && f.status < 300 || 304 === f.status ? "success" :"error"), 
"success" === a ? (c.success && c.success.call(c.context, T, "success", f), p && e.event.trigger("ajaxSuccess", [ f, c ])) :a && (void 0 == r && (r = f.statusText), 
c.error && c.error.call(c.context, f, a, r), p && e.event.trigger("ajaxError", [ f, c, r ])), 
p && e.event.trigger("ajaxComplete", [ f, c ]), p && !--e.active && e.event.trigger("ajaxStop"), 
c.complete && c.complete.call(c.context, f, a), D = !0, c.timeout && clearTimeout(v), 
setTimeout(function() {
c.iframeTarget || g.remove(), f.responseXML = null;
}, 100);
}
}
}
var u, d, c, p, h, g, m, f, _, y, w, v, b = s[0], k = !!e.fn.prop;
if (n) for (d = 0; d < n.length; d++) u = e(b[n[d].name]), u[k ? "prop" :"attr"]("disabled", !1);
if (e(":input[name=submit],:input[id=submit]", b).length) return alert('Error: Form elements must not have name or id of "submit".'), 
void 0;
if (c = e.extend(!0, {}, e.ajaxSettings, o), c.context = c.context || c, h = "jqFormIO" + new Date().getTime(), 
c.iframeTarget ? (g = e(c.iframeTarget), y = g.attr("name"), null == y ? g.attr("name", h) :h = y) :(g = e('<iframe name="' + h + '" src="' + c.iframeSrc + '" />'), 
g.css({
position:"absolute",
top:"-1000px",
left:"-1000px"
})), m = g[0], f = {
aborted:0,
responseText:null,
responseXML:null,
status:0,
statusText:"n/a",
getAllResponseHeaders:function() {},
getResponseHeader:function() {},
setRequestHeader:function() {},
abort:function(o) {
var n = "timeout" === o ? "timeout" :"aborted";
t("aborting upload... " + n), this.aborted = 1, g.attr("src", c.iframeSrc), f.error = n, 
c.error && c.error.call(c.context, f, n, o), p && e.event.trigger("ajaxError", [ f, c, n ]), 
c.complete && c.complete.call(c.context, f, n);
}
}, p = c.global, p && !e.active++ && e.event.trigger("ajaxStart"), p && e.event.trigger("ajaxSend", [ f, c ]), 
c.beforeSend && c.beforeSend.call(c.context, f, c) === !1) return c.global && e.active--, 
void 0;
if (!f.aborted) {
_ = b.clk, _ && (y = _.name, y && !_.disabled && (c.extraData = c.extraData || {}, 
c.extraData[y] = _.value, "image" == _.type && (c.extraData[y + ".x"] = b.clk_x, 
c.extraData[y + ".y"] = b.clk_y)));
var M = 1, L = 2;
c.forceSync ? a() :setTimeout(a, 10);
var T, S, D, Y = 50, x = e.parseXML || function(e, t) {
return window.ActiveXObject ? (t = new ActiveXObject("Microsoft.XMLDOM"), t.async = "false", 
t.loadXML(e)) :t = new DOMParser().parseFromString(e, "text/xml"), t && t.documentElement && "parsererror" != t.documentElement.nodeName ? t :null;
}, E = e.parseJSON || function(e) {
return window.eval("(" + e + ")");
}, C = function(t, o, n) {
var r = t.getResponseHeader("content-type") || "", i = "xml" === o || !o && r.indexOf("xml") >= 0, a = i ? t.responseXML :t.responseText;
return i && "parsererror" === a.documentElement.nodeName && e.error && e.error("parsererror"), 
n && n.dataFilter && (a = n.dataFilter(a, o)), "string" == typeof a && ("json" === o || !o && r.indexOf("json") >= 0 ? a = E(a) :("script" === o || !o && r.indexOf("javascript") >= 0) && e.globalEval(a)), 
a;
};
}
}
if (!this.length) return t("ajaxSubmit: skipping submit process - no element selected"), 
this;
var r, i, a, s = this;
"function" == typeof o && (o = {
success:o
}), r = this.attr("method"), i = this.attr("action"), a = "string" == typeof i ? e.trim(i) :"", 
a = a || window.location.href || "", a && (a = (a.match(/^([^#]+)/) || [])[1]), 
o = e.extend(!0, {
url:a,
success:e.ajaxSettings.success,
type:r || "GET",
iframeSrc:/^https/i.test(window.location.href || "") ? "javascript:false" :"about:blank"
}, o);
var l = {};
if (this.trigger("form-pre-serialize", [ this, o, l ]), l.veto) return t("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), 
this;
if (o.beforeSerialize && o.beforeSerialize(this, o) === !1) return t("ajaxSubmit: submit aborted via beforeSerialize callback"), 
this;
var u, d, c = this.formToArray(o.semantic);
if (o.data) {
o.extraData = o.data;
for (u in o.data) if (o.data[u] instanceof Array) for (var p in o.data[u]) c.push({
name:u,
value:o.data[u][p]
}); else d = o.data[u], d = e.isFunction(d) ? d() :d, c.push({
name:u,
value:d
});
}
if (o.beforeSubmit && o.beforeSubmit(c, this, o) === !1) return t("ajaxSubmit: submit aborted via beforeSubmit callback"), 
this;
if (this.trigger("form-submit-validate", [ c, this, o, l ]), l.veto) return t("ajaxSubmit: submit vetoed via form-submit-validate trigger"), 
this;
var h = e.param(c);
"GET" == o.type.toUpperCase() ? (o.url += (o.url.indexOf("?") >= 0 ? "&" :"?") + h, 
o.data = null) :o.data = h;
var g = [];
if (o.resetForm && g.push(function() {
s.resetForm();
}), o.clearForm && g.push(function() {
s.clearForm();
}), !o.dataType && o.target) {
var m = o.success || function() {};
g.push(function(t) {
var n = o.replaceTarget ? "replaceWith" :"html";
e(o.target)[n](t).each(m, arguments);
});
} else o.success && g.push(o.success);
o.success = function(e, t, n) {
for (var r = o.context || o, i = 0, a = g.length; a > i; i++) g[i].apply(r, [ e, t, n || s, s ]);
};
var f = e("input:file", this).length > 0, _ = "multipart/form-data", y = s.attr("enctype") == _ || s.attr("encoding") == _;
if (o.iframe !== !1 && (f || o.iframe || y)) o.closeKeepAlive ? e.get(o.closeKeepAlive, function() {
n(c);
}) :n(c); else {
if (e.browser.msie && "get" == r) {
var w = s[0].getAttribute("method");
"string" == typeof w && (o.type = w);
}
e.ajax(o);
}
return this.trigger("form-submit-notify", [ this, o ]), this;
}, e.fn.ajaxForm = function(o) {
if (0 === this.length) {
var n = {
s:this.selector,
c:this.context
};
return !e.isReady && n.s ? (t("DOM not ready, queuing ajaxForm"), e(function() {
e(n.s, n.c).ajaxForm(o);
}), this) :(t("terminating; zero elements found by selector" + (e.isReady ? "" :" (DOM not ready)")), 
this);
}
return this.ajaxFormUnbind().bind("submit.form-plugin", function(t) {
t.isDefaultPrevented() || (t.preventDefault(), e(this).ajaxSubmit(o));
}).bind("click.form-plugin", function(t) {
var o = t.target, n = e(o);
if (!n.is(":submit,input:image")) {
var r = n.closest(":submit");
if (0 == r.length) return;
o = r[0];
}
var i = this;
if (i.clk = o, "image" == o.type) if (void 0 != t.offsetX) i.clk_x = t.offsetX, 
i.clk_y = t.offsetY; else if ("function" == typeof e.fn.offset) {
var a = n.offset();
i.clk_x = t.pageX - a.left, i.clk_y = t.pageY - a.top;
} else i.clk_x = t.pageX - o.offsetLeft, i.clk_y = t.pageY - o.offsetTop;
setTimeout(function() {
i.clk = i.clk_x = i.clk_y = null;
}, 100);
});
}, e.fn.ajaxFormUnbind = function() {
return this.unbind("submit.form-plugin click.form-plugin");
}, e.fn.formToArray = function(t) {
var o = [];
if (0 === this.length) return o;
var n = this[0], r = t ? n.getElementsByTagName("*") :n.elements;
if (!r) return o;
var i, a, s, l, u, d, c;
for (i = 0, d = r.length; d > i; i++) if (u = r[i], s = u.name) if (t && n.clk && "image" == u.type) u.disabled || n.clk != u || (o.push({
name:s,
value:e(u).val()
}), o.push({
name:s + ".x",
value:n.clk_x
}, {
name:s + ".y",
value:n.clk_y
})); else if (l = e.fieldValue(u, !0), l && l.constructor == Array) for (a = 0, 
c = l.length; c > a; a++) o.push({
name:s,
value:l[a]
}); else null !== l && "undefined" != typeof l && o.push({
name:s,
value:l
});
if (!t && n.clk) {
var p = e(n.clk), h = p[0];
s = h.name, s && !h.disabled && "image" == h.type && (o.push({
name:s,
value:p.val()
}), o.push({
name:s + ".x",
value:n.clk_x
}, {
name:s + ".y",
value:n.clk_y
}));
}
return o;
}, e.fn.formSerialize = function(t) {
return e.param(this.formToArray(t));
}, e.fn.fieldSerialize = function(t) {
var o = [];
return this.each(function() {
var n = this.name;
if (n) {
var r = e.fieldValue(this, t);
if (r && r.constructor == Array) for (var i = 0, a = r.length; a > i; i++) o.push({
name:n,
value:r[i]
}); else null !== r && "undefined" != typeof r && o.push({
name:this.name,
value:r
});
}
}), e.param(o);
}, e.fn.fieldValue = function(t) {
for (var o = [], n = 0, r = this.length; r > n; n++) {
var i = this[n], a = e.fieldValue(i, t);
null === a || "undefined" == typeof a || a.constructor == Array && !a.length || (a.constructor == Array ? e.merge(o, a) :o.push(a));
}
return o;
}, e.fieldValue = function(t, o) {
var n = t.name, r = t.type, i = t.tagName.toLowerCase();
if (void 0 === o && (o = !0), o && (!n || t.disabled || "reset" == r || "button" == r || ("checkbox" == r || "radio" == r) && !t.checked || ("submit" == r || "image" == r) && t.form && t.form.clk != t || "select" == i && -1 == t.selectedIndex)) return null;
if ("select" == i) {
var a = t.selectedIndex;
if (0 > a) return null;
for (var s = [], l = t.options, u = "select-one" == r, d = u ? a + 1 :l.length, c = u ? a :0; d > c; c++) {
var p = l[c];
if (p.selected) {
var h = p.value;
if (h || (h = p.attributes && p.attributes.value && !p.attributes.value.specified ? p.text :p.value), 
u) return h;
s.push(h);
}
}
return s;
}
return e(t).val();
}, e.fn.clearForm = function() {
return this.each(function() {
e("input,select,textarea", this).clearFields();
});
}, e.fn.clearFields = e.fn.clearInputs = function() {
var e = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
return this.each(function() {
var t = this.type, o = this.tagName.toLowerCase();
e.test(t) || "textarea" == o ? this.value = "" :"checkbox" == t || "radio" == t ? this.checked = !1 :"select" == o && (this.selectedIndex = -1);
});
}, e.fn.resetForm = function() {
return this.each(function() {
("function" == typeof this.reset || "object" == typeof this.reset && !this.reset.nodeType) && this.reset();
});
}, e.fn.enable = function(e) {
return void 0 === e && (e = !0), this.each(function() {
this.disabled = !e;
});
}, e.fn.selected = function(t) {
return void 0 === t && (t = !0), this.each(function() {
var o = this.type;
if ("checkbox" == o || "radio" == o) this.checked = t; else if ("option" == this.tagName.toLowerCase()) {
var n = e(this).parent("select");
t && n[0] && "select-one" == n[0].type && n.find("option").selected(!1), this.selected = t;
}
});
};
}(jQuery), +function(e) {
"use strict";
var t = function(e, t) {
this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, 
this.init("tooltip", e, t);
};
t.DEFAULTS = {
animation:!0,
placement:"top",
selector:!1,
template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
trigger:"hover focus",
title:"",
delay:0,
html:!1,
container:"body",
callback:function() {}
}, t.prototype.init = function(t, o, n) {
this.enabled = !0, this.type = t, this.$element = e(o), this.options = this.getOptions(n);
for (var r = this.options.trigger.split(" "), i = r.length; i--; ) {
var a = r[i];
if ("click" == a) this.$element.on("click." + this.type, this.options.selector, e.proxy(this.toggle, this)); else if ("manual" != a) {
var s = "hover" == a ? "mouseenter" :"focus", l = "hover" == a ? "mouseleave" :"blur";
this.$element.on(s + "." + this.type, this.options.selector, e.proxy(this.enter, this)), 
this.$element.on(l + "." + this.type, this.options.selector, e.proxy(this.leave, this));
}
}
this.options.selector ? this._options = e.extend({}, this.options, {
trigger:"manual",
selector:""
}) :this.fixTitle();
}, t.prototype.getDefaults = function() {
return t.DEFAULTS;
}, t.prototype.getOptions = function(t) {
return t = e.extend({}, this.getDefaults(), this.$element.data(), t), t.delay && "number" == typeof t.delay && (t.delay = {
show:t.delay,
hide:t.delay
}), t;
}, t.prototype.getDelegateOptions = function() {
var t = {}, o = this.getDefaults();
return this._options && e.each(this._options, function(e, n) {
o[e] != n && (t[e] = n);
}), t;
}, t.prototype.enter = function(t) {
var o = t instanceof this.constructor ? t :e(t.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
return clearTimeout(o.timeout), o.hoverState = "in", o.options.delay && o.options.delay.show ? (o.timeout = setTimeout(function() {
"in" == o.hoverState && o.show();
}, o.options.delay.show), void 0) :o.show();
}, t.prototype.leave = function(t) {
var o = t instanceof this.constructor ? t :e(t.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
return clearTimeout(o.timeout), o.hoverState = "out", o.options.delay && o.options.delay.hide ? (o.timeout = setTimeout(function() {
"out" == o.hoverState && o.hide();
}, o.options.delay.hide), void 0) :o.hide();
}, t.prototype.show = function() {
var t = e.Event("show.bs." + this.type);
if (this.hasContent() && this.enabled) {
if (this.$element.trigger(t), t.isDefaultPrevented()) return;
var o = this.tip();
this.setContent(), this.options.animation && o.addClass("fade");
var n = "function" == typeof this.options.placement ? this.options.placement.call(this, o[0], this.$element[0]) :this.options.placement, r = /\s?auto?\s?/i, i = r.test(n);
i && (n = n.replace(r, "") || "top"), o.detach().css({
top:0,
left:0,
display:"block"
}).addClass(n), this.options.container ? o.appendTo(this.options.container) :o.insertAfter(this.$element);
var a = this.getPosition(), s = o[0].offsetWidth, l = o[0].offsetHeight;
if (i) {
var u = this.$element.parent(), d = n, c = document.documentElement.scrollTop || document.body.scrollTop, p = "body" == this.options.container ? window.innerWidth :u.outerWidth(), h = "body" == this.options.container ? window.innerHeight :u.outerHeight(), g = "body" == this.options.container ? 0 :u.offset().left;
n = "bottom" == n && a.top + a.height + l - c > h ? "top" :"top" == n && a.top - c - l < 0 ? "bottom" :"right" == n && a.right + s > p ? "left" :"left" == n && a.left - s < g ? "right" :n, 
o.removeClass(d).addClass(n);
}
var m = this.getCalculatedOffset(n, a, s, l);
this.applyPlacement(m, n), this.$element.trigger("shown.bs." + this.type), "function" == typeof this.options.callback && this.options.callback.call(this.$element, this.tip());
}
}, t.prototype.applyPlacement = function(e, t) {
var o, n = this.tip(), r = n[0].offsetWidth, i = n[0].offsetHeight, a = parseInt(n.css("margin-top"), 10), s = parseInt(n.css("margin-left"), 10);
isNaN(a) && (a = 0), isNaN(s) && (s = 0), e.top = e.top + a, e.left = e.left + s, 
n.offset(e).addClass("in");
var l = n[0].offsetWidth, u = n[0].offsetHeight;
if ("top" == t && u != i && (o = !0, e.top = e.top + i - u), /bottom|top/.test(t)) {
var d = 0;
e.left < 0 && (d = -2 * e.left, e.left = 0, n.offset(e), l = n[0].offsetWidth, u = n[0].offsetHeight), 
this.replaceArrow(d - r + l, l, "left");
} else this.replaceArrow(u - i, u, "top");
o && n.offset(e);
}, t.prototype.replaceArrow = function(e, t, o) {
this.arrow().css(o, e ? 50 * (1 - e / t) + "%" :"");
}, t.prototype.setContent = function() {
var e = this.tip(), t = this.getTitle();
e.find(".tooltip-inner")[this.options.html ? "html" :"text"](t), e.removeClass("fade in top bottom left right");
}, t.prototype.hide = function() {
function t() {
"in" != o.hoverState && n.detach();
}
var o = this, n = this.tip(), r = e.Event("hide.bs." + this.type);
return this.$element.trigger(r), n.hide(), r.isDefaultPrevented() ? void 0 :(n.removeClass("in"), 
e.support.transition && this.$tip.hasClass("fade") ? n.one(e.support.transition.end, t).emulateTransitionEnd(150) :t(), 
this.$element.trigger("hidden.bs." + this.type), this);
}, t.prototype.fixTitle = function() {
var e = this.$element;
(e.attr("title") || "string" != typeof e.attr("data-original-title")) && e.attr("data-original-title", e.attr("title") || "").attr("title", "");
}, t.prototype.hasContent = function() {
return this.getTitle();
}, t.prototype.getPosition = function() {
var t = this.$element[0];
return e.extend({}, "function" == typeof t.getBoundingClientRect ? t.getBoundingClientRect() :{
width:t.offsetWidth,
height:t.offsetHeight
}, this.$element.offset());
}, t.prototype.getCalculatedOffset = function(e, t, o, n) {
return "bottom" == e ? {
top:t.top + t.height,
left:t.left + t.width / 2 - o / 2
} :"top" == e ? {
top:t.top - n,
left:t.left + t.width / 2 - o / 2
} :"left" == e ? {
top:t.top + t.height / 2 - n / 2,
left:t.left - o
} :{
top:t.top + t.height / 2 - n / 2,
left:t.left + t.width
};
}, t.prototype.getTitle = function() {
var e, t = this.$element, o = this.options;
return e = "function" == typeof o.title ? o.title.call(t[0]) :t.attr("data-original-title") || o.title;
}, t.prototype.tip = function() {
return this.$tip = this.$tip || e(this.options.template);
}, t.prototype.arrow = function() {
return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
}, t.prototype.validate = function() {
this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null);
}, t.prototype.enable = function() {
this.enabled = !0;
}, t.prototype.disable = function() {
this.enabled = !1;
}, t.prototype.toggleEnabled = function() {
this.enabled = !this.enabled;
}, t.prototype.toggle = function(t) {
var o = t ? e(t.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type) :this;
o.tip().hasClass("in") ? o.leave(o) :o.enter(o);
}, t.prototype.destroy = function() {
this.hide().$element.off("." + this.type).removeData("bs." + this.type);
};
var o = e.fn.tooltip;
e.fn.tooltip = function(o) {
return this.each(function() {
var n = e(this), r = n.data("bs.tooltip"), i = "object" == typeof o && o;
r || n.data("bs.tooltip", r = new t(this, i)), "string" == typeof o && r[o]();
});
}, e.fn.tooltip.Constructor = t, e.fn.tooltip.noConflict = function() {
return e.fn.tooltip = o, this;
};
}(jQuery), /* ========================================================================
 * Bootstrap: popover.js v3.0.3
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */
+function(e) {
"use strict";
var t = function(e, t) {
this.init("popover", e, t);
};
if (!e.fn.tooltip) throw new Error("Popover requires tooltip.js");
t.DEFAULTS = e.extend({}, e.fn.tooltip.Constructor.DEFAULTS, {
placement:"right",
trigger:"click",
content:"",
template:'<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
}), t.prototype = e.extend({}, e.fn.tooltip.Constructor.prototype), t.prototype.constructor = t, 
t.prototype.getDefaults = function() {
return t.DEFAULTS;
}, t.prototype.setContent = function() {
var e = this.tip(), t = this.getTitle(), o = this.getContent();
e.find(".popover-title")[this.options.html ? "html" :"text"](t), e.find(".popover-content")[this.options.html ? "html" :"text"](o), 
e.removeClass("fade top bottom left right in"), e.find(".popover-title").html() || e.find(".popover-title").hide();
}, t.prototype.hasContent = function() {
return this.getTitle() || this.getContent();
}, t.prototype.getContent = function() {
var e = this.$element, t = this.options;
return e.attr("data-content") || ("function" == typeof t.content ? t.content.call(e[0]) :t.content);
}, t.prototype.arrow = function() {
return this.$arrow = this.$arrow || this.tip().find(".arrow");
}, t.prototype.tip = function() {
return this.$tip || (this.$tip = e(this.options.template)), this.$tip;
};
var o = e.fn.popover;
e.fn.popover = function(o) {
return this.each(function() {
var n = e(this), r = n.data("bs.popover"), i = "object" == typeof o && o;
r || n.data("bs.popover", r = new t(this, i)), "string" == typeof o && r[o]();
});
}, e.fn.popover.Constructor = t, e.fn.popover.noConflict = function() {
return e.fn.popover = o, this;
};
}(jQuery), /*!
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
// Copyright (c) 2010 "Cowboy" Ben Alman,
function(e, t, o) {
"$:nomunge";
function n(e) {
return e = e || location.href, "#" + e.replace(/^[^#]*#?(.*)$/, "$1");
}
var r, i = "hashchange", a = document, s = e.event.special, l = a.documentMode, u = "on" + i in t && (l === o || l > 7);
e.fn[i] = function(e) {
return e ? this.bind(i, e) :this.trigger(i);
}, e.fn[i].delay = 50, s[i] = e.extend(s[i], {
setup:function() {
return u ? !1 :(e(r.start), void 0);
},
teardown:function() {
return u ? !1 :(e(r.stop), void 0);
}
}), r = function() {
function r() {
var o = n(), a = h(d);
o !== d ? (p(d = o, a), e(t).trigger(i)) :a !== d && (location.href = location.href.replace(/#.*/, "") + a), 
s = setTimeout(r, e.fn[i].delay);
}
var s, l = {}, d = n(), c = function(e) {
return e;
}, p = c, h = c;
return l.start = function() {
s || r();
}, l.stop = function() {
s && clearTimeout(s), s = o;
}, e.browser.msie && !u && function() {
var t, o;
l.start = function() {
t || (o = e.fn[i].src, o = o && o + n(), t = e('<iframe tabindex="-1" title="empty"/>').hide().one("load", function() {
o || p(n()), r();
}).attr("src", o || "javascript:void(0)").insertAfter("body")[0].contentWindow, 
a.onpropertychange = function() {
try {
"title" === event.propertyName && (t.document.title = a.title);
} catch (e) {}
});
}, l.stop = c, h = function() {
return n(t.location.href);
}, p = function(o, n) {
var r = t.document, s = e.fn[i].domain;
o !== n && (r.title = a.title, r.open(), s && r.write('<script>document.domain="' + s + '"</script>'), 
r.close(), t.location.hash = o);
};
}(), l;
}();
}(jQuery, this), !function(e) {
var t = "waitForImages";
e.waitForImages = {
hasImageProperties:[ "backgroundImage", "listStyleImage", "borderImage", "borderCornerImage", "cursor" ]
}, e.expr[":"].uncached = function(t) {
if (!e(t).is('img[src!=""]')) return !1;
var o = new Image();
return o.src = t.src, !o.complete;
}, e.fn.waitForImages = function(o, n, r) {
var i = 0, a = 0;
if (e.isPlainObject(arguments[0]) && (r = arguments[0].waitForAll, n = arguments[0].each, 
o = arguments[0].finished), o = o || e.noop, n = n || e.noop, r = !!r, !e.isFunction(o) || !e.isFunction(n)) throw new TypeError("An invalid callback was supplied.");
return this.each(function() {
var s = e(this), l = [], u = e.waitForImages.hasImageProperties || [], d = /url\(\s*(['"]?)(.*?)\1\s*\)/g;
r ? s.find("*").addBack().each(function() {
var t = e(this);
t.is("img:uncached") && l.push({
src:t.attr("src"),
element:t[0]
}), e.each(u, function(e, o) {
var n, r = t.css(o);
if (!r) return !0;
for (;n = d.exec(r); ) l.push({
src:n[2],
element:t[0]
});
});
}) :s.find("img:uncached").each(function() {
l.push({
src:this.src,
element:this
});
}), i = l.length, a = 0, 0 === i && o.call(s[0]), e.each(l, function(r, l) {
var u = new Image();
e(u).on("load." + t + " error." + t, function(e) {
return a++, n.call(l.element, a, i, "load" == e.type), a == i ? (o.call(s[0]), !1) :void 0;
}), u.src = l.src;
});
});
};
}(jQuery), /*
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2013 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.8.5
 *
 */
function(e, t, o, n) {
var r = e(t);
e.fn.lazyload = function(i) {
function a() {
var t = 0;
l.each(function() {
var o = e(this);
if (!u.skip_invisible || o.is(":visible")) if (e.abovethetop(this, u) || e.leftofbegin(this, u)) ; else if (e.belowthefold(this, u) || e.rightoffold(this, u)) {
if (++t > u.failure_limit) return !1;
} else o.trigger("appear"), t = 0;
});
}
var s, l = this, u = {
threshold:0,
failure_limit:0,
event:"scroll",
effect:"show",
container:t,
data_attribute:"original",
skip_invisible:!0,
appear:null,
load:null
};
return i && (n !== i.failurelimit && (i.failure_limit = i.failurelimit, delete i.failurelimit), 
n !== i.effectspeed && (i.effect_speed = i.effectspeed, delete i.effectspeed), e.extend(u, i)), 
s = u.container === n || u.container === t ? r :e(u.container), 0 === u.event.indexOf("scroll") && s.bind(u.event, function() {
return a();
}), this.each(function() {
var t = this, o = e(t);
t.loaded = !1, o.one("appear", function() {
if (!this.loaded) {
if (u.appear) {
var n = l.length;
u.appear.call(t, n, u);
}
if (o.data("background")) {
var r = o.data("background");
o.css("backgroundImage", "url(" + r + ")");
} else {
var r = o.data(u.data_attribute);
e("<img />").bind("load", function() {
o.hide().attr("src", r).on("load", function() {
o.trigger("afterAppear");
}), o[u.effect](u.effect_speed), t.loaded = !0;
var n = e.grep(l, function(e) {
return !e.loaded;
});
if (l = e(n), u.load) {
var i = l.length;
u.load.call(t, i, u);
}
}).attr("src", r);
}
}
}), 0 !== u.event.indexOf("scroll") && o.bind(u.event, function() {
t.loaded || o.trigger("appear");
});
}), r.bind("resize", function() {
a();
}), /iphone|ipod|ipad.*os 5/gi.test(navigator.appVersion) && r.bind("pageshow", function(t) {
t.originalEvent && t.originalEvent.persisted && l.each(function() {
e(this).trigger("appear");
});
}), e(o).ready(function() {
a();
}), this;
}, e.belowthefold = function(o, i) {
var a;
return a = i.container === n || i.container === t ? r.height() + r.scrollTop() :e(i.container).offset().top + e(i.container).height(), 
a <= e(o).offset().top - i.threshold;
}, e.rightoffold = function(o, i) {
var a;
return a = i.container === n || i.container === t ? r.width() + r.scrollLeft() :e(i.container).offset().left + e(i.container).width(), 
a <= e(o).offset().left - i.threshold;
}, e.abovethetop = function(o, i) {
var a;
return a = i.container === n || i.container === t ? r.scrollTop() :e(i.container).offset().top, 
a >= e(o).offset().top + i.threshold + e(o).height();
}, e.leftofbegin = function(o, i) {
var a;
return a = i.container === n || i.container === t ? r.scrollLeft() :e(i.container).offset().left, 
a >= e(o).offset().left + i.threshold + e(o).width();
}, e.inviewport = function(t, o) {
return !(e.rightoffold(t, o) || e.leftofbegin(t, o) || e.belowthefold(t, o) || e.abovethetop(t, o));
}, e.extend(e.expr[":"], {
"below-the-fold":function(t) {
return e.belowthefold(t, {
threshold:0
});
},
"above-the-top":function(t) {
return !e.belowthefold(t, {
threshold:0
});
},
"right-of-screen":function(t) {
return e.rightoffold(t, {
threshold:0
});
},
"left-of-screen":function(t) {
return !e.rightoffold(t, {
threshold:0
});
},
"in-viewport":function(t) {
return e.inviewport(t, {
threshold:0
});
},
"above-the-fold":function(t) {
return !e.belowthefold(t, {
threshold:0
});
},
"right-of-fold":function(t) {
return e.rightoffold(t, {
threshold:0
});
},
"left-of-fold":function(t) {
return !e.rightoffold(t, {
threshold:0
});
}
});
}(jQuery, window, document), function(e) {
"function" == typeof define && define.amd ? define(e) :window.purl = e();
}(function() {
function e(e, t) {
for (var o = decodeURI(e), n = m[t ? "strict" :"loose"].exec(o), r = {
attr:{},
param:{},
seg:{}
}, a = 14; a--; ) r.attr[h[a]] = n[a] || "";
return r.param.query = i(r.attr.query), r.param.fragment = i(r.attr.fragment), r.seg.path = r.attr.path.replace(/^\/+|\/+$/g, "").split("/"), 
r.seg.fragment = r.attr.fragment.replace(/^\/+|\/+$/g, "").split("/"), r.attr.base = r.attr.host ? (r.attr.protocol ? r.attr.protocol + "://" + r.attr.host :r.attr.host) + (r.attr.port ? ":" + r.attr.port :"") :"", 
r;
}
function t(e) {
var t = e.tagName;
return "undefined" != typeof t ? p[t.toLowerCase()] :t;
}
function o(e, t) {
if (0 === e[t].length) return e[t] = {};
var o = {};
for (var n in e[t]) o[n] = e[t][n];
return e[t] = o, o;
}
function n(e, t, r, i) {
var a = e.shift();
if (a) {
var s = t[r] = t[r] || [];
"]" == a ? u(s) ? "" !== i && s.push(i) :"object" == typeof s ? s[d(s).length] = i :s = t[r] = [ t[r], i ] :~a.indexOf("]") ? (a = a.substr(0, a.length - 1), 
!f.test(a) && u(s) && (s = o(t, r)), n(e, s, a, i)) :(!f.test(a) && u(s) && (s = o(t, r)), 
n(e, s, a, i));
} else u(t[r]) ? t[r].push(i) :t[r] = "object" == typeof t[r] ? i :"undefined" == typeof t[r] ? i :[ t[r], i ];
}
function r(e, t, o) {
if (~t.indexOf("]")) {
var r = t.split("[");
n(r, e, "base", o);
} else {
if (!f.test(t) && u(e.base)) {
var i = {};
for (var s in e.base) i[s] = e.base[s];
e.base = i;
}
"" !== t && a(e.base, t, o);
}
return e;
}
function i(e) {
return l(String(e).split(/&|;/), function(e, t) {
try {
t = decodeURIComponent(t.replace(/\+/g, " "));
} catch (o) {}
var n = t.indexOf("="), i = s(t), a = t.substr(0, i || n), l = t.substr(i || n, t.length);
return l = l.substr(l.indexOf("=") + 1, l.length), "" === a && (a = t, l = ""), 
r(e, a, l);
}, {
base:{}
}).base;
}
function a(e, t, o) {
var n = e[t];
"undefined" == typeof n ? e[t] = o :u(n) ? n.push(o) :e[t] = [ n, o ];
}
function s(e) {
for (var t, o, n = e.length, r = 0; n > r; ++r) if (o = e[r], "]" == o && (t = !1), 
"[" == o && (t = !0), "=" == o && !t) return r;
}
function l(e, t) {
for (var o = 0, n = e.length >> 0, r = arguments[2]; n > o; ) o in e && (r = t.call(void 0, r, e[o], o, e)), 
++o;
return r;
}
function u(e) {
return "[object Array]" === Object.prototype.toString.call(e);
}
function d(e) {
var t = [];
for (var o in e) e.hasOwnProperty(o) && t.push(o);
return t;
}
function c(t, o) {
return 1 === arguments.length && t === !0 && (o = !0, t = void 0), o = o || !1, 
t = t || window.location.toString(), {
data:e(t, o),
attr:function(e) {
return e = g[e] || e, "undefined" != typeof e ? this.data.attr[e] :this.data.attr;
},
param:function(e) {
return "undefined" != typeof e ? this.data.param.query[e] :this.data.param.query;
},
fparam:function(e) {
return "undefined" != typeof e ? this.data.param.fragment[e] :this.data.param.fragment;
},
segment:function(e) {
return "undefined" == typeof e ? this.data.seg.path :(e = 0 > e ? this.data.seg.path.length + e :e - 1, 
this.data.seg.path[e]);
},
fsegment:function(e) {
return "undefined" == typeof e ? this.data.seg.fragment :(e = 0 > e ? this.data.seg.fragment.length + e :e - 1, 
this.data.seg.fragment[e]);
}
};
}
var p = {
a:"href",
img:"src",
form:"action",
base:"href",
script:"src",
iframe:"src",
link:"href",
embed:"src",
object:"data"
}, h = [ "source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "fragment" ], g = {
anchor:"fragment"
}, m = {
strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
}, f = /^[0-9]+$/;
return c.jQuery = function(e) {
null != e && (e.fn.url = function(o) {
var n = "";
return this.length && (n = e(this).attr(t(this[0])) || ""), c(n, o);
}, e.url = c);
}, c.jQuery(window.jQuery), c;
}), function(e) {
function t() {
return {
empty:!1,
unusedTokens:[],
unusedInput:[],
overflow:-2,
charsLeftOver:0,
nullInput:!1,
invalidMonth:null,
invalidFormat:!1,
userInvalidated:!1,
iso:!1
};
}
function o(e, t) {
function o() {
lt.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + e);
}
var n = !0;
return l(function() {
return n && (o(), n = !1), t.apply(this, arguments);
}, t);
}
function n(e, t) {
return function(o) {
return c(e.call(this, o), t);
};
}
function r(e, t) {
return function(o) {
return this.lang().ordinal(e.call(this, o), t);
};
}
function i() {}
function a(e) {
L(e), l(this, e);
}
function s(e) {
var t = _(e), o = t.year || 0, n = t.quarter || 0, r = t.month || 0, i = t.week || 0, a = t.day || 0, s = t.hour || 0, l = t.minute || 0, u = t.second || 0, d = t.millisecond || 0;
this._milliseconds = +d + 1e3 * u + 6e4 * l + 36e5 * s, this._days = +a + 7 * i, 
this._months = +r + 3 * n + 12 * o, this._data = {}, this._bubble();
}
function l(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
return t.hasOwnProperty("toString") && (e.toString = t.toString), t.hasOwnProperty("valueOf") && (e.valueOf = t.valueOf), 
e;
}
function u(e) {
var t, o = {};
for (t in e) e.hasOwnProperty(t) && kt.hasOwnProperty(t) && (o[t] = e[t]);
return o;
}
function d(e) {
return 0 > e ? Math.ceil(e) :Math.floor(e);
}
function c(e, t, o) {
for (var n = "" + Math.abs(e), r = e >= 0; n.length < t; ) n = "0" + n;
return (r ? o ? "+" :"" :"-") + n;
}
function p(e, t, o, n) {
var r = t._milliseconds, i = t._days, a = t._months;
n = null == n ? !0 :n, r && e._d.setTime(+e._d + r * o), i && nt(e, "Date", ot(e, "Date") + i * o), 
a && tt(e, ot(e, "Month") + a * o), n && lt.updateOffset(e, i || a);
}
function h(e) {
return "[object Array]" === Object.prototype.toString.call(e);
}
function g(e) {
return "[object Date]" === Object.prototype.toString.call(e) || e instanceof Date;
}
function m(e, t, o) {
var n, r = Math.min(e.length, t.length), i = Math.abs(e.length - t.length), a = 0;
for (n = 0; r > n; n++) (o && e[n] !== t[n] || !o && w(e[n]) !== w(t[n])) && a++;
return a + i;
}
function f(e) {
if (e) {
var t = e.toLowerCase().replace(/(.)s$/, "$1");
e = Qt[e] || Xt[t] || t;
}
return e;
}
function _(e) {
var t, o, n = {};
for (o in e) e.hasOwnProperty(o) && (t = f(o), t && (n[t] = e[o]));
return n;
}
function y(t) {
var o, n;
if (0 === t.indexOf("week")) o = 7, n = "day"; else {
if (0 !== t.indexOf("month")) return;
o = 12, n = "month";
}
lt[t] = function(r, i) {
var a, s, l = lt.fn._lang[t], u = [];
if ("number" == typeof r && (i = r, r = e), s = function(e) {
var t = lt().utc().set(n, e);
return l.call(lt.fn._lang, t, r || "");
}, null != i) return s(i);
for (a = 0; o > a; a++) u.push(s(a));
return u;
};
}
function w(e) {
var t = +e, o = 0;
return 0 !== t && isFinite(t) && (o = t >= 0 ? Math.floor(t) :Math.ceil(t)), o;
}
function v(e, t) {
return new Date(Date.UTC(e, t + 1, 0)).getUTCDate();
}
function b(e, t, o) {
return X(lt([ e, 11, 31 + t - o ]), t, o).week;
}
function k(e) {
return M(e) ? 366 :365;
}
function M(e) {
return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0;
}
function L(e) {
var t;
e._a && -2 === e._pf.overflow && (t = e._a[mt] < 0 || e._a[mt] > 11 ? mt :e._a[ft] < 1 || e._a[ft] > v(e._a[gt], e._a[mt]) ? ft :e._a[_t] < 0 || e._a[_t] > 23 ? _t :e._a[yt] < 0 || e._a[yt] > 59 ? yt :e._a[wt] < 0 || e._a[wt] > 59 ? wt :e._a[vt] < 0 || e._a[vt] > 999 ? vt :-1, 
e._pf._overflowDayOfYear && (gt > t || t > ft) && (t = ft), e._pf.overflow = t);
}
function T(e) {
return null == e._isValid && (e._isValid = !isNaN(e._d.getTime()) && e._pf.overflow < 0 && !e._pf.empty && !e._pf.invalidMonth && !e._pf.nullInput && !e._pf.invalidFormat && !e._pf.userInvalidated, 
e._strict && (e._isValid = e._isValid && 0 === e._pf.charsLeftOver && 0 === e._pf.unusedTokens.length)), 
e._isValid;
}
function S(e) {
return e ? e.toLowerCase().replace("_", "-") :e;
}
function D(e, t) {
return t._isUTC ? lt(e).zone(t._offset || 0) :lt(e).local();
}
function Y(e, t) {
return t.abbr = e, bt[e] || (bt[e] = new i()), bt[e].set(t), bt[e];
}
function x(e) {
delete bt[e];
}
function E(e) {
var t, o, n, r, i = 0, a = function(e) {
if (!bt[e] && Mt) try {
require("./lang/" + e);
} catch (t) {}
return bt[e];
};
if (!e) return lt.fn._lang;
if (!h(e)) {
if (o = a(e)) return o;
e = [ e ];
}
for (;i < e.length; ) {
for (r = S(e[i]).split("-"), t = r.length, n = S(e[i + 1]), n = n ? n.split("-") :null; t > 0; ) {
if (o = a(r.slice(0, t).join("-"))) return o;
if (n && n.length >= t && m(r, n, !0) >= t - 1) break;
t--;
}
i++;
}
return lt.fn._lang;
}
function C(e) {
return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") :e.replace(/\\/g, "");
}
function $(e) {
var t, o, n = e.match(Dt);
for (t = 0, o = n.length; o > t; t++) n[t] = oo[n[t]] ? oo[n[t]] :C(n[t]);
return function(r) {
var i = "";
for (t = 0; o > t; t++) i += n[t] instanceof Function ? n[t].call(r, e) :n[t];
return i;
};
}
function I(e, t) {
return e.isValid() ? (t = O(t, e.lang()), Zt[t] || (Zt[t] = $(t)), Zt[t](e)) :e.lang().invalidDate();
}
function O(e, t) {
function o(e) {
return t.longDateFormat(e) || e;
}
var n = 5;
for (Yt.lastIndex = 0; n >= 0 && Yt.test(e); ) e = e.replace(Yt, o), Yt.lastIndex = 0, 
n -= 1;
return e;
}
function j(e, t) {
var o, n = t._strict;
switch (e) {
case "Q":
return Nt;

case "DDDD":
return Ft;

case "YYYY":
case "GGGG":
case "gggg":
return n ? Pt :Ct;

case "Y":
case "G":
case "g":
return Wt;

case "YYYYYY":
case "YYYYY":
case "GGGGG":
case "ggggg":
return n ? Rt :$t;

case "S":
if (n) return Nt;

case "SS":
if (n) return zt;

case "SSS":
if (n) return Ft;

case "DDD":
return Et;

case "MMM":
case "MMMM":
case "dd":
case "ddd":
case "dddd":
return Ot;

case "a":
case "A":
return E(t._l)._meridiemParse;

case "X":
return Bt;

case "Z":
case "ZZ":
return jt;

case "T":
return At;

case "SSSS":
return It;

case "MM":
case "DD":
case "YY":
case "GG":
case "gg":
case "HH":
case "hh":
case "mm":
case "ss":
case "ww":
case "WW":
return n ? zt :xt;

case "M":
case "D":
case "d":
case "H":
case "h":
case "m":
case "s":
case "w":
case "W":
case "e":
case "E":
return xt;

case "Do":
return Ht;

default:
return o = new RegExp(R(P(e.replace("\\", "")), "i"));
}
}
function A(e) {
e = e || "";
var t = e.match(jt) || [], o = t[t.length - 1] || [], n = (o + "").match(Jt) || [ "-", 0, 0 ], r = +(60 * n[1]) + w(n[2]);
return "+" === n[0] ? -r :r;
}
function B(e, t, o) {
var n, r = o._a;
switch (e) {
case "Q":
null != t && (r[mt] = 3 * (w(t) - 1));
break;

case "M":
case "MM":
null != t && (r[mt] = w(t) - 1);
break;

case "MMM":
case "MMMM":
n = E(o._l).monthsParse(t), null != n ? r[mt] = n :o._pf.invalidMonth = t;
break;

case "D":
case "DD":
null != t && (r[ft] = w(t));
break;

case "Do":
null != t && (r[ft] = w(parseInt(t, 10)));
break;

case "DDD":
case "DDDD":
null != t && (o._dayOfYear = w(t));
break;

case "YY":
r[gt] = lt.parseTwoDigitYear(t);
break;

case "YYYY":
case "YYYYY":
case "YYYYYY":
r[gt] = w(t);
break;

case "a":
case "A":
o._isPm = E(o._l).isPM(t);
break;

case "H":
case "HH":
case "h":
case "hh":
r[_t] = w(t);
break;

case "m":
case "mm":
r[yt] = w(t);
break;

case "s":
case "ss":
r[wt] = w(t);
break;

case "S":
case "SS":
case "SSS":
case "SSSS":
r[vt] = w(1e3 * ("0." + t));
break;

case "X":
o._d = new Date(1e3 * parseFloat(t));
break;

case "Z":
case "ZZ":
o._useUTC = !0, o._tzm = A(t);
break;

case "w":
case "ww":
case "W":
case "WW":
case "d":
case "dd":
case "ddd":
case "dddd":
case "e":
case "E":
e = e.substr(0, 1);

case "gg":
case "gggg":
case "GG":
case "GGGG":
case "GGGGG":
e = e.substr(0, 2), t && (o._w = o._w || {}, o._w[e] = t);
}
}
function H(e) {
var t, o, n, r, i, a, s, l, u, d, c = [];
if (!e._d) {
for (n = z(e), e._w && null == e._a[ft] && null == e._a[mt] && (i = function(t) {
var o = parseInt(t, 10);
return t ? t.length < 3 ? o > 68 ? 1900 + o :2e3 + o :o :null == e._a[gt] ? lt().weekYear() :e._a[gt];
}, a = e._w, null != a.GG || null != a.W || null != a.E ? s = Z(i(a.GG), a.W || 1, a.E, 4, 1) :(l = E(e._l), 
u = null != a.d ? J(a.d, l) :null != a.e ? parseInt(a.e, 10) + l._week.dow :0, d = parseInt(a.w, 10) || 1, 
null != a.d && u < l._week.dow && d++, s = Z(i(a.gg), d, u, l._week.doy, l._week.dow)), 
e._a[gt] = s.year, e._dayOfYear = s.dayOfYear), e._dayOfYear && (r = null == e._a[gt] ? n[gt] :e._a[gt], 
e._dayOfYear > k(r) && (e._pf._overflowDayOfYear = !0), o = G(r, 0, e._dayOfYear), 
e._a[mt] = o.getUTCMonth(), e._a[ft] = o.getUTCDate()), t = 0; 3 > t && null == e._a[t]; ++t) e._a[t] = c[t] = n[t];
for (;7 > t; t++) e._a[t] = c[t] = null == e._a[t] ? 2 === t ? 1 :0 :e._a[t];
c[_t] += w((e._tzm || 0) / 60), c[yt] += w((e._tzm || 0) % 60), e._d = (e._useUTC ? G :V).apply(null, c);
}
}
function N(e) {
var t;
e._d || (t = _(e._i), e._a = [ t.year, t.month, t.day, t.hour, t.minute, t.second, t.millisecond ], 
H(e));
}
function z(e) {
var t = new Date();
return e._useUTC ? [ t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate() ] :[ t.getFullYear(), t.getMonth(), t.getDate() ];
}
function F(e) {
e._a = [], e._pf.empty = !0;
var t, o, n, r, i, a = E(e._l), s = "" + e._i, l = s.length, u = 0;
for (n = O(e._f, a).match(Dt) || [], t = 0; t < n.length; t++) r = n[t], o = (s.match(j(r, e)) || [])[0], 
o && (i = s.substr(0, s.indexOf(o)), i.length > 0 && e._pf.unusedInput.push(i), 
s = s.slice(s.indexOf(o) + o.length), u += o.length), oo[r] ? (o ? e._pf.empty = !1 :e._pf.unusedTokens.push(r), 
B(r, o, e)) :e._strict && !o && e._pf.unusedTokens.push(r);
e._pf.charsLeftOver = l - u, s.length > 0 && e._pf.unusedInput.push(s), e._isPm && e._a[_t] < 12 && (e._a[_t] += 12), 
e._isPm === !1 && 12 === e._a[_t] && (e._a[_t] = 0), H(e), L(e);
}
function P(e) {
return e.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(e, t, o, n, r) {
return t || o || n || r;
});
}
function R(e) {
return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
function W(e) {
var o, n, r, i, a;
if (0 === e._f.length) return e._pf.invalidFormat = !0, void (e._d = new Date(0/0));
for (i = 0; i < e._f.length; i++) a = 0, o = l({}, e), o._pf = t(), o._f = e._f[i], 
F(o), T(o) && (a += o._pf.charsLeftOver, a += 10 * o._pf.unusedTokens.length, o._pf.score = a, 
(null == r || r > a) && (r = a, n = o));
l(e, n || o);
}
function q(e) {
var t, o, n = e._i, r = qt.exec(n);
if (r) {
for (e._pf.iso = !0, t = 0, o = Vt.length; o > t; t++) if (Vt[t][1].exec(n)) {
e._f = Vt[t][0] + (r[6] || " ");
break;
}
for (t = 0, o = Gt.length; o > t; t++) if (Gt[t][1].exec(n)) {
e._f += Gt[t][0];
break;
}
n.match(jt) && (e._f += "Z"), F(e);
} else lt.createFromInputFallback(e);
}
function U(t) {
var o = t._i, n = Lt.exec(o);
o === e ? t._d = new Date() :n ? t._d = new Date(+n[1]) :"string" == typeof o ? q(t) :h(o) ? (t._a = o.slice(0), 
H(t)) :g(o) ? t._d = new Date(+o) :"object" == typeof o ? N(t) :"number" == typeof o ? t._d = new Date(o) :lt.createFromInputFallback(t);
}
function V(e, t, o, n, r, i, a) {
var s = new Date(e, t, o, n, r, i, a);
return 1970 > e && s.setFullYear(e), s;
}
function G(e) {
var t = new Date(Date.UTC.apply(null, arguments));
return 1970 > e && t.setUTCFullYear(e), t;
}
function J(e, t) {
if ("string" == typeof e) if (isNaN(e)) {
if (e = t.weekdaysParse(e), "number" != typeof e) return null;
} else e = parseInt(e, 10);
return e;
}
function K(e, t, o, n, r) {
return r.relativeTime(t || 1, !!o, e, n);
}
function Q(e, t, o) {
var n = ht(Math.abs(e) / 1e3), r = ht(n / 60), i = ht(r / 60), a = ht(i / 24), s = ht(a / 365), l = 45 > n && [ "s", n ] || 1 === r && [ "m" ] || 45 > r && [ "mm", r ] || 1 === i && [ "h" ] || 22 > i && [ "hh", i ] || 1 === a && [ "d" ] || 25 >= a && [ "dd", a ] || 45 >= a && [ "M" ] || 345 > a && [ "MM", ht(a / 30) ] || 1 === s && [ "y" ] || [ "yy", s ];
return l[2] = t, l[3] = e > 0, l[4] = o, K.apply({}, l);
}
function X(e, t, o) {
var n, r = o - t, i = o - e.day();
return i > r && (i -= 7), r - 7 > i && (i += 7), n = lt(e).add("d", i), {
week:Math.ceil(n.dayOfYear() / 7),
year:n.year()
};
}
function Z(e, t, o, n, r) {
var i, a, s = G(e, 0, 1).getUTCDay();
return o = null != o ? o :r, i = r - s + (s > n ? 7 :0) - (r > s ? 7 :0), a = 7 * (t - 1) + (o - r) + i + 1, 
{
year:a > 0 ? e :e - 1,
dayOfYear:a > 0 ? a :k(e - 1) + a
};
}
function et(t) {
var o = t._i, n = t._f;
return null === o || n === e && "" === o ? lt.invalid({
nullInput:!0
}) :("string" == typeof o && (t._i = o = E().preparse(o)), lt.isMoment(o) ? (t = u(o), 
t._d = new Date(+o._d)) :n ? h(n) ? W(t) :F(t) :U(t), new a(t));
}
function tt(e, t) {
var o;
return "string" == typeof t && (t = e.lang().monthsParse(t), "number" != typeof t) ? e :(o = Math.min(e.date(), v(e.year(), t)), 
e._d["set" + (e._isUTC ? "UTC" :"") + "Month"](t, o), e);
}
function ot(e, t) {
return e._d["get" + (e._isUTC ? "UTC" :"") + t]();
}
function nt(e, t, o) {
return "Month" === t ? tt(e, o) :e._d["set" + (e._isUTC ? "UTC" :"") + t](o);
}
function rt(e, t) {
return function(o) {
return null != o ? (nt(this, e, o), lt.updateOffset(this, t), this) :ot(this, e);
};
}
function it(e) {
lt.duration.fn[e] = function() {
return this._data[e];
};
}
function at(e, t) {
lt.duration.fn["as" + e] = function() {
return +this / t;
};
}
function st(e) {
"undefined" == typeof ender && (ut = pt.moment, pt.moment = e ? o("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.", lt) :lt);
}
for (var lt, ut, dt, ct = "2.6.0", pt = "undefined" != typeof global ? global :this, ht = Math.round, gt = 0, mt = 1, ft = 2, _t = 3, yt = 4, wt = 5, vt = 6, bt = {}, kt = {
_isAMomentObject:null,
_i:null,
_f:null,
_l:null,
_strict:null,
_isUTC:null,
_offset:null,
_pf:null,
_lang:null
}, Mt = "undefined" != typeof module && module.exports, Lt = /^\/?Date\((\-?\d+)/i, Tt = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/, St = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/, Dt = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g, Yt = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g, xt = /\d\d?/, Et = /\d{1,3}/, Ct = /\d{1,4}/, $t = /[+\-]?\d{1,6}/, It = /\d+/, Ot = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, jt = /Z|[\+\-]\d\d:?\d\d/gi, At = /T/i, Bt = /[\+\-]?\d+(\.\d{1,3})?/, Ht = /\d{1,2}/, Nt = /\d/, zt = /\d\d/, Ft = /\d{3}/, Pt = /\d{4}/, Rt = /[+-]?\d{6}/, Wt = /[+-]?\d+/, qt = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, Ut = "YYYY-MM-DDTHH:mm:ssZ", Vt = [ [ "YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/ ], [ "YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/ ], [ "GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/ ], [ "GGGG-[W]WW", /\d{4}-W\d{2}/ ], [ "YYYY-DDD", /\d{4}-\d{3}/ ] ], Gt = [ [ "HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/ ], [ "HH:mm:ss", /(T| )\d\d:\d\d:\d\d/ ], [ "HH:mm", /(T| )\d\d:\d\d/ ], [ "HH", /(T| )\d\d/ ] ], Jt = /([\+\-]|\d\d)/gi, Kt = ("Date|Hours|Minutes|Seconds|Milliseconds".split("|"), 
{
Milliseconds:1,
Seconds:1e3,
Minutes:6e4,
Hours:36e5,
Days:864e5,
Months:2592e6,
Years:31536e6
}), Qt = {
ms:"millisecond",
s:"second",
m:"minute",
h:"hour",
d:"day",
D:"date",
w:"week",
W:"isoWeek",
M:"month",
Q:"quarter",
y:"year",
DDD:"dayOfYear",
e:"weekday",
E:"isoWeekday",
gg:"weekYear",
GG:"isoWeekYear"
}, Xt = {
dayofyear:"dayOfYear",
isoweekday:"isoWeekday",
isoweek:"isoWeek",
weekyear:"weekYear",
isoweekyear:"isoWeekYear"
}, Zt = {}, eo = "DDD w W M D d".split(" "), to = "M D H h m s w W".split(" "), oo = {
M:function() {
return this.month() + 1;
},
MMM:function(e) {
return this.lang().monthsShort(this, e);
},
MMMM:function(e) {
return this.lang().months(this, e);
},
D:function() {
return this.date();
},
DDD:function() {
return this.dayOfYear();
},
d:function() {
return this.day();
},
dd:function(e) {
return this.lang().weekdaysMin(this, e);
},
ddd:function(e) {
return this.lang().weekdaysShort(this, e);
},
dddd:function(e) {
return this.lang().weekdays(this, e);
},
w:function() {
return this.week();
},
W:function() {
return this.isoWeek();
},
YY:function() {
return c(this.year() % 100, 2);
},
YYYY:function() {
return c(this.year(), 4);
},
YYYYY:function() {
return c(this.year(), 5);
},
YYYYYY:function() {
var e = this.year(), t = e >= 0 ? "+" :"-";
return t + c(Math.abs(e), 6);
},
gg:function() {
return c(this.weekYear() % 100, 2);
},
gggg:function() {
return c(this.weekYear(), 4);
},
ggggg:function() {
return c(this.weekYear(), 5);
},
GG:function() {
return c(this.isoWeekYear() % 100, 2);
},
GGGG:function() {
return c(this.isoWeekYear(), 4);
},
GGGGG:function() {
return c(this.isoWeekYear(), 5);
},
e:function() {
return this.weekday();
},
E:function() {
return this.isoWeekday();
},
a:function() {
return this.lang().meridiem(this.hours(), this.minutes(), !0);
},
A:function() {
return this.lang().meridiem(this.hours(), this.minutes(), !1);
},
H:function() {
return this.hours();
},
h:function() {
return this.hours() % 12 || 12;
},
m:function() {
return this.minutes();
},
s:function() {
return this.seconds();
},
S:function() {
return w(this.milliseconds() / 100);
},
SS:function() {
return c(w(this.milliseconds() / 10), 2);
},
SSS:function() {
return c(this.milliseconds(), 3);
},
SSSS:function() {
return c(this.milliseconds(), 3);
},
Z:function() {
var e = -this.zone(), t = "+";
return 0 > e && (e = -e, t = "-"), t + c(w(e / 60), 2) + ":" + c(w(e) % 60, 2);
},
ZZ:function() {
var e = -this.zone(), t = "+";
return 0 > e && (e = -e, t = "-"), t + c(w(e / 60), 2) + c(w(e) % 60, 2);
},
z:function() {
return this.zoneAbbr();
},
zz:function() {
return this.zoneName();
},
X:function() {
return this.unix();
},
Q:function() {
return this.quarter();
}
}, no = [ "months", "monthsShort", "weekdays", "weekdaysShort", "weekdaysMin" ]; eo.length; ) dt = eo.pop(), 
oo[dt + "o"] = r(oo[dt], dt);
for (;to.length; ) dt = to.pop(), oo[dt + dt] = n(oo[dt], 2);
for (oo.DDDD = n(oo.DDD, 3), l(i.prototype, {
set:function(e) {
var t, o;
for (o in e) t = e[o], "function" == typeof t ? this[o] = t :this["_" + o] = t;
},
_months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
months:function(e) {
return this._months[e.month()];
},
_monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
monthsShort:function(e) {
return this._monthsShort[e.month()];
},
monthsParse:function(e) {
var t, o, n;
for (this._monthsParse || (this._monthsParse = []), t = 0; 12 > t; t++) if (this._monthsParse[t] || (o = lt.utc([ 2e3, t ]), 
n = "^" + this.months(o, "") + "|^" + this.monthsShort(o, ""), this._monthsParse[t] = new RegExp(n.replace(".", ""), "i")), 
this._monthsParse[t].test(e)) return t;
},
_weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
weekdays:function(e) {
return this._weekdays[e.day()];
},
_weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
weekdaysShort:function(e) {
return this._weekdaysShort[e.day()];
},
_weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
weekdaysMin:function(e) {
return this._weekdaysMin[e.day()];
},
weekdaysParse:function(e) {
var t, o, n;
for (this._weekdaysParse || (this._weekdaysParse = []), t = 0; 7 > t; t++) if (this._weekdaysParse[t] || (o = lt([ 2e3, 1 ]).day(t), 
n = "^" + this.weekdays(o, "") + "|^" + this.weekdaysShort(o, "") + "|^" + this.weekdaysMin(o, ""), 
this._weekdaysParse[t] = new RegExp(n.replace(".", ""), "i")), this._weekdaysParse[t].test(e)) return t;
},
_longDateFormat:{
LT:"h:mm A",
L:"MM/DD/YYYY",
LL:"MMMM D YYYY",
LLL:"MMMM D YYYY LT",
LLLL:"dddd, MMMM D YYYY LT"
},
longDateFormat:function(e) {
var t = this._longDateFormat[e];
return !t && this._longDateFormat[e.toUpperCase()] && (t = this._longDateFormat[e.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function(e) {
return e.slice(1);
}), this._longDateFormat[e] = t), t;
},
isPM:function(e) {
return "p" === (e + "").toLowerCase().charAt(0);
},
_meridiemParse:/[ap]\.?m?\.?/i,
meridiem:function(e, t, o) {
return e > 11 ? o ? "pm" :"PM" :o ? "am" :"AM";
},
_calendar:{
sameDay:"[Today at] LT",
nextDay:"[Tomorrow at] LT",
nextWeek:"dddd [at] LT",
lastDay:"[Yesterday at] LT",
lastWeek:"[Last] dddd [at] LT",
sameElse:"L"
},
calendar:function(e, t) {
var o = this._calendar[e];
return "function" == typeof o ? o.apply(t) :o;
},
_relativeTime:{
future:"in %s",
past:"%s ago",
s:"a few seconds",
m:"a minute",
mm:"%d minutes",
h:"an hour",
hh:"%d hours",
d:"a day",
dd:"%d days",
M:"a month",
MM:"%d months",
y:"a year",
yy:"%d years"
},
relativeTime:function(e, t, o, n) {
var r = this._relativeTime[o];
return "function" == typeof r ? r(e, t, o, n) :r.replace(/%d/i, e);
},
pastFuture:function(e, t) {
var o = this._relativeTime[e > 0 ? "future" :"past"];
return "function" == typeof o ? o(t) :o.replace(/%s/i, t);
},
ordinal:function(e) {
return this._ordinal.replace("%d", e);
},
_ordinal:"%d",
preparse:function(e) {
return e;
},
postformat:function(e) {
return e;
},
week:function(e) {
return X(e, this._week.dow, this._week.doy).week;
},
_week:{
dow:0,
doy:6
},
_invalidDate:"Invalid date",
invalidDate:function() {
return this._invalidDate;
}
}), lt = function(o, n, r, i) {
var a;
return "boolean" == typeof r && (i = r, r = e), a = {}, a._isAMomentObject = !0, 
a._i = o, a._f = n, a._l = r, a._strict = i, a._isUTC = !1, a._pf = t(), et(a);
}, lt.suppressDeprecationWarnings = !1, lt.createFromInputFallback = o("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function(e) {
e._d = new Date(e._i);
}), lt.utc = function(o, n, r, i) {
var a;
return "boolean" == typeof r && (i = r, r = e), a = {}, a._isAMomentObject = !0, 
a._useUTC = !0, a._isUTC = !0, a._l = r, a._i = o, a._f = n, a._strict = i, a._pf = t(), 
et(a).utc();
}, lt.unix = function(e) {
return lt(1e3 * e);
}, lt.duration = function(e, t) {
var o, n, r, i = e, a = null;
return lt.isDuration(e) ? i = {
ms:e._milliseconds,
d:e._days,
M:e._months
} :"number" == typeof e ? (i = {}, t ? i[t] = e :i.milliseconds = e) :(a = Tt.exec(e)) ? (o = "-" === a[1] ? -1 :1, 
i = {
y:0,
d:w(a[ft]) * o,
h:w(a[_t]) * o,
m:w(a[yt]) * o,
s:w(a[wt]) * o,
ms:w(a[vt]) * o
}) :(a = St.exec(e)) && (o = "-" === a[1] ? -1 :1, r = function(e) {
var t = e && parseFloat(e.replace(",", "."));
return (isNaN(t) ? 0 :t) * o;
}, i = {
y:r(a[2]),
M:r(a[3]),
d:r(a[4]),
h:r(a[5]),
m:r(a[6]),
s:r(a[7]),
w:r(a[8])
}), n = new s(i), lt.isDuration(e) && e.hasOwnProperty("_lang") && (n._lang = e._lang), 
n;
}, lt.version = ct, lt.defaultFormat = Ut, lt.momentProperties = kt, lt.updateOffset = function() {}, 
lt.lang = function(e, t) {
var o;
return e ? (t ? Y(S(e), t) :null === t ? (x(e), e = "en") :bt[e] || E(e), o = lt.duration.fn._lang = lt.fn._lang = E(e), 
o._abbr) :lt.fn._lang._abbr;
}, lt.langData = function(e) {
return e && e._lang && e._lang._abbr && (e = e._lang._abbr), E(e);
}, lt.isMoment = function(e) {
return e instanceof a || null != e && e.hasOwnProperty("_isAMomentObject");
}, lt.isDuration = function(e) {
return e instanceof s;
}, dt = no.length - 1; dt >= 0; --dt) y(no[dt]);
lt.normalizeUnits = function(e) {
return f(e);
}, lt.invalid = function(e) {
var t = lt.utc(0/0);
return null != e ? l(t._pf, e) :t._pf.userInvalidated = !0, t;
}, lt.parseZone = function() {
return lt.apply(null, arguments).parseZone();
}, lt.parseTwoDigitYear = function(e) {
return w(e) + (w(e) > 68 ? 1900 :2e3);
}, l(lt.fn = a.prototype, {
clone:function() {
return lt(this);
},
valueOf:function() {
return +this._d + 6e4 * (this._offset || 0);
},
unix:function() {
return Math.floor(+this / 1e3);
},
toString:function() {
return this.clone().lang("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
},
toDate:function() {
return this._offset ? new Date(+this) :this._d;
},
toISOString:function() {
var e = lt(this).utc();
return 0 < e.year() && e.year() <= 9999 ? I(e, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") :I(e, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
},
toArray:function() {
var e = this;
return [ e.year(), e.month(), e.date(), e.hours(), e.minutes(), e.seconds(), e.milliseconds() ];
},
isValid:function() {
return T(this);
},
isDSTShifted:function() {
return this._a ? this.isValid() && m(this._a, (this._isUTC ? lt.utc(this._a) :lt(this._a)).toArray()) > 0 :!1;
},
parsingFlags:function() {
return l({}, this._pf);
},
invalidAt:function() {
return this._pf.overflow;
},
utc:function() {
return this.zone(0);
},
local:function() {
return this.zone(0), this._isUTC = !1, this;
},
format:function(e) {
var t = I(this, e || lt.defaultFormat);
return this.lang().postformat(t);
},
add:function(e, t) {
var o;
return o = "string" == typeof e ? lt.duration(+t, e) :lt.duration(e, t), p(this, o, 1), 
this;
},
subtract:function(e, t) {
var o;
return o = "string" == typeof e ? lt.duration(+t, e) :lt.duration(e, t), p(this, o, -1), 
this;
},
diff:function(e, t, o) {
var n, r, i = D(e, this), a = 6e4 * (this.zone() - i.zone());
return t = f(t), "year" === t || "month" === t ? (n = 432e5 * (this.daysInMonth() + i.daysInMonth()), 
r = 12 * (this.year() - i.year()) + (this.month() - i.month()), r += (this - lt(this).startOf("month") - (i - lt(i).startOf("month"))) / n, 
r -= 6e4 * (this.zone() - lt(this).startOf("month").zone() - (i.zone() - lt(i).startOf("month").zone())) / n, 
"year" === t && (r /= 12)) :(n = this - i, r = "second" === t ? n / 1e3 :"minute" === t ? n / 6e4 :"hour" === t ? n / 36e5 :"day" === t ? (n - a) / 864e5 :"week" === t ? (n - a) / 6048e5 :n), 
o ? r :d(r);
},
from:function(e, t) {
return lt.duration(this.diff(e)).lang(this.lang()._abbr).humanize(!t);
},
fromNow:function(e) {
return this.from(lt(), e);
},
calendar:function() {
var e = D(lt(), this).startOf("day"), t = this.diff(e, "days", !0), o = -6 > t ? "sameElse" :-1 > t ? "lastWeek" :0 > t ? "lastDay" :1 > t ? "sameDay" :2 > t ? "nextDay" :7 > t ? "nextWeek" :"sameElse";
return this.format(this.lang().calendar(o, this));
},
isLeapYear:function() {
return M(this.year());
},
isDST:function() {
return this.zone() < this.clone().month(0).zone() || this.zone() < this.clone().month(5).zone();
},
day:function(e) {
var t = this._isUTC ? this._d.getUTCDay() :this._d.getDay();
return null != e ? (e = J(e, this.lang()), this.add({
d:e - t
})) :t;
},
month:rt("Month", !0),
startOf:function(e) {
switch (e = f(e)) {
case "year":
this.month(0);

case "quarter":
case "month":
this.date(1);

case "week":
case "isoWeek":
case "day":
this.hours(0);

case "hour":
this.minutes(0);

case "minute":
this.seconds(0);

case "second":
this.milliseconds(0);
}
return "week" === e ? this.weekday(0) :"isoWeek" === e && this.isoWeekday(1), "quarter" === e && this.month(3 * Math.floor(this.month() / 3)), 
this;
},
endOf:function(e) {
return e = f(e), this.startOf(e).add("isoWeek" === e ? "week" :e, 1).subtract("ms", 1);
},
isAfter:function(e, t) {
return t = "undefined" != typeof t ? t :"millisecond", +this.clone().startOf(t) > +lt(e).startOf(t);
},
isBefore:function(e, t) {
return t = "undefined" != typeof t ? t :"millisecond", +this.clone().startOf(t) < +lt(e).startOf(t);
},
isSame:function(e, t) {
return t = t || "ms", +this.clone().startOf(t) === +D(e, this).startOf(t);
},
min:function(e) {
return e = lt.apply(null, arguments), this > e ? this :e;
},
max:function(e) {
return e = lt.apply(null, arguments), e > this ? this :e;
},
zone:function(e, t) {
var o = this._offset || 0;
return null == e ? this._isUTC ? o :this._d.getTimezoneOffset() :("string" == typeof e && (e = A(e)), 
Math.abs(e) < 16 && (e = 60 * e), this._offset = e, this._isUTC = !0, o !== e && (!t || this._changeInProgress ? p(this, lt.duration(o - e, "m"), 1, !1) :this._changeInProgress || (this._changeInProgress = !0, 
lt.updateOffset(this, !0), this._changeInProgress = null)), this);
},
zoneAbbr:function() {
return this._isUTC ? "UTC" :"";
},
zoneName:function() {
return this._isUTC ? "Coordinated Universal Time" :"";
},
parseZone:function() {
return this._tzm ? this.zone(this._tzm) :"string" == typeof this._i && this.zone(this._i), 
this;
},
hasAlignedHourOffset:function(e) {
return e = e ? lt(e).zone() :0, (this.zone() - e) % 60 === 0;
},
daysInMonth:function() {
return v(this.year(), this.month());
},
dayOfYear:function(e) {
var t = ht((lt(this).startOf("day") - lt(this).startOf("year")) / 864e5) + 1;
return null == e ? t :this.add("d", e - t);
},
quarter:function(e) {
return null == e ? Math.ceil((this.month() + 1) / 3) :this.month(3 * (e - 1) + this.month() % 3);
},
weekYear:function(e) {
var t = X(this, this.lang()._week.dow, this.lang()._week.doy).year;
return null == e ? t :this.add("y", e - t);
},
isoWeekYear:function(e) {
var t = X(this, 1, 4).year;
return null == e ? t :this.add("y", e - t);
},
week:function(e) {
var t = this.lang().week(this);
return null == e ? t :this.add("d", 7 * (e - t));
},
isoWeek:function(e) {
var t = X(this, 1, 4).week;
return null == e ? t :this.add("d", 7 * (e - t));
},
weekday:function(e) {
var t = (this.day() + 7 - this.lang()._week.dow) % 7;
return null == e ? t :this.add("d", e - t);
},
isoWeekday:function(e) {
return null == e ? this.day() || 7 :this.day(this.day() % 7 ? e :e - 7);
},
isoWeeksInYear:function() {
return b(this.year(), 1, 4);
},
weeksInYear:function() {
var e = this._lang._week;
return b(this.year(), e.dow, e.doy);
},
get:function(e) {
return e = f(e), this[e]();
},
set:function(e, t) {
return e = f(e), "function" == typeof this[e] && this[e](t), this;
},
lang:function(t) {
return t === e ? this._lang :(this._lang = E(t), this);
}
}), lt.fn.millisecond = lt.fn.milliseconds = rt("Milliseconds", !1), lt.fn.second = lt.fn.seconds = rt("Seconds", !1), 
lt.fn.minute = lt.fn.minutes = rt("Minutes", !1), lt.fn.hour = lt.fn.hours = rt("Hours", !0), 
lt.fn.date = rt("Date", !0), lt.fn.dates = o("dates accessor is deprecated. Use date instead.", rt("Date", !0)), 
lt.fn.year = rt("FullYear", !0), lt.fn.years = o("years accessor is deprecated. Use year instead.", rt("FullYear", !0)), 
lt.fn.days = lt.fn.day, lt.fn.months = lt.fn.month, lt.fn.weeks = lt.fn.week, lt.fn.isoWeeks = lt.fn.isoWeek, 
lt.fn.quarters = lt.fn.quarter, lt.fn.toJSON = lt.fn.toISOString, l(lt.duration.fn = s.prototype, {
_bubble:function() {
var e, t, o, n, r = this._milliseconds, i = this._days, a = this._months, s = this._data;
s.milliseconds = r % 1e3, e = d(r / 1e3), s.seconds = e % 60, t = d(e / 60), s.minutes = t % 60, 
o = d(t / 60), s.hours = o % 24, i += d(o / 24), s.days = i % 30, a += d(i / 30), 
s.months = a % 12, n = d(a / 12), s.years = n;
},
weeks:function() {
return d(this.days() / 7);
},
valueOf:function() {
return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * w(this._months / 12);
},
humanize:function(e) {
var t = +this, o = Q(t, !e, this.lang());
return e && (o = this.lang().pastFuture(t, o)), this.lang().postformat(o);
},
add:function(e, t) {
var o = lt.duration(e, t);
return this._milliseconds += o._milliseconds, this._days += o._days, this._months += o._months, 
this._bubble(), this;
},
subtract:function(e, t) {
var o = lt.duration(e, t);
return this._milliseconds -= o._milliseconds, this._days -= o._days, this._months -= o._months, 
this._bubble(), this;
},
get:function(e) {
return e = f(e), this[e.toLowerCase() + "s"]();
},
as:function(e) {
return e = f(e), this["as" + e.charAt(0).toUpperCase() + e.slice(1) + "s"]();
},
lang:lt.fn.lang,
toIsoString:function() {
var e = Math.abs(this.years()), t = Math.abs(this.months()), o = Math.abs(this.days()), n = Math.abs(this.hours()), r = Math.abs(this.minutes()), i = Math.abs(this.seconds() + this.milliseconds() / 1e3);
return this.asSeconds() ? (this.asSeconds() < 0 ? "-" :"") + "P" + (e ? e + "Y" :"") + (t ? t + "M" :"") + (o ? o + "D" :"") + (n || r || i ? "T" :"") + (n ? n + "H" :"") + (r ? r + "M" :"") + (i ? i + "S" :"") :"P0D";
}
});
for (dt in Kt) Kt.hasOwnProperty(dt) && (at(dt, Kt[dt]), it(dt.toLowerCase()));
at("Weeks", 6048e5), lt.duration.fn.asMonths = function() {
return (+this - 31536e6 * this.years()) / 2592e6 + 12 * this.years();
}, lt.lang("en", {
ordinal:function(e) {
var t = e % 10, o = 1 === w(e % 100 / 10) ? "th" :1 === t ? "st" :2 === t ? "nd" :3 === t ? "rd" :"th";
return e + o;
}
}), function(e) {
e(lt);
}(function(e) {
return e.lang("ar-ma", {
months:"يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"),
monthsShort:"يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"),
weekdays:"الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
weekdaysShort:"احد_اتنين_ثلاثاء_اربعاء_خميس_جمعة_سبت".split("_"),
weekdaysMin:"ح_ن_ث_ر_خ_ج_س".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd D MMMM YYYY LT"
},
calendar:{
sameDay:"[اليوم على الساعة] LT",
nextDay:"[غدا على الساعة] LT",
nextWeek:"dddd [على الساعة] LT",
lastDay:"[أمس على الساعة] LT",
lastWeek:"dddd [على الساعة] LT",
sameElse:"L"
},
relativeTime:{
future:"في %s",
past:"منذ %s",
s:"ثوان",
m:"دقيقة",
mm:"%d دقائق",
h:"ساعة",
hh:"%d ساعات",
d:"يوم",
dd:"%d أيام",
M:"شهر",
MM:"%d أشهر",
y:"سنة",
yy:"%d سنوات"
},
week:{
dow:6,
doy:12
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("ar", {
months:"يناير/ كانون الثاني_فبراير/ شباط_مارس/ آذار_أبريل/ نيسان_مايو/ أيار_يونيو/ حزيران_يوليو/ تموز_أغسطس/ آب_سبتمبر/ أيلول_أكتوبر/ تشرين الأول_نوفمبر/ تشرين الثاني_ديسمبر/ كانون الأول".split("_"),
monthsShort:"يناير/ كانون الثاني_فبراير/ شباط_مارس/ آذار_أبريل/ نيسان_مايو/ أيار_يونيو/ حزيران_يوليو/ تموز_أغسطس/ آب_سبتمبر/ أيلول_أكتوبر/ تشرين الأول_نوفمبر/ تشرين الثاني_ديسمبر/ كانون الأول".split("_"),
weekdays:"الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
weekdaysShort:"الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
weekdaysMin:"ح_ن_ث_ر_خ_ج_س".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd D MMMM YYYY LT"
},
calendar:{
sameDay:"[اليوم على الساعة] LT",
nextDay:"[غدا على الساعة] LT",
nextWeek:"dddd [على الساعة] LT",
lastDay:"[أمس على الساعة] LT",
lastWeek:"dddd [على الساعة] LT",
sameElse:"L"
},
relativeTime:{
future:"في %s",
past:"منذ %s",
s:"ثوان",
m:"دقيقة",
mm:"%d دقائق",
h:"ساعة",
hh:"%d ساعات",
d:"يوم",
dd:"%d أيام",
M:"شهر",
MM:"%d أشهر",
y:"سنة",
yy:"%d سنوات"
},
week:{
dow:6,
doy:12
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("bg", {
months:"януари_февруари_март_април_май_юни_юли_август_септември_октомври_ноември_декември".split("_"),
monthsShort:"янр_фев_мар_апр_май_юни_юли_авг_сеп_окт_ное_дек".split("_"),
weekdays:"неделя_понеделник_вторник_сряда_четвъртък_петък_събота".split("_"),
weekdaysShort:"нед_пон_вто_сря_чет_пет_съб".split("_"),
weekdaysMin:"нд_пн_вт_ср_чт_пт_сб".split("_"),
longDateFormat:{
LT:"H:mm",
L:"D.MM.YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd, D MMMM YYYY LT"
},
calendar:{
sameDay:"[Днес в] LT",
nextDay:"[Утре в] LT",
nextWeek:"dddd [в] LT",
lastDay:"[Вчера в] LT",
lastWeek:function() {
switch (this.day()) {
case 0:
case 3:
case 6:
return "[В изминалата] dddd [в] LT";

case 1:
case 2:
case 4:
case 5:
return "[В изминалия] dddd [в] LT";
}
},
sameElse:"L"
},
relativeTime:{
future:"след %s",
past:"преди %s",
s:"няколко секунди",
m:"минута",
mm:"%d минути",
h:"час",
hh:"%d часа",
d:"ден",
dd:"%d дни",
M:"месец",
MM:"%d месеца",
y:"година",
yy:"%d години"
},
ordinal:function(e) {
var t = e % 10, o = e % 100;
return 0 === e ? e + "-ев" :0 === o ? e + "-ен" :o > 10 && 20 > o ? e + "-ти" :1 === t ? e + "-ви" :2 === t ? e + "-ри" :7 === t || 8 === t ? e + "-ми" :e + "-ти";
},
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(t) {
function o(e, t, o) {
var n = {
mm:"munutenn",
MM:"miz",
dd:"devezh"
};
return e + " " + i(n[o], e);
}
function n(e) {
switch (r(e)) {
case 1:
case 3:
case 4:
case 5:
case 9:
return e + " bloaz";

default:
return e + " vloaz";
}
}
function r(e) {
return e > 9 ? r(e % 10) :e;
}
function i(e, t) {
return 2 === t ? a(e) :e;
}
function a(t) {
var o = {
m:"v",
b:"v",
d:"z"
};
return o[t.charAt(0)] === e ? t :o[t.charAt(0)] + t.substring(1);
}
return t.lang("br", {
months:"Genver_C'hwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu".split("_"),
monthsShort:"Gen_C'hwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker".split("_"),
weekdays:"Sul_Lun_Meurzh_Merc'her_Yaou_Gwener_Sadorn".split("_"),
weekdaysShort:"Sul_Lun_Meu_Mer_Yao_Gwe_Sad".split("_"),
weekdaysMin:"Su_Lu_Me_Mer_Ya_Gw_Sa".split("_"),
longDateFormat:{
LT:"h[e]mm A",
L:"DD/MM/YYYY",
LL:"D [a viz] MMMM YYYY",
LLL:"D [a viz] MMMM YYYY LT",
LLLL:"dddd, D [a viz] MMMM YYYY LT"
},
calendar:{
sameDay:"[Hiziv da] LT",
nextDay:"[Warc'hoazh da] LT",
nextWeek:"dddd [da] LT",
lastDay:"[Dec'h da] LT",
lastWeek:"dddd [paset da] LT",
sameElse:"L"
},
relativeTime:{
future:"a-benn %s",
past:"%s 'zo",
s:"un nebeud segondennoù",
m:"ur vunutenn",
mm:o,
h:"un eur",
hh:"%d eur",
d:"un devezh",
dd:o,
M:"ur miz",
MM:o,
y:"ur bloaz",
yy:n
},
ordinal:function(e) {
var t = 1 === e ? "añ" :"vet";
return e + t;
},
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e, t, o) {
var n = e + " ";
switch (o) {
case "m":
return t ? "jedna minuta" :"jedne minute";

case "mm":
return n += 1 === e ? "minuta" :2 === e || 3 === e || 4 === e ? "minute" :"minuta";

case "h":
return t ? "jedan sat" :"jednog sata";

case "hh":
return n += 1 === e ? "sat" :2 === e || 3 === e || 4 === e ? "sata" :"sati";

case "dd":
return n += 1 === e ? "dan" :"dana";

case "MM":
return n += 1 === e ? "mjesec" :2 === e || 3 === e || 4 === e ? "mjeseca" :"mjeseci";

case "yy":
return n += 1 === e ? "godina" :2 === e || 3 === e || 4 === e ? "godine" :"godina";
}
}
return e.lang("bs", {
months:"januar_februar_mart_april_maj_juni_juli_avgust_septembar_oktobar_novembar_decembar".split("_"),
monthsShort:"jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.".split("_"),
weekdays:"nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"),
weekdaysShort:"ned._pon._uto._sri._čet._pet._sub.".split("_"),
weekdaysMin:"ne_po_ut_sr_če_pe_su".split("_"),
longDateFormat:{
LT:"H:mm",
L:"DD. MM. YYYY",
LL:"D. MMMM YYYY",
LLL:"D. MMMM YYYY LT",
LLLL:"dddd, D. MMMM YYYY LT"
},
calendar:{
sameDay:"[danas u] LT",
nextDay:"[sutra u] LT",
nextWeek:function() {
switch (this.day()) {
case 0:
return "[u] [nedjelju] [u] LT";

case 3:
return "[u] [srijedu] [u] LT";

case 6:
return "[u] [subotu] [u] LT";

case 1:
case 2:
case 4:
case 5:
return "[u] dddd [u] LT";
}
},
lastDay:"[jučer u] LT",
lastWeek:function() {
switch (this.day()) {
case 0:
case 3:
return "[prošlu] dddd [u] LT";

case 6:
return "[prošle] [subote] [u] LT";

case 1:
case 2:
case 4:
case 5:
return "[prošli] dddd [u] LT";
}
},
sameElse:"L"
},
relativeTime:{
future:"za %s",
past:"prije %s",
s:"par sekundi",
m:t,
mm:t,
h:t,
hh:t,
d:"dan",
dd:t,
M:"mjesec",
MM:t,
y:"godinu",
yy:t
},
ordinal:"%d.",
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("ca", {
months:"gener_febrer_març_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre".split("_"),
monthsShort:"gen._febr._mar._abr._mai._jun._jul._ag._set._oct._nov._des.".split("_"),
weekdays:"diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte".split("_"),
weekdaysShort:"dg._dl._dt._dc._dj._dv._ds.".split("_"),
weekdaysMin:"Dg_Dl_Dt_Dc_Dj_Dv_Ds".split("_"),
longDateFormat:{
LT:"H:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd D MMMM YYYY LT"
},
calendar:{
sameDay:function() {
return "[avui a " + (1 !== this.hours() ? "les" :"la") + "] LT";
},
nextDay:function() {
return "[demà a " + (1 !== this.hours() ? "les" :"la") + "] LT";
},
nextWeek:function() {
return "dddd [a " + (1 !== this.hours() ? "les" :"la") + "] LT";
},
lastDay:function() {
return "[ahir a " + (1 !== this.hours() ? "les" :"la") + "] LT";
},
lastWeek:function() {
return "[el] dddd [passat a " + (1 !== this.hours() ? "les" :"la") + "] LT";
},
sameElse:"L"
},
relativeTime:{
future:"en %s",
past:"fa %s",
s:"uns segons",
m:"un minut",
mm:"%d minuts",
h:"una hora",
hh:"%d hores",
d:"un dia",
dd:"%d dies",
M:"un mes",
MM:"%d mesos",
y:"un any",
yy:"%d anys"
},
ordinal:"%dº",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e) {
return e > 1 && 5 > e && 1 !== ~~(e / 10);
}
function o(e, o, n, r) {
var i = e + " ";
switch (n) {
case "s":
return o || r ? "pár sekund" :"pár sekundami";

case "m":
return o ? "minuta" :r ? "minutu" :"minutou";

case "mm":
return o || r ? i + (t(e) ? "minuty" :"minut") :i + "minutami";

case "h":
return o ? "hodina" :r ? "hodinu" :"hodinou";

case "hh":
return o || r ? i + (t(e) ? "hodiny" :"hodin") :i + "hodinami";

case "d":
return o || r ? "den" :"dnem";

case "dd":
return o || r ? i + (t(e) ? "dny" :"dní") :i + "dny";

case "M":
return o || r ? "měsíc" :"měsícem";

case "MM":
return o || r ? i + (t(e) ? "měsíce" :"měsíců") :i + "měsíci";

case "y":
return o || r ? "rok" :"rokem";

case "yy":
return o || r ? i + (t(e) ? "roky" :"let") :i + "lety";
}
}
var n = "leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec".split("_"), r = "led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro".split("_");
return e.lang("cs", {
months:n,
monthsShort:r,
monthsParse:function(e, t) {
var o, n = [];
for (o = 0; 12 > o; o++) n[o] = new RegExp("^" + e[o] + "$|^" + t[o] + "$", "i");
return n;
}(n, r),
weekdays:"neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota".split("_"),
weekdaysShort:"ne_po_út_st_čt_pá_so".split("_"),
weekdaysMin:"ne_po_út_st_čt_pá_so".split("_"),
longDateFormat:{
LT:"H.mm",
L:"DD. MM. YYYY",
LL:"D. MMMM YYYY",
LLL:"D. MMMM YYYY LT",
LLLL:"dddd D. MMMM YYYY LT"
},
calendar:{
sameDay:"[dnes v] LT",
nextDay:"[zítra v] LT",
nextWeek:function() {
switch (this.day()) {
case 0:
return "[v neděli v] LT";

case 1:
case 2:
return "[v] dddd [v] LT";

case 3:
return "[ve středu v] LT";

case 4:
return "[ve čtvrtek v] LT";

case 5:
return "[v pátek v] LT";

case 6:
return "[v sobotu v] LT";
}
},
lastDay:"[včera v] LT",
lastWeek:function() {
switch (this.day()) {
case 0:
return "[minulou neděli v] LT";

case 1:
case 2:
return "[minulé] dddd [v] LT";

case 3:
return "[minulou středu v] LT";

case 4:
case 5:
return "[minulý] dddd [v] LT";

case 6:
return "[minulou sobotu v] LT";
}
},
sameElse:"L"
},
relativeTime:{
future:"za %s",
past:"před %s",
s:o,
m:o,
mm:o,
h:o,
hh:o,
d:o,
dd:o,
M:o,
MM:o,
y:o,
yy:o
},
ordinal:"%d.",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("cv", {
months:"кăрлач_нарăс_пуш_ака_май_çĕртме_утă_çурла_авăн_юпа_чӳк_раштав".split("_"),
monthsShort:"кăр_нар_пуш_ака_май_çĕр_утă_çур_ав_юпа_чӳк_раш".split("_"),
weekdays:"вырсарникун_тунтикун_ытларикун_юнкун_кĕçнерникун_эрнекун_шăматкун".split("_"),
weekdaysShort:"выр_тун_ытл_юн_кĕç_эрн_шăм".split("_"),
weekdaysMin:"вр_тн_ыт_юн_кç_эр_шм".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD-MM-YYYY",
LL:"YYYY [çулхи] MMMM [уйăхĕн] D[-мĕшĕ]",
LLL:"YYYY [çулхи] MMMM [уйăхĕн] D[-мĕшĕ], LT",
LLLL:"dddd, YYYY [çулхи] MMMM [уйăхĕн] D[-мĕшĕ], LT"
},
calendar:{
sameDay:"[Паян] LT [сехетре]",
nextDay:"[Ыран] LT [сехетре]",
lastDay:"[Ĕнер] LT [сехетре]",
nextWeek:"[Çитес] dddd LT [сехетре]",
lastWeek:"[Иртнĕ] dddd LT [сехетре]",
sameElse:"L"
},
relativeTime:{
future:function(e) {
var t = /сехет$/i.exec(e) ? "рен" :/çул$/i.exec(e) ? "тан" :"ран";
return e + t;
},
past:"%s каялла",
s:"пĕр-ик çеккунт",
m:"пĕр минут",
mm:"%d минут",
h:"пĕр сехет",
hh:"%d сехет",
d:"пĕр кун",
dd:"%d кун",
M:"пĕр уйăх",
MM:"%d уйăх",
y:"пĕр çул",
yy:"%d çул"
},
ordinal:"%d-мĕш",
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("cy", {
months:"Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr".split("_"),
monthsShort:"Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag".split("_"),
weekdays:"Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn".split("_"),
weekdaysShort:"Sul_Llun_Maw_Mer_Iau_Gwe_Sad".split("_"),
weekdaysMin:"Su_Ll_Ma_Me_Ia_Gw_Sa".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd, D MMMM YYYY LT"
},
calendar:{
sameDay:"[Heddiw am] LT",
nextDay:"[Yfory am] LT",
nextWeek:"dddd [am] LT",
lastDay:"[Ddoe am] LT",
lastWeek:"dddd [diwethaf am] LT",
sameElse:"L"
},
relativeTime:{
future:"mewn %s",
past:"%s yn àl",
s:"ychydig eiliadau",
m:"munud",
mm:"%d munud",
h:"awr",
hh:"%d awr",
d:"diwrnod",
dd:"%d diwrnod",
M:"mis",
MM:"%d mis",
y:"blwyddyn",
yy:"%d flynedd"
},
ordinal:function(e) {
var t = e, o = "", n = [ "", "af", "il", "ydd", "ydd", "ed", "ed", "ed", "fed", "fed", "fed", "eg", "fed", "eg", "eg", "fed", "eg", "eg", "fed", "eg", "fed" ];
return t > 20 ? o = 40 === t || 50 === t || 60 === t || 80 === t || 100 === t ? "fed" :"ain" :t > 0 && (o = n[t]), 
e + o;
},
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("da", {
months:"januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december".split("_"),
monthsShort:"jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),
weekdays:"søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),
weekdaysShort:"søn_man_tir_ons_tor_fre_lør".split("_"),
weekdaysMin:"sø_ma_ti_on_to_fr_lø".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd D. MMMM, YYYY LT"
},
calendar:{
sameDay:"[I dag kl.] LT",
nextDay:"[I morgen kl.] LT",
nextWeek:"dddd [kl.] LT",
lastDay:"[I går kl.] LT",
lastWeek:"[sidste] dddd [kl] LT",
sameElse:"L"
},
relativeTime:{
future:"om %s",
past:"%s siden",
s:"få sekunder",
m:"et minut",
mm:"%d minutter",
h:"en time",
hh:"%d timer",
d:"en dag",
dd:"%d dage",
M:"en måned",
MM:"%d måneder",
y:"et år",
yy:"%d år"
},
ordinal:"%d.",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e, t, o) {
var n = {
m:[ "eine Minute", "einer Minute" ],
h:[ "eine Stunde", "einer Stunde" ],
d:[ "ein Tag", "einem Tag" ],
dd:[ e + " Tage", e + " Tagen" ],
M:[ "ein Monat", "einem Monat" ],
MM:[ e + " Monate", e + " Monaten" ],
y:[ "ein Jahr", "einem Jahr" ],
yy:[ e + " Jahre", e + " Jahren" ]
};
return t ? n[o][0] :n[o][1];
}
return e.lang("de", {
months:"Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
monthsShort:"Jan._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),
weekdays:"Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),
weekdaysShort:"So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),
weekdaysMin:"So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
longDateFormat:{
LT:"HH:mm [Uhr]",
L:"DD.MM.YYYY",
LL:"D. MMMM YYYY",
LLL:"D. MMMM YYYY LT",
LLLL:"dddd, D. MMMM YYYY LT"
},
calendar:{
sameDay:"[Heute um] LT",
sameElse:"L",
nextDay:"[Morgen um] LT",
nextWeek:"dddd [um] LT",
lastDay:"[Gestern um] LT",
lastWeek:"[letzten] dddd [um] LT"
},
relativeTime:{
future:"in %s",
past:"vor %s",
s:"ein paar Sekunden",
m:t,
mm:"%d Minuten",
h:t,
hh:"%d Stunden",
d:t,
dd:t,
M:t,
MM:t,
y:t,
yy:t
},
ordinal:"%d.",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("el", {
monthsNominativeEl:"Ιανουάριος_Φεβρουάριος_Μάρτιος_Απρίλιος_Μάιος_Ιούνιος_Ιούλιος_Αύγουστος_Σεπτέμβριος_Οκτώβριος_Νοέμβριος_Δεκέμβριος".split("_"),
monthsGenitiveEl:"Ιανουαρίου_Φεβρουαρίου_Μαρτίου_Απριλίου_Μαΐου_Ιουνίου_Ιουλίου_Αυγούστου_Σεπτεμβρίου_Οκτωβρίου_Νοεμβρίου_Δεκεμβρίου".split("_"),
months:function(e, t) {
return /D/.test(t.substring(0, t.indexOf("MMMM"))) ? this._monthsGenitiveEl[e.month()] :this._monthsNominativeEl[e.month()];
},
monthsShort:"Ιαν_Φεβ_Μαρ_Απρ_Μαϊ_Ιουν_Ιουλ_Αυγ_Σεπ_Οκτ_Νοε_Δεκ".split("_"),
weekdays:"Κυριακή_Δευτέρα_Τρίτη_Τετάρτη_Πέμπτη_Παρασκευή_Σάββατο".split("_"),
weekdaysShort:"Κυρ_Δευ_Τρι_Τετ_Πεμ_Παρ_Σαβ".split("_"),
weekdaysMin:"Κυ_Δε_Τρ_Τε_Πε_Πα_Σα".split("_"),
meridiem:function(e, t, o) {
return e > 11 ? o ? "μμ" :"ΜΜ" :o ? "πμ" :"ΠΜ";
},
longDateFormat:{
LT:"h:mm A",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd, D MMMM YYYY LT"
},
calendarEl:{
sameDay:"[Σήμερα {}] LT",
nextDay:"[Αύριο {}] LT",
nextWeek:"dddd [{}] LT",
lastDay:"[Χθες {}] LT",
lastWeek:"[την προηγούμενη] dddd [{}] LT",
sameElse:"L"
},
calendar:function(e, t) {
var o = this._calendarEl[e], n = t && t.hours();
return o.replace("{}", n % 12 === 1 ? "στη" :"στις");
},
relativeTime:{
future:"σε %s",
past:"%s πριν",
s:"δευτερόλεπτα",
m:"ένα λεπτό",
mm:"%d λεπτά",
h:"μία ώρα",
hh:"%d ώρες",
d:"μία μέρα",
dd:"%d μέρες",
M:"ένας μήνας",
MM:"%d μήνες",
y:"ένας χρόνος",
yy:"%d χρόνια"
},
ordinal:function(e) {
return e + "η";
},
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("en-au", {
months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
longDateFormat:{
LT:"h:mm A",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd, D MMMM YYYY LT"
},
calendar:{
sameDay:"[Today at] LT",
nextDay:"[Tomorrow at] LT",
nextWeek:"dddd [at] LT",
lastDay:"[Yesterday at] LT",
lastWeek:"[Last] dddd [at] LT",
sameElse:"L"
},
relativeTime:{
future:"in %s",
past:"%s ago",
s:"a few seconds",
m:"a minute",
mm:"%d minutes",
h:"an hour",
hh:"%d hours",
d:"a day",
dd:"%d days",
M:"a month",
MM:"%d months",
y:"a year",
yy:"%d years"
},
ordinal:function(e) {
var t = e % 10, o = 1 === ~~(e % 100 / 10) ? "th" :1 === t ? "st" :2 === t ? "nd" :3 === t ? "rd" :"th";
return e + o;
},
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("en-ca", {
months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
longDateFormat:{
LT:"h:mm A",
L:"YYYY-MM-DD",
LL:"D MMMM, YYYY",
LLL:"D MMMM, YYYY LT",
LLLL:"dddd, D MMMM, YYYY LT"
},
calendar:{
sameDay:"[Today at] LT",
nextDay:"[Tomorrow at] LT",
nextWeek:"dddd [at] LT",
lastDay:"[Yesterday at] LT",
lastWeek:"[Last] dddd [at] LT",
sameElse:"L"
},
relativeTime:{
future:"in %s",
past:"%s ago",
s:"a few seconds",
m:"a minute",
mm:"%d minutes",
h:"an hour",
hh:"%d hours",
d:"a day",
dd:"%d days",
M:"a month",
MM:"%d months",
y:"a year",
yy:"%d years"
},
ordinal:function(e) {
var t = e % 10, o = 1 === ~~(e % 100 / 10) ? "th" :1 === t ? "st" :2 === t ? "nd" :3 === t ? "rd" :"th";
return e + o;
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("en-gb", {
months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd, D MMMM YYYY LT"
},
calendar:{
sameDay:"[Today at] LT",
nextDay:"[Tomorrow at] LT",
nextWeek:"dddd [at] LT",
lastDay:"[Yesterday at] LT",
lastWeek:"[Last] dddd [at] LT",
sameElse:"L"
},
relativeTime:{
future:"in %s",
past:"%s ago",
s:"a few seconds",
m:"a minute",
mm:"%d minutes",
h:"an hour",
hh:"%d hours",
d:"a day",
dd:"%d days",
M:"a month",
MM:"%d months",
y:"a year",
yy:"%d years"
},
ordinal:function(e) {
var t = e % 10, o = 1 === ~~(e % 100 / 10) ? "th" :1 === t ? "st" :2 === t ? "nd" :3 === t ? "rd" :"th";
return e + o;
},
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("eo", {
months:"januaro_februaro_marto_aprilo_majo_junio_julio_aŭgusto_septembro_oktobro_novembro_decembro".split("_"),
monthsShort:"jan_feb_mar_apr_maj_jun_jul_aŭg_sep_okt_nov_dec".split("_"),
weekdays:"Dimanĉo_Lundo_Mardo_Merkredo_Ĵaŭdo_Vendredo_Sabato".split("_"),
weekdaysShort:"Dim_Lun_Mard_Merk_Ĵaŭ_Ven_Sab".split("_"),
weekdaysMin:"Di_Lu_Ma_Me_Ĵa_Ve_Sa".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"YYYY-MM-DD",
LL:"D[-an de] MMMM, YYYY",
LLL:"D[-an de] MMMM, YYYY LT",
LLLL:"dddd, [la] D[-an de] MMMM, YYYY LT"
},
meridiem:function(e, t, o) {
return e > 11 ? o ? "p.t.m." :"P.T.M." :o ? "a.t.m." :"A.T.M.";
},
calendar:{
sameDay:"[Hodiaŭ je] LT",
nextDay:"[Morgaŭ je] LT",
nextWeek:"dddd [je] LT",
lastDay:"[Hieraŭ je] LT",
lastWeek:"[pasinta] dddd [je] LT",
sameElse:"L"
},
relativeTime:{
future:"je %s",
past:"antaŭ %s",
s:"sekundoj",
m:"minuto",
mm:"%d minutoj",
h:"horo",
hh:"%d horoj",
d:"tago",
dd:"%d tagoj",
M:"monato",
MM:"%d monatoj",
y:"jaro",
yy:"%d jaroj"
},
ordinal:"%da",
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
var t = "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"), o = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_");
return e.lang("es", {
months:"enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
monthsShort:function(e, n) {
return /-MMM-/.test(n) ? o[e.month()] :t[e.month()];
},
weekdays:"domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),
weekdaysShort:"dom._lun._mar._mié._jue._vie._sáb.".split("_"),
weekdaysMin:"Do_Lu_Ma_Mi_Ju_Vi_Sá".split("_"),
longDateFormat:{
LT:"H:mm",
L:"DD/MM/YYYY",
LL:"D [de] MMMM [del] YYYY",
LLL:"D [de] MMMM [del] YYYY LT",
LLLL:"dddd, D [de] MMMM [del] YYYY LT"
},
calendar:{
sameDay:function() {
return "[hoy a la" + (1 !== this.hours() ? "s" :"") + "] LT";
},
nextDay:function() {
return "[mañana a la" + (1 !== this.hours() ? "s" :"") + "] LT";
},
nextWeek:function() {
return "dddd [a la" + (1 !== this.hours() ? "s" :"") + "] LT";
},
lastDay:function() {
return "[ayer a la" + (1 !== this.hours() ? "s" :"") + "] LT";
},
lastWeek:function() {
return "[el] dddd [pasado a la" + (1 !== this.hours() ? "s" :"") + "] LT";
},
sameElse:"L"
},
relativeTime:{
future:"en %s",
past:"hace %s",
s:"unos segundos",
m:"un minuto",
mm:"%d minutos",
h:"una hora",
hh:"%d horas",
d:"un día",
dd:"%d días",
M:"un mes",
MM:"%d meses",
y:"un año",
yy:"%d años"
},
ordinal:"%dº",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e, t, o, n) {
var r = {
s:[ "mõne sekundi", "mõni sekund", "paar sekundit" ],
m:[ "ühe minuti", "üks minut" ],
mm:[ e + " minuti", e + " minutit" ],
h:[ "ühe tunni", "tund aega", "üks tund" ],
hh:[ e + " tunni", e + " tundi" ],
d:[ "ühe päeva", "üks päev" ],
M:[ "kuu aja", "kuu aega", "üks kuu" ],
MM:[ e + " kuu", e + " kuud" ],
y:[ "ühe aasta", "aasta", "üks aasta" ],
yy:[ e + " aasta", e + " aastat" ]
};
return t ? r[o][2] ? r[o][2] :r[o][1] :n ? r[o][0] :r[o][1];
}
return e.lang("et", {
months:"jaanuar_veebruar_märts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember".split("_"),
monthsShort:"jaan_veebr_märts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets".split("_"),
weekdays:"pühapäev_esmaspäev_teisipäev_kolmapäev_neljapäev_reede_laupäev".split("_"),
weekdaysShort:"P_E_T_K_N_R_L".split("_"),
weekdaysMin:"P_E_T_K_N_R_L".split("_"),
longDateFormat:{
LT:"H:mm",
L:"DD.MM.YYYY",
LL:"D. MMMM YYYY",
LLL:"D. MMMM YYYY LT",
LLLL:"dddd, D. MMMM YYYY LT"
},
calendar:{
sameDay:"[Täna,] LT",
nextDay:"[Homme,] LT",
nextWeek:"[Järgmine] dddd LT",
lastDay:"[Eile,] LT",
lastWeek:"[Eelmine] dddd LT",
sameElse:"L"
},
relativeTime:{
future:"%s pärast",
past:"%s tagasi",
s:t,
m:t,
mm:t,
h:t,
hh:t,
d:t,
dd:"%d päeva",
M:t,
MM:t,
y:t,
yy:t
},
ordinal:"%d.",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("eu", {
months:"urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua".split("_"),
monthsShort:"urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.".split("_"),
weekdays:"igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata".split("_"),
weekdaysShort:"ig._al._ar._az._og._ol._lr.".split("_"),
weekdaysMin:"ig_al_ar_az_og_ol_lr".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"YYYY-MM-DD",
LL:"YYYY[ko] MMMM[ren] D[a]",
LLL:"YYYY[ko] MMMM[ren] D[a] LT",
LLLL:"dddd, YYYY[ko] MMMM[ren] D[a] LT",
l:"YYYY-M-D",
ll:"YYYY[ko] MMM D[a]",
lll:"YYYY[ko] MMM D[a] LT",
llll:"ddd, YYYY[ko] MMM D[a] LT"
},
calendar:{
sameDay:"[gaur] LT[etan]",
nextDay:"[bihar] LT[etan]",
nextWeek:"dddd LT[etan]",
lastDay:"[atzo] LT[etan]",
lastWeek:"[aurreko] dddd LT[etan]",
sameElse:"L"
},
relativeTime:{
future:"%s barru",
past:"duela %s",
s:"segundo batzuk",
m:"minutu bat",
mm:"%d minutu",
h:"ordu bat",
hh:"%d ordu",
d:"egun bat",
dd:"%d egun",
M:"hilabete bat",
MM:"%d hilabete",
y:"urte bat",
yy:"%d urte"
},
ordinal:"%d.",
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
var t = {
1:"۱",
2:"۲",
3:"۳",
4:"۴",
5:"۵",
6:"۶",
7:"۷",
8:"۸",
9:"۹",
0:"۰"
}, o = {
"۱":"1",
"۲":"2",
"۳":"3",
"۴":"4",
"۵":"5",
"۶":"6",
"۷":"7",
"۸":"8",
"۹":"9",
"۰":"0"
};
return e.lang("fa", {
months:"ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split("_"),
monthsShort:"ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split("_"),
weekdays:"یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"),
weekdaysShort:"یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"),
weekdaysMin:"ی_د_س_چ_پ_ج_ش".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd, D MMMM YYYY LT"
},
meridiem:function(e) {
return 12 > e ? "قبل از ظهر" :"بعد از ظهر";
},
calendar:{
sameDay:"[امروز ساعت] LT",
nextDay:"[فردا ساعت] LT",
nextWeek:"dddd [ساعت] LT",
lastDay:"[دیروز ساعت] LT",
lastWeek:"dddd [پیش] [ساعت] LT",
sameElse:"L"
},
relativeTime:{
future:"در %s",
past:"%s پیش",
s:"چندین ثانیه",
m:"یک دقیقه",
mm:"%d دقیقه",
h:"یک ساعت",
hh:"%d ساعت",
d:"یک روز",
dd:"%d روز",
M:"یک ماه",
MM:"%d ماه",
y:"یک سال",
yy:"%d سال"
},
preparse:function(e) {
return e.replace(/[۰-۹]/g, function(e) {
return o[e];
}).replace(/،/g, ",");
},
postformat:function(e) {
return e.replace(/\d/g, function(e) {
return t[e];
}).replace(/,/g, "،");
},
ordinal:"%dم",
week:{
dow:6,
doy:12
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e, t, n, r) {
var i = "";
switch (n) {
case "s":
return r ? "muutaman sekunnin" :"muutama sekunti";

case "m":
return r ? "minuutin" :"minuutti";

case "mm":
i = r ? "minuutin" :"minuuttia";
break;

case "h":
return r ? "tunnin" :"tunti";

case "hh":
i = r ? "tunnin" :"tuntia";
break;

case "d":
return r ? "päivän" :"päivä";

case "dd":
i = r ? "päivän" :"päivää";
break;

case "M":
return r ? "kuukauden" :"kuukausi";

case "MM":
i = r ? "kuukauden" :"kuukautta";
break;

case "y":
return r ? "vuoden" :"vuosi";

case "yy":
i = r ? "vuoden" :"vuotta";
}
return i = o(e, r) + " " + i;
}
function o(e, t) {
return 10 > e ? t ? r[e] :n[e] :e;
}
var n = "nolla yksi kaksi kolme neljä viisi kuusi seitsemän kahdeksan yhdeksän".split(" "), r = [ "nolla", "yhden", "kahden", "kolmen", "neljän", "viiden", "kuuden", n[7], n[8], n[9] ];
return e.lang("fi", {
months:"tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu".split("_"),
monthsShort:"tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu".split("_"),
weekdays:"sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai".split("_"),
weekdaysShort:"su_ma_ti_ke_to_pe_la".split("_"),
weekdaysMin:"su_ma_ti_ke_to_pe_la".split("_"),
longDateFormat:{
LT:"HH.mm",
L:"DD.MM.YYYY",
LL:"Do MMMM[ta] YYYY",
LLL:"Do MMMM[ta] YYYY, [klo] LT",
LLLL:"dddd, Do MMMM[ta] YYYY, [klo] LT",
l:"D.M.YYYY",
ll:"Do MMM YYYY",
lll:"Do MMM YYYY, [klo] LT",
llll:"ddd, Do MMM YYYY, [klo] LT"
},
calendar:{
sameDay:"[tänään] [klo] LT",
nextDay:"[huomenna] [klo] LT",
nextWeek:"dddd [klo] LT",
lastDay:"[eilen] [klo] LT",
lastWeek:"[viime] dddd[na] [klo] LT",
sameElse:"L"
},
relativeTime:{
future:"%s päästä",
past:"%s sitten",
s:t,
m:t,
mm:t,
h:t,
hh:t,
d:t,
dd:t,
M:t,
MM:t,
y:t,
yy:t
},
ordinal:"%d.",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("fo", {
months:"januar_februar_mars_apríl_mai_juni_juli_august_september_oktober_november_desember".split("_"),
monthsShort:"jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),
weekdays:"sunnudagur_mánadagur_týsdagur_mikudagur_hósdagur_fríggjadagur_leygardagur".split("_"),
weekdaysShort:"sun_mán_týs_mik_hós_frí_ley".split("_"),
weekdaysMin:"su_má_tý_mi_hó_fr_le".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd D. MMMM, YYYY LT"
},
calendar:{
sameDay:"[Í dag kl.] LT",
nextDay:"[Í morgin kl.] LT",
nextWeek:"dddd [kl.] LT",
lastDay:"[Í gjár kl.] LT",
lastWeek:"[síðstu] dddd [kl] LT",
sameElse:"L"
},
relativeTime:{
future:"um %s",
past:"%s síðani",
s:"fá sekund",
m:"ein minutt",
mm:"%d minuttir",
h:"ein tími",
hh:"%d tímar",
d:"ein dagur",
dd:"%d dagar",
M:"ein mánaði",
MM:"%d mánaðir",
y:"eitt ár",
yy:"%d ár"
},
ordinal:"%d.",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("fr-ca", {
months:"janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
monthsShort:"janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
weekdays:"dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
weekdaysShort:"dim._lun._mar._mer._jeu._ven._sam.".split("_"),
weekdaysMin:"Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"YYYY-MM-DD",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd D MMMM YYYY LT"
},
calendar:{
sameDay:"[Aujourd'hui à] LT",
nextDay:"[Demain à] LT",
nextWeek:"dddd [à] LT",
lastDay:"[Hier à] LT",
lastWeek:"dddd [dernier à] LT",
sameElse:"L"
},
relativeTime:{
future:"dans %s",
past:"il y a %s",
s:"quelques secondes",
m:"une minute",
mm:"%d minutes",
h:"une heure",
hh:"%d heures",
d:"un jour",
dd:"%d jours",
M:"un mois",
MM:"%d mois",
y:"un an",
yy:"%d ans"
},
ordinal:function(e) {
return e + (1 === e ? "er" :"");
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("fr", {
months:"janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
monthsShort:"janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
weekdays:"dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
weekdaysShort:"dim._lun._mar._mer._jeu._ven._sam.".split("_"),
weekdaysMin:"Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd D MMMM YYYY LT"
},
calendar:{
sameDay:"[Aujourd'hui à] LT",
nextDay:"[Demain à] LT",
nextWeek:"dddd [à] LT",
lastDay:"[Hier à] LT",
lastWeek:"dddd [dernier à] LT",
sameElse:"L"
},
relativeTime:{
future:"dans %s",
past:"il y a %s",
s:"quelques secondes",
m:"une minute",
mm:"%d minutes",
h:"une heure",
hh:"%d heures",
d:"un jour",
dd:"%d jours",
M:"un mois",
MM:"%d mois",
y:"un an",
yy:"%d ans"
},
ordinal:function(e) {
return e + (1 === e ? "er" :"");
},
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("gl", {
months:"Xaneiro_Febreiro_Marzo_Abril_Maio_Xuño_Xullo_Agosto_Setembro_Outubro_Novembro_Decembro".split("_"),
monthsShort:"Xan._Feb._Mar._Abr._Mai._Xuñ._Xul._Ago._Set._Out._Nov._Dec.".split("_"),
weekdays:"Domingo_Luns_Martes_Mércores_Xoves_Venres_Sábado".split("_"),
weekdaysShort:"Dom._Lun._Mar._Mér._Xov._Ven._Sáb.".split("_"),
weekdaysMin:"Do_Lu_Ma_Mé_Xo_Ve_Sá".split("_"),
longDateFormat:{
LT:"H:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd D MMMM YYYY LT"
},
calendar:{
sameDay:function() {
return "[hoxe " + (1 !== this.hours() ? "ás" :"á") + "] LT";
},
nextDay:function() {
return "[mañá " + (1 !== this.hours() ? "ás" :"á") + "] LT";
},
nextWeek:function() {
return "dddd [" + (1 !== this.hours() ? "ás" :"a") + "] LT";
},
lastDay:function() {
return "[onte " + (1 !== this.hours() ? "á" :"a") + "] LT";
},
lastWeek:function() {
return "[o] dddd [pasado " + (1 !== this.hours() ? "ás" :"a") + "] LT";
},
sameElse:"L"
},
relativeTime:{
future:function(e) {
return "uns segundos" === e ? "nuns segundos" :"en " + e;
},
past:"hai %s",
s:"uns segundos",
m:"un minuto",
mm:"%d minutos",
h:"unha hora",
hh:"%d horas",
d:"un día",
dd:"%d días",
M:"un mes",
MM:"%d meses",
y:"un ano",
yy:"%d anos"
},
ordinal:"%dº",
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("he", {
months:"ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר".split("_"),
monthsShort:"ינו׳_פבר׳_מרץ_אפר׳_מאי_יוני_יולי_אוג׳_ספט׳_אוק׳_נוב׳_דצמ׳".split("_"),
weekdays:"ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת".split("_"),
weekdaysShort:"א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳".split("_"),
weekdaysMin:"א_ב_ג_ד_ה_ו_ש".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D [ב]MMMM YYYY",
LLL:"D [ב]MMMM YYYY LT",
LLLL:"dddd, D [ב]MMMM YYYY LT",
l:"D/M/YYYY",
ll:"D MMM YYYY",
lll:"D MMM YYYY LT",
llll:"ddd, D MMM YYYY LT"
},
calendar:{
sameDay:"[היום ב־]LT",
nextDay:"[מחר ב־]LT",
nextWeek:"dddd [בשעה] LT",
lastDay:"[אתמול ב־]LT",
lastWeek:"[ביום] dddd [האחרון בשעה] LT",
sameElse:"L"
},
relativeTime:{
future:"בעוד %s",
past:"לפני %s",
s:"מספר שניות",
m:"דקה",
mm:"%d דקות",
h:"שעה",
hh:function(e) {
return 2 === e ? "שעתיים" :e + " שעות";
},
d:"יום",
dd:function(e) {
return 2 === e ? "יומיים" :e + " ימים";
},
M:"חודש",
MM:function(e) {
return 2 === e ? "חודשיים" :e + " חודשים";
},
y:"שנה",
yy:function(e) {
return 2 === e ? "שנתיים" :e + " שנים";
}
}
});
}), function(e) {
e(lt);
}(function(e) {
var t = {
1:"१",
2:"२",
3:"३",
4:"४",
5:"५",
6:"६",
7:"७",
8:"८",
9:"९",
0:"०"
}, o = {
"१":"1",
"२":"2",
"३":"3",
"४":"4",
"५":"5",
"६":"6",
"७":"7",
"८":"8",
"९":"9",
"०":"0"
};
return e.lang("hi", {
months:"जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर".split("_"),
monthsShort:"जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.".split("_"),
weekdays:"रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार".split("_"),
weekdaysShort:"रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि".split("_"),
weekdaysMin:"र_सो_मं_बु_गु_शु_श".split("_"),
longDateFormat:{
LT:"A h:mm बजे",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY, LT",
LLLL:"dddd, D MMMM YYYY, LT"
},
calendar:{
sameDay:"[आज] LT",
nextDay:"[कल] LT",
nextWeek:"dddd, LT",
lastDay:"[कल] LT",
lastWeek:"[पिछले] dddd, LT",
sameElse:"L"
},
relativeTime:{
future:"%s में",
past:"%s पहले",
s:"कुछ ही क्षण",
m:"एक मिनट",
mm:"%d मिनट",
h:"एक घंटा",
hh:"%d घंटे",
d:"एक दिन",
dd:"%d दिन",
M:"एक महीने",
MM:"%d महीने",
y:"एक वर्ष",
yy:"%d वर्ष"
},
preparse:function(e) {
return e.replace(/[१२३४५६७८९०]/g, function(e) {
return o[e];
});
},
postformat:function(e) {
return e.replace(/\d/g, function(e) {
return t[e];
});
},
meridiem:function(e) {
return 4 > e ? "रात" :10 > e ? "सुबह" :17 > e ? "दोपहर" :20 > e ? "शाम" :"रात";
},
week:{
dow:0,
doy:6
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e, t, o) {
var n = e + " ";
switch (o) {
case "m":
return t ? "jedna minuta" :"jedne minute";

case "mm":
return n += 1 === e ? "minuta" :2 === e || 3 === e || 4 === e ? "minute" :"minuta";

case "h":
return t ? "jedan sat" :"jednog sata";

case "hh":
return n += 1 === e ? "sat" :2 === e || 3 === e || 4 === e ? "sata" :"sati";

case "dd":
return n += 1 === e ? "dan" :"dana";

case "MM":
return n += 1 === e ? "mjesec" :2 === e || 3 === e || 4 === e ? "mjeseca" :"mjeseci";

case "yy":
return n += 1 === e ? "godina" :2 === e || 3 === e || 4 === e ? "godine" :"godina";
}
}
return e.lang("hr", {
months:"sječanj_veljača_ožujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac".split("_"),
monthsShort:"sje._vel._ožu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.".split("_"),
weekdays:"nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"),
weekdaysShort:"ned._pon._uto._sri._čet._pet._sub.".split("_"),
weekdaysMin:"ne_po_ut_sr_če_pe_su".split("_"),
longDateFormat:{
LT:"H:mm",
L:"DD. MM. YYYY",
LL:"D. MMMM YYYY",
LLL:"D. MMMM YYYY LT",
LLLL:"dddd, D. MMMM YYYY LT"
},
calendar:{
sameDay:"[danas u] LT",
nextDay:"[sutra u] LT",
nextWeek:function() {
switch (this.day()) {
case 0:
return "[u] [nedjelju] [u] LT";

case 3:
return "[u] [srijedu] [u] LT";

case 6:
return "[u] [subotu] [u] LT";

case 1:
case 2:
case 4:
case 5:
return "[u] dddd [u] LT";
}
},
lastDay:"[jučer u] LT",
lastWeek:function() {
switch (this.day()) {
case 0:
case 3:
return "[prošlu] dddd [u] LT";

case 6:
return "[prošle] [subote] [u] LT";

case 1:
case 2:
case 4:
case 5:
return "[prošli] dddd [u] LT";
}
},
sameElse:"L"
},
relativeTime:{
future:"za %s",
past:"prije %s",
s:"par sekundi",
m:t,
mm:t,
h:t,
hh:t,
d:"dan",
dd:t,
M:"mjesec",
MM:t,
y:"godinu",
yy:t
},
ordinal:"%d.",
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e, t, o, n) {
var r = e;
switch (o) {
case "s":
return n || t ? "néhány másodperc" :"néhány másodperce";

case "m":
return "egy" + (n || t ? " perc" :" perce");

case "mm":
return r + (n || t ? " perc" :" perce");

case "h":
return "egy" + (n || t ? " óra" :" órája");

case "hh":
return r + (n || t ? " óra" :" órája");

case "d":
return "egy" + (n || t ? " nap" :" napja");

case "dd":
return r + (n || t ? " nap" :" napja");

case "M":
return "egy" + (n || t ? " hónap" :" hónapja");

case "MM":
return r + (n || t ? " hónap" :" hónapja");

case "y":
return "egy" + (n || t ? " év" :" éve");

case "yy":
return r + (n || t ? " év" :" éve");
}
return "";
}
function o(e) {
return (e ? "" :"[múlt] ") + "[" + n[this.day()] + "] LT[-kor]";
}
var n = "vasárnap hétfőn kedden szerdán csütörtökön pénteken szombaton".split(" ");
return e.lang("hu", {
months:"január_február_március_április_május_június_július_augusztus_szeptember_október_november_december".split("_"),
monthsShort:"jan_feb_márc_ápr_máj_jún_júl_aug_szept_okt_nov_dec".split("_"),
weekdays:"vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat".split("_"),
weekdaysShort:"vas_hét_kedd_sze_csüt_pén_szo".split("_"),
weekdaysMin:"v_h_k_sze_cs_p_szo".split("_"),
longDateFormat:{
LT:"H:mm",
L:"YYYY.MM.DD.",
LL:"YYYY. MMMM D.",
LLL:"YYYY. MMMM D., LT",
LLLL:"YYYY. MMMM D., dddd LT"
},
meridiem:function(e, t, o) {
return 12 > e ? o === !0 ? "de" :"DE" :o === !0 ? "du" :"DU";
},
calendar:{
sameDay:"[ma] LT[-kor]",
nextDay:"[holnap] LT[-kor]",
nextWeek:function() {
return o.call(this, !0);
},
lastDay:"[tegnap] LT[-kor]",
lastWeek:function() {
return o.call(this, !1);
},
sameElse:"L"
},
relativeTime:{
future:"%s múlva",
past:"%s",
s:t,
m:t,
mm:t,
h:t,
hh:t,
d:t,
dd:t,
M:t,
MM:t,
y:t,
yy:t
},
ordinal:"%d.",
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e, t) {
var o = {
nominative:"հունվար_փետրվար_մարտ_ապրիլ_մայիս_հունիս_հուլիս_օգոստոս_սեպտեմբեր_հոկտեմբեր_նոյեմբեր_դեկտեմբեր".split("_"),
accusative:"հունվարի_փետրվարի_մարտի_ապրիլի_մայիսի_հունիսի_հուլիսի_օգոստոսի_սեպտեմբերի_հոկտեմբերի_նոյեմբերի_դեկտեմբերի".split("_")
}, n = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/.test(t) ? "accusative" :"nominative";
return o[n][e.month()];
}
function o(e) {
var t = "հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ".split("_");
return t[e.month()];
}
function n(e) {
var t = "կիրակի_երկուշաբթի_երեքշաբթի_չորեքշաբթի_հինգշաբթի_ուրբաթ_շաբաթ".split("_");
return t[e.day()];
}
return e.lang("hy-am", {
months:t,
monthsShort:o,
weekdays:n,
weekdaysShort:"կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ".split("_"),
weekdaysMin:"կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD.MM.YYYY",
LL:"D MMMM YYYY թ.",
LLL:"D MMMM YYYY թ., LT",
LLLL:"dddd, D MMMM YYYY թ., LT"
},
calendar:{
sameDay:"[այսօր] LT",
nextDay:"[վաղը] LT",
lastDay:"[երեկ] LT",
nextWeek:function() {
return "dddd [օրը ժամը] LT";
},
lastWeek:function() {
return "[անցած] dddd [օրը ժամը] LT";
},
sameElse:"L"
},
relativeTime:{
future:"%s հետո",
past:"%s առաջ",
s:"մի քանի վայրկյան",
m:"րոպե",
mm:"%d րոպե",
h:"ժամ",
hh:"%d ժամ",
d:"օր",
dd:"%d օր",
M:"ամիս",
MM:"%d ամիս",
y:"տարի",
yy:"%d տարի"
},
meridiem:function(e) {
return 4 > e ? "գիշերվա" :12 > e ? "առավոտվա" :17 > e ? "ցերեկվա" :"երեկոյան";
},
ordinal:function(e, t) {
switch (t) {
case "DDD":
case "w":
case "W":
case "DDDo":
return 1 === e ? e + "-ին" :e + "-րդ";

default:
return e;
}
},
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("id", {
months:"Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember".split("_"),
monthsShort:"Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nov_Des".split("_"),
weekdays:"Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu".split("_"),
weekdaysShort:"Min_Sen_Sel_Rab_Kam_Jum_Sab".split("_"),
weekdaysMin:"Mg_Sn_Sl_Rb_Km_Jm_Sb".split("_"),
longDateFormat:{
LT:"HH.mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY [pukul] LT",
LLLL:"dddd, D MMMM YYYY [pukul] LT"
},
meridiem:function(e) {
return 11 > e ? "pagi" :15 > e ? "siang" :19 > e ? "sore" :"malam";
},
calendar:{
sameDay:"[Hari ini pukul] LT",
nextDay:"[Besok pukul] LT",
nextWeek:"dddd [pukul] LT",
lastDay:"[Kemarin pukul] LT",
lastWeek:"dddd [lalu pukul] LT",
sameElse:"L"
},
relativeTime:{
future:"dalam %s",
past:"%s yang lalu",
s:"beberapa detik",
m:"semenit",
mm:"%d menit",
h:"sejam",
hh:"%d jam",
d:"sehari",
dd:"%d hari",
M:"sebulan",
MM:"%d bulan",
y:"setahun",
yy:"%d tahun"
},
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e) {
return e % 100 === 11 ? !0 :e % 10 === 1 ? !1 :!0;
}
function o(e, o, n, r) {
var i = e + " ";
switch (n) {
case "s":
return o || r ? "nokkrar sekúndur" :"nokkrum sekúndum";

case "m":
return o ? "mínúta" :"mínútu";

case "mm":
return t(e) ? i + (o || r ? "mínútur" :"mínútum") :o ? i + "mínúta" :i + "mínútu";

case "hh":
return t(e) ? i + (o || r ? "klukkustundir" :"klukkustundum") :i + "klukkustund";

case "d":
return o ? "dagur" :r ? "dag" :"degi";

case "dd":
return t(e) ? o ? i + "dagar" :i + (r ? "daga" :"dögum") :o ? i + "dagur" :i + (r ? "dag" :"degi");

case "M":
return o ? "mánuður" :r ? "mánuð" :"mánuði";

case "MM":
return t(e) ? o ? i + "mánuðir" :i + (r ? "mánuði" :"mánuðum") :o ? i + "mánuður" :i + (r ? "mánuð" :"mánuði");

case "y":
return o || r ? "ár" :"ári";

case "yy":
return t(e) ? i + (o || r ? "ár" :"árum") :i + (o || r ? "ár" :"ári");
}
}
return e.lang("is", {
months:"janúar_febrúar_mars_apríl_maí_júní_júlí_ágúst_september_október_nóvember_desember".split("_"),
monthsShort:"jan_feb_mar_apr_maí_jún_júl_ágú_sep_okt_nóv_des".split("_"),
weekdays:"sunnudagur_mánudagur_þriðjudagur_miðvikudagur_fimmtudagur_föstudagur_laugardagur".split("_"),
weekdaysShort:"sun_mán_þri_mið_fim_fös_lau".split("_"),
weekdaysMin:"Su_Má_Þr_Mi_Fi_Fö_La".split("_"),
longDateFormat:{
LT:"H:mm",
L:"DD/MM/YYYY",
LL:"D. MMMM YYYY",
LLL:"D. MMMM YYYY [kl.] LT",
LLLL:"dddd, D. MMMM YYYY [kl.] LT"
},
calendar:{
sameDay:"[í dag kl.] LT",
nextDay:"[á morgun kl.] LT",
nextWeek:"dddd [kl.] LT",
lastDay:"[í gær kl.] LT",
lastWeek:"[síðasta] dddd [kl.] LT",
sameElse:"L"
},
relativeTime:{
future:"eftir %s",
past:"fyrir %s síðan",
s:o,
m:o,
mm:o,
h:"klukkustund",
hh:o,
d:o,
dd:o,
M:o,
MM:o,
y:o,
yy:o
},
ordinal:"%d.",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("it", {
months:"Gennaio_Febbraio_Marzo_Aprile_Maggio_Giugno_Luglio_Agosto_Settembre_Ottobre_Novembre_Dicembre".split("_"),
monthsShort:"Gen_Feb_Mar_Apr_Mag_Giu_Lug_Ago_Set_Ott_Nov_Dic".split("_"),
weekdays:"Domenica_Lunedì_Martedì_Mercoledì_Giovedì_Venerdì_Sabato".split("_"),
weekdaysShort:"Dom_Lun_Mar_Mer_Gio_Ven_Sab".split("_"),
weekdaysMin:"D_L_Ma_Me_G_V_S".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd, D MMMM YYYY LT"
},
calendar:{
sameDay:"[Oggi alle] LT",
nextDay:"[Domani alle] LT",
nextWeek:"dddd [alle] LT",
lastDay:"[Ieri alle] LT",
lastWeek:"[lo scorso] dddd [alle] LT",
sameElse:"L"
},
relativeTime:{
future:function(e) {
return (/^[0-9].+$/.test(e) ? "tra" :"in") + " " + e;
},
past:"%s fa",
s:"alcuni secondi",
m:"un minuto",
mm:"%d minuti",
h:"un'ora",
hh:"%d ore",
d:"un giorno",
dd:"%d giorni",
M:"un mese",
MM:"%d mesi",
y:"un anno",
yy:"%d anni"
},
ordinal:"%dº",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("ja", {
months:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
weekdays:"日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日".split("_"),
weekdaysShort:"日_月_火_水_木_金_土".split("_"),
weekdaysMin:"日_月_火_水_木_金_土".split("_"),
longDateFormat:{
LT:"Ah時m分",
L:"YYYY/MM/DD",
LL:"YYYY年M月D日",
LLL:"YYYY年M月D日LT",
LLLL:"YYYY年M月D日LT dddd"
},
meridiem:function(e) {
return 12 > e ? "午前" :"午後";
},
calendar:{
sameDay:"[今日] LT",
nextDay:"[明日] LT",
nextWeek:"[来週]dddd LT",
lastDay:"[昨日] LT",
lastWeek:"[前週]dddd LT",
sameElse:"L"
},
relativeTime:{
future:"%s後",
past:"%s前",
s:"数秒",
m:"1分",
mm:"%d分",
h:"1時間",
hh:"%d時間",
d:"1日",
dd:"%d日",
M:"1ヶ月",
MM:"%dヶ月",
y:"1年",
yy:"%d年"
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e, t) {
var o = {
nominative:"იანვარი_თებერვალი_მარტი_აპრილი_მაისი_ივნისი_ივლისი_აგვისტო_სექტემბერი_ოქტომბერი_ნოემბერი_დეკემბერი".split("_"),
accusative:"იანვარს_თებერვალს_მარტს_აპრილის_მაისს_ივნისს_ივლისს_აგვისტს_სექტემბერს_ოქტომბერს_ნოემბერს_დეკემბერს".split("_")
}, n = /D[oD] *MMMM?/.test(t) ? "accusative" :"nominative";
return o[n][e.month()];
}
function o(e, t) {
var o = {
nominative:"კვირა_ორშაბათი_სამშაბათი_ოთხშაბათი_ხუთშაბათი_პარასკევი_შაბათი".split("_"),
accusative:"კვირას_ორშაბათს_სამშაბათს_ოთხშაბათს_ხუთშაბათს_პარასკევს_შაბათს".split("_")
}, n = /(წინა|შემდეგ)/.test(t) ? "accusative" :"nominative";
return o[n][e.day()];
}
return e.lang("ka", {
months:t,
monthsShort:"იან_თებ_მარ_აპრ_მაი_ივნ_ივლ_აგვ_სექ_ოქტ_ნოე_დეკ".split("_"),
weekdays:o,
weekdaysShort:"კვი_ორშ_სამ_ოთხ_ხუთ_პარ_შაბ".split("_"),
weekdaysMin:"კვ_ორ_სა_ოთ_ხუ_პა_შა".split("_"),
longDateFormat:{
LT:"h:mm A",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd, D MMMM YYYY LT"
},
calendar:{
sameDay:"[დღეს] LT[-ზე]",
nextDay:"[ხვალ] LT[-ზე]",
lastDay:"[გუშინ] LT[-ზე]",
nextWeek:"[შემდეგ] dddd LT[-ზე]",
lastWeek:"[წინა] dddd LT-ზე",
sameElse:"L"
},
relativeTime:{
future:function(e) {
return /(წამი|წუთი|საათი|წელი)/.test(e) ? e.replace(/ი$/, "ში") :e + "ში";
},
past:function(e) {
return /(წამი|წუთი|საათი|დღე|თვე)/.test(e) ? e.replace(/(ი|ე)$/, "ის წინ") :/წელი/.test(e) ? e.replace(/წელი$/, "წლის წინ") :void 0;
},
s:"რამდენიმე წამი",
m:"წუთი",
mm:"%d წუთი",
h:"საათი",
hh:"%d საათი",
d:"დღე",
dd:"%d დღე",
M:"თვე",
MM:"%d თვე",
y:"წელი",
yy:"%d წელი"
},
ordinal:function(e) {
return 0 === e ? e :1 === e ? e + "-ლი" :20 > e || 100 >= e && e % 20 === 0 || e % 100 === 0 ? "მე-" + e :e + "-ე";
},
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("km", {
months:"មករា_កុម្ភៈ_មិនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ".split("_"),
monthsShort:"មករា_កុម្ភៈ_មិនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ".split("_"),
weekdays:"អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍".split("_"),
weekdaysShort:"អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍".split("_"),
weekdaysMin:"អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd, D MMMM YYYY LT"
},
calendar:{
sameDay:"[ថ្ងៃនៈ ម៉ោង] LT",
nextDay:"[ស្អែក ម៉ោង] LT",
nextWeek:"dddd [ម៉ោង] LT",
lastDay:"[ម្សិលមិញ ម៉ោង] LT",
lastWeek:"dddd [សប្តាហ៍មុន] [ម៉ោង] LT",
sameElse:"L"
},
relativeTime:{
future:"%sទៀត",
past:"%sមុន",
s:"ប៉ុន្មានវិនាទី",
m:"មួយនាទី",
mm:"%d នាទី",
h:"មួយម៉ោង",
hh:"%d ម៉ោង",
d:"មួយថ្ងៃ",
dd:"%d ថ្ងៃ",
M:"មួយខែ",
MM:"%d ខែ",
y:"មួយឆ្នាំ",
yy:"%d ឆ្នាំ"
},
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("ko", {
months:"1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),
monthsShort:"1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),
weekdays:"일요일_월요일_화요일_수요일_목요일_금요일_토요일".split("_"),
weekdaysShort:"일_월_화_수_목_금_토".split("_"),
weekdaysMin:"일_월_화_수_목_금_토".split("_"),
longDateFormat:{
LT:"A h시 mm분",
L:"YYYY.MM.DD",
LL:"YYYY년 MMMM D일",
LLL:"YYYY년 MMMM D일 LT",
LLLL:"YYYY년 MMMM D일 dddd LT"
},
meridiem:function(e) {
return 12 > e ? "오전" :"오후";
},
calendar:{
sameDay:"오늘 LT",
nextDay:"내일 LT",
nextWeek:"dddd LT",
lastDay:"어제 LT",
lastWeek:"지난주 dddd LT",
sameElse:"L"
},
relativeTime:{
future:"%s 후",
past:"%s 전",
s:"몇초",
ss:"%d초",
m:"일분",
mm:"%d분",
h:"한시간",
hh:"%d시간",
d:"하루",
dd:"%d일",
M:"한달",
MM:"%d달",
y:"일년",
yy:"%d년"
},
ordinal:"%d일",
meridiemParse:/(오전|오후)/,
isPM:function(e) {
return "오후" === e;
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e, t, o) {
var n = {
m:[ "eng Minutt", "enger Minutt" ],
h:[ "eng Stonn", "enger Stonn" ],
d:[ "een Dag", "engem Dag" ],
dd:[ e + " Deeg", e + " Deeg" ],
M:[ "ee Mount", "engem Mount" ],
MM:[ e + " Méint", e + " Méint" ],
y:[ "ee Joer", "engem Joer" ],
yy:[ e + " Joer", e + " Joer" ]
};
return t ? n[o][0] :n[o][1];
}
function o(e) {
var t = e.substr(0, e.indexOf(" "));
return a(t) ? "a " + e :"an " + e;
}
function n(e) {
var t = e.substr(0, e.indexOf(" "));
return a(t) ? "viru " + e :"virun " + e;
}
function r() {
var e = this.format("d");
return i(e) ? "[Leschte] dddd [um] LT" :"[Leschten] dddd [um] LT";
}
function i(e) {
switch (e = parseInt(e, 10)) {
case 0:
case 1:
case 3:
case 5:
case 6:
return !0;

default:
return !1;
}
}
function a(e) {
if (e = parseInt(e, 10), isNaN(e)) return !1;
if (0 > e) return !0;
if (10 > e) return e >= 4 && 7 >= e ? !0 :!1;
if (100 > e) {
var t = e % 10, o = e / 10;
return a(0 === t ? o :t);
}
if (1e4 > e) {
for (;e >= 10; ) e /= 10;
return a(e);
}
return e /= 1e3, a(e);
}
return e.lang("lb", {
months:"Januar_Februar_Mäerz_Abrëll_Mee_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
monthsShort:"Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),
weekdays:"Sonndeg_Méindeg_Dënschdeg_Mëttwoch_Donneschdeg_Freideg_Samschdeg".split("_"),
weekdaysShort:"So._Mé._Dë._Më._Do._Fr._Sa.".split("_"),
weekdaysMin:"So_Mé_Dë_Më_Do_Fr_Sa".split("_"),
longDateFormat:{
LT:"H:mm [Auer]",
L:"DD.MM.YYYY",
LL:"D. MMMM YYYY",
LLL:"D. MMMM YYYY LT",
LLLL:"dddd, D. MMMM YYYY LT"
},
calendar:{
sameDay:"[Haut um] LT",
sameElse:"L",
nextDay:"[Muer um] LT",
nextWeek:"dddd [um] LT",
lastDay:"[Gëschter um] LT",
lastWeek:r
},
relativeTime:{
future:o,
past:n,
s:"e puer Sekonnen",
m:t,
mm:"%d Minutten",
h:t,
hh:"%d Stonnen",
d:t,
dd:t,
M:t,
MM:t,
y:t,
yy:t
},
ordinal:"%d.",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e, t, o, n) {
return t ? "kelios sekundės" :n ? "kelių sekundžių" :"kelias sekundes";
}
function o(e, t, o, n) {
return t ? r(o)[0] :n ? r(o)[1] :r(o)[2];
}
function n(e) {
return e % 10 === 0 || e > 10 && 20 > e;
}
function r(e) {
return s[e].split("_");
}
function i(e, t, i, a) {
var s = e + " ";
return 1 === e ? s + o(e, t, i[0], a) :t ? s + (n(e) ? r(i)[1] :r(i)[0]) :a ? s + r(i)[1] :s + (n(e) ? r(i)[1] :r(i)[2]);
}
function a(e, t) {
var o = -1 === t.indexOf("dddd HH:mm"), n = l[e.weekday()];
return o ? n :n.substring(0, n.length - 2) + "į";
}
var s = {
m:"minutė_minutės_minutę",
mm:"minutės_minučių_minutes",
h:"valanda_valandos_valandą",
hh:"valandos_valandų_valandas",
d:"diena_dienos_dieną",
dd:"dienos_dienų_dienas",
M:"mėnuo_mėnesio_mėnesį",
MM:"mėnesiai_mėnesių_mėnesius",
y:"metai_metų_metus",
yy:"metai_metų_metus"
}, l = "pirmadienis_antradienis_trečiadienis_ketvirtadienis_penktadienis_šeštadienis_sekmadienis".split("_");
return e.lang("lt", {
months:"sausio_vasario_kovo_balandžio_gegužės_biržėlio_liepos_rugpjūčio_rugsėjo_spalio_lapkričio_gruodžio".split("_"),
monthsShort:"sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd".split("_"),
weekdays:a,
weekdaysShort:"Sek_Pir_Ant_Tre_Ket_Pen_Šeš".split("_"),
weekdaysMin:"S_P_A_T_K_Pn_Š".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"YYYY-MM-DD",
LL:"YYYY [m.] MMMM D [d.]",
LLL:"YYYY [m.] MMMM D [d.], LT [val.]",
LLLL:"YYYY [m.] MMMM D [d.], dddd, LT [val.]",
l:"YYYY-MM-DD",
ll:"YYYY [m.] MMMM D [d.]",
lll:"YYYY [m.] MMMM D [d.], LT [val.]",
llll:"YYYY [m.] MMMM D [d.], ddd, LT [val.]"
},
calendar:{
sameDay:"[Šiandien] LT",
nextDay:"[Rytoj] LT",
nextWeek:"dddd LT",
lastDay:"[Vakar] LT",
lastWeek:"[Praėjusį] dddd LT",
sameElse:"L"
},
relativeTime:{
future:"po %s",
past:"prieš %s",
s:t,
m:o,
mm:i,
h:o,
hh:i,
d:o,
dd:i,
M:o,
MM:i,
y:o,
yy:i
},
ordinal:function(e) {
return e + "-oji";
},
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e, t, o) {
var n = e.split("_");
return o ? t % 10 === 1 && 11 !== t ? n[2] :n[3] :t % 10 === 1 && 11 !== t ? n[0] :n[1];
}
function o(e, o, r) {
return e + " " + t(n[r], e, o);
}
var n = {
mm:"minūti_minūtes_minūte_minūtes",
hh:"stundu_stundas_stunda_stundas",
dd:"dienu_dienas_diena_dienas",
MM:"mēnesi_mēnešus_mēnesis_mēneši",
yy:"gadu_gadus_gads_gadi"
};
return e.lang("lv", {
months:"janvāris_februāris_marts_aprīlis_maijs_jūnijs_jūlijs_augusts_septembris_oktobris_novembris_decembris".split("_"),
monthsShort:"jan_feb_mar_apr_mai_jūn_jūl_aug_sep_okt_nov_dec".split("_"),
weekdays:"svētdiena_pirmdiena_otrdiena_trešdiena_ceturtdiena_piektdiena_sestdiena".split("_"),
weekdaysShort:"Sv_P_O_T_C_Pk_S".split("_"),
weekdaysMin:"Sv_P_O_T_C_Pk_S".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD.MM.YYYY",
LL:"YYYY. [gada] D. MMMM",
LLL:"YYYY. [gada] D. MMMM, LT",
LLLL:"YYYY. [gada] D. MMMM, dddd, LT"
},
calendar:{
sameDay:"[Šodien pulksten] LT",
nextDay:"[Rīt pulksten] LT",
nextWeek:"dddd [pulksten] LT",
lastDay:"[Vakar pulksten] LT",
lastWeek:"[Pagājušā] dddd [pulksten] LT",
sameElse:"L"
},
relativeTime:{
future:"%s vēlāk",
past:"%s agrāk",
s:"dažas sekundes",
m:"minūti",
mm:o,
h:"stundu",
hh:o,
d:"dienu",
dd:o,
M:"mēnesi",
MM:o,
y:"gadu",
yy:o
},
ordinal:"%d.",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("mk", {
months:"јануари_февруари_март_април_мај_јуни_јули_август_септември_октомври_ноември_декември".split("_"),
monthsShort:"јан_фев_мар_апр_мај_јун_јул_авг_сеп_окт_ное_дек".split("_"),
weekdays:"недела_понеделник_вторник_среда_четврток_петок_сабота".split("_"),
weekdaysShort:"нед_пон_вто_сре_чет_пет_саб".split("_"),
weekdaysMin:"нe_пo_вт_ср_че_пе_сa".split("_"),
longDateFormat:{
LT:"H:mm",
L:"D.MM.YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd, D MMMM YYYY LT"
},
calendar:{
sameDay:"[Денес во] LT",
nextDay:"[Утре во] LT",
nextWeek:"dddd [во] LT",
lastDay:"[Вчера во] LT",
lastWeek:function() {
switch (this.day()) {
case 0:
case 3:
case 6:
return "[Во изминатата] dddd [во] LT";

case 1:
case 2:
case 4:
case 5:
return "[Во изминатиот] dddd [во] LT";
}
},
sameElse:"L"
},
relativeTime:{
future:"после %s",
past:"пред %s",
s:"неколку секунди",
m:"минута",
mm:"%d минути",
h:"час",
hh:"%d часа",
d:"ден",
dd:"%d дена",
M:"месец",
MM:"%d месеци",
y:"година",
yy:"%d години"
},
ordinal:function(e) {
var t = e % 10, o = e % 100;
return 0 === e ? e + "-ев" :0 === o ? e + "-ен" :o > 10 && 20 > o ? e + "-ти" :1 === t ? e + "-ви" :2 === t ? e + "-ри" :7 === t || 8 === t ? e + "-ми" :e + "-ти";
},
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("ml", {
months:"ജനുവരി_ഫെബ്രുവരി_മാർച്ച്_ഏപ്രിൽ_മേയ്_ജൂൺ_ജൂലൈ_ഓഗസ്റ്റ്_സെപ്റ്റംബർ_ഒക്ടോബർ_നവംബർ_ഡിസംബർ".split("_"),
monthsShort:"ജനു._ഫെബ്രു._മാർ._ഏപ്രി._മേയ്_ജൂൺ_ജൂലൈ._ഓഗ._സെപ്റ്റ._ഒക്ടോ._നവം._ഡിസം.".split("_"),
weekdays:"ഞായറാഴ്ച_തിങ്കളാഴ്ച_ചൊവ്വാഴ്ച_ബുധനാഴ്ച_വ്യാഴാഴ്ച_വെള്ളിയാഴ്ച_ശനിയാഴ്ച".split("_"),
weekdaysShort:"ഞായർ_തിങ്കൾ_ചൊവ്വ_ബുധൻ_വ്യാഴം_വെള്ളി_ശനി".split("_"),
weekdaysMin:"ഞാ_തി_ചൊ_ബു_വ്യാ_വെ_ശ".split("_"),
longDateFormat:{
LT:"A h:mm -നു",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY, LT",
LLLL:"dddd, D MMMM YYYY, LT"
},
calendar:{
sameDay:"[ഇന്ന്] LT",
nextDay:"[നാളെ] LT",
nextWeek:"dddd, LT",
lastDay:"[ഇന്നലെ] LT",
lastWeek:"[കഴിഞ്ഞ] dddd, LT",
sameElse:"L"
},
relativeTime:{
future:"%s കഴിഞ്ഞ്",
past:"%s മുൻപ്",
s:"അൽപ നിമിഷങ്ങൾ",
m:"ഒരു മിനിറ്റ്",
mm:"%d മിനിറ്റ്",
h:"ഒരു മണിക്കൂർ",
hh:"%d മണിക്കൂർ",
d:"ഒരു ദിവസം",
dd:"%d ദിവസം",
M:"ഒരു മാസം",
MM:"%d മാസം",
y:"ഒരു വർഷം",
yy:"%d വർഷം"
},
meridiem:function(e) {
return 4 > e ? "രാത്രി" :12 > e ? "രാവിലെ" :17 > e ? "ഉച്ച കഴിഞ്ഞ്" :20 > e ? "വൈകുന്നേരം" :"രാത്രി";
}
});
}), function(e) {
e(lt);
}(function(e) {
var t = {
1:"१",
2:"२",
3:"३",
4:"४",
5:"५",
6:"६",
7:"७",
8:"८",
9:"९",
0:"०"
}, o = {
"१":"1",
"२":"2",
"३":"3",
"४":"4",
"५":"5",
"६":"6",
"७":"7",
"८":"8",
"९":"9",
"०":"0"
};
return e.lang("mr", {
months:"जानेवारी_फेब्रुवारी_मार्च_एप्रिल_मे_जून_जुलै_ऑगस्ट_सप्टेंबर_ऑक्टोबर_नोव्हेंबर_डिसेंबर".split("_"),
monthsShort:"जाने._फेब्रु._मार्च._एप्रि._मे._जून._जुलै._ऑग._सप्टें._ऑक्टो._नोव्हें._डिसें.".split("_"),
weekdays:"रविवार_सोमवार_मंगळवार_बुधवार_गुरूवार_शुक्रवार_शनिवार".split("_"),
weekdaysShort:"रवि_सोम_मंगळ_बुध_गुरू_शुक्र_शनि".split("_"),
weekdaysMin:"र_सो_मं_बु_गु_शु_श".split("_"),
longDateFormat:{
LT:"A h:mm वाजता",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY, LT",
LLLL:"dddd, D MMMM YYYY, LT"
},
calendar:{
sameDay:"[आज] LT",
nextDay:"[उद्या] LT",
nextWeek:"dddd, LT",
lastDay:"[काल] LT",
lastWeek:"[मागील] dddd, LT",
sameElse:"L"
},
relativeTime:{
future:"%s नंतर",
past:"%s पूर्वी",
s:"सेकंद",
m:"एक मिनिट",
mm:"%d मिनिटे",
h:"एक तास",
hh:"%d तास",
d:"एक दिवस",
dd:"%d दिवस",
M:"एक महिना",
MM:"%d महिने",
y:"एक वर्ष",
yy:"%d वर्षे"
},
preparse:function(e) {
return e.replace(/[१२३४५६७८९०]/g, function(e) {
return o[e];
});
},
postformat:function(e) {
return e.replace(/\d/g, function(e) {
return t[e];
});
},
meridiem:function(e) {
return 4 > e ? "रात्री" :10 > e ? "सकाळी" :17 > e ? "दुपारी" :20 > e ? "सायंकाळी" :"रात्री";
},
week:{
dow:0,
doy:6
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("ms-my", {
months:"Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"),
monthsShort:"Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"),
weekdays:"Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"),
weekdaysShort:"Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"),
weekdaysMin:"Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"),
longDateFormat:{
LT:"HH.mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY [pukul] LT",
LLLL:"dddd, D MMMM YYYY [pukul] LT"
},
meridiem:function(e) {
return 11 > e ? "pagi" :15 > e ? "tengahari" :19 > e ? "petang" :"malam";
},
calendar:{
sameDay:"[Hari ini pukul] LT",
nextDay:"[Esok pukul] LT",
nextWeek:"dddd [pukul] LT",
lastDay:"[Kelmarin pukul] LT",
lastWeek:"dddd [lepas pukul] LT",
sameElse:"L"
},
relativeTime:{
future:"dalam %s",
past:"%s yang lepas",
s:"beberapa saat",
m:"seminit",
mm:"%d minit",
h:"sejam",
hh:"%d jam",
d:"sehari",
dd:"%d hari",
M:"sebulan",
MM:"%d bulan",
y:"setahun",
yy:"%d tahun"
},
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("nb", {
months:"januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),
monthsShort:"jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.".split("_"),
weekdays:"søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),
weekdaysShort:"sø._ma._ti._on._to._fr._lø.".split("_"),
weekdaysMin:"sø_ma_ti_on_to_fr_lø".split("_"),
longDateFormat:{
LT:"H.mm",
L:"DD.MM.YYYY",
LL:"D. MMMM YYYY",
LLL:"D. MMMM YYYY [kl.] LT",
LLLL:"dddd D. MMMM YYYY [kl.] LT"
},
calendar:{
sameDay:"[i dag kl.] LT",
nextDay:"[i morgen kl.] LT",
nextWeek:"dddd [kl.] LT",
lastDay:"[i går kl.] LT",
lastWeek:"[forrige] dddd [kl.] LT",
sameElse:"L"
},
relativeTime:{
future:"om %s",
past:"for %s siden",
s:"noen sekunder",
m:"ett minutt",
mm:"%d minutter",
h:"en time",
hh:"%d timer",
d:"en dag",
dd:"%d dager",
M:"en måned",
MM:"%d måneder",
y:"ett år",
yy:"%d år"
},
ordinal:"%d.",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
var t = {
1:"१",
2:"२",
3:"३",
4:"४",
5:"५",
6:"६",
7:"७",
8:"८",
9:"९",
0:"०"
}, o = {
"१":"1",
"२":"2",
"३":"3",
"४":"4",
"५":"5",
"६":"6",
"७":"7",
"८":"8",
"९":"9",
"०":"0"
};
return e.lang("ne", {
months:"जनवरी_फेब्रुवरी_मार्च_अप्रिल_मई_जुन_जुलाई_अगष्ट_सेप्टेम्बर_अक्टोबर_नोभेम्बर_डिसेम्बर".split("_"),
monthsShort:"जन._फेब्रु._मार्च_अप्रि._मई_जुन_जुलाई._अग._सेप्ट._अक्टो._नोभे._डिसे.".split("_"),
weekdays:"आइतबार_सोमबार_मङ्गलबार_बुधबार_बिहिबार_शुक्रबार_शनिबार".split("_"),
weekdaysShort:"आइत._सोम._मङ्गल._बुध._बिहि._शुक्र._शनि.".split("_"),
weekdaysMin:"आइ._सो._मङ्_बु._बि._शु._श.".split("_"),
longDateFormat:{
LT:"Aको h:mm बजे",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY, LT",
LLLL:"dddd, D MMMM YYYY, LT"
},
preparse:function(e) {
return e.replace(/[१२३४५६७८९०]/g, function(e) {
return o[e];
});
},
postformat:function(e) {
return e.replace(/\d/g, function(e) {
return t[e];
});
},
meridiem:function(e) {
return 3 > e ? "राती" :10 > e ? "बिहान" :15 > e ? "दिउँसो" :18 > e ? "बेलुका" :20 > e ? "साँझ" :"राती";
},
calendar:{
sameDay:"[आज] LT",
nextDay:"[भोली] LT",
nextWeek:"[आउँदो] dddd[,] LT",
lastDay:"[हिजो] LT",
lastWeek:"[गएको] dddd[,] LT",
sameElse:"L"
},
relativeTime:{
future:"%sमा",
past:"%s अगाडी",
s:"केही समय",
m:"एक मिनेट",
mm:"%d मिनेट",
h:"एक घण्टा",
hh:"%d घण्टा",
d:"एक दिन",
dd:"%d दिन",
M:"एक महिना",
MM:"%d महिना",
y:"एक बर्ष",
yy:"%d बर्ष"
},
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
var t = "jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_"), o = "jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_");
return e.lang("nl", {
months:"januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),
monthsShort:function(e, n) {
return /-MMM-/.test(n) ? o[e.month()] :t[e.month()];
},
weekdays:"zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),
weekdaysShort:"zo._ma._di._wo._do._vr._za.".split("_"),
weekdaysMin:"Zo_Ma_Di_Wo_Do_Vr_Za".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD-MM-YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd D MMMM YYYY LT"
},
calendar:{
sameDay:"[vandaag om] LT",
nextDay:"[morgen om] LT",
nextWeek:"dddd [om] LT",
lastDay:"[gisteren om] LT",
lastWeek:"[afgelopen] dddd [om] LT",
sameElse:"L"
},
relativeTime:{
future:"over %s",
past:"%s geleden",
s:"een paar seconden",
m:"één minuut",
mm:"%d minuten",
h:"één uur",
hh:"%d uur",
d:"één dag",
dd:"%d dagen",
M:"één maand",
MM:"%d maanden",
y:"één jaar",
yy:"%d jaar"
},
ordinal:function(e) {
return e + (1 === e || 8 === e || e >= 20 ? "ste" :"de");
},
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("nn", {
months:"januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),
monthsShort:"jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),
weekdays:"sundag_måndag_tysdag_onsdag_torsdag_fredag_laurdag".split("_"),
weekdaysShort:"sun_mån_tys_ons_tor_fre_lau".split("_"),
weekdaysMin:"su_må_ty_on_to_fr_lø".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD.MM.YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd D MMMM YYYY LT"
},
calendar:{
sameDay:"[I dag klokka] LT",
nextDay:"[I morgon klokka] LT",
nextWeek:"dddd [klokka] LT",
lastDay:"[I går klokka] LT",
lastWeek:"[Føregåande] dddd [klokka] LT",
sameElse:"L"
},
relativeTime:{
future:"om %s",
past:"for %s sidan",
s:"nokre sekund",
m:"eit minutt",
mm:"%d minutt",
h:"ein time",
hh:"%d timar",
d:"ein dag",
dd:"%d dagar",
M:"ein månad",
MM:"%d månader",
y:"eit år",
yy:"%d år"
},
ordinal:"%d.",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e) {
return 5 > e % 10 && e % 10 > 1 && ~~(e / 10) % 10 !== 1;
}
function o(e, o, n) {
var r = e + " ";
switch (n) {
case "m":
return o ? "minuta" :"minutę";

case "mm":
return r + (t(e) ? "minuty" :"minut");

case "h":
return o ? "godzina" :"godzinę";

case "hh":
return r + (t(e) ? "godziny" :"godzin");

case "MM":
return r + (t(e) ? "miesiące" :"miesięcy");

case "yy":
return r + (t(e) ? "lata" :"lat");
}
}
var n = "styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień".split("_"), r = "stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia".split("_");
return e.lang("pl", {
months:function(e, t) {
return /D MMMM/.test(t) ? r[e.month()] :n[e.month()];
},
monthsShort:"sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru".split("_"),
weekdays:"niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota".split("_"),
weekdaysShort:"nie_pon_wt_śr_czw_pt_sb".split("_"),
weekdaysMin:"N_Pn_Wt_Śr_Cz_Pt_So".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD.MM.YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd, D MMMM YYYY LT"
},
calendar:{
sameDay:"[Dziś o] LT",
nextDay:"[Jutro o] LT",
nextWeek:"[W] dddd [o] LT",
lastDay:"[Wczoraj o] LT",
lastWeek:function() {
switch (this.day()) {
case 0:
return "[W zeszłą niedzielę o] LT";

case 3:
return "[W zeszłą środę o] LT";

case 6:
return "[W zeszłą sobotę o] LT";

default:
return "[W zeszły] dddd [o] LT";
}
},
sameElse:"L"
},
relativeTime:{
future:"za %s",
past:"%s temu",
s:"kilka sekund",
m:o,
mm:o,
h:o,
hh:o,
d:"1 dzień",
dd:"%d dni",
M:"miesiąc",
MM:o,
y:"rok",
yy:o
},
ordinal:"%d.",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("pt-br", {
months:"janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro".split("_"),
monthsShort:"jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez".split("_"),
weekdays:"domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado".split("_"),
weekdaysShort:"dom_seg_ter_qua_qui_sex_sáb".split("_"),
weekdaysMin:"dom_2ª_3ª_4ª_5ª_6ª_sáb".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D [de] MMMM [de] YYYY",
LLL:"D [de] MMMM [de] YYYY [às] LT",
LLLL:"dddd, D [de] MMMM [de] YYYY [às] LT"
},
calendar:{
sameDay:"[Hoje às] LT",
nextDay:"[Amanhã às] LT",
nextWeek:"dddd [às] LT",
lastDay:"[Ontem às] LT",
lastWeek:function() {
return 0 === this.day() || 6 === this.day() ? "[Último] dddd [às] LT" :"[Última] dddd [às] LT";
},
sameElse:"L"
},
relativeTime:{
future:"em %s",
past:"%s atrás",
s:"segundos",
m:"um minuto",
mm:"%d minutos",
h:"uma hora",
hh:"%d horas",
d:"um dia",
dd:"%d dias",
M:"um mês",
MM:"%d meses",
y:"um ano",
yy:"%d anos"
},
ordinal:"%dº"
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("pt", {
months:"janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro".split("_"),
monthsShort:"jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez".split("_"),
weekdays:"domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado".split("_"),
weekdaysShort:"dom_seg_ter_qua_qui_sex_sáb".split("_"),
weekdaysMin:"dom_2ª_3ª_4ª_5ª_6ª_sáb".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D [de] MMMM [de] YYYY",
LLL:"D [de] MMMM [de] YYYY LT",
LLLL:"dddd, D [de] MMMM [de] YYYY LT"
},
calendar:{
sameDay:"[Hoje às] LT",
nextDay:"[Amanhã às] LT",
nextWeek:"dddd [às] LT",
lastDay:"[Ontem às] LT",
lastWeek:function() {
return 0 === this.day() || 6 === this.day() ? "[Último] dddd [às] LT" :"[Última] dddd [às] LT";
},
sameElse:"L"
},
relativeTime:{
future:"em %s",
past:"%s atrás",
s:"segundos",
m:"um minuto",
mm:"%d minutos",
h:"uma hora",
hh:"%d horas",
d:"um dia",
dd:"%d dias",
M:"um mês",
MM:"%d meses",
y:"um ano",
yy:"%d anos"
},
ordinal:"%dº",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e, t, o) {
var n = {
mm:"minute",
hh:"ore",
dd:"zile",
MM:"luni",
yy:"ani"
}, r = " ";
return (e % 100 >= 20 || e >= 100 && e % 100 === 0) && (r = " de "), e + r + n[o];
}
return e.lang("ro", {
months:"ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie".split("_"),
monthsShort:"ian._febr._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.".split("_"),
weekdays:"duminică_luni_marți_miercuri_joi_vineri_sâmbătă".split("_"),
weekdaysShort:"Dum_Lun_Mar_Mie_Joi_Vin_Sâm".split("_"),
weekdaysMin:"Du_Lu_Ma_Mi_Jo_Vi_Sâ".split("_"),
longDateFormat:{
LT:"H:mm",
L:"DD.MM.YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY H:mm",
LLLL:"dddd, D MMMM YYYY H:mm"
},
calendar:{
sameDay:"[azi la] LT",
nextDay:"[mâine la] LT",
nextWeek:"dddd [la] LT",
lastDay:"[ieri la] LT",
lastWeek:"[fosta] dddd [la] LT",
sameElse:"L"
},
relativeTime:{
future:"peste %s",
past:"%s în urmă",
s:"câteva secunde",
m:"un minut",
mm:t,
h:"o oră",
hh:t,
d:"o zi",
dd:t,
M:"o lună",
MM:t,
y:"un an",
yy:t
},
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e, t) {
var o = e.split("_");
return t % 10 === 1 && t % 100 !== 11 ? o[0] :t % 10 >= 2 && 4 >= t % 10 && (10 > t % 100 || t % 100 >= 20) ? o[1] :o[2];
}
function o(e, o, n) {
var r = {
mm:o ? "минута_минуты_минут" :"минуту_минуты_минут",
hh:"час_часа_часов",
dd:"день_дня_дней",
MM:"месяц_месяца_месяцев",
yy:"год_года_лет"
};
return "m" === n ? o ? "минута" :"минуту" :e + " " + t(r[n], +e);
}
function n(e, t) {
var o = {
nominative:"январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_"),
accusative:"января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря".split("_")
}, n = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/.test(t) ? "accusative" :"nominative";
return o[n][e.month()];
}
function r(e, t) {
var o = {
nominative:"янв_фев_мар_апр_май_июнь_июль_авг_сен_окт_ноя_дек".split("_"),
accusative:"янв_фев_мар_апр_мая_июня_июля_авг_сен_окт_ноя_дек".split("_")
}, n = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/.test(t) ? "accusative" :"nominative";
return o[n][e.month()];
}
function i(e, t) {
var o = {
nominative:"воскресенье_понедельник_вторник_среда_четверг_пятница_суббота".split("_"),
accusative:"воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу".split("_")
}, n = /\[ ?[Вв] ?(?:прошлую|следующую)? ?\] ?dddd/.test(t) ? "accusative" :"nominative";
return o[n][e.day()];
}
return e.lang("ru", {
months:n,
monthsShort:r,
weekdays:i,
weekdaysShort:"вс_пн_вт_ср_чт_пт_сб".split("_"),
weekdaysMin:"вс_пн_вт_ср_чт_пт_сб".split("_"),
monthsParse:[ /^янв/i, /^фев/i, /^мар/i, /^апр/i, /^ма[й|я]/i, /^июн/i, /^июл/i, /^авг/i, /^сен/i, /^окт/i, /^ноя/i, /^дек/i ],
longDateFormat:{
LT:"HH:mm",
L:"DD.MM.YYYY",
LL:"D MMMM YYYY г.",
LLL:"D MMMM YYYY г., LT",
LLLL:"dddd, D MMMM YYYY г., LT"
},
calendar:{
sameDay:"[Сегодня в] LT",
nextDay:"[Завтра в] LT",
lastDay:"[Вчера в] LT",
nextWeek:function() {
return 2 === this.day() ? "[Во] dddd [в] LT" :"[В] dddd [в] LT";
},
lastWeek:function() {
switch (this.day()) {
case 0:
return "[В прошлое] dddd [в] LT";

case 1:
case 2:
case 4:
return "[В прошлый] dddd [в] LT";

case 3:
case 5:
case 6:
return "[В прошлую] dddd [в] LT";
}
},
sameElse:"L"
},
relativeTime:{
future:"через %s",
past:"%s назад",
s:"несколько секунд",
m:o,
mm:o,
h:"час",
hh:o,
d:"день",
dd:o,
M:"месяц",
MM:o,
y:"год",
yy:o
},
meridiem:function(e) {
return 4 > e ? "ночи" :12 > e ? "утра" :17 > e ? "дня" :"вечера";
},
ordinal:function(e, t) {
switch (t) {
case "M":
case "d":
case "DDD":
return e + "-й";

case "D":
return e + "-го";

case "w":
case "W":
return e + "-я";

default:
return e;
}
},
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e) {
return e > 1 && 5 > e;
}
function o(e, o, n, r) {
var i = e + " ";
switch (n) {
case "s":
return o || r ? "pár sekúnd" :"pár sekundami";

case "m":
return o ? "minúta" :r ? "minútu" :"minútou";

case "mm":
return o || r ? i + (t(e) ? "minúty" :"minút") :i + "minútami";

case "h":
return o ? "hodina" :r ? "hodinu" :"hodinou";

case "hh":
return o || r ? i + (t(e) ? "hodiny" :"hodín") :i + "hodinami";

case "d":
return o || r ? "deň" :"dňom";

case "dd":
return o || r ? i + (t(e) ? "dni" :"dní") :i + "dňami";

case "M":
return o || r ? "mesiac" :"mesiacom";

case "MM":
return o || r ? i + (t(e) ? "mesiace" :"mesiacov") :i + "mesiacmi";

case "y":
return o || r ? "rok" :"rokom";

case "yy":
return o || r ? i + (t(e) ? "roky" :"rokov") :i + "rokmi";
}
}
var n = "január_február_marec_apríl_máj_jún_júl_august_september_október_november_december".split("_"), r = "jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec".split("_");
return e.lang("sk", {
months:n,
monthsShort:r,
monthsParse:function(e, t) {
var o, n = [];
for (o = 0; 12 > o; o++) n[o] = new RegExp("^" + e[o] + "$|^" + t[o] + "$", "i");
return n;
}(n, r),
weekdays:"nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota".split("_"),
weekdaysShort:"ne_po_ut_st_št_pi_so".split("_"),
weekdaysMin:"ne_po_ut_st_št_pi_so".split("_"),
longDateFormat:{
LT:"H:mm",
L:"DD.MM.YYYY",
LL:"D. MMMM YYYY",
LLL:"D. MMMM YYYY LT",
LLLL:"dddd D. MMMM YYYY LT"
},
calendar:{
sameDay:"[dnes o] LT",
nextDay:"[zajtra o] LT",
nextWeek:function() {
switch (this.day()) {
case 0:
return "[v nedeľu o] LT";

case 1:
case 2:
return "[v] dddd [o] LT";

case 3:
return "[v stredu o] LT";

case 4:
return "[vo štvrtok o] LT";

case 5:
return "[v piatok o] LT";

case 6:
return "[v sobotu o] LT";
}
},
lastDay:"[včera o] LT",
lastWeek:function() {
switch (this.day()) {
case 0:
return "[minulú nedeľu o] LT";

case 1:
case 2:
return "[minulý] dddd [o] LT";

case 3:
return "[minulú stredu o] LT";

case 4:
case 5:
return "[minulý] dddd [o] LT";

case 6:
return "[minulú sobotu o] LT";
}
},
sameElse:"L"
},
relativeTime:{
future:"za %s",
past:"pred %s",
s:o,
m:o,
mm:o,
h:o,
hh:o,
d:o,
dd:o,
M:o,
MM:o,
y:o,
yy:o
},
ordinal:"%d.",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e, t, o) {
var n = e + " ";
switch (o) {
case "m":
return t ? "ena minuta" :"eno minuto";

case "mm":
return n += 1 === e ? "minuta" :2 === e ? "minuti" :3 === e || 4 === e ? "minute" :"minut";

case "h":
return t ? "ena ura" :"eno uro";

case "hh":
return n += 1 === e ? "ura" :2 === e ? "uri" :3 === e || 4 === e ? "ure" :"ur";

case "dd":
return n += 1 === e ? "dan" :"dni";

case "MM":
return n += 1 === e ? "mesec" :2 === e ? "meseca" :3 === e || 4 === e ? "mesece" :"mesecev";

case "yy":
return n += 1 === e ? "leto" :2 === e ? "leti" :3 === e || 4 === e ? "leta" :"let";
}
}
return e.lang("sl", {
months:"januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december".split("_"),
monthsShort:"jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.".split("_"),
weekdays:"nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota".split("_"),
weekdaysShort:"ned._pon._tor._sre._čet._pet._sob.".split("_"),
weekdaysMin:"ne_po_to_sr_če_pe_so".split("_"),
longDateFormat:{
LT:"H:mm",
L:"DD. MM. YYYY",
LL:"D. MMMM YYYY",
LLL:"D. MMMM YYYY LT",
LLLL:"dddd, D. MMMM YYYY LT"
},
calendar:{
sameDay:"[danes ob] LT",
nextDay:"[jutri ob] LT",
nextWeek:function() {
switch (this.day()) {
case 0:
return "[v] [nedeljo] [ob] LT";

case 3:
return "[v] [sredo] [ob] LT";

case 6:
return "[v] [soboto] [ob] LT";

case 1:
case 2:
case 4:
case 5:
return "[v] dddd [ob] LT";
}
},
lastDay:"[včeraj ob] LT",
lastWeek:function() {
switch (this.day()) {
case 0:
case 3:
case 6:
return "[prejšnja] dddd [ob] LT";

case 1:
case 2:
case 4:
case 5:
return "[prejšnji] dddd [ob] LT";
}
},
sameElse:"L"
},
relativeTime:{
future:"čez %s",
past:"%s nazaj",
s:"nekaj sekund",
m:t,
mm:t,
h:t,
hh:t,
d:"en dan",
dd:t,
M:"en mesec",
MM:t,
y:"eno leto",
yy:t
},
ordinal:"%d.",
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("sq", {
months:"Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_Nëntor_Dhjetor".split("_"),
monthsShort:"Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_Nën_Dhj".split("_"),
weekdays:"E Diel_E Hënë_E Martë_E Mërkurë_E Enjte_E Premte_E Shtunë".split("_"),
weekdaysShort:"Die_Hën_Mar_Mër_Enj_Pre_Sht".split("_"),
weekdaysMin:"D_H_Ma_Më_E_P_Sh".split("_"),
meridiem:function(e) {
return 12 > e ? "PD" :"MD";
},
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd, D MMMM YYYY LT"
},
calendar:{
sameDay:"[Sot në] LT",
nextDay:"[Nesër në] LT",
nextWeek:"dddd [në] LT",
lastDay:"[Dje në] LT",
lastWeek:"dddd [e kaluar në] LT",
sameElse:"L"
},
relativeTime:{
future:"në %s",
past:"%s më parë",
s:"disa sekonda",
m:"një minutë",
mm:"%d minuta",
h:"një orë",
hh:"%d orë",
d:"një ditë",
dd:"%d ditë",
M:"një muaj",
MM:"%d muaj",
y:"një vit",
yy:"%d vite"
},
ordinal:"%d.",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
var t = {
words:{
m:[ "један минут", "једне минуте" ],
mm:[ "минут", "минуте", "минута" ],
h:[ "један сат", "једног сата" ],
hh:[ "сат", "сата", "сати" ],
dd:[ "дан", "дана", "дана" ],
MM:[ "месец", "месеца", "месеци" ],
yy:[ "година", "године", "година" ]
},
correctGrammaticalCase:function(e, t) {
return 1 === e ? t[0] :e >= 2 && 4 >= e ? t[1] :t[2];
},
translate:function(e, o, n) {
var r = t.words[n];
return 1 === n.length ? o ? r[0] :r[1] :e + " " + t.correctGrammaticalCase(e, r);
}
};
return e.lang("sr-cyr", {
months:[ "јануар", "фебруар", "март", "април", "мај", "јун", "јул", "август", "септембар", "октобар", "новембар", "децембар" ],
monthsShort:[ "јан.", "феб.", "мар.", "апр.", "мај", "јун", "јул", "авг.", "сеп.", "окт.", "нов.", "дец." ],
weekdays:[ "недеља", "понедељак", "уторак", "среда", "четвртак", "петак", "субота" ],
weekdaysShort:[ "нед.", "пон.", "уто.", "сре.", "чет.", "пет.", "суб." ],
weekdaysMin:[ "не", "по", "ут", "ср", "че", "пе", "су" ],
longDateFormat:{
LT:"H:mm",
L:"DD. MM. YYYY",
LL:"D. MMMM YYYY",
LLL:"D. MMMM YYYY LT",
LLLL:"dddd, D. MMMM YYYY LT"
},
calendar:{
sameDay:"[данас у] LT",
nextDay:"[сутра у] LT",
nextWeek:function() {
switch (this.day()) {
case 0:
return "[у] [недељу] [у] LT";

case 3:
return "[у] [среду] [у] LT";

case 6:
return "[у] [суботу] [у] LT";

case 1:
case 2:
case 4:
case 5:
return "[у] dddd [у] LT";
}
},
lastDay:"[јуче у] LT",
lastWeek:function() {
var e = [ "[прошле] [недеље] [у] LT", "[прошлог] [понедељка] [у] LT", "[прошлог] [уторка] [у] LT", "[прошле] [среде] [у] LT", "[прошлог] [четвртка] [у] LT", "[прошлог] [петка] [у] LT", "[прошле] [суботе] [у] LT" ];
return e[this.day()];
},
sameElse:"L"
},
relativeTime:{
future:"за %s",
past:"пре %s",
s:"неколико секунди",
m:t.translate,
mm:t.translate,
h:t.translate,
hh:t.translate,
d:"дан",
dd:t.translate,
M:"месец",
MM:t.translate,
y:"годину",
yy:t.translate
},
ordinal:"%d.",
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
var t = {
words:{
m:[ "jedan minut", "jedne minute" ],
mm:[ "minut", "minute", "minuta" ],
h:[ "jedan sat", "jednog sata" ],
hh:[ "sat", "sata", "sati" ],
dd:[ "dan", "dana", "dana" ],
MM:[ "mesec", "meseca", "meseci" ],
yy:[ "godina", "godine", "godina" ]
},
correctGrammaticalCase:function(e, t) {
return 1 === e ? t[0] :e >= 2 && 4 >= e ? t[1] :t[2];
},
translate:function(e, o, n) {
var r = t.words[n];
return 1 === n.length ? o ? r[0] :r[1] :e + " " + t.correctGrammaticalCase(e, r);
}
};
return e.lang("sr", {
months:[ "januar", "februar", "mart", "april", "maj", "jun", "jul", "avgust", "septembar", "oktobar", "novembar", "decembar" ],
monthsShort:[ "jan.", "feb.", "mar.", "apr.", "maj", "jun", "jul", "avg.", "sep.", "okt.", "nov.", "dec." ],
weekdays:[ "nedelja", "ponedeljak", "utorak", "sreda", "četvrtak", "petak", "subota" ],
weekdaysShort:[ "ned.", "pon.", "uto.", "sre.", "čet.", "pet.", "sub." ],
weekdaysMin:[ "ne", "po", "ut", "sr", "če", "pe", "su" ],
longDateFormat:{
LT:"H:mm",
L:"DD. MM. YYYY",
LL:"D. MMMM YYYY",
LLL:"D. MMMM YYYY LT",
LLLL:"dddd, D. MMMM YYYY LT"
},
calendar:{
sameDay:"[danas u] LT",
nextDay:"[sutra u] LT",
nextWeek:function() {
switch (this.day()) {
case 0:
return "[u] [nedelju] [u] LT";

case 3:
return "[u] [sredu] [u] LT";

case 6:
return "[u] [subotu] [u] LT";

case 1:
case 2:
case 4:
case 5:
return "[u] dddd [u] LT";
}
},
lastDay:"[juče u] LT",
lastWeek:function() {
var e = [ "[prošle] [nedelje] [u] LT", "[prošlog] [ponedeljka] [u] LT", "[prošlog] [utorka] [u] LT", "[prošle] [srede] [u] LT", "[prošlog] [četvrtka] [u] LT", "[prošlog] [petka] [u] LT", "[prošle] [subote] [u] LT" ];
return e[this.day()];
},
sameElse:"L"
},
relativeTime:{
future:"za %s",
past:"pre %s",
s:"nekoliko sekundi",
m:t.translate,
mm:t.translate,
h:t.translate,
hh:t.translate,
d:"dan",
dd:t.translate,
M:"mesec",
MM:t.translate,
y:"godinu",
yy:t.translate
},
ordinal:"%d.",
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("sv", {
months:"januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split("_"),
monthsShort:"jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),
weekdays:"söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag".split("_"),
weekdaysShort:"sön_mån_tis_ons_tor_fre_lör".split("_"),
weekdaysMin:"sö_må_ti_on_to_fr_lö".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"YYYY-MM-DD",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd D MMMM YYYY LT"
},
calendar:{
sameDay:"[Idag] LT",
nextDay:"[Imorgon] LT",
lastDay:"[Igår] LT",
nextWeek:"dddd LT",
lastWeek:"[Förra] dddd[en] LT",
sameElse:"L"
},
relativeTime:{
future:"om %s",
past:"för %s sedan",
s:"några sekunder",
m:"en minut",
mm:"%d minuter",
h:"en timme",
hh:"%d timmar",
d:"en dag",
dd:"%d dagar",
M:"en månad",
MM:"%d månader",
y:"ett år",
yy:"%d år"
},
ordinal:function(e) {
var t = e % 10, o = 1 === ~~(e % 100 / 10) ? "e" :1 === t ? "a" :2 === t ? "a" :3 === t ? "e" :"e";
return e + o;
},
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("ta", {
months:"ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்".split("_"),
monthsShort:"ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்".split("_"),
weekdays:"ஞாயிற்றுக்கிழமை_திங்கட்கிழமை_செவ்வாய்கிழமை_புதன்கிழமை_வியாழக்கிழமை_வெள்ளிக்கிழமை_சனிக்கிழமை".split("_"),
weekdaysShort:"ஞாயிறு_திங்கள்_செவ்வாய்_புதன்_வியாழன்_வெள்ளி_சனி".split("_"),
weekdaysMin:"ஞா_தி_செ_பு_வி_வெ_ச".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY, LT",
LLLL:"dddd, D MMMM YYYY, LT"
},
calendar:{
sameDay:"[இன்று] LT",
nextDay:"[நாளை] LT",
nextWeek:"dddd, LT",
lastDay:"[நேற்று] LT",
lastWeek:"[கடந்த வாரம்] dddd, LT",
sameElse:"L"
},
relativeTime:{
future:"%s இல்",
past:"%s முன்",
s:"ஒரு சில விநாடிகள்",
m:"ஒரு நிமிடம்",
mm:"%d நிமிடங்கள்",
h:"ஒரு மணி நேரம்",
hh:"%d மணி நேரம்",
d:"ஒரு நாள்",
dd:"%d நாட்கள்",
M:"ஒரு மாதம்",
MM:"%d மாதங்கள்",
y:"ஒரு வருடம்",
yy:"%d ஆண்டுகள்"
},
ordinal:function(e) {
return e + "வது";
},
meridiem:function(e) {
return e >= 6 && 10 >= e ? " காலை" :e >= 10 && 14 >= e ? " நண்பகல்" :e >= 14 && 18 >= e ? " எற்பாடு" :e >= 18 && 20 >= e ? " மாலை" :e >= 20 && 24 >= e ? " இரவு" :e >= 0 && 6 >= e ? " வைகறை" :void 0;
},
week:{
dow:0,
doy:6
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("th", {
months:"มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม".split("_"),
monthsShort:"มกรา_กุมภา_มีนา_เมษา_พฤษภา_มิถุนา_กรกฎา_สิงหา_กันยา_ตุลา_พฤศจิกา_ธันวา".split("_"),
weekdays:"อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์".split("_"),
weekdaysShort:"อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัส_ศุกร์_เสาร์".split("_"),
weekdaysMin:"อา._จ._อ._พ._พฤ._ศ._ส.".split("_"),
longDateFormat:{
LT:"H นาฬิกา m นาที",
L:"YYYY/MM/DD",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY เวลา LT",
LLLL:"วันddddที่ D MMMM YYYY เวลา LT"
},
meridiem:function(e) {
return 12 > e ? "ก่อนเที่ยง" :"หลังเที่ยง";
},
calendar:{
sameDay:"[วันนี้ เวลา] LT",
nextDay:"[พรุ่งนี้ เวลา] LT",
nextWeek:"dddd[หน้า เวลา] LT",
lastDay:"[เมื่อวานนี้ เวลา] LT",
lastWeek:"[วัน]dddd[ที่แล้ว เวลา] LT",
sameElse:"L"
},
relativeTime:{
future:"อีก %s",
past:"%sที่แล้ว",
s:"ไม่กี่วินาที",
m:"1 นาที",
mm:"%d นาที",
h:"1 ชั่วโมง",
hh:"%d ชั่วโมง",
d:"1 วัน",
dd:"%d วัน",
M:"1 เดือน",
MM:"%d เดือน",
y:"1 ปี",
yy:"%d ปี"
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("tl-ph", {
months:"Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre".split("_"),
monthsShort:"Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis".split("_"),
weekdays:"Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado".split("_"),
weekdaysShort:"Lin_Lun_Mar_Miy_Huw_Biy_Sab".split("_"),
weekdaysMin:"Li_Lu_Ma_Mi_Hu_Bi_Sab".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"MM/D/YYYY",
LL:"MMMM D, YYYY",
LLL:"MMMM D, YYYY LT",
LLLL:"dddd, MMMM DD, YYYY LT"
},
calendar:{
sameDay:"[Ngayon sa] LT",
nextDay:"[Bukas sa] LT",
nextWeek:"dddd [sa] LT",
lastDay:"[Kahapon sa] LT",
lastWeek:"dddd [huling linggo] LT",
sameElse:"L"
},
relativeTime:{
future:"sa loob ng %s",
past:"%s ang nakalipas",
s:"ilang segundo",
m:"isang minuto",
mm:"%d minuto",
h:"isang oras",
hh:"%d oras",
d:"isang araw",
dd:"%d araw",
M:"isang buwan",
MM:"%d buwan",
y:"isang taon",
yy:"%d taon"
},
ordinal:function(e) {
return e;
},
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
var t = {
1:"'inci",
5:"'inci",
8:"'inci",
70:"'inci",
80:"'inci",
2:"'nci",
7:"'nci",
20:"'nci",
50:"'nci",
3:"'üncü",
4:"'üncü",
100:"'üncü",
6:"'ncı",
9:"'uncu",
10:"'uncu",
30:"'uncu",
60:"'ıncı",
90:"'ıncı"
};
return e.lang("tr", {
months:"Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık".split("_"),
monthsShort:"Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara".split("_"),
weekdays:"Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi".split("_"),
weekdaysShort:"Paz_Pts_Sal_Çar_Per_Cum_Cts".split("_"),
weekdaysMin:"Pz_Pt_Sa_Ça_Pe_Cu_Ct".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD.MM.YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd, D MMMM YYYY LT"
},
calendar:{
sameDay:"[bugün saat] LT",
nextDay:"[yarın saat] LT",
nextWeek:"[haftaya] dddd [saat] LT",
lastDay:"[dün] LT",
lastWeek:"[geçen hafta] dddd [saat] LT",
sameElse:"L"
},
relativeTime:{
future:"%s sonra",
past:"%s önce",
s:"birkaç saniye",
m:"bir dakika",
mm:"%d dakika",
h:"bir saat",
hh:"%d saat",
d:"bir gün",
dd:"%d gün",
M:"bir ay",
MM:"%d ay",
y:"bir yıl",
yy:"%d yıl"
},
ordinal:function(e) {
if (0 === e) return e + "'ıncı";
var o = e % 10, n = e % 100 - o, r = e >= 100 ? 100 :null;
return e + (t[o] || t[n] || t[r]);
},
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("tzm-la", {
months:"innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir".split("_"),
monthsShort:"innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir".split("_"),
weekdays:"asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),
weekdaysShort:"asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),
weekdaysMin:"asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd D MMMM YYYY LT"
},
calendar:{
sameDay:"[asdkh g] LT",
nextDay:"[aska g] LT",
nextWeek:"dddd [g] LT",
lastDay:"[assant g] LT",
lastWeek:"dddd [g] LT",
sameElse:"L"
},
relativeTime:{
future:"dadkh s yan %s",
past:"yan %s",
s:"imik",
m:"minuḍ",
mm:"%d minuḍ",
h:"saɛa",
hh:"%d tassaɛin",
d:"ass",
dd:"%d ossan",
M:"ayowr",
MM:"%d iyyirn",
y:"asgas",
yy:"%d isgasn"
},
week:{
dow:6,
doy:12
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("tzm", {
months:"ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ".split("_"),
monthsShort:"ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ".split("_"),
weekdays:"ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),
weekdaysShort:"ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),
weekdaysMin:"ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd D MMMM YYYY LT"
},
calendar:{
sameDay:"[ⴰⵙⴷⵅ ⴴ] LT",
nextDay:"[ⴰⵙⴽⴰ ⴴ] LT",
nextWeek:"dddd [ⴴ] LT",
lastDay:"[ⴰⵚⴰⵏⵜ ⴴ] LT",
lastWeek:"dddd [ⴴ] LT",
sameElse:"L"
},
relativeTime:{
future:"ⴷⴰⴷⵅ ⵙ ⵢⴰⵏ %s",
past:"ⵢⴰⵏ %s",
s:"ⵉⵎⵉⴽ",
m:"ⵎⵉⵏⵓⴺ",
mm:"%d ⵎⵉⵏⵓⴺ",
h:"ⵙⴰⵄⴰ",
hh:"%d ⵜⴰⵙⵙⴰⵄⵉⵏ",
d:"ⴰⵙⵙ",
dd:"%d oⵙⵙⴰⵏ",
M:"ⴰⵢoⵓⵔ",
MM:"%d ⵉⵢⵢⵉⵔⵏ",
y:"ⴰⵙⴳⴰⵙ",
yy:"%d ⵉⵙⴳⴰⵙⵏ"
},
week:{
dow:6,
doy:12
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e, t) {
var o = e.split("_");
return t % 10 === 1 && t % 100 !== 11 ? o[0] :t % 10 >= 2 && 4 >= t % 10 && (10 > t % 100 || t % 100 >= 20) ? o[1] :o[2];
}
function o(e, o, n) {
var r = {
mm:"хвилина_хвилини_хвилин",
hh:"година_години_годин",
dd:"день_дні_днів",
MM:"місяць_місяці_місяців",
yy:"рік_роки_років"
};
return "m" === n ? o ? "хвилина" :"хвилину" :"h" === n ? o ? "година" :"годину" :e + " " + t(r[n], +e);
}
function n(e, t) {
var o = {
nominative:"січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень".split("_"),
accusative:"січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня".split("_")
}, n = /D[oD]? *MMMM?/.test(t) ? "accusative" :"nominative";
return o[n][e.month()];
}
function r(e, t) {
var o = {
nominative:"неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота".split("_"),
accusative:"неділю_понеділок_вівторок_середу_четвер_п’ятницю_суботу".split("_"),
genitive:"неділі_понеділка_вівторка_середи_четверга_п’ятниці_суботи".split("_")
}, n = /(\[[ВвУу]\]) ?dddd/.test(t) ? "accusative" :/\[?(?:минулої|наступної)? ?\] ?dddd/.test(t) ? "genitive" :"nominative";
return o[n][e.day()];
}
function i(e) {
return function() {
return e + "о" + (11 === this.hours() ? "б" :"") + "] LT";
};
}
return e.lang("uk", {
months:n,
monthsShort:"січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд".split("_"),
weekdays:r,
weekdaysShort:"нд_пн_вт_ср_чт_пт_сб".split("_"),
weekdaysMin:"нд_пн_вт_ср_чт_пт_сб".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD.MM.YYYY",
LL:"D MMMM YYYY р.",
LLL:"D MMMM YYYY р., LT",
LLLL:"dddd, D MMMM YYYY р., LT"
},
calendar:{
sameDay:i("[Сьогодні "),
nextDay:i("[Завтра "),
lastDay:i("[Вчора "),
nextWeek:i("[У] dddd ["),
lastWeek:function() {
switch (this.day()) {
case 0:
case 3:
case 5:
case 6:
return i("[Минулої] dddd [").call(this);

case 1:
case 2:
case 4:
return i("[Минулого] dddd [").call(this);
}
},
sameElse:"L"
},
relativeTime:{
future:"за %s",
past:"%s тому",
s:"декілька секунд",
m:o,
mm:o,
h:"годину",
hh:o,
d:"день",
dd:o,
M:"місяць",
MM:o,
y:"рік",
yy:o
},
meridiem:function(e) {
return 4 > e ? "ночі" :12 > e ? "ранку" :17 > e ? "дня" :"вечора";
},
ordinal:function(e, t) {
switch (t) {
case "M":
case "d":
case "DDD":
case "w":
case "W":
return e + "-й";

case "D":
return e + "-го";

default:
return e;
}
},
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("uz", {
months:"январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_"),
monthsShort:"янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек".split("_"),
weekdays:"Якшанба_Душанба_Сешанба_Чоршанба_Пайшанба_Жума_Шанба".split("_"),
weekdaysShort:"Якш_Душ_Сеш_Чор_Пай_Жум_Шан".split("_"),
weekdaysMin:"Як_Ду_Се_Чо_Па_Жу_Ша".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"D MMMM YYYY, dddd LT"
},
calendar:{
sameDay:"[Бугун соат] LT [да]",
nextDay:"[Эртага] LT [да]",
nextWeek:"dddd [куни соат] LT [да]",
lastDay:"[Кеча соат] LT [да]",
lastWeek:"[Утган] dddd [куни соат] LT [да]",
sameElse:"L"
},
relativeTime:{
future:"Якин %s ичида",
past:"Бир неча %s олдин",
s:"фурсат",
m:"бир дакика",
mm:"%d дакика",
h:"бир соат",
hh:"%d соат",
d:"бир кун",
dd:"%d кун",
M:"бир ой",
MM:"%d ой",
y:"бир йил",
yy:"%d йил"
},
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("vi", {
months:"tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12".split("_"),
monthsShort:"Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12".split("_"),
weekdays:"chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy".split("_"),
weekdaysShort:"CN_T2_T3_T4_T5_T6_T7".split("_"),
weekdaysMin:"CN_T2_T3_T4_T5_T6_T7".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM [năm] YYYY",
LLL:"D MMMM [năm] YYYY LT",
LLLL:"dddd, D MMMM [năm] YYYY LT",
l:"DD/M/YYYY",
ll:"D MMM YYYY",
lll:"D MMM YYYY LT",
llll:"ddd, D MMM YYYY LT"
},
calendar:{
sameDay:"[Hôm nay lúc] LT",
nextDay:"[Ngày mai lúc] LT",
nextWeek:"dddd [tuần tới lúc] LT",
lastDay:"[Hôm qua lúc] LT",
lastWeek:"dddd [tuần rồi lúc] LT",
sameElse:"L"
},
relativeTime:{
future:"%s tới",
past:"%s trước",
s:"vài giây",
m:"một phút",
mm:"%d phút",
h:"một giờ",
hh:"%d giờ",
d:"một ngày",
dd:"%d ngày",
M:"một tháng",
MM:"%d tháng",
y:"một năm",
yy:"%d năm"
},
ordinal:function(e) {
return e;
},
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("zh-cn", {
months:"一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
weekdays:"星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
weekdaysShort:"周日_周一_周二_周三_周四_周五_周六".split("_"),
weekdaysMin:"日_一_二_三_四_五_六".split("_"),
longDateFormat:{
LT:"Ah点mm",
L:"YYYY-MM-DD",
LL:"YYYY年MMMD日",
LLL:"YYYY年MMMD日LT",
LLLL:"YYYY年MMMD日ddddLT",
l:"YYYY-MM-DD",
ll:"YYYY年MMMD日",
lll:"YYYY年MMMD日LT",
llll:"YYYY年MMMD日ddddLT"
},
meridiem:function(e, t) {
var o = 100 * e + t;
return 600 > o ? "凌晨" :900 > o ? "早上" :1130 > o ? "上午" :1230 > o ? "中午" :1800 > o ? "下午" :"晚上";
},
calendar:{
sameDay:function() {
return 0 === this.minutes() ? "[今天]Ah[点整]" :"[今天]LT";
},
nextDay:function() {
return 0 === this.minutes() ? "[明天]Ah[点整]" :"[明天]LT";
},
lastDay:function() {
return 0 === this.minutes() ? "[昨天]Ah[点整]" :"[昨天]LT";
},
nextWeek:function() {
var t, o;
return t = e().startOf("week"), o = this.unix() - t.unix() >= 604800 ? "[下]" :"[本]", 
0 === this.minutes() ? o + "dddAh点整" :o + "dddAh点mm";
},
lastWeek:function() {
var t, o;
return t = e().startOf("week"), o = this.unix() < t.unix() ? "[上]" :"[本]", 0 === this.minutes() ? o + "dddAh点整" :o + "dddAh点mm";
},
sameElse:"LL"
},
ordinal:function(e, t) {
switch (t) {
case "d":
case "D":
case "DDD":
return e + "日";

case "M":
return e + "月";

case "w":
case "W":
return e + "周";

default:
return e;
}
},
relativeTime:{
future:"%s内",
past:"%s前",
s:"几秒",
m:"1分钟",
mm:"%d分钟",
h:"1小时",
hh:"%d小时",
d:"1天",
dd:"%d天",
M:"1个月",
MM:"%d个月",
y:"1年",
yy:"%d年"
},
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("zh-tw", {
months:"一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
weekdays:"星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
weekdaysShort:"週日_週一_週二_週三_週四_週五_週六".split("_"),
weekdaysMin:"日_一_二_三_四_五_六".split("_"),
longDateFormat:{
LT:"Ah點mm",
L:"YYYY年MMMD日",
LL:"YYYY年MMMD日",
LLL:"YYYY年MMMD日LT",
LLLL:"YYYY年MMMD日ddddLT",
l:"YYYY年MMMD日",
ll:"YYYY年MMMD日",
lll:"YYYY年MMMD日LT",
llll:"YYYY年MMMD日ddddLT"
},
meridiem:function(e, t) {
var o = 100 * e + t;
return 900 > o ? "早上" :1130 > o ? "上午" :1230 > o ? "中午" :1800 > o ? "下午" :"晚上";
},
calendar:{
sameDay:"[今天]LT",
nextDay:"[明天]LT",
nextWeek:"[下]ddddLT",
lastDay:"[昨天]LT",
lastWeek:"[上]ddddLT",
sameElse:"L"
},
ordinal:function(e, t) {
switch (t) {
case "d":
case "D":
case "DDD":
return e + "日";

case "M":
return e + "月";

case "w":
case "W":
return e + "週";

default:
return e;
}
},
relativeTime:{
future:"%s內",
past:"%s前",
s:"幾秒",
m:"一分鐘",
mm:"%d分鐘",
h:"一小時",
hh:"%d小時",
d:"一天",
dd:"%d天",
M:"一個月",
MM:"%d個月",
y:"一年",
yy:"%d年"
}
});
}), lt.lang("en"), Mt ? module.exports = lt :"function" == typeof define && define.amd ? (define("moment", function(e, t, o) {
return o.config && o.config() && o.config().noGlobal === !0 && (pt.moment = ut), 
lt;
}), st(!0)) :st();
}.call(this), function(e, t) {
function o(e, t) {
var o = null === e || typeof e in r;
return o ? e === t :!1;
}
var n = e.ko = {};
n.exportSymbol = function(t, o) {
for (var n = t.split("."), r = e, i = 0; i < n.length - 1; i++) r = r[n[i]];
r[n[n.length - 1]] = o;
}, n.exportProperty = function(e, t, o) {
e[t] = o;
}, n.utils = new function() {
function o(e, t) {
if ("INPUT" != e.tagName || !e.type) return !1;
if ("click" != t.toLowerCase()) return !1;
var o = e.type.toLowerCase();
return "checkbox" == o || "radio" == o;
}
var r = /^(\s|\u00A0)+|(\s|\u00A0)+$/g, i = /MSIE 6/i.test(navigator.userAgent), a = /MSIE 7/i.test(navigator.userAgent), s = {}, l = {}, u = /Firefox\/2/i.test(navigator.userAgent) ? "KeyboardEvent" :"UIEvents";
s[u] = [ "keyup", "keydown", "keypress" ], s.MouseEvents = [ "click", "dblclick", "mousedown", "mouseup", "mousemove", "mouseover", "mouseout", "mouseenter", "mouseleave" ];
for (var d in s) {
var c = s[d];
if (c.length) for (var p = 0, h = c.length; h > p; p++) l[c[p]] = d;
}
return {
fieldsIncludedWithJsonPost:[ "authenticity_token", /^__RequestVerificationToken(_.*)?$/ ],
arrayForEach:function(e, t) {
for (var o = 0, n = e.length; n > o; o++) t(e[o]);
},
arrayIndexOf:function(e, t) {
if ("function" == typeof e.indexOf) return e.indexOf(t);
for (var o = 0, n = e.length; n > o; o++) if (e[o] === t) return o;
return -1;
},
arrayFirst:function(e, t, o) {
for (var n = 0, r = e.length; r > n; n++) if (t.call(o, e[n])) return e[n];
return null;
},
arrayRemoveItem:function(e, t) {
var o = n.utils.arrayIndexOf(e, t);
o >= 0 && e.splice(o, 1);
},
arrayGetDistinctValues:function(e) {
e = e || [];
for (var t = [], o = 0, r = e.length; r > o; o++) n.utils.arrayIndexOf(t, e[o]) < 0 && t.push(e[o]);
return t;
},
arrayMap:function(e, t) {
e = e || [];
for (var o = [], n = 0, r = e.length; r > n; n++) o.push(t(e[n]));
return o;
},
arrayFilter:function(e, t) {
e = e || [];
for (var o = [], n = 0, r = e.length; r > n; n++) t(e[n]) && o.push(e[n]);
return o;
},
arrayPushAll:function(e, t) {
for (var o = 0, n = t.length; n > o; o++) e.push(t[o]);
},
emptyDomNode:function(e) {
for (;e.firstChild; ) n.removeNode(e.firstChild);
},
setDomNodeChildren:function(e, t) {
n.utils.emptyDomNode(e), t && n.utils.arrayForEach(t, function(t) {
e.appendChild(t);
});
},
replaceDomNodes:function(e, t) {
var o = e.nodeType ? [ e ] :e;
if (o.length > 0) {
for (var r = o[0], i = r.parentNode, a = 0, s = t.length; s > a; a++) i.insertBefore(t[a], r);
for (var a = 0, s = o.length; s > a; a++) n.removeNode(o[a]);
}
},
setOptionNodeSelectionState:function(e, t) {
navigator.userAgent.indexOf("MSIE 6") >= 0 ? e.setAttribute("selected", t) :e.selected = t;
},
getElementsHavingAttribute:function(e, t) {
if (!e || 1 != e.nodeType) return [];
var o = [];
null !== e.getAttribute(t) && o.push(e);
for (var n = e.getElementsByTagName("*"), r = 0, i = n.length; i > r; r++) null !== n[r].getAttribute(t) && o.push(n[r]);
return o;
},
stringTrim:function(e) {
return (e || "").replace(r, "");
},
stringTokenize:function(e, t) {
for (var o = [], r = (e || "").split(t), i = 0, a = r.length; a > i; i++) {
var s = n.utils.stringTrim(r[i]);
"" !== s && o.push(s);
}
return o;
},
stringStartsWith:function(e, t) {
return e = e || "", t.length > e.length ? !1 :e.substring(0, t.length) === t;
},
evalWithinScope:function(e, o) {
return o === t ? new Function("return " + e)() :new Function("sc", "with(sc) { return (" + e + ") }")(o);
},
domNodeIsContainedBy:function(e, t) {
if (t.compareDocumentPosition) return 16 == (16 & t.compareDocumentPosition(e));
for (;null != e; ) {
if (e == t) return !0;
e = e.parentNode;
}
return !1;
},
domNodeIsAttachedToDocument:function(e) {
return n.utils.domNodeIsContainedBy(e, document);
},
registerEventHandler:function(e, t, n) {
if ("undefined" != typeof jQuery) {
if (o(e, t)) {
var r = n;
n = function(e, t) {
var o = this.checked;
t && (this.checked = t.checkedStateBeforeEvent !== !0), r.call(this, e), this.checked = o;
};
}
jQuery(e).bind(t, n);
} else if ("function" == typeof e.addEventListener) e.addEventListener(t, n, !1); else {
if ("undefined" == typeof e.attachEvent) throw new Error("Browser doesn't support addEventListener or attachEvent");
e.attachEvent("on" + t, function(t) {
n.call(e, t);
});
}
},
triggerEvent:function(t, n) {
if (!t || !t.nodeType) throw new Error("element must be a DOM node when calling triggerEvent");
if ("undefined" != typeof jQuery) {
var r = [];
o(t, n) && r.push({
checkedStateBeforeEvent:t.checked
}), jQuery(t).trigger(n, r);
} else if ("function" == typeof document.createEvent) {
if ("function" != typeof t.dispatchEvent) throw new Error("The supplied element doesn't support dispatchEvent");
var i = l[n] || "HTMLEvents", a = document.createEvent(i);
a.initEvent(n, !0, !0, e, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, t), t.dispatchEvent(a);
} else {
if ("undefined" == typeof t.fireEvent) throw new Error("Browser doesn't support triggering events");
"click" == n && ("INPUT" != t.tagName || "checkbox" != t.type.toLowerCase() && "radio" != t.type.toLowerCase() || (t.checked = t.checked !== !0)), 
t.fireEvent("on" + n);
}
},
unwrapObservable:function(e) {
return n.isObservable(e) ? e() :e;
},
domNodeHasCssClass:function(e, t) {
var o = (e.className || "").split(/\s+/);
return n.utils.arrayIndexOf(o, t) >= 0;
},
toggleDomNodeCssClass:function(e, t, o) {
var r = n.utils.domNodeHasCssClass(e, t);
if (o && !r) e.className = (e.className || "") + " " + t; else if (r && !o) {
for (var i = (e.className || "").split(/\s+/), a = "", s = 0; s < i.length; s++) i[s] != t && (a += i[s] + " ");
e.className = n.utils.stringTrim(a);
}
},
range:function(e, t) {
e = n.utils.unwrapObservable(e), t = n.utils.unwrapObservable(t);
for (var o = [], r = e; t >= r; r++) o.push(r);
return o;
},
makeArray:function(e) {
for (var t = [], o = 0, n = e.length; n > o; o++) t.push(e[o]);
return t;
},
isIe6:i,
isIe7:a,
getFormFields:function(e, t) {
for (var o = n.utils.makeArray(e.getElementsByTagName("INPUT")).concat(n.utils.makeArray(e.getElementsByTagName("TEXTAREA"))), r = "string" == typeof t ? function(e) {
return e.name === t;
} :function(e) {
return t.test(e.name);
}, i = [], a = o.length - 1; a >= 0; a--) r(o[a]) && i.push(o[a]);
return i;
},
parseJson:function(t) {
return "string" == typeof t && (t = n.utils.stringTrim(t)) ? e.JSON && e.JSON.parse ? e.JSON.parse(t) :new Function("return " + t)() :null;
},
stringifyJson:function(e) {
if ("undefined" == typeof JSON || "undefined" == typeof JSON.stringify) throw new Error("Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don't support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js");
return JSON.stringify(n.utils.unwrapObservable(e));
},
postJson:function(e, t, o) {
o = o || {};
var r = o.params || {}, i = o.includeFields || this.fieldsIncludedWithJsonPost, a = e;
if ("object" == typeof e && "FORM" == e.tagName) {
var s = e;
a = s.action;
for (var l = i.length - 1; l >= 0; l--) for (var u = n.utils.getFormFields(s, i[l]), d = u.length - 1; d >= 0; d--) r[u[d].name] = u[d].value;
}
t = n.utils.unwrapObservable(t);
var c = document.createElement("FORM");
c.style.display = "none", c.action = a, c.method = "post";
for (var p in t) {
var h = document.createElement("INPUT");
h.name = p, h.value = n.utils.stringifyJson(n.utils.unwrapObservable(t[p])), c.appendChild(h);
}
for (var p in r) {
var h = document.createElement("INPUT");
h.name = p, h.value = r[p], c.appendChild(h);
}
document.body.appendChild(c), o.submitter ? o.submitter(c) :c.submit(), setTimeout(function() {
c.parentNode.removeChild(c);
}, 0);
}
};
}(), n.exportSymbol("ko.utils", n.utils), n.exportSymbol("ko.utils.arrayForEach", n.utils.arrayForEach), 
n.exportSymbol("ko.utils.arrayFirst", n.utils.arrayFirst), n.exportSymbol("ko.utils.arrayFilter", n.utils.arrayFilter), 
n.exportSymbol("ko.utils.arrayGetDistinctValues", n.utils.arrayGetDistinctValues), 
n.exportSymbol("ko.utils.arrayIndexOf", n.utils.arrayIndexOf), n.exportSymbol("ko.utils.arrayMap", n.utils.arrayMap), 
n.exportSymbol("ko.utils.arrayPushAll", n.utils.arrayPushAll), n.exportSymbol("ko.utils.arrayRemoveItem", n.utils.arrayRemoveItem), 
n.exportSymbol("ko.utils.fieldsIncludedWithJsonPost", n.utils.fieldsIncludedWithJsonPost), 
n.exportSymbol("ko.utils.getElementsHavingAttribute", n.utils.getElementsHavingAttribute), 
n.exportSymbol("ko.utils.getFormFields", n.utils.getFormFields), n.exportSymbol("ko.utils.postJson", n.utils.postJson), 
n.exportSymbol("ko.utils.parseJson", n.utils.parseJson), n.exportSymbol("ko.utils.registerEventHandler", n.utils.registerEventHandler), 
n.exportSymbol("ko.utils.stringifyJson", n.utils.stringifyJson), n.exportSymbol("ko.utils.range", n.utils.range), 
n.exportSymbol("ko.utils.toggleDomNodeCssClass", n.utils.toggleDomNodeCssClass), 
n.exportSymbol("ko.utils.triggerEvent", n.utils.triggerEvent), n.exportSymbol("ko.utils.unwrapObservable", n.utils.unwrapObservable), 
Function.prototype.bind || (Function.prototype.bind = function(e) {
var t = this, o = Array.prototype.slice.call(arguments), e = o.shift();
return function() {
return t.apply(e, o.concat(Array.prototype.slice.call(arguments)));
};
}), n.utils.domData = new function() {
var e = 0, o = "__ko__" + new Date().getTime(), r = {};
return {
get:function(e, o) {
var r = n.utils.domData.getAll(e, !1);
return r === t ? t :r[o];
},
set:function(e, o, r) {
if (r !== t || n.utils.domData.getAll(e, !1) !== t) {
var i = n.utils.domData.getAll(e, !0);
i[o] = r;
}
},
getAll:function(n, i) {
var a = n[o];
if (!a) {
if (!i) return t;
a = n[o] = "ko" + e++, r[a] = {};
}
return r[a];
},
clear:function(e) {
var t = e[o];
t && (delete r[t], e[o] = null);
}
};
}(), n.utils.domNodeDisposal = new function() {
function e(e, o) {
var r = n.utils.domData.get(e, i);
return r === t && o && (r = [], n.utils.domData.set(e, i, r)), r;
}
function o(e) {
n.utils.domData.set(e, i, t);
}
function r(t) {
var o = e(t, !1);
if (o) {
o = o.slice(0);
for (var r = 0; r < o.length; r++) o[r](t);
}
n.utils.domData.clear(t), "function" == typeof jQuery && "function" == typeof jQuery.cleanData && jQuery.cleanData([ t ]);
}
var i = "__ko_domNodeDisposal__" + new Date().getTime();
return {
addDisposeCallback:function(t, o) {
if ("function" != typeof o) throw new Error("Callback must be a function");
e(t, !0).push(o);
},
removeDisposeCallback:function(t, r) {
var i = e(t, !1);
i && (n.utils.arrayRemoveItem(i, r), 0 == i.length && o(t));
},
cleanNode:function(e) {
if (1 == e.nodeType || 9 == e.nodeType) {
r(e);
var t = [];
n.utils.arrayPushAll(t, e.getElementsByTagName("*"));
for (var o = 0, i = t.length; i > o; o++) r(t[o]);
}
},
removeNode:function(e) {
n.cleanNode(e), e.parentNode && e.parentNode.removeChild(e);
}
};
}(), n.cleanNode = n.utils.domNodeDisposal.cleanNode, n.removeNode = n.utils.domNodeDisposal.removeNode, 
n.exportSymbol("ko.cleanNode", n.cleanNode), n.exportSymbol("ko.removeNode", n.removeNode), 
n.exportSymbol("ko.utils.domNodeDisposal", n.utils.domNodeDisposal), n.exportSymbol("ko.utils.domNodeDisposal.addDisposeCallback", n.utils.domNodeDisposal.addDisposeCallback), 
n.exportSymbol("ko.utils.domNodeDisposal.removeDisposeCallback", n.utils.domNodeDisposal.removeDisposeCallback), 
function() {
function e(e) {
var t = n.utils.stringTrim(e).toLowerCase(), o = document.createElement("div"), r = t.match(/^<(thead|tbody|tfoot)/) && [ 1, "<table>", "</table>" ] || !t.indexOf("<tr") && [ 2, "<table><tbody>", "</tbody></table>" ] || (!t.indexOf("<td") || !t.indexOf("<th")) && [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ] || [ 0, "", "" ];
for (o.innerHTML = r[1] + e + r[2]; r[0]--; ) o = o.lastChild;
return n.utils.makeArray(o.childNodes);
}
n.utils.parseHtmlFragment = function(t) {
return "undefined" != typeof jQuery ? jQuery.clean([ t ]) :e(t);
}, n.utils.setHtml = function(e, o) {
if (n.utils.emptyDomNode(e), null !== o && o !== t) if ("string" != typeof o && (o = o.toString()), 
"undefined" != typeof jQuery) jQuery(e).html(o); else for (var r = n.utils.parseHtmlFragment(o), i = 0; i < r.length; i++) e.appendChild(r[i]);
};
}(), n.memoization = function() {
function e() {
return (4294967296 * (1 + Math.random()) | 0).toString(16).substring(1);
}
function o() {
return e() + e();
}
function r(e, t) {
if (e) if (8 == e.nodeType) {
var o = n.memoization.parseMemoText(e.nodeValue);
null != o && t.push({
domNode:e,
memoId:o
});
} else if (1 == e.nodeType) for (var i = 0, a = e.childNodes, s = a.length; s > i; i++) r(a[i], t);
}
var i = {};
return {
memoize:function(e) {
if ("function" != typeof e) throw new Error("You can only pass a function to ko.memoization.memoize()");
var t = o();
return i[t] = e, "<!--[ko_memo:" + t + "]-->";
},
unmemoize:function(e, o) {
var n = i[e];
if (n === t) throw new Error("Couldn't find any memo with ID " + e + ". Perhaps it's already been unmemoized.");
try {
return n.apply(null, o || []), !0;
} finally {
delete i[e];
}
},
unmemoizeDomNodeAndDescendants:function(e, t) {
var o = [];
r(e, o);
for (var i = 0, a = o.length; a > i; i++) {
var s = o[i].domNode, l = [ s ];
t && n.utils.arrayPushAll(l, t), n.memoization.unmemoize(o[i].memoId, l), s.nodeValue = "", 
s.parentNode && s.parentNode.removeChild(s);
}
},
parseMemoText:function(e) {
var t = e.match(/^\[ko_memo\:(.*?)\]$/);
return t ? t[1] :null;
}
};
}(), n.exportSymbol("ko.memoization", n.memoization), n.exportSymbol("ko.memoization.memoize", n.memoization.memoize), 
n.exportSymbol("ko.memoization.unmemoize", n.memoization.unmemoize), n.exportSymbol("ko.memoization.parseMemoText", n.memoization.parseMemoText), 
n.exportSymbol("ko.memoization.unmemoizeDomNodeAndDescendants", n.memoization.unmemoizeDomNodeAndDescendants), 
n.subscription = function(e, t) {
this.callback = e, this.dispose = function() {
this.isDisposed = !0, t();
}.bind(this), n.exportProperty(this, "dispose", this.dispose);
}, n.subscribable = function() {
var e = [];
this.subscribe = function(t, o) {
var r = o ? t.bind(o) :t, i = new n.subscription(r, function() {
n.utils.arrayRemoveItem(e, i);
});
return e.push(i), i;
}, this.notifySubscribers = function(t) {
n.utils.arrayForEach(e.slice(0), function(e) {
e && e.isDisposed !== !0 && e.callback(t);
});
}, this.getSubscriptionsCount = function() {
return e.length;
}, n.exportProperty(this, "subscribe", this.subscribe), n.exportProperty(this, "notifySubscribers", this.notifySubscribers), 
n.exportProperty(this, "getSubscriptionsCount", this.getSubscriptionsCount);
}, n.isSubscribable = function(e) {
return "function" == typeof e.subscribe && "function" == typeof e.notifySubscribers;
}, n.exportSymbol("ko.subscribable", n.subscribable), n.exportSymbol("ko.isSubscribable", n.isSubscribable), 
n.dependencyDetection = function() {
var e = [];
return {
begin:function() {
e.push([]);
},
end:function() {
return e.pop();
},
registerDependency:function(t) {
if (!n.isSubscribable(t)) throw "Only subscribable things can act as dependencies";
e.length > 0 && e[e.length - 1].push(t);
}
};
}();
var r = {
undefined:!0,
"boolean":!0,
number:!0,
string:!0
};
n.observable = function(e) {
function t() {
return arguments.length > 0 ? (t.equalityComparer && t.equalityComparer(r, arguments[0]) || (r = arguments[0], 
t.notifySubscribers(r)), this) :(n.dependencyDetection.registerDependency(t), r);
}
var r = e;
return t.__ko_proto__ = n.observable, t.valueHasMutated = function() {
t.notifySubscribers(r);
}, t.equalityComparer = o, n.subscribable.call(t), n.exportProperty(t, "valueHasMutated", t.valueHasMutated), 
t;
}, n.isObservable = function(e) {
return null === e || e === t || e.__ko_proto__ === t ? !1 :e.__ko_proto__ === n.observable ? !0 :n.isObservable(e.__ko_proto__);
}, n.isWriteableObservable = function(e) {
return "function" == typeof e && e.__ko_proto__ === n.observable ? !0 :"function" == typeof e && e.__ko_proto__ === n.dependentObservable && e.hasWriteFunction ? !0 :!1;
}, n.exportSymbol("ko.observable", n.observable), n.exportSymbol("ko.isObservable", n.isObservable), 
n.exportSymbol("ko.isWriteableObservable", n.isWriteableObservable), n.observableArray = function(e) {
if (0 == arguments.length && (e = []), null !== e && e !== t && !("length" in e)) throw new Error("The argument passed when initializing an observable array must be an array, or null, or undefined.");
var o = new n.observable(e);
return n.utils.arrayForEach([ "pop", "push", "reverse", "shift", "sort", "splice", "unshift" ], function(e) {
o[e] = function() {
var t = o(), n = t[e].apply(t, arguments);
return o.valueHasMutated(), n;
};
}), n.utils.arrayForEach([ "slice" ], function(e) {
o[e] = function() {
var t = o();
return t[e].apply(t, arguments);
};
}), o.remove = function(e) {
for (var t = o(), n = [], r = [], i = "function" == typeof e ? e :function(t) {
return t === e;
}, a = 0, s = t.length; s > a; a++) {
var l = t[a];
i(l) ? r.push(l) :n.push(l);
}
return o(n), r;
}, o.removeAll = function(e) {
if (e === t) {
var r = o();
return o([]), r;
}
return e ? o.remove(function(t) {
return n.utils.arrayIndexOf(e, t) >= 0;
}) :[];
}, o.destroy = function(e) {
for (var t = o(), n = "function" == typeof e ? e :function(t) {
return t === e;
}, r = t.length - 1; r >= 0; r--) {
var i = t[r];
n(i) && (t[r]._destroy = !0);
}
o.valueHasMutated();
}, o.destroyAll = function(e) {
return e === t ? o.destroy(function() {
return !0;
}) :e ? o.destroy(function(t) {
return n.utils.arrayIndexOf(e, t) >= 0;
}) :[];
}, o.indexOf = function(e) {
var t = o();
return n.utils.arrayIndexOf(t, e);
}, o.replace = function(e, t) {
var n = o.indexOf(e);
n >= 0 && (o()[n] = t, o.valueHasMutated());
}, n.exportProperty(o, "remove", o.remove), n.exportProperty(o, "removeAll", o.removeAll), 
n.exportProperty(o, "destroy", o.destroy), n.exportProperty(o, "destroyAll", o.destroyAll), 
n.exportProperty(o, "indexOf", o.indexOf), o;
}, n.exportSymbol("ko.observableArray", n.observableArray), n.dependentObservable = function(e, t, o) {
function r() {
n.utils.arrayForEach(h, function(e) {
e.dispose();
}), h = [];
}
function i(e) {
r(), n.utils.arrayForEach(e, function(e) {
h.push(e.subscribe(a));
});
}
function a() {
if (u && "function" == typeof o.disposeWhen && o.disposeWhen()) return s.dispose(), 
void 0;
try {
n.dependencyDetection.begin(), l = o.owner ? o.read.call(o.owner) :o.read();
} finally {
var e = n.utils.arrayGetDistinctValues(n.dependencyDetection.end());
i(e);
}
s.notifySubscribers(l), u = !0;
}
function s() {
if (!(arguments.length > 0)) return u || a(), n.dependencyDetection.registerDependency(s), 
l;
if ("function" != typeof o.write) throw "Cannot write a value to a dependentObservable unless you specify a 'write' option. If you wish to read the current value, don't pass any parameters.";
var e = arguments[0];
o.owner ? o.write.call(o.owner, e) :o.write(e);
}
var l, u = !1;
if (e && "object" == typeof e ? o = e :(o = o || {}, o.read = e || o.read, o.owner = t || o.owner), 
"function" != typeof o.read) throw "Pass a function that returns the value of the dependentObservable";
var d = "object" == typeof o.disposeWhenNodeIsRemoved ? o.disposeWhenNodeIsRemoved :null, c = null;
if (d) {
c = function() {
s.dispose();
}, n.utils.domNodeDisposal.addDisposeCallback(d, c);
var p = o.disposeWhen;
o.disposeWhen = function() {
return !n.utils.domNodeIsAttachedToDocument(d) || "function" == typeof p && p();
};
}
var h = [];
return s.__ko_proto__ = n.dependentObservable, s.getDependenciesCount = function() {
return h.length;
}, s.hasWriteFunction = "function" == typeof o.write, s.dispose = function() {
d && n.utils.domNodeDisposal.removeDisposeCallback(d, c), r();
}, n.subscribable.call(s), o.deferEvaluation !== !0 && a(), n.exportProperty(s, "dispose", s.dispose), 
n.exportProperty(s, "getDependenciesCount", s.getDependenciesCount), s;
}, n.dependentObservable.__ko_proto__ = n.observable, n.exportSymbol("ko.dependentObservable", n.dependentObservable), 
function() {
function e(n, i, a) {
a = a || new r(), n = i(n);
var s = "object" == typeof n && null !== n && n !== t;
if (!s) return n;
var l = n instanceof Array ? [] :{};
return a.save(n, l), o(n, function(o) {
var r = i(n[o]);
switch (typeof r) {
case "boolean":
case "number":
case "string":
case "function":
l[o] = r;
break;

case "object":
case "undefined":
var s = a.get(r);
l[o] = s !== t ? s :e(r, i, a);
}
}), l;
}
function o(e, t) {
if (e instanceof Array) for (var o = 0; o < e.length; o++) t(o); else for (var n in e) t(n);
}
function r() {
var e = [], o = [];
this.save = function(t, r) {
var i = n.utils.arrayIndexOf(e, t);
i >= 0 ? o[i] = r :(e.push(t), o.push(r));
}, this.get = function(r) {
var i = n.utils.arrayIndexOf(e, r);
return i >= 0 ? o[i] :t;
};
}
var i = 10;
n.toJS = function(t) {
if (0 == arguments.length) throw new Error("When calling ko.toJS, pass the object you want to convert.");
return e(t, function(e) {
for (var t = 0; n.isObservable(e) && i > t; t++) e = e();
return e;
});
}, n.toJSON = function(e) {
var t = n.toJS(e);
return n.utils.stringifyJson(t);
};
}(), n.exportSymbol("ko.toJS", n.toJS), n.exportSymbol("ko.toJSON", n.toJSON), function() {
n.selectExtensions = {
readValue:function(e) {
return "OPTION" == e.tagName ? e.__ko__hasDomDataOptionValue__ === !0 ? n.utils.domData.get(e, n.bindingHandlers.options.optionValueDomDataKey) :e.getAttribute("value") :"SELECT" == e.tagName ? e.selectedIndex >= 0 ? n.selectExtensions.readValue(e.options[e.selectedIndex]) :t :e.value;
},
writeValue:function(e, o) {
if ("OPTION" == e.tagName) switch (typeof o) {
case "string":
case "number":
n.utils.domData.set(e, n.bindingHandlers.options.optionValueDomDataKey, t), "__ko__hasDomDataOptionValue__" in e && delete e.__ko__hasDomDataOptionValue__, 
e.value = o;
break;

default:
n.utils.domData.set(e, n.bindingHandlers.options.optionValueDomDataKey, o), e.__ko__hasDomDataOptionValue__ = !0, 
e.value = "";
} else if ("SELECT" == e.tagName) {
for (var r = e.options.length - 1; r >= 0; r--) if (n.selectExtensions.readValue(e.options[r]) == o) {
e.selectedIndex = r;
break;
}
} else (null === o || o === t) && (o = ""), e.value = o;
}
};
}(), n.exportSymbol("ko.selectExtensions", n.selectExtensions), n.exportSymbol("ko.selectExtensions.readValue", n.selectExtensions.readValue), 
n.exportSymbol("ko.selectExtensions.writeValue", n.selectExtensions.writeValue), 
n.jsonExpressionRewriting = function() {
function e(e, t) {
return e.replace(o, function(e, o) {
return t[o];
});
}
function t(e) {
return n.utils.arrayIndexOf(i, n.utils.stringTrim(e).toLowerCase()) >= 0 ? !1 :null !== e.match(r);
}
var o = /\[ko_token_(\d+)\]/g, r = /^[\_$a-z][\_$a-z0-9]*(\[.*?\])*(\.[\_$a-z][\_$a-z0-9]*(\[.*?\])*)*$/i, i = [ "true", "false" ];
return {
parseJson:function(t) {
if (t = n.utils.stringTrim(t), t.length < 3) return {};
for (var o, r = [], i = null, a = "{" == t.charAt(0) ? 1 :0; a < t.length; a++) {
var s = t.charAt(a);
if (null === i) switch (s) {
case '"':
case "'":
case "/":
i = a, o = s;
break;

case "{":
i = a, o = "}";
break;

case "[":
i = a, o = "]";
} else if (s == o) {
var l = t.substring(i, a + 1);
r.push(l);
var u = "[ko_token_" + (r.length - 1) + "]";
t = t.substring(0, i) + u + t.substring(a + 1), a -= l.length - u.length, i = null;
}
}
for (var d = {}, c = t.split(","), p = 0, h = c.length; h > p; p++) {
var g = c[p], m = g.indexOf(":");
if (m > 0 && m < g.length - 1) {
var f = n.utils.stringTrim(g.substring(0, m)), _ = n.utils.stringTrim(g.substring(m + 1));
"{" == f.charAt(0) && (f = f.substring(1)), "}" == _.charAt(_.length - 1) && (_ = _.substring(0, _.length - 1)), 
f = n.utils.stringTrim(e(f, r)), _ = n.utils.stringTrim(e(_, r)), d[f] = _;
}
}
return d;
},
insertPropertyAccessorsIntoJson:function(e) {
var o = n.jsonExpressionRewriting.parseJson(e), r = [];
for (var i in o) {
var a = o[i];
t(a) && (r.length > 0 && r.push(", "), r.push(i + " : function(__ko_value) { " + a + " = __ko_value; }"));
}
if (r.length > 0) {
var s = r.join("");
e = e + ", '_ko_property_writers' : { " + s + " } ";
}
return e;
}
};
}(), n.exportSymbol("ko.jsonExpressionRewriting", n.jsonExpressionRewriting), n.exportSymbol("ko.jsonExpressionRewriting.parseJson", n.jsonExpressionRewriting.parseJson), 
n.exportSymbol("ko.jsonExpressionRewriting.insertPropertyAccessorsIntoJson", n.jsonExpressionRewriting.insertPropertyAccessorsIntoJson), 
function() {
function o(t, o) {
try {
var r = " { " + n.jsonExpressionRewriting.insertPropertyAccessorsIntoJson(t) + " } ";
return n.utils.evalWithinScope(r, null === o ? e :o);
} catch (i) {
throw new Error("Unable to parse binding attribute.\nMessage: " + i + ";\nAttribute value: " + t);
}
}
function r(e, t, o, n, r) {
e(t, o, n, r);
}
var i = "data-bind";
n.bindingHandlers = {}, n.applyBindingsToNode = function(e, t, a, s) {
function l(e) {
return function() {
return c[e];
};
}
function u() {
return c;
}
var d = !0;
s = s || i;
var c;
new n.dependentObservable(function() {
var i = "function" == typeof t ? t() :t;
if (c = i || o(e.getAttribute(s), a), d) for (var p in c) n.bindingHandlers[p] && "function" == typeof n.bindingHandlers[p].init && r(n.bindingHandlers[p].init, e, l(p), u, a);
for (var p in c) n.bindingHandlers[p] && "function" == typeof n.bindingHandlers[p].update && r(n.bindingHandlers[p].update, e, l(p), u, a);
}, null, {
disposeWhenNodeIsRemoved:e
}), d = !1;
}, n.applyBindings = function(o, r) {
if (r && r.nodeType == t) throw new Error("ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node (note: this is a breaking change since KO version 1.05)");
r = r || e.document.body;
var a = n.utils.getElementsHavingAttribute(r, i);
n.utils.arrayForEach(a, function(e) {
n.applyBindingsToNode(e, null, o);
});
}, n.exportSymbol("ko.bindingHandlers", n.bindingHandlers), n.exportSymbol("ko.applyBindings", n.applyBindings), 
n.exportSymbol("ko.applyBindingsToNode", n.applyBindingsToNode);
}();
var i = [ "click" ];
n.utils.arrayForEach(i, function(e) {
n.bindingHandlers[e] = {
init:function(t, o, r, i) {
var a = function() {
var t = {};
return t[e] = o(), t;
};
return n.bindingHandlers.event.init.call(this, t, a, r, i);
}
};
}), n.bindingHandlers.event = {
init:function(e, t, o, r) {
var i = t() || {};
for (var a in i) !function() {
var i = a;
"string" == typeof i && n.utils.registerEventHandler(e, i, function(e) {
var n, a = t()[i];
if (a) {
var s = o();
try {
n = a.apply(r, arguments);
} finally {
n !== !0 && (e.preventDefault ? e.preventDefault() :e.returnValue = !1);
}
var l = s[i + "Bubble"] !== !1;
l || (e.cancelBubble = !0, e.stopPropagation && e.stopPropagation());
}
});
}();
}
}, n.bindingHandlers.submit = {
init:function(e, t, o, r) {
if ("function" != typeof t()) throw new Error("The value for a submit binding must be a function to invoke on submit");
n.utils.registerEventHandler(e, "submit", function(o) {
var n, i = t();
try {
n = i.call(r, e);
} finally {
n !== !0 && (o.preventDefault ? o.preventDefault() :o.returnValue = !1);
}
});
}
}, n.bindingHandlers.visible = {
update:function(e, t) {
var o = n.utils.unwrapObservable(t()), r = !("none" == e.style.display);
o && !r ? e.style.display = "" :!o && r && (e.style.display = "none");
}
}, n.bindingHandlers.enable = {
update:function(e, t) {
var o = n.utils.unwrapObservable(t());
o && e.disabled ? e.removeAttribute("disabled") :o || e.disabled || (e.disabled = !0);
}
}, n.bindingHandlers.disable = {
update:function(e, t) {
n.bindingHandlers.enable.update(e, function() {
return !n.utils.unwrapObservable(t());
});
}
}, n.bindingHandlers.value = {
init:function(e, t, o) {
var r = [ "change" ], i = o().valueUpdate;
i && ("string" == typeof i && (i = [ i ]), n.utils.arrayPushAll(r, i), r = n.utils.arrayGetDistinctValues(r)), 
n.utils.arrayForEach(r, function(r) {
var i = !1;
n.utils.stringStartsWith(r, "after") && (i = !0, r = r.substring("after".length));
var a = i ? function(e) {
setTimeout(e, 0);
} :function(e) {
e();
};
n.utils.registerEventHandler(e, r, function() {
a(function() {
var r = t(), i = n.selectExtensions.readValue(e);
if (n.isWriteableObservable(r)) r(i); else {
var a = o();
a._ko_property_writers && a._ko_property_writers.value && a._ko_property_writers.value(i);
}
});
});
});
},
update:function(e, t) {
var o = n.utils.unwrapObservable(t()), r = n.selectExtensions.readValue(e), i = o != r;
if (0 === o && 0 !== r && "0" !== r && (i = !0), i) {
var a = function() {
n.selectExtensions.writeValue(e, o);
};
a();
var s = "SELECT" == e.tagName;
s && setTimeout(a, 0);
}
"SELECT" == e.tagName && (r = n.selectExtensions.readValue(e), r !== o && n.utils.triggerEvent(e, "change"));
}
}, n.bindingHandlers.options = {
update:function(e, o, r) {
if ("SELECT" != e.tagName) throw new Error("options binding applies only to SELECT elements");
{
var i = n.utils.arrayMap(n.utils.arrayFilter(e.childNodes, function(e) {
return e.tagName && "OPTION" == e.tagName && e.selected;
}), function(e) {
return n.selectExtensions.readValue(e) || e.innerText || e.textContent;
}), a = e.scrollTop, s = n.utils.unwrapObservable(o());
e.value;
}
if (n.utils.emptyDomNode(e), s) {
var l = r();
if ("number" != typeof s.length && (s = [ s ]), l.optionsCaption) {
var u = document.createElement("OPTION");
u.innerHTML = l.optionsCaption, n.selectExtensions.writeValue(u, t), e.appendChild(u);
}
for (var d = 0, c = s.length; c > d; d++) {
var u = document.createElement("OPTION"), p = "string" == typeof l.optionsValue ? s[d][l.optionsValue] :s[d];
p = n.utils.unwrapObservable(p), n.selectExtensions.writeValue(u, p);
var h = l.optionsText;
optionText = "function" == typeof h ? h(s[d]) :"string" == typeof h ? s[d][h] :p, 
(null === optionText || optionText === t) && (optionText = ""), optionText = n.utils.unwrapObservable(optionText).toString(), 
"string" == typeof u.innerText ? u.innerText = optionText :u.textContent = optionText, 
e.appendChild(u);
}
for (var g = e.getElementsByTagName("OPTION"), m = 0, d = 0, c = g.length; c > d; d++) n.utils.arrayIndexOf(i, n.selectExtensions.readValue(g[d])) >= 0 && (n.utils.setOptionNodeSelectionState(g[d], !0), 
m++);
a && (e.scrollTop = a);
}
}
}, n.bindingHandlers.options.optionValueDomDataKey = "__ko.bindingHandlers.options.optionValueDomData__", 
n.bindingHandlers.selectedOptions = {
getSelectedValuesFromSelectNode:function(e) {
for (var t = [], o = e.childNodes, r = 0, i = o.length; i > r; r++) {
var a = o[r];
"OPTION" == a.tagName && a.selected && t.push(n.selectExtensions.readValue(a));
}
return t;
},
init:function(e, t, o) {
n.utils.registerEventHandler(e, "change", function() {
var e = t();
if (n.isWriteableObservable(e)) e(n.bindingHandlers.selectedOptions.getSelectedValuesFromSelectNode(this)); else {
var r = o();
r._ko_property_writers && r._ko_property_writers.value && r._ko_property_writers.value(n.bindingHandlers.selectedOptions.getSelectedValuesFromSelectNode(this));
}
});
},
update:function(e, t) {
if ("SELECT" != e.tagName) throw new Error("values binding applies only to SELECT elements");
var o = n.utils.unwrapObservable(t());
if (o && "number" == typeof o.length) for (var r = e.childNodes, i = 0, a = r.length; a > i; i++) {
var s = r[i];
"OPTION" == s.tagName && n.utils.setOptionNodeSelectionState(s, n.utils.arrayIndexOf(o, n.selectExtensions.readValue(s)) >= 0);
}
}
}, n.bindingHandlers.text = {
update:function(e, o) {
var r = n.utils.unwrapObservable(o());
(null === r || r === t) && (r = ""), "string" == typeof e.innerText ? e.innerText = r :e.textContent = r;
}
}, n.bindingHandlers.html = {
update:function(e, t) {
var o = n.utils.unwrapObservable(t());
n.utils.setHtml(e, o);
}
}, n.bindingHandlers.css = {
update:function(e, t) {
var o = n.utils.unwrapObservable(t() || {});
for (var r in o) if ("string" == typeof r) {
var i = n.utils.unwrapObservable(o[r]);
n.utils.toggleDomNodeCssClass(e, r, i);
}
}
}, n.bindingHandlers.style = {
update:function(e, t) {
var o = n.utils.unwrapObservable(t() || {});
for (var r in o) if ("string" == typeof r) {
var i = n.utils.unwrapObservable(o[r]);
e.style[r] = i || "";
}
}
}, n.bindingHandlers.uniqueName = {
init:function(e, t) {
t() && (e.name = "ko_unique_" + ++n.bindingHandlers.uniqueName.currentIndex, n.utils.isIe6 && e.mergeAttributes(document.createElement("<input name='" + e.name + "'/>"), !1));
}
}, n.bindingHandlers.uniqueName.currentIndex = 0, n.bindingHandlers.checked = {
init:function(e, t, o) {
var r = function() {
var r;
if ("checkbox" == e.type) r = e.checked; else {
if ("radio" != e.type || !e.checked) return;
r = e.value;
}
var i = t();
if ("checkbox" == e.type && n.utils.unwrapObservable(i) instanceof Array) {
var a = n.utils.arrayIndexOf(n.utils.unwrapObservable(i), e.value);
e.checked && 0 > a ? i.push(e.value) :!e.checked && a >= 0 && i.splice(a, 1);
} else if (n.isWriteableObservable(i)) i() !== r && i(r); else {
var s = o();
s._ko_property_writers && s._ko_property_writers.checked && s._ko_property_writers.checked(r);
}
};
n.utils.registerEventHandler(e, "click", r), "radio" != e.type || e.name || n.bindingHandlers.uniqueName.init(e, function() {
return !0;
});
},
update:function(e, t) {
var o = n.utils.unwrapObservable(t());
"checkbox" == e.type ? (e.checked = o instanceof Array ? n.utils.arrayIndexOf(o, e.value) >= 0 :o, 
o && n.utils.isIe6 && e.mergeAttributes(document.createElement("<input type='checkbox' checked='checked' />"), !1)) :"radio" == e.type && (e.checked = e.value == o, 
e.value == o && (n.utils.isIe6 || n.utils.isIe7) && e.mergeAttributes(document.createElement("<input type='radio' checked='checked' />"), !1));
}
}, n.bindingHandlers.attr = {
update:function(e, o) {
var r = n.utils.unwrapObservable(o()) || {};
for (var i in r) if ("string" == typeof i) {
var a = n.utils.unwrapObservable(r[i]);
a === !1 || null === a || a === t ? e.removeAttribute(i) :e.setAttribute(i, a.toString());
}
}
}, n.templateEngine = function() {
this.renderTemplate = function() {
throw "Override renderTemplate in your ko.templateEngine subclass";
}, this.isTemplateRewritten = function() {
throw "Override isTemplateRewritten in your ko.templateEngine subclass";
}, this.rewriteTemplate = function() {
throw "Override rewriteTemplate in your ko.templateEngine subclass";
}, this.createJavaScriptEvaluatorBlock = function() {
throw "Override createJavaScriptEvaluatorBlock in your ko.templateEngine subclass";
};
}, n.exportSymbol("ko.templateEngine", n.templateEngine), n.templateRewriting = function() {
var e = /(<[a-z]+\d*(\s+(?!data-bind=)[a-z0-9\-]+(=(\"[^\"]*\"|\'[^\']*\'))?)*\s+)data-bind=(["'])([\s\S]*?)\5/gi;
return {
ensureTemplateIsRewritten:function(e, t) {
t.isTemplateRewritten(e) || t.rewriteTemplate(e, function(e) {
return n.templateRewriting.memoizeBindingAttributeSyntax(e, t);
});
},
memoizeBindingAttributeSyntax:function(t, o) {
return t.replace(e, function() {
var e = arguments[1], t = arguments[6];
t = n.jsonExpressionRewriting.insertPropertyAccessorsIntoJson(t);
var r = "ko.templateRewriting.applyMemoizedBindingsToNextSibling(function() {                     return (function() { return { " + t + " } })()                 })";
return o.createJavaScriptEvaluatorBlock(r) + e;
});
},
applyMemoizedBindingsToNextSibling:function(e) {
return n.memoization.memoize(function(t, o) {
t.nextSibling && n.applyBindingsToNode(t.nextSibling, e, o);
});
}
};
}(), n.exportSymbol("ko.templateRewriting", n.templateRewriting), n.exportSymbol("ko.templateRewriting.applyMemoizedBindingsToNextSibling", n.templateRewriting.applyMemoizedBindingsToNextSibling), 
function() {
function e(e) {
return e.nodeType ? e :e.length > 0 ? e[0] :null;
}
function o(e, t, o, r, a) {
var s = n.utils.unwrapObservable(r);
a = a || {};
var l = a.templateEngine || i;
n.templateRewriting.ensureTemplateIsRewritten(o, l);
var u = l.renderTemplate(o, s, a);
if ("number" != typeof u.length || u.length > 0 && "number" != typeof u[0].nodeType) throw "Template engine must return an array of DOM nodes";
switch (u && n.utils.arrayForEach(u, function(e) {
n.memoization.unmemoizeDomNodeAndDescendants(e, [ r ]);
}), t) {
case "replaceChildren":
n.utils.setDomNodeChildren(e, u);
break;

case "replaceNode":
n.utils.replaceDomNodes(e, u);
break;

case "ignoreTargetNode":
break;

default:
throw new Error("Unknown renderMode: " + t);
}
return a.afterRender && a.afterRender(u, r), u;
}
function r(e, t) {
var o = n.utils.domData.get(e, a);
o && "function" == typeof o.dispose && o.dispose(), n.utils.domData.set(e, a, t);
}
var i;
n.setTemplateEngine = function(e) {
if (e != t && !(e instanceof n.templateEngine)) throw "templateEngine must inherit from ko.templateEngine";
i = e;
}, n.renderTemplate = function(r, a, s, l, u) {
if (s = s || {}, (s.templateEngine || i) == t) throw "Set a template engine before calling renderTemplate";
if (u = u || "replaceChildren", l) {
var d = e(l), c = function() {
return !d || !n.utils.domNodeIsAttachedToDocument(d);
}, p = d && "replaceNode" == u ? d.parentNode :d;
return new n.dependentObservable(function() {
var t = "function" == typeof r ? r(a) :r, n = o(l, u, t, a, s);
"replaceNode" == u && (l = n, d = e(l));
}, null, {
disposeWhen:c,
disposeWhenNodeIsRemoved:p
});
}
return n.memoization.memoize(function(e) {
n.renderTemplate(r, a, s, e, "replaceNode");
});
}, n.renderTemplateForEach = function(e, t, r, i) {
return new n.dependentObservable(function() {
var a = n.utils.unwrapObservable(t) || [];
"undefined" == typeof a.length && (a = [ a ]);
var s = n.utils.arrayFilter(a, function(e) {
return r.includeDestroyed || !e._destroy;
});
n.utils.setDomNodeChildrenFromArrayMapping(i, s, function(t) {
var n = "function" == typeof e ? e(t) :e;
return o(null, "ignoreTargetNode", n, t, r);
}, r);
}, null, {
disposeWhenNodeIsRemoved:i
});
};
var a = "__ko__templateSubscriptionDomDataKey__";
n.bindingHandlers.template = {
update:function(e, t, o, i) {
var a, s = n.utils.unwrapObservable(t()), l = "string" == typeof s ? s :s.name;
if ("undefined" != typeof s.foreach) a = n.renderTemplateForEach(l, s.foreach || [], {
templateOptions:s.templateOptions,
afterAdd:s.afterAdd,
beforeRemove:s.beforeRemove,
includeDestroyed:s.includeDestroyed,
afterRender:s.afterRender
}, e); else {
var u = s.data;
a = n.renderTemplate(l, "undefined" == typeof u ? i :u, {
templateOptions:s.templateOptions,
afterRender:s.afterRender
}, e);
}
r(e, a);
}
};
}(), n.exportSymbol("ko.setTemplateEngine", n.setTemplateEngine), n.exportSymbol("ko.renderTemplate", n.renderTemplate), 
function() {
function e(e, o, n) {
for (var r = [], i = 0; i <= o.length; i++) r[i] = [];
for (var i = 0, a = Math.min(e.length, n); a >= i; i++) r[0][i] = i;
for (var i = 1, a = Math.min(o.length, n); a >= i; i++) r[i][0] = i;
var s, l, u = e.length, d = o.length;
for (s = 1; u >= s; s++) {
var c = Math.max(1, s - n), p = Math.min(d, s + n);
for (l = c; p >= l; l++) if (e[s - 1] === o[l - 1]) r[l][s] = r[l - 1][s - 1]; else {
var h = r[l - 1][s] === t ? Number.MAX_VALUE :r[l - 1][s] + 1, g = r[l][s - 1] === t ? Number.MAX_VALUE :r[l][s - 1] + 1;
r[l][s] = Math.min(h, g);
}
}
return r;
}
function o(e, o, n) {
var r = o.length, i = n.length, a = [], s = e[i][r];
if (s === t) return null;
for (;r > 0 || i > 0; ) {
var l = e[i][r], u = i > 0 ? e[i - 1][r] :s + 1, d = r > 0 ? e[i][r - 1] :s + 1, c = i > 0 && r > 0 ? e[i - 1][r - 1] :s + 1;
(u === t || l - 1 > u) && (u = s + 1), (d === t || l - 1 > d) && (d = s + 1), l - 1 > c && (c = s + 1), 
d >= u && c > u ? (a.push({
status:"added",
value:n[i - 1]
}), i--) :u > d && c > d ? (a.push({
status:"deleted",
value:o[r - 1]
}), r--) :(a.push({
status:"retained",
value:o[r - 1]
}), i--, r--);
}
return a.reverse();
}
n.utils.compareArrays = function(r, i, a) {
if (a === t) return n.utils.compareArrays(r, i, 1) || n.utils.compareArrays(r, i, 10) || n.utils.compareArrays(r, i, Number.MAX_VALUE);
r = r || [], i = i || [];
var s = e(r, i, a);
return o(s, r, i);
};
}(), n.exportSymbol("ko.utils.compareArrays", n.utils.compareArrays), function() {
function e(e, t, o) {
var r = [], i = n.dependentObservable(function() {
var e = t(o) || [];
r.length > 0 && n.utils.replaceDomNodes(r, e), r.splice(0, r.length), n.utils.arrayPushAll(r, e);
}, null, {
disposeWhenNodeIsRemoved:e,
disposeWhen:function() {
return 0 == r.length || !n.utils.domNodeIsAttachedToDocument(r[0]);
}
});
return {
mappedNodes:r,
dependentObservable:i
};
}
n.utils.setDomNodeChildrenFromArrayMapping = function(o, r, i, a) {
r = r || [], a = a || {};
for (var s = n.utils.domData.get(o, "setDomNodeChildrenFromArrayMapping_lastMappingResult") === t, l = n.utils.domData.get(o, "setDomNodeChildrenFromArrayMapping_lastMappingResult") || [], u = n.utils.arrayMap(l, function(e) {
return e.arrayEntry;
}), d = n.utils.compareArrays(u, r), c = [], p = 0, h = [], g = [], m = null, f = 0, _ = d.length; _ > f; f++) switch (d[f].status) {
case "retained":
var y = l[p];
c.push(y), y.domNodes.length > 0 && (m = y.domNodes[y.domNodes.length - 1]), p++;
break;

case "deleted":
l[p].dependentObservable.dispose(), n.utils.arrayForEach(l[p].domNodes, function(e) {
h.push({
element:e,
index:f,
value:d[f].value
}), m = e;
}), p++;
break;

case "added":
var w = e(o, i, d[f].value), v = w.mappedNodes;
c.push({
arrayEntry:d[f].value,
domNodes:v,
dependentObservable:w.dependentObservable
});
for (var b = 0, k = v.length; k > b; b++) {
var M = v[b];
g.push({
element:M,
index:f,
value:d[f].value
}), null == m ? o.firstChild ? o.insertBefore(M, o.firstChild) :o.appendChild(M) :m.nextSibling ? o.insertBefore(M, m.nextSibling) :o.appendChild(M), 
m = M;
}
}
n.utils.arrayForEach(h, function(e) {
n.cleanNode(e.element);
});
var L = !1;
if (!s) {
if (a.afterAdd) for (var f = 0; f < g.length; f++) a.afterAdd(g[f].element, g[f].index, g[f].value);
if (a.beforeRemove) {
for (var f = 0; f < h.length; f++) a.beforeRemove(h[f].element, h[f].index, h[f].value);
L = !0;
}
}
L || n.utils.arrayForEach(h, function(e) {
e.element.parentNode && e.element.parentNode.removeChild(e.element);
}), n.utils.domData.set(o, "setDomNodeChildrenFromArrayMapping_lastMappingResult", c);
};
}(), n.exportSymbol("ko.utils.setDomNodeChildrenFromArrayMapping", n.utils.setDomNodeChildrenFromArrayMapping), 
n.jqueryTmplTemplateEngine = function() {
this.jQueryTmplVersion = function() {
return "undefined" != typeof jQuery && jQuery.tmpl ? jQuery.tmpl.tag ? jQuery.tmpl.tag.tmpl && jQuery.tmpl.tag.tmpl.open && jQuery.tmpl.tag.tmpl.open.toString().indexOf("__") >= 0 ? 3 :2 :1 :0;
}(), this.getTemplateNode = function(e) {
var t = document.getElementById(e);
if (null == t) throw new Error("Cannot find template with ID=" + e);
return t;
};
var e = "__ko_apos__", t = new RegExp(e, "g");
this.renderTemplate = function(e, o, n) {
if (n = n || {}, 0 == this.jQueryTmplVersion) throw new Error("jquery.tmpl not detected.\nTo use KO's default template engine, reference jQuery and jquery.tmpl. See Knockout installation documentation for more details.");
if (1 == this.jQueryTmplVersion) {
var r = '<script type="text/html">' + this.getTemplateNode(e).text + "</script>", i = jQuery.tmpl(r, o), a = i[0].text.replace(t, "'");
return jQuery.clean([ a ], document);
}
if (!(e in jQuery.template)) {
var s = this.getTemplateNode(e).text;
jQuery.template(e, s);
}
o = [ o ];
var l = jQuery.tmpl(e, o, n.templateOptions);
return l.appendTo(document.createElement("div")), jQuery.fragments = {}, l;
}, this.isTemplateRewritten = function(e) {
return e in jQuery.template ? !0 :this.getTemplateNode(e).isRewritten === !0;
}, this.rewriteTemplate = function(t, o) {
var r = this.getTemplateNode(t), i = r.text.replace(/([\w-]+)=([\w-]+)([ >])/g, function(e, t, o, n) {
return t + '="' + o + '"' + n;
}), a = o(i);
1 == this.jQueryTmplVersion && (a = n.utils.stringTrim(a), a = a.replace(/([\s\S]*?)(\${[\s\S]*?}|{{[\=a-z][\s\S]*?}}|$)/g, function() {
var t = arguments[1], o = arguments[2];
return t.replace(/\'/g, e) + o;
})), r.text = a, r.isRewritten = !0;
}, this.createJavaScriptEvaluatorBlock = function(e) {
return 1 == this.jQueryTmplVersion ? "{{= " + e + "}}" :"{{ko_code ((function() { return " + e + " })()) }}";
}, this.addTemplate = function(e, t) {
document.write("<script type='text/html' id='" + e + "'>" + t + "</script>");
}, n.exportProperty(this, "addTemplate", this.addTemplate), this.jQueryTmplVersion > 1 && (jQuery.tmpl.tag.ko_code = {
open:(this.jQueryTmplVersion < 3 ? "_" :"__") + ".push($1 || '');"
});
}, n.jqueryTmplTemplateEngine.prototype = new n.templateEngine(), n.setTemplateEngine(new n.jqueryTmplTemplateEngine()), 
n.exportSymbol("ko.jqueryTmplTemplateEngine", n.jqueryTmplTemplateEngine);
}(window), ko.exportSymbol = function(e, t) {
for (var o = e.split("."), n = window, r = 0; r < o.length - 1; r++) n = n[o[r]];
n[o[o.length - 1]] = t;
}, ko.exportProperty = function(e, t, o) {
e[t] = o;
}, function() {
function e(t, o) {
for (var n in o) o.hasOwnProperty(n) && o[n] && (!t[n] || t[n] instanceof Array ? t[n] = o[n] :e(t[n], o[n]));
}
function t(t, o) {
var n = {};
return e(n, t), e(n, o), n;
}
function o(e) {
return e && "object" == typeof e && e.constructor == new Date().constructor ? "date" :typeof e;
}
function n(e, t) {
return e = e || {}, (e.create instanceof Function || e.key instanceof Function || e.arrayChanged instanceof Function) && (e = {
"":e
}), t && (e.ignore = r(t.ignore, e.ignore), e.include = r(t.include, e.include), 
e.copy = r(t.copy, e.copy)), e.ignore = r(e.ignore, y.ignore), e.include = r(e.include, y.include), 
e.copy = r(e.copy, y.copy), e.mappedProperties = {}, e;
}
function r(e, t) {
return e instanceof Array || (e = "undefined" === o(e) ? [] :[ e ]), t instanceof Array || (t = "undefined" === o(t) ? [] :[ t ]), 
e.concat(t);
}
function i(e) {
var t = ko.dependentObservable;
ko.dependentObservable = function() {
var e = arguments[2] || {};
e.deferEvaluation = !0;
var t = new f(arguments[0], arguments[1], e);
return t.__ko_proto__ = f, t;
};
var o = e();
return ko.dependentObservable = t, o;
}
function a(e, n, r, l, h, f, _) {
var y = ko.utils.unwrapObservable(n) instanceof Array;
if (_ = _ || "", ko.mapping.isMapped(e)) {
var w = ko.utils.unwrapObservable(e)[m];
r = t(w, r);
}
var v = function() {
return r[h] && r[h].create instanceof Function;
};
if (l = l || new g(), l.get(n)) return e;
if (h = h || "", y) {
var b = [], k = function(e) {
return e;
};
r[h] && r[h].key && (k = r[h].key);
var M = function(e) {
return e;
};
v() && (M = function(e) {
return r[h].create({
data:e,
parent:f
});
}), ko.isObservable(e) || (e = ko.observableArray([]), e.mappedRemove = function(t) {
var o = "function" == typeof t ? t :function(e) {
return e === k(t);
};
return e.remove(function(e) {
return o(k(e));
});
}, e.mappedRemoveAll = function(t) {
var o = d(t, k);
return e.remove(function(e) {
return -1 != ko.utils.arrayIndexOf(o, k(e));
});
}, e.mappedDestroy = function(t) {
var o = "function" == typeof t ? t :function(e) {
return e === k(t);
};
return e.destroy(function(e) {
return o(k(e));
});
}, e.mappedDestroyAll = function(t) {
var o = d(t, k);
return e.destroy(function(e) {
return -1 != ko.utils.arrayIndexOf(o, k(e));
});
}, e.mappedIndexOf = function(t) {
var o = d(e(), k), n = k(t);
return ko.utils.arrayIndexOf(o, n);
}, e.mappedCreate = function(t) {
if (-1 !== e.mappedIndexOf(t)) throw new Error("There already is an object with the key that you specified.");
var o = M(t);
return e.push(o), o;
});
for (var L = d(ko.utils.unwrapObservable(e), k).sort(), T = d(n, k).sort(), S = ko.utils.compareArrays(L, T), D = {}, Y = [], x = 0, E = S.length; E > x; x++) {
var C, $ = S[x], I = _ + "[" + x + "]";
switch ($.status) {
case "added":
var O = u(ko.utils.unwrapObservable(n), $.value, k);
C = ko.utils.unwrapObservable(a(void 0, O, r, l, h, e, I));
var j = s(ko.utils.unwrapObservable(n), O, D);
Y[j] = C, D[j] = !0;
break;

case "retained":
var O = u(ko.utils.unwrapObservable(n), $.value, k);
C = u(e, $.value, k), a(C, O, r, l, h, e, I);
var j = s(ko.utils.unwrapObservable(n), O, D);
Y[j] = C, D[j] = !0;
break;

case "deleted":
C = u(e, $.value, k);
}
b.push({
event:$.status,
item:C
});
}
e(Y), r[h] && r[h].arrayChanged && ko.utils.arrayForEach(b, function(e) {
r[h].arrayChanged(e.event, e.item);
});
} else if (p(n)) {
if (!e) {
if (v()) {
var A = i(function() {
return r[h].create({
data:n,
parent:f
});
});
return A;
}
e = {};
}
l.save(n, e), c(n, function(t) {
var o = _.length ? _ + "." + t :t;
if (-1 == ko.utils.arrayIndexOf(r.ignore, o)) {
if (-1 != ko.utils.arrayIndexOf(r.copy, o)) return e[t] = n[t], void 0;
var i = l.get(n[t]);
e[t] = i ? i :a(e[t], n[t], r, l, t, e, o), r.mappedProperties[o] = !0;
}
});
} else switch (o(n)) {
case "function":
e = n;
break;

default:
ko.isWriteableObservable(e) ? e(ko.utils.unwrapObservable(n)) :e = v() ? i(function() {
return r[h].create({
data:n,
parent:f
});
}) :ko.observable(ko.utils.unwrapObservable(n));
}
return e;
}
function s(e, t, o) {
for (var n = 0, r = e.length; r > n; n++) if (o[n] !== !0 && e[n] == t) return n;
return null;
}
function l(e, t) {
var n;
return t && (n = t(e)), "undefined" === o(n) && (n = e), ko.utils.unwrapObservable(n);
}
function u(e, t, o) {
var n = ko.utils.arrayFilter(ko.utils.unwrapObservable(e), function(e) {
return l(e, o) == t;
});
if (0 == n.length) throw new Error("When calling ko.update*, the key '" + t + "' was not found!");
if (n.length > 1 && p(n[0])) throw new Error("When calling ko.update*, the key '" + t + "' was not unique!");
return n[0];
}
function d(e, t) {
return ko.utils.arrayMap(ko.utils.unwrapObservable(e), function(e) {
return t ? l(e, t) :e;
});
}
function c(e, t) {
if (e instanceof Array) for (var o = 0; o < e.length; o++) t(o); else for (var n in e) t(n);
}
function p(e) {
var t = o(e);
return "object" == t && null !== e && "undefined" !== t;
}
function h(e, t, o) {
var n = e || "";
return t instanceof Array ? e && (n += "[" + o + "]") :(e && (n += "."), n += o), 
n;
}
function g() {
var e = [], t = [];
this.save = function(o, n) {
var r = ko.utils.arrayIndexOf(e, o);
r >= 0 ? t[r] = n :(e.push(o), t.push(n));
}, this.get = function(o) {
var n = ko.utils.arrayIndexOf(e, o);
return n >= 0 ? t[n] :void 0;
};
}
ko.mapping = {};
var m = "__ko_mapping__", f = ko.dependentObservable, _ = {
include:[ "_destroy" ],
ignore:[],
copy:[]
}, y = _;
ko.mapping.fromJS = function(e, o, r) {
if (0 == arguments.length) throw new Error("When calling ko.fromJS, pass the object you want to convert.");
o = n(o);
var i = a(r, e, o);
return i[m] = t(i[m], o), i;
}, ko.mapping.fromJSON = function(e, t) {
var o = ko.utils.parseJson(e);
return ko.mapping.fromJS(o, t);
}, ko.mapping.isMapped = function(e) {
var t = ko.utils.unwrapObservable(e);
return t && t[m];
}, ko.mapping.updateFromJS = function(e, t) {
if (arguments.length < 2) throw new Error("When calling ko.updateFromJS, pass: the object to update and the object you want to update from.");
if (!e) throw new Error("The object is undefined.");
if (!e[m]) throw new Error("The object you are trying to update was not created by a 'fromJS' or 'fromJSON' mapping.");
return a(e, t, e[m]);
}, ko.mapping.updateFromJSON = function(e, t, o) {
var n = ko.utils.parseJson(t);
return ko.mapping.updateFromJS(e, n, o);
}, ko.mapping.toJS = function(e, t) {
if (y || ko.mapping.resetDefaultOptions(), 0 == arguments.length) throw new Error("When calling ko.mapping.toJS, pass the object you want to convert.");
if (!(y.ignore instanceof Array)) throw new Error("ko.mapping.defaultOptions().ignore should be an array.");
if (!(y.include instanceof Array)) throw new Error("ko.mapping.defaultOptions().include should be an array.");
if (!(y.copy instanceof Array)) throw new Error("ko.mapping.defaultOptions().copy should be an array.");
return t = n(t, e[m]), ko.mapping.visitModel(e, function(e) {
return ko.utils.unwrapObservable(e);
}, t);
}, ko.mapping.toJSON = function(e, t) {
var o = ko.mapping.toJS(e, t);
return ko.utils.stringifyJson(o);
}, ko.mapping.defaultOptions = function() {
return arguments.length > 0 ? (y = arguments[0], void 0) :y;
}, ko.mapping.resetDefaultOptions = function() {
y = {
include:_.include.slice(0),
ignore:_.ignore.slice(0),
copy:_.copy.slice(0)
};
}, ko.mapping.visitModel = function(e, t, r) {
r = r || {}, r.visitedObjects = r.visitedObjects || new g(), r.parentName || (r = n(r));
var i, a = ko.utils.unwrapObservable(e);
if (!p(a)) return t(e, r.parentName);
t(e, r.parentName), i = a instanceof Array ? [] :{}, r.visitedObjects.save(e, i);
var s = r.parentName;
return c(a, function(e) {
if (!r.ignore || -1 == ko.utils.arrayIndexOf(r.ignore, e)) {
var n = a[e];
if (r.parentName = h(s, a, e), -1 !== ko.utils.arrayIndexOf(r.copy, e) || -1 !== ko.utils.arrayIndexOf(r.include, e) || !a[m] || !a[m].mappedProperties || a[m].mappedProperties[e] || a instanceof Array) {
switch (o(ko.utils.unwrapObservable(n))) {
case "object":
case "undefined":
var l = r.visitedObjects.get(n);
i[e] = "undefined" !== o(l) ? l :ko.mapping.visitModel(n, t, r);
break;

default:
i[e] = t(n, r.parentName);
}
}
}
}), i;
}, ko.exportSymbol("ko.mapping", ko.mapping), ko.exportSymbol("ko.mapping.fromJS", ko.mapping.fromJS), 
ko.exportSymbol("ko.mapping.fromJSON", ko.mapping.fromJSON), ko.exportSymbol("ko.mapping.isMapped", ko.mapping.isMapped), 
ko.exportSymbol("ko.mapping.defaultOptions", ko.mapping.defaultOptions), ko.exportSymbol("ko.mapping.toJS", ko.mapping.toJS), 
ko.exportSymbol("ko.mapping.toJSON", ko.mapping.toJSON), ko.exportSymbol("ko.mapping.updateFromJS", ko.mapping.updateFromJS), 
ko.exportSymbol("ko.mapping.updateFromJSON", ko.mapping.updateFromJSON), ko.exportSymbol("ko.mapping.visitModel", ko.mapping.visitModel);
}(), function(e) {
var t = "data-bind";
e.currentlyBindingNamespace = "", e.applyBindings = function(o, n, r) {
n && void 0 !== n.nodeType ? (r = n, n = "") :(n = n || "", r = r || window.document.body), 
e.currentlyBindingNamespace = n;
var i = n.length > 0 ? "-" + n :"", a = t + i, s = e.utils.getElementsHavingAttribute(r, a);
e.utils.arrayForEach(s, function(t) {
e.applyBindingsToNode(t, null, o, a);
}), e.currentlyBindingNamespace = "";
}, e.templateRewriting = function() {
var t = /(<[a-z]+\d*(\s+(?!data-bind(-[a-z0-9\-]*)?=)[a-z0-9\-]+(=(\"[^\"]*\"|\'[^\']*\'))?)*\s+)data-bind(-[a-z0-9\-]*)?=(["'])([\s\S]*?)\7/gi;
return {
ensureTemplateIsRewritten:function(t, o) {
o.isTemplateRewritten(t) || o.rewriteTemplate(t, function(t) {
return e.templateRewriting.memoizeBindingAttributeSyntax(t, o);
});
},
memoizeBindingAttributeSyntax:function(o, n) {
return o.replace(t, function(t) {
var o = arguments[1], r = arguments[8], i = arguments[6] ? arguments[6].slice(1) :"";
if ("" === i || i === e.currentlyBindingNamespace) {
r = e.jsonExpressionRewriting.insertPropertyAccessorsIntoJson(r);
var a = "ko.templateRewriting.applyMemoizedBindingsToNextSibling(function() {                         return (function() { return { " + r + " } })()                     })";
return n.createJavaScriptEvaluatorBlock(a) + o;
}
return t;
});
},
applyMemoizedBindingsToNextSibling:function(t) {
return e.memoization.memoize(function(o, n) {
o.nextSibling && e.applyBindingsToNode(o.nextSibling, t, n);
});
}
};
}();
}(ko), function() {
function e(t, o, n) {
if (t === o) return 0 !== t || 1 / t == 1 / o;
if (null == t || null == o) return t === o;
if (t._chain && (t = t._wrapped), o._chain && (o = o._wrapped), t.isEqual && M.isFunction(t.isEqual)) return t.isEqual(o);
if (o.isEqual && M.isFunction(o.isEqual)) return o.isEqual(t);
var r = u.call(t);
if (r != u.call(o)) return !1;
switch (r) {
case "[object String]":
return t == String(o);

case "[object Number]":
return t != +t ? o != +o :0 == t ? 1 / t == 1 / o :t == +o;

case "[object Date]":
case "[object Boolean]":
return +t == +o;

case "[object RegExp]":
return t.source == o.source && t.global == o.global && t.multiline == o.multiline && t.ignoreCase == o.ignoreCase;
}
if ("object" != typeof t || "object" != typeof o) return !1;
for (var i = n.length; i--; ) if (n[i] == t) return !0;
n.push(t);
var a = 0, s = !0;
if ("[object Array]" == r) {
if (a = t.length, s = a == o.length) for (;a-- && (s = a in t == a in o && e(t[a], o[a], n)); ) ;
} else {
if ("constructor" in t != "constructor" in o || t.constructor != o.constructor) return !1;
for (var l in t) if (M.has(t, l) && (a++, !(s = M.has(o, l) && e(t[l], o[l], n)))) break;
if (s) {
for (l in o) if (M.has(o, l) && !a--) break;
s = !a;
}
}
return n.pop(), s;
}
var t = this, o = t._, n = {}, r = Array.prototype, i = Object.prototype, a = Function.prototype, s = r.slice, l = r.unshift, u = i.toString, d = i.hasOwnProperty, c = r.forEach, p = r.map, h = r.reduce, g = r.reduceRight, m = r.filter, f = r.every, _ = r.some, y = r.indexOf, w = r.lastIndexOf, v = Array.isArray, b = Object.keys, k = a.bind, M = function(e) {
return new E(e);
};
"undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = M), 
exports._ = M) :t._ = M, M.VERSION = "1.3.1";
var L = M.each = M.forEach = function(e, t, o) {
if (null != e) if (c && e.forEach === c) e.forEach(t, o); else if (e.length === +e.length) {
for (var r = 0, i = e.length; i > r; r++) if (r in e && t.call(o, e[r], r, e) === n) return;
} else for (var a in e) if (M.has(e, a) && t.call(o, e[a], a, e) === n) return;
};
M.map = M.collect = function(e, t, o) {
var n = [];
return null == e ? n :p && e.map === p ? e.map(t, o) :(L(e, function(e, r, i) {
n[n.length] = t.call(o, e, r, i);
}), e.length === +e.length && (n.length = e.length), n);
}, M.reduce = M.foldl = M.inject = function(e, t, o, n) {
var r = arguments.length > 2;
if (null == e && (e = []), h && e.reduce === h) return n && (t = M.bind(t, n)), 
r ? e.reduce(t, o) :e.reduce(t);
if (L(e, function(e, i, a) {
r ? o = t.call(n, o, e, i, a) :(o = e, r = !0);
}), !r) throw new TypeError("Reduce of empty array with no initial value");
return o;
}, M.reduceRight = M.foldr = function(e, t, o, n) {
var r = arguments.length > 2;
if (null == e && (e = []), g && e.reduceRight === g) return n && (t = M.bind(t, n)), 
r ? e.reduceRight(t, o) :e.reduceRight(t);
var i = M.toArray(e).reverse();
return n && !r && (t = M.bind(t, n)), r ? M.reduce(i, t, o, n) :M.reduce(i, t);
}, M.find = M.detect = function(e, t, o) {
var n;
return T(e, function(e, r, i) {
return t.call(o, e, r, i) ? (n = e, !0) :void 0;
}), n;
}, M.filter = M.select = function(e, t, o) {
var n = [];
return null == e ? n :m && e.filter === m ? e.filter(t, o) :(L(e, function(e, r, i) {
t.call(o, e, r, i) && (n[n.length] = e);
}), n);
}, M.reject = function(e, t, o) {
var n = [];
return null == e ? n :(L(e, function(e, r, i) {
t.call(o, e, r, i) || (n[n.length] = e);
}), n);
}, M.every = M.all = function(e, t, o) {
var r = !0;
return null == e ? r :f && e.every === f ? e.every(t, o) :(L(e, function(e, i, a) {
return (r = r && t.call(o, e, i, a)) ? void 0 :n;
}), r);
};
var T = M.some = M.any = function(e, t, o) {
t || (t = M.identity);
var r = !1;
return null == e ? r :_ && e.some === _ ? e.some(t, o) :(L(e, function(e, i, a) {
return r || (r = t.call(o, e, i, a)) ? n :void 0;
}), !!r);
};
M.include = M.contains = function(e, t) {
var o = !1;
return null == e ? o :y && e.indexOf === y ? -1 != e.indexOf(t) :o = T(e, function(e) {
return e === t;
});
}, M.invoke = function(e, t) {
var o = s.call(arguments, 2);
return M.map(e, function(e) {
return (M.isFunction(t) ? t || e :e[t]).apply(e, o);
});
}, M.pluck = function(e, t) {
return M.map(e, function(e) {
return e[t];
});
}, M.max = function(e, t, o) {
if (!t && M.isArray(e)) return Math.max.apply(Math, e);
if (!t && M.isEmpty(e)) return -1/0;
var n = {
computed:-1/0
};
return L(e, function(e, r, i) {
var a = t ? t.call(o, e, r, i) :e;
a >= n.computed && (n = {
value:e,
computed:a
});
}), n.value;
}, M.min = function(e, t, o) {
if (!t && M.isArray(e)) return Math.min.apply(Math, e);
if (!t && M.isEmpty(e)) return 1/0;
var n = {
computed:1/0
};
return L(e, function(e, r, i) {
var a = t ? t.call(o, e, r, i) :e;
a < n.computed && (n = {
value:e,
computed:a
});
}), n.value;
}, M.shuffle = function(e) {
var t, o = [];
return L(e, function(e, n) {
0 == n ? o[0] = e :(t = Math.floor(Math.random() * (n + 1)), o[n] = o[t], o[t] = e);
}), o;
}, M.sortBy = function(e, t, o) {
return M.pluck(M.map(e, function(e, n, r) {
return {
value:e,
criteria:t.call(o, e, n, r)
};
}).sort(function(e, t) {
var o = e.criteria, n = t.criteria;
return n > o ? -1 :o > n ? 1 :0;
}), "value");
}, M.groupBy = function(e, t) {
var o = {}, n = M.isFunction(t) ? t :function(e) {
return e[t];
};
return L(e, function(e, t) {
var r = n(e, t);
(o[r] || (o[r] = [])).push(e);
}), o;
}, M.sortedIndex = function(e, t, o) {
o || (o = M.identity);
for (var n = 0, r = e.length; r > n; ) {
var i = n + r >> 1;
o(e[i]) < o(t) ? n = i + 1 :r = i;
}
return n;
}, M.toArray = function(e) {
return e ? e.toArray ? e.toArray() :M.isArray(e) ? s.call(e) :M.isArguments(e) ? s.call(e) :M.values(e) :[];
}, M.size = function(e) {
return M.toArray(e).length;
}, M.first = M.head = function(e, t, o) {
return null == t || o ? e[0] :s.call(e, 0, t);
}, M.initial = function(e, t, o) {
return s.call(e, 0, e.length - (null == t || o ? 1 :t));
}, M.last = function(e, t, o) {
return null == t || o ? e[e.length - 1] :s.call(e, Math.max(e.length - t, 0));
}, M.rest = M.tail = function(e, t, o) {
return s.call(e, null == t || o ? 1 :t);
}, M.compact = function(e) {
return M.filter(e, function(e) {
return !!e;
});
}, M.flatten = function(e, t) {
return M.reduce(e, function(e, o) {
return M.isArray(o) ? e.concat(t ? o :M.flatten(o)) :(e[e.length] = o, e);
}, []);
}, M.without = function(e) {
return M.difference(e, s.call(arguments, 1));
}, M.uniq = M.unique = function(e, t, o) {
var n = o ? M.map(e, o) :e, r = [];
return M.reduce(n, function(o, n, i) {
return 0 != i && (t === !0 ? M.last(o) == n :M.include(o, n)) || (o[o.length] = n, 
r[r.length] = e[i]), o;
}, []), r;
}, M.union = function() {
return M.uniq(M.flatten(arguments, !0));
}, M.intersection = M.intersect = function(e) {
var t = s.call(arguments, 1);
return M.filter(M.uniq(e), function(e) {
return M.every(t, function(t) {
return M.indexOf(t, e) >= 0;
});
});
}, M.difference = function(e) {
var t = M.flatten(s.call(arguments, 1));
return M.filter(e, function(e) {
return !M.include(t, e);
});
}, M.zip = function() {
for (var e = s.call(arguments), t = M.max(M.pluck(e, "length")), o = new Array(t), n = 0; t > n; n++) o[n] = M.pluck(e, "" + n);
return o;
}, M.indexOf = function(e, t, o) {
if (null == e) return -1;
var n, r;
if (o) return n = M.sortedIndex(e, t), e[n] === t ? n :-1;
if (y && e.indexOf === y) return e.indexOf(t);
for (n = 0, r = e.length; r > n; n++) if (n in e && e[n] === t) return n;
return -1;
}, M.lastIndexOf = function(e, t) {
if (null == e) return -1;
if (w && e.lastIndexOf === w) return e.lastIndexOf(t);
for (var o = e.length; o--; ) if (o in e && e[o] === t) return o;
return -1;
}, M.range = function(e, t, o) {
arguments.length <= 1 && (t = e || 0, e = 0), o = arguments[2] || 1;
for (var n = Math.max(Math.ceil((t - e) / o), 0), r = 0, i = new Array(n); n > r; ) i[r++] = e, 
e += o;
return i;
};
var S = function() {};
M.bind = function(e, t) {
var o, n;
if (e.bind === k && k) return k.apply(e, s.call(arguments, 1));
if (!M.isFunction(e)) throw new TypeError();
return n = s.call(arguments, 2), o = function() {
if (!(this instanceof o)) return e.apply(t, n.concat(s.call(arguments)));
S.prototype = e.prototype;
var r = new S(), i = e.apply(r, n.concat(s.call(arguments)));
return Object(i) === i ? i :r;
};
}, M.bindAll = function(e) {
var t = s.call(arguments, 1);
return 0 == t.length && (t = M.functions(e)), L(t, function(t) {
e[t] = M.bind(e[t], e);
}), e;
}, M.memoize = function(e, t) {
var o = {};
return t || (t = M.identity), function() {
var n = t.apply(this, arguments);
return M.has(o, n) ? o[n] :o[n] = e.apply(this, arguments);
};
}, M.delay = function(e, t) {
var o = s.call(arguments, 2);
return setTimeout(function() {
return e.apply(e, o);
}, t);
}, M.defer = function(e) {
return M.delay.apply(M, [ e, 1 ].concat(s.call(arguments, 1)));
}, M.throttle = function(e, t) {
var o, n, r, i, a, s = M.debounce(function() {
a = i = !1;
}, t);
return function() {
o = this, n = arguments;
var l = function() {
r = null, a && e.apply(o, n), s();
};
r || (r = setTimeout(l, t)), i ? a = !0 :e.apply(o, n), s(), i = !0;
};
}, M.debounce = function(e, t) {
var o;
return function() {
var n = this, r = arguments, i = function() {
o = null, e.apply(n, r);
};
clearTimeout(o), o = setTimeout(i, t);
};
}, M.once = function(e) {
var t, o = !1;
return function() {
return o ? t :(o = !0, t = e.apply(this, arguments));
};
}, M.wrap = function(e, t) {
return function() {
var o = [ e ].concat(s.call(arguments, 0));
return t.apply(this, o);
};
}, M.compose = function() {
var e = arguments;
return function() {
for (var t = arguments, o = e.length - 1; o >= 0; o--) t = [ e[o].apply(this, t) ];
return t[0];
};
}, M.after = function(e, t) {
return 0 >= e ? t() :function() {
return --e < 1 ? t.apply(this, arguments) :void 0;
};
}, M.keys = b || function(e) {
if (e !== Object(e)) throw new TypeError("Invalid object");
var t = [];
for (var o in e) M.has(e, o) && (t[t.length] = o);
return t;
}, M.values = function(e) {
return M.map(e, M.identity);
}, M.functions = M.methods = function(e) {
var t = [];
for (var o in e) M.isFunction(e[o]) && t.push(o);
return t.sort();
}, M.extend = function(e) {
return L(s.call(arguments, 1), function(t) {
for (var o in t) e[o] = t[o];
}), e;
}, M.defaults = function(e) {
return L(s.call(arguments, 1), function(t) {
for (var o in t) null == e[o] && (e[o] = t[o]);
}), e;
}, M.clone = function(e) {
return M.isObject(e) ? M.isArray(e) ? e.slice() :M.extend({}, e) :e;
}, M.tap = function(e, t) {
return t(e), e;
}, M.isEqual = function(t, o) {
return e(t, o, []);
}, M.isEmpty = function(e) {
if (M.isArray(e) || M.isString(e)) return 0 === e.length;
for (var t in e) if (M.has(e, t)) return !1;
return !0;
}, M.isElement = function(e) {
return !(!e || 1 != e.nodeType);
}, M.isArray = v || function(e) {
return "[object Array]" == u.call(e);
}, M.isObject = function(e) {
return e === Object(e);
}, M.isArguments = function(e) {
return "[object Arguments]" == u.call(e);
}, M.isArguments(arguments) || (M.isArguments = function(e) {
return !(!e || !M.has(e, "callee"));
}), M.isFunction = function(e) {
return "[object Function]" == u.call(e);
}, M.isString = function(e) {
return "[object String]" == u.call(e);
}, M.isNumber = function(e) {
return "[object Number]" == u.call(e);
}, M.isNaN = function(e) {
return e !== e;
}, M.isBoolean = function(e) {
return e === !0 || e === !1 || "[object Boolean]" == u.call(e);
}, M.isDate = function(e) {
return "[object Date]" == u.call(e);
}, M.isRegExp = function(e) {
return "[object RegExp]" == u.call(e);
}, M.isNull = function(e) {
return null === e;
}, M.isUndefined = function(e) {
return void 0 === e;
}, M.has = function(e, t) {
return d.call(e, t);
}, M.noConflict = function() {
return t._ = o, this;
}, M.identity = function(e) {
return e;
}, M.times = function(e, t, o) {
for (var n = 0; e > n; n++) t.call(o, n);
}, M.escape = function(e) {
return ("" + e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;");
}, M.mixin = function(e) {
L(M.functions(e), function(t) {
$(t, M[t] = e[t]);
});
};
var D = 0;
M.uniqueId = function(e) {
var t = D++;
return e ? e + t :t;
}, M.templateSettings = {
evaluate:/<%([\s\S]+?)%>/g,
interpolate:/<%=([\s\S]+?)%>/g,
escape:/<%-([\s\S]+?)%>/g
};
var Y = /.^/, x = function(e) {
return e.replace(/\\\\/g, "\\").replace(/\\'/g, "'");
};
M.template = function(e, t) {
var o = M.templateSettings, n = "var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('" + e.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(o.escape || Y, function(e, t) {
return "',_.escape(" + x(t) + "),'";
}).replace(o.interpolate || Y, function(e, t) {
return "'," + x(t) + ",'";
}).replace(o.evaluate || Y, function(e, t) {
return "');" + x(t).replace(/[\r\n\t]/g, " ") + ";__p.push('";
}).replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/\t/g, "\\t") + "');}return __p.join('');", r = new Function("obj", "_", n);
return t ? r(t, M) :function(e) {
return r.call(this, e, M);
};
}, M.chain = function(e) {
return M(e).chain();
};
var E = function(e) {
this._wrapped = e;
};
M.prototype = E.prototype;
var C = function(e, t) {
return t ? M(e).chain() :e;
}, $ = function(e, t) {
E.prototype[e] = function() {
var e = s.call(arguments);
return l.call(e, this._wrapped), C(t.apply(M, e), this._chain);
};
};
M.mixin(M), L([ "pop", "push", "reverse", "shift", "sort", "splice", "unshift" ], function(e) {
var t = r[e];
E.prototype[e] = function() {
var o = this._wrapped;
t.apply(o, arguments);
var n = o.length;
return "shift" != e && "splice" != e || 0 !== n || delete o[0], C(o, this._chain);
};
}), L([ "concat", "join", "slice" ], function(e) {
var t = r[e];
E.prototype[e] = function() {
return C(t.apply(this._wrapped, arguments), this._chain);
};
}), E.prototype.chain = function() {
return this._chain = !0, this;
}, E.prototype.value = function() {
return this._wrapped;
};
}.call(this), /*!
 * fancyBox - jQuery Plugin
 * version: 2.1.5 (Fri, 14 Jun 2013)
 * @requires jQuery v1.6 or later
 *
 * Examples at http://fancyapps.com/fancybox/
 * License: www.fancyapps.com/fancybox/#license
 *
 * Copyright 2012 Janis Skarnelis - janis@fancyapps.com
 *
 */
function(e, t, o, n) {
"use strict";
var r = o("html"), i = o(e), a = o(t), s = o.fancybox = function() {
s.open.apply(this, arguments);
}, l = navigator.userAgent.match(/msie/i), u = null, d = t.createTouch !== n, c = function(e) {
return e && e.hasOwnProperty && e instanceof o;
}, p = function(e) {
return e && "string" === o.type(e);
}, h = function(e) {
return p(e) && e.indexOf("%") > 0;
}, g = function(e) {
return e && !(e.style.overflow && "hidden" === e.style.overflow) && (e.clientWidth && e.scrollWidth > e.clientWidth || e.clientHeight && e.scrollHeight > e.clientHeight);
}, m = function(e, t) {
var o = parseInt(e, 10) || 0;
return t && h(e) && (o = s.getViewport()[t] / 100 * o), Math.ceil(o);
}, f = function(e, t) {
return m(e, t) + "px";
};
o.extend(s, {
version:"2.1.5",
defaults:{
padding:15,
margin:20,
width:800,
height:600,
minWidth:100,
minHeight:100,
maxWidth:9999,
maxHeight:9999,
pixelRatio:1,
autoSize:!0,
autoHeight:!1,
autoWidth:!1,
autoResize:!0,
autoCenter:!d,
fitToView:!0,
aspectRatio:!1,
topRatio:.5,
leftRatio:.5,
scrolling:"auto",
wrapCSS:"",
arrows:!0,
closeBtn:!0,
closeClick:!1,
nextClick:!1,
mouseWheel:!0,
autoPlay:!1,
playSpeed:3e3,
preload:3,
modal:!1,
loop:!0,
ajax:{
dataType:"html",
headers:{
"X-fancyBox":!0
}
},
iframe:{
scrolling:"auto",
preload:!0
},
swf:{
wmode:"transparent",
allowfullscreen:"true",
allowscriptaccess:"always"
},
keys:{
next:{
13:"left",
34:"up",
39:"left",
40:"up"
},
prev:{
8:"right",
33:"down",
37:"right",
38:"down"
},
close:[ 27 ],
play:[ 32 ],
toggle:[ 70 ]
},
direction:{
next:"left",
prev:"right"
},
scrollOutside:!0,
index:0,
type:null,
href:null,
content:null,
title:null,
tpl:{
wrap:'<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
image:'<img class="fancybox-image" src="{href}" alt="" />',
iframe:'<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (l ? ' allowtransparency="true"' :"") + "></iframe>",
error:'<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
closeBtn:'<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
next:'<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
prev:'<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
},
openEffect:"fade",
openSpeed:250,
openEasing:"swing",
openOpacity:!0,
openMethod:"zoomIn",
closeEffect:"fade",
closeSpeed:250,
closeEasing:"swing",
closeOpacity:!0,
closeMethod:"zoomOut",
nextEffect:"elastic",
nextSpeed:250,
nextEasing:"swing",
nextMethod:"changeIn",
prevEffect:"elastic",
prevSpeed:250,
prevEasing:"swing",
prevMethod:"changeOut",
helpers:{
overlay:!0,
title:!0
},
onCancel:o.noop,
beforeLoad:o.noop,
afterLoad:o.noop,
beforeShow:o.noop,
afterShow:o.noop,
beforeChange:o.noop,
beforeClose:o.noop,
afterClose:o.noop
},
group:{},
opts:{},
previous:null,
coming:null,
current:null,
isActive:!1,
isOpen:!1,
isOpened:!1,
wrap:null,
skin:null,
outer:null,
inner:null,
player:{
timer:null,
isActive:!1
},
ajaxLoad:null,
imgPreload:null,
transitions:{},
helpers:{},
open:function(e, t) {
return e && (o.isPlainObject(t) || (t = {}), !1 !== s.close(!0)) ? (o.isArray(e) || (e = c(e) ? o(e).get() :[ e ]), 
o.each(e, function(r, i) {
var a, l, u, d, h, g, m, f = {};
"object" === o.type(i) && (i.nodeType && (i = o(i)), c(i) ? (f = {
href:i.data("fancybox-href") || i.attr("href"),
title:i.data("fancybox-title") || i.attr("title"),
isDom:!0,
element:i
}, o.metadata && o.extend(!0, f, i.metadata())) :f = i), a = t.href || f.href || (p(i) ? i :null), 
l = t.title !== n ? t.title :f.title || "", u = t.content || f.content, d = u ? "html" :t.type || f.type, 
!d && f.isDom && (d = i.data("fancybox-type"), d || (h = i.prop("class").match(/fancybox\.(\w+)/), 
d = h ? h[1] :null)), p(a) && (d || (s.isImage(a) ? d = "image" :s.isSWF(a) ? d = "swf" :"#" === a.charAt(0) ? d = "inline" :p(i) && (d = "html", 
u = i)), "ajax" === d && (g = a.split(/\s+/, 2), a = g.shift(), m = g.shift())), 
u || ("inline" === d ? a ? u = o(p(a) ? a.replace(/.*(?=#[^\s]+$)/, "") :a) :f.isDom && (u = i) :"html" === d ? u = a :d || a || !f.isDom || (d = "inline", 
u = i)), o.extend(f, {
href:a,
type:d,
content:u,
title:l,
selector:m
}), e[r] = f;
}), s.opts = o.extend(!0, {}, s.defaults, t), t.keys !== n && (s.opts.keys = t.keys ? o.extend({}, s.defaults.keys, t.keys) :!1), 
s.group = e, s._start(s.opts.index)) :void 0;
},
cancel:function() {
var e = s.coming;
e && !1 !== s.trigger("onCancel") && (s.hideLoading(), s.ajaxLoad && s.ajaxLoad.abort(), 
s.ajaxLoad = null, s.imgPreload && (s.imgPreload.onload = s.imgPreload.onerror = null), 
e.wrap && e.wrap.stop(!0, !0).trigger("onReset").remove(), s.coming = null, s.current || s._afterZoomOut(e));
},
close:function(e) {
s.cancel(), !1 !== s.trigger("beforeClose") && (s.unbindEvents(), s.isActive && (s.isOpen && e !== !0 ? (s.isOpen = s.isOpened = !1, 
s.isClosing = !0, o(".fancybox-item, .fancybox-nav").remove(), s.wrap.stop(!0, !0).removeClass("fancybox-opened"), 
s.transitions[s.current.closeMethod]()) :(o(".fancybox-wrap").stop(!0).trigger("onReset").remove(), 
s._afterZoomOut())));
},
play:function(e) {
var t = function() {
clearTimeout(s.player.timer);
}, o = function() {
t(), s.current && s.player.isActive && (s.player.timer = setTimeout(s.next, s.current.playSpeed));
}, n = function() {
t(), a.unbind(".player"), s.player.isActive = !1, s.trigger("onPlayEnd");
}, r = function() {
s.current && (s.current.loop || s.current.index < s.group.length - 1) && (s.player.isActive = !0, 
a.bind({
"onCancel.player beforeClose.player":n,
"onUpdate.player":o,
"beforeLoad.player":t
}), o(), s.trigger("onPlayStart"));
};
e === !0 || !s.player.isActive && e !== !1 ? r() :n();
},
next:function(e) {
var t = s.current;
t && (p(e) || (e = t.direction.next), s.jumpto(t.index + 1, e, "next"));
},
prev:function(e) {
var t = s.current;
t && (p(e) || (e = t.direction.prev), s.jumpto(t.index - 1, e, "prev"));
},
jumpto:function(e, t, o) {
var r = s.current;
r && (e = m(e), s.direction = t || r.direction[e >= r.index ? "next" :"prev"], s.router = o || "jumpto", 
r.loop && (0 > e && (e = r.group.length + e % r.group.length), e %= r.group.length), 
r.group[e] !== n && (s.cancel(), s._start(e)));
},
reposition:function(e, t) {
var n, r = s.current, i = r ? r.wrap :null;
i && (n = s._getPosition(t), e && "scroll" === e.type ? (delete n.position, i.stop(!0, !0).animate(n, 200)) :(i.css(n), 
r.pos = o.extend({}, r.dim, n)));
},
update:function(e) {
var t = e && e.type, o = !t || "orientationchange" === t;
o && (clearTimeout(u), u = null), s.isOpen && !u && (u = setTimeout(function() {
var n = s.current;
n && !s.isClosing && (s.wrap.removeClass("fancybox-tmp"), (o || "load" === t || "resize" === t && n.autoResize) && s._setDimension(), 
"scroll" === t && n.canShrink || s.reposition(e), s.trigger("onUpdate"), u = null);
}, o && !d ? 0 :300));
},
toggle:function(e) {
s.isOpen && (s.current.fitToView = "boolean" === o.type(e) ? e :!s.current.fitToView, 
d && (s.wrap.removeAttr("style").addClass("fancybox-tmp"), s.trigger("onUpdate")), 
s.update());
},
hideLoading:function() {
a.unbind(".loading"), o("#fancybox-loading").remove();
},
showLoading:function() {
var e, t;
s.hideLoading(), e = o('<div id="fancybox-loading"><div></div></div>').click(s.cancel).appendTo("body"), 
a.bind("keydown.loading", function(e) {
27 === (e.which || e.keyCode) && (e.preventDefault(), s.cancel());
}), s.defaults.fixed || (t = s.getViewport(), e.css({
position:"absolute",
top:.5 * t.h + t.y,
left:.5 * t.w + t.x
}));
},
getViewport:function() {
var t = s.current && s.current.locked || !1, o = {
x:i.scrollLeft(),
y:i.scrollTop()
};
return t ? (o.w = t[0].clientWidth, o.h = t[0].clientHeight) :(o.w = d && e.innerWidth ? e.innerWidth :i.width(), 
o.h = d && e.innerHeight ? e.innerHeight :i.height()), o;
},
unbindEvents:function() {
s.wrap && c(s.wrap) && s.wrap.unbind(".fb"), a.unbind(".fb"), i.unbind(".fb");
},
bindEvents:function() {
var e, t = s.current;
t && (i.bind("orientationchange.fb" + (d ? "" :" resize.fb") + (t.autoCenter && !t.locked ? " scroll.fb" :""), s.update), 
e = t.keys, e && a.bind("keydown.fb", function(r) {
var i = r.which || r.keyCode, a = r.target || r.srcElement;
return 27 === i && s.coming ? !1 :(r.ctrlKey || r.altKey || r.shiftKey || r.metaKey || a && (a.type || o(a).is("[contenteditable]")) || o.each(e, function(e, a) {
return t.group.length > 1 && a[i] !== n ? (s[e](a[i]), r.preventDefault(), !1) :o.inArray(i, a) > -1 ? (s[e](), 
r.preventDefault(), !1) :void 0;
}), void 0);
}), o.fn.mousewheel && t.mouseWheel && s.wrap.bind("mousewheel.fb", function(e, n, r, i) {
for (var a = e.target || null, l = o(a), u = !1; l.length && !(u || l.is(".fancybox-skin") || l.is(".fancybox-wrap")); ) u = g(l[0]), 
l = o(l).parent();
0 === n || u || s.group.length > 1 && !t.canShrink && (i > 0 || r > 0 ? s.prev(i > 0 ? "down" :"left") :(0 > i || 0 > r) && s.next(0 > i ? "up" :"right"), 
e.preventDefault());
}));
},
trigger:function(e, t) {
var n, r = t || s.coming || s.current;
if (r) {
if (o.isFunction(r[e]) && (n = r[e].apply(r, Array.prototype.slice.call(arguments, 1))), 
n === !1) return !1;
r.helpers && o.each(r.helpers, function(t, n) {
n && s.helpers[t] && o.isFunction(s.helpers[t][e]) && s.helpers[t][e](o.extend(!0, {}, s.helpers[t].defaults, n), r);
}), a.trigger(e);
}
},
isImage:function(e) {
return p(e) && e.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i);
},
isSWF:function(e) {
return p(e) && e.match(/\.(swf)((\?|#).*)?$/i);
},
_start:function(e) {
var t, n, r, i, a, l = {};
if (e = m(e), t = s.group[e] || null, !t) return !1;
if (l = o.extend(!0, {}, s.opts, t), i = l.margin, a = l.padding, "number" === o.type(i) && (l.margin = [ i, i, i, i ]), 
"number" === o.type(a) && (l.padding = [ a, a, a, a ]), l.modal && o.extend(!0, l, {
closeBtn:!1,
closeClick:!1,
nextClick:!1,
arrows:!1,
mouseWheel:!1,
keys:null,
helpers:{
overlay:{
closeClick:!1
}
}
}), l.autoSize && (l.autoWidth = l.autoHeight = !0), "auto" === l.width && (l.autoWidth = !0), 
"auto" === l.height && (l.autoHeight = !0), l.group = s.group, l.index = e, s.coming = l, 
!1 === s.trigger("beforeLoad")) return s.coming = null, void 0;
if (r = l.type, n = l.href, !r) return s.coming = null, s.current && s.router && "jumpto" !== s.router ? (s.current.index = e, 
s[s.router](s.direction)) :!1;
if (s.isActive = !0, ("image" === r || "swf" === r) && (l.autoHeight = l.autoWidth = !1, 
l.scrolling = "visible"), "image" === r && (l.aspectRatio = !0), "iframe" === r && d && (l.scrolling = "scroll"), 
l.wrap = o(l.tpl.wrap).addClass("fancybox-" + (d ? "mobile" :"desktop") + " fancybox-type-" + r + " fancybox-tmp " + l.wrapCSS).appendTo(l.parent || "body"), 
o.extend(l, {
skin:o(".fancybox-skin", l.wrap),
outer:o(".fancybox-outer", l.wrap),
inner:o(".fancybox-inner", l.wrap)
}), o.each([ "Top", "Right", "Bottom", "Left" ], function(e, t) {
l.skin.css("padding" + t, f(l.padding[e]));
}), s.trigger("onReady"), "inline" === r || "html" === r) {
if (!l.content || !l.content.length) return s._error("content");
} else if (!n) return s._error("href");
"image" === r ? s._loadImage() :"ajax" === r ? s._loadAjax() :"iframe" === r ? s._loadIframe() :s._afterLoad();
},
_error:function(e) {
o.extend(s.coming, {
type:"html",
autoWidth:!0,
autoHeight:!0,
minWidth:0,
minHeight:0,
scrolling:"no",
hasError:e,
content:s.coming.tpl.error
}), s._afterLoad();
},
_loadImage:function() {
var e = s.imgPreload = new Image();
e.onload = function() {
this.onload = this.onerror = null, s.coming.width = this.width / s.opts.pixelRatio, 
s.coming.height = this.height / s.opts.pixelRatio, s._afterLoad();
}, e.onerror = function() {
this.onload = this.onerror = null, s._error("image");
}, e.src = s.coming.href, e.complete !== !0 && s.showLoading();
},
_loadAjax:function() {
var e = s.coming;
s.showLoading(), s.ajaxLoad = o.ajax(o.extend({}, e.ajax, {
url:e.href,
error:function(e, t) {
s.coming && "abort" !== t ? s._error("ajax", e) :s.hideLoading();
},
success:function(t, o) {
"success" === o && (e.content = t, s._afterLoad());
}
}));
},
_loadIframe:function() {
var e = s.coming, t = o(e.tpl.iframe.replace(/\{rnd\}/g, new Date().getTime())).attr("scrolling", d ? "auto" :e.iframe.scrolling).attr("src", e.href);
o(e.wrap).bind("onReset", function() {
try {
o(this).find("iframe").hide().attr("src", "//about:blank").end().empty();
} catch (e) {}
}), e.iframe.preload && (s.showLoading(), t.one("load", function() {
o(this).data("ready", 1), d || o(this).bind("load.fb", s.update), o(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show(), 
s._afterLoad();
})), e.content = t.appendTo(e.inner), e.iframe.preload || s._afterLoad();
},
_preloadImages:function() {
var e, t, o = s.group, n = s.current, r = o.length, i = n.preload ? Math.min(n.preload, r - 1) :0;
for (t = 1; i >= t; t += 1) e = o[(n.index + t) % r], "image" === e.type && e.href && (new Image().src = e.href);
},
_afterLoad:function() {
var e, t, n, r, i, a, l = s.coming, u = s.current, d = "fancybox-placeholder";
if (s.hideLoading(), l && s.isActive !== !1) {
if (!1 === s.trigger("afterLoad", l, u)) return l.wrap.stop(!0).trigger("onReset").remove(), 
s.coming = null, void 0;
switch (u && (s.trigger("beforeChange", u), u.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove()), 
s.unbindEvents(), e = l, t = l.content, n = l.type, r = l.scrolling, o.extend(s, {
wrap:e.wrap,
skin:e.skin,
outer:e.outer,
inner:e.inner,
current:e,
previous:u
}), i = e.href, n) {
case "inline":
case "ajax":
case "html":
e.selector ? t = o("<div>").html(t).find(e.selector) :c(t) && (t.data(d) || t.data(d, o('<div class="' + d + '"></div>').insertAfter(t).hide()), 
t = t.show().detach(), e.wrap.bind("onReset", function() {
o(this).find(t).length && t.hide().replaceAll(t.data(d)).data(d, !1);
}));
break;

case "image":
t = e.tpl.image.replace("{href}", i);
break;

case "swf":
t = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + i + '"></param>', 
a = "", o.each(e.swf, function(e, o) {
t += '<param name="' + e + '" value="' + o + '"></param>', a += " " + e + '="' + o + '"';
}), t += '<embed src="' + i + '" type="application/x-shockwave-flash" width="100%" height="100%"' + a + "></embed></object>";
}
c(t) && t.parent().is(e.inner) || e.inner.append(t), s.trigger("beforeShow"), e.inner.css("overflow", "yes" === r ? "scroll" :"no" === r ? "hidden" :r), 
s._setDimension(), s.reposition(), s.isOpen = !1, s.coming = null, s.bindEvents(), 
s.isOpened ? u.prevMethod && s.transitions[u.prevMethod]() :o(".fancybox-wrap").not(e.wrap).stop(!0).trigger("onReset").remove(), 
s.transitions[s.isOpened ? e.nextMethod :e.openMethod](), s._preloadImages();
}
},
_setDimension:function() {
var e, t, n, r, i, a, l, u, d, c, p, g, _, y, w, v = s.getViewport(), b = 0, k = !1, M = !1, L = s.wrap, T = s.skin, S = s.inner, D = s.current, Y = D.width, x = D.height, E = D.minWidth, C = D.minHeight, $ = D.maxWidth, I = D.maxHeight, O = D.scrolling, j = D.scrollOutside ? D.scrollbarWidth :0, A = D.margin, B = m(A[1] + A[3]), H = m(A[0] + A[2]);
if (L.add(T).add(S).width("auto").height("auto").removeClass("fancybox-tmp"), e = m(T.outerWidth(!0) - T.width()), 
t = m(T.outerHeight(!0) - T.height()), n = B + e, r = H + t, i = h(Y) ? (v.w - n) * m(Y) / 100 :Y, 
a = h(x) ? (v.h - r) * m(x) / 100 :x, "iframe" === D.type) {
if (y = D.content, D.autoHeight && 1 === y.data("ready")) try {
y[0].contentWindow.document.location && (S.width(i).height(9999), w = y.contents().find("body"), 
j && w.css("overflow-x", "hidden"), a = w.outerHeight(!0));
} catch (N) {}
} else (D.autoWidth || D.autoHeight) && (S.addClass("fancybox-tmp"), D.autoWidth || S.width(i), 
D.autoHeight || S.height(a), D.autoWidth && (i = S.width()), D.autoHeight && (a = S.height()), 
S.removeClass("fancybox-tmp"));
if (Y = m(i), x = m(a), d = i / a, E = m(h(E) ? m(E, "w") - n :E), $ = m(h($) ? m($, "w") - n :$), 
C = m(h(C) ? m(C, "h") - r :C), I = m(h(I) ? m(I, "h") - r :I), l = $, u = I, D.fitToView && ($ = Math.min(v.w - n, $), 
I = Math.min(v.h - r, I)), g = v.w - B, _ = v.h - H, D.aspectRatio ? (Y > $ && (Y = $, 
x = m(Y / d)), x > I && (x = I, Y = m(x * d)), E > Y && (Y = E, x = m(Y / d)), C > x && (x = C, 
Y = m(x * d))) :(Y = Math.max(E, Math.min(Y, $)), D.autoHeight && "iframe" !== D.type && (S.width(Y), 
x = S.height()), x = Math.max(C, Math.min(x, I))), D.fitToView) if (S.width(Y).height(x), 
L.width(Y + e), c = L.width(), p = L.height(), D.aspectRatio) for (;(c > g || p > _) && Y > E && x > C && !(b++ > 19); ) x = Math.max(C, Math.min(I, x - 10)), 
Y = m(x * d), E > Y && (Y = E, x = m(Y / d)), Y > $ && (Y = $, x = m(Y / d)), S.width(Y).height(x), 
L.width(Y + e), c = L.width(), p = L.height(); else Y = Math.max(E, Math.min(Y, Y - (c - g))), 
x = Math.max(C, Math.min(x, x - (p - _)));
j && "auto" === O && a > x && g > Y + e + j && (Y += j), S.width(Y).height(x), L.width(Y + e), 
c = L.width(), p = L.height(), k = (c > g || p > _) && Y > E && x > C, M = D.aspectRatio ? l > Y && u > x && i > Y && a > x :(l > Y || u > x) && (i > Y || a > x), 
o.extend(D, {
dim:{
width:f(c),
height:f(p)
},
origWidth:i,
origHeight:a,
canShrink:k,
canExpand:M,
wPadding:e,
hPadding:t,
wrapSpace:p - T.outerHeight(!0),
skinSpace:T.height() - x
}), !y && D.autoHeight && x > C && I > x && !M && S.height("auto");
},
_getPosition:function(e) {
var t = s.current, o = s.getViewport(), n = t.margin, r = s.wrap.width() + n[1] + n[3], i = s.wrap.height() + n[0] + n[2], a = {
position:"absolute",
top:n[0],
left:n[3]
};
return t.autoCenter && t.fixed && !e && i <= o.h && r <= o.w ? a.position = "fixed" :t.locked || (a.top += o.y, 
a.left += o.x), a.top = f(Math.max(a.top, a.top + (o.h - i) * t.topRatio)), a.left = f(Math.max(a.left, a.left + (o.w - r) * t.leftRatio)), 
a;
},
_afterZoomIn:function() {
var e = s.current;
e && (s.isOpen = s.isOpened = !0, s.wrap.css("overflow", "visible").addClass("fancybox-opened"), 
s.update(), (e.closeClick || e.nextClick && s.group.length > 1) && s.inner.css("cursor", "pointer").bind("click.fb", function(t) {
o(t.target).is("a") || o(t.target).parent().is("a") || (t.preventDefault(), s[e.closeClick ? "close" :"next"]());
}), e.closeBtn && o(e.tpl.closeBtn).appendTo(s.skin).bind("click.fb", function(e) {
e.preventDefault(), s.close();
}), e.arrows && s.group.length > 1 && ((e.loop || e.index > 0) && o(e.tpl.prev).appendTo(s.outer).bind("click.fb", s.prev), 
(e.loop || e.index < s.group.length - 1) && o(e.tpl.next).appendTo(s.outer).bind("click.fb", s.next)), 
s.trigger("afterShow"), e.loop || e.index !== e.group.length - 1 ? s.opts.autoPlay && !s.player.isActive && (s.opts.autoPlay = !1, 
s.play()) :s.play(!1));
},
_afterZoomOut:function(e) {
e = e || s.current, o(".fancybox-wrap").trigger("onReset").remove(), o.extend(s, {
group:{},
opts:{},
router:!1,
current:null,
isActive:!1,
isOpened:!1,
isOpen:!1,
isClosing:!1,
wrap:null,
skin:null,
outer:null,
inner:null
}), s.trigger("afterClose", e);
}
}), s.transitions = {
getOrigPosition:function() {
var e = s.current, t = e.element, o = e.orig, n = {}, r = 50, i = 50, a = e.hPadding, l = e.wPadding, u = s.getViewport();
return !o && e.isDom && t.is(":visible") && (o = t.find("img:first"), o.length || (o = t)), 
c(o) ? (n = o.offset(), o.is("img") && (r = o.outerWidth(), i = o.outerHeight())) :(n.top = u.y + (u.h - i) * e.topRatio, 
n.left = u.x + (u.w - r) * e.leftRatio), ("fixed" === s.wrap.css("position") || e.locked) && (n.top -= u.y, 
n.left -= u.x), n = {
top:f(n.top - a * e.topRatio),
left:f(n.left - l * e.leftRatio),
width:f(r + l),
height:f(i + a)
};
},
step:function(e, t) {
var o, n, r, i = t.prop, a = s.current, l = a.wrapSpace, u = a.skinSpace;
("width" === i || "height" === i) && (o = t.end === t.start ? 1 :(e - t.start) / (t.end - t.start), 
s.isClosing && (o = 1 - o), n = "width" === i ? a.wPadding :a.hPadding, r = e - n, 
s.skin[i](m("width" === i ? r :r - l * o)), s.inner[i](m("width" === i ? r :r - l * o - u * o)));
},
zoomIn:function() {
var e = s.current, t = e.pos, n = e.openEffect, r = "elastic" === n, i = o.extend({
opacity:1
}, t);
delete i.position, r ? (t = this.getOrigPosition(), e.openOpacity && (t.opacity = .1)) :"fade" === n && (t.opacity = .1), 
s.wrap.css(t).animate(i, {
duration:"none" === n ? 0 :e.openSpeed,
easing:e.openEasing,
step:r ? this.step :null,
complete:s._afterZoomIn
});
},
zoomOut:function() {
var e = s.current, t = e.closeEffect, o = "elastic" === t, n = {
opacity:.1
};
o && (n = this.getOrigPosition(), e.closeOpacity && (n.opacity = .1)), s.wrap.animate(n, {
duration:"none" === t ? 0 :e.closeSpeed,
easing:e.closeEasing,
step:o ? this.step :null,
complete:s._afterZoomOut
});
},
changeIn:function() {
var e, t = s.current, o = t.nextEffect, n = t.pos, r = {
opacity:1
}, i = s.direction, a = 200;
n.opacity = .1, "elastic" === o && (e = "down" === i || "up" === i ? "top" :"left", 
"down" === i || "right" === i ? (n[e] = f(m(n[e]) - a), r[e] = "+=" + a + "px") :(n[e] = f(m(n[e]) + a), 
r[e] = "-=" + a + "px")), "none" === o ? s._afterZoomIn() :s.wrap.css(n).animate(r, {
duration:t.nextSpeed,
easing:t.nextEasing,
complete:s._afterZoomIn
});
},
changeOut:function() {
var e = s.previous, t = e.prevEffect, n = {
opacity:.1
}, r = s.direction, i = 200;
"elastic" === t && (n["down" === r || "up" === r ? "top" :"left"] = ("up" === r || "left" === r ? "-" :"+") + "=" + i + "px"), 
e.wrap.animate(n, {
duration:"none" === t ? 0 :e.prevSpeed,
easing:e.prevEasing,
complete:function() {
o(this).trigger("onReset").remove();
}
});
}
}, s.helpers.overlay = {
defaults:{
closeClick:!0,
speedOut:200,
showEarly:!0,
css:{},
locked:!d,
fixed:!0
},
overlay:null,
fixed:!1,
el:o("html"),
create:function(e) {
e = o.extend({}, this.defaults, e), this.overlay && this.close(), this.overlay = o('<div class="fancybox-overlay"></div>').appendTo(s.coming ? s.coming.parent :e.parent), 
this.fixed = !1, e.fixed && s.defaults.fixed && (this.overlay.addClass("fancybox-overlay-fixed"), 
this.fixed = !0);
},
open:function(e) {
var t = this;
e = o.extend({}, this.defaults, e), this.overlay ? this.overlay.unbind(".overlay").width("auto").height("auto") :this.create(e), 
this.fixed || (i.bind("resize.overlay", o.proxy(this.update, this)), this.update()), 
e.closeClick && this.overlay.bind("click.overlay", function(e) {
return o(e.target).hasClass("fancybox-overlay") ? (s.isActive ? s.close() :t.close(), 
!1) :void 0;
}), this.overlay.css(e.css).show();
},
close:function() {
var e, t;
i.unbind("resize.overlay"), this.el.hasClass("fancybox-lock") && (o(".fancybox-margin").removeClass("fancybox-margin"), 
e = i.scrollTop(), t = i.scrollLeft(), this.el.removeClass("fancybox-lock"), i.scrollTop(e).scrollLeft(t)), 
o(".fancybox-overlay").remove().hide(), o.extend(this, {
overlay:null,
fixed:!1
});
},
update:function() {
var e, o = "100%";
this.overlay.width(o).height("100%"), l ? (e = Math.max(t.documentElement.offsetWidth, t.body.offsetWidth), 
a.width() > e && (o = a.width())) :a.width() > i.width() && (o = a.width()), this.overlay.width(o).height(a.height());
},
onReady:function(e, t) {
var n = this.overlay;
o(".fancybox-overlay").stop(!0, !0), n || this.create(e), e.locked && this.fixed && t.fixed && (n || (this.margin = a.height() > i.height() ? o("html").css("margin-right").replace("px", "") :!1), 
t.locked = this.overlay.append(t.wrap), t.fixed = !1), e.showEarly === !0 && this.beforeShow.apply(this, arguments);
},
beforeShow:function(e, t) {
var n, r;
t.locked && (this.margin !== !1 && (o("*").filter(function() {
return "fixed" === o(this).css("position") && !o(this).hasClass("fancybox-overlay") && !o(this).hasClass("fancybox-wrap");
}).addClass("fancybox-margin"), this.el.addClass("fancybox-margin")), n = i.scrollTop(), 
r = i.scrollLeft(), this.el.addClass("fancybox-lock"), i.scrollTop(n).scrollLeft(r)), 
this.open(e);
},
onUpdate:function() {
this.fixed || this.update();
},
afterClose:function(e) {
this.overlay && !s.coming && this.overlay.fadeOut(e.speedOut, o.proxy(this.close, this));
}
}, s.helpers.title = {
defaults:{
type:"float",
position:"bottom"
},
beforeShow:function(e) {
var t, n, r = s.current, i = r.title, a = e.type;
if (o.isFunction(i) && (i = i.call(r.element, r)), p(i) && "" !== o.trim(i)) {
switch (t = o('<div class="fancybox-title fancybox-title-' + a + '-wrap">' + i + "</div>"), 
a) {
case "inside":
n = s.skin;
break;

case "outside":
n = s.wrap;
break;

case "over":
n = s.inner;
break;

default:
n = s.skin, t.appendTo("body"), l && t.width(t.width()), t.wrapInner('<span class="child"></span>'), 
s.current.margin[2] += Math.abs(m(t.css("margin-bottom")));
}
t["top" === e.position ? "prependTo" :"appendTo"](n);
}
}
}, o.fn.fancybox = function(e) {
var t, n = o(this), r = this.selector || "", i = function(i) {
var a, l, u = o(this).blur(), d = t;
i.ctrlKey || i.altKey || i.shiftKey || i.metaKey || u.is(".fancybox-wrap") || (a = e.groupAttr || "data-fancybox-group", 
l = u.attr(a), l || (a = "rel", l = u.get(0)[a]), l && "" !== l && "nofollow" !== l && (u = r.length ? o(r) :n, 
u = u.filter("[" + a + '="' + l + '"]'), d = u.index(this)), e.index = d, s.open(u, e) !== !1 && i.preventDefault());
};
return e = e || {}, t = e.index || 0, r && e.live !== !1 ? a.undelegate(r, "click.fb-start").delegate(r + ":not('.fancybox-item, .fancybox-nav')", "click.fb-start", i) :n.unbind("click.fb-start").bind("click.fb-start", i), 
this.filter("[data-fancybox-start=1]").trigger("click"), this;
}, a.ready(function() {
var t, i;
o.scrollbarWidth === n && (o.scrollbarWidth = function() {
var e = o('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"), t = e.children(), n = t.innerWidth() - t.height(99).innerWidth();
return e.remove(), n;
}), o.support.fixedPosition === n && (o.support.fixedPosition = function() {
var e = o('<div style="position:fixed;top:20px;"></div>').appendTo("body"), t = 20 === e[0].offsetTop || 15 === e[0].offsetTop;
return e.remove(), t;
}()), o.extend(s.defaults, {
scrollbarWidth:o.scrollbarWidth(),
fixed:o.support.fixedPosition,
parent:o("body")
}), t = o(e).width(), r.addClass("fancybox-lock-test"), i = o(e).width(), r.removeClass("fancybox-lock-test"), 
o("<style type='text/css'>.fancybox-margin{margin-right:" + (i - t) + "px;}</style>").appendTo("head");
});
}(window, document, jQuery), function(e) {
var t = e.fancybox;
t.helpers.buttons = {
defaults:{
skipSingle:!1,
position:"top",
tpl:'<div id="fancybox-buttons"><ul><li><a class="btnPrev" title="Previous" href="javascript:;"></a></li><li><a class="btnPlay" title="Start slideshow" href="javascript:;"></a></li><li><a class="btnNext" title="Next" href="javascript:;"></a></li><li><a class="btnToggle" title="Toggle size" href="javascript:;"></a></li><li><a class="btnClose" title="Close" href="javascript:;"></a></li></ul></div>'
},
list:null,
buttons:null,
beforeLoad:function(e, t) {
return e.skipSingle && t.group.length < 2 ? (t.helpers.buttons = !1, t.closeBtn = !0, 
void 0) :(t.margin["bottom" === e.position ? 2 :0] += 30, void 0);
},
onPlayStart:function() {
this.buttons && this.buttons.play.attr("title", "Pause slideshow").addClass("btnPlayOn");
},
onPlayEnd:function() {
this.buttons && this.buttons.play.attr("title", "Start slideshow").removeClass("btnPlayOn");
},
afterShow:function(o, n) {
var r = this.buttons;
r || (this.list = e(o.tpl).addClass(o.position).appendTo("body"), r = {
prev:this.list.find(".btnPrev").click(t.prev),
next:this.list.find(".btnNext").click(t.next),
play:this.list.find(".btnPlay").click(t.play),
toggle:this.list.find(".btnToggle").click(t.toggle),
close:this.list.find(".btnClose").click(t.close)
}), n.index > 0 || n.loop ? r.prev.removeClass("btnDisabled") :r.prev.addClass("btnDisabled"), 
n.loop || n.index < n.group.length - 1 ? (r.next.removeClass("btnDisabled"), r.play.removeClass("btnDisabled")) :(r.next.addClass("btnDisabled"), 
r.play.addClass("btnDisabled")), this.buttons = r, this.onUpdate(o, n);
},
onUpdate:function(e, t) {
var o;
this.buttons && (o = this.buttons.toggle.removeClass("btnDisabled btnToggleOn"), 
t.canShrink ? o.addClass("btnToggleOn") :t.canExpand || o.addClass("btnDisabled"));
},
beforeClose:function() {
this.list && this.list.remove(), this.list = null, this.buttons = null;
}
};
}(jQuery), function(e) {
var t = e.fancybox;
t.helpers.thumbs = {
defaults:{
width:50,
height:50,
position:"bottom",
source:function(t) {
var o;
return t.element && (o = e(t.element).find("img").attr("src")), !o && "image" === t.type && t.href && (o = t.href), 
o;
}
},
wrap:null,
list:null,
width:0,
init:function(t, o) {
var n, r = this, i = t.width, a = t.height, s = t.source;
n = "";
for (var l = 0; l < o.group.length; l++) n += '<li><a style="width:' + i + "px;height:" + a + 'px;" href="javascript:jQuery.fancybox.jumpto(' + l + ');"></a></li>';
this.wrap = e('<div id="fancybox-thumbs"></div>').addClass(t.position).appendTo("body"), 
this.list = e("<ul>" + n + "</ul>").appendTo(this.wrap), e.each(o.group, function(t) {
var n = s(o.group[t]);
n && e("<img />").load(function() {
var o, n, s, l = this.width, u = this.height;
r.list && l && u && (o = l / i, n = u / a, s = r.list.children().eq(t).find("a"), 
o >= 1 && n >= 1 && (o > n ? (l = Math.floor(l / n), u = a) :(l = i, u = Math.floor(u / o))), 
e(this).css({
width:l,
height:u,
top:Math.floor(a / 2 - u / 2),
left:Math.floor(i / 2 - l / 2)
}), s.width(i).height(a), e(this).hide().appendTo(s).fadeIn(300));
}).attr("src", n);
}), this.width = this.list.children().eq(0).outerWidth(!0), this.list.width(this.width * (o.group.length + 1)).css("left", Math.floor(.5 * e(window).width() - (o.index * this.width + .5 * this.width)));
},
beforeLoad:function(e, t) {
return t.group.length < 2 ? (t.helpers.thumbs = !1, void 0) :(t.margin["top" === e.position ? 0 :2] += e.height + 15, 
void 0);
},
afterShow:function(e, t) {
this.list ? this.onUpdate(e, t) :this.init(e, t), this.list.children().removeClass("active").eq(t.index).addClass("active");
},
onUpdate:function(t, o) {
this.list && this.list.stop(!0).animate({
left:Math.floor(.5 * e(window).width() - (o.index * this.width + .5 * this.width))
}, 150);
},
beforeClose:function() {
this.wrap && this.wrap.remove(), this.wrap = null, this.list = null, this.width = 0;
}
};
}(jQuery), function(e) {
"use strict";
var t = e.fancybox, o = function(t, o, n) {
return n = n || "", "object" === e.type(n) && (n = e.param(n, !0)), e.each(o, function(e, o) {
t = t.replace("$" + e, o || "");
}), n.length && (t += (t.indexOf("?") > 0 ? "&" :"?") + n), t;
};
t.helpers.media = {
defaults:{
youtube:{
matcher:/(youtube\.com|youtu\.be|youtube-nocookie\.com)\/(watch\?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*)).*/i,
params:{
autoplay:1,
autohide:1,
fs:1,
rel:0,
hd:1,
wmode:"opaque",
enablejsapi:1
},
type:"iframe",
url:"//www.youtube.com/embed/$3"
},
vimeo:{
matcher:/(?:vimeo(?:pro)?.com)\/(?:[^\d]+)?(\d+)(?:.*)/,
params:{
autoplay:1,
hd:1,
show_title:1,
show_byline:1,
show_portrait:0,
fullscreen:1
},
type:"iframe",
url:"//player.vimeo.com/video/$1"
},
metacafe:{
matcher:/metacafe.com\/(?:watch|fplayer)\/([\w\-]{1,10})/,
params:{
autoPlay:"yes"
},
type:"swf",
url:function(t, o, n) {
return n.swf.flashVars = "playerVars=" + e.param(o, !0), "//www.metacafe.com/fplayer/" + t[1] + "/.swf";
}
},
dailymotion:{
matcher:/dailymotion.com\/video\/(.*)\/?(.*)/,
params:{
additionalInfos:0,
autoStart:1
},
type:"swf",
url:"//www.dailymotion.com/swf/video/$1"
},
twitvid:{
matcher:/twitvid\.com\/([a-zA-Z0-9_\-\?\=]+)/i,
params:{
autoplay:0
},
type:"iframe",
url:"//www.twitvid.com/embed.php?guid=$1"
},
twitpic:{
matcher:/twitpic\.com\/(?!(?:place|photos|events)\/)([a-zA-Z0-9\?\=\-]+)/i,
type:"image",
url:"//twitpic.com/show/full/$1/"
},
instagram:{
matcher:/(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
type:"image",
url:"//$1/p/$2/media/?size=l"
},
google_maps:{
matcher:/maps\.google\.([a-z]{2,3}(\.[a-z]{2})?)\/(\?ll=|maps\?)(.*)/i,
type:"iframe",
url:function(e) {
return "//maps.google." + e[1] + "/" + e[3] + e[4] + "&output=" + (e[4].indexOf("layer=c") > 0 ? "svembed" :"embed");
}
}
},
beforeLoad:function(t, n) {
var r, i, a, s, l = n.href || "", u = !1;
for (r in t) if (t.hasOwnProperty(r) && (i = t[r], a = l.match(i.matcher))) {
u = i.type, s = e.extend(!0, {}, i.params, n[r] || (e.isPlainObject(t[r]) ? t[r].params :null)), 
l = "function" === e.type(i.url) ? i.url.call(this, a, s, n) :o(i.url, a, s);
break;
}
u && (n.href = l, n.type = u, n.autoHeight = !1);
}
};
}(jQuery), function() {
"undefined" != typeof _ && null !== _ && (_.templateSettings = {
evaluate:/\{\{(.+?)\}\}/g,
interpolate:/\{\{=(.+?)\}\}/g
}), "undefined" != typeof $ && null !== $ && ($.support.cors = !0), $B.Singleton || ($B.Singleton = {});
}.call(this), function() {
var e, t, o, n, r = [].slice, i = function(e, t) {
return function() {
return e.apply(t, arguments);
};
}, a = {}.hasOwnProperty, s = function(e, t) {
function o() {
this.constructor = e;
}
for (var n in t) a.call(t, n) && (e[n] = t[n]);
return o.prototype = t.prototype, e.prototype = new o(), e.__super__ = t.prototype, 
e;
}, l = [].indexOf || function(e) {
for (var t = 0, o = this.length; o > t; t++) if (t in this && this[t] === e) return t;
return -1;
};
String.prototype.toSlug = function() {
var e;
return e = this.replace(/[^\u0020-\u007e]/g, ""), e = e.replace(/["'`]/g, ""), e = e.replace(/@/g, " at "), 
e = e.replace(/&/g, " and "), e = e.replace(/\W+/g, " "), e = e.replace(/_/g, " "), 
e = e.trim(), e = e.replace(/\s+/g, "-"), e = e.toLowerCase();
}, String.prototype.trim || (String.prototype.trim = function() {
return this.replace(/^\s+|\s+$/g, "");
}), $(function() {
return $(document).on("click", ".open-support-popup", function(e) {
return UserVoice ? (e.preventDefault(), UserVoice.push([ "show", {
mode:"contact"
} ]), null != window.edit_page ? $B.AE.track("Click Uservoice Button - Editor v1") :$B.AE.track("Click Uservoice Button - Dashboard v1")) :void 0;
});
}), $B.trackingAlias = function(e) {
var t;
return t = !!$.cookie("__strk_aliased"), 1 !== $S.user_meta.sign_in_count || t ? void 0 :(analytics.alias(e), 
$.cookie("__strk_aliased", "1", {
expires:30,
path:"/"
}));
}, $B.store = {
enabled:!0,
set:function(e, t, o) {
var n;
if (null != window.store && this.enabled) return n = {
val:t
}, o && (n.exp = o, n.time = new Date().getTime()), window.store.set(e, n);
},
setHours:function(e, t, o) {
return this.set(e, t, Math.floor(36e5 * o));
},
get:function(e) {
var t;
return null != window.store && this.enabled ? (t = window.store.get(e), t ? t.exp && t.time && new Date().getTime() - t.time > t.exp ? null :t.val :null) :null;
},
clear:function() {
var e;
return null != (e = window.store) ? e.clear() :void 0;
},
remove:function(e) {
var t;
return null != (t = window.store) ? t.remove(e) :void 0;
}
}, $B.isStatic = function() {
return "yes" === $("html").attr("static");
}, $B.isHeadlessRendering = function() {
return $S.conf.headless_render && !$B.isStatic();
}, $B.toVal = function(e) {
return "function" == typeof e ? e() :e;
}, $B.topInWindow = function(e) {
return $(e).offset().top - $(window).scrollTop();
}, $B.checkAll = function() {
var e, t, o, n, i;
for (o = arguments[0], t = 2 <= arguments.length ? r.call(arguments, 1) :[], n = 0, 
i = t.length; i > n; n++) if (e = t[n], e !== o) return !1;
return !0;
}, $B.Cookie = function() {
function e(e) {
this.options = null != e ? e :{}, this.set = i(this.set, this), this.get = i(this.get, this);
}
return e.prototype.get = function(e) {
return $.cookie("__" + this.options.scope + "_" + e);
}, e.prototype.set = function(e, t, o) {
return null == o && (o = {
expires:1,
path:"/"
}), $.cookie("__" + this.options.scope + "_" + e, t, o);
}, e;
}(), $B.dialog = function(e) {
var t, o;
return o = $.Deferred(), 0 === $("#sdialog").length && $("body").append('      <div id="sdialog" style="opacity: 0; position: relative; z-index: 99999">        <div style="height: 100%; width: 100%; position: fixed; z-index: 999999; left: 0; top: 0; background: #000; opacity: .6;">        </div>        <div style="height: 100%; width: 100%; position: fixed; z-index: 999999; left: 0; top: 0;">          <div class="white-modal" style="display: block; height: auto;">            <div id="sdialog-content" class="modal-container" style="height: auto; box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.7);">              <!--text-->            </div>          </div>        </div>      </div>      '), 
$("#sdialog > div").unbind("click").bind("click", function() {
return $("#sdialog-content").addClass("easeDown"), setTimeout(function() {
return $("#sdialog").hide(), $("#sdialog-content").removeClass("easeUp easeDown"), 
o.reject();
}, 100);
}), $("#sdialog-content").unbind("click").bind("click", function(e) {
return e.stopPropagation();
}), $("#sdialog").show().animate({
opacity:"1"
}, {
easing:"easeInOutQuart",
duration:200
}), t = $("#sdialog-content").html(e).css("opacity", 0), setTimeout(function() {
return t.addClass("easeUp"), setTimeout(function() {
return t.css("opacity", 1);
}, 200);
}, 100), o;
}, $.fn.doIf = function(e, t) {
return t($(this)) ? e($(this)) :void 0;
}, $B.customAlert = function(e, t, o) {
var n, r, i;
return r = "", null != o && (r = "      <button class='s-btn cancel gray'>" + o + "</button>"), 
n = "", null != t && (n = "      <div class='bottom-actions'>        " + r + "        <button class='s-btn confirm'>" + t + "</button>      </div>    "), 
i = $B.dialog("    <div class='strikingly-custom-alert'>      <i class='fa fa-exclamation-triangle'></i>      <i class='close'>&times;</i>      <div class='alert-content'>      " + e + "      </div>      " + n + "    <div>"), 
$(".strikingly-custom-alert .confirm").unbind("click").bind("click", function() {
return $("#sdialog-content").addClass("easeDown"), setTimeout(function() {
return $("#sdialog").hide(), $("#sdialog-content").removeClass("easeUp easeDown");
}, 100), i.resolve();
}), $(".strikingly-custom-alert .close, .strikingly-custom-alert .cancel").unbind("click").bind("click", function() {
return $("#sdialog > div").trigger("click");
}), i;
}, $B.getParentWindow = function(e) {
var t;
return t = e.defaultView || e.parentWindow, t.parent;
}, $B.getFrameForDocument = function(e) {
var t, o, n, r;
for (n = $B.getParentWindow(e).document.getElementsByTagName("iframe"), r = n.length; r-- > 0; ) {
o = n[r];
try {
if (t = o.contentDocument || o.contentWindow.document, t === e) return o;
} catch (i) {}
}
}, $B.log = function() {
var e;
return e = "true" === $B.store.get("strikinglyLogger") || $B.log.enabledFlag, $B.log.enabled() ? "undefined" != typeof console && null !== console ? "function" == typeof console.log ? console.log(Array.prototype.slice.call(arguments)) :void 0 :void 0 :void 0;
}, $B.log.enabled = function() {
var e, t, o;
return t = "true" === $B.store.get("strikinglyLogger"), e = "true" === ("function" == typeof (o = $("meta[name=a-minimum]")).attr ? o.attr("content") :void 0), 
t || e || -1 !== window.location.toString().indexOf(":3000");
}, $B.log.enable = function() {
return $B.store.set("strikinglyLogger", "true"), $B.log.enabledFlag = !0, console.log("Bobcat logger enabled!");
}, $B.log.disable = function() {
return $B.store.set("strikinglyLogger", "false"), console.log("Bobcat logger disabled!");
}, $B.growl = function(e) {
var t, o, n;
if ($B.log.enabled()) return o = 2800, n = 20 + 34 * $(".s-growl").length, t = $("<div></div>").addClass("s-growl").text(e).css({
background:"rgba(0,0,0,0.85)",
color:"white",
padding:"6px 14px",
"font-size":"110%",
position:"fixed",
"z-index":999e3,
top:n,
right:20,
"-webkit-border-radius":"4px"
}), setTimeout(function() {
return t.animate({
top:"-=5",
opacity:0
}, function() {
return t.remove();
});
}, o), $("body").append(t);
}, $B.pollHelper = function(e, t) {
var o;
return null == t && (t = 1e3), (o = function() {
return setTimeout(function() {
return e.call(this, o);
}, t), t = 1.5 * t;
})();
}, $B.poller = function(e, t, o) {
var n;
return null == t && (t = function() {}), null == o && (o = function() {}), n = !1, 
$B.pollHelper(function(r) {
var i;
return i = $.getJSON(e), i.success(function(e, o, i) {
return n ? void 0 :e && "retry" !== e && "retry" !== (null != e ? e.html :void 0) ? t(e, o, i) :r();
}), i.error(function(e) {
return "retry" === e.responseText ? r() :o();
});
}), {
cancel:function() {
return n = !0;
}
};
}, $B.restPoller = function(e, t) {
var o;
return null == t && (t = {}), o = {
url:e
}, $.extend(!0, o, t), o.success = function(e) {
var o, n, r, i, a, s, l;
if ((null != e ? null != (n = e.message) ? n.type :void 0 :void 0) && (null != e ? null != (r = e.message) ? r.id :void 0 :void 0)) o = "/s/tasks/" + e.message.type + "/" + e.message.id + ".jsm"; else {
if (!(null != e ? null != (i = e.data) ? null != (a = i.task) ? a.type :void 0 :void 0 :void 0) || !(null != e ? null != (s = e.data) ? null != (l = s.task) ? l.id :void 0 :void 0 :void 0)) return $B.log("Could not get poll URL!"), 
$B.log(e), void 0;
o = "/s/tasks/" + e.data.task.type + "/" + e.data.task.id + ".jsm";
}
return $B.poller(o, t.success, t.error), $B.log("Begin polling: " + o);
}, o.error = function(e, o, n) {
return t.error(e, o, n);
}, $.ajax(o), $B.log("Requesting poller: " + e);
}, $B.waitFor = function(e, t, o) {
var n;
return o = o || 100, n = setInterval(function() {
return e() ? (clearInterval(n), t()) :void 0;
}, o);
}, $B.getQueryValue = function(e) {
var t, o;
return t = new RegExp("[?&]" + e + "=([^&#]*)"), o = t.exec(window.location.href), 
null == o ? "" :o[1];
}, $B.detectCSSFeature = function(e) {
var t, o, n, r, i, a, s;
if (n = !1, t = "Webkit Moz ms O".split(" "), o = document.createElement("div"), 
e = e.toLowerCase(), r = e.charAt(0).toUpperCase() + e.substr(1), void 0 !== o.style[e]) return !0;
for (a = 0, s = t.length; s > a; a++) if (i = t[a], void 0 !== o.style[i + r]) return !0;
return !1;
}, function(e) {
var t;
return t = {}, e.setCustomization = function(e, o) {
return t[e] = o;
}, e.getCustomization = function(e) {
return null != t[e] ? t[e] :void 0;
};
}($B), function(e) {
var t;
return t = {}, e.meta = function(e, o) {
var n;
return null == o && (o = !1), null == t[e] || o ? (n = $('meta[name="' + e + '"]').attr("content"), 
null != n ? t[e] = n :($B.log("" + e + " missing in meta."), void 0)) :t[e];
}, e.metaObject = function(e, o) {
var n;
return null == o && (o = !1), null == t[e] || o ? (n = $('meta[name="' + e + '"]').attr("content"), 
null != n ? t[e] = jQuery.parseJSON(n) :($B.log("" + e + " missing in meta object."), 
{})) :t[e];
}, e.appMeta = function(t) {
return e.metaObject("app-configs")[t];
}, e.siteMeta = function(t) {
return e.metaObject("site-configs")[t];
};
}($B), $B.ui = {
modalStk:[],
disableShadeClick:function() {
var e, t;
return null != (e = _.last(this.modalStk)) ? null != (t = e.options) ? t.strong = !0 :void 0 :void 0;
},
enableShadeClick:function() {
var e, t;
return null != (e = _.last(this.modalStk)) ? null != (t = e.options) ? t.strong = !1 :void 0 :void 0;
},
removeFromModalStk:function(e) {
var t;
return t = _(this.modalStk).find(function(t) {
return t.dialog[0] === e[0];
}), t ? (this.modalStk = _(this.modalStk).without(t), !0) :!1;
},
closeLastModal:function(e) {
var t;
return null == e && (e = !1), 0 === this.modalStk.length || (t = _.last(this.modalStk), 
t.options.strong && e) ? void 0 :$B.ui.closeModal(t.dialog, t.options);
},
openModal:function(e, t) {
var o, n, r, i;
if (!e.is(":visible") || "1" !== e.css("opacity")) return t.shade && (0 === (r = $("#g-shade")).length && (r = $('<div id="g-shade" class="s-editor-modal-bg">').css("opacity", 0).appendTo($("body")), 
r.click(function() {
return $B.ui.closeLastModal(!0);
})), r.stop().show(), setTimeout(function() {
return r.css("opacity", 1);
}, 1)), n = e.height(), i = $(window).height(), e.css({
"margin-top":-n / 2
}), i > 500 && .4 * i > n / 2 ? e.css("top", "45%") :e.css("top", "50%"), t.absolute && e.css({
position:"absolute",
top:$(document).scrollTop() + $(window).height() / 2
}), e.stop().addClass("invisible").show(), setTimeout(function() {
return e.removeClass("invisible");
}, 1), this.modalStk.push({
dialog:e,
options:t
}), (o = $(".s-modal-bg")).length ? (o.css("opacity", 0).show(), o.css("pointer-events", "auto"), 
o.animate({
opacity:1
}, 400, "easeInOutQuart")) :void 0;
},
closeModal:function(e) {
var t, o, n, r;
return t = $(".s-modal-bg"), r = $("#g-shade"), t.stop().animate({
opacity:0
}, 400, "easeInOutQuart", function() {
return t.hide();
}), e.is(":visible") ? (e.addClass("invisible"), n = this.removeFromModalStk(e), 
n || $B.log("modal", e, "not in modal stack!"), o = !this.modalStk.length, o && (r.css("opacity", 0), 
$("body").removeClass("no-scroll")), setTimeout(function() {
return e.hide(), o ? r.hide() :void 0;
}, 300), e.trigger("strikinglyCloseModal")) :void 0;
},
openCloseModal:function(e, t) {
var o, n, r;
return n = {
onlyOpen:!1,
shade:!0,
block:!1,
absolute:!1,
openCallback:null,
closeCallback:null,
strong:!1
}, $.extend(!0, n, t), (null != (r = $.browser) ? r.safari :void 0) && e.find("iframe").length && (n.absolute = !0), 
n.closeCallback && !e.data("hasModalCloseCallback") && (e.data("hasModalCloseCallback", !0), 
e.on("strikinglyCloseModal", function() {
return "function" == typeof n.closeCallback ? n.closeCallback() :void 0;
})), o = e.is(":visible"), o ? n.onlyOpen || this.closeModal(e, n) :this.openModal(e, n), 
o;
},
openPanel:function(e) {
return e.is(":visible") && "1" === e.css("opacity") ? void 0 :(e.css({
left:"-120px"
}).show(), e.stop().animate({
left:"200px"
}, 400, "easeInOutQuart"));
},
closePanel:function(e) {
return e.is(":visible") || "0" !== e.css("opacity") ? e.stop().animate({
left:"-120px"
}, 400, "easeInOutQuart", function() {
return e.hide();
}) :void 0;
},
openClosePanel:function(e, t) {
var o;
return null == t && (t = !1), o = e.is(":visible"), o ? t || this.closePanel(e) :this.openPanel(e), 
o;
},
openIframePopup:function(e, t) {
var o, n, r, i, a;
return null == t && (t = {}), a = $.extend({
showAddress:!1,
noOverride:!1
}, t), o = $(".s-page-layer").show(), $("iframe", o).attr("src", e), n = $(".address .link", o), 
a.showAddress ? n.attr("href", e).text(e) :n.attr("href", "").text(""), a.noOverride || $(".s-page-wrapper").css({
height:"auto",
width:"auto",
"margin-top":0,
"margin-left":0,
padding:"0"
}), null != a.height && (i = null != a.topOffset ? a.topOffset :0, $(".s-page-wrapper").css({
height:a.height + "px",
"margin-top":(.8 * $(window).height() - a.height) / 2 + i + "px"
})), null != a.width && (r = null != a.leftOffset ? a.leftOffset :0, $(".s-page-wrapper").css({
width:a.width + "px",
"margin-left":(.92 * $(window).width() - a.width) / 2 + r + "px"
})), null != a.extra && $(".s-page-wrapper").css(a.extra), setTimeout(function() {
return o.addClass("open"), $(".s-page-shade, .back-btn", o).click(function() {
return $B.ui.closeIframePopup();
});
}, 100);
},
closeIframePopup:function() {
var e;
return e = $(".s-page-layer"), e.removeClass("open"), setTimeout(function() {
return e.hide(), $(".s-page-shade, .back-btn", e).unbind("click"), $("iframe", e).attr("src", "");
}, 300);
},
openLinkInWindow:function(e) {
return e.click(function(e) {
var t, o, n;
return e.preventDefault(), t = $(this), o = t.attr("href"), n = window.open(o, "Share", "scrollbars=1,width=500,height=500,menubar=no,toolbar=no,location=no");
});
},
openInWindow:function(e, t) {
var o;
return null == t && (t = {
height:500,
width:500
}), o = window.open(e, "Share", "scrollbars=1,width=" + t.width + ",height=" + t.height + ",menubar=no,toolbar=no,location=no");
}
}, $B.Queue = function() {
function e() {
this.clear = i(this.clear, this), this.size = i(this.size, this), this.dequeue = i(this.dequeue, this), 
this.enqueue = i(this.enqueue, this), this.q = [];
}
return e.prototype.enqueue = function(e) {
return this.q.push(e);
}, e.prototype.dequeue = function() {
return this.q.shift();
}, e.prototype.size = function() {
return this.q.length;
}, e.prototype.clear = function() {
return this.q = [];
}, e;
}(), $B.Stack = function() {
function e() {
this.clear = i(this.clear, this), this.size = i(this.size, this), this.pop = i(this.pop, this), 
this.push = i(this.push, this), this.q = [];
}
return e.prototype.push = function(e) {
return this.q.push(e);
}, e.prototype.pop = function() {
return this.q.pop();
}, e.prototype.size = function() {
return this.q.length;
}, e.prototype.clear = function() {
return this.q = [];
}, e;
}(), $B.ObservableStack = function(e) {
function t() {
this.clear = i(this.clear, this), this.pop = i(this.pop, this), this.push = i(this.push, this), 
t.__super__.constructor.call(this), this.observableSize = ko.observable(0);
}
return s(t, e), t.prototype.push = function(e) {
return t.__super__.push.call(this, e), this.observableSize(this.size());
}, t.prototype.pop = function() {
return this.observableSize(this.size() - 1), t.__super__.pop.call(this);
}, t.prototype.clear = function() {
return t.__super__.clear.call(this), this.observableSize(this.size());
}, t;
}($B.Stack), window.Singleton = function() {
function e() {}
var t;
return t = void 0, e.get = function(e) {
return null != t ? t :t = new n(e);
}, e;
}(), n = function() {
function e(e) {
this.args = e;
}
return e.prototype.echo = function() {
return this.args;
}, e;
}(), o = [ "extended", "included" ], $B.Module = function() {
function e() {}
return e.extend = function(e) {
var t, n, r;
for (t in e) n = e[t], l.call(o, t) < 0 && (this[t] = n);
return null != (r = e.extended) && r.apply(this), this;
}, e.include = function(e) {
var t, n, r;
for (t in e) n = e[t], l.call(o, t) < 0 && (this.prototype[t] = n);
return null != (r = e.included) && r.apply(this), this;
}, e;
}(), $B.UrlHelper = {
isEmail:function(e) {
var t;
return t = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
t.test(e);
},
hasProtocol:function(e) {
var t, o;
return t = /^((http|https|ftp|mailto|tel|fb|skype|itms-services):)/, o = /^(#)/, 
t.test(e) || o.test(e);
},
addProtocol:function(e, t) {
return null == t && (t = !1), e = $.trim(e), 0 === e.length ? e = t ? "" :"javascript:void(0);" :this.isEmail(e) ? e = "mailto:" + e :this.hasProtocol(e) || (e = "http://" + e), 
e;
},
createUrlParser:function(e) {
var t;
return t = document.createElement("a"), t.href = this.addProtocol(e, !0), t;
}
}, $B.HtmlHelper = {
htmlEncode:function(e) {
return $("<div/>").text(e).html();
},
htmlDecode:function(e) {
return $("<div/>").html(e).text();
},
checkClosingTags:function(e) {
var t, o, n, r, i, a, s, u, d, c, p;
for (n = function(e) {
var t;
return t = "area, base, br, col, embed, hr, img, input, keygen, link, meta, param, source, track, wbr".split(", "), 
e = e.split(/[<>\s]/g)[1], e = e.replace(/\//g, ""), l.call(t, e) >= 0;
}, t = /<\/?([A-Z][A-Z0-9]*)\b[^>]*>/gi, r = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, 
a = /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, i = e; r.test(i) || a.test(i); ) i = i.replace(r, ""), 
i = i.replace(a, "");
for (u = null != (p = i.match(t)) ? p :[], o = 0, d = 0, c = u.length; c > d; d++) if (s = u[d], 
!n(s) && ("/" !== s[1] ? o += 1 :o -= 1, 0 > o)) return !1;
return 0 === o;
}
}, $B.ImageOptionHelper = {
IMAGE_SIZE:{
small:"300x225>",
medium:"720x540>",
large:"1200x900>",
background:"2000x1200>"
},
getOptions:function(e) {
var t, o, n, r, i, a, s;
return this.conversions ? this.conversions :(r = e.find('[name="asset[image_size]"]'), 
a = e.find('[name="asset[thumb_size]"]'), 0 === r.length && console.warn("[Image Component] Image size not found!"), 
0 === a.length && console.warn("[Image Component] Thumb size not found!"), i = this.toImageSize(("function" == typeof r.val ? r.val() :void 0) || "large"), 
s = this.toImageSize(("function" == typeof a.val ? a.val() :void 0) || "200x200#"), 
n = function(e) {
return e.slice(0, -1).split("x")[0];
}, o = function(e) {
return e.slice(0, -1).split("x")[1];
}, t = function(e) {
var t;
return t = e.charAt(e.length - 1), "#" === t ? {
crop:"fill",
gravity:"faces:center"
} :"<" === t || ">" === t ? {
crop:"limit"
} :void 0;
}, this.conversions = {
custom:{
width:n(i),
height:o(i)
},
thumb:{
width:n(s),
height:o(s)
}
}, this.conversions.custom = _.extend(this.conversions.custom, t(i)), this.conversions.thumb = _.extend(this.conversions.thumb, t(s)), 
this.conversions);
},
toImageSize:function(e) {
return ("small" === e || "medium" === e || "large" === e || "background" === e) && (e = this.IMAGE_SIZE[e]), 
e;
}
}, e = function() {
function e(e) {
this.handler = e, this.queue = [];
}
return e.prototype.run = function() {
var e, t = this;
return e = function() {
return t.queue.length > 0 ? t.run() :void 0;
}, this.handler(this.queue.shift(), e);
}, e.prototype.append = function(e) {
return this.queue.push(e), 1 === this.queue.length ? this.run() :void 0;
}, e;
}(), t = function() {
function e(e, t, o) {
this.item = e, this.url = t, this.callback = o;
}
return e;
}(), $B.loadFacebookScript = function() {
var e;
if (!("undefined" != typeof $S && null !== $S ? null != (e = $S.global_conf) ? e.in_china :void 0 :void 0)) return function(e, t, o) {
var n, r;
return n = e.getElementsByTagName(t)[0], e.getElementById(o) ? void 0 :(r = e.createElement(t), 
r.id = o, r.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=138736959550286", 
n.parentNode.insertBefore(r, n));
}(document, "script", "facebook-jssdk");
}, $B.TwitterLogin = function() {
function e(e) {
this._configs = e;
}
return e.prototype.load = function(e) {
var t;
if (!("undefined" != typeof $S && null !== $S ? null != (t = $S.global_conf) ? t.in_china :void 0 :void 0) && null == window.twttr) return window.twttr = function(e, t, o) {
var n, r, i;
return n = e.getElementsByTagName(t)[0], e.getElementById(o) ? void 0 :(r = e.createElement(t), 
r.id = o, r.src = "//platform.twitter.com/widgets.js", n.parentNode.insertBefore(r, n), 
window.twttr || (i = {
_e:[],
ready:function(e) {
return i._e.push(e);
}
}));
}(document, "script", "twitter-wjs"), window.twttr.ready(function(t) {
return t.events.bind("tweet", function(t) {
return callback.tweet ? e.tweet(t) :void 0;
});
});
}, e;
}(), $B.FacebookLogin = function() {
function e(e) {
this._configs = e, this.loadFacebook = i(this.loadFacebook, this), this.fbLoginPopup = i(this.fbLoginPopup, this);
}
return e.prototype.fbLoginPopup = function(e) {
return FB.login(function(t) {
if (t.authResponse) {
if (e.success) return e.success(t);
} else if (e.fail) return e.fail(t);
}, {
scope:this._configs.FACEBOOK_PERMS
});
}, e.prototype.loadFacebook = function(e) {
var t = this;
if (!$S.global_conf.in_china) return window.fbAsyncInit = function() {
return FB.init({
appId:t._configs.FACEBOOK_APP_ID,
channelUrl:"" + window.location.protocol + "//" + window.location.host + "/fb/channel.html",
status:!1,
cookie:!0,
xfbml:!0,
oauth:!0
}), FB.Event.subscribe("auth.authResponseChange", function(t) {
if (console.log(t), "connected" === t.status) {
if (e.connected) return e.connected(t);
} else if ("not_authorized" === t.status) {
if (e.notAuthorized) return e.notAuthorized(t);
} else if (e.others) return e.others(t);
});
}, function(e) {
var t, o, n;
return t = "facebook-jssdk", n = e.getElementsByTagName("script")[0], e.getElementById(t) ? void 0 :(o = e.createElement("script"), 
o.id = t, o.async = !0, o.src = "//connect.facebook.net/en_US/all.js", n.parentNode.insertBefore(o, n));
}(document);
}, e;
}(), $B.LinkedinLogin = function() {
function e(e) {
this._configs = e, this.loadLinkedin = i(this.loadLinkedin, this), this.linkedinLogout = i(this.linkedinLogout, this), 
this.linkedinLoginPopup = i(this.linkedinLoginPopup, this);
}
return e.prototype.linkedinLoginPopup = function(e) {
return IN.User.authorize(function() {
if (IN.User.isAuthorized()) {
if (e.success) return e.success();
} else if (e.fail) return e.fail();
});
}, e.prototype.linkedinLogout = function() {
return IN.User.logout();
}, e.prototype.loadLinkedin = function(e) {
var t = this;
return window.linkedinAsyncInit = function() {
return IN.init({
api_key:t._configs.LINKEDIN_API_KEY,
scope:t._configs.LINKEDIN_PERMS,
authorize:!1,
credentials_cookie:!0,
credentials_cookie_crc:!0
}), IN.Event.on(IN, "auth", function() {
return IN.User.isAuthorized() && ($B.log("[LinkedIn] Authorized user"), e.connected) ? e.connected() :void 0;
}), IN.Event.on(IN, "logout", function() {
return !IN.User.isAuthorized() && ($B.log("[LinkedIn] Deauthorized user"), e.disconnected) ? e.disconnected() :void 0;
}), e.initialized ? $B.waitFor(function() {
return "undefined" != typeof IN && null !== IN && null != IN.User && null != IN.Event;
}, e.initialized, 500) :void 0;
}, $.getScript("//platform.linkedin.com/in.js?async=true", linkedinAsyncInit);
}, e;
}(), window.AjaxQueueBuffer = e, window.Task = t, $B.debounce = function(e, t) {
var o;
return null == t && (t = 100), o = 0, function() {
var n, r;
return r = this, n = arguments, clearTimeout(o), o = setTimeout(function() {
return e.apply(r, n);
}, t);
};
}, $B.genGeneralErrorHandler = function(e) {
return function(t) {
var o, n, r;
return o = null != t.responseJSON ? null != (n = t.responseJSON.meta) ? null != (r = n.userMessage) ? r.plain :void 0 :void 0 :I18n.t("js.pages.edit.errors.api_error"), 
$B.customAlert(o), "function" == typeof e ? e() :void 0;
};
}, $B.lazyloadIframe = function() {
var e;
return e = 0, function(t, o) {
return null == o && (o = -1), -1 === o && (o = 1e4 + 1e3 * e), e += 1, setTimeout(function() {
return t.data("src") !== t.attr("src") ? (t.attr("src", t.data("src")), "function" == typeof $B.timerCheck ? $B.timerCheck("Loading iframe #" + t.attr("id")) :void 0) :void 0;
}, o);
};
}(), $B.initFilepicker = function() {
return $B.waitFor(function() {
return "undefined" != typeof filepicker && null !== filepicker;
}, function() {
return filepicker.setKey($S.conf.FILEPICKER_API_KEY), window.filepicker_options = {
extension:[ ".png", ".jpg", ".jpeg", ".gif", ".bmp" ],
container:"s-upload-iframe",
services:[ "COMPUTER", "IMAGE_SEARCH", "URL", "FACEBOOK", "DROPBOX", "GOOGLE_DRIVE", "FLICKR", "INSTAGRAM", "PICASA" ],
openTo:"COMPUTER",
maxsize:3145728
}, window.store_options = {
location:"S3"
};
});
}, $B.initFeather = function() {
return $B.waitFor(function() {
return "undefined" != typeof Aviary && null !== Aviary;
}, function() {
return window.featherEditor = new Aviary.Feather({
apiKey:"f5da8ea5e",
apiVersion:3,
tools:"all",
appendTo:"",
theme:"dark",
maxSize:1920,
language:"en"
});
});
}, $B.Embedly = function() {
function e() {
this.apiKey = $S.conf.EMBEDLY_API_KEY;
}
return e.prototype.queryUrlForHtml = function(e) {
return $.ajax({
type:"GET",
url:"http://api.embed.ly/1/oembed",
data:{
key:this.apiKey,
url:e
},
dataType:"JSON"
});
}, e;
}();
}.call(this), function() {
window.Bobcat = window.$B = window.Bobcat || {}, window.Bobcat.GALLERY_COUNTER = 1, 
window.Bobcat.DOM = {
SLIDES:".slides .slide",
PAGE_DATA_SCOPE:"page",
EDITPAGE_DATA_SCOPE:"editpage",
NAVIGATOR:"#s-header, .navigator",
FOOTER:"#footer",
FOOTER_LOGO_EDITOR:"#edit-logo-footer",
EDITOR_OVERLAY:".edit-overlay",
EDITOR:".editor",
CONTENT:".content",
PAGE_SETTING_DIALOG:"#page-settings-menu",
NEW_PAGE_MESSAGE_DIALOG:"#new-page-message-dialog",
NEW_SECTION_DIALOG:"#new-section-dialog",
ASSET_LIB_DIALOG:"#asset-lib-dialog",
APP_STORE_DIALOG:"#app-store-dialog",
SERVICE_EDIT_DIALOG:"#service-edit-dialog",
TRAFFIC_GUIDE_DIALOG:"#traffic-guide-dialog",
PAYPAL_POPUP:".strikingly-paypal-popup",
SHARE_DIALOG:"#sharing-options-dialog",
CATEGORY_DIALOG:"#category-dialog",
PUBLISH_DIALOG:"#publish-dialog-new",
UNPUBLISH_SITES_DIALOG:"#unpublish-sites-dialog",
SAVED_DIALOG:"#saved-dialog",
FEEDBACK_DIALOG:"#feedback-dialog",
FEEDBACK_DIALOG_STEP1:".step-1",
FEEDBACK_DIALOG_STEP2:".step-2",
DIALOG_INACTIVE_CLASS:"inactive",
FACEBOOK_ROOT:"#fb-root",
FONT_SELECTOR:"select.fontselector",
VARIATION_SELECTOR:"select.variationselector",
PRESET_SELECTOR:"select.s-preset-selector-input",
STRIKINGLY_LOGO:"#strikingly-footer-logo",
SETTINGS:{
FORM:".strikingly-settings-form",
DOMAIN_FORM:".strikingly-custom-domain-form",
PUBLISH:{
FB_SHARE:"#publish-fb-button",
PUBLIC_URL:"#publish-public-url"
}
},
IMAGE_TITLE:function(e) {
return e.find("img").attr("alt") || "";
},
IMAGE_DESCRIPTION:function(e) {
return e.find("img").attr("data-description") || "";
},
GALLERY:function(e) {
var t, o, n, r;
for (r = e.parent().find("a.item"), o = 0, n = r.length; n > o; o++) t = r[o], $(t).attr("rel", "gallery_" + window.Bobcat.GALLERY_COUNTER);
return $("a.item[rel=gallery_" + window.Bobcat.GALLERY_COUNTER++ + "]");
},
GALLERY_IMAGES:function(e) {
return e.find("a.item");
},
GALLERY_IMAGES_EDITOR:function(e) {
return e.find(".gallery-editor-image");
}
};
}.call(this), function() {
$B.referrers_source = {
unknown:{
Google:{
domains:"support.google.com developers.google.com maps.google.com accounts.google.com drive.google.com sites.google.com groups.google.com groups.google.co.uk news.google.co.uk".split(" ")
},
"Yahoo!":{
domains:"finance.yahoo.com news.yahoo.com eurosport.yahoo.com sports.yahoo.com astrology.yahoo.com travel.yahoo.com answers.yahoo.com screen.yahoo.com weather.yahoo.com messenger.yahoo.com games.yahoo.com shopping.yahoo.net movies.yahoo.com cars.yahoo.com lifestyle.yahoo.com omg.yahoo.com match.yahoo.net".split(" ")
}
},
search:{
TalkTalk:{
domains:[ "www.talktalk.co.uk" ],
parameters:[ "query" ]
},
"1.cz":{
domains:[ "1.cz" ],
parameters:[ "q" ]
},
Softonic:{
domains:[ "search.softonic.com" ],
parameters:[ "q" ]
},
GAIS:{
domains:[ "gais.cs.ccu.edu.tw" ],
parameters:[ "q" ]
},
Freecause:{
domains:[ "search.freecause.com" ],
parameters:[ "p" ]
},
RPMFind:{
domains:[ "rpmfind.net", "fr2.rpmfind.net" ],
parameters:[ "rpmfind.net", "fr2.rpmfind.net" ]
},
Comcast:{
domains:[ "serach.comcast.net" ],
parameters:[ "q" ]
},
Voila:{
domains:[ "search.ke.voila.fr", "www.lemoteur.fr" ],
parameters:[ "rdata" ]
},
Nifty:{
domains:[ "search.nifty.com" ],
parameters:[ "q" ]
},
Atlas:{
domains:[ "searchatlas.centrum.cz" ],
parameters:[ "q" ]
},
"Lo.st":{
domains:[ "lo.st" ],
parameters:[ "x_query" ]
},
DasTelefonbuch:{
domains:[ "www1.dastelefonbuch.de" ],
parameters:[ "kw" ]
},
Fireball:{
domains:[ "www.fireball.de" ],
parameters:[ "q" ]
},
"1und1":{
domains:[ "search.1und1.de" ],
parameters:[ "su" ]
},
Virgilio:{
domains:[ "ricerca.virgilio.it", "ricercaimmagini.virgilio.it", "ricercavideo.virgilio.it", "ricercanews.virgilio.it", "mobile.virgilio.it" ],
parameters:[ "qs" ]
},
"Web.nl":{
domains:[ "www.web.nl" ],
parameters:[ "zoekwoord" ]
},
Plazoo:{
domains:[ "www.plazoo.com" ],
parameters:[ "q" ]
},
"Goyellow.de":{
domains:[ "www.goyellow.de" ],
parameters:[ "MDN" ]
},
AOL:{
domains:"search.aol.com search.aol.it aolsearch.aol.com aolsearch.com www.aolrecherche.aol.fr www.aolrecherches.aol.fr www.aolimages.aol.fr aim.search.aol.com www.recherche.aol.fr find.web.aol.com recherche.aol.ca aolsearch.aol.co.uk search.aol.co.uk aolrecherche.aol.fr sucheaol.aol.de suche.aol.de suche.aolsvc.de aolbusqueda.aol.com.mx alicesuche.aol.de alicesuchet.aol.de suchet2.aol.de search.hp.my.aol.com.au search.hp.my.aol.de search.hp.my.aol.it search-intl.netscape.com".split(" "),
parameters:[ "q", "query" ]
},
Acoon:{
domains:[ "www.acoon.de" ],
parameters:[ "begriff" ]
},
Free:{
domains:[ "search.free.fr", "search1-2.free.fr", "search1-1.free.fr" ],
parameters:[ "q" ]
},
"Apollo Latvia":{
domains:[ "apollo.lv/portal/search/" ],
parameters:[ "q" ]
},
HighBeam:{
domains:[ "www.highbeam.com" ],
parameters:[ "q" ]
},
"I-play":{
domains:[ "start.iplay.com" ],
parameters:[ "q" ]
},
FriendFeed:{
domains:[ "friendfeed.com" ],
parameters:[ "q" ]
},
Yasni:{
domains:[ "www.yasni.de", "www.yasni.com", "www.yasni.co.uk", "www.yasni.ch", "www.yasni.at" ],
parameters:[ "query" ]
},
Gigablast:{
domains:[ "www.gigablast.com", "dir.gigablast.com" ],
parameters:[ "q" ]
},
arama:{
domains:[ "arama.com" ],
parameters:[ "q" ]
},
Fixsuche:{
domains:[ "www.fixsuche.de" ],
parameters:[ "q" ]
},
Apontador:{
domains:[ "apontador.com.br", "www.apontador.com.br" ],
parameters:[ "q" ]
},
"Search.com":{
domains:[ "www.search.com" ],
parameters:[ "q" ]
},
Monstercrawler:{
domains:[ "www.monstercrawler.com" ],
parameters:[ "qry" ]
},
"Google Images":{
domains:"google.ac/imgres google.ad/imgres google.ae/imgres google.am/imgres google.as/imgres google.at/imgres google.az/imgres google.ba/imgres google.be/imgres google.bf/imgres google.bg/imgres google.bi/imgres google.bj/imgres google.bs/imgres google.by/imgres google.ca/imgres google.cat/imgres google.cc/imgres google.cd/imgres google.cf/imgres google.cg/imgres google.ch/imgres google.ci/imgres google.cl/imgres google.cm/imgres google.cn/imgres google.co.bw/imgres google.co.ck/imgres google.co.cr/imgres google.co.id/imgres google.co.il/imgres google.co.in/imgres google.co.jp/imgres google.co.ke/imgres google.co.kr/imgres google.co.ls/imgres google.co.ma/imgres google.co.mz/imgres google.co.nz/imgres google.co.th/imgres google.co.tz/imgres google.co.ug/imgres google.co.uk/imgres google.co.uz/imgres google.co.ve/imgres google.co.vi/imgres google.co.za/imgres google.co.zm/imgres google.co.zw/imgres google.com/imgres google.com.af/imgres google.com.ag/imgres google.com.ai/imgres google.com.ar/imgres google.com.au/imgres google.com.bd/imgres google.com.bh/imgres google.com.bn/imgres google.com.bo/imgres google.com.br/imgres google.com.by/imgres google.com.bz/imgres google.com.co/imgres google.com.cu/imgres google.com.cy/imgres google.com.do/imgres google.com.ec/imgres google.com.eg/imgres google.com.et/imgres google.com.fj/imgres google.com.gh/imgres google.com.gi/imgres google.com.gt/imgres google.com.hk/imgres google.com.jm/imgres google.com.kh/imgres google.com.kh/imgres google.com.kw/imgres google.com.lb/imgres google.com.lc/imgres google.com.ly/imgres google.com.mt/imgres google.com.mx/imgres google.com.my/imgres google.com.na/imgres google.com.nf/imgres google.com.ng/imgres google.com.ni/imgres google.com.np/imgres google.com.om/imgres google.com.pa/imgres google.com.pe/imgres google.com.ph/imgres google.com.pk/imgres google.com.pr/imgres google.com.py/imgres google.com.qa/imgres google.com.sa/imgres google.com.sb/imgres google.com.sg/imgres google.com.sl/imgres google.com.sv/imgres google.com.tj/imgres google.com.tn/imgres google.com.tr/imgres google.com.tw/imgres google.com.ua/imgres google.com.uy/imgres google.com.vc/imgres google.com.vn/imgres google.cv/imgres google.cz/imgres google.de/imgres google.dj/imgres google.dk/imgres google.dm/imgres google.dz/imgres google.ee/imgres google.es/imgres google.fi/imgres google.fm/imgres google.fr/imgres google.ga/imgres google.gd/imgres google.ge/imgres google.gf/imgres google.gg/imgres google.gl/imgres google.gm/imgres google.gp/imgres google.gr/imgres google.gy/imgres google.hn/imgres google.hr/imgres google.ht/imgres google.hu/imgres google.ie/imgres google.im/imgres google.io/imgres google.iq/imgres google.is/imgres google.it/imgres google.it.ao/imgres google.je/imgres google.jo/imgres google.kg/imgres google.ki/imgres google.kz/imgres google.la/imgres google.li/imgres google.lk/imgres google.lt/imgres google.lu/imgres google.lv/imgres google.md/imgres google.me/imgres google.mg/imgres google.mk/imgres google.ml/imgres google.mn/imgres google.ms/imgres google.mu/imgres google.mv/imgres google.mw/imgres google.ne/imgres google.nl/imgres google.no/imgres google.nr/imgres google.nu/imgres google.pl/imgres google.pn/imgres google.ps/imgres google.pt/imgres google.ro/imgres google.rs/imgres google.ru/imgres google.rw/imgres google.sc/imgres google.se/imgres google.sh/imgres google.si/imgres google.sk/imgres google.sm/imgres google.sn/imgres google.so/imgres google.st/imgres google.td/imgres google.tg/imgres google.tk/imgres google.tl/imgres google.tm/imgres google.to/imgres google.tt/imgres google.us/imgres google.vg/imgres google.vu/imgres images.google.ws images.google.ac images.google.ad images.google.ae images.google.am images.google.as images.google.at images.google.az images.google.ba images.google.be images.google.bf images.google.bg images.google.bi images.google.bj images.google.bs images.google.by images.google.ca images.google.cat images.google.cc images.google.cd images.google.cf images.google.cg images.google.ch images.google.ci images.google.cl images.google.cm images.google.cn images.google.co.bw images.google.co.ck images.google.co.cr images.google.co.id images.google.co.il images.google.co.in images.google.co.jp images.google.co.ke images.google.co.kr images.google.co.ls images.google.co.ma images.google.co.mz images.google.co.nz images.google.co.th images.google.co.tz images.google.co.ug images.google.co.uk images.google.co.uz images.google.co.ve images.google.co.vi images.google.co.za images.google.co.zm images.google.co.zw images.google.com images.google.com.af images.google.com.ag images.google.com.ai images.google.com.ar images.google.com.au images.google.com.bd images.google.com.bh images.google.com.bn images.google.com.bo images.google.com.br images.google.com.by images.google.com.bz images.google.com.co images.google.com.cu images.google.com.cy images.google.com.do images.google.com.ec images.google.com.eg images.google.com.et images.google.com.fj images.google.com.gh images.google.com.gi images.google.com.gt images.google.com.hk images.google.com.jm images.google.com.kh images.google.com.kh images.google.com.kw images.google.com.lb images.google.com.lc images.google.com.ly images.google.com.mt images.google.com.mx images.google.com.my images.google.com.na images.google.com.nf images.google.com.ng images.google.com.ni images.google.com.np images.google.com.om images.google.com.pa images.google.com.pe images.google.com.ph images.google.com.pk images.google.com.pr images.google.com.py images.google.com.qa images.google.com.sa images.google.com.sb images.google.com.sg images.google.com.sl images.google.com.sv images.google.com.tj images.google.com.tn images.google.com.tr images.google.com.tw images.google.com.ua images.google.com.uy images.google.com.vc images.google.com.vn images.google.cv images.google.cz images.google.de images.google.dj images.google.dk images.google.dm images.google.dz images.google.ee images.google.es images.google.fi images.google.fm images.google.fr images.google.ga images.google.gd images.google.ge images.google.gf images.google.gg images.google.gl images.google.gm images.google.gp images.google.gr images.google.gy images.google.hn images.google.hr images.google.ht images.google.hu images.google.ie images.google.im images.google.io images.google.iq images.google.is images.google.it images.google.it.ao images.google.je images.google.jo images.google.kg images.google.ki images.google.kz images.google.la images.google.li images.google.lk images.google.lt images.google.lu images.google.lv images.google.md images.google.me images.google.mg images.google.mk images.google.ml images.google.mn images.google.ms images.google.mu images.google.mv images.google.mw images.google.ne images.google.nl images.google.no images.google.nr images.google.nu images.google.pl images.google.pn images.google.ps images.google.pt images.google.ro images.google.rs images.google.ru images.google.rw images.google.sc images.google.se images.google.sh images.google.si images.google.sk images.google.sm images.google.sn images.google.so images.google.st images.google.td images.google.tg images.google.tk images.google.tl images.google.tm images.google.to images.google.tt images.google.us images.google.vg images.google.vu images.google.ws".split(" "),
parameters:[ "q" ]
},
ABCsøk:{
domains:[ "abcsolk.no", "verden.abcsok.no" ],
parameters:[ "q" ]
},
"Google Product Search":{
domains:"google.ac/products google.ad/products google.ae/products google.am/products google.as/products google.at/products google.az/products google.ba/products google.be/products google.bf/products google.bg/products google.bi/products google.bj/products google.bs/products google.by/products google.ca/products google.cat/products google.cc/products google.cd/products google.cf/products google.cg/products google.ch/products google.ci/products google.cl/products google.cm/products google.cn/products google.co.bw/products google.co.ck/products google.co.cr/products google.co.id/products google.co.il/products google.co.in/products google.co.jp/products google.co.ke/products google.co.kr/products google.co.ls/products google.co.ma/products google.co.mz/products google.co.nz/products google.co.th/products google.co.tz/products google.co.ug/products google.co.uk/products google.co.uz/products google.co.ve/products google.co.vi/products google.co.za/products google.co.zm/products google.co.zw/products google.com/products google.com.af/products google.com.ag/products google.com.ai/products google.com.ar/products google.com.au/products google.com.bd/products google.com.bh/products google.com.bn/products google.com.bo/products google.com.br/products google.com.by/products google.com.bz/products google.com.co/products google.com.cu/products google.com.cy/products google.com.do/products google.com.ec/products google.com.eg/products google.com.et/products google.com.fj/products google.com.gh/products google.com.gi/products google.com.gt/products google.com.hk/products google.com.jm/products google.com.kh/products google.com.kh/products google.com.kw/products google.com.lb/products google.com.lc/products google.com.ly/products google.com.mt/products google.com.mx/products google.com.my/products google.com.na/products google.com.nf/products google.com.ng/products google.com.ni/products google.com.np/products google.com.om/products google.com.pa/products google.com.pe/products google.com.ph/products google.com.pk/products google.com.pr/products google.com.py/products google.com.qa/products google.com.sa/products google.com.sb/products google.com.sg/products google.com.sl/products google.com.sv/products google.com.tj/products google.com.tn/products google.com.tr/products google.com.tw/products google.com.ua/products google.com.uy/products google.com.vc/products google.com.vn/products google.cv/products google.cz/products google.de/products google.dj/products google.dk/products google.dm/products google.dz/products google.ee/products google.es/products google.fi/products google.fm/products google.fr/products google.ga/products google.gd/products google.ge/products google.gf/products google.gg/products google.gl/products google.gm/products google.gp/products google.gr/products google.gy/products google.hn/products google.hr/products google.ht/products google.hu/products google.ie/products google.im/products google.io/products google.iq/products google.is/products google.it/products google.it.ao/products google.je/products google.jo/products google.kg/products google.ki/products google.kz/products google.la/products google.li/products google.lk/products google.lt/products google.lu/products google.lv/products google.md/products google.me/products google.mg/products google.mk/products google.ml/products google.mn/products google.ms/products google.mu/products google.mv/products google.mw/products google.ne/products google.nl/products google.no/products google.nr/products google.nu/products google.pl/products google.pn/products google.ps/products google.pt/products google.ro/products google.rs/products google.ru/products google.rw/products google.sc/products google.se/products google.sh/products google.si/products google.sk/products google.sm/products google.sn/products google.so/products google.st/products google.td/products google.tg/products google.tk/products google.tl/products google.tm/products google.to/products google.tt/products google.us/products google.vg/products google.vu/products google.ws/products www.google.ac/products www.google.ad/products www.google.ae/products www.google.am/products www.google.as/products www.google.at/products www.google.az/products www.google.ba/products www.google.be/products www.google.bf/products www.google.bg/products www.google.bi/products www.google.bj/products www.google.bs/products www.google.by/products www.google.ca/products www.google.cat/products www.google.cc/products www.google.cd/products www.google.cf/products www.google.cg/products www.google.ch/products www.google.ci/products www.google.cl/products www.google.cm/products www.google.cn/products www.google.co.bw/products www.google.co.ck/products www.google.co.cr/products www.google.co.id/products www.google.co.il/products www.google.co.in/products www.google.co.jp/products www.google.co.ke/products www.google.co.kr/products www.google.co.ls/products www.google.co.ma/products www.google.co.mz/products www.google.co.nz/products www.google.co.th/products www.google.co.tz/products www.google.co.ug/products www.google.co.uk/products www.google.co.uz/products www.google.co.ve/products www.google.co.vi/products www.google.co.za/products www.google.co.zm/products www.google.co.zw/products www.google.com/products www.google.com.af/products www.google.com.ag/products www.google.com.ai/products www.google.com.ar/products www.google.com.au/products www.google.com.bd/products www.google.com.bh/products www.google.com.bn/products www.google.com.bo/products www.google.com.br/products www.google.com.by/products www.google.com.bz/products www.google.com.co/products www.google.com.cu/products www.google.com.cy/products www.google.com.do/products www.google.com.ec/products www.google.com.eg/products www.google.com.et/products www.google.com.fj/products www.google.com.gh/products www.google.com.gi/products www.google.com.gt/products www.google.com.hk/products www.google.com.jm/products www.google.com.kh/products www.google.com.kh/products www.google.com.kw/products www.google.com.lb/products www.google.com.lc/products www.google.com.ly/products www.google.com.mt/products www.google.com.mx/products www.google.com.my/products www.google.com.na/products www.google.com.nf/products www.google.com.ng/products www.google.com.ni/products www.google.com.np/products www.google.com.om/products www.google.com.pa/products www.google.com.pe/products www.google.com.ph/products www.google.com.pk/products www.google.com.pr/products www.google.com.py/products www.google.com.qa/products www.google.com.sa/products www.google.com.sb/products www.google.com.sg/products www.google.com.sl/products www.google.com.sv/products www.google.com.tj/products www.google.com.tn/products www.google.com.tr/products www.google.com.tw/products www.google.com.ua/products www.google.com.uy/products www.google.com.vc/products www.google.com.vn/products www.google.cv/products www.google.cz/products www.google.de/products www.google.dj/products www.google.dk/products www.google.dm/products www.google.dz/products www.google.ee/products www.google.es/products www.google.fi/products www.google.fm/products www.google.fr/products www.google.ga/products www.google.gd/products www.google.ge/products www.google.gf/products www.google.gg/products www.google.gl/products www.google.gm/products www.google.gp/products www.google.gr/products www.google.gy/products www.google.hn/products www.google.hr/products www.google.ht/products www.google.hu/products www.google.ie/products www.google.im/products www.google.io/products www.google.iq/products www.google.is/products www.google.it/products www.google.it.ao/products www.google.je/products www.google.jo/products www.google.kg/products www.google.ki/products www.google.kz/products www.google.la/products www.google.li/products www.google.lk/products www.google.lt/products www.google.lu/products www.google.lv/products www.google.md/products www.google.me/products www.google.mg/products www.google.mk/products www.google.ml/products www.google.mn/products www.google.ms/products www.google.mu/products www.google.mv/products www.google.mw/products www.google.ne/products www.google.nl/products www.google.no/products www.google.nr/products www.google.nu/products www.google.pl/products www.google.pn/products www.google.ps/products www.google.pt/products www.google.ro/products www.google.rs/products www.google.ru/products www.google.rw/products www.google.sc/products www.google.se/products www.google.sh/products www.google.si/products www.google.sk/products www.google.sm/products www.google.sn/products www.google.so/products www.google.st/products www.google.td/products www.google.tg/products www.google.tk/products www.google.tl/products www.google.tm/products www.google.to/products www.google.tt/products www.google.us/products www.google.vg/products www.google.vu/products www.google.ws/products".split(" "),
parameters:[ "q" ]
},
DasOertliche:{
domains:[ "www.dasoertliche.de" ],
parameters:[ "kw" ]
},
InfoSpace:{
domains:"infospace.com dogpile.com www.dogpile.com metacrawler.com webfetch.com webcrawler.com search.kiwee.com isearch.babylon.com start.facemoods.com search.magnetic.com search.searchcompletion.com clusty.com".split(" "),
parameters:[ "q", "s" ]
},
Weborama:{
domains:[ "www.weborama.com" ],
parameters:[ "QUERY" ]
},
Bluewin:{
domains:[ "search.bluewin.ch" ],
parameters:[ "searchTerm" ]
},
Neti:{
domains:[ "www.neti.ee" ],
parameters:[ "query" ]
},
Winamp:{
domains:[ "search.winamp.com" ],
parameters:[ "q" ]
},
Nigma:{
domains:[ "nigma.ru" ],
parameters:[ "s" ]
},
"Yahoo! Images":{
domains:[ "image.yahoo.cn", "images.search.yahoo.com" ],
parameters:[ "p", "q" ]
},
Exalead:{
domains:[ "www.exalead.fr", "www.exalead.com" ],
parameters:[ "q" ]
},
Teoma:{
domains:[ "www.teoma.com" ],
parameters:[ "q" ]
},
Needtofind:{
domains:[ "ko.search.need2find.com" ],
parameters:[ "searchfor" ]
},
Looksmart:{
domains:[ "www.looksmart.com" ],
parameters:[ "key" ]
},
"Wirtualna Polska":{
domains:[ "szukaj.wp.pl" ],
parameters:[ "szukaj" ]
},
Toolbarhome:{
domains:[ "www.toolbarhome.com", "vshare.toolbarhome.com" ],
parameters:[ "q" ]
},
Searchalot:{
domains:[ "searchalot.com" ],
parameters:[ "q" ]
},
Yandex:{
domains:"yandex.ru yandex.ua yandex.com www.yandex.ru www.yandex.ua www.yandex.com".split(" "),
parameters:[ "text" ]
},
"canoe.ca":{
domains:[ "web.canoe.ca" ],
parameters:[ "q" ]
},
Compuserve:{
domains:[ "websearch.cs.com" ],
parameters:[ "query" ]
},
Startpagina:{
domains:[ "startgoogle.startpagina.nl" ],
parameters:[ "q" ]
},
eo:{
domains:[ "eo.st" ],
parameters:[ "x_query" ]
},
Zhongsou:{
domains:[ "p.zhongsou.com" ],
parameters:[ "w" ]
},
"La Toile Du Quebec Via Google":{
domains:[ "www.toile.com", "web.toile.com" ],
parameters:[ "q" ]
},
Paperball:{
domains:[ "www.paperball.de" ],
parameters:[ "q" ]
},
"Jungle Spider":{
domains:[ "www.jungle-spider.de" ],
parameters:[ "q" ]
},
PeoplePC:{
domains:[ "search.peoplepc.com" ],
parameters:[ "q" ]
},
"MetaCrawler.de":{
domains:[ "s1.metacrawler.de", "s2.metacrawler.de", "s3.metacrawler.de" ],
parameters:[ "qry" ]
},
Orange:{
domains:[ "busca.orange.es", "search.orange.co.uk" ],
parameters:[ "q" ]
},
"Gule Sider":{
domains:[ "www.gulesider.no" ],
parameters:[ "q" ]
},
Francite:{
domains:[ "recherche.francite.com" ],
parameters:[ "name" ]
},
"Ask Toolbar":{
domains:[ "search.tb.ask.com" ],
parameters:[ "searchfor" ]
},
Aport:{
domains:[ "sm.aport.ru" ],
parameters:[ "r" ]
},
"Trusted-Search":{
domains:[ "www.trusted--search.com" ],
parameters:[ "w" ]
},
goo:{
domains:[ "search.goo.ne.jp", "ocnsearch.goo.ne.jp" ],
parameters:[ "MT" ]
},
"Fast Browser Search":{
domains:[ "www.fastbrowsersearch.com" ],
parameters:[ "q" ]
},
Blogpulse:{
domains:[ "www.blogpulse.com" ],
parameters:[ "query" ]
},
Volny:{
domains:[ "web.volny.cz" ],
parameters:[ "search" ]
},
Icerockeet:{
domains:[ "blogs.icerocket.com" ],
parameters:[ "q" ]
},
Terra:{
domains:[ "buscador.terra.es", "buscador.terra.cl", "buscador.terra.com.br" ],
parameters:[ "query" ]
},
Searchy:{
domains:[ "www.searchy.co.uk" ],
parameters:[ "q" ]
},
Onet:{
domains:[ "szukaj.onet.pl" ],
parameters:[ "qt" ]
},
Digg:{
domains:[ "digg.com" ],
parameters:[ "s" ]
},
Abacho:{
domains:"www.abacho.de www.abacho.com www.abacho.co.uk www.se.abacho.com www.tr.abacho.com www.abacho.at www.abacho.fr www.abacho.es www.abacho.ch www.abacho.it".split(" "),
parameters:[ "q" ]
},
maailm:{
domains:[ "www.maailm.com" ],
parameters:[ "tekst" ]
},
Flix:{
domains:[ "www.flix.de" ],
parameters:[ "keyword" ]
},
Suchnase:{
domains:[ "www.suchnase.de" ],
parameters:[ "q" ]
},
Freenet:{
domains:[ "suche.freenet.de" ],
parameters:[ "query", "Keywords" ]
},
DuckDuckGoL:{
domains:[ "duckduckgo.com" ],
parameters:[ "q" ]
},
"Poisk.ru":{
domains:[ "www.plazoo.com" ],
parameters:[ "q" ]
},
Sharelook:{
domains:[ "www.sharelook.fr" ],
parameters:[ "keyword" ]
},
Najdi:{
domains:[ "www.najdi.si" ],
parameters:[ "q" ]
},
Picsearch:{
domains:[ "www.picsearch.com" ],
parameters:[ "q" ]
},
"Mail.ru":{
domains:[ "go.mail.ru" ],
parameters:[ "q" ]
},
Alexa:{
domains:[ "alexa.com", "search.toolbars.alexa.com" ],
parameters:[ "q" ]
},
Metager:{
domains:[ "meta.rrzn.uni-hannover.de", "www.metager.de" ],
parameters:[ "eingabe" ]
},
Technorati:{
domains:[ "technorati.com" ],
parameters:[ "q" ]
},
WWW:{
domains:[ "search.www.ee" ],
parameters:[ "query" ]
},
"Trouvez.com":{
domains:[ "www.trouvez.com" ],
parameters:[ "query" ]
},
IXquick:{
domains:"ixquick.com www.eu.ixquick.com ixquick.de www.ixquick.de us.ixquick.com s1.us.ixquick.com s2.us.ixquick.com s3.us.ixquick.com s4.us.ixquick.com s5.us.ixquick.com eu.ixquick.com s8-eu.ixquick.com s1-eu.ixquick.de".split(" "),
parameters:[ "query" ]
},
Zapmeta:{
domains:[ "www.zapmeta.com", "www.zapmeta.nl", "www.zapmeta.de", "uk.zapmeta.com" ],
parameters:[ "q", "query" ]
},
Yippy:{
domains:[ "search.yippy.com" ],
parameters:[ "q", "query" ]
},
Gomeo:{
domains:[ "www.gomeo.com" ],
parameters:[ "Keywords" ]
},
Walhello:{
domains:[ "www.walhello.info", "www.walhello.com", "www.walhello.de", "www.walhello.nl" ],
parameters:[ "key" ]
},
Meta:{
domains:[ "meta.ua" ],
parameters:[ "q" ]
},
Skynet:{
domains:[ "www.skynet.be" ],
parameters:[ "q" ]
},
Blogdigger:{
domains:[ "www.blogdigger.com" ],
parameters:[ "q" ]
},
WebSearch:{
domains:[ "www.websearch.com" ],
parameters:[ "qkw", "q" ]
},
Rambler:{
domains:[ "nova.rambler.ru" ],
parameters:[ "query", "words" ]
},
Latne:{
domains:[ "www.latne.lv" ],
parameters:[ "q" ]
},
MySearch:{
domains:"www.mysearch.com ms114.mysearch.com ms146.mysearch.com kf.mysearch.myway.com ki.mysearch.myway.com search.myway.com search.mywebsearch.com".split(" "),
parameters:[ "searchfor", "searchFor" ]
},
Cuil:{
domains:[ "www.cuil.com" ],
parameters:[ "q" ]
},
Tixuma:{
domains:[ "www.tixuma.de" ],
parameters:[ "sc" ]
},
Sapo:{
domains:[ "pesquisa.sapo.pt" ],
parameters:[ "q" ]
},
Gnadenmeer:{
domains:[ "www.gnadenmeer.de" ],
parameters:[ "keyword" ]
},
Arcor:{
domains:[ "www.arcor.de" ],
parameters:[ "Keywords" ]
},
Naver:{
domains:[ "search.naver.com" ],
parameters:[ "query" ]
},
Zoeken:{
domains:[ "www.zoeken.nl" ],
parameters:[ "q" ]
},
Yam:{
domains:[ "search.yam.com" ],
parameters:[ "k" ]
},
Eniro:{
domains:[ "www.eniro.se" ],
parameters:[ "q", "search_word" ]
},
APOLL07:{
domains:[ "apollo7.de" ],
parameters:[ "query" ]
},
Biglobe:{
domains:[ "cgi.search.biglobe.ne.jp" ],
parameters:[ "q" ]
},
Mozbot:{
domains:[ "www.mozbot.fr", "www.mozbot.co.uk", "www.mozbot.com" ],
parameters:[ "q" ]
},
ICQ:{
domains:[ "www.icq.com", "search.icq.com" ],
parameters:[ "q" ]
},
Baidu:{
domains:"www.baidu.com www1.baidu.com zhidao.baidu.com tieba.baidu.com news.baidu.com web.gougou.com".split(" "),
parameters:[ "wd", "word", "kw", "k" ]
},
Conduit:{
domains:[ "search.conduit.com" ],
parameters:[ "q" ]
},
Austronaut:{
domains:[ "www2.austronaut.at", "www1.astronaut.at" ],
parameters:[ "q" ]
},
Vindex:{
domains:[ "www.vindex.nl", "search.vindex.nl" ],
parameters:[ "search_for" ]
},
TrovaRapido:{
domains:[ "www.trovarapido.com" ],
parameters:[ "q" ]
},
"Suchmaschine.com":{
domains:[ "www.suchmaschine.com" ],
parameters:[ "suchstr" ]
},
Lycos:{
domains:[ "search.lycos.com", "www.lycos.com", "lycos.com" ],
parameters:[ "query" ]
},
Vinden:{
domains:[ "www.vinden.nl" ],
parameters:[ "q" ]
},
Altavista:{
domains:"www.altavista.com search.altavista.com listings.altavista.com altavista.de altavista.fr be-nl.altavista.com be-fr.altavista.com".split(" "),
parameters:[ "q" ]
},
dmoz:{
domains:[ "dmoz.org", "editors.dmoz.org" ],
parameters:[ "q" ]
},
Ecosia:{
domains:[ "ecosia.org" ],
parameters:[ "q" ]
},
Maxwebsearch:{
domains:[ "maxwebsearch.com" ],
parameters:[ "query" ]
},
Euroseek:{
domains:[ "www.euroseek.com" ],
parameters:[ "string" ]
},
Bing:{
domains:"bing.com www.bing.com msnbc.msn.com dizionario.it.msn.com cc.bingj.com m.bing.com".split(" "),
parameters:[ "q", "Q" ]
},
"X-recherche":{
domains:[ "www.x-recherche.com" ],
parameters:[ "MOTS" ]
},
"Yandex Images":{
domains:[ "images.yandex.ru", "images.yandex.ua", "images.yandex.com" ],
parameters:[ "text" ]
},
GMX:{
domains:[ "suche.gmx.net" ],
parameters:[ "su" ]
},
"Daemon search":{
domains:[ "daemon-search.com", "my.daemon-search.com" ],
parameters:[ "q" ]
},
"Jungle Key":{
domains:[ "junglekey.com", "junglekey.fr" ],
parameters:[ "query" ]
},
Firstfind:{
domains:[ "www.firstsfind.com" ],
parameters:[ "qry" ]
},
Crawler:{
domains:[ "www.crawler.com" ],
parameters:[ "q" ]
},
Holmes:{
domains:[ "holmes.ge" ],
parameters:[ "q" ]
},
Charter:{
domains:[ "www.charter.net" ],
parameters:[ "q" ]
},
Ilse:{
domains:[ "www.ilse.nl" ],
parameters:[ "search_for" ]
},
earthlink:{
domains:[ "search.earthlink.net" ],
parameters:[ "q" ]
},
Qualigo:{
domains:[ "www.qualigo.at", "www.qualigo.ch", "www.qualigo.de", "www.qualigo.nl" ],
parameters:[ "q" ]
},
"El Mundo":{
domains:[ "ariadna.elmundo.es" ],
parameters:[ "q" ]
},
Metager2:{
domains:[ "metager2.de" ],
parameters:[ "q" ]
},
Forestle:{
domains:[ "forestle.org", "www.forestle.org", "forestle.mobi" ],
parameters:[ "q" ]
},
"Search.ch":{
domains:[ "www.search.ch" ],
parameters:[ "q" ]
},
Meinestadt:{
domains:[ "www.meinestadt.de" ],
parameters:[ "words" ]
},
Freshweather:{
domains:[ "www.fresh-weather.com" ],
parameters:[ "q" ]
},
AllTheWeb:{
domains:[ "www.alltheweb.com" ],
parameters:[ "q" ]
},
Zoek:{
domains:[ "www3.zoek.nl" ],
parameters:[ "q" ]
},
Daum:{
domains:[ "search.daum.net" ],
parameters:[ "q" ]
},
Marktplaats:{
domains:[ "www.marktplaats.nl" ],
parameters:[ "query" ]
},
"suche.info":{
domains:[ "suche.info" ],
parameters:[ "q" ]
},
"Google News":{
domains:"news.google.ac news.google.ad news.google.ae news.google.am news.google.as news.google.at news.google.az news.google.ba news.google.be news.google.bf news.google.bg news.google.bi news.google.bj news.google.bs news.google.by news.google.ca news.google.cat news.google.cc news.google.cd news.google.cf news.google.cg news.google.ch news.google.ci news.google.cl news.google.cm news.google.cn news.google.co.bw news.google.co.ck news.google.co.cr news.google.co.id news.google.co.il news.google.co.in news.google.co.jp news.google.co.ke news.google.co.kr news.google.co.ls news.google.co.ma news.google.co.mz news.google.co.nz news.google.co.th news.google.co.tz news.google.co.ug news.google.co.uk news.google.co.uz news.google.co.ve news.google.co.vi news.google.co.za news.google.co.zm news.google.co.zw news.google.com news.google.com.af news.google.com.ag news.google.com.ai news.google.com.ar news.google.com.au news.google.com.bd news.google.com.bh news.google.com.bn news.google.com.bo news.google.com.br news.google.com.by news.google.com.bz news.google.com.co news.google.com.cu news.google.com.cy news.google.com.do news.google.com.ec news.google.com.eg news.google.com.et news.google.com.fj news.google.com.gh news.google.com.gi news.google.com.gt news.google.com.hk news.google.com.jm news.google.com.kh news.google.com.kh news.google.com.kw news.google.com.lb news.google.com.lc news.google.com.ly news.google.com.mt news.google.com.mx news.google.com.my news.google.com.na news.google.com.nf news.google.com.ng news.google.com.ni news.google.com.np news.google.com.om news.google.com.pa news.google.com.pe news.google.com.ph news.google.com.pk news.google.com.pr news.google.com.py news.google.com.qa news.google.com.sa news.google.com.sb news.google.com.sg news.google.com.sl news.google.com.sv news.google.com.tj news.google.com.tn news.google.com.tr news.google.com.tw news.google.com.ua news.google.com.uy news.google.com.vc news.google.com.vn news.google.cv news.google.cz news.google.de news.google.dj news.google.dk news.google.dm news.google.dz news.google.ee news.google.es news.google.fi news.google.fm news.google.fr news.google.ga news.google.gd news.google.ge news.google.gf news.google.gg news.google.gl news.google.gm news.google.gp news.google.gr news.google.gy news.google.hn news.google.hr news.google.ht news.google.hu news.google.ie news.google.im news.google.io news.google.iq news.google.is news.google.it news.google.it.ao news.google.je news.google.jo news.google.kg news.google.ki news.google.kz news.google.la news.google.li news.google.lk news.google.lt news.google.lu news.google.lv news.google.md news.google.me news.google.mg news.google.mk news.google.ml news.google.mn news.google.ms news.google.mu news.google.mv news.google.mw news.google.ne news.google.nl news.google.no news.google.nr news.google.nu news.google.pl news.google.pn news.google.ps news.google.pt news.google.ro news.google.rs news.google.ru news.google.rw news.google.sc news.google.se news.google.sh news.google.si news.google.sk news.google.sm news.google.sn news.google.so news.google.st news.google.td news.google.tg news.google.tk news.google.tl news.google.tm news.google.to news.google.tt news.google.us news.google.vg news.google.vu news.google.ws".split(" "),
parameters:[ "q" ]
},
Zoohoo:{
domains:[ "zoohoo.cz" ],
parameters:[ "q" ]
},
Seznam:{
domains:[ "search.seznam.cz" ],
parameters:[ "q" ]
},
"Online.no":{
domains:[ "online.no" ],
parameters:[ "q" ]
},
Eurip:{
domains:[ "www.eurip.com" ],
parameters:[ "q" ]
},
"all.by":{
domains:[ "all.by" ],
parameters:[ "query" ]
},
"Road Runner Search":{
domains:[ "search.rr.com" ],
parameters:[ "q" ]
},
"Opplysningen 1881":{
domains:[ "www.1881.no" ],
parameters:[ "Query" ]
},
YouGoo:{
domains:[ "www.yougoo.fr" ],
parameters:[ "q" ]
},
"Bing Images":{
domains:[ "bing.com/images/search", "www.bing.com/images/search" ],
parameters:[ "q", "Q" ]
},
Geona:{
domains:[ "geona.net" ],
parameters:[ "q" ]
},
Nate:{
domains:[ "search.nate.com" ],
parameters:[ "q" ]
},
"T-Online":{
domains:[ "suche.t-online.de", "brisbane.t-online.de", "navigationshilfe.t-online.de" ],
parameters:[ "q" ]
},
Hotbot:{
domains:[ "www.hotbot.com" ],
parameters:[ "query" ]
},
Kvasir:{
domains:[ "www.kvasir.no" ],
parameters:[ "q" ]
},
Babylon:{
domains:[ "search.babylon.com", "searchassist.babylon.com" ],
parameters:[ "q" ]
},
Excite:{
domains:"search.excite.it search.excite.fr search.excite.de search.excite.co.uk serach.excite.es search.excite.nl msxml.excite.com www.excite.co.jp".split(" "),
parameters:[ "q", "search" ]
},
qip:{
domains:[ "search.qip.ru" ],
parameters:[ "query" ]
},
"Yahoo!":{
domains:"search.yahoo.com yahoo.com ar.search.yahoo.com ar.yahoo.com au.search.yahoo.com au.yahoo.com br.search.yahoo.com br.yahoo.com cade.searchde.yahoo.com cade.yahoo.com chinese.searchinese.yahoo.com chinese.yahoo.com cn.search.yahoo.com cn.yahoo.com de.search.yahoo.com de.yahoo.com dk.search.yahoo.com dk.yahoo.com es.search.yahoo.com es.yahoo.com espanol.searchpanol.yahoo.com espanol.searchpanol.yahoo.com espanol.yahoo.com espanol.yahoo.com fr.search.yahoo.com fr.yahoo.com ie.search.yahoo.com ie.yahoo.com it.search.yahoo.com it.yahoo.com kr.search.yahoo.com kr.yahoo.com mx.search.yahoo.com mx.yahoo.com no.search.yahoo.com no.yahoo.com nz.search.yahoo.com nz.yahoo.com one.cn.yahoo.com one.searchn.yahoo.com qc.search.yahoo.com qc.search.yahoo.com qc.search.yahoo.com qc.yahoo.com qc.yahoo.com se.search.yahoo.com se.search.yahoo.com se.yahoo.com search.searcharch.yahoo.com search.yahoo.com uk.search.yahoo.com uk.yahoo.com www.yahoo.co.jp search.yahoo.co.jp www.cercato.it search.offerbox.com ys.mirostart.com".split(" "),
parameters:[ "p", "q" ]
},
"URL.ORGanizier":{
domains:[ "www.url.org" ],
parameters:[ "q" ]
},
Witch:{
domains:[ "www.witch.de" ],
parameters:[ "search" ]
},
"Mister Wong":{
domains:[ "www.mister-wong.com", "www.mister-wong.de" ],
parameters:[ "Keywords" ]
},
Startsiden:{
domains:[ "www.startsiden.no" ],
parameters:[ "q" ]
},
"Web.de":{
domains:[ "suche.web.de" ],
parameters:[ "su" ]
},
Ask:{
domains:"ask.com www.ask.com web.ask.com int.ask.com mws.ask.com uk.ask.com images.ask.com ask.reference.com www.askkids.com iwon.ask.com www.ask.co.uk www.qbyrd.com search-results.com uk.search-results.com www.search-results.com int.search-results.com".split(" "),
parameters:[ "q" ]
},
Centrum:{
domains:[ "serach.centrum.cz", "morfeo.centrum.cz" ],
parameters:[ "q" ]
},
Everyclick:{
domains:[ "www.everyclick.com" ],
parameters:[ "keyword" ]
},
"Google Video":{
domains:[ "video.google.com" ],
parameters:[ "q" ]
},
Delfi:{
domains:[ "otsing.delfi.ee" ],
parameters:[ "q" ]
},
blekko:{
domains:[ "blekko.com" ],
parameters:[ "q" ]
},
Jyxo:{
domains:[ "jyxo.1188.cz" ],
parameters:[ "q" ]
},
Kataweb:{
domains:[ "www.kataweb.it" ],
parameters:[ "q" ]
},
"uol.com.br":{
domains:[ "busca.uol.com.br" ],
parameters:[ "q" ]
},
Arianna:{
domains:[ "arianna.libero.it", "www.arianna.com" ],
parameters:[ "query" ]
},
Mamma:{
domains:[ "www.mamma.com", "mamma75.mamma.com" ],
parameters:[ "query" ]
},
Yatedo:{
domains:[ "www.yatedo.com", "www.yatedo.fr" ],
parameters:[ "q" ]
},
Twingly:{
domains:[ "www.twingly.com" ],
parameters:[ "q" ]
},
"Delfi latvia":{
domains:[ "smart.delfi.lv" ],
parameters:[ "q" ]
},
PriceRunner:{
domains:[ "www.pricerunner.co.uk" ],
parameters:[ "q" ]
},
Rakuten:{
domains:[ "websearch.rakuten.co.jp" ],
parameters:[ "qt" ]
},
Google:{
domains:"www.google.com www.google.ac www.google.ad www.google.com.af www.google.com.ag www.google.com.ai www.google.am www.google.it.ao www.google.com.ar www.google.as www.google.at www.google.com.au www.google.az www.google.ba www.google.com.bd www.google.be www.google.bf www.google.bg www.google.com.bh www.google.bi www.google.bj www.google.com.bn www.google.com.bo www.google.com.br www.google.bs www.google.co.bw www.google.com.by www.google.by www.google.com.bz www.google.ca www.google.com.kh www.google.cc www.google.cd www.google.cf www.google.cat www.google.cg www.google.ch www.google.ci www.google.co.ck www.google.cl www.google.cm www.google.cn www.google.com.co www.google.co.cr www.google.com.cu www.google.cv www.google.com.cy www.google.cz www.google.de www.google.dj www.google.dk www.google.dm www.google.com.do www.google.dz www.google.com.ec www.google.ee www.google.com.eg www.google.es www.google.com.et www.google.fi www.google.com.fj www.google.fm www.google.fr www.google.ga www.google.gd www.google.ge www.google.gf www.google.gg www.google.com.gh www.google.com.gi www.google.gl www.google.gm www.google.gp www.google.gr www.google.com.gt www.google.gy www.google.com.hk www.google.hn www.google.hr www.google.ht www.google.hu www.google.co.id www.google.iq www.google.ie www.google.co.il www.google.im www.google.co.in www.google.io www.google.is www.google.it www.google.je www.google.com.jm www.google.jo www.google.co.jp www.google.co.ke www.google.com.kh www.google.ki www.google.kg www.google.co.kr www.google.com.kw www.google.kz www.google.la www.google.com.lb www.google.com.lc www.google.li www.google.lk www.google.co.ls www.google.lt www.google.lu www.google.lv www.google.com.ly www.google.co.ma www.google.md www.google.me www.google.mg www.google.mk www.google.ml www.google.mn www.google.ms www.google.com.mt www.google.mu www.google.mv www.google.mw www.google.com.mx www.google.com.my www.google.co.mz www.google.com.na www.google.ne www.google.com.nf www.google.com.ng www.google.com.ni www.google.nl www.google.no www.google.com.np www.google.nr www.google.nu www.google.co.nz www.google.com.om www.google.com.pa www.google.com.pe www.google.com.ph www.google.com.pk www.google.pl www.google.pn www.google.com.pr www.google.ps www.google.pt www.google.com.py www.google.com.qa www.google.ro www.google.rs www.google.ru www.google.rw www.google.com.sa www.google.com.sb www.google.sc www.google.se www.google.com.sg www.google.sh www.google.si www.google.sk www.google.com.sl www.google.sn www.google.sm www.google.so www.google.st www.google.com.sv www.google.td www.google.tg www.google.co.th www.google.com.tj www.google.tk www.google.tl www.google.tm www.google.to www.google.com.tn www.google.com.tr www.google.tt www.google.com.tw www.google.co.tz www.google.com.ua www.google.co.ug www.google.ae www.google.co.uk www.google.us www.google.com.uy www.google.co.uz www.google.com.vc www.google.co.ve www.google.vg www.google.co.vi www.google.com.vn www.google.vu www.google.ws www.google.co.za www.google.co.zm www.google.co.zw google.com google.ac google.ad google.com.af google.com.ag google.com.ai google.am google.it.ao google.com.ar google.as google.at google.com.au google.az google.ba google.com.bd google.be google.bf google.bg google.com.bh google.bi google.bj google.com.bn google.com.bo google.com.br google.bs google.co.bw google.com.by google.by google.com.bz google.ca google.com.kh google.cc google.cd google.cf google.cat google.cg google.ch google.ci google.co.ck google.cl google.cm google.cn google.com.co google.co.cr google.com.cu google.cv google.com.cy google.cz google.de google.dj google.dk google.dm google.com.do google.dz google.com.ec google.ee google.com.eg google.es google.com.et google.fi google.com.fj google.fm google.fr google.ga google.gd google.ge google.gf google.gg google.com.gh google.com.gi google.gl google.gm google.gp google.gr google.com.gt google.gy google.com.hk google.hn google.hr google.ht google.hu google.co.id google.iq google.ie google.co.il google.im google.co.in google.io google.is google.it google.je google.com.jm google.jo google.co.jp google.co.ke google.com.kh google.ki google.kg google.co.kr google.com.kw google.kz google.la google.com.lb google.com.lc google.li google.lk google.co.ls google.lt google.lu google.lv google.com.ly google.co.ma google.md google.me google.mg google.mk google.ml google.mn google.ms google.com.mt google.mu google.mv google.mw google.com.mx google.com.my google.co.mz google.com.na google.ne google.com.nf google.com.ng google.com.ni google.nl google.no google.com.np google.nr google.nu google.co.nz google.com.om google.com.pa google.com.pe google.com.ph google.com.pk google.pl google.pn google.com.pr google.ps google.pt google.com.py google.com.qa google.ro google.rs google.ru google.rw google.com.sa google.com.sb google.sc google.se google.com.sg google.sh google.si google.sk google.com.sl google.sn google.sm google.so google.st google.com.sv google.td google.tg google.co.th google.com.tj google.tk google.tl google.tm google.to google.com.tn google.com.tr google.tt google.com.tw google.co.tz google.com.ua google.co.ug google.ae google.co.uk google.us google.com.uy google.co.uz google.com.vc google.co.ve google.vg google.co.vi google.com.vn google.vu google.ws google.co.za google.co.zm google.co.zw search.avg.com isearch.avg.com www.cnn.com darkoogle.com search.darkoogle.com search.foxtab.com www.gooofullsearch.com search.hiyo.com search.incredimail.com search1.incredimail.com search2.incredimail.com search3.incredimail.com search4.incredimail.com search.incredibar.com search.sweetim.com www.fastweb.it search.juno.com find.tdc.dk searchresults.verizon.com search.walla.co.il search.alot.com www.googleearth.de www.googleearth.fr webcache.googleusercontent.com encrypted.google.com googlesyndicatedsearch.com".split(" "),
parameters:[ "q", "query", "Keywords" ]
},
"Google Blogsearch":{
domains:"blogsearch.google.ac blogsearch.google.ad blogsearch.google.ae blogsearch.google.am blogsearch.google.as blogsearch.google.at blogsearch.google.az blogsearch.google.ba blogsearch.google.be blogsearch.google.bf blogsearch.google.bg blogsearch.google.bi blogsearch.google.bj blogsearch.google.bs blogsearch.google.by blogsearch.google.ca blogsearch.google.cat blogsearch.google.cc blogsearch.google.cd blogsearch.google.cf blogsearch.google.cg blogsearch.google.ch blogsearch.google.ci blogsearch.google.cl blogsearch.google.cm blogsearch.google.cn blogsearch.google.co.bw blogsearch.google.co.ck blogsearch.google.co.cr blogsearch.google.co.id blogsearch.google.co.il blogsearch.google.co.in blogsearch.google.co.jp blogsearch.google.co.ke blogsearch.google.co.kr blogsearch.google.co.ls blogsearch.google.co.ma blogsearch.google.co.mz blogsearch.google.co.nz blogsearch.google.co.th blogsearch.google.co.tz blogsearch.google.co.ug blogsearch.google.co.uk blogsearch.google.co.uz blogsearch.google.co.ve blogsearch.google.co.vi blogsearch.google.co.za blogsearch.google.co.zm blogsearch.google.co.zw blogsearch.google.com blogsearch.google.com.af blogsearch.google.com.ag blogsearch.google.com.ai blogsearch.google.com.ar blogsearch.google.com.au blogsearch.google.com.bd blogsearch.google.com.bh blogsearch.google.com.bn blogsearch.google.com.bo blogsearch.google.com.br blogsearch.google.com.by blogsearch.google.com.bz blogsearch.google.com.co blogsearch.google.com.cu blogsearch.google.com.cy blogsearch.google.com.do blogsearch.google.com.ec blogsearch.google.com.eg blogsearch.google.com.et blogsearch.google.com.fj blogsearch.google.com.gh blogsearch.google.com.gi blogsearch.google.com.gt blogsearch.google.com.hk blogsearch.google.com.jm blogsearch.google.com.kh blogsearch.google.com.kh blogsearch.google.com.kw blogsearch.google.com.lb blogsearch.google.com.lc blogsearch.google.com.ly blogsearch.google.com.mt blogsearch.google.com.mx blogsearch.google.com.my blogsearch.google.com.na blogsearch.google.com.nf blogsearch.google.com.ng blogsearch.google.com.ni blogsearch.google.com.np blogsearch.google.com.om blogsearch.google.com.pa blogsearch.google.com.pe blogsearch.google.com.ph blogsearch.google.com.pk blogsearch.google.com.pr blogsearch.google.com.py blogsearch.google.com.qa blogsearch.google.com.sa blogsearch.google.com.sb blogsearch.google.com.sg blogsearch.google.com.sl blogsearch.google.com.sv blogsearch.google.com.tj blogsearch.google.com.tn blogsearch.google.com.tr blogsearch.google.com.tw blogsearch.google.com.ua blogsearch.google.com.uy blogsearch.google.com.vc blogsearch.google.com.vn blogsearch.google.cv blogsearch.google.cz blogsearch.google.de blogsearch.google.dj blogsearch.google.dk blogsearch.google.dm blogsearch.google.dz blogsearch.google.ee blogsearch.google.es blogsearch.google.fi blogsearch.google.fm blogsearch.google.fr blogsearch.google.ga blogsearch.google.gd blogsearch.google.ge blogsearch.google.gf blogsearch.google.gg blogsearch.google.gl blogsearch.google.gm blogsearch.google.gp blogsearch.google.gr blogsearch.google.gy blogsearch.google.hn blogsearch.google.hr blogsearch.google.ht blogsearch.google.hu blogsearch.google.ie blogsearch.google.im blogsearch.google.io blogsearch.google.iq blogsearch.google.is blogsearch.google.it blogsearch.google.it.ao blogsearch.google.je blogsearch.google.jo blogsearch.google.kg blogsearch.google.ki blogsearch.google.kz blogsearch.google.la blogsearch.google.li blogsearch.google.lk blogsearch.google.lt blogsearch.google.lu blogsearch.google.lv blogsearch.google.md blogsearch.google.me blogsearch.google.mg blogsearch.google.mk blogsearch.google.ml blogsearch.google.mn blogsearch.google.ms blogsearch.google.mu blogsearch.google.mv blogsearch.google.mw blogsearch.google.ne blogsearch.google.nl blogsearch.google.no blogsearch.google.nr blogsearch.google.nu blogsearch.google.pl blogsearch.google.pn blogsearch.google.ps blogsearch.google.pt blogsearch.google.ro blogsearch.google.rs blogsearch.google.ru blogsearch.google.rw blogsearch.google.sc blogsearch.google.se blogsearch.google.sh blogsearch.google.si blogsearch.google.sk blogsearch.google.sm blogsearch.google.sn blogsearch.google.so blogsearch.google.st blogsearch.google.td blogsearch.google.tg blogsearch.google.tk blogsearch.google.tl blogsearch.google.tm blogsearch.google.to blogsearch.google.tt blogsearch.google.us blogsearch.google.vg blogsearch.google.vu blogsearch.google.ws".split(" "),
parameters:[ "q" ]
},
Amazon:{
domains:[ "amazon.com", "www.amazon.com" ],
parameters:[ "keywords" ]
},
"Hooseek.com":{
domains:[ "www.hooseek.com" ],
parameters:[ "recherche" ]
},
Dalesearch:{
domains:[ "www.dalesearch.com" ],
parameters:[ "q" ]
},
"Alice Adsl":{
domains:[ "rechercher.aliceadsl.fr" ],
parameters:[ "q" ]
},
"soso.com":{
domains:[ "www.soso.com" ],
parameters:[ "w" ]
},
Sogou:{
domains:[ "www.sougou.com" ],
parameters:[ "query" ]
},
"Hit-Parade":{
domains:[ "req.-hit-parade.com", "class.hit-parade.com", "www.hit-parade.com" ],
parameters:[ "p7" ]
},
SearchCanvas:{
domains:[ "www.searchcanvas.com" ],
parameters:[ "q" ]
},
Interia:{
domains:[ "www.google.interia.pl" ],
parameters:[ "q" ]
},
Tiscali:{
domains:[ "search.tiscali.it", "search-dyn.tiscali.it", "hledani.tiscali.cz" ],
parameters:[ "q", "key" ]
},
Clix:{
domains:[ "pesquisa.clix.pt" ],
parameters:[ "question" ]
}
},
email:{
"Outlook.com":{
domains:[ "mail.live.com" ]
},
"Orange Webmail":{
domains:[ "orange.fr/webmail" ]
},
"Yahoo! Mail":{
domains:[ "mail.yahoo.net", "mail.yahoo.com", "mail.yahoo.co.uk" ]
},
Gmail:{
domains:[ "mail.google.com" ]
}
},
social:{
hi5:{
domains:[ "hi5.com" ]
},
Friendster:{
domains:[ "friendster.com" ]
},
Weibo:{
domains:[ "weibo.com", "t.cn" ]
},
Xanga:{
domains:[ "xanga.com" ]
},
Myspace:{
domains:[ "myspace.com" ]
},
Buzznet:{
domains:[ "wayn.com" ]
},
MyLife:{
domains:[ "mylife.ru" ]
},
Flickr:{
domains:[ "flickr.com" ]
},
"Sonico.com":{
domains:[ "sonico.com" ]
},
Odnoklassniki:{
domains:[ "odnoklassniki.ru" ]
},
GitHub:{
domains:[ "github.com" ]
},
Classmates:{
domains:[ "classmates.com" ]
},
"Friends Reunited":{
domains:[ "friendsreunited.com" ]
},
Renren:{
domains:[ "renren.com" ]
},
"vKruguDruzei.ru":{
domains:[ "vkrugudruzei.ru" ]
},
"Gaia Online":{
domains:[ "gaiaonline.com" ]
},
Netlog:{
domains:[ "netlog.com" ]
},
Orkut:{
domains:[ "orkut.com" ]
},
MyHeritage:{
domains:[ "myheritage.com" ]
},
Multiply:{
domains:[ "multiply.com" ]
},
myYearbook:{
domains:[ "myyearbook.com" ]
},
WeeWorld:{
domains:[ "weeworld.com" ]
},
Geni:{
domains:[ "geni.com" ]
},
SourceForge:{
domains:[ "sourceforge.net" ]
},
Plaxo:{
domains:[ "plaxo.com" ]
},
"Taringa!":{
domains:[ "taringa.net" ]
},
Tagged:{
domains:[ "login.tagged.com" ]
},
XING:{
domains:[ "xing.com" ]
},
Vkontakte:{
domains:[ "vk.com", "vkontakte.ru" ]
},
Twitter:{
domains:[ "twitter.com", "t.co" ]
},
WAYN:{
domains:[ "wayn.com" ]
},
Tuenti:{
domains:[ "tuenti.com" ]
},
"Mail.ru":{
domains:[ "my.mail.ru" ]
},
Badoo:{
domains:[ "badoo.com" ]
},
Habbo:{
domains:[ "habbo.com" ]
},
Pinterest:{
domains:[ "pinterest.com" ]
},
LinkedIn:{
domains:[ "linkedin.com" ]
},
Foursquare:{
domains:[ "foursquare.com" ]
},
Flixster:{
domains:[ "flixster.com" ]
},
"Windows Live Spaces":{
domains:[ "login.live.com" ]
},
BlackPlanet:{
domains:[ "blackplanet.com" ]
},
Cyworld:{
domains:[ "global.cyworld.com" ]
},
Skyrock:{
domains:[ "skyrock.com" ]
},
Facebook:{
domains:[ "facebook.com", "fb.me" ]
},
StudiVZ:{
domains:[ "studivz.net" ]
},
Fotolog:{
domains:[ "fotolog.com" ]
},
"Google+":{
domains:[ "url.google.com", "plus.google.com" ]
},
"Nasza-klasa.pl":{
domains:[ "nk.pl" ]
},
Douban:{
domains:[ "douban.com" ]
},
Bebo:{
domains:[ "bebo.com" ]
},
Reddit:{
domains:[ "reddit.com" ]
},
"Identi.ca":{
domains:[ "identi.ca" ]
},
StackOverflow:{
domains:[ "stackoverflow.com" ]
},
Mixi:{
domains:[ "mixi.jp" ]
},
StumbleUpon:{
domains:[ "stumbleupon.com" ]
},
Viadeo:{
domains:[ "viadeo.com" ]
},
"Last.fm":{
domains:[ "lastfm.ru" ]
},
LiveJournal:{
domains:[ "livejournal.ru" ]
},
Tumblr:{
domains:[ "tumblr.com" ]
},
"Hacker News":{
domains:[ "news.ycombinator.com" ]
},
Qzone:{
domains:[ "qzone.qq.com" ]
},
Hyves:{
domains:[ "hyves.nl" ]
},
"Paper.li":{
domains:[ "paper.li" ]
},
"MoiKrug.ru":{
domains:[ "moikrug.ru" ]
}
}
};
}.call(this), function() {
$B.QueryStringParser = function() {
function e(e) {
var t, o;
if (this.query_params = {}, !document || !document.createElement) throw "This needs to be run in an HTML context with a document.";
t = document.createElement("a"), t.href = e, this.url = e, this.origin = t.origin ? t.origin :[ t.protocol, "//", t.host ].join(""), 
this.protocol = t.protocol, this.pathname = t.pathname, this.hostname = t.hostname, 
this.hash = t.hash, o = this, _.each(t.search.substr(1).split("&"), function(e) {
var t;
return t = e.split("="), o.query_params[t[0]] = t[1];
});
}
return e.prototype.toString = function() {
var e, t;
return t = _.compact(_.map(this.query_params, function(e, t) {
return "undefined" != typeof e && null !== e ? [ t, e ].join("=") :void 0;
})).join("&"), e = [ this.origin, this.pathname ].join(""), t && (e += "?" + t), 
this.hash && (e += this.hash), e;
}, e;
}(), $B.ReferrerParser = function() {
function e(e, t) {
var o;
this.url = t, this.referrers_map = this.loadReferrers(e), this.known = !1, this.referrer = null, 
this.medium = "unknown", this.search_parameter = null, this.search_term = null, 
o = new $B.QueryStringParser(this.url), this.host = o.hostname, this.path = o.pathname, 
this.referrer = this.lookup_referrer(this.host, this.path);
}
return e.prototype.lookup_referrer = function(e) {
var t;
return t = this.referrers_map[e];
}, e.prototype.loadReferrers = function(e) {
var t, o, n, r, i, a;
a = {};
for (n in e) {
t = e[n];
for (i in t) o = t[i], r = null, o.parameters && (r = o.parameters.map(function(e) {
return e.toLowerCase();
})), o.domains.forEach(function(e) {
return a[e] = {
name:i,
medium:n
}, r ? a[e].params = r :void 0;
});
}
return a;
}, e;
}();
}.call(this), function() {
var e = function(e, t) {
return function() {
return e.apply(t, arguments);
};
};
$B.UserAnalyticsEngine = function() {
function t(t, o, n) {
this.user_id = t, this.user_email = o, this.urlBase = n, this.save = e(this.save, this), 
this.track = e(this.track, this), this.trackWithoutExternalService = e(this.trackWithoutExternalService, this), 
null == this.urlBase && (this.urlBase = $S.global_conf.BOBCAT_ANALYTICS_POST_URL);
}
return t.prototype.trackWithoutExternalService = function(e) {
return this.user_id && this.user_email ? this.save(this.user_id, e) :void 0;
}, t.prototype.track = function(e, t) {
return "function" == typeof $B.log && $B.log("[TRACKING] " + e, t), window.analytics.track(e, t), 
this.user_id && this.user_email ? this.save(this.user_id, e) :void 0;
}, t.prototype.save = function(e, t) {
var o = this;
return $.ajax({
type:"POST",
url:"" + this.urlBase + "/events",
data:{
user_id:e,
event:t
},
success:function(e) {
return "Editor - edit" === t ? _veroq.push([ "user", {
id:o.user_id,
edit_count:e.count
} ]) :void 0;
},
dataType:"json"
});
}, t;
}(), $B.PageAnalyticsEngine = function() {
function t(t) {
this.pageData = t, this.sendPbsConversion = e(this.sendPbsConversion, this), this.sendPbsImpression = e(this.sendPbsImpression, this), 
this.normalizedReferrer = e(this.normalizedReferrer, this), this.sendDataKeenIO = e(this.sendDataKeenIO, this), 
this.logSocialClicks = e(this.logSocialClicks, this), this.logPageView = e(this.logPageView, this), 
this.baseData = {
pageId:this.pageData.page_id,
userId:this.pageData.user_id,
permalink:this.pageData.permalink,
referrer:document.referrer,
membership:this.pageData.membership,
createdAt:this.pageData.created_at,
strikinglyBranding:this.pageData.showStrikinglyLogo
};
}
return t.prototype.pingInterval = 1e4, t.prototype.setInternalTracking = function() {
var e, t;
return (t = $S.page_meta.strk_upvt) ? (e = {
thm:this.pageData.theme.name,
mem:this.pageData.membership,
brd:this.pageData.showStrikinglyLogo,
v:t
}, $("<iframe />", {
name:"strk-tracking",
id:"strk-tracking",
src:"//b.strikingly.com/ping.html?" + $.param(e)
}).appendTo("body")) :void 0;
}, t.prototype.gaPushUserSite = function(e) {
return _gaq.push(e), e[0] = "b." + e[0], _gaq.push(e);
}, t.prototype.trackPageEvent = function() {
var e, t = this;
return e = function(e, o) {
var n;
return n = t, function(t) {
var r, i, a;
return a = $(this), r = {
url:a.attr("href"),
target:a.attr("target"),
text:a.text()
}, window.edit_page.Event.publish(e, r), n.gaPushUserSite([ "_setCustomVar", 1, "url", r.url, 3 ]), 
n.gaPushUserSite([ "_setCustomVar", 2, "text", r.text, 3 ]), n.gaPushUserSite([ "_trackEvent", "Actions", o.gaEventName, r.text ]), 
i = "string" == typeof r.url && "#" !== r.url[0], r.url && "_blank" !== r.target && i ? (t.preventDefault(), 
setTimeout(function() {
return window.location.href = r.url;
}, 500)) :void 0;
};
}, $("[data-component='button']").click(e("Site.button.click", {
gaEventName:"ButtonClick"
}));
}, t.prototype.logPageView = function() {
var e, t, o, n, r;
e = _.extend({
eventName:"PageView"
}, this.baseData), t = 1, r = this.baseData;
for (o in r) n = r[o], this.gaPushUserSite([ "_setCustomVar", t, o, n, 3 ]), ++t;
return this.gaPushUserSite([ "_trackEvent", "Page", e.eventName ]), this.sendDataKeenIO(this.baseData);
}, t.prototype.logSocialClicks = function(e) {
var t;
return t = _.extend({
eventName:"SocialClicks",
channel:e
}, this.baseData);
}, t.prototype.sendDataKeenIO = function(e) {
var t, o;
return o = e.referrer.split("/")[2], t = _.extend({
keen:{
addons:[ {
name:"keen:ip_to_geo",
input:{
ip:"ip_address"
},
output:"ip_geo_info"
}, {
name:"keen:ua_parser",
input:{
ua_string:"user_agent"
},
output:"parsed_user_agent"
} ]
},
ip_address:"${keen.ip}",
user_agent:"${keen.user_agent}",
host:document.location.host,
referrer_host:o,
normalized_referrer:this.normalizedReferrer(e.referrer)
}, e), Keen.addEvent($S.conf.keenio_collection, t);
}, t.prototype.normalizedReferrer = function(e) {
var t, o;
return t = new $B.ReferrerParser($B.referrers_source, e), (null != (o = t.referrer) ? o.name :void 0) || t.url || "Direct Traffic";
}, t.prototype.sendPbsImpression = function(e) {
return $B.log("[PBS] Impression", e), Keen.addEvent($S.conf.keenio_pbs_impression_collection, e);
}, t.prototype.sendPbsConversion = function(e) {
return $B.log("[PBS] Conversion", e), Keen.addEvent($S.conf.keenio_pbs_conversion_collection, e);
}, t.prototype.trackUserPageEvent = function(e, t) {
return $B.log("User Page Event Tracking", e, t), Keen.addEvent(e, t);
}, t;
}();
}.call(this), function() {
var e = {}.hasOwnProperty, t = function(t, o) {
function n() {
this.constructor = t;
}
for (var r in o) e.call(o, r) && (t[r] = o[r]);
return n.prototype = o.prototype, t.prototype = new n(), t.__super__ = o.prototype, 
t;
}, o = [].indexOf || function(e) {
for (var t = 0, o = this.length; o > t; t++) if (t in this && this[t] === e) return t;
return -1;
};
window.partial = function(e, t) {
return _.template($("#" + e + "-partial").html(), t);
}, Bobcat.IndexGenerator = function() {
function e() {
this.currentIndex = 0;
}
return e.prototype.increment = function() {
return this.currentIndex += 1;
}, e.prototype.getNext = function() {
var e;
return e = this.currentIndex, this.increment(), "model" + e;
}, e;
}(), Bobcat.PageTransformer = function() {
function e(e, t) {
this.domTree = e, this.isEdit = t, this.textTransformer = new Bobcat.TextTransformer(), 
this.imageTransformer = new Bobcat.ImageTransformer(), this.htmlTransformer = new Bobcat.HtmlTransformer();
}
return e.prototype.transform = function() {
var e, t, o, n, r, i, a, s, l, u, d, c, p, h, g, m;
for (h = this.domTree.find("[data-component='repeatable_item_template']"), i = 0, 
u = h.length; u > i; i++) o = h[i], t = $(o), $("<div id='" + t.attr("id") + "_temp' style='display:none;'>" + t.html() + "</div>").appendTo(this.domTree);
for (this.indexGenerator = new Bobcat.IndexGenerator(), r = [ this.textTransformer, this.imageTransformer, this.htmlTransformer ], 
a = 0, d = r.length; d > a; a++) n = r[a], n.indexGenerator = this.indexGenerator;
for (s = 0, c = r.length; c > s; s++) n = r[s], n.transform(this.domTree, this.isEdit);
for (g = this.domTree.find("[data-component='repeatable_item_template']"), m = [], 
l = 0, p = g.length; p > l; l++) o = g[l], t = $(o), e = $("#" + t.attr("id") + "_temp"), 
$.browser.msie && parseInt($.browser.version) > 7 && e.find("*").filter(function() {
return "" !== $(this).attr("class");
}).addClass("ie-fix"), o.text = e.html(), m.push(e.remove());
return m;
}, e;
}(), Bobcat.Transformer = function() {
function e() {}
return e.prototype.validateName = function(e) {
return null == e.attr("data-name") && (this.warning("The following DOM doesn't have data-name."), 
this.warning(e)), !0;
}, e.prototype.getDataName = function(e) {
var t;
return t = e.attr("data-name"), t || (t = this.indexGenerator.getNext()), t;
}, e.prototype.clearDom = function(e) {
return e.html("");
}, e.prototype.isEditable = function(e) {
var t;
return t = e.attr("data-show"), "true" !== t;
}, e.prototype.warning = function(e) {
return console.warn(e);
}, e.prototype.error = function(e) {
return console.error(e);
}, e;
}(), Bobcat.TextTransformer = function(e) {
function n() {}
return t(n, e), n.prototype.transform = function(e, t) {
var o = this;
return this.domTree = e, this.isEdit = null != t ? t :!1, this.domTree.find("[data-component='text']").each(function(e, t) {
var n;
return n = $(t), o.validate(n) ? o.isEdit && o.isEditable(n) ? o.transformToEditable(n) :o.transformToShow(n) :void 0;
});
}, n.prototype.getTextType = function(e) {
var t;
if (t = e.attr("data-text-type")) {
if ("heading" === t) return "headingFont";
if ("title" === t) return "titleFont";
if ("navigation" === t) return "navFont";
}
return "bodyFont";
}, n.prototype.getUseFont = function(e) {
var t;
return t = e.attr("data-use-font"), "false" === t ? !1 :!0;
}, n.prototype.buildData = function(e) {
var t, o, n, r;
return t = e.html(), o = this.getDataName(e), n = this.getTextType(e), r = this.getUseFont(e), 
{
content:t,
name:o,
textType:n,
useFont:r
};
}, n.prototype.transformToShow = function(e) {
var t, o;
return t = this.buildData(e), e.addClass("text-component").html(""), o = $.trim(_.template($("#textContent-partial").html())(t)), 
$(o).appendTo(e);
}, n.prototype.transformToEditable = function(e) {
var t, o;
return t = this.buildData(e), this.clearDom(e), e.addClass("editable text-component"), 
e.attr("data-text-type", "" + t.textType), e.attr("data-name", "" + t.name), e.attr("data-bind", "css: {'empty-text': " + t.name + ".showEmptyText()},      mouseenter: " + t.name + ".mouseenterHandler,      mouseleave: " + t.name + ".mouseleaveHandler,      mouseclick: " + t.name + ".clickEditorHandler"), 
o = $.trim(_.template($("#textEditor").html())(t)), $(o).appendTo(e);
}, n.prototype.validate = function(e) {
var t;
return t = this.validateName(e) && this.validateTextType(e);
}, n.prototype.validateTextType = function(e) {
var t, n, r, i;
return r = !0, n = e.attr("data-text-type"), t = [ "body", "heading", "title", "navigation" ], 
n && (i = !n, o.call(t, i) >= 0 && (r = !1, this.warning("data-text-type should be one of " + t.join(", ")), 
this.warning(e))), r;
}, n;
}(Bobcat.Transformer), Bobcat.ImageTransformer = function(e) {
function o() {
return o.__super__.constructor.apply(this, arguments);
}
return t(o, e), o.prototype.transform = function(e, t) {
var o = this;
return this.domTree = e, this.isEdit = t, this.domTree.find("[data-component='image']").each(function(e, t) {
var n;
return n = $(t), o.validate(n) ? o.isEdit && o.isEditable(n) ? o.transformToEditable(n) :o.transformToShow(n) :void 0;
});
}, o.prototype.validate = function(e) {
var t;
return t = this.validateName(e) && this.validateUrl(e) && this.validateImageSize(e) && this.validateThumbSize(e);
}, o.prototype.getImageDom = function(e) {
return e.imageDom ? e.imageDom :e.imageDom = e.find("img").first();
}, o.prototype.validateUrl = function(e) {
return "undefined" == typeof this.getImageDom(e).attr("src") ? (this.error("img doesn't have a src"), 
this.error(this.getImageDom(e)), !1) :!0;
}, o.prototype.transformToEditable = function(e) {
var t, o;
return t = this.buildData(e), this.clearDom(e), e.addClass("editable image-component"), 
e.attr("data-name", "" + t.name), e.attr("data-bind", "css: {'empty-image':!" + t.name + ".hasContent()},      mouseenter: " + t.name + ".mouseenterHandler,      mouseleave: " + t.name + ".mouseleaveHandler,      mouseclick: " + t.name + ".clickEditorHandler"), 
o = $.trim(_.template($("#imageEditor").html())(t)), $(o).appendTo(e);
}, o.prototype.transformToShow = function(e) {
var t, o;
return t = this.buildData(e), e.html(""), o = $.trim(_.template($("#imageContent-partial").html())(t)), 
$(o).appendTo(e);
}, o.prototype.validateSize = function(e) {
return "small" === e || "medium" === e || "large" === e || "background" === e ? !0 :/^\d+x\d+[><^#]+$/.test(e) ? !0 :"undefined" == typeof e ? !0 :!1;
}, o.prototype.validateThumbSize = function(e) {
var t, o;
return t = e.attr("data-thumb-size"), o = this.validateSize(t), o || (this.warning("size format is wrong"), 
this.warning(e)), o;
}, o.prototype.validateImageSize = function(e) {
var t, o;
return t = e.attr("data-image-size"), o = this.validateSize(t), o || (this.warning("size format is wrong"), 
this.warning(e)), o;
}, o.prototype.getImageSize = function(e) {
var t;
return t = e.attr("data-image-size"), t || (t = "medium");
}, o.prototype.getThumbSize = function(e) {
var t;
return t = e.attr("data-thumb-size"), t || (t = "128x128#");
}, o.prototype.getHasUrl = function(e) {
var t;
return t = e.attr("data-use-url"), "true" === t;
}, o.prototype.getAssetType = function(e) {
var t;
return t = e.attr("data-asset-type"), null == t ? "" :t;
}, o.prototype.getAssetUrls = function(e) {
var t, o;
if (o = e.attr("data-assets"), null == o) switch (this.getAssetType(e)) {
case "black-social":
t = [ "http://uploads.striking.ly/page/images/icons/fb-icon.png", "http://uploads.striking.ly/page/images/icons/twitter-icon.png", "http://uploads.striking.ly/page/images/icons/gplus-icon.png" ];
break;

case "brown-social":
t = [ "http://assets.strikingly.com/static/icons/brown/fb-icon.png", "http://assets.strikingly.com/static/icons/brown/twitter-icon.png", "http://assets.strikingly.com/static/icons/brown/gplus-icon.png" ];
break;

case "flat-circle-160-free":
t = [ "http://assets.strikingly.com/static/icons/flat-circle-160/44.png", "http://assets.strikingly.com/static/icons/flat-circle-160/52.png", "http://assets.strikingly.com/static/icons/flat-circle-160/172.png" ];
break;

default:
t = [];
} else t = o.split(" ");
return t;
}, o.prototype.buildData = function(e) {
var t, o, n, r, i, a, s, l, u;
return l = this.getImageDom(e).attr("src"), n = this.getImageDom(e).attr("alt"), 
i = this.getDataName(e), t = this.getAssetType(e), o = this.getAssetUrls(e), a = this.getImageSize(e), 
s = this.getThumbSize(e), u = this.getHasUrl(e), n || (n = ""), r = {
url:l,
caption:n,
name:i,
imageSize:a,
useUrl:u,
thumbSize:s,
assetType:t,
assetUrls:o
};
}, o;
}(Bobcat.Transformer), Bobcat.HtmlTransformer = function(e) {
function o() {}
return t(o, e), o.prototype.transform = function(e, t) {
var o = this;
return this.domTree = e, this.isEdit = t, this.domTree.find("[data-component='html']").each(function(e, t) {
var n;
return n = $(t), o.validate(n) ? o.isEdit && o.isEditable(n) ? o.transformToEditable(n) :o.transformToShow(n) :void 0;
});
}, o.prototype.validate = function(e) {
var t;
return t = this.validateName(e);
}, o.prototype.transformToEditable = function(e) {
var t, o;
return t = this.buildData(e), this.clearDom(e), e.addClass("editable html-component"), 
e.attr("data-name", "" + t.name), e.attr("data-bind", "      mouseenter: " + t.name + ".mouseenterHandler,      mouseleave: " + t.name + ".mouseleaveHandler,      mouseclick: " + t.name + ".clickEditorHandler"), 
o = $.trim(_.template($("#htmlEditor").html())(t)), $(o).appendTo(e);
}, o.prototype.buildData = function(e) {
return {
name:this.getDataName(e)
};
}, o.prototype.transformToShow = function() {}, o;
}(Bobcat.Transformer);
}.call(this), function() {
var e = function(e, t) {
return function() {
return e.apply(t, arguments);
};
};
Bobcat.ShowPage = function() {
function t(t) {
this.checkIframe = e(this.checkIframe, this), this.initAfterBindings = e(this.initAfterBindings, this), 
this.initBindings = e(this.initBindings, this), this.data = new Bobcat.PageData(t), 
this.Event = new Bobcat.Event(), this.unsavedChanges = ko.observable(!1), this.isShowPage = !0;
}
return t.prototype.initBindings = function() {
return this.data.removePremiumSlides(), this.data.bindSlides();
}, t.prototype.initAfterBindings = function() {
var e, t, o, n;
for (Bobcat.TH.initPageHelpers(), n = window.runAfterDomBinding.getAllJobs(), t = 0, 
o = n.length; o > t; t++) (e = n[t])();
return this.checkIframe();
}, t.prototype.registerUserAnalytics = function() {
return $B.siteMeta("google_analytics_tracker") && (_gaq.push([ "b._trackPageview" ]), 
_gaq.push([ "b._setAccount" ], $B.siteMeta("google_analytics_tracker"))), $B.siteMeta("custom_domain") ? _gaq.push([ "b._setDomainName", $B.siteMeta("custom_domain") ]) :void 0;
}, t.prototype.checkIframe = function() {
var e, t;
return window.top.location !== window.location && document.referrer && (t = $B.meta("strikingly-host-suffix"), 
t && (e = $.url(document.referrer).attr("host"), !e.match("" + t + "$"))) ? (alert("Framing is not allowed with free account. Redirecting to Strikingly.com. Please contact support@strikingly.com if you have any questions."), 
window.top.location = window.location) :void 0;
}, t;
}();
}.call(this), function() {
window.$B = window.Bobcat || {}, $B.TH = {
fixNavOnScroll:function(e, t, o) {
var n, r;
return null == o && (o = 0), $B.TH.isSmallScreen() ? void 0 :(n = function() {
return $("ul.slides li.slide").css({
"padding-top":0
}), $B.TH.isSmallScreen() ? e.css("position", "static") :(e.css("position", "fixed"), 
$("ul.slides li.slide").first().css({
"padding-top":e.outerHeight(!1)
}));
}, r = function() {
var n, r, i, a;
return r = e.outerHeight() - t.height() - o, 0 !== e.length ? (n = $(window).height(), 
i = e.height(), a = $(window).scrollTop(), a > r && (a = r), $(".demo-bar-spacer").length && (a -= $(".demo-bar-spacer").outerHeight()), 
e.stop().animate({
top:-a
})) :void 0;
}, $(window).scroll(r), $(window).resize(n), setTimeout(n, 2e3), n());
},
isMobile:function() {
return navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)|(windows phone)|(iemobile)/i);
},
isAndroid:function() {
return navigator.userAgent.match(/(android)/i);
},
isWindowsPhone:function() {
return navigator.userAgent.match(/(windows phone)|(iemobile)/i);
},
isIpad:function() {
return navigator.userAgent.match(/(iPad)/i);
},
isIOS:function() {
return navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)/i);
},
isSmallScreen:function() {
return $(window).width() <= 727 || $(window).height() < 400;
},
iOSversion:function() {
var e, t;
return /iP(hone|od|ad)/.test(navigator.platform) ? (e = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/), 
t = [ parseInt(e[1], 10), parseInt(e[2], 10), parseInt(e[3] || 0, 10) ], t[0]) :void 0;
},
androidVersion:function() {
var e;
return $B.TH.isAndroid() ? (e = navigator.userAgent, parseFloat(e.slice(e.indexOf("Android") + 8))) :void 0;
},
isAndroid2x:function() {
return $B.TH.isAndroid() && $B.TH.androidVersion() < 3;
},
shiftBody:function(e) {
var t, o;
return o = $("#s-content"), t = $("body"), e ? o.addClass("translate-" + e) :o.removeClass("translate-right translate-left"), 
t.css({
overflow:"visible",
"overflow-x":"visible"
}), o.css({
width:"auto"
});
},
shiftDrawer:function(e, t, o, n) {
return null == e && (e = 0), null == t && (t = !1), null == o && (o = 450), null == n && (n = "easeInOutQuart"), 
$(".navbar-drawer").toggleClass("translate");
},
shiftMobileDrawer:function(e, t, o, n) {
var r;
return null == e && (e = 0), null == t && (t = !1), null == o && (o = 450), null == n && (n = "easeInOutQuart"), 
r = $(".mobile-drawer"), t ? r.css({
right:e
}) :r.animate({
right:e
}, o, n);
},
toggleDrawer:function(e) {
var t, o, n, r, i, a, s, l;
return null == e && (e = !0), r = $(".navbar-drawer"), i = $(".navbar-drawer-bar"), 
n = $("#s-content"), $B.TH.canAnimateCSS() ? (s = "translate", t = "translate-left", 
o = "translate-right") :(s = "shown", t = "left", o = "right"), r.hasClass(s) ? (i.removeClass(t + " " + o), 
r.removeClass(s)) :(i.removeClass(t).addClass(o), r.addClass(s)), a = $(".mobile-actions"), 
a.removeClass(s), $B.TH.androidVersion() < 3 && (l = $(window).scrollTop(), $("#nav-drawer-list").attr("data-top", l)), 
r.css("top", 1), setTimeout(function() {
return r.css("top", 0);
}, 100);
},
toggleMobileDrawer:function(e) {
var t, o;
return null == e && (e = !0), t = $(".mobile-actions"), 0 !== t.length ? (o = $B.TH.canAnimateCSS() ? "translate" :"shown", 
t.hasClass(o) ? t.removeClass(o) :t.addClass(o)) :void 0;
},
detectCSSFeature:function(e) {
var t, o, n, r, i, a, s;
if (n = !1, t = "Webkit Moz ms O".split(" "), o = document.createElement("div"), 
e = e.toLowerCase(), r = e.charAt(0).toUpperCase() + e.substr(1), void 0 !== o.style[e]) return !0;
for (a = 0, s = t.length; s > a; a++) if (i = t[a], void 0 !== o.style[i + r]) return !0;
return !1;
},
canAnimateCSS:function() {
return $B.TH.detectCSSFeature("transform") && !$B.TH.isAndroid2x() && !$B.TH.isWindowsPhone();
},
isIE:function() {
var e;
return e = navigator.userAgent.toLowerCase(), -1 !== e.indexOf("msie") ? parseInt(e.split("msie")[1]) :!1;
},
enableAnimationForBlocks:function(e, t) {
return null == e && (e = "75%"), null == t && (t = !1), t || window.edit_page.isShowPage && !$B.TH.isMobile() && !($B.TH.isIE() && $B.TH.isIE() <= 9) ? ($(".fadeInUp").css("opacity", "0").waypoint(function() {
var e = this;
return $(this).addClass("animated").waypoint("destroy"), setTimeout(function() {
return $(e).css("opacity", 1).removeClass("fadeInUp");
}, 5e3);
}, {
offset:e
}), $(".fadeInRight").css("opacity", "0").waypoint(function() {
var e = this;
return $(this).addClass("animated").waypoint("destroy"), setTimeout(function() {
return $(e).css("opacity", 1).removeClass("fadeInRight");
}, 5e3);
}, {
offset:e
}), $(".fadeInLeft").css("opacity", "0").waypoint(function() {
var e = this;
return $(this).addClass("animated").waypoint("destroy"), setTimeout(function() {
return $(e).css("opacity", 1).removeClass("fadeInLeft");
}, 5e3);
}, {
offset:e
})) :$(".fadeInUp, .fadeInRight, .fadeInLeft").css("opacity", 1);
},
applyTouchNav:function() {
var e, t, o;
return $B.getCustomization("disableMobileNav") ? $(".strikingly-nav-spacer").hide() :(e = $(".navbar-touch").first(), 
$(".navbar-drawer").length && (o = $("#nav-drawer-list"), $(".navbar-drawer, .navbar-drawer-bar, .mobile-actions").removeClass("hidden"), 
$(".mobile-actions").css({
height:$(".mobile-actions").height()
}), $("body").bind("touchstart", function() {}).attr("ontouchstart", "").attr("screen_capture_injected", "true"), 
$B.TH.isAndroid2x() ? $(window).height() < o.height() && (o.css({
overflow:"visible",
height:"auto"
}), $(window).scroll(function() {
var e, t, n, r;
return e = parseInt(o.attr("data-top"), 10), e || 0 === e ? (r = $(window).scrollTop(), 
n = e - r, n > 0 && (n = 0), t = $(window).height() - o.height(), t > n && (n = t), 
o.css({
top:n
})) :void 0;
})) :o.height($(window).height()), $B.TH.canAnimateCSS() && $(".navbar-drawer, .navbar-drawer-bar, .mobile-actions").addClass("strikingly-nav-transition"), 
t = $(".navbar-drawer-bar .navbar-drawer-title"), t.width() < 170 && t.height() < 20 && t.addClass("big"))), 
$(window).resize(function() {
return o = $("#nav-drawer-list"), $B.TH.isAndroid2x() || o.height($(window).height()), 
$(".navbar-drawer").hasClass("shown") || $(".navbar-drawer").hasClass("translate") ? $B.TH.toggleDrawer() :void 0;
});
},
enableSlider:function(e) {
var t, o, n, r, i, a, s, l, u, d;
return r = $.extend({
fullscreen:!1,
padding:100
}, e), o = function(e, t) {
return e.find(".selector.selected").removeClass("selected"), e.find(".selector:eq(" + (t.currentSlideNumber - 1) + ")").addClass("selected");
}, t = function(e) {
var t;
return t = "strikingly-dark-text", e.css("background-image") && -1 !== e.css("background-image").indexOf("/icons/transparent.png") ? e.closest(".wide").addClass(t) :e.hasClass(t) ? e.closest(".wide").addClass(t) :e.closest(".wide").removeClass(t);
}, u = function(e) {
var n, r, i;
return r = e.sliderObject, o(r.closest(".iosslider").find(".slide-selectors"), e), 
e.slideChanged ? e.data.numberOfSlides < 2 ? !1 :(t(e.currentSlideObject), $B.TH.isIE() && !($B.TH.isIE() > 9) || $B.TH.isMobile() || (null != (i = $.browser) ? i.chrome :void 0) ? e.currentSlideObject.find(".animated").css({
opacity:1
}) :(n = r.find(".fadeIn, .fadeInLeft, .fadeInRight").css({
opacity:1
}), setTimeout(function() {
return n.animate({
opacity:0
}, {
duration:300
});
}, 10), n.removeClass("fadeIn fadeInLeft fadeInRight"), e.prevSlideNumber < e.currentSlideNumber && 1 === Math.abs(e.currentSlideNumber - e.prevSlideNumber) || e.prevSlideNumber > e.currentSlideNumber && Math.abs(e.currentSlideNumber - e.prevSlideNumber) > 1 ? (e.currentSlideObject.find('.animated:not(".slow")').addClass("fadeInRight"), 
setTimeout(function() {
return e.currentSlideObject.find(".animated.slow").addClass("fadeInRight");
}, 100)) :(e.currentSlideObject.find('.animated:not(".slow")').addClass("fadeInLeft"), 
setTimeout(function() {
return e.currentSlideObject.find(".animated.slow").addClass("fadeInLeft");
}, 100)))) :!1;
}, d = function(e) {
var n, r;
return n = e.sliderObject, o(n.closest(".iosslider").find(".slide-selectors"), e), 
n.find(".animated").removeClass("fadeIn fadeInLeft fadeInRight"), $B.TH.isIE() && !($B.TH.isIE() > 9) || $B.TH.isMobile() || (null != (r = $.browser) ? r.chrome :void 0) ? n.find(".animated").css({
opacity:1
}) :(n.find(".animated").css({
opacity:0
}), $(e.currentSlideObject).find(".animated").addClass("fadeIn")), u(e), t(e.currentSlideObject);
}, n = function(e) {
var t, o, n;
return o = e.data("auto-play"), t = !1, n = !0, window.edit_page.isShowPage && (t = !0, 
n = !1), e.iosSlider({
responsiveSlideContainer:!0,
responsiveSlides:!0,
snapToChildren:!0,
desktopClickDrag:!1,
infiniteSlider:!0,
autoSlide:t,
autoSlideTimer:o,
onSliderLoaded:d,
onSlideChange:u,
navSlideSelector:e.find(".slide-selectors .selector-wrapper"),
navPrevSelector:e.find(".prev-button"),
navNextSelector:e.find(".next-button"),
disableActionOnSelectorClicked:n
}), e.find(".slider").css({
"min-height":300
}), s(e), e.find("img").one("load", function() {
return a();
}).each(function() {
return this.complete ? $(this).load() :void 0;
});
}, s = function(e) {
var t;
return t = e ? e.closest(".slider-container") :$(".slider-container"), t.each(function() {
var e, t, o, n, i;
return e = $(this), o = function(t) {
return e.find(".item").each(function() {
var e;
return e = $(this).find(".inner").first(), t(e);
});
}, n = 0, o(function(e) {
var t;
return t = e.outerHeight(), n = Math.max(n, t);
}), t = $B.TH.isSmallScreen() ? .8 * r.padding :r.padding, r.fullscreen || e.find(".iosslider").hasClass("full-screen") ? (i = $(window).height(), 
n = Math.max(i, n), n > i && (n += 2 * (t - 1))) :n += 2 * (t - 1), o(function(e) {
var t, o;
return t = e.outerHeight(), o = Math.max(0, .5 * (n - t)), e.css({
"margin-top":o - 15,
"margin-bottom":o + 15
});
}), $(this).find(".iosslider").css({
"min-height":"" + n + "px"
}), setTimeout(function() {
return window.edit_page.isShowPage ? e.find(".iosslider").height(n) :e.find(".iosslider").iosSlider("update");
}, 300);
});
}, a = $B.debounce(s, 100), $(window).resize(function() {
return a();
}), $(window).bind("repaint-slider", function() {
return a();
}), i = function(e, t) {
return t ? s(t) :a();
}, l = function(e, t) {
var o, n;
return null != (o = window.edit_page) ? null != (n = o.Event) ? n.subscribe(e, t || i) :void 0 :void 0;
}, l("Editor.SideMenu.Opened"), l("Editor.SideMenu.Closed"), l("Slider.ContentChanged"), 
l("Slide.afterAdd", function(e, t) {
var o;
return o = t.target.find(".iosslider"), o.length > 0 ? (n(o), s(o)) :void 0;
}), $(".iosslider").each(function() {
return n($(this));
});
},
matchHeights:function(e) {
var t, o, n, r;
if (e && ("string" == typeof e && (e = $(e)), 0 !== e.length)) {
n = {}, o = 0, e.each(function() {
var e;
return e = $(this), o = e.offset().top + "", n[o] = n[o] ? n[o].add(e) :e;
}), r = [];
for (o in n) t = n[o], r.push($B.TH.matchHeightsAll(t));
return r;
}
},
matchHeightsAll:function(e) {
var t;
return e.css("height", "auto"), e.length <= 1 || (t = 0, e.each(function() {
var e;
return e = $(this).height(), e > t ? t = e :void 0;
}), 5 > t) ? void 0 :e.each(function() {
var e, o;
return o = $(this), o.css("height", t), e = o.find("img"), "" === $.trim(o.text()) && e.length ? (e.css("vertical-align", "middle"), 
o.css("line-height", t + "px")) :void 0;
});
},
applyMatchHeights:function(e, t) {
var o, n;
return null == e && (e = ".s-mhi"), null == t && (t = ".s-mh"), o = function(o) {
return null == o && (o = !0), $(t).each(function() {
var t, n, r, i;
return t = $(this), r = t.find(e), n = $(this).find("img"), i = $(this).find("img.lazy"), 
i.length ? i.on("afterAppear", function() {
return $B.TH.matchHeights(r);
}) :n.length && o ? $(this).waitForImages(function() {
return $B.TH.matchHeights(r);
}) :$B.TH.matchHeights(r);
});
}, $(window).resize(function() {
return o(!1);
}), o(!0), window.edit_page.isShowPage ? void 0 :(n = function(o, n) {
var r, i, a;
if (n && (i = n.target, a = i.closest(t), a.length)) return r = a.find(e), $B.TH.matchHeights(r);
}, window.edit_page.Event.subscribe("RichTextComponent.afterTextChange", n), window.edit_page.Event.subscribe("ImageComponent.afterChange", n), 
window.edit_page.Event.subscribe("Repeatable.add", n), window.edit_page.Event.subscribe("Repeatable.remove", n), 
window.edit_page.Event.subscribe("Repeatable.afterReorder", n));
},
fitText:function(e) {
return 0 !== e.length ? e.each(function() {
var e, t, o, n, r;
return r = $(this), n = r.width(), o = parseInt(r.css("font-size")), e = r.css({
position:"absolute"
}).width(), r.css({
position:"relative"
}), n >= e ? void 0 :(t = o * n / e, r.css({
"font-size":t
}));
}) :void 0;
},
isTouchDevice:function() {
try {
return document.createEvent("TouchEvent"), !0;
} catch (e) {
return !1;
}
},
touchScroll:function(e) {
var t;
return $B.TH.isTouchDevice() ? (t = 0, e.addEventListener("touchstart", function(e) {
return t = this.scrollTop + e.touches[0].pageY;
}, !1), e.addEventListener("touchmove", function(e) {
return this.scrollTop = t - e.touches[0].pageY;
}, !1)) :void 0;
},
resizeIFrame:function(e) {
var t, o, n, r, i;
if (1 !== e.data("height-binding-complete")) return e.data("height-binding-complete", 1), 
(null != (o = $.browser) ? o.safari :void 0) || (null != (n = $.browser) ? n.opera :void 0) ? (e.load(function() {
var t;
return t = function() {
return e.height(e.contents().find("body").height() + "px");
}, setTimeout(t, 1);
}), t = e[0].src, e[0].src = "", e[0].src = t) :e.load(function() {
return setTimeout(function() {
return e.height(e.contents().find("body").height() + "px");
}, 100);
}), "complete" === (null != (r = e.contents()) ? null != (i = r[0]) ? i.readyState :void 0 :void 0) && e.height() < e.contents().contents().eq(1).height() ? e.height(e.contents().contents().eq(1).height() + "px") :void 0;
},
adjustIFrameHeight:function() {
return $("iframe.s-show-frame").each(function() {
return $B.TH.resizeIFrame($(this));
});
},
enableParallax:function(e, t) {
return null == t && (t = !1), $B.TH.isMobile() || $B.TH.isSmallScreen() ? void 0 :($(window).scroll(function() {
var o, n, r;
return n = $(document).scrollTop(), r = $(window).height(), o = $(document).height(), 
e.each(function() {
var e, i, a, s, l, u, d;
if ($(this).css("background-image").length) return l = $(this), t ? (i = 0, e = o - r) :(d = l.offset().top, 
u = l.outerHeight(), i = d - r, e = d + u), s = e - i, a = 100 - .01 * ~~(1e4 * (n - i) / s), 
t && (a = 100 - a), a >= 0 && 100 >= a ? l.css({
backgroundPosition:"49.5% " + a + "%"
}) :void 0;
});
}), $(window).scroll());
},
getBackgroundImageSize:function(e, t) {
var o, n, r;
return n = null != (r = e.css("background-image")) ? r.split(/[()]/gi)[1] :void 0, 
n = n.replace(/"/g, ""), n ? (o = new Image(), o.onload = function() {
return t ? t({
width:this.width,
height:this.height
}) :void 0;
}, o.src = n) :null;
},
containBackgroundImages:function(e) {
return e.each(function() {
var e;
return e = $(this), "contain" === e.css("background-size") && "" === $.trim(e.text()) ? $B.TH.getBackgroundImageSize(e, function(t) {
var o, n, r;
return r = t.width, o = t.height, n = e.width() / r * o, e.css({
height:n,
"min-height":n
}), e.addClass("no-resize").removeClass("resize"), e.css("padding", 0);
}) :void 0;
});
},
setupStrikinglyLogo:function(e) {
var t, o, n, r, i, a, s, l, u, d, c;
return null == e && (e = -1), n = $(window), t = $(document), o = $($B.DOM.STRIKINGLY_LOGO), 
l = 4, -1 === e ? (u = "undefined" != typeof $ && null !== $ ? "function" == typeof $.cookie ? $.cookie("pbsVariationId") :void 0 :void 0) ? $B.TH.pbsVariationId = parseInt(u) :($B.TH.pbsVariationId = ~~(Math.random() * l), 
"undefined" != typeof $ && null !== $ && "function" == typeof $.cookie && $.cookie("pbsVariationId", $B.TH.pbsVariationId, {
expires:3
})) :($B.TH.pbsVariationId = e, "undefined" != typeof $ && null !== $ && "function" == typeof $.cookie && $.cookie("pbsVariationId", $B.TH.pbsVariationId, {
expires:3
})), $B.TH.pbsVariationId = 1, -1 !== e || o && o.is(":visible") ? ($(".logo-footer, .logo-footer-var2, .logo-footer-var3").hide(), 
$B.TH.isMobile() ? (o.css({
bottom:-100,
position:"fixed"
}).show(), i = !1, n.scroll(function() {
return i = !0;
}), setInterval(function() {
var e;
if (i) {
if (e = t.height() - n.height() - 20, i = !1, n.scrollTop() >= e) return o.animate({
bottom:-20
}, 1e3, "easeInOutBack");
if (n.scrollTop() < e) return o.animate({
bottom:-100
}, 1e3, "easeInOutBack");
}
}, 250)) :(1 === $B.TH.pbsVariationId && (a = $(".logo-link").attr("href"), a = a.replace("pbs_v0", "pbs_v1"), 
$(".logo-link").attr("href", a)), 0 === $B.TH.pbsVariationId || 1 === $B.TH.pbsVariationId ? ($(".logo-footer").show(), 
r = -90, o.css({
bottom:r,
position:"fixed"
}).hide(), c = 500, d = 100, n.scroll(function() {
var e, i, a, s, l;
return a = "free" === (null != (s = $S.page_meta) ? null != (l = s.user) ? l.membership :void 0 :void 0) ? n.height() + 100 :t.height() - c - 290, 
e = t.scrollTop() + n.height() + d, e > a + r ? (i = r + (e - a) / c * 60, i > -10 && (i = -10), 
r > i && (i = r), o.css({
bottom:i
}).show()) :o.css({
bottom:r
});
}), o.mouseover(function() {
return o.find(".logo-footer-tooltip").addClass("hover");
}), o.mouseout(function() {
return o.find(".logo-footer-tooltip").removeClass("hover");
})) :2 === $B.TH.pbsVariationId ? ($(".logo-footer-var2").show(), n.scroll(function() {
var e, o, r;
return e = "free" === (null != (o = $S.page_meta) ? null != (r = o.user) ? r.membership :void 0 :void 0) ? 200 :t.height() - n.height() - 750, 
t.scrollTop() > e ? $(".logo-footer-var2").addClass("show") :$(".logo-footer-var2").removeClass("show");
})) :3 === $B.TH.pbsVariationId && ($(".logo-footer-var3").show(), n.scroll(function() {
var e, o, r;
return e = "free" === (null != (o = $S.page_meta) ? null != (r = o.user) ? r.membership :void 0 :void 0) ? 200 :t.height() - n.height() - 750, 
t.scrollTop() > e ? $(".logo-footer-var3").addClass("show") :$(".logo-footer-var3").removeClass("show");
}))), s = ~~(1e6 * Math.random()) + "|" + new Date().getTime(), $B.TH.isMobile() || $B.isHeadlessRendering() || $S.conf.is_screenshot_rendering ? void 0 :($B.PageAE.sendPbsImpression({
variationId:$B.TH.pbsVariationId,
conversionKey:s
}), $(".logo-link").click(function() {
return $B.PageAE.sendPbsConversion({
variationId:$B.TH.pbsVariationId,
conversionKey:s
});
}))) :void 0;
},
disableLazyload:function(e) {
return e.each(function(e, t) {
var o;
return o = $(t), null != o.data("background") && (null != o.data("background") && o.css("background-image", "url(" + o.data("background") + ")"), 
o.removeClass("lazy")), o.is("img") && null != o.data("original") ? (o.attr("src", o.data("original")), 
o.removeClass("lazy"), o.on("load", function() {
return o.trigger("afterAppear");
})) :void 0;
});
},
applyLazyload:function(e) {
return null == e && (e = $(".lazy")), e.lazyload({
effect:"fadeIn",
effect_speed:500,
skip_invisible:!1,
threshold:$(window).height()
}), $("img.lazy-img").each(function() {
return "static" === $(this).css("position") ? $(this).css("position", "relative") :void 0;
});
},
lazyloadSection:function(e) {
return null != e ? ($B.TH.disableLazyload(e.find(".lazy-background")), $B.TH.disableLazyload(e.find(".lazy-img")), 
$B.TH.applyLazyload(e.find(".lazy"))) :void 0;
},
lazyload:function() {
var e;
return $B.TH.isMobile() ? $B.TH.disableLazyload($(".lazy")) :(e = $($B.DOM.SLIDES), 
$B.TH.disableLazyload($($B.DOM.NAVIGATOR).find(".lazy").addBack()), e.each(function(e, t) {
return $B.TH.lazyloadSection($(t));
}));
},
applyTableFormatting:function() {
var e;
return e = function(e, t) {
var o, n, r, i, a;
for (o = e.split("|||"), r = $("<tr>"), i = 0, a = o.length; a > i; i++) n = o[i], 
$("<td>").append(n).appendTo(r);
return t.append(r);
}, $(".text-component .content").each(function() {
var t, o;
return t = $(this), -1 !== t.text().indexOf("|||") ? (o = $('<table class="s-text-table">'), 
t.children("div, p").each(function() {
return e($(this).html(), o);
}), t.html("").append(o)) :void 0;
});
},
initPageHelpers:function() {
return $B.TH.adjustIFrameHeight(), $B.TH.applyMatchHeights(), window.edit_page.isShowPage ? ($B.TH.lazyload(), 
$B.TH.setupStrikinglyLogo()) :void 0;
}
};
}.call(this), function() {
Bobcat.Event = function() {
function e() {
this.topics = {}, this.subUid = -1;
}
return e.prototype.subscribe = function(e, t) {
var o;
return this.topics[e] || (this.topics[e] = []), o = ++this.subUid, this.topics[e].push({
token:o,
func:t
}), o;
}, e.prototype.publish = function(e, t) {
var o, n, r, i, a;
if (!this.topics[e]) return !1;
for (n = this.topics[e].slice(), a = [], r = 0, i = n.length; i > r; r++) {
o = n[r];
try {
a.push("function" == typeof o.func ? o.func(e, t) :void 0);
} catch (s) {
a.push(console.warn("Cannot trigger subscription! " + s));
}
}
return a;
}, e.prototype.unsubscribe = function(e) {
var t, o, n, r, i;
i = this.topics;
for (r in i) {
n = i[r];
for (t in n) if (o = n[t], o.token === e) return n.splice(t, 1), e;
}
return !1;
}, e;
}();
}.call(this), function() {
var e = function(e, t) {
return function() {
return e.apply(t, arguments);
};
};
window.Bobcat = window.Bobcat || {}, Bobcat.Navigator = function() {
function t() {
this.selectAndGotoSlideWithIndex = e(this.selectAndGotoSlideWithIndex, this), this.getHighlightedIndex = e(this.getHighlightedIndex, this), 
this.registerSlideWaypoint = e(this.registerSlideWaypoint, this), this.registerSlideWaypoints = e(this.registerSlideWaypoints, this), 
this.selectSlideByWaypoint = e(this.selectSlideByWaypoint, this), this.hashTagChangeHandler = e(this.hashTagChangeHandler, this), 
this.getSlideName = e(this.getSlideName, this), this.setupKeyBindings = e(this.setupKeyBindings, this), 
this.prev = e(this.prev, this), this.next = e(this.next, this), this.isLast = e(this.isLast, this), 
this.isFirst = e(this.isFirst, this), this.currentSectionName = e(this.currentSectionName, this), 
this.currentIndex = e(this.currentIndex, this), this.slideIndex = e(this.slideIndex, this), 
this.unlockKeyboard = e(this.unlockKeyboard, this), this.lockKeyboard = e(this.lockKeyboard, this), 
this.removeHash = e(this.removeHash, this), this.setupHashTagChangeHandlerAndWaypoints = e(this.setupHashTagChangeHandlerAndWaypoints, this), 
this.runMobileOptimization = e(this.runMobileOptimization, this), this.scrolling = !1, 
this.keyboardLock = !1, this.firstTime = !0, this.current = ko.observable();
}
return t.prototype.init = function() {
return $B.log("[NAVIGATOR] Init"), this.selectSlide($(".slides .slide").first()), 
this.setupHashTagChangeHandlerAndWaypoints(), $B.getCustomization("pageKeybinding") && this.setupKeyBindings(), 
this.runMobileOptimization(), $B.isStatic() && $S.page_meta.show_navigation_buttons ? ($(".navigation-buttons").show(), 
$(".navigation-buttons span").css({
visibility:"visible",
opacity:0,
display:"block"
}), $(".navigation-buttons .prev").click(function() {
return window.slide_navigator.prev();
}), $(".navigation-buttons .next").click(function() {
return window.slide_navigator.next();
})) :void 0;
}, t.prototype.runMobileOptimization = function() {
var e;
return e = $B.TH.isMobile(), e && !location.hash ? window.scrollTo(0, 1) :void 0;
}, t.prototype.setupHashTagChangeHandlerAndWaypoints = function() {
var e = this;
return $(window).hashchange(function() {
return e.hashTagChangeHandler(location.hash);
}), "" === location.hash && this.registerSlideWaypoints, 0 === $(document).scrollTop() ? setTimeout(function() {
return $(window).hashchange(), e.registerSlideWaypoints();
}, 1500) :this.registerSlideWaypoints();
}, t.prototype.removeHash = function() {
var e;
return e = window.location.hash, "" !== e && "#" !== e && 0 !== e.indexOf("#!") ? "undefined" != typeof history && null !== history ? "function" == typeof history.replaceState ? history.replaceState("", document.title, window.location.pathname + window.location.search) :void 0 :void 0 :void 0;
}, t.prototype.lockKeyboard = function() {
return this.keyboardLock = !0;
}, t.prototype.unlockKeyboard = function() {
return this.keyboardLock = !1;
}, t.prototype.slideIndex = function(e) {
var t;
return t = $(".slides .slide"), t.index(e);
}, t.prototype.currentIndex = function() {
return this.slideIndex(this.current());
}, t.prototype.currentSectionName = function() {
return this.current().find("a.section-name-anchor").attr("data-section-name");
}, t.prototype.isFirst = function() {
var e;
return e = this.slideIndex(this.current()), 0 === e;
}, t.prototype.isLast = function() {
var e, t;
return t = $(".slides .slide"), e = this.slideIndex(this.current()), e === t.length - 1;
}, t.prototype.next = function() {
var e, t;
return t = $(".slides .slide"), e = t.index(this.current()), t.length - 1 > e ? this.selectAndGotoSlideWithIndex(e + 1) :e === t.length - 1 ? $("html, body").stop().animate({
scrollTop:$(document).height() - $(window).height()
}, 1200, "easeInOutQuart") :void 0;
}, t.prototype.prev = function() {
var e, t;
return t = $(".slides .slide"), e = t.index(this.current()), e > 0 ? this.selectAndGotoSlideWithIndex(e - 1) :$("html, body").stop().animate({
scrollTop:0
}, 1200, "easeInOutQuart");
}, t.prototype.setupKeyBindings = function() {
var e, t, o = this;
return t = !1, e = !0, $(document).on({
keydown:function(t) {
if (13 === t.keyCode && t.shiftKey && window.editorTracker.closeLastEditor(), !o.keyboardLock && !(window.editable && window.currentComponent && window.currentComponent.isState("editor") || $("input:focus, textarea:focus, select:focus, .redactor_editor:focus").length || $(document.activeElement).is(".redactor_editor"))) {
switch (t.keyCode) {
case 32:
t.preventDefault();
break;

case 38:
t.preventDefault();
break;

case 40:
t.preventDefault();
}
return e = !0;
}
},
keyup:function(n) {
if (clearTimeout(t), t = !1, !e) return e = !0, void 0;
if (!o.keyboardLock && !(window.editable && window.currentComponent && window.currentComponent.isState("editor") || $("input:focus, textarea:focus, select:focus, .redactor_editor:focus").length || $(document.activeElement).is(".redactor_editor"))) switch (n.keyCode) {
case 32:
return n.preventDefault(), o.next();

case 38:
return n.preventDefault(), o.prev();

case 40:
return n.preventDefault(), o.next();
}
}
});
}, t.prototype.getSlug = function(e, t) {
return e = e.toSlug(), (0 === e.length || e.match(/^[0-9]+$/g)) && (e = "_" + (t + 1)), 
e;
}, t.prototype.getSlideNames = function() {
var e, t, o, n, r, i, a, s, l, u;
for (n = [], s = window.edit_page.isShowPage ? $S.page_meta.slide_names :function() {
var e, t, o, n;
for (o = window.edit_page.data.slides(), n = [], e = 0, t = o.length; t > e; e++) a = o[e], 
n.push(a.components.slideSettings.name());
return n;
}(), t = l = 0, u = s.length; u > l; t = ++l) {
for (i = s[t], o = r = "#" + this.getSlug(i, t), e = 1; -1 !== $.inArray(o, n); ) o = r + "-" + e++;
n.push(o);
}
return n;
}, t.prototype.getSlideName = function(e) {
return this.getSlideNames()[e];
}, t.prototype.hashTagChangeHandler = function(e) {
var t, o, n, r, i = this;
return $B.log("[NAVIGATOR] Got hash change " + e), $("html, body").stop(), o = $('a[data-scroll-name="' + e + '"]'), 
o.length ? (n = o.closest(".slide"), $B.log("[NAVIGATOR] Found section number")) :(t = $.inArray(e, this.getSlideNames()), 
-1 !== t && ($B.log("[NAVIGATOR] Found section slug"), n = $("ul.slides .slide").eq(t), 
o = n.find("a.section-anchor").first())), o.length > 0 ? (this.scrolling = !0, window.edit_page.Event.publish("Menu.beforeChange", e), 
(null != (r = $B.TH) ? "function" == typeof r.isMobile ? r.isMobile() :void 0 :void 0) && $(Bobcat.DOM.FACEBOOK_ROOT).css("height", "1px"), 
this.selectSlide(n), $B.log("[NAVIGATOR] Animating to #" + ($(".slides .slide").index(n) + 1)), 
$("html, body").stop().animate({
scrollTop:o.first().offset().top
}, 1200, "easeInOutQuart", function() {
return $(Bobcat.DOM.FACEBOOK_ROOT).css("height", "0px"), window.edit_page.Event.publish("Menu.afterChange", e), 
i.scrolling = !1;
})) :void 0;
}, t.prototype.selectSlideByWaypoint = function(e, t) {
var o;
return o = this.getSlideName(t), window.location.hash !== o ? ($B.log("[NAVIGATOR] Selecting slide " + (t + 1) + " by waypoint"), 
this.selectSlide(e), this.removeHash()) :void 0;
}, t.prototype.waypointsRegistered = !1, t.prototype.registerSlideWaypoints = function() {
var e;
return this.waypointsRegistered ? void 0 :($B.log("[NAVIGATOR] Registering waypoints"), 
e = this.registerSlideWaypoint, $(".slides .slide").each(function() {
return e($(this));
}), this.waypointsRegistered = !0);
}, t.prototype.registerSlideWaypoint = function(e) {
var t, o, n, r, i = this;
return o = this.slideIndex, e.waypoint(function(t) {
var n, r;
if (i.firstTime) return i.firstTime = !1, $B.log("[NAVIGATOR] Canceling first waypoint event"), 
void 0;
if (!i.scrolling) {
if (r = o(e), "down" === t || 0 === r) n = e; else if ("up" === t && (n = e.prev(), 
r -= 1, 0 === $(document).scrollTop() && 0 !== r)) return;
return $B.log("[NAVIGATOR] Got waypoint event " + t + ", " + r), i.selectSlideByWaypoint(n, r);
}
}, {
offset:"50%",
continuous:!1
}), t = 0, 0 === (null != (n = e.first()) ? null != (r = n.offset()) ? r.top :void 0 :void 0) ? $(window).scroll(function() {
var n;
if (!i.scrolling && 0 === o(e.first()) && e.first().height() < .5 * $(window).height() && e.eq(1).length) {
if (n = $(document).scrollTop(), t === n) return;
return 0 === n ? i.selectSlideByWaypoint(e.first(), 0) :0 === t && i.selectSlideByWaypoint(e.eq(1), 1), 
t = n;
}
}) :void 0;
}, t.prototype.getHighlightedIndex = function() {
var e, t, o;
for (o = $(".s-nav .s-nav-item"), t = $(".navbar-drawer .navbar-drawer-item"), e = this.currentIndex(); o[e] && !o.eq(e).is(":visible") && !t.eq(e).is(":visible"); ) e -= 1;
return e;
}, t.prototype.selectSlide = function(e) {
var t;
return $(".slides .slide").removeClass("selected"), e.addClass("selected"), this.current(e), 
$B.isStatic() ? (t = this.getHighlightedIndex(), $(".s-nav .s-nav-item").removeClass("selected"), 
t > -1 && $(".s-nav .s-nav-item").eq(t).addClass("selected"), $(".navbar-drawer .navbar-drawer-item").removeClass("selected"), 
t > -1 && $(".navbar-drawer .navbar-drawer-item").eq(t).addClass("selected"), this.isFirst() ? $(".navigation-buttons .prev").animate({
opacity:0
}) :$(".navigation-buttons .prev").animate({
opacity:1
}), this.isLast() ? $(".navigation-buttons .next").animate({
opacity:0
}) :$(".navigation-buttons .next").animate({
opacity:1
})) :void 0;
}, t.prototype.selectAndGotoSlideWithIndex = function(e) {
return window.location.hash = this.getSlideName(e);
}, t;
}();
}.call(this), function() {
var e = function(e, t) {
return function() {
return e.apply(t, arguments);
};
}, t = {}.hasOwnProperty, o = function(e, o) {
function n() {
this.constructor = e;
}
for (var r in o) t.call(o, r) && (e[r] = o[r]);
return n.prototype = o.prototype, e.prototype = new n(), e.__super__ = o.prototype, 
e;
};
window.currentComponent = null, window.currentRepeatable = null, Bobcat.EditorTracker = function(t) {
function n() {
this.closeLastEditor = e(this.closeLastEditor, this), this.addOpenedEditor = e(this.addOpenedEditor, this), 
this.removeFromOpenedEditors = e(this.removeFromOpenedEditors, this), this.hasOpenedEditor = e(this.hasOpenedEditor, this), 
this.openedEditors = [];
}
return o(n, t), n.prototype.hasOpenedEditor = function() {
return 0 === this.openedEditors.length;
}, n.prototype.removeFromOpenedEditors = function(e) {
var t;
return t = $.inArray(e, this.openedEditors), t > -1 ? this.openedEditors.splice(t, 1) :void 0;
}, n.prototype.addOpenedEditor = function(e) {
return this.openedEditors.push(e);
}, n.prototype.closeLastEditor = function() {
var e;
return e = this.openedEditors.pop(), e && (Bobcat.AE.track("Editor - Combo Key - Done"), 
e.doneClickHandler()), e;
}, n;
}($B.Module), window.editorTracker = new Bobcat.EditorTracker(), Bobcat.ComponentHelper = {
TRANSPARENT_IMAGE_URL:"/assets/icons/transparent.png",
isImageTransparent:function(e) {
return null == e && (e = ""), -1 !== e.indexOf(this.TRANSPARENT_IMAGE_URL);
}
}, Bobcat.Component = function(t) {
function n(t, o, n) {
this.root = t, null == o && (o = {}), null == n && (n = {}), this.triggerEvent = e(this.triggerEvent, this), 
this.addSubscriber = e(this.addSubscriber, this), this.destroy = e(this.destroy, this), 
this.loadData = e(this.loadData, this), this.storeCommand = e(this.storeCommand, this), 
this.refreshRootLastData = e(this.refreshRootLastData, this), this.doneClickHandler = e(this.doneClickHandler, this), 
this.hideEditorHandler = e(this.hideEditorHandler, this), this.clickEditorHandler = e(this.clickEditorHandler, this), 
this.mouseleaveHandler = e(this.mouseleaveHandler, this), this.mouseenterHandler = e(this.mouseenterHandler, this), 
this.firstTimeToLoad = !0, this.loadData(o, n), this.selected = ko.observable(), 
this.dialogOpen = ko.observable(!1), this.state = ko.observable(0), this.lastData = o, 
this.mapping = n;
}
return o(n, t), n.include(Bobcat.ComponentHelper), n.prototype.isNull = function(e) {
return "undefined" == typeof e || null === e;
}, n.prototype.isState = function(e) {
return "normal" === e && 0 === this.state() ? !0 :"overlay" === e && 1 === this.state() ? !0 :"editor" === e && 2 === this.state() ? !0 :!1;
}, n.prototype.gotoState = function(e) {
return "normal" === e ? (this === window.currentComponent && (window.currentComponent = null), 
this === window.currentRepeatable && (window.currentRepeatable = null), this.state(0), 
window.editorTracker.removeFromOpenedEditors(this)) :"overlay" === e ? this.type && "RepeatableItem" === this.type() || !window.currentComponent || !window.currentComponent.isState("overlay") ? (this.type && "RepeatableItem" === this.type() ? window.currentRepeatable = this :window.currentComponent = this, 
this.state(1)) :(window.currentComponent.gotoState("normal"), void 0) :"editor" === e ? (window.editorTracker.addOpenedEditor(this), 
this.state(2)) :void 0;
}, n.prototype.mouseenterHandler = function() {
return this.isState("normal") ? this.gotoState("overlay") :void 0;
}, n.prototype.mouseleaveHandler = function() {
return this.isState("overlay") ? this.gotoState("normal") :void 0;
}, n.prototype.clickEditorHandler = function() {
return this.isState("overlay") ? this.gotoState("editor") :void 0;
}, n.prototype.hideEditorHandler = function() {
return this.isState("editor") ? this.gotoState("normal") :void 0;
}, n.prototype.doneClickHandler = function(e) {
return this.hideEditorHandler(e), window.edit_page.unsavedChanges() && Bobcat.AE.trackWithoutExternalService("Editor - Edited " + this.type()), 
window.edit_page.saveWhenUnsaved(!0), this.storeCommand();
}, n.prototype.refreshRootLastData = function() {
return this.root ? this.root.rootLastData = JSON.parse(ko.toJSON(ko.mapping.toJS(this.root))) :void 0;
}, n.prototype.storeCommand = function() {
var e;
return console.log("storeCommand: root: ", this.root), console.log("storeCommand: self: ", this), 
this.root ? (e = this.root.rootLastData, this.root.rootLastData = JSON.parse(ko.toJSON(ko.mapping.toJS(this.root))), 
$B.Singleton.TimeMachine.pushOp({
action:"modify",
self:this,
root:this.root,
data:{
mapping:this.root.mapping,
oldValue:e,
newValue:this.root.rootLastData
}
})) :void 0;
}, n.prototype.loadData = function(e, t) {
var o, n, r;
null == e && (e = {}), null == t && (t = {}), this.firstTimeToLoad && (this.lastData = e, 
this.firstTimeToLoad = !1), ko.mapping.fromJS(e, t, this), r = [];
for (o in e) n = e[o], this[o] && ko.isSubscribable(this[o]) ? r.push(this[o].subscribe(function() {
return window.edit_page.unsavedChanges(!0);
})) :r.push(void 0);
return r;
}, n.prototype.destroy = function() {}, n.prototype.addSubscriber = function(e, t) {
var o, n, r, i, a;
for (this.subscribers || (this.subscribers = []), e instanceof RegExp || (e = new RegExp(e)), 
o = !1, a = this.subscribers, r = 0, i = a.length; i > r; r++) n = a[r], n.event.toString() === e.toString() && (o = !0, 
n.listeners.push(t));
return o ? void 0 :this.subscribers.push({
event:e,
listeners:[ t ]
});
}, n.prototype.triggerEvent = function(e, t) {
var o, n, r, i, a, s, l, u;
if (this.subscribers) for (l = this.subscribers, r = 0, a = l.length; a > r; r++) if (n = l[r], 
n.event.test(e)) for (u = n.listeners, i = 0, s = u.length; s > i; i++) o = u[i], 
o.call(this, t);
return this.root && this !== this.root ? this.root.triggerEvent(e, t) :void 0;
}, n;
}($B.Module);
}.call(this), function() {
var e = function(e, t) {
return function() {
return e.apply(t, arguments);
};
}, t = {}.hasOwnProperty, o = function(e, o) {
function n() {
this.constructor = e;
}
for (var r in o) t.call(o, r) && (e[r] = o[r]);
return n.prototype = o.prototype, e.prototype = new n(), e.__super__ = o.prototype, 
e;
};
window.asset_path = function(e) {
var t, o;
return t = $("meta[name=asset-url]").attr("content"), o = /^\/assets\//, o.test(e) && t && (e = t + e), 
e;
}, Bobcat.DelayJob = function() {
function t() {
this.init = e(this.init, this), this.getAllJobs = e(this.getAllJobs, this), this.getJob = e(this.getJob, this), 
this.add = e(this.add, this), this.jobs = {};
}
return t.prototype.add = function(e, t) {
return this.jobs[e] = t;
}, t.prototype.getJob = function(e) {
return this.jobs[e];
}, t.prototype.getAllJobs = function() {
var e, t, o, n;
o = [], n = this.jobs;
for (t in n) e = n[t], o.push(e);
return o;
}, t.prototype.init = function() {}, t;
}(), window.runAfterDomBinding = new Bobcat.DelayJob(), Bobcat.PageData = function(t) {
function n(t) {
this.removePremiumSlides = e(this.removePremiumSlides, this), this.selectedPreset = e(this.selectedPreset, this);
var o;
this.isNull(t.showNavigationButtons) && (t.showNavigationButtons = !1), this.isNull(t.submenu) && (t.submenu = {
type:"SubMenu",
list:[],
components:{
link:{
type:"Button",
url:"http://www.wordpress.com",
text:"Blog",
new_target:!0
}
}
}), this.isNull(t.templateVariation) && (t.templateVariation = ""), this.isNull(t.templatePreset) && (t.templatePreset = ""), 
this.isNull(t.showMobileNav) && (t.showMobileNav = !0), o = {
slides:{
create:function(e) {
return new Bobcat.Slide(e.data);
}
},
menu:{
create:function(e) {
return new Bobcat.Menu(e.data);
}
},
footer:{
create:function(e) {
return new Bobcat.Footer(e.data);
}
},
submenu:{
create:function(e) {
return new Bobcat.SubMenu(e.data);
}
}
}, n.__super__.constructor.call(this, null, t, o);
}
return o(n, t), n.prototype.selectedPreset = function() {}, n.prototype.removePremiumSlides = function() {
var e, t;
return (t = $B.meta("premium-slides")) ? (e = t.split(","), this.slides($.grep(this.slides(), function(t) {
return -1 === $.inArray(t.data.template_name, e);
}))) :void 0;
}, n.prototype.bindSlides = function() {
var e, t, o, n, r, i, a, s, l, u;
for (this.menu.bind($(Bobcat.DOM.NAVIGATOR)), this.footer.bind($(Bobcat.DOM.FOOTER)), 
$(Bobcat.DOM.SLIDES).length !== this.slides().length && console.warn("Slide data and .slide classes are different."), 
s = this.slides(), t = n = 0, i = s.length; i > n; t = ++n) o = s[t], e = $(Bobcat.DOM.SLIDES).eq(t), 
o.index(t), o.html(e);
for (this.slides.subscribe(function(e) {
var o, n, r, i, a;
for (t = n = 0, i = e.length; i > n; t = ++n) o = e[t], o.index(t);
for (r = 0, a = e.length; a > r; r++) o = e[r], o.html().find(".section-anchor").attr("data-scroll-name", "#" + (o.index() + 1)), 
o.beforeMoveHandler(), $(".slides").append(o.html()), o.afterMovedHandler();
return $.waypoints("refresh");
}), ko.applyBindings(this, Bobcat.DOM.PAGE_DATA_SCOPE), l = this.slides(), u = [], 
r = 0, a = l.length; a > r; r++) o = l[r], u.push(o.bind());
return u;
}, n.prototype.addSlideData = function(e, t) {
return this.slides.splice(e, 0, t), window.edit_page.setupTooltips();
}, n.prototype.removeSlideData = function(e) {
return this.slides.splice(e, 1), window.edit_page.removeTooltips();
}, n.prototype.hideAllEditors = function() {
var e, t, o, n;
for (n = this.slides(), t = 0, o = n.length; o > t; t++) e = n[t], e.hideAllEditors();
return this.menu.hideAllEditors();
}, n.prototype.highlightInNav = function(e) {
var t;
return t = e.data, t.isSelected() && !t.isHidden() ? !0 :void 0;
}, n;
}(Bobcat.Component), Bobcat.Slide = function(t) {
function n(t) {
var o, r = this;
this.data = t, this.destroy = e(this.destroy, this), this.deleteSlide = e(this.deleteSlide, this), 
this.isSelected = e(this.isSelected, this), this.isHighlighted = e(this.isHighlighted, this), 
this.getName = e(this.getName, this), this.isHidden = e(this.isHidden, this), this.selectSlide = e(this.selectSlide, this), 
this.toggleMenu = e(this.toggleMenu, this), this.renameDone = e(this.renameDone, this), 
this.rename = e(this.rename, this), o = {
components:{
create:function(e) {
var t, o, n, i, a;
o = {}, a = e.data;
for (t in a) n = a[t], o[t] = new Bobcat[n.type](r, n), "function" == typeof (i = o[t]).init && i.init();
return o;
}
}
}, n.__super__.constructor.call(this, this, this.data, o), this.html = ko.observable(), 
this.index = ko.observable(), this.renameMode = ko.observable(!1), this.rootLastData = this.data;
}
return o(n, t), n.StripHtml = function(e) {
return Bobcat.Gallery.StripHtml(e);
}, n.prototype.htmlCopy = function() {
return this.html().html();
}, n.prototype.hideAllEditors = function() {
var e, t, o, n;
o = this.components, n = [];
for (t in o) e = o[t], n.push(e.hideEditorHandler());
return n;
}, n.prototype.bind = function() {
return ko.applyBindings(this.components, this.html().get(0));
}, n.prototype.rename = function(e) {
return this.renameMode(!0), window.dom = e, $(e.closest(".section").find("input").first()).focus(), 
window.slide_navigator.lockKeyboard();
}, n.prototype.renameDone = function() {
return this.renameMode(!1), window.slide_navigator.unlockKeyboard(), window.edit_page.track("Editor - Rename Section");
}, n.prototype.toggleMenu = function() {
var e;
return e = this.components.slideSettings.show_nav(), this.components.slideSettings.show_nav(!e), 
window.edit_page.Event.publish("MenuItem.toggle", {});
}, n.prototype.selectSlide = function(e) {
return this.isSelected() ? this.rename(e) :window.slide_navigator.selectAndGotoSlideWithIndex(this.index());
}, n.prototype.isHidden = function() {
return !this.components.slideSettings.show_nav();
}, n.prototype.hashHref = function() {
return window.slide_navigator.getSlideName(this.index());
}, n.prototype.getName = function() {
return this.components.slideSettings.name();
}, n.prototype.isHighlighted = function() {
var e, t;
if (this.isSelected() && !this.isHidden()) return !0;
if (this.index() > window.slide_navigator.currentIndex()) return !1;
for (e = this.index() + 1, t = window.edit_page.data.slides(); t[e] && t[e].isHidden(); ) {
if (t[e].isSelected()) return !0;
e += 1;
}
return !1;
}, n.prototype.isSelected = function() {
return window.slide_navigator.currentIndex() === this.index();
}, n.prototype.deleteSlide = function() {
var e, t = this;
return e = !0, $("html body").stop().animate({
scrollTop:this.html().first().offset().top
}, 500, "easeInOutQuart", function() {
return e ? (e = !1, t.html().append($('<div class="s-delete-slide-shade"></div>')), 
window.confirm(I18n.t("js.pages.edit.confirm.delete_section")) ? (window.edit_page.deleteSlide(t.index()), 
t.destroy()) :t.html().find(".s-delete-slide-shade").remove()) :void 0;
});
}, n.prototype.destroy = function() {
var e, t, o, n;
o = this.components, n = [];
for (t in o) e = o[t], n.push(e.destroy());
return n;
}, n.prototype.beforeMoveHandler = function() {
var e, t, o, n;
o = this.components, n = [];
for (t in o) e = o[t], null != e.beforeMoveHandler ? n.push(e.beforeMoveHandler()) :n.push(void 0);
return n;
}, n.prototype.afterMovedHandler = function() {}, n;
}(Bobcat.Component), Bobcat.Text = function(e) {
function t(e, o) {
var n, r = this;
this.root = e, n = {
style:{
create:function(e) {
return new Bobcat.TextStyle(r.root, e.data);
}
}
}, t.__super__.constructor.call(this, this.root, o, n), this.oldValue = ko.observable();
}
return o(t, e), t.prototype.edit = function() {
return t.__super__.edit.call(this), this["default"]() ? (this.oldValue(this.value()), 
this.value("&nbsp;")) :void 0;
}, t.prototype.deselect = function() {
return t.__super__.deselect.call(this), this["default"]() ? "&nbsp;" === this.value() ? this.value(this.oldValue()) :this["default"](!1) :void 0;
}, t;
}(Bobcat.Component), Bobcat.SocialMediaList = function(t) {
function n(t, o) {
var r, i, a = this;
this.root = t, this.doneClickHandler = e(this.doneClickHandler, this), this.clickCancelEditorHandler = e(this.clickCancelEditorHandler, this), 
this.clickEditorHandler = e(this.clickEditorHandler, this), this.bind = e(this.bind, this), 
r = $.extend(!0, {}, o), window.social_media_config.updateButtonListData(r), i = {
link_list:{
create:function(e) {
return new Bobcat[e.data.type](a.root, e.data, a);
}
},
button_list:{
create:function(e) {
return new Bobcat[e.data.type](a.root, e.data, a);
}
}
}, n.__super__.constructor.call(this, this.root, r, i), this.mediaListHtml = ko.observable();
}
return o(n, t), n.prototype.bind = function() {
return this.render();
}, n.prototype.render = function() {
var e, t, o, n, r, i, a, s, l, u;
if (!$B.isHeadlessRendering()) {
for (o = "", s = this.button_list(), n = 0, i = s.length; i > n; n++) t = s[n], 
t.show_button() && (o += t.getTemplate());
for (this.mediaListHtml(o), l = this.button_list(), u = [], r = 0, a = l.length; a > r; r++) t = l[r], 
e = $('meta[name="force-social-js"]') && "true" === $('meta[name="force-social-js"]').attr("content"), 
window.edit_page.isShowPage ? t.show_button() || e ? u.push(t.reRender()) :u.push(void 0) :u.push(t.reRender());
return u;
}
}, n.prototype.clickEditorHandler = function(e) {
return n.__super__.clickEditorHandler.call(this, e);
}, n.prototype.clickCancelEditorHandler = function() {
return this.hideEditorHandler();
}, n.prototype.doneClickHandler = function(e) {
var t, o, r, i;
for (this.render(), i = this.link_list(), o = 0, r = i.length; r > o; o++) t = i[o], 
t.doneClickHandler();
return n.__super__.doneClickHandler.call(this, e);
}, n;
}(Bobcat.Component), Bobcat.SocialMediaItem = function(t) {
function n(t, o) {
var r = this;
this.root = t, this.doneClickHandler = e(this.doneClickHandler, this), this.onScriptLoad = e(this.onScriptLoad, this), 
this.getUrl = e(this.getUrl, this), o.link_url || (o.link_url = ""), o.share_text || (o.share_text = window.social_media_config.get("description")), 
n.__super__.constructor.call(this, this.root, o, {}), this.show_link = ko.dependentObservable(function() {
return r.link_url().length > 0;
});
}
return o(n, t), n.include(Bobcat.UrlHelper), n.prototype.getUrl = function() {
return this.url && this.url() ? this.url() :window.social_media_config.get("url");
}, n.prototype.getSubtitle = function() {
return "";
}, n.prototype.openLinkInput = function(e) {
var t;
return t = e.closest(".social-media-item"), t.length ? (t.find("input.url").show(), 
e.hide()) :void 0;
}, n.prototype.onScriptLoad = function() {
return this.runScript();
}, n.prototype.createScriptTag = function(e, t) {
var o, n;
return o = $("<div></div>").addClass(e), n = $("<script></script>").attr({
async:!0,
src:t
}), n.bind("load", this.onScriptLoad), o.get(0).appendChild(n.get(0)), $("#fb-root").get(0).appendChild(o.get(0));
}, n.prototype.doneClickHandler = function() {
var e, t;
return t = this.link_url(), e = this.addProtocol(t, !0), this.link_url(e);
}, n;
}(Bobcat.Component), Bobcat.Facebook = function(t) {
function n(t, o, r) {
this.root = t, this.parent = r, this.runScript = e(this.runScript, this), o.app_id = window.social_media_config.get("fb_app_id"), 
o.imageUrl = asset_path("/assets/icons/facebook.png"), n.__super__.constructor.call(this, this.root, o);
}
return o(n, t), n.prototype.getTemplate = function() {
return '<div class="col fb-counter"><fb:like href="' + this.getUrl() + '" send="false" layout="button_count" data-width="100" show_faces="false" font="arial"></fb:like></div>';
}, n.prototype.getSubtitle = function() {
return "Facebook Like";
}, n.prototype.runScript = function() {
return "undefined" != typeof FB ? (FB.init({
appId:this.app_id(),
status:!0,
cookie:!0,
xfbml:!0
}), FB.Event.subscribe("edge.create", function(e) {
return window.edit_page.Event.publish("Site.facebook.edge.create", e), $("#footer").css("margin-bottom", "+=220px");
})) :void 0;
}, n.prototype.reRender = function() {
return $S.global_conf.in_china ? void 0 :$("#fb-root .facebook_script").length < 1 ? this.createScriptTag("facebook_script", document.location.protocol + "//connect.facebook.net/en_US/all.js") :this.runScript();
}, n;
}(Bobcat.SocialMediaItem), Bobcat.LinkedIn = function(t) {
function n(t, o, r) {
this.root = t, this.parent = r, this.runScript = e(this.runScript, this), o.imageUrl = asset_path("/assets/icons/linkedin.png"), 
n.__super__.constructor.call(this, this.root, o);
}
return o(n, t), n.prototype.getTemplate = function() {
return '<div class="col linkedin-counter"><script type="IN/Share" data-showzero="true" data-counter="right" data-url="' + this.getUrl() + '"></script></div>';
}, n.prototype.getSubtitle = function() {
return "LinkedIn Share";
}, n.prototype.runScript = function() {}, n.prototype.reRender = function() {
try {
delete window.IN;
} catch (e) {
window.IN = void 0;
}
return $("#fb-root .linkedin_script").remove(), this.createScriptTag("linkedin_script", document.location.protocol + "//platform.linkedin.com/in.js");
}, n;
}(Bobcat.SocialMediaItem), Bobcat.Twitter = function(t) {
function n(t, o, r) {
this.root = t, this.parent = r, this.runScript = e(this.runScript, this), o.imageUrl = asset_path("/assets/icons/twitter.png"), 
this.isNull(o.share_text) && (self.share_text = "Check out this awesome website on @Strikingly"), 
n.__super__.constructor.call(this, this.root, o);
}
return o(n, t), n.prototype.getTemplate = function() {
return '<div class="col twitter-counter"><a href="http://twitter.com/share" class="twitter-share-button" data-url="' + this.getUrl() + '" data-text="' + this.share_text() + '"  data-count="horizontal">Tweet</a></div>';
}, n.prototype.getSubtitle = function() {
return "Tweet button";
}, n.prototype.runScript = function() {
var e;
return "undefined" != typeof twttr && null !== twttr ? null != (e = twttr.widgets) ? e.load() :void 0 :void 0;
}, n.prototype.reRender = function() {
return $S.global_conf.in_china ? void 0 :$("#fb-root .twitter_script").length < 1 ? this.createScriptTag("twitter_script", document.location.protocol + "//platform.twitter.com/widgets.js") :this.runScript();
}, n;
}(Bobcat.SocialMediaItem), Bobcat.GPlus = function(t) {
function n(t, o, r) {
this.root = t, this.parent = r, this.runScript = e(this.runScript, this), o.imageUrl = asset_path("/assets/icons/gplus.png"), 
n.__super__.constructor.call(this, this.root, o);
}
return o(n, t), n.prototype.getTemplate = function() {
return '<div class="col gplus-counter"><g:plusone size="medium" annotation="bubble" href="' + this.getUrl() + '" ></g:plusone></div>';
}, n.prototype.getSubtitle = function() {
return "Google +1";
}, n.prototype.runScript = function() {
var e;
return "undefined" != typeof gapi && "undefined" != typeof gapi.plusone ? (e = $(".gplus-counter"), 
e.each(function() {
return gapi.plusone.go(this);
})) :void 0;
}, n.prototype.reRender = function() {
return $S.global_conf.in_china ? void 0 :$("#fb-root .gplus_script").length < 1 ? this.createScriptTag("gplus_script", document.location.protocol + "//apis.google.com/js/plusone.js") :this.runScript();
}, n;
}(Bobcat.SocialMediaItem), Bobcat.Renren = function(t) {
function n(t, o, r) {
this.root = t, this.parent = r, this.runScript = e(this.runScript, this), o.imageUrl = asset_path("/assets/icons/renren.png"), 
n.__super__.constructor.call(this, this.root, o);
}
return o(n, t), n.prototype.getSubtitle = function() {
return "人人喜欢";
}, n.prototype.getTemplate = function() {
var e, t;
this.p = [], e = {
url:this.getUrl(),
title:window.social_media_config.get("title"),
description:window.social_media_config.get("description"),
image:window.social_media_config.get("image")
};
for (t in e) this.p.push(t + "=" + encodeURIComponent(e[t] || ""));
return '<div class="col renren-counter"><iframe scrolling="no" frameborder="0" allowtransparency="true" src="' + document.location.protocol + "//www.connect.renren.com/like/v2?" + this.p.join("&") + '" style="width:130px;height:24px;"></iframe></div>';
}, n.prototype.runScript = function() {}, n.prototype.reRender = function() {}, 
n;
}(Bobcat.SocialMediaItem), Bobcat.SinaWeibo = function(t) {
function n(t, o, r) {
this.root = t, this.parent = r, this.runScript = e(this.runScript, this), this.getTemplate = e(this.getTemplate, this), 
o.imageUrl = asset_path("/assets/icons/weibo.png"), n.__super__.constructor.call(this, this.root, o);
}
return o(n, t), n.prototype.getSubtitle = function() {
return "新浪微博";
}, n.prototype.getTemplate = function() {
var e, t, o, n, r;
r = 90, n = 24, t = {
url:this.getUrl(),
type:"2",
count:"1",
title:window.social_media_config.get("title"),
pic:window.social_media_config.get("image"),
rnd:new Date().valueOf()
}, o = [];
for (e in t) o.push(e + "=" + encodeURIComponent(t[e] || ""));
return '<div class="col sinaweibo-counter"><iframe allowTransparency="true" frameborder="0" scrolling="no" src="' + document.location.protocol + "//hits.sinajs.cn/A1/weiboshare.html?" + o.join("&") + '" width="' + r + '" height="' + n + '"></iframe></div>';
}, n.prototype.runScript = function() {}, n.prototype.reRender = function() {}, 
n;
}(Bobcat.SocialMediaItem), Bobcat.Person = function(e) {
function t(e, o, n) {
this.root = e, this.parent = n, t.__super__.constructor.call(this, this.root, o, {}), 
this.name = new Bobcat.RichText(this.root, this.name), this.name.init(), this.title = new Bobcat.RichText(this.root, this.title), 
this.title.init(), this.image = new Bobcat.Image(this.root, this.image, {}, null), 
this.choosingImage = ko.observable(!1);
}
return o(t, e), t.prototype.remove = function() {
return this.parent.list.remove(this);
}, t.prototype.toggleImageChooser = function() {
return this.choosingImage(!this.choosingImage());
}, t;
}(Bobcat.Component), Bobcat.Video = function(t) {
function n(t, o, r) {
this.root = t, this.parent = r, this.remove = e(this.remove, this), this.clickCancelEditorHandler = e(this.clickCancelEditorHandler, this), 
this.clickEditorHandler = e(this.clickEditorHandler, this), this.errorCallback = e(this.errorCallback, this), 
this.successCallback = e(this.successCallback, this), this.upload = e(this.upload, this), 
n.__super__.constructor.call(this, this.root, o, {}), this.visible = ko.dependentObservable(function() {
return !window.edit_page.isLoading();
});
}
return o(n, t), n.include(Bobcat.UrlHelper), n.prototype.upload = function(e) {
var t = this;
if (!window.edit_page.isLoading()) return window.edit_page.isLoading(!0), e.target && (e = $(e.target)), 
this.url(this.addProtocol(this.url())), e.closest("form").ajaxSubmit({
url:"/s/videos.json",
type:"POST",
dataType:"json",
beforeSend:function(e) {
return e.setRequestHeader("X-CSRF-Token", $('meta[name="csrf-token"]').attr("content"));
},
success:function(e) {
return console.log(e), "retry" === e.html ? $B.poller("/s/tasks/" + e.message.type + "/" + e.message.id + ".jsm?v=1", t.successCallback, t.errorCallback) :"success" === e.html ? t.successCallback(e) :void 0;
},
error:this.errorCallback
});
}, n.prototype.successCallback = function(e) {
return window.edit_page.isLoading(!1), this.html(e.message.html), window.edit_page.track("Editor - Add Video");
}, n.prototype.errorCallback = function(e) {
var t;
return t = jQuery.parseJSON(e.responseText), window.edit_page.isLoading(!1), $B.log(t), 
alert(I18n.t(t.html, t.message.i18n));
}, n.prototype.clickEditorHandler = function(e) {
return this.oldHtml = this.html(), n.__super__.clickEditorHandler.call(this, e);
}, n.prototype.clickCancelEditorHandler = function() {
return this.html(this.oldHtml), this.hideEditorHandler();
}, n.prototype.remove = function() {
return this.html(""), this.url("");
}, n;
}(Bobcat.Component), Bobcat.Repeatable = function(t) {
function n(t, o) {
var r, i = this;
this.root = t, this.hasContentOrIsEditMode = e(this.hasContentOrIsEditMode, this), 
this.hasContent = e(this.hasContent, this), this.selectedIndex = e(this.selectedIndex, this), 
this.changeToPrev = e(this.changeToPrev, this), this.changeToNext = e(this.changeToNext, this), 
this.changeSelected = e(this.changeSelected, this), this.add = e(this.add, this), 
this.isNull(o.subItemClassName) && (o.subItemClassName = "RepeatableItem"), r = {
list:{
create:function(e) {
return new Bobcat[o.subItemClassName](i.root, e.data, i);
}
},
components:{
create:function(e) {
return e.data;
}
}
}, n.__super__.constructor.call(this, this.root, o, r), this.selected = ko.observable(), 
this.direction = ko.observable(1);
}
return o(n, t), n.prototype.add = function(e) {
var t;
return t = new (Bobcat[this.subItemClassName()])(this.root, {
components:this.components
}, this), this.changeSelected(t), this.list.push(t), this.changeSelected(t), window.edit_page.Event.publish("Repeatable.add", {
target:e
}), window.edit_page.track("Editor - Add Repeatable"), this.triggerEvent("Repeatable.Add", t), 
this.storeCommand();
}, n.prototype.changeSelected = function(e) {
return this.selected() && e.index() > 0 && this.selectedIndex() > e.index() ? this.direction(-1) :this.direction(1), 
this.selected(e);
}, n.prototype.changeToNext = function(e) {
return this.changeSelected(this.list()[(e.index() + 1) % this.list().length]);
}, n.prototype.changeToPrev = function(e) {
return this.changeSelected(this.list()[(e.index() - 1) % this.list().length]);
}, n.prototype.beforeMoveHandler = function() {
var e, t, o, n, r;
for (n = this.list(), r = [], t = 0, o = n.length; o > t; t++) e = n[t], null != e.beforeMoveHandler ? r.push(e.beforeMoveHandler()) :r.push(void 0);
return r;
}, n.prototype.afterMovedHandler = function() {}, n.prototype.selectedIndex = function() {
return this.selected() ? this.selected().index() :void 0;
}, n.prototype.hasContent = function() {
return this.list().length > 0;
}, n.prototype.hasContentOrIsEditMode = function() {
return this.hasContent() || !window.edit_page.isShowPage;
}, n;
}(Bobcat.Component), Bobcat.RepeatableItem = function(t) {
function n(t, o, r) {
var i, a = this;
this.root = t, this.parent = r, this.isTextRight = e(this.isTextRight, this), this.layout = e(this.layout, this), 
this.columnVariation = e(this.columnVariation, this), this.col4 = e(this.col4, this), 
this.col3 = e(this.col3, this), this.smartCol8 = e(this.smartCol8, this), this.smartCol3 = e(this.smartCol3, this), 
this.smartCol = e(this.smartCol, this), this.deselect = e(this.deselect, this), 
this.selectForEdit = e(this.selectForEdit, this), this.direction = e(this.direction, this), 
this.prev = e(this.prev, this), this.next = e(this.next, this), this.select = e(this.select, this), 
this.showEditor = e(this.showEditor, this), this.leaveDeleteHandler = e(this.leaveDeleteHandler, this), 
this.enterDeleteHandler = e(this.enterDeleteHandler, this), this.isLast = e(this.isLast, this), 
this.isFirst = e(this.isFirst, this), this.isEven = e(this.isEven, this), this.index = e(this.index, this), 
this.remove = e(this.remove, this), i = {
components:{
create:function(e) {
var t, o, n, r;
o = {}, r = e.data;
for (t in r) n = r[t], "function" == typeof n.type && (n.type = n.type()), o[t] = new Bobcat[n.type](a.root, n), 
"undefined" != typeof o[t].init && o[t].init();
return o;
}
}
}, o.type = "RepeatableItem", o.deleteOverlayEnabled = !1, n.__super__.constructor.call(this, this.root, o, i), 
this.isSelected = ko.dependentObservable(function() {
return a.parent.selected() === a;
}, this);
}
return o(n, t), n.prototype.remove = function(e) {
var t, o, n;
return t = $(e.closest(".slide-list")[0]), o = e.closest(".repeatable").prev(), 
n = this.parent.list().indexOf(this), this.parent.list.remove(this), window.edit_page.Event.publish("Repeatable.remove", {
target:o
}), window.edit_page.track("Editor - Remove Repeatable"), this.triggerEvent("Repeatable.Remove", {
component:this,
target:e,
targetParent:t
}), this.parent.storeCommand();
}, n.prototype.index = function() {
return $.inArray(this, this.parent.list());
}, n.prototype.isEven = function() {
return this.index() % 2 === 0;
}, n.prototype.isFirst = function() {
return 0 === this.index();
}, n.prototype.isLast = function() {
return this.index() === this.parent.list().length - 1;
}, n.prototype.enterDeleteHandler = function() {
return this.deleteOverlayEnabled(!0);
}, n.prototype.leaveDeleteHandler = function() {
return this.deleteOverlayEnabled(!1);
}, n.prototype.showEditor = function() {
var e, t, o, n;
o = !0, n = this.components;
for (t in n) e = n[t], o = o && (e.isState("normal") || e.isState("overlay"));
return o;
}, n.prototype.select = function() {
return this.parent.changeSelected(this);
}, n.prototype.next = function() {
return this.deselect(), this.parent.changeToNext(this);
}, n.prototype.prev = function() {
return this.deselect(), this.parent.changeToPrev(this);
}, n.prototype.direction = function() {
return this.parent.direction();
}, n.prototype.selectForEdit = function(e) {
var t, o, n;
this.deselect(), this.select(e), n = this.components;
for (o in n) if (t = n[o], "Image" === t.type()) return t.mouseenterHandler(), t.clickEditorHandler(), 
void 0;
}, n.prototype.deselect = function() {
var e, t, o, n, r, i, a;
for (i = this.parent.list(), a = [], n = 0, r = i.length; r > n; n++) t = i[n], 
a.push(function() {
var n, r;
n = t.components, r = [];
for (o in n) e = n[o], "Image" === e.type() && e.isState("editor") ? r.push(e.clickCancelEditorHandler()) :r.push(void 0);
return r;
}());
return a;
}, n.prototype.beforeMoveHandler = function() {
var e, t, o, n;
o = this.components, n = [];
for (t in o) e = o[t], null != e.beforeMoveHandler ? n.push(e.beforeMoveHandler()) :n.push(void 0);
return n;
}, n.prototype.afterMovedHandler = function() {}, n.prototype.smartCol = function() {
return 4 === this.parent.list().length || this.parent.list().length < 3;
}, n.prototype.smartCol3 = function() {
return this.parent.list().length % 3 === 0 || this.parent.list().length < 3;
}, n.prototype.smartCol8 = function() {
var e;
return e = this.parent.list().length, 1 === e || 2 === e || 4 === e;
}, n.prototype.col3 = function() {
return this.parent.list().length <= 3;
}, n.prototype.col4 = function() {
return this.parent.list().length <= 4;
}, n.prototype.columnVariation = function() {
var e, t;
switch (null != (e = this.root.components) ? null != (t = e.slideSettings) ? t.layout_variation() :void 0 :void 0) {
case "2col":
return {
third:0,
four:0,
eight:1
};

case "3col":
return {
third:1,
four:0,
eight:0
};

case "4col":
return {
third:0,
four:1,
eight:0
};
}
}, n.prototype.layout = function() {
var e, t;
return null != (e = this.root.components) ? null != (t = e.slideSettings) ? t.layout_variation() :void 0 :void 0;
}, n.prototype.isTextRight = function() {
return "image" === this.layout() || "alt" === this.layout() && !this.isEven();
}, n;
}(Bobcat.Component), Bobcat.Slider = function(t) {
function n(t, o) {
var r, i, a, s, l, u, d, c, p = this;
for (this.root = t, this.gotoSlide = e(this.gotoSlide, this), this.updateIndex = e(this.updateIndex, this), 
this.select2 = e(this.select2, this), this.select = e(this.select, this), this.add = e(this.add, this), 
this.onClickHandler = e(this.onClickHandler, this), n.__super__.constructor.call(this, this.root, o), 
this.selectedIdx = ko.observable(0), this.formOpen = ko.observable(!1), l = function(e, t) {
var o, n;
return null != (o = window.edit_page) ? null != (n = o.Event) ? n.publish(e, t) :void 0 :void 0;
}, u = function(e, t) {
return p.root.addSubscriber(e, function(e) {
var o;
return null != (o = window.edit_page) && "function" == typeof o.track && o.track("Edit Content - Slider - Editor v1"), 
l(t, e.target);
});
}, r = "Slider.ContentChanged", a = function() {
var e, t, o, n;
for (o = [ /Text\..*/, /BackgroundImage\..*/, /Media\..*/, /Repeatable\..*/ ], n = [], 
e = 0, t = o.length; t > e; e++) i = o[e], n.push([ i, r ]);
return n;
}(), d = 0, c = a.length; c > d; d++) s = a[d], u(s[0], s[1]);
this.root.addSubscriber("Repeatable.Remove", function(e) {
var t;
return 0 === p.list().length ? (t = e.targetParent.closest(".iosslider"), t.find(".slider").css({
"max-height":300
}), t.css({
"max-height":300,
"min-height":300
}), void 0) :(p.selectedIdx() >= p.list().length && p.selectedIdx(p.list().length - 1), 
$(window).trigger("resize"), setTimeout(function() {
return p.gotoSlide(e.targetParent.closest(".iosslider"), p.selectedIdx() + 1);
}, 300));
}), this.root.addSubscriber("Repeatable.Move", function(e) {
return p.selectedIdx(e.extra.newIndex), p.gotoSlide(e.target.closest(".iosslider"), p.selectedIdx() + 1);
}), this.root.addSubscriber(/Text\..*/, function() {
return setTimeout(function() {
return $(window).trigger("resize");
}, 300);
});
}
return o(n, t), n.prototype.onClickHandler = function(e) {
var t;
return t = e.parent().find(".slider-settings"), this.formOpen() ? (t.slideUp(), 
this.formOpen(!1)) :(t.slideDown(), this.formOpen(!0));
}, n.prototype.add = function(e) {
var t = this;
return this.list().length >= 10 ? ($B.customAlert("You can only add 10 slides!"), 
void 0) :(n.__super__.add.call(this, e), this.triggerEvent("Slider.Add"), 1 === this.list().length ? (this.selectedIdx(0), 
setTimeout(function() {
return t.gotoSlide(e.closest(".iosslider"), t.selectedIdx() + 1);
}, 500)) :void 0);
}, n.prototype.select = function(e) {
var t, o;
return e = $(e), t = e.closest(".selector"), o = e.closest(".slide-list").find(".selector"), 
this.selectedIdx(o.index(t)), this.gotoSlide(e.closest(".iosslider"), this.selectedIdx() + 1);
}, n.prototype.select2 = function(e) {
var t, o;
return e = $(e), t = e.closest(".selector"), o = e.closest(".slide-selectors").find(".selector"), 
this.selectedIdx(o.index(t)), this.gotoSlide(e.closest(".iosslider"), this.selectedIdx() + 1);
}, n.prototype.updateIndex = function(e) {
var t, o;
return o = $(e).hasClass("prev-button") ? -1 :1, t = Math.max(0, this.selectedIdx() + o), 
t = Math.min(this.list().length - 1, t), this.selectedIdx(t);
}, n.prototype.gotoSlide = function(e, t) {
return e.iosSlider("goToSlide", t);
}, n;
}(Bobcat.Repeatable), Bobcat.SubMenu = function(t) {
function n(t) {
this.add = e(this.add, this), t.subItemClassName = "SubMenuItem", n.__super__.constructor.call(this, this, t), 
this.rootLastData = t;
}
return o(n, t), n.prototype.add = function(e) {
return n.__super__.add.call(this, e), this.selected().edit(), window.edit_page.setupTooltips(), 
window.edit_page.Event.publish("Submenu.add", {}), window.edit_page.track("Editor - Add External Link");
}, n;
}(Bobcat.Repeatable), Bobcat.SubMenuItem = function(t) {
function n() {
return this.remove = e(this.remove, this), this.select = e(this.select, this), this.editDone = e(this.editDone, this), 
this.edit = e(this.edit, this), n.__super__.constructor.apply(this, arguments);
}
return o(n, t), n.prototype.edit = function() {
return this.gotoState("editor");
}, n.prototype.editDone = function() {
return this.gotoState("normal"), this.parent.selected(null);
}, n.prototype.select = function(e) {
return this.isSelected() ? this.parent.selected(null) :(n.__super__.select.call(this, e), 
this.edit());
}, n.prototype.remove = function(e) {
return window.edit_page.removeTooltips(), n.__super__.remove.call(this, e), window.edit_page.Event.publish("Submenu.remove", {});
}, n;
}(Bobcat.RepeatableItem), Bobcat.Gallery = function(t) {
function n(t, o) {
var r, i, a = this;
this.root = t, this.prevImage = e(this.prevImage, this), this.nextImage = e(this.nextImage, this), 
this.changeImage = e(this.changeImage, this), this.errorCallback = e(this.errorCallback, this), 
this.upload = e(this.upload, this), this.clickRemoveCurrentHandler = e(this.clickRemoveCurrentHandler, this), 
this.clickEditorHandler = e(this.clickEditorHandler, this), this.mouseleaveHandler = e(this.mouseleaveHandler, this), 
this.mouseenterHandler = e(this.mouseenterHandler, this), this.clickCancelEditorHandler = e(this.clickCancelEditorHandler, this), 
this.add = e(this.add, this), i = {
sources:{
create:function(e) {
var t;
return t = e.data, t.type = "Image", new Bobcat.Image(a.root, t, {}, a);
}
}
}, n.__super__.constructor.call(this, this.root, o, i), this.nullImage = new Bobcat.Image(this.root, {
type:"Image",
url:"",
caption:"",
description:""
}, {}, this), r = function() {
return "";
}, this.emptyImage = {
url:r,
caption:r,
description:r
}, this.current = ko.observable(), this.sources().length ? this.current(this.sources()[0]) :this.current(this.nullImage), 
this.empty = ko.dependentObservable(function() {
return 0 === a.sources().length;
}, this);
}
return o(n, t), n.include(Bobcat.ImageOptionHelper), n.StripHtml = function(e) {
return Bobcat.DOM.GALLERY_IMAGES(e).remove(), Bobcat.DOM.GALLERY_IMAGES_EDITOR(e).remove();
}, n.prototype.add = function(e) {
var t;
return console.log("Gallery#add"), e.type = "Image", e.image_type = this.image_type(), 
t = new Bobcat.Image(this.root, e, {}, this), this.sources.push(t), this.current(t), 
this.storeCommand();
}, n.prototype.clickCancelEditorHandler = function() {
return this.hideEditorHandler();
}, n.prototype.mouseenterHandler = function() {
return this.isState("normal") ? this.gotoState("overlay") :void 0;
}, n.prototype.mouseleaveHandler = function() {
return this.isState("overlay") ? this.gotoState("normal") :void 0;
}, n.prototype.clickEditorHandler = function(e) {
return this.current(e), this.gotoState("editor");
}, n.prototype.clickRemoveCurrentHandler = function() {
return this.current() && (this.current().clickRemoveHandler(), this.current(this.nullImage)), 
this.gotoState("normal");
}, n.prototype.upload = function(e) {
var t, o, n = this;
return e.target && (e = $(e.target)), "undefined" == typeof filepicker ? (alert(I18n.t("js.pages.edit.errors.upload_network_error")), 
void 0) :(o = {
multiple:!0,
maxSize:6291456,
maxFiles:50,
container:"s-upload-iframe",
mimetypes:[ "image/jpeg", "image/pjpeg", "image/png", "image/gif" ],
openTo:"COMPUTER",
services:[ "COMPUTER", "IMAGE_SEARCH", "URL", "FACEBOOK", "DROPBOX", "GOOGLE_DRIVE", "FLICKR", "INSTAGRAM", "PICASA" ]
}, t = new Bobcat.AssetDialog({
mode:"multi",
hideTabs:[ $B.AssetDialog.ICON_LIB ]
}, function(t) {
var o, r, i, a, s, l;
for (o = e.closest("form"), i = n.getOptions(o), l = [], a = 0, s = t.length; s > a; a++) r = t[a], 
l.push(n.add({
url:$.cloudinary.url("" + r.public_id + "." + r.format, i.custom),
thumb_url:$.cloudinary.url("" + r.public_id + "." + r.format, i.thumb)
}));
return l;
}), filepicker.pickAndStore(o, window.store_options, function(o) {
var r, i, a, s, l, u;
for (window.edit_page.isLoading(!0), console.log(o), r = e.closest("form"), t.closeAssetDialog(), 
a = o.length, u = [], s = 0, l = o.length; l > s; s++) i = o[s], u.push(function(e) {
return $.ajax({
url:"/r/v1/asset_images",
type:"POST",
dataType:"json",
crossDomain:!0,
data:{
asset:{
file:e,
tags:$("meta[name=cloudinary-tags]").attr("content")
}
},
beforeSend:function(e) {
return e.setRequestHeader("X-CSRF-Token", $('meta[name="csrf-token"]').attr("content"));
},
success:function(e) {
var t, o;
return o = function(e) {
var t, o;
return o = n.getOptions(r), t = e.message, n.add({
url:$.cloudinary.url("" + t.public_id + "." + t.format, o.custom),
thumb_url:$.cloudinary.url("" + t.public_id + "." + t.format, o.thumb)
}), a--, 0 === a ? (window.edit_page.isLoading(!1), window.edit_page.track("Editor - Upload Image Gallery"), 
window.edit_page.save(!0)) :void 0;
}, t = "/s/tasks/" + e.data.task.type + "/" + e.data.task.id + ".jsm", $B.poller(t, o, n.errorCallback);
},
error:function() {
return $B.customAlert("Sorry, there was an error processing your upload! Our engineers are investigating this issue!"), 
new $B.ExceptionReporter("STRIKINGLY FAILED TO UPLOAD IMAGES: " + JSON.stringify(e) + ", Response: " + JSON.stringify(resp)).report(), 
n.errorCallback();
}
});
}(i));
return u;
}, function(e) {
return e = e.toString(), t.closeAssetDialog(), $B.customAlert("Sorry, there was an error processing your upload! Please copy the following message and contact support: " + e), 
new $B.ExceptionReporter("FILEPICKER FAILED TO UPLOAD IMAGES CAUSED BY: " + e).report();
}), t.openAssetDialog());
}, n.prototype.errorCallback = function() {
return window.edit_page.isLoading(!1), alert(I18n.t("js.pages.edit.errors.upload_network_error"));
}, n.prototype.changeImage = function(e) {
var t;
return t = (this.sources.indexOf(this.current()) + e) % this.sources().length, 0 > t && (t += this.sources().length), 
this.current(this.sources()[t]);
}, n.prototype.nextImage = function() {
return this.changeImage(1);
}, n.prototype.prevImage = function() {
return this.changeImage(-1);
}, n.prototype.isLastElement = function(e) {
return e.parent().find(".thumb").index(e) === this.sources().length - 1;
}, n.prototype.afterRender = function(e) {
var t;
return this.isLastElement($(e)) ? (t = Bobcat.DOM.GALLERY($(e)), t.fancybox({
beforeLoad:function() {
var e;
return e = Bobcat.DOM.IMAGE_DESCRIPTION($(this.element)), this.title = Bobcat.DOM.IMAGE_TITLE($(this.element)), 
e.length ? this.title += " - " + Bobcat.DOM.IMAGE_DESCRIPTION($(this.element)) :void 0;
},
closeBtn:!1,
helpers:{
buttons:{},
thumbs:{
width:40,
height:40
}
},
margin:[ 20, 8, 8, 8 ],
padding:5,
arrows:!1,
nextClick:!0,
nextEffect:"fade",
prevEffect:"fade"
})) :void 0;
}, n;
}(Bobcat.Component), Bobcat.Button = function(t) {
function n(t, o) {
this.root = t, this.toggleTarget = e(this.toggleTarget, this), this.clickCancelEditorHandler = e(this.clickCancelEditorHandler, this), 
this.clickEditorHandler = e(this.clickEditorHandler, this), this.hasContentOrIsEditMode = e(this.hasContentOrIsEditMode, this), 
this.hasContent = e(this.hasContent, this), this.remove = e(this.remove, this), 
this.changeUrl = e(this.changeUrl, this), this.doneClickHandler = e(this.doneClickHandler, this), 
this.link_url = e(this.link_url, this), this.target = e(this.target, this), "undefined" == typeof o.new_target && (o.new_target = !0), 
n.__super__.constructor.call(this, this.root, o, {});
}
return o(n, t), n.include(Bobcat.UrlHelper), n.prototype.target = function() {
return this.new_target() && "" !== this.url() ? "_blank" :"_self";
}, n.prototype.link_url = function() {
var e;
return e = this.url(), this.addProtocol(e);
}, n.prototype.doneClickHandler = function(e) {
var t;
return t = this.addProtocol(this.url()), this.url(t), n.__super__.doneClickHandler.call(this, e);
}, n.prototype.changeUrl = function(e) {
return this.url(e.attr("data-url"));
}, n.prototype.remove = function(e) {
return this.text(""), this.url(""), this.new_target(!1), this.doneClickHandler(e);
}, n.prototype.hasContent = function() {
return this.text().length > 0;
}, n.prototype.hasContentOrIsEditMode = function() {
return this.hasContent() || !window.edit_page.isShowPage;
}, n.prototype.clickEditorHandler = function(e) {
return this.oldText = this.text(), this.oldUrl = this.url(), n.__super__.clickEditorHandler.call(this, e);
}, n.prototype.clickCancelEditorHandler = function() {
return this.text(this.oldText), this.url(this.oldUrl), this.hideEditorHandler();
}, n.prototype.toggleTarget = function() {
return this.new_target(!this.new_target());
}, n;
}(Bobcat.Component), Bobcat.Image = function(t) {
function n(t, o, r, i) {
var a = this;
this.root = t, this.parent = i, this.hasContentOrIsEditMode = e(this.hasContentOrIsEditMode, this), 
this.hasContent = e(this.hasContent, this), this.remove = e(this.remove, this), 
this.clickRemoveHandler = e(this.clickRemoveHandler, this), this.clickGalleryEditorHandler = e(this.clickGalleryEditorHandler, this), 
this.clickCancelEditorHandler = e(this.clickCancelEditorHandler, this), this.clickEditorHandler = e(this.clickEditorHandler, this), 
this.addFilter = e(this.addFilter, this), this.uploadFile = e(this.uploadFile, this), 
this.errorCallback = e(this.errorCallback, this), this.upload = e(this.upload, this), 
this.uploadWithoutIconLib = e(this.uploadWithoutIconLib, this), this.link = e(this.link, this), 
this.selectImage = e(this.selectImage, this), this.recover = e(this.recover, this), 
this.previewImage = e(this.previewImage, this), this.doneClickHandler = e(this.doneClickHandler, this), 
this.showDescriptionInput = e(this.showDescriptionInput, this), this.openAssetLib = e(this.openAssetLib, this), 
this.openDescriptionInput = e(this.openDescriptionInput, this), this.showLinkInput = e(this.showLinkInput, this), 
this.openLinkInput = e(this.openLinkInput, this), this.goToDescriptionField = e(this.goToDescriptionField, this), 
this.goToLinkUrlField = e(this.goToLinkUrlField, this), this.target = e(this.target, this), 
this.isNull(o.original_url) && (o.original_url = o.url), this.isNull(o.new_target) && (o.new_target = !0), 
o.linkInputEnabled = o.link_url ? o.link_url.length > 0 :!1, o.descriptionInputEnabled = o.caption ? o.caption.length > 0 :!1, 
this.isNull(o.caption) && (o.caption = ""), this.isNull(o.description) && (o.description = ""), 
n.__super__.constructor.call(this, this.root, o, r), this.parent && (this.selected = ko.dependentObservable(function() {
return a === a.parent.current();
}, this)), this.assetUrl = ko.dependentObservable(function() {
return window.asset_path(a.url());
}, this), this.loadingSpinner = !0;
}
return o(n, t), n.include(Bobcat.UrlHelper), n.include(Bobcat.ImageOptionHelper), 
n.prototype.target = function() {
return this.new_target() && "" !== this.link_url() ? "_blank" :"_self";
}, n.prototype.goToLinkUrlField = function(e, t) {
return e.preventDefault(), $(t).closest("form").find(".link_url").focus(), window.el = t;
}, n.prototype.goToDescriptionField = function(e, t) {
return e.preventDefault(), $(t).closest("form").find("textarea").focus(), window.el = t;
}, n.prototype.openLinkInput = function() {
return this.linkInputEnabled(!0);
}, n.prototype.showLinkInput = function() {
return this.linkInputEnabled();
}, n.prototype.openDescriptionInput = function() {
return this.descriptionInputEnabled(!0);
}, n.prototype.openAssetLib = function(e, t) {
var o;
return o = e.closest(".image-component").data("asset-type"), null != o && window.edit_page.Event.publish("AssetLibrary.suggestSet", o), 
this.upload(e, t, !0), window.edit_page.track("Click More Icons Button - Editor v1");
}, n.prototype.showDescriptionInput = function() {
return this.descriptionInputEnabled();
}, n.prototype.doneClickHandler = function(e) {
return n.__super__.doneClickHandler.call(this, e), window.edit_page.Event.publish("ImageComponent.afterChange", {
target:e.closest(".image-component")
});
}, n.prototype.previewImage = function(e) {
return this.tmpUrl || (this.tmpUrl = this.url()), this.url(e.attr("data-image-url")), 
this.onPreview = !0;
}, n.prototype.recover = function() {
return this.onPreview ? (this.url(this.tmpUrl), this.tmpUrl = "") :void 0;
}, n.prototype.selectImage = function(e) {
return this.url(e.attr("data-image-url")), this.tmpUrl = "", this.onPreview = !1, 
this.doneClickHandler(e.closest(".editor").find(".se-done-btn").first());
}, n.prototype.link = function() {
var e;
return e = this.link_url(), this.addProtocol(e);
}, n.prototype.uploadWithoutIconLib = function(e, t) {
return this.upload(e, t, void 0, {
hideTabs:[ $B.AssetDialog.ICON_LIB ]
});
}, n.prototype.upload = function(e, t, o, n) {
var r, i, a, s = this;
return null == n && (n = {}), e.target && (e = $(e.target)), "undefined" == typeof filepicker ? (alert(I18n.t("js.pages.edit.errors.upload_network_error")), 
void 0) :($B.log(window.filepicker_options), a = {
maxSize:6291456,
container:"s-upload-iframe",
mimetypes:[ "image/jpeg", "image/pjpeg", "image/png", "image/gif" ],
openTo:"COMPUTER",
services:[ "COMPUTER", "IMAGE_SEARCH", "URL", "FACEBOOK", "DROPBOX", "GOOGLE_DRIVE", "FLICKR", "INSTAGRAM", "PICASA" ]
}, i = $.extend({
mode:"single"
}, n), 1 === e.data("open-iconlib-tab") && (i.initialTabIdx = 2), null != o ? (i.initialTabIdx = 2, 
i.iconLibComponents = o === !0 ? "icon" :"background") :"BackgroundImage" === this.type() || "Blog.BackgroundImage" === this.type() ? i.iconLibComponents = "background" :"Image" === this.type() ? i.iconLibComponents = "icon" :"Blog.Image" === this.type() && (i.hideTabs = [ $B.AssetDialog.ICON_LIB ]), 
r = new Bobcat.AssetDialog(i, function(t) {
var o;
return o = s.getOptions(e.closest("form")), null != t.public_id ? ("BackgroundImage" === s.type() && "gif" !== t.format && (t.format = "jpg", 
o.custom.quality = 90, o.custom.flags = "progressive"), s.loadData({
url:$.cloudinary.url("" + t.public_id + "." + t.format, o.custom),
thumb_url:$.cloudinary.url("" + t.public_id + "." + t.format, o.thumb),
original_url:t.url
})) :(s.loadData({
url:t.url,
thumb_url:t.thumb_url,
original_url:t.url
}), "BackgroundImage" === s.type() && null != t.extraOptions && (null != t.extraOptions.backgroundClassName && s.selectedClassName(t.extraOptions.backgroundClassName), 
null != t.extraOptions.backgroundSizing && s.style(t.extraOptions.backgroundSizing))), 
"BackgroundImage" === s.type() ? window.edit_page.Event.publish("Background.changeBackgroundImage") :void 0;
}), filepicker.pickAndStore(a, window.store_options, function(t) {
var o, n;
return n = t[0], o = e.closest("form"), window.edit_page.isLoading(!0), s.oldUrl = s.url(), 
s.loadingSpinner && s.url($('meta[name="loading-image-spinner"]').attr("content")), 
s.uploadFile(n, s.getOptions(o)), r.closeAssetDialog();
}, function(e) {
return e = e.toString(), r.closeAssetDialog(), $B.customAlert("Sorry, there was an error processing your upload! Please copy the following message and contact support: " + e), 
new $B.ExceptionReporter("FILEPICKER FAILED TO UPLOAD IMAGES CAUSED BY: " + e).report();
}), r.openAssetDialog());
}, n.prototype.errorCallback = function(e) {
return this.url(this.oldUrl), window.edit_page.isLoading(!1), alert(I18n.t("js.pages.edit.errors.upload_network_error")), 
window.edit_page.track("Editor - UploadErrors", e.responseText);
}, n.prototype.uploadFile = function(e, t) {
var o = this;
return $.ajax({
url:"/r/v1/asset_images",
type:"POST",
dataType:"json",
crossDomain:!0,
data:{
asset:{
file:e,
tags:$("meta[name=cloudinary-tags]").attr("content")
}
},
beforeSend:function(e) {
return e.setRequestHeader("X-CSRF-Token", $('meta[name="csrf-token"]').attr("content"));
},
success:function(e) {
var n, r;
return r = function(e) {
var n;
return n = e.message, "BackgroundImage" === o.type() && "gif" !== n.format && (n.format = "jpg", 
t.custom.quality = 90, t.custom.flags = "progressive"), o.loadData({
url:$.cloudinary.url("" + n.public_id + "." + n.format, t.custom),
thumb_url:$.cloudinary.url("" + n.public_id + "." + n.format, t.thumb),
original_url:n.url
}), window.edit_page.isLoading(!1), window.edit_page.track("Editor - Upload Image"), 
"BackgroundImage" === o.type() ? (o.oldUrl = o.url(), window.edit_page.Event.publish("Background.changeBackgroundImage"), 
o.storeCommand()) :void 0;
}, console.log("Begin poll"), n = "/s/tasks/" + e.data.task.type + "/" + e.data.task.id + ".jsm", 
$B.poller(n, r, o.errorCallback);
},
error:this.errorCallback
});
}, n.prototype.addFilter = function(e) {
var t, o, n, r = this;
return "undefined" == typeof window.featherEditor || "undefined" == typeof filepicker ? (alert(I18n.t("js.pages.edit.errors.effects_network_error")), 
void 0) :(o = "free" === (null != (n = $S.user_meta || $S.userMeta) ? n.plan :void 0) ? [ "effects", "crop", "orientation", "resize", "sharpness", "brightness", "contrast" ] :[ "enhance", "effects", "crop", "orientation", "resize", "warmth", "brightness", "contrast", "saturation", "sharpness", "text", "redeye", "whiten", "blemish" ], 
t = function(e) {
return e = window.asset_path(e), e.replace("https", "http");
}, window.featherEditor.launch({
tools:o,
onSave:function(t, o) {
var n;
return window.edit_page.isLoading(!0), r.oldUrl = r.url(), r.loadingSpinner && r.url($('meta[name="loading-image-spinner"]').attr("content")), 
window.featherEditor.close(), n = e.closest("form"), r.uploadFile({
url:o,
persist:"no"
}, r.getOptions(n));
},
image:e.closest("form").find("img"),
url:t(this.url())
}));
}, n.prototype.clickEditorHandler = function(e) {
return this.oldUrl = this.url(), this.oldThumbUrl = this.thumb_url(), n.__super__.clickEditorHandler.call(this, e);
}, n.prototype.clickCancelEditorHandler = function() {
return this.url(this.oldUrl), this.thumb_url(this.oldThumbUrl), this.hideEditorHandler();
}, n.prototype.clickGalleryEditorHandler = function(e) {
return this.parent ? (this.parent.current(this), this.parent.gotoState("editor"), 
setTimeout(function() {
return $(window).scrollTo(e.closest(".editable").find(".editor"), {
easing:"easeOutQuint",
duration:300,
axis:"y",
offset:-150
});
}, 200)) :void 0;
}, n.prototype.clickRemoveHandler = function() {
return this.parent.sources.remove(this), this.parent.storeCommand();
}, n.prototype.remove = function() {
return this.url(this.TRANSPARENT_IMAGE_URL), this.thumb_url(this.TRANSPARENT_IMAGE_URL);
}, n.prototype.hasContent = function() {
return !this.isImageTransparent(this.url());
}, n.prototype.hasContentOrIsEditMode = function() {
return this.hasContent() || !window.edit_page.isShowPage;
}, n;
}(Bobcat.Component), Bobcat.TextStyle = function(e) {
function t(e, o, n) {
this.root = e, this.parent = n, t.__super__.constructor.call(this, this.root, o, {});
}
return o(t, e), t;
}(Bobcat.Component), Bobcat.BackgroundImage = function(t) {
function n(t, o) {
var r, i, a, s, l, u, d = this;
if (this.root = t, this.onDoneHandler = e(this.onDoneHandler, this), this.onClickHandler = e(this.onClickHandler, this), 
this.saveSelection = e(this.saveSelection, this), this.selectImage = e(this.selectImage, this), 
this.stockImages = e(this.stockImages, this), this.bgObject = e(this.bgObject, this), 
this.recover = e(this.recover, this), this.previewImage = e(this.previewImage, this), 
this.remove = e(this.remove, this), this.selectedStyleLazy = e(this.selectedStyleLazy, this), 
this.selectedStyle = e(this.selectedStyle, this), this.textStyle = e(this.textStyle, this), 
this.inImageMode = e(this.inImageMode, this), this.getSelectedClassName = e(this.getSelectedClassName, this), 
this.selectBackgroundVariation = e(this.selectBackgroundVariation, this), this.previewBackgroundVariation = e(this.previewBackgroundVariation, this), 
this.uploadFromLib = e(this.uploadFromLib, this), this.hasBackgroundVariations = e(this.hasBackgroundVariations, this), 
i = {}, i.textStyles = {
create:function(e) {
return new Bobcat.TextStyle(d.root, e.data, d);
}
}, null == o.backgroundVariation && (o.backgroundVariation = ""), null == o.selectedClassName && (o.selectedClassName = "strikingly-light-text"), 
(null == o.textStyles || 0 === o.textStyles.length) && (o.textStyles = [ {
displayName:"Light Text",
className:"strikingly-light-text"
}, {
displayName:"Dark Text",
className:"strikingly-dark-text"
} ]), this.backgroundVariations = [], null != ("undefined" != typeof $S && null !== $S ? null != (l = $S.conf) ? l.theme_background_variations :void 0 :void 0)) {
u = $S.conf.theme_background_variations;
for (r in u) s = u[r], a = $.extend(!0, {}, s), a.component = this, this.backgroundVariations.push(a);
}
n.__super__.constructor.call(this, this.root, o, i, null), this.opacity_f = ko.dependentObservable(function() {
return d.opacity() / 100;
}), this.onPreview = !1, this.formOpen = ko.observable(!1), this.loadingSpinner = !1, 
this.selectedClassName.subscribe(function(e) {
return d.triggerEvent("BackgroundImage.ChangeTextColor", e);
});
}
return o(n, t), n.prototype.hasBackgroundVariations = function() {
return this.backgroundVariations.length > 0;
}, n.prototype.uploadFromLib = function(e) {
return this.upload(e, null, !1);
}, n.prototype.previewBackgroundVariation = function(e) {
return this.oldUrl || (this.oldUrl = this.url(), this.oldStyle = this.style(), this.oldBackgroundVariation = this.backgroundVariation()), 
this.url(this.TRANSPARENT_IMAGE_URL), this.backgroundVariation(e.attr("data-class-name")), 
this.onPreview = !0;
}, n.prototype.selectBackgroundVariation = function(e) {
var t;
return this.url(this.TRANSPARENT_IMAGE_URL), this.backgroundVariation(e.attr("data-class-name")), 
this.saveSelection(), this.onPreview = !1, "function" == typeof (t = window.edit_page).track && t.track("Change Variation - Background - Editor v1"), 
this.triggerEvent("BackgroundImage.ChangeVariation", e), window.edit_page.Event.publish("Background.changeBackgroundVariation", {
target:e
});
}, n.prototype.getSelectedClassName = function() {
return !window.edit_page.isShowPage && this.hasBackgroundVariations() ? this.hasContent() ? this.selectedClassName() :this.backgroundVariation() :"" !== ("function" == typeof this.backgroundVariation ? this.backgroundVariation() :void 0) ? this.backgroundVariation() :!this.hasBackgroundVariations() || this.hasContent() ? this.selectedClassName() :"";
}, n.prototype.inImageMode = function() {
return this.hasBackgroundVariations() ? this.hasContent() || this.onPreview ? !0 :!1 :!0;
}, n.prototype.textStyle = function() {
var e, t = this;
return e = this.textStyles().filter(function(e) {
return e.className() === t.selectedClassName();
}), e[0];
}, n.prototype.selectedStyle = function() {
var e, t, o;
return t = function() {
switch (this.style()) {
case "cover":
return "cover";

case "contain":
return "contain";

case "100%":
return "100%";

case "stretch":
return "100%";

case "fit":
return "cover";

default:
return "auto";
}
}.call(this), e = function() {
switch (this.style()) {
case "tile":
return "repeat";

default:
return "no-repeat";
}
}.call(this), o = {
backgroundPosition:"49% 50%",
backgroundImage:"url(" + this.assetUrl() + ")",
backgroundRepeat:e,
backgroundSize:t
};
}, n.prototype.selectedStyleLazy = function() {
var e;
return e = this.selectedStyle(), e.backgroundImage = "url(" + asset_path("/assets/icons/transparent.png") + ")", 
e;
}, n.prototype.remove = function() {
return this.url(this.TRANSPARENT_IMAGE_URL), this.storeCommand();
}, n.prototype.previewImage = function(e) {
return this.oldUrl || (this.oldUrl = this.url(), this.oldStyle = this.style(), this.oldBackgroundVariation = this.backgroundVariation()), 
this.url(e.attr("data-url")), this.style(e.attr("data-style")), this.onPreview = !0;
}, n.prototype.recover = function() {
return this.onPreview ? (this.url(this.oldUrl), this.style(this.oldStyle), this.backgroundVariation(this.oldBackgroundVariation), 
this.oldUrl = "", this.oldStyle = "", this.oldBackgroundVariation = "", this.onPreview = !1) :void 0;
}, n.prototype.bgObject = function(e) {
return {
url:"http://uploads.striking.ly/page/images/backgrounds/" + e + ".jpg",
thumbUrl:"http://uploads.striking.ly/page/images/backgrounds/" + e + "-thumb.jpg",
style:"stretch",
component:this
};
}, n.prototype.stockImages = function(e) {
var t, o, n, r, i, a, s, l, u;
if ("solidBanner" === e) {
for (a = [ "banners/banner1", "bg3", "banners/banner3" ], l = [], o = 0, r = a.length; r > o; o++) t = a[o], 
l.push(this.bgObject(t));
return l;
}
for (s = [ "bg1", "bg5", "bg6" ], u = [], n = 0, i = s.length; i > n; n++) t = s[n], 
u.push(this.bgObject(t));
return u;
}, n.prototype.selectImage = function(e) {
return this.url(e.attr("data-url")), this.style(e.attr("data-style")), this.saveSelection(), 
this.triggerEvent("BackgroundImage.SelectImage", e);
}, n.prototype.saveSelection = function() {
return this.storeCommand(), this.oldUrl = "", this.oldStyle = "", this.oldBackgroundVariation = "", 
this.onPreview = !1, window.edit_page.unsavedChanges() && window.edit_page.track("Editor - Edit Background"), 
window.edit_page.saveWhenUnsaved();
}, n.prototype.onClickHandler = function(e) {
var t;
return t = e.parent().parent().find(".background-form"), this.formOpen() ? (t.slideUp(), 
this.formOpen(!1)) :(t.slideDown(), this.formOpen(!0));
}, n.prototype.onDoneHandler = function(e) {
var t;
return t = e.closest(".background-form"), t.slideUp(), window.edit_page.unsavedChanges() && window.edit_page.track("Editor - Edit Background"), 
window.edit_page.saveWhenUnsaved(), this.formOpen(!1);
}, n;
}(Bobcat.Image), Bobcat.SlideSettings = function(t) {
function n(t, o) {
var r = this;
this.root = t, this.data = o, this.isSkinny = e(this.isSkinny, this), this.onClickHandler = e(this.onClickHandler, this), 
this.initWhenBound = e(this.initWhenBound, this), this.layoutCount = ko.observable(0), 
this.layoutIndex = ko.observable(0), this.layoutStatus = ko.dependentObservable(function() {
return "" + (r.layoutIndex() + 1);
}), null == o.layout_variation && (o.layout_variation = ""), n.__super__.constructor.call(this, this.root, o);
}
return o(n, t), n.prototype.initWhenBound = function(e) {
var t;
return t = e.data("layout-presets"), this.layouts = _.pluck(t, "key"), this.layoutCount(this.layouts.length), 
this.layoutIndex(this.layouts.indexOf(this.layout_variation())), -1 === this.layoutIndex() && (this.layout_variation(this.layouts[0]), 
this.layoutIndex(0)), this.data.layout_variation = this.layout_variation;
}, n.prototype.onClickHandler = function() {
return this.layout_variation(this.layouts[(this.layoutIndex() + 1) % this.layouts.length]), 
this.layoutIndex(this.layouts.indexOf(this.layout_variation())), this.rootLastData = this.data, 
window.edit_page.unsavedChanges() && window.edit_page.track("Change Layout - Editor v1"), 
window.edit_page.saveWhenUnsaved();
}, n.prototype.isSkinny = function() {
return "skinny" === this.layout_variation();
}, n;
}(Bobcat.Component), Bobcat.Menu = function(e) {
function t(e) {
var o, n = this;
this.data = e, o = {}, o.components = {
create:function(e) {
var t, o, r, i;
o = {}, o.firstSlideBackground = function(e) {
return null == e && (e = "background1"), window.edit_page.data.slides()[0].components[e];
}, i = e.data;
for (t in i) r = i[t], o[t] = "Image" === r.type ? new Bobcat[r.type](n, r, {}, null) :new Bobcat[r.type](n, r), 
"undefined" != typeof o[t].init && o[t].init();
return o;
}
}, t.__super__.constructor.call(this, this, this.data, o), this.rootLastData = this.data;
}
return o(t, e), t.prototype.bind = function(e) {
var t, o, n, r;
if (e.length > 0) {
for (r = [], o = 0, n = e.length; n > o; o++) t = e[o], r.push(ko.applyBindings(this.components, t));
return r;
}
return console.warn("Cannot find .navigator");
}, t.prototype.hideAllEditors = function() {
return this.logo.hideEditorHandler();
}, t;
}(Bobcat.Component), Bobcat.Footer = function(e) {
function t(e) {
var o, n = this;
o = {
socialMedia:{
create:function(e) {
return new Bobcat[e.data.type](n, e.data, n);
}
},
copyright:{
create:function(e) {
return new Bobcat[e.data.type](n, e.data, n);
}
}
}, t.__super__.constructor.call(this, this, e, o), this.rootLastData = e;
}
return o(t, e), t.prototype.lastSlideBackground = function(e) {
var t;
return null == e && (e = "background1"), t = window.edit_page.data.slides().length - 1, 
window.edit_page.data.slides()[t].components[e];
}, t.prototype.bind = function(e) {
return e.length > 0 ? (ko.applyBindings(this, e.get(0)), this.socialMedia.bind()) :console.warn("Cannot find #footer");
}, t;
}(Bobcat.Component), Bobcat.Media = function(t) {
function n(t, o) {
var r, i = this;
this.root = t, this.inEditorAndHasNoContent = e(this.inEditorAndHasNoContent, this), 
this.hasNoContentAndIsEditMode = e(this.hasNoContentAndIsEditMode, this), this.hasContentOrIsEditMode = e(this.hasContentOrIsEditMode, this), 
this.hasContent = e(this.hasContent, this), this.showImage = e(this.showImage, this), 
this.showVideo = e(this.showVideo, this), this.doneClickHandler = e(this.doneClickHandler, this), 
this.clickCancelEditorHandler = e(this.clickCancelEditorHandler, this), this.clickEditorHandler = e(this.clickEditorHandler, this), 
r = {
video:{
create:function(e) {
var t;
return t = e.data, t.type = "Video", new Bobcat.Video(i.root, t, i);
}
},
image:{
create:function(e) {
var t;
return t = e.data, t.type = "Image", new Bobcat.Image(i.root, t, {}, i);
}
}
}, n.__super__.constructor.call(this, this.root, o, r);
}
return o(n, t), n.prototype.clickEditorHandler = function(e) {
return n.__super__.clickEditorHandler.call(this, e), this.image.clickEditorHandler(e), 
this.video.clickEditorHandler(e), this.triggerEvent("Media.BeforeChange", {
target:e
});
}, n.prototype.clickCancelEditorHandler = function(e) {
return this.image.clickCancelEditorHandler(e), this.video.clickCancelEditorHandler(e), 
this.hideEditorHandler();
}, n.prototype.doneClickHandler = function(e) {
return n.__super__.doneClickHandler.call(this, e), window.edit_page.Event.publish("Media.afterChange"), 
this.triggerEvent("Media.AfterChange", {
target:e
});
}, n.prototype.showVideo = function() {
return "video" === this.current() && this.video.html() && this.video.html().length > 0;
}, n.prototype.showImage = function() {
return "image" === this.current();
}, n.prototype.hasContent = function() {
return "video" === this.current() && this.video.html() || "image" === this.current() && this.image.url() && !this.isImageTransparent(this.image.url());
}, n.prototype.hasContentOrIsEditMode = function() {
return this.hasContent() || !window.edit_page.isShowPage;
}, n.prototype.hasNoContentAndIsEditMode = function() {
return !window.edit_page.isShowPage && !this.hasContent();
}, n.prototype.inEditorAndHasNoContent = function() {
return !this.isState("editor") && ("video" === this.current() && (!this.video.html() || 0 === this.video.html().length) || "image" === this.current() && 0 === this.image.url().length);
}, n;
}(Bobcat.Component), Bobcat.EmailForm = function(t) {
function n(t, o) {
this.root = t, this.doneClickHandler = e(this.doneClickHandler, this), this.clickCancelEditorHandler = e(this.clickCancelEditorHandler, this), 
this.clickEditorHandler = e(this.clickEditorHandler, this), this.hasMessageBox = e(this.hasMessageBox, this), 
this.hasNameBox = e(this.hasNameBox, this), this.hasEmailBox = e(this.hasEmailBox, this), 
this.isEmailInvalid = e(this.isEmailInvalid, this), this.isNameEmpty = e(this.isNameEmpty, this), 
this.isSuccess = e(this.isSuccess, this), this.isError = e(this.isError, this), 
this.submit = e(this.submit, this), o.isLoading = !1, o.recipient || (o.recipient = ""), 
this.isNull(o.hideMessageBox) && (o.hideMessageBox = !1), this.isNull(o.hide_name) && (o.hide_name = !1), 
this.isNull(o.hide_email) && (o.hide_email = !1), this.isNull(o.thanksMessage) && (o.thanksMessage = "Thanks for your message!"), 
null == $S.page_meta.edit_count && $S.page_meta.show_strikingly_logo && (o.thanksMessage = $("#brand-info").html().replace(/\${thanksMessage}/, $("<div></div>").text(o.thanksMessage).html())), 
this.isNull(o.name_label) && (o.name_label = "Name", o.email_label = "Email", o.message_label = "Message"), 
this.isNull(o.submit_label) && (o.submit_label = "Submit"), n.__super__.constructor.call(this, this.root, o, {}), 
this.status = ko.observable(""), this.invalidEmail = ko.observable(!1), this.invalidName = ko.observable(!1);
}
return o(n, t), n.include(Bobcat.UrlHelper), n.prototype.isRecipientEmailValid = function() {
return 0 === this.recipient().length || this.isEmail(this.recipient());
}, n.prototype.reset = function() {
return this.invalidEmail(!1), this.invalidName(!1), this.isLoading(!1);
}, n.prototype.submit = function(e) {
var t = this;
if (window.edit_page.isShowPage) return this.reset(), this.isLoading(!0), e.closest("form").ajaxSubmit({
success:function(e) {
return console.log(e), t.status(e.status), t.isLoading(!1), Bobcat.PageAE.gaPushUserSite([ "_trackEvent", "Actions", "EmailCollected" ]), 
window.edit_page.Event.publish("Site.contactForm.submit");
},
error:function(e) {
var o;
if (o = jQuery.parseJSON(e.responseText), console.log(o), t.status(o.status), t.isLoading(!1), 
!o.message) throw alert(o.html), o.html;
return o.message.invalid_email && t.invalidEmail(!0), o.message.invalid_name ? t.invalidName(!0) :void 0;
}
});
}, n.prototype.isError = function() {
return "error" === this.status();
}, n.prototype.isSuccess = function() {
var e;
return e = this.status(), "ok" === e;
}, n.prototype.isNameEmpty = function() {
return this.invalidName();
}, n.prototype.isEmailInvalid = function() {
return this.invalidEmail();
}, n.prototype.hasEmailBox = function() {
return !this.hide_email();
}, n.prototype.hasNameBox = function() {
return !this.hide_name();
}, n.prototype.hasMessageBox = function() {
return !this.hideMessageBox();
}, n.prototype.clickEditorHandler = function(e) {
return n.__super__.clickEditorHandler.call(this, e);
}, n.prototype.clickCancelEditorHandler = function() {
return this.hideEditorHandler();
}, n.prototype.doneClickHandler = function(e) {
return n.__super__.doneClickHandler.call(this, e), window.edit_page.track("Edit Contact Form - Editor v1");
}, n;
}(Bobcat.Component);
}.call(this), function() {
var e, t = function(e, t) {
return function() {
return e.apply(t, arguments);
};
}, o = {}.hasOwnProperty, n = function(e, t) {
function n() {
this.constructor = e;
}
for (var r in t) o.call(t, r) && (e[r] = t[r]);
return n.prototype = t.prototype, e.prototype = new n(), e.__super__ = t.prototype, 
e;
};
e = function(e) {
var t, o, n, r, i, a, s, l;
return t = [ 60, 80, 100, 130, 160 ], n = 14, o = 84, a = function(e) {
var t, o;
return t = 100, o = parseFloat($(e.getBody()).css("font-size")), $(e.getBody()).find("*").each(function() {
var e, n;
return e = null != (n = this.style) ? n.fontSize :void 0, -1 !== (null != e ? e.indexOf("%") :void 0) ? (t = parseFloat(e), 
o = parseFloat($(this).css("font-size")), !1) :void 0;
}), {
perc:t,
px:o
};
}, i = function(e, r) {
var i, s, l;
return s = a(e), s.px >= o && r > 0 ? !1 :s.px <= n && 0 > r ? !1 :(l = $.inArray(s.perc, t), 
-1 === l && (l = $.inArray(100, t)), i = l + r, i > t.length - 1 ? !1 :0 > i ? !1 :t[i] + "%");
}, l = function(e, t) {
var o;
return o = e.selection.getBookmark(), e.selection.select(e.getBody(), !0), e.execCommand("FontSize", null, t), 
e.execCommand("LineHeight", null, t), e.selection.moveToBookmark(o);
}, s = function(e) {
var t;
return (t = i(e, 1)) ? (l(e, t), window.analytics.track("Font Size Up - Editor v1")) :void 0;
}, r = function(e) {
var t;
return (t = i(e, -1)) ? (l(e, t), window.analytics.track("Font Size Down - Editor v1")) :void 0;
}, e.addButton("fontsizeup", {
title:"Increase Font Size",
image:asset_path("/assets/editor2/tinymce-fontsize-up.png"),
onclick:function() {
return s(e);
}
}), e.addButton("fontsizedown", {
title:"Decrease Font Size",
image:asset_path("/assets/editor2/tinymce-fontsize-down.png"),
onclick:function() {
return r(e);
}
}), e.onExecCommand.add(function(e, t) {
var o;
return "InsertUnorderedList" === t || "InsertOrderedList" === t ? (o = i(e, 0), 
$(e.getBody()).find("li *").each(function() {
var e, t;
return (null != (e = this.style) ? null != (t = e.fontSize) ? t.indexOf(!0) :void 0 :void 0) ? this.style.fontSize = "" :void 0;
}), l(e, o)) :void 0;
});
}, $B.RichText = function(o) {
function r(e, o) {
this.root = e, this.getFontStyle = t(this.getFontStyle, this), this.isCenterAligned = t(this.isCenterAligned, this), 
this.isRightAligned = t(this.isRightAligned, this), this.isLeftAligned = t(this.isLeftAligned, this), 
this.hasContentOrIsEditMode = t(this.hasContentOrIsEditMode, this), this.showEmptyText = t(this.showEmptyText, this), 
this.hasContent = t(this.hasContent, this), this.clickEditorHandler = t(this.clickEditorHandler, this), 
this.changeFontHandler = t(this.changeFontHandler, this), this.clickCancelEditorHandler = t(this.clickCancelEditorHandler, this), 
this.textValue = t(this.textValue, this), this.doneClickHandler = t(this.doneClickHandler, this), 
this._triggerEvent = t(this._triggerEvent, this), this.deleteHandler = t(this.deleteHandler, this), 
r.__super__.constructor.call(this, this.root, o), this.textarea = null, this.editor = null, 
this.originText = null;
}
return n(r, o), r.TINYMCE_OPTIONS = {
gecko_spellcheck:!0,
theme:"advanced",
skin:"striking",
plugins:"autoresize,paste,inlinepopups",
forced_root_block:"div",
remove_linebreaks:!1,
theme_advanced_buttons1:"bold,italic,underline,link,unlink,bullist,numlist,justifyleft,justifycenter,justifyright,justifyfull,fontsizeup,fontsizedown",
theme_advanced_buttons2:"",
theme_advanced_statusbar_location:"none",
theme_advanced_toolbar_align:"left",
paste_text_sticky:!0,
paste_remove_styles:!0,
paste_strip_class_attributes:"all",
convert_urls:!1,
relative_urls:!1,
valid_styles:{
"*":"text-align,text-decoration,font-size"
}
}, r.prototype.deleteHandler = function(e, t) {
return t.stopPropagation(), this.editor && this.editor.tinymce() ? (this.editor.tinymce().setContent(""), 
this.editor.tinymce().focus()) :void 0;
}, r.prototype.init = function() {}, r.prototype._triggerEvent = function(e, t) {
return this.triggerEvent(e, {
component:this,
target:t.closest(".text-component")
});
}, r.prototype.doneClickHandler = function(e) {
return this.done(), r.__super__.doneClickHandler.call(this, e), e ? (window.edit_page.Event.publish("RichTextComponent.afterTextChange", {
target:e.closest(".text-component")
}), this._triggerEvent("Text.Save", e)) :void 0;
}, r.prototype.textValue = function() {
return this.value().replace(/<\/?.*?>/g, "");
}, r.prototype.clickCancelEditorHandler = function(e) {
return this.cancel(), this.hideEditorHandler(), this._triggerEvent("Text.Cancel", e);
}, r.prototype.changeFontHandler = function(e) {
return this.doneClickHandler(e), window.edit_page.showStylePanel(e.attr("text-type")), 
window.edit_page.showMenu(), this._triggerEvent("Text.ChangeFont", e);
}, r.prototype.clickEditorHandler = function(t) {
var o = this;
if (r.__super__.clickEditorHandler.call(this, t)) return this.textarea = t.find($B.DOM.EDITOR).find("textarea"), 
this.originText = this.filterText(this.textarea.val()), this.editor && this.editor.tinymce() || (this.editor = this.textarea.tinymce($.extend({
setup:function(n) {
return n.onChange.add(function() {
return o._triggerEvent("Text.ChangeText", t);
}), e(n), n.onInit.add(function(e) {
return $(e.getBody()).css({
"font-size":t.css("font-size"),
"text-align":t.css("text-align")
}), e.pasteAsPlainText = !0;
}), n.onKeyDown.add(function(e, t) {
return 13 === t.keyCode && t.shiftKey && window.editorTracker.closeLastEditor() ? ($(window).resize(), 
t.preventDefault()) :void 0;
}), n.onClick.add(function(e) {
return $(e.getBody()).find("a").each(function(e, t) {
var n;
return n = $(t).attr("href"), o.pattern || (o.pattern = new RegExp("^((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$", "i")), 
o.pattern.test(n) ? ($(t).attr("href", "http://" + n), $(t).attr("data-mce-href", "http://" + n)) :void 0;
});
});
},
init_instance_callback:function(e) {
return e.execCommand("mceAutoResize");
}
}, this.constructor.TINYMCE_OPTIONS))), this.editor.tinymce() && this.editor.tinymce().focus(), 
this.editor.init(), this._triggerEvent("Text.ClickEditor", t);
}, r.prototype.hasContent = function() {
return !/^\s*$/.test(this.value());
}, r.prototype.showEmptyText = function() {
return !this.hasContent() && !this.isState("editor");
}, r.prototype.hasContentOrIsEditMode = function() {
return this.hasContent() || !window.edit_page.isShowPage;
}, r.prototype.isLeftAligned = function() {
return /style="text-align: left;"/.test(this.value());
}, r.prototype.isRightAligned = function() {
return /style="text-align: right;"/.test(this.value());
}, r.prototype.isCenterAligned = function() {
return /style="text-align: center;"/.test(this.value());
}, r.prototype.getFontStyle = function(e, t) {
var o, n;
return null == t && (t = window.edit_page.data), e || (e = "body"), o = null != t ? "function" == typeof t[n = e + "Font"] ? t[n]() :void 0 :void 0, 
"" === o && (o = "inherit"), o ? {
fontFamily:o
} :{};
}, r.prototype.done = function() {
var e;
return this.editor && this.editor.tinymce() ? (e = this.filterText(this.textarea.val()), 
this.value(e), this.originText = e) :void 0;
}, r.prototype.filterText = function(e) {
return e = e.replace(/^<div>(\s|&nbsp;)?<\/div>$/, ""), e.replace("<p><br></p>", "");
}, r.prototype.cancel = function() {
return this.editor && this.editor.tinymce() ? (this.value(this.originText), this.textarea.tinymce().execCommand("mceSetContent", !1, this.originText)) :void 0;
}, r.prototype.beforeMoveHandler = function() {
return this.editor && this.editor.tinymce() ? (this.editor.tinymce().remove(), this.gotoState("normal")) :void 0;
}, r.prototype.afterMoveHandler = function() {}, r;
}($B.Text);
}.call(this), function() {
var e = function(e, t) {
return function() {
return e.apply(t, arguments);
};
}, t = {}.hasOwnProperty, o = function(e, o) {
function n() {
this.constructor = e;
}
for (var r in o) t.call(o, r) && (e[r] = o[r]);
return n.prototype = o.prototype, e.prototype = new n(), e.__super__ = o.prototype, 
e;
};
Bobcat.HtmlComponent = function(t) {
function n(t, o) {
this.root = t, this.saveComponent = e(this.saveComponent, this), this.reloadIframe = e(this.reloadIframe, this), 
this.doneClickHandler = e(this.doneClickHandler, this), this.update = e(this.update, this), 
this.clickEditorHandler = e(this.clickEditorHandler, this), this.initWhenBound = e(this.initWhenBound, this), 
this.destroy = e(this.destroy, this), this.data = o, o.htmlValue = this.htmlDecode(o.value), 
o.selected_app_name || (o.selected_app_name = null), "undefined" == typeof o.render_as_iframe && (o.render_as_iframe = !1), 
o.app_list || (o.app_list = "{}"), o.editorIframeSrc = o.selected_app_name ? "/s/html_editor/" + o.id :"/s/editor/app_store_placeholder", 
n.__super__.constructor.call(this, this.root, o, {}), this.appList = jQuery.parseJSON(o.app_list), 
this.originalIframeSrc = this.editorIframeSrc();
}
return o(n, t), n.include(Bobcat.HtmlHelper), n.prototype.destroy = function() {
var e;
return e = $.ajax("/s/components/" + this.id(), {
type:"DELETE",
dataType:"json",
beforeSend:function(e) {
return e.setRequestHeader("X-CSRF-Token", $('meta[name="csrf-token"]').attr("content"));
},
success:function() {},
error:function(e) {
var t;
return t = jQuery.parseJSON(e.responseText);
}
});
}, n.prototype.initWhenBound = function(e) {
var t;
return t = e.parent().find("iframe").first(), Bobcat.TH.resizeIFrame(t);
}, n.prototype.clickEditorHandler = function() {
var e, t, o = this;
return t = {
id:this.id(),
value:this.value(),
htmlValue:this.htmlValue(),
render_as_iframe:this.render_as_iframe(),
app_list:this.app_list(),
selected_app_name:this.selected_app_name()
}, e = new $B.AppStoreDialog(t, function(t) {
return o.update(t), e.close();
}, function() {
return e.close();
});
}, n.prototype.update = function(e) {
return e.id === this.id() ? (this.value(e.value), this.htmlValue(e.htmlValue), this.render_as_iframe(e.render_as_iframe), 
this.app_list(e.app_list), this.selected_app_name(e.selected_app_name), this.saveComponent(), 
window.edit_page.unsavedChanges() && Bobcat.AE.trackWithoutExternalService("Editor - Edited " + this.type()), 
window.edit_page.saveWhenUnsaved(!0), this.storeCommand()) :void 0;
}, n.prototype.doneClickHandler = function(e) {
return this.done(e) !== !1 ? n.__super__.doneClickHandler.call(this, e) :void 0;
}, n.prototype.cancel = function() {
return this.value(this.htmlEncode(this.originText)), this.htmlValue(this.originText);
}, n.prototype.reloadIframe = function() {
var e;
return this.iframeSrcQ || (this.iframeSrcQ = 0), e = "" + this.originalIframeSrc + "?q=" + ++this.iframeSrcQ, 
~e.indexOf("/s/editor/app_store_placeholder") && (e = "/s/html_editor/" + this.id(), 
this.originalIframeSrc = e), this.editorIframeSrc(e);
}, n.prototype.saveComponent = function() {
var e, t = this;
return e = ko.mapping.toJS(this), $.ajax("/s/components/" + this.id(), {
dataType:"json",
type:"PUT",
data:{
component:{
value:ko.toJSON(e)
}
},
success:function() {
return t.reloadIframe();
}
});
}, n;
}(Bobcat.Component);
}.call(this), function() {
var e = function(e, t) {
return function() {
return e.apply(t, arguments);
};
}, t = {}.hasOwnProperty, o = function(e, o) {
function n() {
this.constructor = e;
}
for (var r in o) t.call(o, r) && (e[r] = o[r]);
return n.prototype = o.prototype, e.prototype = new n(), e.__super__ = o.prototype, 
e;
};
Bobcat.BlogCollectionComponent = function(t) {
function n(t, o) {
this.root = t, this.doneClickHandler = e(this.doneClickHandler, this), this.clickEditorHandler = e(this.clickEditorHandler, this), 
this.loadPosts = e(this.loadPosts, this), n.__super__.constructor.call(this, this.root, o), 
this.page = 1, this.previewNumber = null, this.loadPosts(), this.root.addSubscriber("BlogManager.CloseDialog", this.loadPosts);
}
return o(n, t), n.prototype.setupNavButtons = function(e, t) {
var o, n, r = this;
return n = e.find(".s-blog-prev-link"), o = e.find(".s-blog-next-link"), t === this.page ? n.hide() :n.show().click(function() {
return r.loadPosts(r.page + 1);
}), 1 === this.page ? o.hide() :o.show().click(function() {
return r.loadPosts(r.page - 1);
});
}, n.prototype.clearPosts = function() {
var e, t;
return e = $(".s-blog-col-placeholder"), t = e.height(), e.html("").css("height", t);
}, n.prototype.loadDataIntoTemplate = function(e) {
var t, o, n, r, i;
if (t = $(".s-blog-col-placeholder"), "undefined" != typeof moment && null !== moment) for (i = e.blogPosts, 
n = 0, r = i.length; r > n; n++) o = i[n], o.publishedAt = moment(o.publishedAt).format("MMMM D");
return $B.log("[Blog Preview Section] tmplData = ", e), t.html($("#blog-collection-tmpl").tmpl(e)), 
t.css("height", "auto"), this.setupNavButtons(t, e.pagination.blogPosts.totalPages), 
$(window).resize();
}, n.prototype.loadPosts = function(e, t) {
var o, n, r = this;
return null == e && (e = 1), null == t && (t = this.previewNumber), this.page = e, 
this.clearPosts(), o = $S.page_meta.page_id || $S.page_meta.id, n = "/r/v1/pages/" + o + ("/blog?expand=blogPosts&limit=" + t + "&page=" + e), 
$.ajax({
type:"GET",
url:n,
beforeSend:function(e) {
return e.setRequestHeader("X-CSRF-Token", $('meta[name="csrf-token"]').attr("content"));
},
contentType:"application/json",
success:function(e) {
var t;
return console.log("Success: ", e), t = e.data.blog, r.previewNumber || (r.previewNumber = e.data.blog.blogSettings.previewNumber), 
r.loadDataIntoTemplate(t);
},
error:function(e) {
return console.log("Error: ", e);
}
});
}, n.prototype.clickEditorHandler = function() {
return this.dialog = new $B.BlogManagerDialog(), this.dialog.open();
}, n.prototype.doneClickHandler = function(e) {
return n.__super__.doneClickHandler.call(this, e);
}, n;
}(Bobcat.Component);
}.call(this), function() {
ko.bindingHandlers.runWhenBound = {
init:function(e, t) {
return t()($(e));
}
}, ko.bindingHandlers.enterKey = {
init:function(e, t, o, n) {
var r, i;
return i = function(e) {
return 13 === e.which ? t().call(this, e) :void 0;
}, r = function() {
return {
keyup:i
};
}, ko.bindingHandlers.event.init(e, r, o, n);
}
}, ko.bindingHandlers.enterKeyPress = {
init:function(e, t, o, n) {
var r, i;
return i = function(o) {
return 13 === o.which ? t().call(this, o, e) :!0;
}, r = function() {
return {
keypress:i
};
}, ko.bindingHandlers.event.init(e, r, o, n);
}
}, ko.bindingHandlers.className = {
update:function(e, t) {
var o;
return e.__ko__previousClassValue__ && $(e).removeClass(e.__ko__previousClassValue__), 
o = ko.utils.unwrapObservable(t()), $(e).addClass(o), e.__ko__previousClassValue__ = o;
}
}, ko.bindingHandlers.htmlValue = {
init:function(e, t, o) {
return ko.utils.registerEventHandler(e, "blur", function() {
var n, r, i;
return i = t(), r = e.innerHTML, ko.isWriteableObservable(i) ? i(r) :(n = o(), n._ko_property_writers && n._ko_property_writers.htmlValue ? n._ko_property_writers.htmlValue(r) :void 0);
});
},
update:function(e, t) {
var o;
return o = ko.utils.unwrapObservable(t()), (null === o || void 0 === o) && (o = ""), 
"textarea" === e.tagName.toLowerCase() ? $(e).val(o) :e.innerHTML = o;
}
}, ko.bindingHandlers.escapedValue = {
init:ko.bindingHandlers.value.init,
update:function(e, t) {
var o, n, r;
return r = ko.utils.unwrapObservable(t()), o = /<script\b[^>]*>([\s\S]*?)<\/script>/gim, 
n = /<\/script>/gim, r && (r = r.replace(o, "").replace(n, "")), t()(r), ko.bindingHandlers.value.update(e, t);
}
}, ko.bindingHandlers.mouseenter = {
init:function(e, t) {
return $(e).mouseenter(function(e) {
return t()($(this), e);
});
},
update:function() {}
}, ko.bindingHandlers.mouseleave = {
init:function(e, t) {
return $(e).mouseleave(function(e) {
return t()($(this), e);
});
},
update:function() {}
}, ko.bindingHandlers.mouseover = {
init:function(e, t) {
return $(e).mouseover(function(e) {
return t()($(this), e);
});
},
update:function() {}
}, ko.bindingHandlers.mouseout = {
init:function(e, t) {
return $(e).mouseout(function(e) {
return t()($(this), e);
});
},
update:function() {}
}, ko.bindingHandlers.mouseclick = {
init:function(e, t) {
return $(e).click(function(e) {
return t()($(this), e);
});
},
update:function() {}
}, ko.bindingHandlers.fadeVisible = {
init:function(e, t) {
return $(e).toggle(ko.utils.unwrapObservable(t()));
},
update:function(e, t) {
return ko.utils.unwrapObservable(t()) ? $(e).css("visibility", "visible").stop().fadeTo(600, 1) :$(e).stop().fadeTo(400, 0, function() {
return $(e).css("visibility", "hidden");
});
}
}, ko.bindingHandlers.fadeVisibleAndHide = {
init:function(e, t) {
return $(e).toggle(ko.utils.unwrapObservable(t()));
},
update:function(e, t) {
return ko.utils.unwrapObservable(t()) ? $(e).css("visibility", "visible").stop().fadeTo(600, 1) :$(e).stop().hide();
}
}, ko.bindingHandlers.data = {
update:function(e, t) {
var o, n, r, i;
r = ko.utils.unwrapObservable(t()) || {}, i = [];
for (o in r) n = r[o], n = ko.utils.unwrapObservable(n), "other" === o && "bananas" !== n && console.log(n), 
i.push($(e).data(o, n));
return i;
}
}, ko.bindingHandlers.bind = {
init:function(e, t) {
var o, n, r;
return r = ko.utils.unwrapObservable(t()), o = ko.utils.unwrapObservable(r.data), 
n = ko.utils.unwrapObservable(r.html), n ? ($(e).html(n), ko.applyBindings(o, e)) :void 0;
},
update:function(e, t) {
var o, n, r;
return r = ko.utils.unwrapObservable(t()), o = ko.utils.unwrapObservable(r.data), 
n = ko.utils.unwrapObservable(r.html), n ? ($(e).html(n), ko.applyBindings(o, e)) :void 0;
}
}, ko.bindingHandlers.slideVisible = {
init:function(e, t) {
var o;
return o = t(), $(e).toggle(o), $(e).data("animating", !1);
},
update:function(e, t) {
var o;
return o = t(), o ? ($(e).data("animating", !0), $(e).stop().slideDown(600, "swing", function() {
return $(this).data("animating", !1);
})) :($(e).data("animating", !0), $(e).slideUp(600, "swing", function() {
return $(this).data("animating", !1);
}));
}
}, ko.bindingHandlers.slideVisibleAndMoveTo = {
init:function(e, t) {
var o;
return o = t(), $(e).toggle(o), $(e).data("animating", !1);
},
update:function(e, t) {
var o;
return o = t(), o ? ($(e).data("animating", !0), $("html, body").stop().animate({
scrollTop:$(e).parent().offset().top - 100
}, 1200, "easeInOutQuart", function() {
return $(e).slideDown(600, "swing", function() {
return $(this).data("animating", !1);
});
})) :($(e).data("animating", !0), $(e).slideUp(600, "swing", function() {
return $(this).data("animating", !1);
}));
}
}, ko.bindingHandlers.bannerVisible = {
init:function(e, t, o, n) {
return n.isFirst() && n.select(), $(e).show().css({
left:"0%"
});
},
update:function(e, t, o, n) {
var r, i, a, s;
if (s = $(e), a = ko.utils.unwrapObservable(t()), r = n.parent.direction(), a) {
if (n.animated) return;
return console.log("show " + n.index() + " " + r), i = r > 0 ? "100%" :"-100%", 
s.stop().css({
left:i
}).animate({
left:"0%"
}), n.animated = !0;
}
return n.animated !== !1 ? (console.log("hide " + n.index() + " " + r), i = r > 0 ? "-100%" :"100%", 
s.stop().css({
left:"0%"
}).animate({
left:i
}), n.animated = !1) :void 0;
}
}, ko.bindingHandlers.slidyButtonSlide = {
init:function() {},
update:function(e, t) {
var o, n, r;
if (r = t()) ; else if (o = $(e).children(".icon"), n = $(e).children(".title"), 
!$(e).data("mouseover")) return n.stop(!0), n.css("left", "0"), n.hide("slide", {
direction:"left"
}, 250), n.removeClass("hover"), o.removeClass("hover");
}
}, ko.bindingHandlers.slideVisibleWidth = {
init:function(e, t) {
var o;
return o = t(), $(e).toggle(o);
},
update:function(e, t) {
var o;
return o = t(), o ? $(e).show("slide", {
direction:"right"
}, 600) :$(e).hide("slide", {
direction:"right"
}, 600);
}
}, ko.bindingHandlers.theme = {
init:function(e, t) {
var o;
return o = ko.utils.unwrapObservable(t()), $(e).addClass(o), $(e).data("theme", o);
},
update:function(e, t) {
var o;
return o = ko.utils.unwrapObservable(t()), $(e).removeClass($(e).data("theme")), 
$(e).addClass(o), $(e).data("theme", o);
}
}, ko.bindingHandlers.currentDisabled = {
init:function(e, t) {
var o;
return o = ko.utils.unwrapObservable(t()), o && o.style && o.style.fontFamily ? $(e).removeAttr("disabled") :$(e).attr("disabled", "disabled");
},
update:function(e, t) {
var o;
return o = ko.utils.unwrapObservable(t()), o && o.style && o.style.fontFamily ? $(e).removeAttr("disabled") :$(e).attr("disabled", "disabled");
}
}, ko.bindingHandlers.ensureVisible = {
init:function() {},
update:function(e, t) {
var o, n, r, i, a, s;
if (ko.utils.unwrapObservable(t())) return o = $(e), n = o.parent(), s = o.position().top, 
r = s + o.height(), a = n.scrollTop(), i = n.height(), a > s || r > i ? n.scrollTo(o) :void 0;
}
}, ko.bindingHandlers.background = {
init:function(e, t) {
var o;
return o = ko.utils.unwrapObservable(t()), $(e).attr("src", o);
},
update:function(e, t) {
var o;
return o = ko.utils.unwrapObservable(t()), $(e).attr("src", o);
}
}, ko.bindingHandlers.inverseChecked = {
init:function(e, t, o) {
var n, r, i;
return i = t(), n = ko.dependentObservable({
read:function() {
return !i();
},
write:function(e) {
return i(!e);
},
disposeWhenNodeIsRemoved:e
}), r = function() {
return n;
}, ko.utils.domData.set(e, "newValueAccessor", r), ko.bindingHandlers.checked.init(e, r, o);
},
update:function(e) {
return ko.bindingHandlers.checked.update(e, ko.utils.domData.get(e, "newValueAccessor"));
}
}, ko.bindingHandlers.computedStyles = {
init:function() {}
};
}.call(this), function() {
var e, t = [].indexOf || function(e) {
for (var t = 0, o = this.length; o > t; t++) if (t in this && this[t] === e) return t;
return -1;
};
e = window.Bobcat || {}, e.SocialMediaConfig = function() {
function e(e) {
this.settings = e;
}
return e.prototype.get = function(e) {
return this.settings[e];
}, e.prototype.getDefaultButtonListData = function() {
return [ {
type:"Facebook",
show_button:!0,
url:""
}, {
type:"Twitter",
show_button:!0,
url:""
}, {
type:"GPlus",
show_button:!0,
url:""
}, {
type:"LinkedIn",
show_button:!1,
url:""
} ];
}, e.prototype.updateButtonListData = function(e) {
var o, n, r, i, a, s, l, u;
for (o = this.getDefaultButtonListData(), i = function() {
var t, o, r, i;
for (r = e.button_list, i = [], t = 0, o = r.length; o > t; t++) n = r[t], i.push(n.type);
return i;
}(), u = [], a = 0, s = o.length; s > a; a++) r = o[a], l = r.type, t.call(i, l) < 0 ? u.push(e.button_list.push(r)) :u.push(void 0);
return u;
}, e;
}();
}.call(this), function() {
$B.Services = {};
}.call(this), function() {
var e;
$B.Services.BaseService = function() {
function t() {
return e.apply(this, arguments);
}
return t.loadedRes = {}, e = function() {}, t.prototype.loadCss = function(e) {
var t;
return null == $B.Services.BaseService.loadedRes[e] ? (t = $("<link href='" + e + "' rel='stylesheet' type='text/css' />"), 
$("head").append(t), $B.Services.BaseService.loadedRes[e] = t) :void 0;
}, t.prototype.loadJs = function(e) {
var t;
return null == $B.Services.BaseService.loadedRes[e] ? (t = $("<script href='" + e + "' type='text/javascript'></script>"), 
$("head").append(t), $B.Services.BaseService.loadedRes[e] = t) :void 0;
}, t.prototype.pause = function() {}, t.prototype.resume = function() {}, t.prototype.terminate = function() {}, 
t;
}();
}.call(this), function() {
$B.Services.Bootloader = function() {
function Bootloader(e) {
this.servicesMeta = e, this.services = {};
}
return Bootloader.prototype.load = function() {
var serviceMeta, _i, _len, _ref, _results, _this = this;
for (_ref = this.servicesMeta, _results = [], _i = 0, _len = _ref.length; _len > _i; _i++) serviceMeta = _ref[_i], 
_results.push(function(serviceMeta) {
try {
return $.getScript(serviceMeta.mainJs).done(function() {
var cls;
return cls = eval(serviceMeta.mainClass), _this.services[serviceMeta.mainClass] = new cls(serviceMeta);
});
} catch (err) {
return $B.error("Plugin " + serviceMeta.mainClass + " failed to load or initialize!");
}
}(serviceMeta));
return _results;
}, Bootloader;
}(), runAfterDomBinding.add("strikinglyServices", function() {
return window.edit_page.isShowPage ? (window.__serviceHub = new $B.Services.ServiceHub(), 
new $B.Services.Bootloader($S.page_meta.services).load()) :void 0;
});
}.call(this), function() {
$B.Services.ServiceHub = function() {
function e() {
this.eventHub = new Bobcat.Event(), this.userKey = ~~(1e6 * Math.random()) + "|" + new Date().getTime();
}
return e.prototype.trackEvent = function(e, t) {
return $B.PageAE.trackUserPageEvent(e, {
userKey:this.userKey,
eventName:t
});
}, e;
}();
}.call(this), function() {}.call(this), function() {
var e = function(e, t) {
return function() {
return e.apply(t, arguments);
};
}, t = {}.hasOwnProperty, o = function(e, o) {
function n() {
this.constructor = e;
}
for (var r in o) t.call(o, r) && (e[r] = o[r]);
return n.prototype = o.prototype, e.prototype = new n(), e.__super__ = o.prototype, 
e;
};
$B.NavbarStatic = function() {
function e() {
this.navbarDrawerItems = $(".navbar-drawer .navbar-drawer-item"), this.navbarDrawerItems.bind("click", function() {
return Bobcat.TH.toggleDrawer();
});
}
return e;
}(), $B.EmailFormStatic = function() {
function e(e) {
this.form = e.find("form"), this.formNotSuccess = e.find(".s-form-not-success"), 
this.submitButton = e.find(".s-form-click"), this.loadingIcon = e.find(".s-form-icon"), 
this.formSuccess = e.find(".s-form-success"), this.errorEmail = e.find(".s-form-error-email"), 
this.errorName = e.find(".s-form-error-name");
}
return e.prototype.init = function() {
var e = this;
return this.submitButton.bind("click", function() {
return console.log("submitButton click"), e.reset(), e.isLoading(!0), e.form.ajaxSubmit({
success:function(t) {
return console.log(t), console.log("data.status: ", t.status), e.status(t.status), 
e.isLoading(!1), Bobcat.PageAE.gaPushUserSite([ "_trackEvent", "Actions", "EmailCollected" ]), 
window.edit_page.Event.publish("Site.contactForm.submit");
},
error:function(t) {
var o;
if (console.log("submit error"), o = jQuery.parseJSON(t.responseText), console.log(o), 
e.status(o.status), e.isLoading(!1), !o.message) throw alert(o.html), o.html;
return o.message.invalid_email && e.invalidEmail(!0), o.message.invalid_name ? e.invalidName(!0) :void 0;
}
});
});
}, e.prototype.reset = function() {
return this.invalidEmail(!1), this.invalidName(!1), this.isLoading(!1);
}, e.prototype.isLoading = function(e) {
return this.loadingIcon !== [] ? e === !0 ? this.loadingIcon.show() :this.loadingIcon.hide() :void 0;
}, e.prototype.status = function(e) {
return "ok" === e ? (this.formSuccess.show(), this.formNotSuccess.hide()) :(this.formSuccess.hide(), 
this.formNotSuccess.show());
}, e.prototype.invalidEmail = function(e) {
return e === !0 ? this.errorEmail.show() :this.errorEmail.hide();
}, e.prototype.invalidName = function(e) {
return e === !0 ? this.errorName.show() :this.errorName.hide();
}, e;
}(), $B.SocialMediaListStatic = function() {
function e(e) {
this.data = e;
}
return e.prototype.init = function() {
var e, t, o, n, r, i, a, s, l, u, d;
for (r = "", n = [], u = this.data.button_list, i = 0, s = u.length; s > i; i++) o = u[i], 
e = $('meta[name="force-social-js"]') && "true" === $('meta[name="force-social-js"]').attr("content"), 
(o.show_button || e) && (t = new $B[o.type + "Static"](o), n.push(t), o.show_button && (r += t.getTemplate()));
for ($(".social-media-display .buttons").append($(r)), d = [], a = 0, l = n.length; l > a; a++) t = n[a], 
d.push(t.reRender());
return d;
}, e;
}(), $B.SocialMediaItemStatic = function() {
function t() {
this.onScriptLoad = e(this.onScriptLoad, this), this.getUrl = e(this.getUrl, this);
}
return t.prototype.getUrl = function() {
return this.data.url ? this.data.url :$S.page_meta.social_media_config.url;
}, t.prototype.onScriptLoad = function() {
return this.runScript();
}, t.prototype.createScriptTag = function(e, t) {
var o, n;
return o = $("<div></div>").addClass(e), n = $("<script></script>").attr({
async:!0,
src:t
}), n.bind("load", this.onScriptLoad), o.get(0).appendChild(n.get(0)), $("#fb-root").get(0).appendChild(o.get(0));
}, t;
}(), $B.FacebookStatic = function(t) {
function n(t) {
this.data = t, this.reRender = e(this.reRender, this), this.runScript = e(this.runScript, this), 
n.__super__.constructor.call(this);
}
return o(n, t), n.prototype.getTemplate = function() {
return '<div class="col fb-counter"><fb:like href="' + this.getUrl() + '" send="false" layout="button_count" data-width="100" show_faces="false" font="arial"></fb:like></div>';
}, n.prototype.runScript = function() {
return "undefined" != typeof FB ? (FB.init({
appId:this.data.app_id,
status:!0,
cookie:!0,
xfbml:!0
}), FB.Event.subscribe("edge.create", function(e) {
return window.edit_page.Event.publish("Site.facebook.edge.create", e), $("#footer").css("margin-bottom", "+=220px");
})) :void 0;
}, n.prototype.reRender = function() {
return $S.global_conf.in_china ? void 0 :$("#fb-root .facebook_script").length < 1 ? this.createScriptTag("facebook_script", document.location.protocol + "//connect.facebook.net/en_US/all.js") :this.runScript();
}, n;
}($B.SocialMediaItemStatic), $B.LinkedInStatic = function(t) {
function n(t) {
this.data = t, this.reRender = e(this.reRender, this), this.runScript = e(this.runScript, this), 
n.__super__.constructor.call(this);
}
return o(n, t), n.prototype.getTemplate = function() {
return '<div class="col linkedin-counter"><script type="IN/Share" data-showzero="true" data-counter="right" data-url="' + this.getUrl() + '"></script></div>';
}, n.prototype.runScript = function() {}, n.prototype.reRender = function() {
console.log("LinkedIn#reRender");
try {
delete window.IN;
} catch (e) {
window.IN = void 0;
}
return $("#fb-root .linkedin_script").remove(), this.createScriptTag("linkedin_script", document.location.protocol + "//platform.linkedin.com/in.js");
}, n;
}($B.SocialMediaItemStatic), $B.TwitterStatic = function(t) {
function n(t) {
this.data = t, this.reRender = e(this.reRender, this), this.runScript = e(this.runScript, this), 
n.__super__.constructor.call(this);
}
return o(n, t), n.prototype.getTemplate = function() {
return '<div class="col twitter-counter"><a href="http://twitter.com/share" class="twitter-share-button" data-url="' + this.getUrl() + '" data-text="' + this.data.share_text + '"  data-count="horizontal">Tweet</a></div>';
}, n.prototype.runScript = function() {
return "undefined" != typeof twttr && "undefined" != typeof twttr.widgets ? (console.log("Twitter#runScript"), 
twttr.widgets.load()) :void 0;
}, n.prototype.reRender = function() {
return $S.global_conf.in_china ? void 0 :$("#fb-root .twitter_script").length < 1 ? this.createScriptTag("twitter_script", document.location.protocol + "//platform.twitter.com/widgets.js") :this.runScript();
}, n;
}($B.SocialMediaItemStatic), $B.GPlusStatic = function(t) {
function n(t) {
this.data = t, this.runScript = e(this.runScript, this), n.__super__.constructor.call(this);
}
return o(n, t), n.prototype.getTemplate = function() {
return '<div class="col gplus-counter"><g:plusone size="medium" annotation="bubble" href="' + this.getUrl() + '" ></g:plusone></div>';
}, n.prototype.runScript = function() {
var e;
return "undefined" != typeof gapi && "undefined" != typeof gapi.plusone ? (e = $(".gplus-counter"), 
e.each(function() {
return gapi.plusone.go(this);
})) :void 0;
}, n.prototype.reRender = function() {
return $S.global_conf.in_china ? void 0 :$("#fb-root .gplus_script").length < 1 ? this.createScriptTag("gplus_script", document.location.protocol + "//apis.google.com/js/plusone.js") :this.runScript();
}, n;
}($B.SocialMediaItemStatic), $B.RenrenStatic = function(t) {
function n(t) {
this.data = t, this.runScript = e(this.runScript, this), this.getTemplate = e(this.getTemplate, this), 
n.__super__.constructor.call(this);
}
return o(n, t), n.prototype.getSubtitle = function() {
return "人人喜欢";
}, n.prototype.getTemplate = function() {
var e, t;
this.p = [], e = {
url:this.getUrl(),
title:$S.page_meta.social_media_config.title,
description:$S.page_meta.social_media_config.description,
image:$S.page_meta.social_media_config.image
};
for (t in e) this.p.push(t + "=" + encodeURIComponent(e[t] || ""));
return '<div class="col renren-counter"><iframe scrolling="no" frameborder="0" allowtransparency="true" src="' + document.location.protocol + "//www.connect.renren.com/like/v2?" + this.p.join("&") + '" style="width:130px;height:24px;"></iframe></div>';
}, n.prototype.runScript = function() {}, n.prototype.reRender = function() {}, 
n;
}($B.SocialMediaItemStatic), $B.SinaWeiboStatic = function(t) {
function n(t) {
this.data = t, this.runScript = e(this.runScript, this), this.getTemplate = e(this.getTemplate, this), 
t.imageUrl = asset_path("/assets/icons/weibo.png"), n.__super__.constructor.call(this);
}
return o(n, t), n.prototype.getSubtitle = function() {
return "新浪微博";
}, n.prototype.getTemplate = function() {
var e, t, o, n, r;
r = 90, n = 24, t = {
url:this.getUrl(),
type:"2",
count:"1",
title:$S.page_meta.social_media_config.title,
pic:$S.page_meta.social_media_config.image,
rnd:new Date().valueOf()
}, o = [];
for (e in t) o.push(e + "=" + encodeURIComponent(t[e] || ""));
return '<div class="col sinaweibo-counter"><iframe allowTransparency="true" frameborder="0" scrolling="no" src="' + document.location.protocol + "//hits.sinajs.cn/A1/weiboshare.html?" + o.join("&") + '" width="' + r + '" height="' + n + '"></iframe></div>';
}, n.prototype.runScript = function() {}, n.prototype.reRender = function() {}, 
n;
}($B.SocialMediaItemStatic), $B.GalleryStatic = function() {
function e() {
var e;
$(".lazy-gallery").lazyload(), e = $(".gallery .item"), e.fancybox({
beforeLoad:function() {
var e;
return e = Bobcat.DOM.IMAGE_DESCRIPTION($(this.element)), this.title = Bobcat.DOM.IMAGE_TITLE($(this.element)), 
e.length ? this.title += " - " + Bobcat.DOM.IMAGE_DESCRIPTION($(this.element)) :void 0;
},
closeBtn:!1,
helpers:{
buttons:{},
thumbs:{
width:40,
height:40
}
},
margin:[ 20, 8, 8, 8 ],
padding:5,
arrows:!1,
nextClick:!0,
nextEffect:"fade",
prevEffect:"fade"
});
}
return e;
}(), $(function() {
var e, t, o, n, r;
for (t = $(".s-general-form, .s-template-form"), n = 0, r = t.length; r > n; n++) e = t[n], 
new $B.EmailFormStatic($(e)).init();
return o = new $B.SocialMediaListStatic($S.page_meta.social_media), o.init(), new $B.GalleryStatic(), 
new $B.NavbarStatic();
});
}.call(this), function() {
console.log("pages_show_static");
}.call(this), function() {
$B.setCustomization("pageKeybinding", !0), window.resizePages = function() {
var e, t;
return e = $(window).height(), t = 320 > e ? 320 :e, $('.wide:not(".no-resize")').each(function() {
var e, o, n;
return n = $(this), e = n.find(".container").first(), n.css({
"padding-top":0,
"padding-bottom":0
}), o = e.outerHeight(!1), t > o ? n.css({
"padding-top":Math.floor(.5 * (t - o)),
"padding-bottom":Math.ceil(.5 * (t - o))
}) :void 0;
}), $(".wide.no-resize").css({
"padding-top":0,
"padding-bottom":0
}), $(".strikingly-slider .container").each(function() {
var e, t;
return t = $(this), e = t.find(".valign"), e.css({
margin:"0"
});
}), $(".strikingly-slider .container").each(function() {
var e, o, n;
return o = $(this), t = o.height(), e = o.find(".valign"), n = t - e.height(), 0 > n && (n = 0), 
e.css({
"margin-top":n / 2 + "px"
});
}), Bobcat.TH.isMobile() ? $("ul.slides").addClass("scroll-bg") :void 0;
}, window.runAfterDomBinding.add("pitch", function() {
var e;
return Bobcat.TH.applyTouchNav(), Bobcat.TH.enableSlider({
fullscreen:!1,
padding:40
}), e = $(".demo-bar-spacer").height() || 0, $(".navigator.fixed").css("top", e), 
resizePages(), $(window).resize(resizePages), $(".wide img").load(resizePages), 
window.edit_page.isShowPage || (window.edit_page.Event.subscribe("Slide.afterAdd", function() {
return resizePages();
}), function() {
var e;
return e = $("#s-content .slides .slide:eq(0)"), e.find(".strikingly-slider").length > 0 ? e.find(".bg-image-editor, .slider-editor").css({
"margin-top":"30px"
}) :void 0;
}()), $(".email-form-pitch").each(function() {
return $(this).find(".input").each(function() {
var e, t, o;
return o = $(this).find("label"), "none" !== o.css("display") ? (t = $(this).find("input, textarea"), 
e = function() {
return "" === t.val() ? o.show() :o.hide();
}, t.keypress(function() {
return "" === t.val() ? o.hide() :void 0;
}), t.keyup(e), t.blur(e)) :void 0;
});
}), $B.TH.enableAnimationForBlocks();
});
}.call(this), function(e) {
var t = 0, o = 0, n = 0, r = 10, i = 0, a = "ontouchstart" in window || navigator.msMaxTouchPoints > 0, s = "onorientationchange" in window, l = !1, u = !1, d = !1, c = !1, p = !1, h = !1, g = !1, m = "pointer", f = "pointer", _ = new Array(), y = new Array(), w = new Array(), v = new Array(), b = new Array(), k = new Array(), M = new Array(), L = new Array(), T = new Array(), S = new Array(), D = new Array(), Y = new Array(), x = new Array(), E = {
showScrollbar:function(t, o) {
t.scrollbarHide && e("." + o).css({
opacity:t.scrollbarOpacity,
filter:"alpha(opacity:" + 100 * t.scrollbarOpacity + ")"
});
},
hideScrollbar:function(e, t, o, n, i, a, s, l, u, d) {
if (e.scrollbar && e.scrollbarHide) for (var c = o; o + 25 > c; c++) t[t.length] = E.hideScrollbarIntervalTimer(r * c, n[o], (o + 24 - c) / 24, i, a, s, l, u, d, e);
},
hideScrollbarInterval:function(t, o, n, r, a, s, l, u, d) {
i = -1 * t / D[u] * (a - s - l - r), E.setSliderOffset("." + n, i), e("." + n).css({
opacity:d.scrollbarOpacity * o,
filter:"alpha(opacity:" + d.scrollbarOpacity * o * 100 + ")"
});
},
slowScrollHorizontalInterval:function(t, o, n, r, a, s, l, u, d, c, p, h, g, m, f, _, y, w, v) {
if (v.infiniteSlider) {
if (n <= -1 * D[_] || n <= -1 * Y[_]) {
var b = e(t).width();
if (n <= -1 * Y[_]) {
var k = -1 * p[0];
e(o).each(function(t) {
E.setSliderOffset(e(o)[t], k + y), t < h.length && (h[t] = -1 * k), k += f[t];
}), n += -1 * h[0], S[_] = -1 * h[0] + y, D[_] = S[_] + b - s, T[_] = 0;
}
for (;n <= -1 * D[_]; ) {
var x = 0, C = E.getSliderOffset(e(o[0]), "x");
e(o).each(function(e) {
E.getSliderOffset(this, "x") < C && (C = E.getSliderOffset(this, "x"), x = e);
});
var $ = S[_] + b;
E.setSliderOffset(e(o)[x], $), S[_] = -1 * h[1] + y, D[_] = S[_] + b - s, h.splice(0, 1), 
h.splice(h.length, 0, -1 * $ + y), T[_]++;
}
}
if (n >= -1 * S[_] || n >= 0) {
var b = e(t).width();
if (n > 0) {
var k = -1 * p[0];
for (e(o).each(function(t) {
E.setSliderOffset(e(o)[t], k + y), t < h.length && (h[t] = -1 * k), k += f[t];
}), n -= -1 * h[0], S[_] = -1 * h[0] + y, D[_] = S[_] + b - s, T[_] = m; -1 * h[0] - b + y > 0; ) {
var I = 0, O = E.getSliderOffset(e(o[0]), "x");
e(o).each(function(e) {
E.getSliderOffset(this, "x") > O && (O = E.getSliderOffset(this, "x"), I = e);
});
var $ = S[_] - f[I];
E.setSliderOffset(e(o)[I], $), h.splice(0, 0, -1 * $ + y), h.splice(h.length - 1, 1), 
S[_] = -1 * h[0] + y, D[_] = S[_] + b - s, T[_]--, M[_]++;
}
}
for (;n > -1 * S[_]; ) {
var I = 0, O = E.getSliderOffset(e(o[0]), "x");
e(o).each(function(e) {
E.getSliderOffset(this, "x") > O && (O = E.getSliderOffset(this, "x"), I = e);
});
var $ = S[_] - f[I];
E.setSliderOffset(e(o)[I], $), h.splice(0, 0, -1 * $ + y), h.splice(h.length - 1, 1), 
S[_] = -1 * h[0] + y, D[_] = S[_] + b - s, T[_]--;
}
}
}
var j = !1, A = E.calcActiveOffset(v, n, h, s, T[_], m, c, _), $ = (A + T[_] + m) % m;
if (v.infiniteSlider ? $ != L[_] && (j = !0) :A != M[_] && (j = !0), j) {
var B = new E.args("change", v, t, e(t).children(":eq(" + $ + ")"), $, w);
e(t).parent().data("args", B), "" != v.onSlideChange && v.onSlideChange(B);
}
if (M[_] = A, L[_] = $, n = Math.floor(n), E.setSliderOffset(t, n), v.scrollbar) {
i = Math.floor((-1 * n - S[_] + y) / (D[_] - S[_] + y) * (l - u - a));
var H = a - d;
n >= -1 * S[_] + y ? (H = a - d - -1 * i, E.setSliderOffset(e("." + r), 0), e("." + r).css({
width:H + "px"
})) :n <= -1 * D[_] + 1 ? (H = l - u - d - i, E.setSliderOffset(e("." + r), i), 
e("." + r).css({
width:H + "px"
})) :(E.setSliderOffset(e("." + r), i), e("." + r).css({
width:H + "px"
}));
}
},
slowScrollHorizontal:function(t, o, n, i, a, s, l, u, d, c, p, h, g, m, f, _, y, w, v, b, Y) {
var x = E.getSliderOffset(t, "x"), C = new Array(), $ = new Array(), I = 0, O = 25 / 1024 * u;
frictionCoefficient = Y.frictionCoefficient, elasticFrictionCoefficient = Y.elasticFrictionCoefficient, 
snapFrictionCoefficient = Y.snapFrictionCoefficient, a > Y.snapVelocityThreshold && Y.snapToChildren && !v ? I = 1 :a < -1 * Y.snapVelocityThreshold && Y.snapToChildren && !v && (I = -1), 
-1 * O > a ? a = -1 * O :a > O && (a = O), e(t)[0] !== e(w)[0] && (I = -1 * I, a = -2 * a);
var j = T[f];
if (Y.infiniteSlider) var A = S[f], B = D[f];
for (var H = new Array(), N = new Array(), z = 0; z < g.length; z++) H[z] = g[z], 
z < o.length && (N[z] = E.getSliderOffset(e(o[z]), "x"));
for (;a > 1 || -1 > a; ) {
if (a *= frictionCoefficient, x += a, (x > -1 * S[f] || x < -1 * D[f]) && !Y.infiniteSlider && (a *= elasticFrictionCoefficient, 
x += a), Y.infiniteSlider) {
if (-1 * B >= x) {
for (var F = e(t).width(), P = 0, R = N[0], z = 0; z < N.length; z++) N[z] < R && (R = N[z], 
P = z);
var W = A + F;
N[P] = W, A = -1 * H[1] + b, B = A + F - u, H.splice(0, 1), H.splice(H.length, 0, -1 * W + b), 
j++;
}
if (x >= -1 * A) {
for (var F = e(t).width(), q = 0, U = N[0], z = 0; z < N.length; z++) N[z] > U && (U = N[z], 
q = z);
var W = A - m[q];
N[q] = W, H.splice(0, 0, -1 * W + b), H.splice(H.length - 1, 1), A = -1 * H[0] + b, 
B = A + F - u, j--;
}
}
C[C.length] = x, $[$.length] = a;
}
var V = !1, G = E.calcActiveOffset(Y, x, H, u, j, y, M[f], f), J = (G + j + y) % y;
if (Y.snapToChildren && (Y.infiniteSlider ? J != L[f] && (V = !0) :G != M[f] && (V = !0), 
0 > I && !V ? (G++, G >= g.length && !Y.infiniteSlider && (G = g.length - 1)) :I > 0 && !V && (G--, 
0 > G && !Y.infiniteSlider && (G = 0))), Y.snapToChildren || (x > -1 * S[f] || x < -1 * D[f]) && !Y.infiniteSlider) {
for ((x > -1 * S[f] || x < -1 * D[f]) && !Y.infiniteSlider ? C.splice(0, C.length) :(C.splice(.1 * C.length, C.length), 
x = C.length > 0 ? C[C.length - 1] :x); x < H[G] - .5 || x > H[G] + .5; ) x = (x - H[G]) * snapFrictionCoefficient + H[G], 
C[C.length] = x;
C[C.length] = H[G];
}
var K = 1;
C.length % 2 != 0 && (K = 0);
for (var Q = 0; Q < n.length; Q++) clearTimeout(n[Q]);
for (var X = (G + j + y) % y, Z = 0, Q = K; Q < C.length; Q += 2) (Q == K || Math.abs(C[Q] - Z) > 1 || Q >= C.length - 2) && (Z = C[Q], 
n[n.length] = E.slowScrollHorizontalIntervalTimer(r * Q, t, o, C[Q], i, l, u, d, c, p, G, h, g, _, y, m, f, b, X, Y));
var V = !1, J = (G + T[f] + y) % y;
Y.infiniteSlider ? J != L[f] && (V = !0) :G != M[f] && (V = !0), "" != Y.onSlideComplete && C.length > 1 && (n[n.length] = E.onSlideCompleteTimer(r * (Q + 1), Y, t, e(t).children(":eq(" + J + ")"), X, f)), 
n[n.length] = E.updateBackfaceVisibilityTimer(r * (Q + 1), o, f, y, Y), k[f] = n, 
E.hideScrollbar(Y, n, Q, C, i, l, u, c, p, f);
},
onSlideComplete:function(t, o, n, r, i) {
var a = (_[i] != r ? !0 :!1, new E.args("complete", t, e(o), n, r, r));
e(o).parent().data("args", a), "" != t.onSlideComplete && t.onSlideComplete(a), 
_[i] = r;
},
getSliderOffset:function(t, o) {
var n = 0;
if (o = "x" == o ? 4 :5, !u || d || c) n = parseInt(e(t).css("left"), 10); else {
for (var r, i = new Array("-webkit-transform", "-moz-transform", "transform"), a = 0; a < i.length; a++) if (void 0 != e(t).css(i[a]) && e(t).css(i[a]).length > 0) {
r = e(t).css(i[a]).split(",");
break;
}
n = void 0 == r[o] ? 0 :parseInt(r[o], 10);
}
return n;
},
setSliderOffset:function(t, o) {
o = parseInt(o, 10), !u || d || c ? e(t).css({
left:o + "px"
}) :e(t).css({
msTransform:"matrix(1,0,0,1," + o + ",0)",
webkitTransform:"matrix(1,0,0,1," + o + ",0)",
MozTransform:"matrix(1,0,0,1," + o + ",0)",
transform:"matrix(1,0,0,1," + o + ",0)"
});
},
setBrowserInfo:function() {
null != navigator.userAgent.match("WebKit") ? (l = !0, m = "-webkit-grab", f = "-webkit-grabbing") :null != navigator.userAgent.match("Gecko") ? (g = !0, 
m = "move", f = "-moz-grabbing") :null != navigator.userAgent.match("MSIE 7") ? (d = !0, 
h = !0) :null != navigator.userAgent.match("MSIE 8") ? (c = !0, h = !0) :null != navigator.userAgent.match("MSIE 9") && (p = !0, 
h = !0);
},
has3DTransform:function() {
var t = !1, o = e("<div />").css({
msTransform:"matrix(1,1,1,1,1,1)",
webkitTransform:"matrix(1,1,1,1,1,1)",
MozTransform:"matrix(1,1,1,1,1,1)",
transform:"matrix(1,1,1,1,1,1)"
});
return "" == o.attr("style") ? t = !1 :g && parseInt(navigator.userAgent.split("/")[3], 10) >= 21 ? t = !1 :void 0 != o.attr("style") && (t = !0), 
t;
},
getSlideNumber:function(e, t, o) {
return (e - T[t] + o) % o;
},
calcActiveOffset:function(e, t, o, n, r, i) {
var a, s = !1, l = new Array();
t > o[0] && (a = 0), t < o[o.length - 1] && (a = i - 1);
for (var u = 0; u < o.length; u++) o[u] <= t && o[u] > t - n && (s || o[u] == t || (l[l.length] = o[u - 1]), 
l[l.length] = o[u], s = !0);
0 == l.length && (l[0] = o[o.length - 1]);
for (var d = n, c = 0, u = 0; u < l.length; u++) {
var p = Math.abs(t - l[u]);
d > p && (c = l[u], d = p);
}
for (var u = 0; u < o.length; u++) c == o[u] && (a = u);
return a;
},
changeSlide:function(t, o, n, i, a, s, l, u, d, c, p, h, g, m, f, _, y, w) {
E.autoSlidePause(m);
for (var v = 0; v < i.length; v++) clearTimeout(i[v]);
var b = Math.ceil(w.autoSlideTransTimer / 10) + 1, S = E.getSliderOffset(o, "x"), D = h[t], Y = D - S, x = t - (M[m] + T[m] + _) % _;
if (w.infiniteSlider) {
t = (t - T[m] + 2 * _) % _;
var C = !1;
0 == t && 2 == _ && (t = _, h[t] = h[t - 1] - e(n).eq(0).outerWidth(!0), C = !0), 
D = h[t], Y = D - S;
var $ = new Array(h[t] - e(o).width(), h[t] + e(o).width());
C && h.splice(h.length - 1, 1);
for (var I = 0; I < $.length; I++) Math.abs($[I] - S) < Math.abs(Y) && (Y = $[I] - S);
}
0 > Y && -1 == x ? Y += e(o).width() :Y > 0 && 1 == x && (Y -= e(o).width());
var O, j, A = new Array();
E.showScrollbar(w, a);
for (var I = 0; b >= I; I++) O = I, O /= b, O--, j = S + Y * (Math.pow(O, 5) + 1), 
A[A.length] = j;
for (var B = (t + T[m] + _) % _, H = 0, I = 0; I < A.length; I++) if ((0 == I || Math.abs(A[I] - H) > 1 || I >= A.length - 2) && (H = A[I], 
i[I] = E.slowScrollHorizontalIntervalTimer(r * (I + 1), o, n, A[I], a, s, l, u, d, c, t, p, h, f, _, g, m, y, B, w)), 
0 == I && "" != w.onSlideStart) {
var N = (M[m] + T[m] + _) % _;
w.onSlideStart(new E.args("start", w, o, e(o).children(":eq(" + N + ")"), N, t));
}
var z = !1;
w.infiniteSlider ? B != L[m] && (z = !0) :t != M[m] && (z = !0), z && "" != w.onSlideComplete && (i[i.length] = E.onSlideCompleteTimer(r * (I + 1), w, o, e(o).children(":eq(" + B + ")"), B, m)), 
k[m] = i, E.hideScrollbar(w, i, I, A, a, s, l, d, c, m), E.autoSlide(o, n, i, a, s, l, u, d, c, p, h, g, m, f, _, y, w);
},
changeOffset:function(t, o, n, i, a, s, l, u, d, c, p, h, g, m, f, _, y, w) {
E.autoSlidePause(m);
for (var v = 0; v < i.length; v++) clearTimeout(i[v]);
w.infiniteSlider || (t = t > -1 * S[m] + y ? -1 * S[m] + y :t, t = t < -1 * D[m] ? -1 * D[m] :t);
var b = Math.ceil(w.autoSlideTransTimer / 10) + 1, Y = E.getSliderOffset(o, "x"), x = (E.calcActiveOffset(w, t, h, l, T, _, M[m], m) + T[m] + _) % _, C = h.slice();
if (w.snapToChildren && !w.infiniteSlider) t = h[x]; else if (w.infiniteSlider && w.snapToChildren) {
for (;t >= C[0]; ) C.splice(0, 0, C[_ - 1] + e(o).width()), C.splice(_, 1);
for (;t <= C[_ - 1]; ) C.splice(_, 0, C[0] - e(o).width()), C.splice(0, 1);
x = E.calcActiveOffset(w, t, C, l, T, _, M[m], m), t = C[x];
}
var $, I, O = t - Y, j = new Array();
E.showScrollbar(w, a);
for (var A = 0; b >= A; A++) $ = A, $ /= b, $--, I = Y + O * (Math.pow($, 5) + 1), 
j[j.length] = I;
for (var B = (x + T[m] + _) % _, H = 0, A = 0; A < j.length; A++) if ((0 == A || Math.abs(j[A] - H) > 1 || A >= j.length - 2) && (H = j[A], 
i[A] = E.slowScrollHorizontalIntervalTimer(r * (A + 1), o, n, j[A], a, s, l, u, d, c, x, p, h, f, _, g, m, y, B, w)), 
0 == A && "" != w.onSlideStart) {
var B = (M[m] + T[m] + _) % _;
w.onSlideStart(new E.args("start", w, o, e(o).children(":eq(" + B + ")"), B, x));
}
var N = !1;
w.infiniteSlider ? B != L[m] && (N = !0) :x != M[m] && (N = !0), N && "" != w.onSlideComplete && (i[i.length] = E.onSlideCompleteTimer(r * (A + 1), w, o, e(o).children(":eq(" + B + ")"), B, m)), 
k[m] = i, E.hideScrollbar(w, i, A, j, a, s, l, d, c, m), E.autoSlide(o, n, i, a, s, l, u, d, c, p, h, g, m, f, _, y, w);
},
autoSlide:function(e, t, o, n, r, i, a, s, l, u, d, c, p, h, g, m, f) {
return v[p].autoSlide ? (E.autoSlidePause(p), y[p] = setTimeout(function() {
!f.infiniteSlider && M[p] > d.length - 1 && (M[p] = M[p] - g);
var _ = M[p] + T[p] + 1;
E.changeSlide(_, e, t, o, n, r, i, a, s, l, u, d, c, p, h, g, m, f), E.autoSlide(e, t, o, n, r, i, a, s, l, u, d, c, p, h, g, m, f);
}, f.autoSlideTimer + f.autoSlideTransTimer), void 0) :!1;
},
autoSlidePause:function(e) {
clearTimeout(y[e]);
},
isUnselectable:function(t, o) {
return "" != o.unselectableSelector && 1 == e(t).closest(o.unselectableSelector).length ? !0 :!1;
},
slowScrollHorizontalIntervalTimer:function(e, t, o, n, r, i, a, s, l, u, d, c, p, h, g, m, f, _, y, w) {
var v = setTimeout(function() {
E.slowScrollHorizontalInterval(t, o, n, r, i, a, s, l, u, d, c, p, h, g, m, f, _, y, w);
}, e);
return v;
},
onSlideCompleteTimer:function(e, t, o, n, r, i) {
var a = setTimeout(function() {
E.onSlideComplete(t, o, n, r, i);
}, e);
return a;
},
hideScrollbarIntervalTimer:function(e, t, o, n, r, i, a, s, l, u) {
var d = setTimeout(function() {
E.hideScrollbarInterval(t, o, n, r, i, a, s, l, u);
}, e);
return d;
},
updateBackfaceVisibilityTimer:function(e, t, o, n, r) {
var i = setTimeout(function() {
E.updateBackfaceVisibility(t, o, n, r);
}, e);
return i;
},
updateBackfaceVisibility:function(t, o, n, r) {
for (var i = (M[o] + T[o] + n) % n, a = Array(), s = 0; s < 2 * r.hardwareAccelBuffer; s++) {
var l = E.mod(i + s - r.hardwareAccelBuffer, n);
if ("visible" == e(t).eq(l).css("-webkit-backface-visibility")) {
a[a.length] = l;
var u = E.mod(l + 2 * r.hardwareAccelBuffer, n), d = E.mod(l - 2 * r.hardwareAccelBuffer, n);
e(t).eq(l).css("-webkit-backface-visibility", "hidden"), -1 == a.indexOf(d) && e(t).eq(d).css("-webkit-backface-visibility", ""), 
-1 == a.indexOf(u) && e(t).eq(u).css("-webkit-backface-visibility", "");
}
}
},
mod:function(e, t) {
var o = e % t;
return 0 > o ? o + t :o;
},
args:function(t, o, n, r, i, a) {
this.prevSlideNumber = void 0 == e(n).parent().data("args") ? void 0 :e(n).parent().data("args").prevSlideNumber, 
this.prevSlideObject = void 0 == e(n).parent().data("args") ? void 0 :e(n).parent().data("args").prevSlideObject, 
this.targetSlideNumber = a + 1, this.targetSlideObject = e(n).children(":eq(" + a + ")"), 
this.slideChanged = !1, "load" == t ? (this.targetSlideNumber = void 0, this.targetSlideObject = void 0) :"start" == t ? (this.targetSlideNumber = void 0, 
this.targetSlideObject = void 0) :"change" == t ? (this.slideChanged = !0, this.prevSlideNumber = void 0 == e(n).parent().data("args") ? o.startAtSlide :e(n).parent().data("args").currentSlideNumber, 
this.prevSlideObject = e(n).children(":eq(" + this.prevSlideNumber + ")")) :"complete" == t && (this.slideChanged = e(n).parent().data("args").slideChanged), 
this.settings = o, this.data = e(n).parent().data("iosslider"), this.sliderObject = n, 
this.sliderContainerObject = e(n).parent(), this.currentSlideObject = r, this.currentSlideNumber = i + 1, 
this.currentSliderOffset = -1 * E.getSliderOffset(n, "x");
},
preventDrag:function(e) {
e.preventDefault();
},
preventClick:function(e) {
return e.stopImmediatePropagation(), !1;
},
enableClick:function() {
return !0;
}
};
E.setBrowserInfo();
var C = {
init:function(r, l) {
u = E.has3DTransform();
var p = e.extend(!0, {
elasticPullResistance:.6,
frictionCoefficient:.92,
elasticFrictionCoefficient:.6,
snapFrictionCoefficient:.92,
snapToChildren:!1,
snapSlideCenter:!1,
startAtSlide:1,
scrollbar:!1,
scrollbarDrag:!1,
scrollbarHide:!0,
scrollbarPaging:!1,
scrollbarLocation:"top",
scrollbarContainer:"",
scrollbarOpacity:.4,
scrollbarHeight:"4px",
scrollbarBorder:"0",
scrollbarMargin:"5px",
scrollbarBackground:"#000",
scrollbarBorderRadius:"100px",
scrollbarShadow:"0 0 0 #000",
scrollbarElasticPullResistance:.9,
desktopClickDrag:!1,
keyboardControls:!1,
tabToAdvance:!1,
responsiveSlideContainer:!0,
responsiveSlides:!0,
navSlideSelector:"",
navPrevSelector:"",
navNextSelector:"",
autoSlideToggleSelector:"",
autoSlide:!1,
autoSlideTimer:5e3,
autoSlideTransTimer:750,
autoSlideHoverPause:!0,
infiniteSlider:!1,
snapVelocityThreshold:5,
slideStartVelocityThreshold:0,
horizontalSlideLockThreshold:5,
verticalSlideLockThreshold:3,
hardwareAccelBuffer:5,
stageCSS:{
position:"relative",
top:"0",
left:"0",
overflow:"hidden",
zIndex:1
},
unselectableSelector:"",
onSliderLoaded:"",
onSliderUpdate:"",
onSliderResize:"",
onSlideStart:"",
onSlideChange:"",
onSlideComplete:""
}, r);
return void 0 == l && (l = this), e(l).each(function(r) {
function l() {
E.autoSlidePause(u), ft = e(at).find("a"), _t = e(at).find("[onclick]"), yt = e(at).find("*"), 
e(X).css("width", ""), e(X).css("height", ""), e(at).css("width", ""), R = e(at).children().not("script").get(), 
W = new Array(), q = new Array(), p.responsiveSlides && e(R).css("width", ""), D[u] = 0, 
P = new Array(), j = e(X).parent().width(), B = e(X).outerWidth(!0), p.responsiveSlideContainer && (B = e(X).outerWidth(!0) > j ? j :e(X).width()), 
e(X).css({
position:p.stageCSS.position,
top:p.stageCSS.top,
left:p.stageCSS.left,
overflow:p.stageCSS.overflow,
zIndex:p.stageCSS.zIndex,
webkitPerspective:1e3,
webkitBackfaceVisibility:"hidden",
msTouchAction:"pan-y",
width:B
}), e(p.unselectableSelector).css({
cursor:"default"
});
for (var t = 0; t < R.length; t++) {
W[t] = e(R[t]).width(), q[t] = e(R[t]).outerWidth(!0);
var o = q[t];
p.responsiveSlides && (q[t] > B ? (o = B + -1 * (q[t] - W[t]), W[t] = o, q[t] = B) :o = W[t], 
e(R[t]).css({
width:o
})), e(R[t]).css({
overflow:"hidden",
position:"absolute"
}), P[t] = -1 * D[u], D[u] = D[u] + o + (q[t] - W[t]);
}
p.snapSlideCenter && (Q = .5 * (B - q[0]), p.responsiveSlides && q[0] > B && (Q = 0)), 
Y[u] = 2 * D[u];
for (var t = 0; t < R.length; t++) E.setSliderOffset(e(R[t]), -1 * P[t] + D[u] + Q), 
P[t] = P[t] - D[u];
if (!p.infiniteSlider && !p.snapSlideCenter) {
for (var n = 0; n < P.length && !(P[n] <= -1 * (2 * D[u] - B)); n++) ut = n;
P.splice(ut + 1, P.length), P[P.length] = -1 * (2 * D[u] - B);
}
for (var n = 0; n < P.length; n++) tt[n] = P[n];
if (Z && (v[u].startAtSlide = v[u].startAtSlide > P.length ? P.length :v[u].startAtSlide, 
p.infiniteSlider ? (v[u].startAtSlide = (v[u].startAtSlide - 1 + st) % st, M[u] = v[u].startAtSlide) :(v[u].startAtSlide = v[u].startAtSlide - 1 < 0 ? P.length - 1 :v[u].startAtSlide, 
M[u] = v[u].startAtSlide - 1), L[u] = M[u]), S[u] = D[u] + Q, e(at).css({
position:"relative",
cursor:m,
webkitPerspective:"0",
webkitBackfaceVisibility:"hidden",
width:D[u] + "px"
}), mt = D[u], D[u] = 2 * D[u] - B + 2 * Q, pt = B > mt + Q || 0 == B ? !0 :!1, 
pt && e(at).css({
cursor:"default"
}), A = e(X).parent().outerHeight(!0), H = e(X).height(), p.responsiveSlideContainer && (H = H > A ? A :H), 
e(X).css({
height:H
}), E.setSliderOffset(at, P[M[u]]), p.infiniteSlider && !pt) {
for (var r = E.getSliderOffset(e(at), "x"), i = (T[u] + st) % st * -1; 0 > i; ) {
var a = 0, s = E.getSliderOffset(e(R[0]), "x");
e(R).each(function(e) {
E.getSliderOffset(this, "x") < s && (s = E.getSliderOffset(this, "x"), a = e);
});
var l = S[u] + mt;
E.setSliderOffset(e(R)[a], l), S[u] = -1 * P[1] + Q, D[u] = S[u] + mt - B, P.splice(0, 1), 
P.splice(P.length, 0, -1 * l + Q), i++;
}
for (;-1 * P[0] - mt + Q > 0 && p.snapSlideCenter && Z; ) {
var d = 0, c = E.getSliderOffset(e(R[0]), "x");
e(R).each(function(e) {
E.getSliderOffset(this, "x") > c && (c = E.getSliderOffset(this, "x"), d = e);
});
var l = S[u] - q[d];
E.setSliderOffset(e(R)[d], l), P.splice(0, 0, -1 * l + Q), P.splice(P.length - 1, 1), 
S[u] = -1 * P[0] + Q, D[u] = S[u] + mt - B, T[u]--, M[u]++;
}
for (;r <= -1 * D[u]; ) {
var a = 0, s = E.getSliderOffset(e(R[0]), "x");
e(R).each(function(e) {
E.getSliderOffset(this, "x") < s && (s = E.getSliderOffset(this, "x"), a = e);
});
var l = S[u] + mt;
E.setSliderOffset(e(R)[a], l), S[u] = -1 * P[1] + Q, D[u] = S[u] + mt - B, P.splice(0, 1), 
P.splice(P.length, 0, -1 * l + Q), T[u]++, M[u]--;
}
}
return E.setSliderOffset(at, P[M[u]]), E.updateBackfaceVisibility(R, u, st, p), 
p.desktopClickDrag || e(at).css({
cursor:"default"
}), p.scrollbar && (e("." + J).css({
margin:p.scrollbarMargin,
overflow:"hidden",
display:"none"
}), e("." + J + " ." + K).css({
border:p.scrollbarBorder
}), N = parseInt(e("." + J).css("marginLeft")) + parseInt(e("." + J).css("marginRight")), 
z = parseInt(e("." + J + " ." + K).css("borderLeftWidth"), 10) + parseInt(e("." + J + " ." + K).css("borderRightWidth"), 10), 
I = "" != p.scrollbarContainer ? e(p.scrollbarContainer).width() :B, O = B / mt * (I - N), 
p.scrollbarHide || (ot = p.scrollbarOpacity), e("." + J).css({
position:"absolute",
left:0,
width:I - N + "px",
margin:p.scrollbarMargin
}), "top" == p.scrollbarLocation ? e("." + J).css("top", "0") :e("." + J).css("bottom", "0"), 
e("." + J + " ." + K).css({
borderRadius:p.scrollbarBorderRadius,
background:p.scrollbarBackground,
height:p.scrollbarHeight,
width:O - z + "px",
minWidth:p.scrollbarHeight,
border:p.scrollbarBorder,
webkitPerspective:1e3,
webkitBackfaceVisibility:"hidden",
position:"relative",
opacity:ot,
filter:"alpha(opacity:" + 100 * ot + ")",
boxShadow:p.scrollbarShadow
}), E.setSliderOffset(e("." + J + " ." + K), Math.floor((-1 * P[M[u]] - S[u] + Q) / (D[u] - S[u] + Q) * (I - N - O))), 
e("." + J).css({
display:"block"
}), y = e("." + J + " ." + K), $ = e("." + J)), p.scrollbarDrag && !pt && e("." + J + " ." + K).css({
cursor:m
}), p.infiniteSlider && (U = (D[u] + B) / 3), "" != p.navSlideSelector && e(p.navSlideSelector).each(function(t) {
e(this).css({
cursor:"pointer"
}), e(this).unbind(bt).bind(bt, function(o) {
"touchstart" == o.type ? e(this).unbind("click.iosSliderEvent") :e(this).unbind("touchstart.iosSliderEvent"), 
bt = o.type + ".iosSliderEvent", E.changeSlide(t, at, R, g, K, O, B, I, N, z, tt, P, q, u, U, st, Q, p);
});
}), "" != p.navPrevSelector && (e(p.navPrevSelector).css({
cursor:"pointer"
}), e(p.navPrevSelector).unbind(bt).bind(bt, function(t) {
"touchstart" == t.type ? e(this).unbind("click.iosSliderEvent") :e(this).unbind("touchstart.iosSliderEvent"), 
bt = t.type + ".iosSliderEvent";
var o = (M[u] + T[u] + st) % st;
(o > 0 || p.infiniteSlider) && E.changeSlide(o - 1, at, R, g, K, O, B, I, N, z, tt, P, q, u, U, st, Q, p);
})), "" != p.navNextSelector && (e(p.navNextSelector).css({
cursor:"pointer"
}), e(p.navNextSelector).unbind(bt).bind(bt, function(t) {
"touchstart" == t.type ? e(this).unbind("click.iosSliderEvent") :e(this).unbind("touchstart.iosSliderEvent"), 
bt = t.type + ".iosSliderEvent";
var o = (M[u] + T[u] + st) % st;
(o < P.length - 1 || p.infiniteSlider) && E.changeSlide(o + 1, at, R, g, K, O, B, I, N, z, tt, P, q, u, U, st, Q, p);
})), p.autoSlide && !pt && "" != p.autoSlideToggleSelector && (e(p.autoSlideToggleSelector).css({
cursor:"pointer"
}), e(p.autoSlideToggleSelector).unbind(bt).bind(bt, function(t) {
"touchstart" == t.type ? e(this).unbind("click.iosSliderEvent") :e(this).unbind("touchstart.iosSliderEvent"), 
bt = t.type + ".iosSliderEvent", ht ? (E.autoSlide(at, R, g, K, O, B, I, N, z, tt, P, q, u, U, st, Q, p), 
ht = !1, e(p.autoSlideToggleSelector).removeClass("on")) :(E.autoSlidePause(u), 
ht = !0, e(p.autoSlideToggleSelector).addClass("on"));
})), E.autoSlide(at, R, g, K, O, B, I, N, z, tt, P, q, u, U, st, Q, p), e(X).bind("mouseleave.iosSliderEvent", function() {
return ht ? !0 :(E.autoSlide(at, R, g, K, O, B, I, N, z, tt, P, q, u, U, st, Q, p), 
void 0);
}), e(X).bind("touchend.iosSliderEvent", function() {
return ht ? !0 :(E.autoSlide(at, R, g, K, O, B, I, N, z, tt, P, q, u, U, st, Q, p), 
void 0);
}), p.autoSlideHoverPause && e(X).bind("mouseenter.iosSliderEvent", function() {
E.autoSlidePause(u);
}), e(X).data("iosslider", {
obj:kt,
settings:p,
scrollerNode:at,
slideNodes:R,
numberOfSlides:st,
centeredSlideOffset:Q,
sliderNumber:u,
originalOffsets:tt,
childrenOffsets:P,
sliderMax:D[u],
scrollbarClass:K,
scrollbarWidth:O,
scrollbarStageWidth:I,
stageWidth:B,
scrollMargin:N,
scrollBorder:z,
infiniteSliderOffset:T[u],
infiniteSliderWidth:U,
slideNodeOuterWidths:q,
shortContent:pt
}), Z = !1, !0;
}
t++;
var u = t, g = new Array();
v[u] = e.extend({}, p), S[u] = 0, D[u] = 0;
var y, $, I, O, j, A, B, H, N, z, F, P, R, W, q, U, V = new Array(0, 0), G = new Array(0, 0), J = "scrollbarBlock" + t, K = "scrollbar" + t, Q = 0, X = e(this), Z = !0, et = -1, tt = (new Array(), 
new Array()), ot = 0, nt = 0, rt = 0, it = 0, at = e(this).children(":first-child"), st = e(at).children().not("script").length, lt = !1, ut = 0, dt = !1, ct = void 0;
T[u] = 0;
var pt = !1;
_[u] = -1;
var ht = !1;
w[u] = X, b[u] = !1;
var gt, mt, ft, _t, yt, wt = !1, vt = !1, bt = "touchstart.iosSliderEvent click.iosSliderEvent";
x[u] = !1, k[u] = new Array(), p.scrollbarDrag && (p.scrollbar = !0, p.scrollbarHide = !1);
var kt = e(this), Mt = kt.data("iosslider");
if (void 0 != Mt) return !0;
for (var Lt = [ "d", "e", "m", "o", " ", "v", "e", "r", "s", "i", "o", "n" ], Tt = Math.floor(12317 * Math.random()), r = 0; r < Lt.length; r++) e(".i" + Tt).html(e(".i" + Tt).html() + Lt[r]);
if (parseInt(e().jquery.split(".").join(""), 10) >= 14.2 ? e(this).delegate("img", "dragstart.iosSliderEvent", function(e) {
e.preventDefault();
}) :e(this).find("img").bind("dragstart.iosSliderEvent", function(e) {
e.preventDefault();
}), p.infiniteSlider && (p.scrollbar = !1), p.infiniteSlider && 1 == st && (p.infiniteSlider = !1), 
p.scrollbar && ("" != p.scrollbarContainer ? e(p.scrollbarContainer).append("<div class = '" + J + "'><div class = '" + K + "'></div></div>") :e(at).parent().append("<div class = '" + J + "'><div class = '" + K + "'></div></div>")), 
!l()) return !0;
e(this).find("a").bind("mousedown", E.preventDrag), e(this).find("[onclick]").bind("click", E.preventDrag).each(function() {
e(this).data("onclick", this.onclick);
});
var et = E.calcActiveOffset(p, E.getSliderOffset(e(at), "x"), P, B, T[u], st, void 0, u), St = (et + T[u] + st) % st, Dt = new E.args("load", p, at, e(at).children(":eq(" + St + ")"), St, St);
if (e(X).data("args", Dt), "" != p.onSliderLoaded && p.onSliderLoaded(Dt), _[u] = St, 
p.scrollbarPaging && p.scrollbar && !pt && (e($).css("cursor", "pointer"), e($).bind("click.iosSliderEvent", function(t) {
this == t.target && (t.pageX > e(y).offset().left ? C.nextPage(X) :C.prevPage(X));
})), v[u].responsiveSlides || v[u].responsiveSlideContainer) {
var Yt = s ? "orientationchange" :"resize", xt = $B.debounce(function() {
if (!l()) return !0;
var t = e(X).data("args");
"" != p.onSliderResize && p.onSliderResize(t);
}, 50);
e(window).bind(Yt + ".iosSliderEvent-" + u, xt);
}
if (!p.keyboardControls && !p.tabToAdvance || pt || e(document).bind("keydown.iosSliderEvent", function(e) {
if (!d && !c) var e = e.originalEvent;
if (x[u]) return !0;
if (37 == e.keyCode && p.keyboardControls) {
e.preventDefault();
var t = (M[u] + T[u] + st) % st;
(t > 0 || p.infiniteSlider) && E.changeSlide(t - 1, at, R, g, K, O, B, I, N, z, tt, P, q, u, U, st, Q, p);
} else if (39 == e.keyCode && p.keyboardControls || 9 == e.keyCode && p.tabToAdvance) {
e.preventDefault();
var t = (M[u] + T[u] + st) % st;
(t < P.length - 1 || p.infiniteSlider) && E.changeSlide(t + 1, at, R, g, K, O, B, I, N, z, tt, P, q, u, U, st, Q, p);
}
}), a || p.desktopClickDrag) {
var Et = !1, Ct = !1, $t = e(at), It = e(at), Ot = !1;
p.scrollbarDrag && ($t = $t.add(y), It = It.add($)), e($t).bind("mousedown.iosSliderEvent touchstart.iosSliderEvent", function(t) {
if (e(window).one("scroll.iosSliderEvent", function() {
Et = !1;
}), Et) return !0;
if (Et = !0, Ct = !1, "touchstart" == t.type ? e(It).unbind("mousedown.iosSliderEvent") :e(It).unbind("touchstart.iosSliderEvent"), 
x[u] || pt) return Et = !1, lt = !1, !0;
if (Ot = E.isUnselectable(t.target, p)) return Et = !1, lt = !1, !0;
if (gt = e(this)[0] === e(y)[0] ? y :at, !d && !c) var t = t.originalEvent;
if (E.autoSlidePause(u), yt.unbind(".disableClick"), "touchstart" == t.type) eventX = t.touches[0].pageX, 
eventY = t.touches[0].pageY; else {
if (window.getSelection) window.getSelection().empty ? window.getSelection().empty() :window.getSelection().removeAllRanges && window.getSelection().removeAllRanges(); else if (document.selection) if (c) try {
document.selection.empty();
} catch (t) {} else document.selection.empty();
eventX = t.pageX, eventY = t.pageY, dt = !0, ct = at, e(this).css({
cursor:f
});
}
V = new Array(0, 0), G = new Array(0, 0), o = 0, lt = !1;
for (var n = 0; n < g.length; n++) clearTimeout(g[n]);
var r = E.getSliderOffset(at, "x");
r > -1 * S[u] + Q + mt ? (r = -1 * S[u] + Q + mt, E.setSliderOffset(e("." + K), r), 
e("." + K).css({
width:O - z + "px"
})) :r < -1 * D[u] && (r = -1 * D[u], E.setSliderOffset(e("." + K), I - N - O), 
e("." + K).css({
width:O - z + "px"
}));
var i = e(this)[0] === e(y)[0] ? S[u] :0;
nt = -1 * (E.getSliderOffset(this, "x") - eventX - i), rt = -1 * (E.getSliderOffset(this, "y") - eventY), 
V[1] = eventX, G[1] = eventY, vt = !1;
}), e(document).bind("touchmove.iosSliderEvent mousemove.iosSliderEvent", function(t) {
if (!d && !c) var t = t.originalEvent;
if (x[u] || pt || Ot || !Et) return !0;
var r = 0;
if ("touchmove" == t.type) eventX = t.touches[0].pageX, eventY = t.touches[0].pageY; else {
if (window.getSelection) window.getSelection().empty || window.getSelection().removeAllRanges && window.getSelection().removeAllRanges(); else if (document.selection) if (c) try {
document.selection.empty();
} catch (t) {} else document.selection.empty();
if (eventX = t.pageX, eventY = t.pageY, !dt) return !0;
if (!h && ("undefined" != typeof t.webkitMovementX || "undefined" != typeof t.webkitMovementY) && 0 === t.webkitMovementY && 0 === t.webkitMovementX) return !0;
}
if (V[0] = V[1], V[1] = eventX, o = (V[1] - V[0]) / 2, G[0] = G[1], G[1] = eventY, 
n = (G[1] - G[0]) / 2, !lt) {
var a = (M[u] + T[u] + st) % st, s = new E.args("start", p, at, e(at).children(":eq(" + a + ")"), a, void 0);
e(X).data("args", s), "" != p.onSlideStart && p.onSlideStart(s);
}
if ((n > p.verticalSlideLockThreshold || n < -1 * p.verticalSlideLockThreshold) && "touchmove" == t.type && !lt && (wt = !0), 
(o > p.horizontalSlideLockThreshold || o < -1 * p.horizontalSlideLockThreshold) && "touchmove" == t.type && t.preventDefault(), 
(o > p.slideStartVelocityThreshold || o < -1 * p.slideStartVelocityThreshold) && (lt = !0), 
lt && !wt) {
var l = E.getSliderOffset(at, "x"), g = e(gt)[0] === e(y)[0] ? S[u] :Q, m = e(gt)[0] === e(y)[0] ? (S[u] - D[u] - Q) / (I - N - O) :1, f = e(gt)[0] === e(y)[0] ? p.scrollbarElasticPullResistance :p.elasticPullResistance, _ = p.snapSlideCenter && e(gt)[0] === e(y)[0] ? 0 :Q, w = p.snapSlideCenter && e(gt)[0] === e(y)[0] ? Q :0;
if ("touchmove" == t.type && (it != t.touches.length && (nt = -1 * l + eventX), 
it = t.touches.length), p.infiniteSlider) {
if (l <= -1 * D[u]) {
var v = e(at).width();
if (l <= -1 * Y[u]) {
var b = -1 * tt[0];
e(R).each(function(t) {
E.setSliderOffset(e(R)[t], b + Q), t < P.length && (P[t] = -1 * b), b += q[t];
}), nt -= -1 * P[0], S[u] = -1 * P[0] + Q, D[u] = S[u] + v - B, T[u] = 0;
} else {
var k = 0, C = E.getSliderOffset(e(R[0]), "x");
e(R).each(function(e) {
E.getSliderOffset(this, "x") < C && (C = E.getSliderOffset(this, "x"), k = e);
});
var $ = S[u] + v;
E.setSliderOffset(e(R)[k], $), S[u] = -1 * P[1] + Q, D[u] = S[u] + v - B, P.splice(0, 1), 
P.splice(P.length, 0, -1 * $ + Q), T[u]++;
}
}
if (l >= -1 * S[u] || l >= 0) {
var v = e(at).width();
if (l >= 0) {
var b = -1 * tt[0];
for (e(R).each(function(t) {
E.setSliderOffset(e(R)[t], b + Q), t < P.length && (P[t] = -1 * b), b += q[t];
}), nt += -1 * P[0], S[u] = -1 * P[0] + Q, D[u] = S[u] + v - B, T[u] = st; -1 * P[0] - v + Q > 0; ) {
var j = 0, A = E.getSliderOffset(e(R[0]), "x");
e(R).each(function(e) {
E.getSliderOffset(this, "x") > A && (A = E.getSliderOffset(this, "x"), j = e);
});
var $ = S[u] - q[j];
E.setSliderOffset(e(R)[j], $), P.splice(0, 0, -1 * $ + Q), P.splice(P.length - 1, 1), 
S[u] = -1 * P[0] + Q, D[u] = S[u] + v - B, T[u]--, M[u]++;
}
} else {
var j = 0, A = E.getSliderOffset(e(R[0]), "x");
e(R).each(function(e) {
E.getSliderOffset(this, "x") > A && (A = E.getSliderOffset(this, "x"), j = e);
});
var $ = S[u] - q[j];
E.setSliderOffset(e(R)[j], $), P.splice(0, 0, -1 * $ + Q), P.splice(P.length - 1, 1), 
S[u] = -1 * P[0] + Q, D[u] = S[u] + v - B, T[u]--;
}
}
} else {
var v = e(at).width();
l > -1 * S[u] + Q && (r = (S[u] + -1 * (nt - g - eventX + _) * m - g) * f * -1 / m), 
l < -1 * D[u] && (r = (D[u] + w + -1 * (nt - g - eventX) * m - g) * f * -1 / m);
}
if (E.setSliderOffset(at, -1 * (nt - g - eventX - r) * m - g + w), p.scrollbar) {
E.showScrollbar(p, K), i = Math.floor((nt - eventX - r - S[u] + _) / (D[u] - S[u] + Q) * (I - N - O) * m);
var H = O;
0 >= i ? (H = O - z - -1 * i, E.setSliderOffset(e("." + K), 0), e("." + K).css({
width:H + "px"
})) :i >= I - N - z - O ? (H = I - N - z - i, E.setSliderOffset(e("." + K), i), 
e("." + K).css({
width:H + "px"
})) :E.setSliderOffset(e("." + K), i);
}
"touchmove" == t.type && (F = t.touches[0].pageX);
var W = !1, U = E.calcActiveOffset(p, -1 * (nt - eventX - r), P, B, T[u], st, void 0, u), J = (U + T[u] + st) % st;
if (p.infiniteSlider ? J != L[u] && (W = !0) :U != M[u] && (W = !0), W) {
M[u] = U, L[u] = J, vt = !0;
var s = new E.args("change", p, at, e(at).children(":eq(" + J + ")"), J, J);
e(X).data("args", s), "" != p.onSlideChange && p.onSlideChange(s), E.updateBackfaceVisibility(R, u, st, p);
}
}
});
var jt = e(window);
if (c || d) var jt = e(document);
e($t).bind("touchcancel.iosSliderEvent touchend.iosSliderEvent", function(e) {
var e = e.originalEvent;
if (Ct) return !1;
if (Ct = !0, x[u] || pt) return !0;
if (Ot) return !0;
if (0 != e.touches.length) for (var t = 0; t < e.touches.length; t++) e.touches[t].pageX == F && E.slowScrollHorizontal(at, R, g, K, o, n, O, B, I, N, z, tt, P, q, u, U, st, gt, vt, Q, p); else E.slowScrollHorizontal(at, R, g, K, o, n, O, B, I, N, z, tt, P, q, u, U, st, gt, vt, Q, p);
return wt = !1, Et = !1, !0;
}), e(jt).bind("mouseup.iosSliderEvent-" + u, function() {
if (lt ? ft.unbind("click.disableClick").bind("click.disableClick", E.preventClick) :ft.unbind("click.disableClick").bind("click.disableClick", E.enableClick), 
_t.each(function() {
this.onclick = function(t) {
return lt ? !1 :(e(this).data("onclick") && e(this).data("onclick").call(this, t || window.event), 
void 0);
}, this.onclick = e(this).data("onclick");
}), parseFloat(e().jquery) >= 1.8 ? yt.each(function() {
var t = e._data(this, "events");
if (void 0 != t && void 0 != t.click && "iosSliderEvent" != t.click[0].namespace) {
if (!lt) return !1;
e(this).one("click.disableClick", E.preventClick);
var o = e._data(this, "events").click, n = o.pop();
o.splice(0, 0, n);
}
}) :parseFloat(e().jquery) >= 1.6 && yt.each(function() {
var t = e(this).data("events");
if (void 0 != t && void 0 != t.click && "iosSliderEvent" != t.click[0].namespace) {
if (!lt) return !1;
e(this).one("click.disableClick", E.preventClick);
var o = e(this).data("events").click, n = o.pop();
o.splice(0, 0, n);
}
}), !b[u]) {
if (pt) return !0;
if (p.desktopClickDrag && e(at).css({
cursor:m
}), p.scrollbarDrag && e(y).css({
cursor:m
}), dt = !1, void 0 == ct) return !0;
E.slowScrollHorizontal(ct, R, g, K, o, n, O, B, I, N, z, tt, P, q, u, U, st, gt, vt, Q, p), 
ct = void 0;
}
wt = !1, Et = !1;
});
}
});
},
destroy:function(t, o) {
return void 0 == o && (o = this), e(o).each(function() {
var o = e(this), n = o.data("iosslider");
if (void 0 == n) return !1;
void 0 == t && (t = !0), E.autoSlidePause(n.sliderNumber), b[n.sliderNumber] = !0, 
e(window).unbind(".iosSliderEvent-" + n.sliderNumber), e(document).unbind(".iosSliderEvent-" + n.sliderNumber), 
e(document).unbind("keydown.iosSliderEvent"), e(this).unbind(".iosSliderEvent"), 
e(this).children(":first-child").unbind(".iosSliderEvent"), e(this).children(":first-child").children().unbind(".iosSliderEvent"), 
e(n.settings.scrollbarBlockNode).unbind(".iosSliderEvent"), t && (e(this).attr("style", ""), 
e(this).children(":first-child").attr("style", ""), e(this).children(":first-child").children().attr("style", ""), 
e(n.settings.navSlideSelector).attr("style", ""), e(n.settings.navPrevSelector).attr("style", ""), 
e(n.settings.navNextSelector).attr("style", ""), e(n.settings.autoSlideToggleSelector).attr("style", ""), 
e(n.settings.unselectableSelector).attr("style", "")), n.settings.scrollbar && e(".scrollbarBlock" + n.sliderNumber).remove();
for (var r = k[n.sliderNumber], i = 0; i < r.length; i++) clearTimeout(r[i]);
o.removeData("iosslider"), o.removeData("args");
});
},
update:function(t) {
return void 0 == t && (t = this), e(t).each(function() {
var t = e(this), o = t.data("iosslider");
if (void 0 == o) return !1;
o.settings.startAtSlide = t.data("args").currentSlideNumber, C.destroy(!1, this), 
1 != o.numberOfSlides && o.settings.infiniteSlider && (o.settings.startAtSlide = (M[o.sliderNumber] + 1 + T[o.sliderNumber] + o.numberOfSlides) % o.numberOfSlides), 
C.init(o.settings, this);
var n = new E.args("update", o.settings, o.scrollerNode, e(o.scrollerNode).children(":eq(" + (o.settings.startAtSlide - 1) + ")"), o.settings.startAtSlide - 1, o.settings.startAtSlide - 1);
e(o.stageNode).data("args", n), "" != o.settings.onSliderUpdate && o.settings.onSliderUpdate(n);
});
},
addSlide:function(t, o) {
return this.each(function() {
var n = e(this), r = n.data("iosslider");
return void 0 == r ? !1 :(0 == e(r.scrollerNode).children().length ? (e(r.scrollerNode).append(t), 
n.data("args").currentSlideNumber = 1) :r.settings.infiniteSlider ? (1 == o ? e(r.scrollerNode).children(":eq(0)").before(t) :e(r.scrollerNode).children(":eq(" + (o - 2) + ")").after(t), 
T[r.sliderNumber] < -1 && M[r.sliderNumber]--, n.data("args").currentSlideNumber >= o && M[r.sliderNumber]++) :(o <= r.numberOfSlides ? e(r.scrollerNode).children(":eq(" + (o - 1) + ")").before(t) :e(r.scrollerNode).children(":eq(" + (o - 2) + ")").after(t), 
n.data("args").currentSlideNumber >= o && n.data("args").currentSlideNumber++), 
n.data("iosslider").numberOfSlides++, C.update(this), void 0);
});
},
removeSlide:function(t) {
return this.each(function() {
var o = e(this), n = o.data("iosslider");
return void 0 == n ? !1 :(e(n.scrollerNode).children(":eq(" + (t - 1) + ")").remove(), 
M[n.sliderNumber] > t - 1 && M[n.sliderNumber]--, o.data("iosslider").numberOfSlides--, 
C.update(this), void 0);
});
},
goToSlide:function(t, o) {
return void 0 == o && (o = this), e(o).each(function() {
var o = e(this), n = o.data("iosslider");
return void 0 == n || n.shortContent ? !1 :(t = t > n.childrenOffsets.length ? n.childrenOffsets.length - 1 :t - 1, 
E.changeSlide(t, e(n.scrollerNode), e(n.slideNodes), k[n.sliderNumber], n.scrollbarClass, n.scrollbarWidth, n.stageWidth, n.scrollbarStageWidth, n.scrollMargin, n.scrollBorder, n.originalOffsets, n.childrenOffsets, n.slideNodeOuterWidths, n.sliderNumber, n.infiniteSliderWidth, n.numberOfSlides, n.centeredSlideOffset, n.settings), 
void 0);
});
},
prevSlide:function() {
return this.each(function() {
var t = e(this), o = t.data("iosslider");
if (void 0 == o || o.shortContent) return !1;
var n = (M[o.sliderNumber] + T[o.sliderNumber] + o.numberOfSlides) % o.numberOfSlides;
(n > 0 || o.settings.infiniteSlider) && E.changeSlide(n - 1, e(o.scrollerNode), e(o.slideNodes), k[o.sliderNumber], o.scrollbarClass, o.scrollbarWidth, o.stageWidth, o.scrollbarStageWidth, o.scrollMargin, o.scrollBorder, o.originalOffsets, o.childrenOffsets, o.slideNodeOuterWidths, o.sliderNumber, o.infiniteSliderWidth, o.numberOfSlides, o.centeredSlideOffset, o.settings), 
M[o.sliderNumber] = n;
});
},
nextSlide:function() {
return this.each(function() {
var t = e(this), o = t.data("iosslider");
if (void 0 == o || o.shortContent) return !1;
var n = (M[o.sliderNumber] + T[o.sliderNumber] + o.numberOfSlides) % o.numberOfSlides;
(n < o.childrenOffsets.length - 1 || o.settings.infiniteSlider) && E.changeSlide(n + 1, e(o.scrollerNode), e(o.slideNodes), k[o.sliderNumber], o.scrollbarClass, o.scrollbarWidth, o.stageWidth, o.scrollbarStageWidth, o.scrollMargin, o.scrollBorder, o.originalOffsets, o.childrenOffsets, o.slideNodeOuterWidths, o.sliderNumber, o.infiniteSliderWidth, o.numberOfSlides, o.centeredSlideOffset, o.settings), 
M[o.sliderNumber] = n;
});
},
prevPage:function(t) {
return void 0 == t && (t = this), e(t).each(function() {
var t = e(this), o = t.data("iosslider");
if (void 0 == o) return !1;
var n = E.getSliderOffset(o.scrollerNode, "x") + o.stageWidth;
E.changeOffset(n, e(o.scrollerNode), e(o.slideNodes), k[o.sliderNumber], o.scrollbarClass, o.scrollbarWidth, o.stageWidth, o.scrollbarStageWidth, o.scrollMargin, o.scrollBorder, o.originalOffsets, o.childrenOffsets, o.slideNodeOuterWidths, o.sliderNumber, o.infiniteSliderWidth, o.numberOfSlides, o.centeredSlideOffset, o.settings);
});
},
nextPage:function(t) {
return void 0 == t && (t = this), e(t).each(function() {
var t = e(this), o = t.data("iosslider");
if (void 0 == o) return !1;
var n = E.getSliderOffset(o.scrollerNode, "x") - o.stageWidth;
E.changeOffset(n, e(o.scrollerNode), e(o.slideNodes), k[o.sliderNumber], o.scrollbarClass, o.scrollbarWidth, o.stageWidth, o.scrollbarStageWidth, o.scrollMargin, o.scrollBorder, o.originalOffsets, o.childrenOffsets, o.slideNodeOuterWidths, o.sliderNumber, o.infiniteSliderWidth, o.numberOfSlides, o.centeredSlideOffset, o.settings);
});
},
lock:function() {
return this.each(function() {
var t = e(this), o = t.data("iosslider");
return void 0 == o || o.shortContent ? !1 :(e(o.scrollerNode).css({
cursor:"default"
}), x[o.sliderNumber] = !0, void 0);
});
},
unlock:function() {
return this.each(function() {
var t = e(this), o = t.data("iosslider");
return void 0 == o || o.shortContent ? !1 :(e(o.scrollerNode).css({
cursor:m
}), x[o.sliderNumber] = !1, void 0);
});
},
getData:function() {
return this.each(function() {
var t = e(this), o = t.data("iosslider");
return void 0 == o || o.shortContent ? !1 :o;
});
},
autoSlidePause:function() {
return this.each(function() {
var t = e(this), o = t.data("iosslider");
return void 0 == o || o.shortContent ? !1 :(v[o.sliderNumber].autoSlide = !1, E.autoSlidePause(o.sliderNumber), 
o);
});
},
autoSlidePlay:function() {
return this.each(function() {
var t = e(this), o = t.data("iosslider");
return void 0 == o || o.shortContent ? !1 :(v[o.sliderNumber].autoSlide = !0, E.autoSlide(e(o.scrollerNode), e(o.slideNodes), k[o.sliderNumber], o.scrollbarClass, o.scrollbarWidth, o.stageWidth, o.scrollbarStageWidth, o.scrollMargin, o.scrollBorder, o.originalOffsets, o.childrenOffsets, o.slideNodeOuterWidths, o.sliderNumber, o.infiniteSliderWidth, o.numberOfSlides, o.centeredSlideOffset, o.settings), 
o);
});
}
};
e.fn.iosSlider = function(t) {
return C[t] ? C[t].apply(this, Array.prototype.slice.call(arguments, 1)) :"object" != typeof t && t ? (e.error("invalid method call!"), 
void 0) :C.init.apply(this, arguments);
};
}(jQuery);