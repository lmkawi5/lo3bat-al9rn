/* Emoji Secret - Stage 6: avatar renderer. Pure drawing code, no network and no dependencies.
   An avatar is a short code "es1:bg.skin.hair.hairColor.eyes.mouth.extra.hat" (8 small numbers, ~25 characters).
   It is drawn as a small inline SVG built with createElementNS (never innerHTML).
   KEEP THE COUNTS BELOW IN SYNC with database/stage-6-avatar.sql (save_avatar). */
(function () {
  "use strict";
  var NS = "http://www.w3.org/2000/svg", uid = 0;

  var KEYS = ["bg", "skin", "hs", "hc", "eyes", "mouth", "extra", "hat"];
  var COUNTS = { bg: 8, skin: 6, hs: 8, hc: 8, eyes: 6, mouth: 6, extra: 6, hat: 5 };
  var DEFAULT = [0, 1, 1, 0, 0, 0, 0, 0];
  // parts that must be bought in the Store: slot -> value -> store item slug
  var PREMIUM = {
    bg: { 6: "avatar_bg_galaxy", 7: "avatar_bg_sunset" },
    extra: { 4: "avatar_extra_sunglasses", 5: "avatar_extra_monocle" },
    hat: { 3: "avatar_hat_crown", 4: "avatar_hat_wizard" }
  };

  var SKIN = ["#ffdbb4", "#f1c27d", "#e0ac69", "#c68642", "#8d5524", "#5c3a21"];
  var HAIR = ["#2b1b12", "#5a3825", "#b5651d", "#e6c15a", "#c0392b", "#7c3aed", "#ec4899", "#e5e7eb"];
  var BG = [
    ["#8b5cf6", "#d946ef"], ["#3b82f6", "#06b6d4"], ["#10b981", "#84cc16"], ["#f97316", "#f43f5e"],
    ["#1e1b4b", "#4c1d95"], ["#ec4899", "#f9a8d4"],
    ["#0f0c29", "#302b63", "#6d28d9"],               // 6 galaxy (premium)
    ["#f43f5e", "#f59e0b", "#facc15"]                // 7 sunset (premium)
  ];
  var INK = "#1f1235", LIPS = "#7f1d1d";

  function el(name, attrs, kids) {
    var e = document.createElementNS(NS, name);
    if (attrs) for (var k in attrs) if (attrs[k] !== undefined && attrs[k] !== null) e.setAttribute(k, attrs[k]);
    if (kids) kids.forEach(function (c) { if (c) e.appendChild(c); });
    return e;
  }
  function path(d, attrs) { var a = { d: d }; for (var k in attrs) a[k] = attrs[k]; return el("path", a); }
  function circle(cx, cy, r, fill, extra) { var a = { cx: cx, cy: cy, r: r, fill: fill }; for (var k in extra) a[k] = extra[k]; return el("circle", a); }

  function parse(code) {
    if (typeof code !== "string" || !/^es1:\d{1,2}(\.\d{1,2}){7}$/.test(code)) return null;
    var a = code.slice(4).split(".").map(Number);
    for (var i = 0; i < 8; i++) if (a[i] >= COUNTS[KEYS[i]]) return null;
    return a;
  }
  function stringify(a) { return "es1:" + a.join("."); }

  /* ---- drawing layers ---- */
  function hairFront(style, c) {
    switch (style) {
      case 1: return path("M26 46 C24 24 40 18 50 18 C60 18 76 24 74 46 C70 36 62 31 50 31 C38 31 30 36 26 46Z", { fill: c });
      case 2: return path("M26 48 C22 24 42 16 56 19 C70 22 77 34 74 48 C70 38 60 32 46 33 C36 34 30 40 26 48Z", { fill: c });
      case 3: return el("g", { fill: c }, [circle(30, 38, 9), circle(41, 29, 9), circle(54, 27, 9), circle(66, 33, 9), circle(72, 45, 7), circle(27, 48, 7)]);
      case 4: return path("M28 44 C32 26 68 26 72 44 C64 35 36 35 28 44Z", { fill: c });
      case 5: return path("M28 42 C30 27 70 27 72 42 C66 34 34 34 28 42Z", { fill: c, opacity: ".85" });
      case 6: return el("g", { fill: c }, [circle(50, 17, 8), path("M27 45 C27 28 73 28 73 45 C68 36 60 33 50 33 C40 33 32 36 27 45Z")]);
      case 7: return path("M26 46 L27 26 L36 34 L42 17 L50 32 L58 17 L64 34 L73 26 L74 46 C68 36 60 33 50 33 C40 33 32 36 26 46Z", { fill: c });
      default: return null;     // 0 = no hair
    }
  }
  function eyes(kind) {
    var L = 39, R = 61, y = 51, st = { fill: "none", stroke: INK, "stroke-width": "2.4", "stroke-linecap": "round" };
    switch (kind) {
      case 1: return el("g", null, [el("ellipse", { cx: L, cy: y, rx: 5, ry: 5.6, fill: "#fff" }), el("ellipse", { cx: R, cy: y, rx: 5, ry: 5.6, fill: "#fff" }), circle(L + 1, y + 1, 2.6, INK), circle(R + 1, y + 1, 2.6, INK)]);
      case 2: return el("g", null, [path("M34 52 Q39 45 44 52", st), path("M56 52 Q61 45 66 52", st)]);
      case 3: return el("g", null, [path("M34 51 L44 51", st), path("M56 51 L66 51", st)]);
      case 4: return el("g", { fill: "#facc15", stroke: INK, "stroke-width": "1" }, [
        path("M39 44 L41 49 L46 49.5 L42 53 L43.5 58 L39 55 L34.5 58 L36 53 L32 49.5 L37 49Z", {}),
        path("M61 44 L63 49 L68 49.5 L64 53 L65.5 58 L61 55 L56.5 58 L58 53 L54 49.5 L59 49Z", {})]);
      case 5: return el("g", null, [circle(L, y, 2.8, INK), path("M56 52 Q61 45 66 52", st)]);
      default: return el("g", { fill: INK }, [circle(L, y, 3), circle(R, y, 3)]);
    }
  }
  function mouth(kind) {
    var st = { fill: "none", stroke: LIPS, "stroke-width": "2.6", "stroke-linecap": "round", "stroke-linejoin": "round" };
    switch (kind) {
      case 1: return path("M40 63 Q50 76 60 63Z", { fill: "#fff", stroke: LIPS, "stroke-width": "2", "stroke-linejoin": "round" });
      case 2: return el("ellipse", { cx: 50, cy: 66, rx: 5, ry: 6, fill: "#7f1d1d" });
      case 3: return path("M43 66 L57 66", st);
      case 4: return el("g", null, [path("M42 63 Q50 72 58 63", st), el("ellipse", { cx: 50, cy: 69.5, rx: 4, ry: 3, fill: "#f472b6" })]);
      case 5: return path("M41 64 Q45.5 70 50 64 Q54.5 70 59 64", st);
      default: return path("M41 63 Q50 72 59 63", st);
    }
  }
  function extra(kind) {
    switch (kind) {
      case 1: return el("g", { fill: "none", stroke: INK, "stroke-width": "2" }, [circle(39, 51, 8, "none"), circle(61, 51, 8, "none"), path("M47 51 L53 51", {})]);
      case 2: return el("g", { fill: "#f472b6", opacity: ".45" }, [circle(32, 60, 5), circle(68, 60, 5)]);
      case 3: return el("g", { fill: "#8d5524", opacity: ".6" }, [circle(34, 59, 1), circle(38, 61, 1), circle(36, 63, 1), circle(62, 61, 1), circle(66, 59, 1), circle(64, 63, 1)]);
      case 4: return el("g", { fill: "#111827" }, [el("rect", { x: 29, y: 45, width: 18, height: 12, rx: 5 }), el("rect", { x: 53, y: 45, width: 18, height: 12, rx: 5 }),
        el("rect", { x: 47, y: 48, width: 6, height: 2.5 }), path("M33 48 L40 48", { stroke: "#fff", "stroke-width": "1.5", opacity: ".6" })]);
      case 5: return el("g", { fill: "none", stroke: "#facc15", "stroke-width": "2.2" }, [circle(61, 51, 8.5, "none"), path("M69 56 Q74 68 70 80", { "stroke-width": "1.2" })]);
      default: return null;
    }
  }
  function hat(kind) {
    switch (kind) {
      case 1: return el("g", null, [path("M27 40 C27 17 73 17 73 40 Z", { fill: "#7c3aed" }), path("M50 38 L84 38 C84 45 62 46 50 42Z", { fill: "#5b21b6" }), circle(50, 21, 2.5, "#e9d5ff")]);
      case 2: return el("g", null, [path("M50 2 L35 32 L65 32Z", { fill: "#f59e0b" }), circle(46, 20, 2.2, "#fff"), circle(54, 25, 2.2, "#fff"), circle(50, 10, 2.2, "#fff"), circle(50, 3, 3, "#f43f5e")]);
      case 3: return el("g", null, [path("M31 32 L31 12 L41 22 L50 8 L59 22 L69 12 L69 32Z", { fill: "#facc15", stroke: "#ca8a04", "stroke-width": "1.5", "stroke-linejoin": "round" }), circle(50, 25, 2.4, "#ef4444"), circle(38, 26, 1.8, "#3b82f6"), circle(62, 26, 1.8, "#3b82f6")]);
      case 4: return el("g", null, [path("M50 -2 L31 33 Q50 39 69 33Z", { fill: "#4c1d95" }), el("ellipse", { cx: 50, cy: 33, rx: 27, ry: 5, fill: "#5b21b6" }), circle(46, 18, 2.6, "#facc15"), circle(55, 26, 1.8, "#facc15")]);
      default: return null;
    }
  }

  function draw(a) {
    var gid = "esg" + (++uid), bg = BG[a[0]], skin = SKIN[a[1]], hc = HAIR[a[3]];
    var stops = bg.map(function (c, i) { return el("stop", { offset: (bg.length === 1 ? 0 : i / (bg.length - 1)), "stop-color": c }); });
    var svg = el("svg", { viewBox: "0 0 100 100", width: "100%", height: "100%", "aria-hidden": "true", focusable: "false" }, [
      el("defs", null, [el("linearGradient", { id: gid, x1: 0, y1: 0, x2: 1, y2: 1 }, stops)]),
      el("rect", { width: 100, height: 100, fill: "url(#" + gid + ")" })
    ]);
    if (a[0] === 6) [[18, 20, 1.2], [78, 14, 1], [88, 40, 1.4], [12, 58, 1], [70, 8, .8], [30, 10, .9], [90, 70, 1]].forEach(function (s) { svg.appendChild(circle(s[0], s[1], s[2], "#fff", { opacity: ".85" })); });
    if (a[2] === 4) svg.appendChild(path("M24 44 C20 18 80 18 76 44 L81 88 L19 88Z", { fill: hc }));         // long hair behind
    svg.appendChild(path("M14 100 C16 80 32 75 50 75 C68 75 84 80 86 100Z", { fill: "#5b21b6" }));            // shoulders
    svg.appendChild(el("rect", { x: 42, y: 66, width: 16, height: 14, rx: 5, fill: skin }));                      // neck
    svg.appendChild(el("rect", { x: 42, y: 66, width: 16, height: 14, rx: 5, fill: "#000", opacity: ".12" }));
    svg.appendChild(circle(26.5, 53, 4.2, skin, {}));
    svg.appendChild(circle(73.5, 53, 4.2, skin, {}));
    svg.appendChild(el("ellipse", { cx: 50, cy: 52, rx: 24, ry: 26, fill: skin }));
    var hf = hairFront(a[2], hc); if (hf) svg.appendChild(hf);
    svg.appendChild(eyes(a[4]));
    svg.appendChild(mouth(a[5]));
    var ex = extra(a[6]); if (ex) svg.appendChild(ex);
    var ht = hat(a[7]); if (ht) svg.appendChild(ht);
    return svg;
  }

  window.ESAvatarArt = {
    KEYS: KEYS, COUNTS: COUNTS, DEFAULT: DEFAULT, PREMIUM: PREMIUM,
    isCode: function (v) { return !!parse(v); },
    parse: parse, stringify: stringify,
    render: function (code) { var a = Array.isArray(code) ? code : (parse(code) || DEFAULT); return draw(a); }
  };
})();
