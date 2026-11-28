/* Emoji Secret - Stage 5: Virtual Store (virtual coins only) + in-puzzle "Helps" panel + profile decorations.
   Needs community.js (window.ESUI) and auth-api.js. Prices, ownership, stock and every rule are enforced by the
   database (SECURITY DEFINER RPCs); this file only displays state and calls the RPCs. All text uses textContent. */
(function () {
  "use strict";
  var A = window.ESAuth, U = window.ESUI;
  if (!A || !A.call || !U) return;
  var h = U.h;

  /* ---------------- translations ---------------- */
  var S = {
    en: {
      title: "Store", btnAria: "Store", mainStore: "Store", mainNoHelp: "No hints available for this puzzle.", dpName: "Double Points", dpHow: "Your next win gives double points.", dpBuy: "Buy · {p} 🪙", dpOwned: "Activate ({n})", mainDouble: "⚡×2 Double Points!", coins: "coins", tHelps: "Hints & boosts", tStyle: "Style", tMine: "My items",
      rulesTitle: "How it works",
      r1: "Items are bought with coins you earn by solving and publishing puzzles. No real money, ever.",
      r2: "Hints never change your reward. Revealing the answer means that puzzle gives you no reward.",
      r3: "Use hints from the 🧰 Helps button on a puzzle in the Community. Older puzzles may not support hints.",
      r4: "Purchases are final.",
      buy: "Buy", owned: "Owned", inStock: "In stock: {n}", equip: "Equip", unequip: "Unequip", equipped: "Equipped ✓",
      activate: "Activate", active: "⚡ Active: your next win gives double points", needLogin: "Log in to buy items.", loginBtn: "Log in",
      buyAsk: "Buy “{n}” for {p} coins?", bought: "Bought: {n}", equippedOk: "Equipped.", unequippedOk: "Removed.", activatedOk: "Double Points activated!",
      mineEmpty: "You have no items yet.", mineStock: "Hints & boosts", mineStyle: "Style items", useInPuzzle: "Use it from 🧰 Helps inside a puzzle.",
      loading: "Loading…", retry: "Try again",
      helps: "Helps", helpsFor: "Puzzle helps", use: "Use", useN: "Use ({n} left)", buyUse: "Buy & use · {p} 🪙", usedTag: "✓ Unlocked",
      attemptsOn: "✓ +3 attempts active", unavailable: "Not available for this puzzle (published before the store opened).",
      revealAsk: "Reveal the answer? You will not be able to earn a reward on this puzzle.",
      revealedNote: "Answer revealed. This puzzle will not give you a reward.", yourCoins: "Your coins",
      kHint: "Hint", kBoost: "Booster", kReveal: "Reveal", kFrame: "Frame", kBadge: "Badge", kTitle: "Title",
      frameDesc: "An avatar frame shown on your profile, in the feed and in rankings.",
      badgeDesc: "A badge shown next to your name.", titleDesc: "A title shown under your name on your profile.",
      err_insufficient_coins: "Not enough coins. Solve or publish puzzles to earn more.", err_already_owned: "You already own this item.",
      err_inventory_full: "You cannot hold more than 99 of this item.", err_not_owned: "You do not have this item.",
      err_booster_active: "A Double Points boost is already active.", err_unavailable: "Not available for this puzzle.",
      err_own_puzzle: "You cannot use items on your own puzzle.", err_closed: "This puzzle is closed.",
      err_puzzle_not_open: "This puzzle is already solved.", err_already_solved: "You already solved this puzzle.",
      err_not_found: "Item or puzzle not found.", err_network: "No connection. Please try again.",
      err_server: "Something went wrong. Please try again.", err_invalid_session: "Your session expired. Please log in again."
    },
    ar: {
      title: "المتجر", btnAria: "المتجر", mainStore: "المتجر", mainNoHelp: "لا توجد تلميحات متاحة لهذا اللغز.", dpName: "نقاط مضاعفة", dpHow: "فوزك القادم يمنح نقاطاً مضاعفة.", dpBuy: "شراء · {p} 🪙", dpOwned: "تشغيل ({n})", mainDouble: "⚡×2 نقاط مضاعفة!", coins: "عملة", tHelps: "تلميحات ودعم", tStyle: "الشكل", tMine: "أغراضي",
      rulesTitle: "كيف يعمل؟",
      r1: "تُشترى الأغراض بالعملات التي تكسبها من حل الألغاز ونشرها. لا مال حقيقي أبداً.",
      r2: "التلميحات لا تغيّر مكافأتك. أما إظهار الجواب فيعني أن اللغز لن يمنحك أي مكافأة.",
      r3: "استعمل التلميحات من زر 🧰 المساعدات داخل اللغز في المجتمع. قد لا تدعم الألغاز القديمة التلميحات.",
      r4: "المشتريات نهائية.",
      buy: "شراء", owned: "مملوك", inStock: "المخزون: {n}", equip: "تفعيل", unequip: "إزالة", equipped: "مُفعَّل ✓",
      activate: "تشغيل", active: "⚡ مُفعَّل: فوزك القادم يمنح نقاطاً مضاعفة", needLogin: "سجّل الدخول لشراء الأغراض.", loginBtn: "تسجيل الدخول",
      buyAsk: "شراء «{n}» مقابل {p} عملة؟", bought: "تم الشراء: {n}", equippedOk: "تم التفعيل.", unequippedOk: "تمت الإزالة.", activatedOk: "تم تشغيل النقاط المضاعفة!",
      mineEmpty: "ليس لديك أغراض بعد.", mineStock: "تلميحات ودعم", mineStyle: "أغراض الشكل", useInPuzzle: "استعملها من 🧰 المساعدات داخل اللغز.",
      loading: "جارٍ التحميل…", retry: "إعادة المحاولة",
      helps: "المساعدات", helpsFor: "مساعدات اللغز", use: "استعمال", useN: "استعمال (المتبقي {n})", buyUse: "شراء واستعمال · {p} 🪙", usedTag: "✓ تم فتحه",
      attemptsOn: "✓ +3 محاولات مفعّلة", unavailable: "غير متاح لهذا اللغز (نُشر قبل افتتاح المتجر).",
      revealAsk: "إظهار الجواب؟ لن تتمكن من كسب مكافأة على هذا اللغز.",
      revealedNote: "تم إظهار الجواب. هذا اللغز لن يمنحك مكافأة.", yourCoins: "عملاتك",
      kHint: "تلميح", kBoost: "دعم", kReveal: "إظهار", kFrame: "إطار", kBadge: "شارة", kTitle: "لقب",
      frameDesc: "إطار للصورة يظهر في ملفك والصفحة والترتيب.",
      badgeDesc: "شارة تظهر بجانب اسمك.", titleDesc: "لقب يظهر تحت اسمك في ملفك.",
      err_insufficient_coins: "لا تملك عملات كافية. حلّ الألغاز أو انشرها لتكسب المزيد.", err_already_owned: "تملك هذا الغرض بالفعل.",
      err_inventory_full: "لا يمكنك امتلاك أكثر من 99 من هذا الغرض.", err_not_owned: "لا تملك هذا الغرض.",
      err_booster_active: "تعزيز النقاط المضاعفة مفعّل بالفعل.", err_unavailable: "غير متاح لهذا اللغز.",
      err_own_puzzle: "لا يمكنك استعمال الأغراض على لغزك.", err_closed: "هذا اللغز مغلق.",
      err_puzzle_not_open: "تم حل هذا اللغز بالفعل.", err_already_solved: "لقد حللت هذا اللغز بالفعل.",
      err_not_found: "الغرض أو اللغز غير موجود.", err_network: "لا يوجد اتصال. حاول مرة أخرى.",
      err_server: "حدث خطأ. حاول مرة أخرى.", err_invalid_session: "انتهت الجلسة. يرجى تسجيل الدخول مرة أخرى."
    },
    fr: {
      title: "Boutique", btnAria: "Boutique", mainStore: "Boutique", mainNoHelp: "Aucun indice disponible pour cette énigme.", dpName: "Points doublés", dpHow: "Votre prochaine victoire donne le double de points.", dpBuy: "Acheter · {p} 🪙", dpOwned: "Activer ({n})", mainDouble: "⚡×2 Points doublés !", coins: "pièces", tHelps: "Indices & boosts", tStyle: "Style", tMine: "Mes objets",
      rulesTitle: "Comment ça marche",
      r1: "Les objets s'achètent avec les pièces gagnées en résolvant et publiant des énigmes. Jamais d'argent réel.",
      r2: "Les indices ne changent pas votre récompense. Révéler la réponse supprime la récompense de cette énigme.",
      r3: "Utilisez les indices avec le bouton 🧰 Aides d'une énigme de la Communauté. Les anciennes énigmes peuvent ne pas les gérer.",
      r4: "Les achats sont définitifs.",
      buy: "Acheter", owned: "Possédé", inStock: "En stock : {n}", equip: "Équiper", unequip: "Retirer", equipped: "Équipé ✓",
      activate: "Activer", active: "⚡ Actif : votre prochaine victoire donne le double de points", needLogin: "Connectez-vous pour acheter.", loginBtn: "Se connecter",
      buyAsk: "Acheter « {n} » pour {p} pièces ?", bought: "Acheté : {n}", equippedOk: "Équipé.", unequippedOk: "Retiré.", activatedOk: "Points doublés activés !",
      mineEmpty: "Vous n'avez pas encore d'objets.", mineStock: "Indices & boosts", mineStyle: "Objets de style", useInPuzzle: "À utiliser depuis 🧰 Aides dans une énigme.",
      loading: "Chargement…", retry: "Réessayer",
      helps: "Aides", helpsFor: "Aides de l'énigme", use: "Utiliser", useN: "Utiliser ({n} restant)", buyUse: "Acheter et utiliser · {p} 🪙", usedTag: "✓ Débloqué",
      attemptsOn: "✓ +3 tentatives actives", unavailable: "Indisponible pour cette énigme (publiée avant l'ouverture de la boutique).",
      revealAsk: "Révéler la réponse ? Vous ne pourrez pas gagner de récompense sur cette énigme.",
      revealedNote: "Réponse révélée. Cette énigme ne donnera pas de récompense.", yourCoins: "Vos pièces",
      kHint: "Indice", kBoost: "Boost", kReveal: "Révélation", kFrame: "Cadre", kBadge: "Badge", kTitle: "Titre",
      frameDesc: "Un cadre d'avatar visible sur votre profil, le fil et les classements.",
      badgeDesc: "Un badge affiché à côté de votre nom.", titleDesc: "Un titre affiché sous votre nom sur votre profil.",
      err_insufficient_coins: "Pas assez de pièces. Résolvez ou publiez des énigmes pour en gagner.", err_already_owned: "Vous possédez déjà cet objet.",
      err_inventory_full: "Vous ne pouvez pas avoir plus de 99 de cet objet.", err_not_owned: "Vous n'avez pas cet objet.",
      err_booster_active: "Un boost de points doublés est déjà actif.", err_unavailable: "Indisponible pour cette énigme.",
      err_own_puzzle: "Vous ne pouvez pas utiliser d'objets sur votre énigme.", err_closed: "Cette énigme est fermée.",
      err_puzzle_not_open: "Cette énigme est déjà résolue.", err_already_solved: "Vous avez déjà résolu cette énigme.",
      err_not_found: "Objet ou énigme introuvable.", err_network: "Pas de connexion. Réessayez.",
      err_server: "Une erreur est survenue. Réessayez.", err_invalid_session: "Votre session a expiré. Reconnectez-vous."
    }
  };
  // item name + description per language (the database only stores the English name as a fallback)
  var ITEMS = {
    hint_pattern:   { en: ["Letter Pattern", "Shows how many letters each word of the answer has."], ar: ["نمط الحروف", "يُظهر عدد حروف كل كلمة في الجواب."], fr: ["Schéma des lettres", "Montre le nombre de lettres de chaque mot de la réponse."] },
    hint_first:     { en: ["First Letters", "Shows the first letter of every word of the answer."], ar: ["الحروف الأولى", "يُظهر أول حرف من كل كلمة في الجواب."], fr: ["Premières lettres", "Montre la première lettre de chaque mot de la réponse."] },
    reveal_answer:  { en: ["Answer Reveal", "Shows the full answer. You can still type it, but that puzzle gives no reward."], ar: ["إظهار الجواب", "يُظهر الجواب كاملاً. يمكنك كتابته لكن اللغز لن يمنحك مكافأة."], fr: ["Révéler la réponse", "Montre la réponse complète. Vous pouvez la saisir, mais sans récompense."] },
    extra_attempts: { en: ["Extra Attempts", "+3 wrong attempts per hour on one puzzle (5 becomes 8)."], ar: ["محاولات إضافية", "+3 محاولات خاطئة في الساعة على لغز واحد (من 5 إلى 8)."], fr: ["Tentatives en plus", "+3 essais ratés par heure sur une énigme (de 5 à 8)."] },
    double_points:  { en: ["Double Points", "Your next first-place win gives double points."], ar: ["نقاط مضاعفة", "فوزك القادم بالمركز الأول يمنح نقاطاً مضاعفة."], fr: ["Points doublés", "Votre prochaine victoire en premier donne le double de points."] },
    frame_neon_purple:   { en: ["Neon Purple Frame"], ar: ["إطار بنفسجي نيون"], fr: ["Cadre violet néon"] },
    frame_pink_glow:     { en: ["Pink Glow Frame"], ar: ["إطار وردي متوهج"], fr: ["Cadre rose lumineux"] },
    frame_emerald:       { en: ["Emerald Frame"], ar: ["إطار زمردي"], fr: ["Cadre émeraude"] },
    frame_golden:        { en: ["Golden Frame"], ar: ["إطار ذهبي"], fr: ["Cadre doré"] },
    badge_lightbulb:     { en: ["Bright Idea Badge"], ar: ["شارة فكرة لامعة"], fr: ["Badge Idée brillante"] },
    badge_detective:     { en: ["Detective Badge"], ar: ["شارة المحقق"], fr: ["Badge Détective"] },
    badge_rocket:        { en: ["Rocket Badge"], ar: ["شارة الصاروخ"], fr: ["Badge Fusée"] },
    badge_brainiac:      { en: ["Brainiac Badge"], ar: ["شارة العبقري"], fr: ["Badge Cerveau"] },
    badge_fire_streak:   { en: ["Fire Streak Badge"], ar: ["شارة سلسلة النار"], fr: ["Badge Série de feu"] },
    badge_secret_keeper: { en: ["Secret Keeper Badge"], ar: ["شارة حافظ الأسرار"], fr: ["Badge Gardien du secret"] },
    title_puzzle_fan:    { en: ["Puzzle Fan"], ar: ["عاشق الألغاز"], fr: ["Fan d'énigmes"] },
    title_emoji_master:  { en: ["Emoji Master"], ar: ["سيد الإيموجي"], fr: ["Maître des emojis"] }
  };
  var BADGES = { badge_lightbulb: "💡", badge_detective: "🕵️", badge_rocket: "🚀", badge_brainiac: "🧠", badge_fire_streak: "🔥", badge_secret_keeper: "🤫" };
  var EFFECT_SLUG = { pattern: "hint_pattern", first_letters: "hint_first", reveal: "reveal_answer", extra_attempts: "extra_attempts" };

  function t(k, v) {
    var l = U.lang(), s = (S[l] && S[l][k] !== undefined) ? S[l][k] : S.en[k];
    if (s === undefined) return k;
    if (v) for (var x in v) s = s.split("{" + x + "}").join(String(v[x]));
    return s;
  }
  function err(code) { var k = "err_" + code; return S.en[k] ? t(k) : t("err_server"); }
  function iname(it) { var e = ITEMS[it.slug], l = U.lang(); return e ? (e[l] || e.en)[0] : it.name; }
  function idesc(it) {
    var e = ITEMS[it.slug], l = U.lang();
    if (e && (e[l] || e.en)[1]) return (e[l] || e.en)[1];
    return it.type === "frame" ? t("frameDesc") : it.type === "badge" ? t("badgeDesc") : it.type === "title" ? t("titleDesc") : (it.description || "");
  }
  function kindLabel(it) { return t(it.type === "hint" ? "kHint" : it.type === "booster" ? "kBoost" : it.type === "reveal" ? "kReveal" : it.type === "frame" ? "kFrame" : it.type === "badge" ? "kBadge" : "kTitle"); }
  function reqId() { try { return crypto.randomUUID(); } catch (e) { return String(Date.now()) + Math.random().toString(16).slice(2); } }

  /* ---------------- decorations (used by feed, profiles, rankings) ---------------- */
  function frameClass(slug) { return /^frame_[a-z0-9_]{1,40}$/.test(slug || "") ? "fx-" + slug : ""; }
  function badgeIcon(slug) { return BADGES[slug] || ""; }
  function titleText(slug) { var e = ITEMS[slug]; return e && /^title_/.test(slug) ? (e[U.lang()] || e.en)[0] : ""; }

  /* ---------------- RPC helper ---------------- */
  function rpc(name, args) {
    args = args || {}; args.p_session_token = A.getToken() || null;
    return A.call(name, args).then(function (r) {
      if (!r || !r.ok) {
        var code = r && r.error ? r.error : "network";
        if (code === "invalid_session") U.sessionLost();
        return { ok: false, error: code };
      }
      return r;
    });
  }
  function fail(r) { U.toast(err(r.error)); }

  /* ---------------- store modal ---------------- */
  var overlay = null, body = null, tab = "helps", data = null, busy = false;
  var btn = h("button", { class: "soft-btn sc-bell st-btn", type: "button", onclick: function () { open("helps"); } }, "🛍️");
  function paintBtn() { btn.setAttribute("aria-label", t("btnAria")); btn.title = t("btnAria"); }

  function closeM() {
    if (overlay) { overlay.remove(); overlay = null; }
    if (!document.querySelector(".acct-overlay")) document.body.style.overflow = "";
  }
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && overlay) closeM(); });

  function loadStore(cb) {
    rpc("get_store", {}).then(function (r) {
      if (r.ok) data = r; else if (!data) data = { items: [], coins: 0, equipped: {}, error: r.error };
      if (cb) cb();
    });
  }
  function coins() { return data ? data.coins : 0; }

  function applyProfile(p) { if (p) { A.setProfile(p); if (data) data.coins = p.coins; } }

  function doBuy(it) {
    if (!A.isLoggedIn()) { closeM(); A.open("login"); return; }
    if (busy) return;
    if (it.price >= 100 && !window.confirm(t("buyAsk", { n: iname(it), p: it.price }))) return;
    busy = true;
    rpc("buy_item", { p_slug: it.slug, p_quantity: 1, p_request_id: reqId() }).then(function (r) {
      busy = false;
      if (!r.ok) { fail(r); loadStore(render); return; }
      applyProfile(r.profile); U.toast(t("bought", { n: iname(it) }));
      loadStore(render);
    });
  }
  function doEquip(it, on) {
    if (busy) return; busy = true;
    rpc("equip_item", { p_slug: it.slug, p_equip: on }).then(function (r) {
      busy = false;
      if (!r.ok) { fail(r); return; }
      applyProfile(r.profile); U.toast(t(on ? "equippedOk" : "unequippedOk"));
      loadStore(render);
    });
  }
  function doActivate(it) {
    if (busy) return; busy = true;
    rpc("activate_booster", { p_slug: it.slug }).then(function (r) {
      busy = false;
      if (!r.ok) { fail(r); return; }
      U.toast(t("activatedOk")); loadStore(render);
    });
  }

  function isEquipped(it) { var e = data.equipped || {}; return e[it.type] === it.slug; }

  function itemCard(it, mode) {
    var actions = [];
    var stock = it.stackable ? h("small", { class: "st-stock" }, t("inStock", { n: it.quantity })) : null;
    if (mode === "shop") {
      if (it.stackable) actions.push(h("button", { class: "primary-btn st-buy", type: "button", onclick: function () { doBuy(it); } }, t("buy") + " · " + it.price + " 🪙"));
      else if (it.owned) actions.push(isEquipped(it)
        ? h("button", { class: "soft-btn", type: "button", onclick: function () { doEquip(it, false); } }, t("equipped") + " · " + t("unequip"))
        : h("button", { class: "soft-btn", type: "button", onclick: function () { doEquip(it, true); } }, t("equip")));
      else actions.push(h("button", { class: "primary-btn st-buy", type: "button", onclick: function () { doBuy(it); } }, t("buy") + " · " + it.price + " 🪙"));
    } else {   // "mine"
      if (it.effect === "double_points") {
        actions.push(data.boost_active ? h("small", { class: "st-active" }, t("active"))
          : h("button", { class: "primary-btn", type: "button", onclick: function () { doActivate(it); } }, "⚡ " + t("activate")));
      } else if (it.stackable) actions.push(h("small", { class: "st-note" }, t("useInPuzzle")));
      else actions.push(isEquipped(it)
        ? h("button", { class: "soft-btn", type: "button", onclick: function () { doEquip(it, false); } }, t("equipped") + " · " + t("unequip"))
        : h("button", { class: "soft-btn", type: "button", onclick: function () { doEquip(it, true); } }, t("equip")));
    }
    return h("div", { class: "st-item" },
      h("span", { class: "st-icon" }, it.icon || "🎁"),
      h("div", { class: "st-info" },
        h("strong", null, iname(it)), h("small", null, kindLabel(it) + (stock ? "" : "")), h("p", null, idesc(it)), stock),
      h("div", { class: "st-act" }, actions));
  }

  function render() {
    if (!overlay || !body) return;
    var head = h("div", { class: "st-balance" }, h("span", null, t("yourCoins")), h("strong", null, "🪙 " + coins()));
    var tabs = h("div", { class: "chips cm-chips st-tabs" }, [["helps", t("tHelps")], ["style", t("tStyle")], ["mine", t("tMine")]].map(function (x) {
      return h("button", { class: "chip" + (tab === x[0] ? " on" : ""), type: "button", onclick: function () { tab = x[0]; render(); } }, x[1]);
    }));
    var pane;
    if (!data) pane = h("p", { class: "cm-note" }, t("loading"));
    else if (data.error && !data.items.length) pane = h("div", { class: "cm-empty" }, err(data.error), h("button", { class: "soft-btn", type: "button", onclick: function () { data = null; render(); loadStore(render); } }, t("retry")));
    else {
      var items = data.items || [];
      if (tab === "helps") {
        var list = items.filter(function (i) { return i.stackable; });
        pane = h("div", { class: "sc-body" }, h("div", { class: "st-list" }, list.map(function (i) { return itemCard(i, "shop"); })),
          h("div", { class: "st-rules" }, h("strong", null, t("rulesTitle")), h("ul", null, ["r1", "r2", "r3", "r4"].map(function (k) { return h("li", null, t(k)); }))));
      } else if (tab === "style") {
        pane = h("div", { class: "st-list" }, items.filter(function (i) { return !i.stackable; }).map(function (i) { return itemCard(i, "shop"); }));
      } else {
        var stock = items.filter(function (i) { return i.stackable && i.quantity > 0; });
        var mineStyle = items.filter(function (i) { return !i.stackable && i.owned; });
        pane = (!stock.length && !mineStyle.length) ? h("p", { class: "cm-note" }, t("mineEmpty"))
          : h("div", { class: "sc-body" },
              stock.length ? h("h3", { class: "sc-sub" }, t("mineStock")) : null,
              stock.length ? h("div", { class: "st-list" }, stock.map(function (i) { return itemCard(i, "mine"); })) : null,
              mineStyle.length ? h("h3", { class: "sc-sub" }, t("mineStyle")) : null,
              mineStyle.length ? h("div", { class: "st-list" }, mineStyle.map(function (i) { return itemCard(i, "mine"); })) : null);
      }
      if (!A.isLoggedIn()) pane = h("div", { class: "sc-body" }, h("div", { class: "cm-note st-login" }, t("needLogin"),
        h("button", { class: "soft-btn", type: "button", onclick: function () { closeM(); A.open("login"); } }, t("loginBtn"))), pane);
    }
    body.replaceChildren(head, tabs, pane);
  }

  function open(which) {
    tab = which || "helps"; closeM(); data = null; busy = false;
    body = h("div", { class: "sc-body" });
    overlay = h("div", { class: "acct-overlay", role: "dialog", "aria-modal": "true", "aria-label": t("title"),
      onclick: function (e) { if (e.target === overlay) closeM(); } },
      h("div", { class: "game-card acct-card" },
        h("button", { class: "acct-close", type: "button", "aria-label": "✕", onclick: closeM }, "✕"),
        h("h2", { class: "acct-title" }, "🛍️ " + t("title")), body));
    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";
    render(); loadStore(render);
  }

  /* ---------------- in-puzzle "Helps" panel (used by community.js) ---------------- */
  // it = the puzzle object of the feed card. Returns a node, or null when helps do not apply.
  function helps(it) {
    if (!A.isLoggedIn() || it.is_mine || it.solved_by_me || it.status !== "open") return null;
    var panel = h("div", { class: "st-panel" + (it._helpsOpen ? "" : " hidden") });
    var toggle = h("button", { class: "soft-btn st-toggle", type: "button", onclick: function () {
      it._helpsOpen = !it._helpsOpen; panel.classList.toggle("hidden", !it._helpsOpen);
      if (it._helpsOpen) fetchHelps();
    } }, "🧰 " + t("helps"));
    var wrap = h("div", { class: "st-helps" }, h("div", { class: "game-tools" }, toggle), panel);
    var busyH = false;

    function paintPanel() {
      var d = it._helpsData;
      if (!d) { panel.replaceChildren(h("p", { class: "cm-note" }, t("loading"))); return; }
      if (d.error) { panel.replaceChildren(h("div", { class: "cm-empty" }, err(d.error), h("button", { class: "soft-btn", type: "button", onclick: fetchHelps }, t("retry")))); return; }
      var used = d.helps || {}, rows = [];
      (d.items || []).forEach(function (si) {
        var eff = si.effect, def = { slug: si.slug, name: ""+si.slug, type: "hint" }, label = iname(def);
        var val = used[eff], done = (eff === "extra_attempts") ? used.extra_attempts === true : !!val;
        var right;
        if (done) {
          right = eff === "extra_attempts" ? h("small", { class: "st-active" }, t("attemptsOn"))
            : h("span", { class: "st-result" + (eff === "reveal" ? " reveal" : "") }, val);
        } else if (!d.available && eff !== "extra_attempts") {
          right = h("small", { class: "st-note" }, t("unavailable"));
        } else {
          var lbl = si.quantity > 0 ? t("useN", { n: si.quantity }) : t("buyUse", { p: si.price });
          right = h("button", { class: si.quantity > 0 ? "soft-btn" : "primary-btn", type: "button", onclick: function () { go(si, eff); } }, lbl);
        }
        rows.push(h("div", { class: "st-hrow" }, h("div", { class: "st-hname" }, h("strong", null, label), h("small", null, idesc({ slug: si.slug, type: "hint" }))), h("div", { class: "st-hact" }, right)));
      });
      if (used.reveal) rows.push(h("p", { class: "cm-note" }, t("revealedNote")));
      panel.replaceChildren(h("div", { class: "st-hlist" }, rows),
        h("small", { class: "st-coins" }, t("yourCoins") + ": 🪙 " + (d.coins != null ? d.coins : 0)));
    }
    function fetchHelps() {
      paintPanel();
      rpc("get_puzzle_helps", { p_puzzle_id: it.id }).then(function (r) {
        it._helpsData = r.ok ? r : { error: r.error };
        if (r.ok && r.helps && r.helps.reveal) it._assisted = true;
        if (wrap.isConnected || true) paintPanel();
      });
    }
    function go(si, eff) {
      if (busyH) return;
      if (eff === "reveal" && !window.confirm(t("revealAsk"))) return;
      busyH = true;
      var chain = si.quantity > 0 ? Promise.resolve({ ok: true }) :
        rpc("buy_item", { p_slug: si.slug, p_quantity: 1, p_request_id: reqId() }).then(function (r) { if (r.ok) applyProfile(r.profile); return r; });
      chain.then(function (b) {
        if (!b.ok) { busyH = false; fail(b); fetchHelps(); return; }
        return rpc("use_item", { p_slug: si.slug, p_puzzle_id: it.id }).then(function (r) {
          busyH = false;
          if (!r.ok) { fail(r); fetchHelps(); return; }
          if (r.helps && r.helps.reveal) it._assisted = true;
          fetchHelps();
        });
      });
    }
    if (it._helpsOpen) { paintPanel(); if (!it._helpsData) fetchHelps(); }
    return wrap;
  }


  /* ---------------- main (Play) game: Store button + Helps + Double Points ----------------
     The original game checks answers in the browser, so its hints are computed here from the current puzzle.
     app.js itself is NOT edited: its global functions showPuzzle() and award() are wrapped. */
  function maskText(a, mode) {
    a = String(a || "").trim();
    if (mode === "pattern") return a.replace(/[^\s\p{P}]/gu, "_");
    return a.split(/\s+/).map(function (w) { var c = Array.from(w); return c.length ? c[0] + "_".repeat(c.length - 1) : ""; }).join(" ");
  }
  function curAnswer() { try { return (typeof cur !== "undefined" && cur && typeof shown === "function") ? String(shown(cur) || "") : ""; } catch (e) { return ""; } }
  function curKey() { try { return (typeof cat !== "undefined" ? cat : "") + "|" + (typeof lvl !== "undefined" ? lvl : "") + "|" + curAnswer().toLowerCase(); } catch (e) { return ""; } }
  function usedMap() { try { return JSON.parse(localStorage.getItem("es_store_used") || "{}") || {}; } catch (e) { return {}; } }
  function saveUsed(m) {
    try { var k = Object.keys(m); if (k.length > 120) k.slice(0, k.length - 120).forEach(function (x) { delete m[x]; }); localStorage.setItem("es_store_used", JSON.stringify(m)); } catch (e) { /* storage may be unavailable */ }
  }
  var mainData = null, mainOpen = false, mainBusy = false, mainBox = null, mainPanel = null;
  var mainBtn = h("button", { class: "soft-btn", type: "button", onclick: function () { open("helps"); } });
  var mainToggle = h("button", { class: "soft-btn", type: "button", onclick: function () {
    mainOpen = !mainOpen; mainPanel.classList.toggle("hidden", !mainOpen);
    if (mainOpen) { paintMain(); loadMain(); }
  } });
  function loadMain(cb) {
    if (!A.isLoggedIn()) { mainData = null; paintMain(); if (cb) cb(); return; }
    rpc("get_store", {}).then(function (r) { if (r.ok) mainData = r; paintMain(); if (cb) cb(); });
  }
  function mainItem(slug) { var l = (mainData && mainData.items) || []; for (var i = 0; i < l.length; i++) if (l[i].slug === slug) return l[i]; return null; }

  function useMain(slug, mode) {
    if (mainBusy) return;
    var item = mainItem(slug), ans = curAnswer(), key = curKey();
    if (!item || !ans) return;
    mainBusy = true;
    var chain = item.quantity > 0 ? Promise.resolve({ ok: true }) :
      rpc("buy_item", { p_slug: slug, p_quantity: 1, p_request_id: reqId() }).then(function (r) { if (r.ok) applyProfile(r.profile); return r; });
    chain.then(function (b) {
      if (!b.ok) { mainBusy = false; fail(b); loadMain(); return; }
      return rpc("spend_item", { p_slug: slug }).then(function (r) {
        mainBusy = false;
        if (!r.ok) { fail(r); loadMain(); return; }
        var m = usedMap(); m[key] = m[key] || {}; m[key][mode] = 1; saveUsed(m);
        loadMain();
      });
    });
  }
  function activateMain() {
    if (mainBusy) return; mainBusy = true;
    var it = mainItem("double_points");
    var chain = it && it.quantity > 0 ? Promise.resolve({ ok: true }) :
      rpc("buy_item", { p_slug: "double_points", p_quantity: 1, p_request_id: reqId() }).then(function (r) { if (r.ok) applyProfile(r.profile); return r; });
    chain.then(function (b) {
      if (!b.ok) { mainBusy = false; fail(b); loadMain(); return; }
      return rpc("activate_booster", { p_slug: "double_points" }).then(function (r) {
        mainBusy = false;
        if (!r.ok) { fail(r); loadMain(); return; }
        U.toast(t("activatedOk")); loadMain();
      });
    });
  }

  function paintMain() {
    if (!mainBox) return;
    mainBtn.replaceChildren("🛍️ " + t("mainStore")); mainToggle.replaceChildren("🧰 " + t("helps"));
    if (!mainOpen) return;
    if (!A.isLoggedIn()) {
      mainPanel.replaceChildren(h("div", { class: "cm-note st-login" }, t("needLogin"),
        h("button", { class: "soft-btn", type: "button", onclick: function () { A.open("login"); } }, t("loginBtn")))); return;
    }
    if (!mainData) { mainPanel.replaceChildren(h("p", { class: "cm-note" }, t("loading"))); return; }
    var ans = curAnswer(), used = usedMap()[curKey()] || {}, rows = [];
    var playable = !!ans && !(document.getElementById("answerForm").classList.contains("hidden") && !document.querySelector("#options .opt"));
    [["hint_pattern", "pattern"], ["hint_first", "first"]].forEach(function (x) {
      var it = mainItem(x[0]); if (!it) return;
      var right;
      if (!playable) right = h("small", { class: "st-note" }, t("mainNoHelp"));
      else if (used[x[1]]) right = h("span", { class: "st-result" }, maskText(ans, x[1]));
      else right = h("button", { class: it.quantity > 0 ? "soft-btn" : "primary-btn", type: "button", onclick: function () { useMain(x[0], x[1]); } },
        it.quantity > 0 ? t("useN", { n: it.quantity }) : t("buyUse", { p: it.price }));
      rows.push(h("div", { class: "st-hrow" }, h("div", { class: "st-hname" }, h("strong", null, iname(it)), h("small", null, idesc(it))), h("div", { class: "st-hact" }, right)));
    });
    var dp = mainItem("double_points");
    if (dp) {
      var r2 = mainData.boost_active ? h("small", { class: "st-active" }, t("active"))
        : h("button", { class: dp.quantity > 0 ? "soft-btn" : "primary-btn", type: "button", onclick: activateMain },
            dp.quantity > 0 ? t("dpOwned", { n: dp.quantity }) : t("dpBuy", { p: dp.price }));
      rows.push(h("div", { class: "st-hrow" }, h("div", { class: "st-hname" }, h("strong", null, "⚡ " + t("dpName")), h("small", null, t("dpHow"))), h("div", { class: "st-hact" }, r2)));
    }
    mainPanel.replaceChildren(h("div", { class: "st-hlist" }, rows), h("small", { class: "st-coins" }, t("yourCoins") + ": 🪙 " + (mainData ? mainData.coins : 0)));
  }

  function initMain() {
    var hintText = document.getElementById("hintText");
    if (!hintText || mainBox) return;
    mainPanel = h("div", { class: "st-panel hidden" });
    mainBox = h("div", { class: "st-helps st-main" }, h("div", { class: "game-tools" }, mainBtn, mainToggle), mainPanel);
    hintText.after(mainBox);
    paintMain();
    // re-render the panel whenever the game shows another puzzle
    if (typeof window.showPuzzle === "function") {
      var origShow = window.showPuzzle;
      window.showPuzzle = function () { var r = origShow.apply(this, arguments); try { paintMain(); } catch (e) { /* keep the game running */ } return r; };
    }
    // Double Points: after a normal award, ask the server whether a boost was active; it decides, then we add the bonus.
    if (typeof window.award === "function") {
      var origAward = window.award;
      window.award = function (pts, id) {
        var r = origAward.apply(this, arguments);
        try {
          if (A.isLoggedIn() && mainData && mainData.boost_active) {
            mainData.boost_active = false;
            rpc("consume_boost", {}).then(function (c) {
              if (c.ok) {
                state.points += pts; state.best = Math.max(state.best, state.points); save(); renderStats();
                U.toast(t("mainDouble"));
              }
              loadMain();
            });
          }
        } catch (e) { /* never break the original scoring */ }
        return r;
      };
    }
    loadMain();
  }

  /* ---------------- wiring ---------------- */
  var langSel = document.getElementById("language");
  if (langSel) langSel.addEventListener("change", function () { paintBtn(); paintMain(); if (overlay) render(); });
  var lastId = A.isLoggedIn() && A.getProfile() ? A.getProfile().id : null;
  document.addEventListener("emojisecret:auth", function () {
    var id = A.isLoggedIn() && A.getProfile() ? A.getProfile().id : null;
    if (id !== lastId) { lastId = id; data = null; if (overlay) { render(); loadStore(render); } loadMain(); }
  });
  paintBtn();
  initMain();
  window.ESStore = { open: open, button: function () { return btn; }, helps: helps, frameClass: frameClass, badge: badgeIcon, title: titleText };
})();
