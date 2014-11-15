(function() {
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
}).call(this), function(e) {
var t = 0, o = 0, n = 0, i = 10, r = 0, a = "ontouchstart" in window || navigator.msMaxTouchPoints > 0, s = "onorientationchange" in window, l = !1, c = !1, u = !1, d = !1, g = !1, p = !1, h = !1, m = "pointer", f = "pointer", w = new Array(), v = new Array(), b = new Array(), y = new Array(), _ = new Array(), k = new Array(), S = new Array(), x = new Array(), T = new Array(), $ = new Array(), C = new Array(), E = new Array(), M = new Array(), I = {
showScrollbar:function(t, o) {
t.scrollbarHide && e("." + o).css({
opacity:t.scrollbarOpacity,
filter:"alpha(opacity:" + 100 * t.scrollbarOpacity + ")"
});
},
hideScrollbar:function(e, t, o, n, r, a, s, l, c, u) {
if (e.scrollbar && e.scrollbarHide) for (var d = o; o + 25 > d; d++) t[t.length] = I.hideScrollbarIntervalTimer(i * d, n[o], (o + 24 - d) / 24, r, a, s, l, c, u, e);
},
hideScrollbarInterval:function(t, o, n, i, a, s, l, c, u) {
r = -1 * t / C[c] * (a - s - l - i), I.setSliderOffset("." + n, r), e("." + n).css({
opacity:u.scrollbarOpacity * o,
filter:"alpha(opacity:" + u.scrollbarOpacity * o * 100 + ")"
});
},
slowScrollHorizontalInterval:function(t, o, n, i, a, s, l, c, u, d, g, p, h, m, f, w, v, b, y) {
if (y.infiniteSlider) {
if (n <= -1 * C[w] || n <= -1 * E[w]) {
var _ = e(t).width();
if (n <= -1 * E[w]) {
var k = -1 * g[0];
e(o).each(function(t) {
I.setSliderOffset(e(o)[t], k + v), t < p.length && (p[t] = -1 * k), k += f[t];
}), n += -1 * p[0], $[w] = -1 * p[0] + v, C[w] = $[w] + _ - s, T[w] = 0;
}
for (;n <= -1 * C[w]; ) {
var M = 0, L = I.getSliderOffset(e(o[0]), "x");
e(o).each(function(e) {
I.getSliderOffset(this, "x") < L && (L = I.getSliderOffset(this, "x"), M = e);
});
var D = $[w] + _;
I.setSliderOffset(e(o)[M], D), $[w] = -1 * p[1] + v, C[w] = $[w] + _ - s, p.splice(0, 1), 
p.splice(p.length, 0, -1 * D + v), T[w]++;
}
}
if (n >= -1 * $[w] || n >= 0) {
var _ = e(t).width();
if (n > 0) {
var k = -1 * g[0];
for (e(o).each(function(t) {
I.setSliderOffset(e(o)[t], k + v), t < p.length && (p[t] = -1 * k), k += f[t];
}), n -= -1 * p[0], $[w] = -1 * p[0] + v, C[w] = $[w] + _ - s, T[w] = m; -1 * p[0] - _ + v > 0; ) {
var B = 0, O = I.getSliderOffset(e(o[0]), "x");
e(o).each(function(e) {
I.getSliderOffset(this, "x") > O && (O = I.getSliderOffset(this, "x"), B = e);
});
var D = $[w] - f[B];
I.setSliderOffset(e(o)[B], D), p.splice(0, 0, -1 * D + v), p.splice(p.length - 1, 1), 
$[w] = -1 * p[0] + v, C[w] = $[w] + _ - s, T[w]--, S[w]++;
}
}
for (;n > -1 * $[w]; ) {
var B = 0, O = I.getSliderOffset(e(o[0]), "x");
e(o).each(function(e) {
I.getSliderOffset(this, "x") > O && (O = I.getSliderOffset(this, "x"), B = e);
});
var D = $[w] - f[B];
I.setSliderOffset(e(o)[B], D), p.splice(0, 0, -1 * D + v), p.splice(p.length - 1, 1), 
$[w] = -1 * p[0] + v, C[w] = $[w] + _ - s, T[w]--;
}
}
}
var A = !1, H = I.calcActiveOffset(y, n, p, s, T[w], m, d, w), D = (H + T[w] + m) % m;
if (y.infiniteSlider ? D != x[w] && (A = !0) :H != S[w] && (A = !0), A) {
var N = new I.args("change", y, t, e(t).children(":eq(" + D + ")"), D, b);
e(t).parent().data("args", N), "" != y.onSlideChange && y.onSlideChange(N);
}
if (S[w] = H, x[w] = D, n = Math.floor(n), I.setSliderOffset(t, n), y.scrollbar) {
r = Math.floor((-1 * n - $[w] + v) / (C[w] - $[w] + v) * (l - c - a));
var j = a - u;
n >= -1 * $[w] + v ? (j = a - u - -1 * r, I.setSliderOffset(e("." + i), 0), e("." + i).css({
width:j + "px"
})) :n <= -1 * C[w] + 1 ? (j = l - c - u - r, I.setSliderOffset(e("." + i), r), 
e("." + i).css({
width:j + "px"
})) :(I.setSliderOffset(e("." + i), r), e("." + i).css({
width:j + "px"
}));
}
},
slowScrollHorizontal:function(t, o, n, r, a, s, l, c, u, d, g, p, h, m, f, w, v, b, y, _, E) {
var M = I.getSliderOffset(t, "x"), L = new Array(), D = new Array(), B = 0, O = 25 / 1024 * c;
frictionCoefficient = E.frictionCoefficient, elasticFrictionCoefficient = E.elasticFrictionCoefficient, 
snapFrictionCoefficient = E.snapFrictionCoefficient, a > E.snapVelocityThreshold && E.snapToChildren && !y ? B = 1 :a < -1 * E.snapVelocityThreshold && E.snapToChildren && !y && (B = -1), 
-1 * O > a ? a = -1 * O :a > O && (a = O), e(t)[0] !== e(b)[0] && (B = -1 * B, a = -2 * a);
var A = T[f];
if (E.infiniteSlider) var H = $[f], N = C[f];
for (var j = new Array(), z = new Array(), P = 0; P < h.length; P++) j[P] = h[P], 
P < o.length && (z[P] = I.getSliderOffset(e(o[P]), "x"));
for (;a > 1 || -1 > a; ) {
if (a *= frictionCoefficient, M += a, (M > -1 * $[f] || M < -1 * C[f]) && !E.infiniteSlider && (a *= elasticFrictionCoefficient, 
M += a), E.infiniteSlider) {
if (-1 * N >= M) {
for (var F = e(t).width(), R = 0, Y = z[0], P = 0; P < z.length; P++) z[P] < Y && (Y = z[P], 
R = P);
var q = H + F;
z[R] = q, H = -1 * j[1] + _, N = H + F - c, j.splice(0, 1), j.splice(j.length, 0, -1 * q + _), 
A++;
}
if (M >= -1 * H) {
for (var F = e(t).width(), W = 0, U = z[0], P = 0; P < z.length; P++) z[P] > U && (U = z[P], 
W = P);
var q = H - m[W];
z[W] = q, j.splice(0, 0, -1 * q + _), j.splice(j.length - 1, 1), H = -1 * j[0] + _, 
N = H + F - c, A--;
}
}
L[L.length] = M, D[D.length] = a;
}
var V = !1, G = I.calcActiveOffset(E, M, j, c, A, v, S[f], f), J = (G + A + v) % v;
if (E.snapToChildren && (E.infiniteSlider ? J != x[f] && (V = !0) :G != S[f] && (V = !0), 
0 > B && !V ? (G++, G >= h.length && !E.infiniteSlider && (G = h.length - 1)) :B > 0 && !V && (G--, 
0 > G && !E.infiniteSlider && (G = 0))), E.snapToChildren || (M > -1 * $[f] || M < -1 * C[f]) && !E.infiniteSlider) {
for ((M > -1 * $[f] || M < -1 * C[f]) && !E.infiniteSlider ? L.splice(0, L.length) :(L.splice(.1 * L.length, L.length), 
M = L.length > 0 ? L[L.length - 1] :M); M < j[G] - .5 || M > j[G] + .5; ) M = (M - j[G]) * snapFrictionCoefficient + j[G], 
L[L.length] = M;
L[L.length] = j[G];
}
var Q = 1;
L.length % 2 != 0 && (Q = 0);
for (var K = 0; K < n.length; K++) clearTimeout(n[K]);
for (var X = (G + A + v) % v, Z = 0, K = Q; K < L.length; K += 2) (K == Q || Math.abs(L[K] - Z) > 1 || K >= L.length - 2) && (Z = L[K], 
n[n.length] = I.slowScrollHorizontalIntervalTimer(i * K, t, o, L[K], r, l, c, u, d, g, G, p, h, w, v, m, f, _, X, E));
var V = !1, J = (G + T[f] + v) % v;
E.infiniteSlider ? J != x[f] && (V = !0) :G != S[f] && (V = !0), "" != E.onSlideComplete && L.length > 1 && (n[n.length] = I.onSlideCompleteTimer(i * (K + 1), E, t, e(t).children(":eq(" + J + ")"), X, f)), 
n[n.length] = I.updateBackfaceVisibilityTimer(i * (K + 1), o, f, v, E), k[f] = n, 
I.hideScrollbar(E, n, K, L, r, l, c, d, g, f);
},
onSlideComplete:function(t, o, n, i, r) {
var a = (w[r] != i ? !0 :!1, new I.args("complete", t, e(o), n, i, i));
e(o).parent().data("args", a), "" != t.onSlideComplete && t.onSlideComplete(a), 
w[r] = i;
},
getSliderOffset:function(t, o) {
var n = 0;
if (o = "x" == o ? 4 :5, !c || u || d) n = parseInt(e(t).css("left"), 10); else {
for (var i, r = new Array("-webkit-transform", "-moz-transform", "transform"), a = 0; a < r.length; a++) if (void 0 != e(t).css(r[a]) && e(t).css(r[a]).length > 0) {
i = e(t).css(r[a]).split(",");
break;
}
n = void 0 == i[o] ? 0 :parseInt(i[o], 10);
}
return n;
},
setSliderOffset:function(t, o) {
o = parseInt(o, 10), !c || u || d ? e(t).css({
left:o + "px"
}) :e(t).css({
msTransform:"matrix(1,0,0,1," + o + ",0)",
webkitTransform:"matrix(1,0,0,1," + o + ",0)",
MozTransform:"matrix(1,0,0,1," + o + ",0)",
transform:"matrix(1,0,0,1," + o + ",0)"
});
},
setBrowserInfo:function() {
null != navigator.userAgent.match("WebKit") ? (l = !0, m = "-webkit-grab", f = "-webkit-grabbing") :null != navigator.userAgent.match("Gecko") ? (h = !0, 
m = "move", f = "-moz-grabbing") :null != navigator.userAgent.match("MSIE 7") ? (u = !0, 
p = !0) :null != navigator.userAgent.match("MSIE 8") ? (d = !0, p = !0) :null != navigator.userAgent.match("MSIE 9") && (g = !0, 
p = !0);
},
has3DTransform:function() {
var t = !1, o = e("<div />").css({
msTransform:"matrix(1,1,1,1,1,1)",
webkitTransform:"matrix(1,1,1,1,1,1)",
MozTransform:"matrix(1,1,1,1,1,1)",
transform:"matrix(1,1,1,1,1,1)"
});
return "" == o.attr("style") ? t = !1 :h && parseInt(navigator.userAgent.split("/")[3], 10) >= 21 ? t = !1 :void 0 != o.attr("style") && (t = !0), 
t;
},
getSlideNumber:function(e, t, o) {
return (e - T[t] + o) % o;
},
calcActiveOffset:function(e, t, o, n, i, r) {
var a, s = !1, l = new Array();
t > o[0] && (a = 0), t < o[o.length - 1] && (a = r - 1);
for (var c = 0; c < o.length; c++) o[c] <= t && o[c] > t - n && (s || o[c] == t || (l[l.length] = o[c - 1]), 
l[l.length] = o[c], s = !0);
0 == l.length && (l[0] = o[o.length - 1]);
for (var u = n, d = 0, c = 0; c < l.length; c++) {
var g = Math.abs(t - l[c]);
u > g && (d = l[c], u = g);
}
for (var c = 0; c < o.length; c++) d == o[c] && (a = c);
return a;
},
changeSlide:function(t, o, n, r, a, s, l, c, u, d, g, p, h, m, f, w, v, b) {
I.autoSlidePause(m);
for (var y = 0; y < r.length; y++) clearTimeout(r[y]);
var _ = Math.ceil(b.autoSlideTransTimer / 10) + 1, $ = I.getSliderOffset(o, "x"), C = p[t], E = C - $, M = t - (S[m] + T[m] + w) % w;
if (b.infiniteSlider) {
t = (t - T[m] + 2 * w) % w;
var L = !1;
0 == t && 2 == w && (t = w, p[t] = p[t - 1] - e(n).eq(0).outerWidth(!0), L = !0), 
C = p[t], E = C - $;
var D = new Array(p[t] - e(o).width(), p[t] + e(o).width());
L && p.splice(p.length - 1, 1);
for (var B = 0; B < D.length; B++) Math.abs(D[B] - $) < Math.abs(E) && (E = D[B] - $);
}
0 > E && -1 == M ? E += e(o).width() :E > 0 && 1 == M && (E -= e(o).width());
var O, A, H = new Array();
I.showScrollbar(b, a);
for (var B = 0; _ >= B; B++) O = B, O /= _, O--, A = $ + E * (Math.pow(O, 5) + 1), 
H[H.length] = A;
for (var N = (t + T[m] + w) % w, j = 0, B = 0; B < H.length; B++) if ((0 == B || Math.abs(H[B] - j) > 1 || B >= H.length - 2) && (j = H[B], 
r[B] = I.slowScrollHorizontalIntervalTimer(i * (B + 1), o, n, H[B], a, s, l, c, u, d, t, g, p, f, w, h, m, v, N, b)), 
0 == B && "" != b.onSlideStart) {
var z = (S[m] + T[m] + w) % w;
b.onSlideStart(new I.args("start", b, o, e(o).children(":eq(" + z + ")"), z, t));
}
var P = !1;
b.infiniteSlider ? N != x[m] && (P = !0) :t != S[m] && (P = !0), P && "" != b.onSlideComplete && (r[r.length] = I.onSlideCompleteTimer(i * (B + 1), b, o, e(o).children(":eq(" + N + ")"), N, m)), 
k[m] = r, I.hideScrollbar(b, r, B, H, a, s, l, u, d, m), I.autoSlide(o, n, r, a, s, l, c, u, d, g, p, h, m, f, w, v, b);
},
changeOffset:function(t, o, n, r, a, s, l, c, u, d, g, p, h, m, f, w, v, b) {
I.autoSlidePause(m);
for (var y = 0; y < r.length; y++) clearTimeout(r[y]);
b.infiniteSlider || (t = t > -1 * $[m] + v ? -1 * $[m] + v :t, t = t < -1 * C[m] ? -1 * C[m] :t);
var _ = Math.ceil(b.autoSlideTransTimer / 10) + 1, E = I.getSliderOffset(o, "x"), M = (I.calcActiveOffset(b, t, p, l, T, w, S[m], m) + T[m] + w) % w, L = p.slice();
if (b.snapToChildren && !b.infiniteSlider) t = p[M]; else if (b.infiniteSlider && b.snapToChildren) {
for (;t >= L[0]; ) L.splice(0, 0, L[w - 1] + e(o).width()), L.splice(w, 1);
for (;t <= L[w - 1]; ) L.splice(w, 0, L[0] - e(o).width()), L.splice(0, 1);
M = I.calcActiveOffset(b, t, L, l, T, w, S[m], m), t = L[M];
}
var D, B, O = t - E, A = new Array();
I.showScrollbar(b, a);
for (var H = 0; _ >= H; H++) D = H, D /= _, D--, B = E + O * (Math.pow(D, 5) + 1), 
A[A.length] = B;
for (var N = (M + T[m] + w) % w, j = 0, H = 0; H < A.length; H++) if ((0 == H || Math.abs(A[H] - j) > 1 || H >= A.length - 2) && (j = A[H], 
r[H] = I.slowScrollHorizontalIntervalTimer(i * (H + 1), o, n, A[H], a, s, l, c, u, d, M, g, p, f, w, h, m, v, N, b)), 
0 == H && "" != b.onSlideStart) {
var N = (S[m] + T[m] + w) % w;
b.onSlideStart(new I.args("start", b, o, e(o).children(":eq(" + N + ")"), N, M));
}
var z = !1;
b.infiniteSlider ? N != x[m] && (z = !0) :M != S[m] && (z = !0), z && "" != b.onSlideComplete && (r[r.length] = I.onSlideCompleteTimer(i * (H + 1), b, o, e(o).children(":eq(" + N + ")"), N, m)), 
k[m] = r, I.hideScrollbar(b, r, H, A, a, s, l, u, d, m), I.autoSlide(o, n, r, a, s, l, c, u, d, g, p, h, m, f, w, v, b);
},
autoSlide:function(e, t, o, n, i, r, a, s, l, c, u, d, g, p, h, m, f) {
return y[g].autoSlide ? (I.autoSlidePause(g), v[g] = setTimeout(function() {
!f.infiniteSlider && S[g] > u.length - 1 && (S[g] = S[g] - h);
var w = S[g] + T[g] + 1;
I.changeSlide(w, e, t, o, n, i, r, a, s, l, c, u, d, g, p, h, m, f), I.autoSlide(e, t, o, n, i, r, a, s, l, c, u, d, g, p, h, m, f);
}, f.autoSlideTimer + f.autoSlideTransTimer), void 0) :!1;
},
autoSlidePause:function(e) {
clearTimeout(v[e]);
},
isUnselectable:function(t, o) {
return "" != o.unselectableSelector && 1 == e(t).closest(o.unselectableSelector).length ? !0 :!1;
},
slowScrollHorizontalIntervalTimer:function(e, t, o, n, i, r, a, s, l, c, u, d, g, p, h, m, f, w, v, b) {
var y = setTimeout(function() {
I.slowScrollHorizontalInterval(t, o, n, i, r, a, s, l, c, u, d, g, p, h, m, f, w, v, b);
}, e);
return y;
},
onSlideCompleteTimer:function(e, t, o, n, i, r) {
var a = setTimeout(function() {
I.onSlideComplete(t, o, n, i, r);
}, e);
return a;
},
hideScrollbarIntervalTimer:function(e, t, o, n, i, r, a, s, l, c) {
var u = setTimeout(function() {
I.hideScrollbarInterval(t, o, n, i, r, a, s, l, c);
}, e);
return u;
},
updateBackfaceVisibilityTimer:function(e, t, o, n, i) {
var r = setTimeout(function() {
I.updateBackfaceVisibility(t, o, n, i);
}, e);
return r;
},
updateBackfaceVisibility:function(t, o, n, i) {
for (var r = (S[o] + T[o] + n) % n, a = Array(), s = 0; s < 2 * i.hardwareAccelBuffer; s++) {
var l = I.mod(r + s - i.hardwareAccelBuffer, n);
if ("visible" == e(t).eq(l).css("-webkit-backface-visibility")) {
a[a.length] = l;
var c = I.mod(l + 2 * i.hardwareAccelBuffer, n), u = I.mod(l - 2 * i.hardwareAccelBuffer, n);
e(t).eq(l).css("-webkit-backface-visibility", "hidden"), -1 == a.indexOf(u) && e(t).eq(u).css("-webkit-backface-visibility", ""), 
-1 == a.indexOf(c) && e(t).eq(c).css("-webkit-backface-visibility", "");
}
}
},
mod:function(e, t) {
var o = e % t;
return 0 > o ? o + t :o;
},
args:function(t, o, n, i, r, a) {
this.prevSlideNumber = void 0 == e(n).parent().data("args") ? void 0 :e(n).parent().data("args").prevSlideNumber, 
this.prevSlideObject = void 0 == e(n).parent().data("args") ? void 0 :e(n).parent().data("args").prevSlideObject, 
this.targetSlideNumber = a + 1, this.targetSlideObject = e(n).children(":eq(" + a + ")"), 
this.slideChanged = !1, "load" == t ? (this.targetSlideNumber = void 0, this.targetSlideObject = void 0) :"start" == t ? (this.targetSlideNumber = void 0, 
this.targetSlideObject = void 0) :"change" == t ? (this.slideChanged = !0, this.prevSlideNumber = void 0 == e(n).parent().data("args") ? o.startAtSlide :e(n).parent().data("args").currentSlideNumber, 
this.prevSlideObject = e(n).children(":eq(" + this.prevSlideNumber + ")")) :"complete" == t && (this.slideChanged = e(n).parent().data("args").slideChanged), 
this.settings = o, this.data = e(n).parent().data("iosslider"), this.sliderObject = n, 
this.sliderContainerObject = e(n).parent(), this.currentSlideObject = i, this.currentSlideNumber = r + 1, 
this.currentSliderOffset = -1 * I.getSliderOffset(n, "x");
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
I.setBrowserInfo();
var L = {
init:function(i, l) {
c = I.has3DTransform();
var g = e.extend(!0, {
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
}, i);
return void 0 == l && (l = this), e(l).each(function(i) {
function l() {
I.autoSlidePause(c), ft = e(at).find("a"), wt = e(at).find("[onclick]"), vt = e(at).find("*"), 
e(X).css("width", ""), e(X).css("height", ""), e(at).css("width", ""), Y = e(at).children().not("script").get(), 
q = new Array(), W = new Array(), g.responsiveSlides && e(Y).css("width", ""), C[c] = 0, 
R = new Array(), A = e(X).parent().width(), N = e(X).outerWidth(!0), g.responsiveSlideContainer && (N = e(X).outerWidth(!0) > A ? A :e(X).width()), 
e(X).css({
position:g.stageCSS.position,
top:g.stageCSS.top,
left:g.stageCSS.left,
overflow:g.stageCSS.overflow,
zIndex:g.stageCSS.zIndex,
webkitPerspective:1e3,
webkitBackfaceVisibility:"hidden",
msTouchAction:"pan-y",
width:N
}), e(g.unselectableSelector).css({
cursor:"default"
});
for (var t = 0; t < Y.length; t++) {
q[t] = e(Y[t]).width(), W[t] = e(Y[t]).outerWidth(!0);
var o = W[t];
g.responsiveSlides && (W[t] > N ? (o = N + -1 * (W[t] - q[t]), q[t] = o, W[t] = N) :o = q[t], 
e(Y[t]).css({
width:o
})), e(Y[t]).css({
overflow:"hidden",
position:"absolute"
}), R[t] = -1 * C[c], C[c] = C[c] + o + (W[t] - q[t]);
}
g.snapSlideCenter && (K = .5 * (N - W[0]), g.responsiveSlides && W[0] > N && (K = 0)), 
E[c] = 2 * C[c];
for (var t = 0; t < Y.length; t++) I.setSliderOffset(e(Y[t]), -1 * R[t] + C[c] + K), 
R[t] = R[t] - C[c];
if (!g.infiniteSlider && !g.snapSlideCenter) {
for (var n = 0; n < R.length && !(R[n] <= -1 * (2 * C[c] - N)); n++) ct = n;
R.splice(ct + 1, R.length), R[R.length] = -1 * (2 * C[c] - N);
}
for (var n = 0; n < R.length; n++) tt[n] = R[n];
if (Z && (y[c].startAtSlide = y[c].startAtSlide > R.length ? R.length :y[c].startAtSlide, 
g.infiniteSlider ? (y[c].startAtSlide = (y[c].startAtSlide - 1 + st) % st, S[c] = y[c].startAtSlide) :(y[c].startAtSlide = y[c].startAtSlide - 1 < 0 ? R.length - 1 :y[c].startAtSlide, 
S[c] = y[c].startAtSlide - 1), x[c] = S[c]), $[c] = C[c] + K, e(at).css({
position:"relative",
cursor:m,
webkitPerspective:"0",
webkitBackfaceVisibility:"hidden",
width:C[c] + "px"
}), mt = C[c], C[c] = 2 * C[c] - N + 2 * K, gt = N > mt + K || 0 == N ? !0 :!1, 
gt && e(at).css({
cursor:"default"
}), H = e(X).parent().outerHeight(!0), j = e(X).height(), g.responsiveSlideContainer && (j = j > H ? H :j), 
e(X).css({
height:j
}), I.setSliderOffset(at, R[S[c]]), g.infiniteSlider && !gt) {
for (var i = I.getSliderOffset(e(at), "x"), r = (T[c] + st) % st * -1; 0 > r; ) {
var a = 0, s = I.getSliderOffset(e(Y[0]), "x");
e(Y).each(function(e) {
I.getSliderOffset(this, "x") < s && (s = I.getSliderOffset(this, "x"), a = e);
});
var l = $[c] + mt;
I.setSliderOffset(e(Y)[a], l), $[c] = -1 * R[1] + K, C[c] = $[c] + mt - N, R.splice(0, 1), 
R.splice(R.length, 0, -1 * l + K), r++;
}
for (;-1 * R[0] - mt + K > 0 && g.snapSlideCenter && Z; ) {
var u = 0, d = I.getSliderOffset(e(Y[0]), "x");
e(Y).each(function(e) {
I.getSliderOffset(this, "x") > d && (d = I.getSliderOffset(this, "x"), u = e);
});
var l = $[c] - W[u];
I.setSliderOffset(e(Y)[u], l), R.splice(0, 0, -1 * l + K), R.splice(R.length - 1, 1), 
$[c] = -1 * R[0] + K, C[c] = $[c] + mt - N, T[c]--, S[c]++;
}
for (;i <= -1 * C[c]; ) {
var a = 0, s = I.getSliderOffset(e(Y[0]), "x");
e(Y).each(function(e) {
I.getSliderOffset(this, "x") < s && (s = I.getSliderOffset(this, "x"), a = e);
});
var l = $[c] + mt;
I.setSliderOffset(e(Y)[a], l), $[c] = -1 * R[1] + K, C[c] = $[c] + mt - N, R.splice(0, 1), 
R.splice(R.length, 0, -1 * l + K), T[c]++, S[c]--;
}
}
return I.setSliderOffset(at, R[S[c]]), I.updateBackfaceVisibility(Y, c, st, g), 
g.desktopClickDrag || e(at).css({
cursor:"default"
}), g.scrollbar && (e("." + J).css({
margin:g.scrollbarMargin,
overflow:"hidden",
display:"none"
}), e("." + J + " ." + Q).css({
border:g.scrollbarBorder
}), z = parseInt(e("." + J).css("marginLeft")) + parseInt(e("." + J).css("marginRight")), 
P = parseInt(e("." + J + " ." + Q).css("borderLeftWidth"), 10) + parseInt(e("." + J + " ." + Q).css("borderRightWidth"), 10), 
B = "" != g.scrollbarContainer ? e(g.scrollbarContainer).width() :N, O = N / mt * (B - z), 
g.scrollbarHide || (ot = g.scrollbarOpacity), e("." + J).css({
position:"absolute",
left:0,
width:B - z + "px",
margin:g.scrollbarMargin
}), "top" == g.scrollbarLocation ? e("." + J).css("top", "0") :e("." + J).css("bottom", "0"), 
e("." + J + " ." + Q).css({
borderRadius:g.scrollbarBorderRadius,
background:g.scrollbarBackground,
height:g.scrollbarHeight,
width:O - P + "px",
minWidth:g.scrollbarHeight,
border:g.scrollbarBorder,
webkitPerspective:1e3,
webkitBackfaceVisibility:"hidden",
position:"relative",
opacity:ot,
filter:"alpha(opacity:" + 100 * ot + ")",
boxShadow:g.scrollbarShadow
}), I.setSliderOffset(e("." + J + " ." + Q), Math.floor((-1 * R[S[c]] - $[c] + K) / (C[c] - $[c] + K) * (B - z - O))), 
e("." + J).css({
display:"block"
}), v = e("." + J + " ." + Q), D = e("." + J)), g.scrollbarDrag && !gt && e("." + J + " ." + Q).css({
cursor:m
}), g.infiniteSlider && (U = (C[c] + N) / 3), "" != g.navSlideSelector && e(g.navSlideSelector).each(function(t) {
e(this).css({
cursor:"pointer"
}), e(this).unbind(_t).bind(_t, function(o) {
"touchstart" == o.type ? e(this).unbind("click.iosSliderEvent") :e(this).unbind("touchstart.iosSliderEvent"), 
_t = o.type + ".iosSliderEvent", I.changeSlide(t, at, Y, h, Q, O, N, B, z, P, tt, R, W, c, U, st, K, g);
});
}), "" != g.navPrevSelector && (e(g.navPrevSelector).css({
cursor:"pointer"
}), e(g.navPrevSelector).unbind(_t).bind(_t, function(t) {
"touchstart" == t.type ? e(this).unbind("click.iosSliderEvent") :e(this).unbind("touchstart.iosSliderEvent"), 
_t = t.type + ".iosSliderEvent";
var o = (S[c] + T[c] + st) % st;
(o > 0 || g.infiniteSlider) && I.changeSlide(o - 1, at, Y, h, Q, O, N, B, z, P, tt, R, W, c, U, st, K, g);
})), "" != g.navNextSelector && (e(g.navNextSelector).css({
cursor:"pointer"
}), e(g.navNextSelector).unbind(_t).bind(_t, function(t) {
"touchstart" == t.type ? e(this).unbind("click.iosSliderEvent") :e(this).unbind("touchstart.iosSliderEvent"), 
_t = t.type + ".iosSliderEvent";
var o = (S[c] + T[c] + st) % st;
(o < R.length - 1 || g.infiniteSlider) && I.changeSlide(o + 1, at, Y, h, Q, O, N, B, z, P, tt, R, W, c, U, st, K, g);
})), g.autoSlide && !gt && "" != g.autoSlideToggleSelector && (e(g.autoSlideToggleSelector).css({
cursor:"pointer"
}), e(g.autoSlideToggleSelector).unbind(_t).bind(_t, function(t) {
"touchstart" == t.type ? e(this).unbind("click.iosSliderEvent") :e(this).unbind("touchstart.iosSliderEvent"), 
_t = t.type + ".iosSliderEvent", pt ? (I.autoSlide(at, Y, h, Q, O, N, B, z, P, tt, R, W, c, U, st, K, g), 
pt = !1, e(g.autoSlideToggleSelector).removeClass("on")) :(I.autoSlidePause(c), 
pt = !0, e(g.autoSlideToggleSelector).addClass("on"));
})), I.autoSlide(at, Y, h, Q, O, N, B, z, P, tt, R, W, c, U, st, K, g), e(X).bind("mouseleave.iosSliderEvent", function() {
return pt ? !0 :(I.autoSlide(at, Y, h, Q, O, N, B, z, P, tt, R, W, c, U, st, K, g), 
void 0);
}), e(X).bind("touchend.iosSliderEvent", function() {
return pt ? !0 :(I.autoSlide(at, Y, h, Q, O, N, B, z, P, tt, R, W, c, U, st, K, g), 
void 0);
}), g.autoSlideHoverPause && e(X).bind("mouseenter.iosSliderEvent", function() {
I.autoSlidePause(c);
}), e(X).data("iosslider", {
obj:kt,
settings:g,
scrollerNode:at,
slideNodes:Y,
numberOfSlides:st,
centeredSlideOffset:K,
sliderNumber:c,
originalOffsets:tt,
childrenOffsets:R,
sliderMax:C[c],
scrollbarClass:Q,
scrollbarWidth:O,
scrollbarStageWidth:B,
stageWidth:N,
scrollMargin:z,
scrollBorder:P,
infiniteSliderOffset:T[c],
infiniteSliderWidth:U,
slideNodeOuterWidths:W,
shortContent:gt
}), Z = !1, !0;
}
t++;
var c = t, h = new Array();
y[c] = e.extend({}, g), $[c] = 0, C[c] = 0;
var v, D, B, O, A, H, N, j, z, P, F, R, Y, q, W, U, V = new Array(0, 0), G = new Array(0, 0), J = "scrollbarBlock" + t, Q = "scrollbar" + t, K = 0, X = e(this), Z = !0, et = -1, tt = (new Array(), 
new Array()), ot = 0, nt = 0, it = 0, rt = 0, at = e(this).children(":first-child"), st = e(at).children().not("script").length, lt = !1, ct = 0, ut = !1, dt = void 0;
T[c] = 0;
var gt = !1;
w[c] = -1;
var pt = !1;
b[c] = X, _[c] = !1;
var ht, mt, ft, wt, vt, bt = !1, yt = !1, _t = "touchstart.iosSliderEvent click.iosSliderEvent";
M[c] = !1, k[c] = new Array(), g.scrollbarDrag && (g.scrollbar = !0, g.scrollbarHide = !1);
var kt = e(this), St = kt.data("iosslider");
if (void 0 != St) return !0;
for (var xt = [ "d", "e", "m", "o", " ", "v", "e", "r", "s", "i", "o", "n" ], Tt = Math.floor(12317 * Math.random()), i = 0; i < xt.length; i++) e(".i" + Tt).html(e(".i" + Tt).html() + xt[i]);
if (parseInt(e().jquery.split(".").join(""), 10) >= 14.2 ? e(this).delegate("img", "dragstart.iosSliderEvent", function(e) {
e.preventDefault();
}) :e(this).find("img").bind("dragstart.iosSliderEvent", function(e) {
e.preventDefault();
}), g.infiniteSlider && (g.scrollbar = !1), g.infiniteSlider && 1 == st && (g.infiniteSlider = !1), 
g.scrollbar && ("" != g.scrollbarContainer ? e(g.scrollbarContainer).append("<div class = '" + J + "'><div class = '" + Q + "'></div></div>") :e(at).parent().append("<div class = '" + J + "'><div class = '" + Q + "'></div></div>")), 
!l()) return !0;
e(this).find("a").bind("mousedown", I.preventDrag), e(this).find("[onclick]").bind("click", I.preventDrag).each(function() {
e(this).data("onclick", this.onclick);
});
var et = I.calcActiveOffset(g, I.getSliderOffset(e(at), "x"), R, N, T[c], st, void 0, c), $t = (et + T[c] + st) % st, Ct = new I.args("load", g, at, e(at).children(":eq(" + $t + ")"), $t, $t);
if (e(X).data("args", Ct), "" != g.onSliderLoaded && g.onSliderLoaded(Ct), w[c] = $t, 
g.scrollbarPaging && g.scrollbar && !gt && (e(D).css("cursor", "pointer"), e(D).bind("click.iosSliderEvent", function(t) {
this == t.target && (t.pageX > e(v).offset().left ? L.nextPage(X) :L.prevPage(X));
})), y[c].responsiveSlides || y[c].responsiveSlideContainer) {
var Et = s ? "orientationchange" :"resize", Mt = $B.debounce(function() {
if (!l()) return !0;
var t = e(X).data("args");
"" != g.onSliderResize && g.onSliderResize(t);
}, 50);
e(window).bind(Et + ".iosSliderEvent-" + c, Mt);
}
if (!g.keyboardControls && !g.tabToAdvance || gt || e(document).bind("keydown.iosSliderEvent", function(e) {
if (!u && !d) var e = e.originalEvent;
if (M[c]) return !0;
if (37 == e.keyCode && g.keyboardControls) {
e.preventDefault();
var t = (S[c] + T[c] + st) % st;
(t > 0 || g.infiniteSlider) && I.changeSlide(t - 1, at, Y, h, Q, O, N, B, z, P, tt, R, W, c, U, st, K, g);
} else if (39 == e.keyCode && g.keyboardControls || 9 == e.keyCode && g.tabToAdvance) {
e.preventDefault();
var t = (S[c] + T[c] + st) % st;
(t < R.length - 1 || g.infiniteSlider) && I.changeSlide(t + 1, at, Y, h, Q, O, N, B, z, P, tt, R, W, c, U, st, K, g);
}
}), a || g.desktopClickDrag) {
var It = !1, Lt = !1, Dt = e(at), Bt = e(at), Ot = !1;
g.scrollbarDrag && (Dt = Dt.add(v), Bt = Bt.add(D)), e(Dt).bind("mousedown.iosSliderEvent touchstart.iosSliderEvent", function(t) {
if (e(window).one("scroll.iosSliderEvent", function() {
It = !1;
}), It) return !0;
if (It = !0, Lt = !1, "touchstart" == t.type ? e(Bt).unbind("mousedown.iosSliderEvent") :e(Bt).unbind("touchstart.iosSliderEvent"), 
M[c] || gt) return It = !1, lt = !1, !0;
if (Ot = I.isUnselectable(t.target, g)) return It = !1, lt = !1, !0;
if (ht = e(this)[0] === e(v)[0] ? v :at, !u && !d) var t = t.originalEvent;
if (I.autoSlidePause(c), vt.unbind(".disableClick"), "touchstart" == t.type) eventX = t.touches[0].pageX, 
eventY = t.touches[0].pageY; else {
if (window.getSelection) window.getSelection().empty ? window.getSelection().empty() :window.getSelection().removeAllRanges && window.getSelection().removeAllRanges(); else if (document.selection) if (d) try {
document.selection.empty();
} catch (t) {} else document.selection.empty();
eventX = t.pageX, eventY = t.pageY, ut = !0, dt = at, e(this).css({
cursor:f
});
}
V = new Array(0, 0), G = new Array(0, 0), o = 0, lt = !1;
for (var n = 0; n < h.length; n++) clearTimeout(h[n]);
var i = I.getSliderOffset(at, "x");
i > -1 * $[c] + K + mt ? (i = -1 * $[c] + K + mt, I.setSliderOffset(e("." + Q), i), 
e("." + Q).css({
width:O - P + "px"
})) :i < -1 * C[c] && (i = -1 * C[c], I.setSliderOffset(e("." + Q), B - z - O), 
e("." + Q).css({
width:O - P + "px"
}));
var r = e(this)[0] === e(v)[0] ? $[c] :0;
nt = -1 * (I.getSliderOffset(this, "x") - eventX - r), it = -1 * (I.getSliderOffset(this, "y") - eventY), 
V[1] = eventX, G[1] = eventY, yt = !1;
}), e(document).bind("touchmove.iosSliderEvent mousemove.iosSliderEvent", function(t) {
if (!u && !d) var t = t.originalEvent;
if (M[c] || gt || Ot || !It) return !0;
var i = 0;
if ("touchmove" == t.type) eventX = t.touches[0].pageX, eventY = t.touches[0].pageY; else {
if (window.getSelection) window.getSelection().empty || window.getSelection().removeAllRanges && window.getSelection().removeAllRanges(); else if (document.selection) if (d) try {
document.selection.empty();
} catch (t) {} else document.selection.empty();
if (eventX = t.pageX, eventY = t.pageY, !ut) return !0;
if (!p && ("undefined" != typeof t.webkitMovementX || "undefined" != typeof t.webkitMovementY) && 0 === t.webkitMovementY && 0 === t.webkitMovementX) return !0;
}
if (V[0] = V[1], V[1] = eventX, o = (V[1] - V[0]) / 2, G[0] = G[1], G[1] = eventY, 
n = (G[1] - G[0]) / 2, !lt) {
var a = (S[c] + T[c] + st) % st, s = new I.args("start", g, at, e(at).children(":eq(" + a + ")"), a, void 0);
e(X).data("args", s), "" != g.onSlideStart && g.onSlideStart(s);
}
if ((n > g.verticalSlideLockThreshold || n < -1 * g.verticalSlideLockThreshold) && "touchmove" == t.type && !lt && (bt = !0), 
(o > g.horizontalSlideLockThreshold || o < -1 * g.horizontalSlideLockThreshold) && "touchmove" == t.type && t.preventDefault(), 
(o > g.slideStartVelocityThreshold || o < -1 * g.slideStartVelocityThreshold) && (lt = !0), 
lt && !bt) {
var l = I.getSliderOffset(at, "x"), h = e(ht)[0] === e(v)[0] ? $[c] :K, m = e(ht)[0] === e(v)[0] ? ($[c] - C[c] - K) / (B - z - O) :1, f = e(ht)[0] === e(v)[0] ? g.scrollbarElasticPullResistance :g.elasticPullResistance, w = g.snapSlideCenter && e(ht)[0] === e(v)[0] ? 0 :K, b = g.snapSlideCenter && e(ht)[0] === e(v)[0] ? K :0;
if ("touchmove" == t.type && (rt != t.touches.length && (nt = -1 * l + eventX), 
rt = t.touches.length), g.infiniteSlider) {
if (l <= -1 * C[c]) {
var y = e(at).width();
if (l <= -1 * E[c]) {
var _ = -1 * tt[0];
e(Y).each(function(t) {
I.setSliderOffset(e(Y)[t], _ + K), t < R.length && (R[t] = -1 * _), _ += W[t];
}), nt -= -1 * R[0], $[c] = -1 * R[0] + K, C[c] = $[c] + y - N, T[c] = 0;
} else {
var k = 0, L = I.getSliderOffset(e(Y[0]), "x");
e(Y).each(function(e) {
I.getSliderOffset(this, "x") < L && (L = I.getSliderOffset(this, "x"), k = e);
});
var D = $[c] + y;
I.setSliderOffset(e(Y)[k], D), $[c] = -1 * R[1] + K, C[c] = $[c] + y - N, R.splice(0, 1), 
R.splice(R.length, 0, -1 * D + K), T[c]++;
}
}
if (l >= -1 * $[c] || l >= 0) {
var y = e(at).width();
if (l >= 0) {
var _ = -1 * tt[0];
for (e(Y).each(function(t) {
I.setSliderOffset(e(Y)[t], _ + K), t < R.length && (R[t] = -1 * _), _ += W[t];
}), nt += -1 * R[0], $[c] = -1 * R[0] + K, C[c] = $[c] + y - N, T[c] = st; -1 * R[0] - y + K > 0; ) {
var A = 0, H = I.getSliderOffset(e(Y[0]), "x");
e(Y).each(function(e) {
I.getSliderOffset(this, "x") > H && (H = I.getSliderOffset(this, "x"), A = e);
});
var D = $[c] - W[A];
I.setSliderOffset(e(Y)[A], D), R.splice(0, 0, -1 * D + K), R.splice(R.length - 1, 1), 
$[c] = -1 * R[0] + K, C[c] = $[c] + y - N, T[c]--, S[c]++;
}
} else {
var A = 0, H = I.getSliderOffset(e(Y[0]), "x");
e(Y).each(function(e) {
I.getSliderOffset(this, "x") > H && (H = I.getSliderOffset(this, "x"), A = e);
});
var D = $[c] - W[A];
I.setSliderOffset(e(Y)[A], D), R.splice(0, 0, -1 * D + K), R.splice(R.length - 1, 1), 
$[c] = -1 * R[0] + K, C[c] = $[c] + y - N, T[c]--;
}
}
} else {
var y = e(at).width();
l > -1 * $[c] + K && (i = ($[c] + -1 * (nt - h - eventX + w) * m - h) * f * -1 / m), 
l < -1 * C[c] && (i = (C[c] + b + -1 * (nt - h - eventX) * m - h) * f * -1 / m);
}
if (I.setSliderOffset(at, -1 * (nt - h - eventX - i) * m - h + b), g.scrollbar) {
I.showScrollbar(g, Q), r = Math.floor((nt - eventX - i - $[c] + w) / (C[c] - $[c] + K) * (B - z - O) * m);
var j = O;
0 >= r ? (j = O - P - -1 * r, I.setSliderOffset(e("." + Q), 0), e("." + Q).css({
width:j + "px"
})) :r >= B - z - P - O ? (j = B - z - P - r, I.setSliderOffset(e("." + Q), r), 
e("." + Q).css({
width:j + "px"
})) :I.setSliderOffset(e("." + Q), r);
}
"touchmove" == t.type && (F = t.touches[0].pageX);
var q = !1, U = I.calcActiveOffset(g, -1 * (nt - eventX - i), R, N, T[c], st, void 0, c), J = (U + T[c] + st) % st;
if (g.infiniteSlider ? J != x[c] && (q = !0) :U != S[c] && (q = !0), q) {
S[c] = U, x[c] = J, yt = !0;
var s = new I.args("change", g, at, e(at).children(":eq(" + J + ")"), J, J);
e(X).data("args", s), "" != g.onSlideChange && g.onSlideChange(s), I.updateBackfaceVisibility(Y, c, st, g);
}
}
});
var At = e(window);
if (d || u) var At = e(document);
e(Dt).bind("touchcancel.iosSliderEvent touchend.iosSliderEvent", function(e) {
var e = e.originalEvent;
if (Lt) return !1;
if (Lt = !0, M[c] || gt) return !0;
if (Ot) return !0;
if (0 != e.touches.length) for (var t = 0; t < e.touches.length; t++) e.touches[t].pageX == F && I.slowScrollHorizontal(at, Y, h, Q, o, n, O, N, B, z, P, tt, R, W, c, U, st, ht, yt, K, g); else I.slowScrollHorizontal(at, Y, h, Q, o, n, O, N, B, z, P, tt, R, W, c, U, st, ht, yt, K, g);
return bt = !1, It = !1, !0;
}), e(At).bind("mouseup.iosSliderEvent-" + c, function() {
if (lt ? ft.unbind("click.disableClick").bind("click.disableClick", I.preventClick) :ft.unbind("click.disableClick").bind("click.disableClick", I.enableClick), 
wt.each(function() {
this.onclick = function(t) {
return lt ? !1 :(e(this).data("onclick") && e(this).data("onclick").call(this, t || window.event), 
void 0);
}, this.onclick = e(this).data("onclick");
}), parseFloat(e().jquery) >= 1.8 ? vt.each(function() {
var t = e._data(this, "events");
if (void 0 != t && void 0 != t.click && "iosSliderEvent" != t.click[0].namespace) {
if (!lt) return !1;
e(this).one("click.disableClick", I.preventClick);
var o = e._data(this, "events").click, n = o.pop();
o.splice(0, 0, n);
}
}) :parseFloat(e().jquery) >= 1.6 && vt.each(function() {
var t = e(this).data("events");
if (void 0 != t && void 0 != t.click && "iosSliderEvent" != t.click[0].namespace) {
if (!lt) return !1;
e(this).one("click.disableClick", I.preventClick);
var o = e(this).data("events").click, n = o.pop();
o.splice(0, 0, n);
}
}), !_[c]) {
if (gt) return !0;
if (g.desktopClickDrag && e(at).css({
cursor:m
}), g.scrollbarDrag && e(v).css({
cursor:m
}), ut = !1, void 0 == dt) return !0;
I.slowScrollHorizontal(dt, Y, h, Q, o, n, O, N, B, z, P, tt, R, W, c, U, st, ht, yt, K, g), 
dt = void 0;
}
bt = !1, It = !1;
});
}
});
},
destroy:function(t, o) {
return void 0 == o && (o = this), e(o).each(function() {
var o = e(this), n = o.data("iosslider");
if (void 0 == n) return !1;
void 0 == t && (t = !0), I.autoSlidePause(n.sliderNumber), _[n.sliderNumber] = !0, 
e(window).unbind(".iosSliderEvent-" + n.sliderNumber), e(document).unbind(".iosSliderEvent-" + n.sliderNumber), 
e(document).unbind("keydown.iosSliderEvent"), e(this).unbind(".iosSliderEvent"), 
e(this).children(":first-child").unbind(".iosSliderEvent"), e(this).children(":first-child").children().unbind(".iosSliderEvent"), 
e(n.settings.scrollbarBlockNode).unbind(".iosSliderEvent"), t && (e(this).attr("style", ""), 
e(this).children(":first-child").attr("style", ""), e(this).children(":first-child").children().attr("style", ""), 
e(n.settings.navSlideSelector).attr("style", ""), e(n.settings.navPrevSelector).attr("style", ""), 
e(n.settings.navNextSelector).attr("style", ""), e(n.settings.autoSlideToggleSelector).attr("style", ""), 
e(n.settings.unselectableSelector).attr("style", "")), n.settings.scrollbar && e(".scrollbarBlock" + n.sliderNumber).remove();
for (var i = k[n.sliderNumber], r = 0; r < i.length; r++) clearTimeout(i[r]);
o.removeData("iosslider"), o.removeData("args");
});
},
update:function(t) {
return void 0 == t && (t = this), e(t).each(function() {
var t = e(this), o = t.data("iosslider");
if (void 0 == o) return !1;
o.settings.startAtSlide = t.data("args").currentSlideNumber, L.destroy(!1, this), 
1 != o.numberOfSlides && o.settings.infiniteSlider && (o.settings.startAtSlide = (S[o.sliderNumber] + 1 + T[o.sliderNumber] + o.numberOfSlides) % o.numberOfSlides), 
L.init(o.settings, this);
var n = new I.args("update", o.settings, o.scrollerNode, e(o.scrollerNode).children(":eq(" + (o.settings.startAtSlide - 1) + ")"), o.settings.startAtSlide - 1, o.settings.startAtSlide - 1);
e(o.stageNode).data("args", n), "" != o.settings.onSliderUpdate && o.settings.onSliderUpdate(n);
});
},
addSlide:function(t, o) {
return this.each(function() {
var n = e(this), i = n.data("iosslider");
return void 0 == i ? !1 :(0 == e(i.scrollerNode).children().length ? (e(i.scrollerNode).append(t), 
n.data("args").currentSlideNumber = 1) :i.settings.infiniteSlider ? (1 == o ? e(i.scrollerNode).children(":eq(0)").before(t) :e(i.scrollerNode).children(":eq(" + (o - 2) + ")").after(t), 
T[i.sliderNumber] < -1 && S[i.sliderNumber]--, n.data("args").currentSlideNumber >= o && S[i.sliderNumber]++) :(o <= i.numberOfSlides ? e(i.scrollerNode).children(":eq(" + (o - 1) + ")").before(t) :e(i.scrollerNode).children(":eq(" + (o - 2) + ")").after(t), 
n.data("args").currentSlideNumber >= o && n.data("args").currentSlideNumber++), 
n.data("iosslider").numberOfSlides++, L.update(this), void 0);
});
},
removeSlide:function(t) {
return this.each(function() {
var o = e(this), n = o.data("iosslider");
return void 0 == n ? !1 :(e(n.scrollerNode).children(":eq(" + (t - 1) + ")").remove(), 
S[n.sliderNumber] > t - 1 && S[n.sliderNumber]--, o.data("iosslider").numberOfSlides--, 
L.update(this), void 0);
});
},
goToSlide:function(t, o) {
return void 0 == o && (o = this), e(o).each(function() {
var o = e(this), n = o.data("iosslider");
return void 0 == n || n.shortContent ? !1 :(t = t > n.childrenOffsets.length ? n.childrenOffsets.length - 1 :t - 1, 
I.changeSlide(t, e(n.scrollerNode), e(n.slideNodes), k[n.sliderNumber], n.scrollbarClass, n.scrollbarWidth, n.stageWidth, n.scrollbarStageWidth, n.scrollMargin, n.scrollBorder, n.originalOffsets, n.childrenOffsets, n.slideNodeOuterWidths, n.sliderNumber, n.infiniteSliderWidth, n.numberOfSlides, n.centeredSlideOffset, n.settings), 
void 0);
});
},
prevSlide:function() {
return this.each(function() {
var t = e(this), o = t.data("iosslider");
if (void 0 == o || o.shortContent) return !1;
var n = (S[o.sliderNumber] + T[o.sliderNumber] + o.numberOfSlides) % o.numberOfSlides;
(n > 0 || o.settings.infiniteSlider) && I.changeSlide(n - 1, e(o.scrollerNode), e(o.slideNodes), k[o.sliderNumber], o.scrollbarClass, o.scrollbarWidth, o.stageWidth, o.scrollbarStageWidth, o.scrollMargin, o.scrollBorder, o.originalOffsets, o.childrenOffsets, o.slideNodeOuterWidths, o.sliderNumber, o.infiniteSliderWidth, o.numberOfSlides, o.centeredSlideOffset, o.settings), 
S[o.sliderNumber] = n;
});
},
nextSlide:function() {
return this.each(function() {
var t = e(this), o = t.data("iosslider");
if (void 0 == o || o.shortContent) return !1;
var n = (S[o.sliderNumber] + T[o.sliderNumber] + o.numberOfSlides) % o.numberOfSlides;
(n < o.childrenOffsets.length - 1 || o.settings.infiniteSlider) && I.changeSlide(n + 1, e(o.scrollerNode), e(o.slideNodes), k[o.sliderNumber], o.scrollbarClass, o.scrollbarWidth, o.stageWidth, o.scrollbarStageWidth, o.scrollMargin, o.scrollBorder, o.originalOffsets, o.childrenOffsets, o.slideNodeOuterWidths, o.sliderNumber, o.infiniteSliderWidth, o.numberOfSlides, o.centeredSlideOffset, o.settings), 
S[o.sliderNumber] = n;
});
},
prevPage:function(t) {
return void 0 == t && (t = this), e(t).each(function() {
var t = e(this), o = t.data("iosslider");
if (void 0 == o) return !1;
var n = I.getSliderOffset(o.scrollerNode, "x") + o.stageWidth;
I.changeOffset(n, e(o.scrollerNode), e(o.slideNodes), k[o.sliderNumber], o.scrollbarClass, o.scrollbarWidth, o.stageWidth, o.scrollbarStageWidth, o.scrollMargin, o.scrollBorder, o.originalOffsets, o.childrenOffsets, o.slideNodeOuterWidths, o.sliderNumber, o.infiniteSliderWidth, o.numberOfSlides, o.centeredSlideOffset, o.settings);
});
},
nextPage:function(t) {
return void 0 == t && (t = this), e(t).each(function() {
var t = e(this), o = t.data("iosslider");
if (void 0 == o) return !1;
var n = I.getSliderOffset(o.scrollerNode, "x") - o.stageWidth;
I.changeOffset(n, e(o.scrollerNode), e(o.slideNodes), k[o.sliderNumber], o.scrollbarClass, o.scrollbarWidth, o.stageWidth, o.scrollbarStageWidth, o.scrollMargin, o.scrollBorder, o.originalOffsets, o.childrenOffsets, o.slideNodeOuterWidths, o.sliderNumber, o.infiniteSliderWidth, o.numberOfSlides, o.centeredSlideOffset, o.settings);
});
},
lock:function() {
return this.each(function() {
var t = e(this), o = t.data("iosslider");
return void 0 == o || o.shortContent ? !1 :(e(o.scrollerNode).css({
cursor:"default"
}), M[o.sliderNumber] = !0, void 0);
});
},
unlock:function() {
return this.each(function() {
var t = e(this), o = t.data("iosslider");
return void 0 == o || o.shortContent ? !1 :(e(o.scrollerNode).css({
cursor:m
}), M[o.sliderNumber] = !1, void 0);
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
return void 0 == o || o.shortContent ? !1 :(y[o.sliderNumber].autoSlide = !1, I.autoSlidePause(o.sliderNumber), 
o);
});
},
autoSlidePlay:function() {
return this.each(function() {
var t = e(this), o = t.data("iosslider");
return void 0 == o || o.shortContent ? !1 :(y[o.sliderNumber].autoSlide = !0, I.autoSlide(e(o.scrollerNode), e(o.slideNodes), k[o.sliderNumber], o.scrollbarClass, o.scrollbarWidth, o.stageWidth, o.scrollbarStageWidth, o.scrollMargin, o.scrollBorder, o.originalOffsets, o.childrenOffsets, o.slideNodeOuterWidths, o.sliderNumber, o.infiniteSliderWidth, o.numberOfSlides, o.centeredSlideOffset, o.settings), 
o);
});
}
};
e.fn.iosSlider = function(t) {
return L[t] ? L[t].apply(this, Array.prototype.slice.call(arguments, 1)) :"object" != typeof t && t ? (e.error("invalid method call!"), 
void 0) :L.init.apply(this, arguments);
};
}(jQuery);