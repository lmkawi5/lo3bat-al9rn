/* Emoji Secret - Stage 6: interactive Avatar Creator.
   Needs avatar-art.js, community.js (window.ESUI), auth-api.js. Premium parts are Store items; ownership and the
   final check are enforced by the database (save_avatar / buy_item). All text uses textContent. */
(function () {
  "use strict";
  var A = window.ESAuth, U = window.ESUI, ART = window.ESAvatarArt;
  if (!A || !A.call || !U || !ART) return;
  var h = U.h;

  var S = {
    en: {
      title: "Avatar creator", save: "Save avatar", random: "Randomize", reset: "Reset", close: "Close",
      c_bg: "Background", c_skin: "Skin", c_hs: "Hair", c_hc: "Hair color", c_eyes: "Eyes", c_mouth: "Mouth", c_extra: "Extras", c_hat: "Hats",
      saved: "Avatar saved!", loginTo: "Log in to create your avatar.", locked: "Locked · {p} 🪙", yourCoins: "Your coins",
      buyAsk: "Unlock “{n}” for {p} coins?", unlocked: "Unlocked: {n}", loading: "Loading…", none: "None",
      err_locked_part: "You need to unlock this part in the Store first.", err_invalid_avatar: "This avatar cannot be saved.",
      err_insufficient_coins: "Not enough coins. Solve or publish puzzles to earn more.", err_already_owned: "You already own this part.",
      err_network: "No connection. Please try again.", err_server: "Something went wrong. Please try again.",
      err_invalid_session: "Your session expired. Please log in again.", err_not_found: "Item not found."
    },
    ar: {
      title: "منشئ الصورة الرمزية", save: "حفظ الصورة", random: "عشوائي", reset: "إعادة الضبط", close: "إغلاق",
      c_bg: "الخلفية", c_skin: "البشرة", c_hs: "الشعر", c_hc: "لون الشعر", c_eyes: "العيون", c_mouth: "الفم", c_extra: "إضافات", c_hat: "القبعات",
      saved: "تم حفظ الصورة!", loginTo: "سجّل الدخول لإنشاء صورتك الرمزية.", locked: "مقفل · {p} 🪙", yourCoins: "عملاتك",
      buyAsk: "فتح «{n}» مقابل {p} عملة؟", unlocked: "تم فتح: {n}", loading: "جارٍ التحميل…", none: "بدون",
      err_locked_part: "عليك فتح هذا العنصر من المتجر أولاً.", err_invalid_avatar: "لا يمكن حفظ هذه الصورة.",
      err_insufficient_coins: "لا تملك عملات كافية. حلّ الألغاز أو انشرها لتكسب المزيد.", err_already_owned: "تملك هذا العنصر بالفعل.",
      err_network: "لا يوجد اتصال. حاول مرة أخرى.", err_server: "حدث خطأ. حاول مرة أخرى.",
      err_invalid_session: "انتهت الجلسة. يرجى تسجيل الدخول مرة أخرى.", err_not_found: "العنصر غير موجود."
    },
    fr: {
      title: "Créateur d'avatar", save: "Enregistrer l'avatar", random: "Aléatoire", reset: "Réinitialiser", close: "Fermer",
      c_bg: "Fond", c_skin: "Peau", c_hs: "Cheveux", c_hc: "Couleur", c_eyes: "Yeux", c_mouth: "Bouche", c_extra: "Extras", c_hat: "Chapeaux",
      saved: "Avatar enregistré !", loginTo: "Connectez-vous pour créer votre avatar.", locked: "Verrouillé · {p} 🪙", yourCoins: "Vos pièces",
      buyAsk: "Débloquer « {n} » pour {p} pièces ?", unlocked: "Débloqué : {n}", loading: "Chargement…", none: "Aucun",
      err_locked_part: "Débloquez d'abord cet élément dans la boutique.", err_invalid_avatar: "Cet avatar ne peut pas être enregistré.",
      err_insufficient_coins: "Pas assez de pièces. Résolvez ou publiez des énigmes pour en gagner.", err_already_owned: "Vous possédez déjà cet élément.",
      err_network: "Pas de connexion. Réessayez.", err_server: "Une erreur est survenue. Réessayez.",
      err_invalid_session: "Votre session a expiré. Reconnectez-vous.", err_not_found: "Élément introuvable."
    }
  };
  var NAMES = {
    avatar_bg_galaxy: { en: "Galaxy Background", ar: "خلفية المجرة", fr: "Fond galaxie" },
    avatar_bg_sunset: { en: "Sunset Background", ar: "خلفية الغروب", fr: "Fond coucher de soleil" },
    avatar_extra_sunglasses: { en: "Sunglasses", ar: "نظارة شمسية", fr: "Lunettes de soleil" },
    avatar_extra_monocle: { en: "Monocle", ar: "نظارة أحادية", fr: "Monocle" },
    avatar_hat_crown: { en: "Golden Crown", ar: "تاج ذهبي", fr: "Couronne dorée" },
    avatar_hat_wizard: { en: "Wizard Hat", ar: "قبعة الساحر", fr: "Chapeau de magicien" }
  };
  function t(k, v) {
    var l = U.lang(), s = (S[l] && S[l][k] !== undefined) ? S[l][k] : S.en[k];
    if (s === undefined) return k;
    if (v) for (var x in v) s = s.split("{" + x + "}").join(String(v[x]));
    return s;
  }
  function err(c) { var k = "err_" + c; return S.en[k] ? t(k) : t("err_server"); }
  function pname(slug) { var n = NAMES[slug], l = U.lang(); return n ? (n[l] || n.en) : slug; }
  function reqId() { try { return crypto.randomUUID(); } catch (e) { return String(Date.now()) + Math.random().toString(16).slice(2); } }

  var overlay = null, st = null;

  function close() {
    if (overlay) { overlay.remove(); overlay = null; }
    if (!document.querySelector(".acct-overlay")) document.body.style.overflow = "";
  }
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && overlay) close(); });

  function slugFor(slot, v) { return (ART.PREMIUM[slot] || {})[v] || null; }
  function isLocked(slot, v) { var s = slugFor(slot, v); return !!s && !st.owned[s]; }
  function code() { return ART.stringify(st.sel); }

  function rpc(name, args) {
    args = args || {}; args.p_session_token = A.getToken();
    return A.call(name, args).then(function (r) {
      if (!r || !r.ok) { var c = r && r.error ? r.error : "network"; if (c === "invalid_session") U.sessionLost(); return { ok: false, error: c }; }
      return r;
    });
  }

  function loadOwned() {
    rpc("get_store", {}).then(function (r) {
      if (!r.ok || !st) return;
      st.coins = r.coins;
      (r.items || []).forEach(function (i) { if (i.type === "avatar") { st.owned[i.slug] = !!i.owned; st.price[i.slug] = i.price; } });
      render();
    });
  }

  function choose(slot, v) {
    var i = ART.KEYS.indexOf(slot);
    if (isLocked(slot, v)) {
      var slug = slugFor(slot, v), price = st.price[slug];
      if (price == null) { U.toast(t("loading")); return; }
      if (!window.confirm(t("buyAsk", { n: pname(slug), p: price }))) return;
      if (st.busy) return; st.busy = true;
      rpc("buy_item", { p_slug: slug, p_quantity: 1, p_request_id: reqId() }).then(function (r) {
        st.busy = false;
        if (!r.ok) { U.toast(err(r.error)); loadOwned(); return; }
        if (r.profile) A.setProfile(r.profile);
        st.owned[slug] = true; st.sel[i] = v; U.toast(t("unlocked", { n: pname(slug) })); loadOwned(); render();
      });
      return;
    }
    st.sel[i] = v; render();
  }

  function randomize() {
    st.sel = ART.KEYS.map(function (k) {
      var ok = []; for (var v = 0; v < ART.COUNTS[k]; v++) if (!isLocked(k, v)) ok.push(v);
      return ok[Math.floor(Math.random() * ok.length)];
    });
    render();
  }

  function render() {
    if (!overlay || !st) return;
    var slot = ART.KEYS[st.cat];
    var preview = h("div", { class: "av-preview" }); preview.append(ART.render(st.sel));
    var tabs = h("div", { class: "chips cm-chips av-tabs" }, ART.KEYS.map(function (k, i) {
      return h("button", { class: "chip" + (i === st.cat ? " on" : ""), type: "button", onclick: function () { st.cat = i; render(); } }, t("c_" + k));
    }));
    var opts = [];
    for (var v = 0; v < ART.COUNTS[slot]; v++) (function (v) {
      var trial = st.sel.slice(); trial[st.cat] = v;
      var thumb = h("span", { class: "av-thumb" }); thumb.append(ART.render(trial));
      var locked = isLocked(slot, v), slug = slugFor(slot, v);
      opts.push(h("button", { class: "av-opt" + (st.sel[st.cat] === v ? " on" : "") + (locked ? " locked" : ""), type: "button",
        "aria-pressed": st.sel[st.cat] === v ? "true" : "false", "aria-label": slug ? pname(slug) : String(v + 1),
        onclick: function () { choose(slot, v); } },
        thumb, locked ? h("span", { class: "av-lock" }, st.price[slug] != null ? "🔒 " + st.price[slug] : "🔒") : null));
    })(v);
    var saveBtn = h("button", { class: "primary-btn full-btn", type: "button", onclick: save }, "💾 " + t("save"));
    overlay.querySelector(".av-body").replaceChildren(
      preview, tabs, h("div", { class: "av-grid" }, opts),
      h("div", { class: "game-tools av-tools" },
        h("button", { class: "soft-btn", type: "button", onclick: randomize }, "🎲 " + t("random")),
        h("button", { class: "soft-btn", type: "button", onclick: function () { st.sel = (st.start || ART.DEFAULT).slice(); render(); } }, "↺ " + t("reset"))),
      saveBtn,
      st.coins != null ? h("small", { class: "st-coins" }, t("yourCoins") + ": 🪙 " + st.coins) : null);
  }

  function save() {
    if (st.busy) return; st.busy = true;
    var c = code();
    rpc("save_avatar", { p_code: c }).then(function (r) {
      st.busy = false;
      if (!r.ok) { U.toast(err(r.error)); loadOwned(); return; }
      if (r.profile) A.setProfile(r.profile);
      U.toast(t("saved"));
      var cb = st.onSaved; close();
      if (cb) cb(c);
    });
  }

  function open(opts) {
    if (!A.isLoggedIn()) { A.open("login"); return; }
    close();
    var p = A.getProfile(), cur = ART.parse(p && p.avatar_url);
    st = { sel: (cur || ART.DEFAULT).slice(), start: cur, cat: 0, owned: {}, price: {}, coins: null, busy: false, onSaved: opts && opts.onSaved };
    overlay = h("div", { class: "acct-overlay", role: "dialog", "aria-modal": "true", "aria-label": t("title"),
      onclick: function (e) { if (e.target === overlay) close(); } },
      h("div", { class: "game-card acct-card" },
        h("button", { class: "acct-close", type: "button", "aria-label": t("close"), onclick: close }, "✕"),
        h("h2", { class: "acct-title" }, "🎨 " + t("title")),
        h("div", { class: "av-body" })));
    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";
    render(); loadOwned();
  }

  var langSel = document.getElementById("language");
  if (langSel) langSel.addEventListener("change", function () { if (overlay) render(); });
  window.ESAvatarCreator = { open: open };
})();
