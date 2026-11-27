/* Emoji Secret - Stage 3B/3C: Community tab (feed), publishing, solving, likes, comments, report/close.
   Needs config.js + auth-api.js + auth-ui.js. Talks to Supabase RPC only (via ESAuth.call) plus read-only views.
   All user text is inserted with textContent (never innerHTML). The existing game code is not modified.
   Exposes window.ESUI (small shared helpers) for social.js. */
(function () {
  "use strict";
  var A = window.ESAuth;
  if (!A || !A.call) return;
  var PAGE = 12;

  /* ---------------- translations ---------------- */
  var C = {
    en: {
      tab: "Community", eyebrow: "COMMUNITY", title: "Puzzle feed", newPuzzle: "+ New puzzle",
      m_new: "New", m_top: "Top", m_open: "Unsolved", m_solved: "Solved", m_following: "Following", m_mine: "Mine",
      c_all: "All", c_emoji: "Emoji", c_riddle: "Riddles", c_quiz: "Quiz", c_logic: "Logic",
      d1: "EASY", d2: "MEDIUM", d3: "HARD",
      empty: "No puzzles here yet. Be the first to publish one!", emptyFollowing: "No puzzles from people you follow yet. Tap a creator's name to follow them.",
      emptyMine: "You have not published any puzzle yet.", needLogin: "Log in to see this section.", loginBtn: "Log in",
      loadMore: "Load more", loading: "Loading…", retry: "Try again",
      solve: "Check", answerPh: "Type your answer...", hint: "Hint", solvedBy: "Solved by @{u}", reward: "{p} pts · {c} coins",
      yourPuzzle: "This is your puzzle.", youSolved: "✅ You solved this one", loginToSolve: "Log in to solve puzzles",
      wrong: "Not quite. Attempts left: {n}", won: "🏆 First to solve it! +{p} points, +{c} coins",
      correctNoReward: "✅ Correct! Someone solved it first, so no reward this time.",
      capReached: "✅ Correct! You reached today's reward limit.",
      pubTitle: "Publish a puzzle", pubSub: "Everyone will see your puzzle. The answer is stored hashed, never as plain text.",
      fTitle: "Title", fEmojis: "Emojis or puzzle text", fAnswer: "Secret answer", fHint: "Hint (optional)",
      fDesc: "Description (optional)", fCategory: "Category", fDifficulty: "Difficulty",
      answerNote: "Tip: use a short answer. Capital letters, accents and punctuation are ignored.",
      publish: "Publish", published: "Published! +{n} coins", publishedPlain: "Published!", publishFromCreate: "🌍 Publish to community",
      comments: "Comments", commentPh: "Write a comment...", send: "Send", noComments: "No comments yet. Say something!",
      del: "Delete", delAsk: "Delete this comment?", report: "Report", reportAsk: "Report this puzzle as inappropriate?",
      reported: "Thanks, we received your report.", closeP: "Close", closeAsk: "Close this puzzle? It will disappear from the feed.",
      closedOk: "Puzzle closed.", loginToComment: "Log in to like and comment", likeAria: "Like", cmtAria: "Comments",
      err_invalid_session: "Your session expired. Please log in again.", err_invalid_answer: "Please type a valid answer.",
      err_not_found: "This puzzle is no longer available.", err_closed: "This puzzle is closed.",
      err_own_puzzle: "You cannot do that on your own puzzle.", err_already_solved: "You already solved this puzzle.",
      err_too_many_attempts: "Too many wrong guesses. Try again in an hour.",
      err_rate_limited: "Daily limit reached (10 puzzles per day). Try again later.",
      err_slow: "You are commenting too fast. Wait a moment.", err_invalid_comment: "Comment must be 1–500 characters.",
      err_invalid_title: "Title must be 1–80 characters.", err_invalid_emojis: "Emojis/text must be 1–120 characters.",
      err_invalid_hint: "Hint can be up to 160 characters.", err_invalid_description: "Description can be up to 500 characters.",
      err_invalid_category: "Invalid category.", err_invalid_difficulty: "Invalid difficulty.",
      err_network: "No connection. Please try again.", err_server: "Something went wrong. Please try again.",
      err_empty: "Please fill in the required fields."
    },
    ar: {
      tab: "المجتمع", eyebrow: "المجتمع", title: "ألغاز اللاعبين", newPuzzle: "＋ لغز جديد",
      m_new: "الأحدث", m_top: "الأكثر إعجاباً", m_open: "غير محلولة", m_solved: "محلولة", m_following: "أتابعهم", m_mine: "ألغازي",
      c_all: "الكل", c_emoji: "إيموجي", c_riddle: "ألغاز", c_quiz: "أسئلة", c_logic: "منطق",
      d1: "سهل", d2: "متوسط", d3: "صعب",
      empty: "لا توجد ألغاز هنا بعد. كن أول من ينشر!", emptyFollowing: "لا توجد ألغاز بعد من اللاعبين الذين تتابعهم. اضغط على اسم صاحب لغز لمتابعته.",
      emptyMine: "لم تنشر أي لغز بعد.", needLogin: "سجّل الدخول لعرض هذا القسم.", loginBtn: "تسجيل الدخول",
      loadMore: "عرض المزيد", loading: "جارٍ التحميل…", retry: "إعادة المحاولة",
      solve: "تحقق", answerPh: "اكتب إجابتك...", hint: "تلميح", solvedBy: "حلّه @{u}", reward: "{p} نقطة · {c} عملة",
      yourPuzzle: "هذا لغزك.", youSolved: "✅ لقد حللت هذا اللغز", loginToSolve: "سجّل الدخول لحل الألغاز",
      wrong: "ليس تماماً. المحاولات المتبقية: {n}", won: "🏆 أول من حلّه! +{p} نقطة، +{c} عملة",
      correctNoReward: "✅ صحيح! سبقك إليه لاعب آخر، لذلك لا مكافأة هذه المرة.",
      capReached: "✅ صحيح! بلغت حدّ المكافآت اليومي.",
      pubTitle: "انشر لغزاً", pubSub: "سيراه جميع اللاعبين. الإجابة تُحفظ مشفّرة وليس كنص عادي.",
      fTitle: "العنوان", fEmojis: "الإيموجيات أو نص اللغز", fAnswer: "الإجابة السرية", fHint: "تلميح (اختياري)",
      fDesc: "وصف (اختياري)", fCategory: "الفئة", fDifficulty: "الصعوبة",
      answerNote: "نصيحة: استعمل إجابة قصيرة. يتم تجاهل الحروف الكبيرة والتشكيل وعلامات الترقيم.",
      publish: "نشر", published: "تم النشر! +{n} عملة", publishedPlain: "تم النشر!", publishFromCreate: "🌍 انشر في المجتمع",
      comments: "التعليقات", commentPh: "اكتب تعليقاً...", send: "إرسال", noComments: "لا توجد تعليقات بعد. كن أول المعلّقين!",
      del: "حذف", delAsk: "حذف هذا التعليق؟", report: "إبلاغ", reportAsk: "الإبلاغ عن هذا اللغز كمحتوى غير لائق؟",
      reported: "شكراً، تم استلام بلاغك.", closeP: "إغلاق", closeAsk: "إغلاق هذا اللغز؟ سيختفي من الصفحة.",
      closedOk: "تم إغلاق اللغز.", loginToComment: "سجّل الدخول للإعجاب والتعليق", likeAria: "إعجاب", cmtAria: "التعليقات",
      err_invalid_session: "انتهت الجلسة. يرجى تسجيل الدخول مرة أخرى.", err_invalid_answer: "يرجى كتابة إجابة صالحة.",
      err_not_found: "هذا اللغز لم يعد متاحاً.", err_closed: "هذا اللغز مغلق.",
      err_own_puzzle: "لا يمكنك فعل ذلك على لغزك الخاص.", err_already_solved: "لقد حللت هذا اللغز من قبل.",
      err_too_many_attempts: "محاولات خاطئة كثيرة. حاول بعد ساعة.",
      err_rate_limited: "بلغت الحد اليومي (10 ألغاز في اليوم). حاول لاحقاً.",
      err_slow: "تعلّق بسرعة كبيرة. انتظر قليلاً.", err_invalid_comment: "التعليق من 1 إلى 500 حرف.",
      err_invalid_title: "العنوان من 1 إلى 80 حرفاً.", err_invalid_emojis: "الإيموجيات/النص من 1 إلى 120 حرفاً.",
      err_invalid_hint: "التلميح حتى 160 حرفاً.", err_invalid_description: "الوصف حتى 500 حرف.",
      err_invalid_category: "فئة غير صالحة.", err_invalid_difficulty: "مستوى صعوبة غير صالح.",
      err_network: "لا يوجد اتصال. حاول مرة أخرى.", err_server: "حدث خطأ. حاول مرة أخرى.",
      err_empty: "يرجى ملء الحقول المطلوبة."
    },
    fr: {
      tab: "Communauté", eyebrow: "COMMUNAUTÉ", title: "Fil d'énigmes", newPuzzle: "+ Nouvelle énigme",
      m_new: "Récentes", m_top: "Top", m_open: "Non résolues", m_solved: "Résolues", m_following: "Abonnements", m_mine: "Les miennes",
      c_all: "Tout", c_emoji: "Emoji", c_riddle: "Devinettes", c_quiz: "Quiz", c_logic: "Logique",
      d1: "FACILE", d2: "MOYEN", d3: "DIFFICILE",
      empty: "Aucune énigme ici pour l'instant. Soyez le premier à en publier une !", emptyFollowing: "Pas encore d'énigmes des personnes que vous suivez. Touchez le nom d'un créateur pour le suivre.",
      emptyMine: "Vous n'avez publié aucune énigme.", needLogin: "Connectez-vous pour voir cette section.", loginBtn: "Se connecter",
      loadMore: "Voir plus", loading: "Chargement…", retry: "Réessayer",
      solve: "Vérifier", answerPh: "Votre réponse...", hint: "Indice", solvedBy: "Résolue par @{u}", reward: "{p} pts · {c} pièces",
      yourPuzzle: "C'est votre énigme.", youSolved: "✅ Vous avez résolu celle-ci", loginToSolve: "Connectez-vous pour résoudre",
      wrong: "Pas tout à fait. Essais restants : {n}", won: "🏆 Premier à la résoudre ! +{p} points, +{c} pièces",
      correctNoReward: "✅ Correct ! Quelqu'un l'a résolue avant vous, donc pas de récompense.",
      capReached: "✅ Correct ! Vous avez atteint la limite de récompenses du jour.",
      pubTitle: "Publier une énigme", pubSub: "Tout le monde verra votre énigme. La réponse est stockée hachée, jamais en clair.",
      fTitle: "Titre", fEmojis: "Emojis ou texte de l'énigme", fAnswer: "Réponse secrète", fHint: "Indice (facultatif)",
      fDesc: "Description (facultatif)", fCategory: "Catégorie", fDifficulty: "Difficulté",
      answerNote: "Astuce : une réponse courte. Majuscules, accents et ponctuation sont ignorés.",
      publish: "Publier", published: "Publié ! +{n} pièces", publishedPlain: "Publié !", publishFromCreate: "🌍 Publier dans la communauté",
      comments: "Commentaires", commentPh: "Écrire un commentaire...", send: "Envoyer", noComments: "Pas encore de commentaires. Lancez la discussion !",
      del: "Supprimer", delAsk: "Supprimer ce commentaire ?", report: "Signaler", reportAsk: "Signaler cette énigme comme inappropriée ?",
      reported: "Merci, votre signalement a été reçu.", closeP: "Fermer", closeAsk: "Fermer cette énigme ? Elle disparaîtra du fil.",
      closedOk: "Énigme fermée.", loginToComment: "Connectez-vous pour aimer et commenter", likeAria: "J'aime", cmtAria: "Commentaires",
      err_invalid_session: "Votre session a expiré. Reconnectez-vous.", err_invalid_answer: "Saisissez une réponse valide.",
      err_not_found: "Cette énigme n'est plus disponible.", err_closed: "Cette énigme est fermée.",
      err_own_puzzle: "Impossible sur votre propre énigme.", err_already_solved: "Vous avez déjà résolu cette énigme.",
      err_too_many_attempts: "Trop de mauvaises réponses. Réessayez dans une heure.",
      err_rate_limited: "Limite du jour atteinte (10 énigmes par jour). Réessayez plus tard.",
      err_slow: "Vous commentez trop vite. Patientez un instant.", err_invalid_comment: "Le commentaire doit contenir 1 à 500 caractères.",
      err_invalid_title: "Le titre doit contenir 1 à 80 caractères.", err_invalid_emojis: "Emojis/texte : 1 à 120 caractères.",
      err_invalid_hint: "L'indice peut contenir 160 caractères.", err_invalid_description: "La description peut contenir 500 caractères.",
      err_invalid_category: "Catégorie invalide.", err_invalid_difficulty: "Difficulté invalide.",
      err_network: "Pas de connexion. Réessayez.", err_server: "Une erreur est survenue. Réessayez.",
      err_empty: "Veuillez remplir les champs obligatoires."
    }
  };
  function lang() { var l = document.documentElement.lang; return C[l] ? l : "en"; }
  function t(k, v) {
    var s = C[lang()][k]; if (s === undefined) s = C.en[k]; if (s === undefined) return k;
    if (v) for (var x in v) s = s.split("{" + x + "}").join(String(v[x]));
    return s;
  }
  function err(code, ctx) {
    if (ctx === "comment" && code === "rate_limited") return t("err_slow");
    var k = "err_" + code; return C.en[k] ? t(k) : t("err_server");
  }

  /* ---------------- helpers ---------------- */
  function h(tag, attrs) {
    var e = document.createElement(tag), k, v;
    attrs = attrs || {};
    for (k in attrs) {
      v = attrs[k];
      if (v === null || v === undefined || v === false) continue;
      if (k === "class") e.className = v;
      else if (k.slice(0, 2) === "on") e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v === true ? "" : v);
    }
    function add(c) {
      if (c === null || c === undefined || c === false) return;
      if (Array.isArray(c)) { c.forEach(add); return; }
      e.append(c instanceof Node ? c : document.createTextNode(String(c)));
    }
    for (var i = 2; i < arguments.length; i++) add(arguments[i]);
    return e;
  }
  function fb(el, msg, kind) { el.textContent = msg || ""; el.className = "feedback" + (kind ? " " + kind : ""); }
  function ini(n) { return (Array.from((n || "?").trim())[0] || "?").toUpperCase(); }
  function safeUrl(u) {
    return typeof u === "string" && /^(data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+\/=]+|https:\/\/\S+)$/.test(u) ? u : "";
  }
  function avatar(url, name) {
    var e = h("span", { class: "cm-av" }), u = safeUrl(url);
    if (u) {
      var img = h("img", { src: u, alt: "" });
      img.addEventListener("error", function () { e.replaceChildren(); e.textContent = ini(name); });
      e.append(img);
    } else e.textContent = ini(name);
    return e;
  }
  function ago(iso) {
    var s = (new Date(iso).getTime() - Date.now()) / 1000, a = Math.abs(s), rtf;
    try { rtf = new Intl.RelativeTimeFormat(lang(), { numeric: "auto" }); } catch (e) { return ""; }
    if (a < 60) return rtf.format(0, "second");
    if (a < 3600) return rtf.format(Math.round(s / 60), "minute");
    if (a < 86400) return rtf.format(Math.round(s / 3600), "hour");
    return rtf.format(Math.round(s / 86400), "day");
  }
  function toast(msg) {
    var el = document.getElementById("toast");
    if (!el) return;
    el.textContent = msg; el.classList.add("show");
    setTimeout(function () { el.classList.remove("show"); }, 2600);
  }
  function sessionLost() {            // token expired or revoked: refresh() clears it, then ask to log in
    return A.refresh().then(function () { if (!A.isLoggedIn()) A.open("login"); });
  }
  function restGet(path) {            // read-only public views (no secrets in them)
    var cfg = window.EMOJI_SECRET_CONFIG || {};
    return fetch(cfg.supabaseUrl + "/rest/v1/" + path, { headers: { "apikey": cfg.supabasePublishableKey } })
      .then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; });
  }
  function openProfile(username) { if (window.ESSocial && window.ESSocial.openProfile) window.ESSocial.openProfile(username); }

  window.ESUI = { h: h, fb: fb, ini: ini, safeUrl: safeUrl, avatar: avatar, ago: ago, toast: toast, lang: lang, sessionLost: sessionLost };

  /* ---------------- state ---------------- */
  var MODES = ["new", "top", "open", "solved", "following", "mine"];
  var CATS = ["emoji", "riddle", "quiz", "logic"];
  var st = { mode: "new", cat: null, items: [], hasMore: false, loading: false, failed: "", reqId: 0 };
  var nodes = {};
  var view = h("section", { id: "communityView", class: "view hidden" });
  var tabBtn = null, tabLabel = null, pubCreateBtn = null;

  function visible() { return !view.classList.contains("hidden"); }

  /* ---------------- feed loading ---------------- */
  function load(reset) {
    var needsLogin = (st.mode === "following" || st.mode === "mine") && !A.isLoggedIn();
    if (reset) { st.items = []; st.hasMore = false; }
    st.failed = "";
    if (needsLogin) { st.loading = false; paint(); return; }
    var id = ++st.reqId, offset = st.items.length;
    st.loading = true; paint();
    A.call("get_feed", { p_session_token: A.getToken() || null, p_mode: st.mode, p_category: st.cat,
                         p_limit: PAGE, p_offset: offset }).then(function (r) {
      if (id !== st.reqId) return;                       // a newer request replaced this one
      st.loading = false;
      if (r.ok) { st.items = st.items.concat(r.items || []); st.hasMore = !!r.has_more; }
      else if (r.error === "invalid_session") { st.failed = err("invalid_session"); sessionLost(); }
      else st.failed = err(r.error);
      paint();
    });
  }

  /* ---------------- rendering ---------------- */
  function chipRow(list, active, labelFn, onPick) {
    return h("div", { class: "chips cm-chips" }, list.map(function (v) {
      return h("button", { class: "chip" + (v === active ? " on" : ""), type: "button", onclick: function () { onPick(v); } }, labelFn(v));
    }));
  }

  function paint() {
    nodes = {};
    var list = h("div", { class: "cm-list" });
    var needsLogin = (st.mode === "following" || st.mode === "mine") && !A.isLoggedIn();

    st.items.forEach(function (it) { var n = cardEl(it); nodes[it.id] = n; list.appendChild(n); });

    var foot = null;
    if (needsLogin) {
      foot = h("div", { class: "cm-empty" }, t("needLogin"),
        h("button", { class: "primary-btn", type: "button", onclick: function () { A.open("login"); } }, t("loginBtn")));
    } else if (st.loading) {
      foot = h("div", { class: "cm-empty" }, t("loading"));
    } else if (st.failed) {
      foot = h("div", { class: "cm-empty" }, st.failed,
        h("button", { class: "soft-btn", type: "button", onclick: function () { load(true); } }, t("retry")));
    } else if (!st.items.length) {
      foot = h("div", { class: "cm-empty" }, t(st.mode === "following" ? "emptyFollowing" : st.mode === "mine" ? "emptyMine" : "empty"));
    } else if (st.hasMore) {
      foot = h("button", { class: "soft-btn cm-more", type: "button", onclick: function () { load(false); } }, t("loadMore"));
    }

    var bell = window.ESSocial && window.ESSocial.bell ? window.ESSocial.bell() : null;
    view.replaceChildren(
      h("div", { class: "section-heading" },
        h("div", null, h("span", { class: "eyebrow" }, t("eyebrow")), h("h2", null, t("title"))),
        h("div", { class: "cm-headbtns" }, bell,
          h("button", { class: "primary-btn cm-new", type: "button", onclick: function () { openPublish(); } }, t("newPuzzle")))),
      chipRow(MODES, st.mode, function (m) { return t("m_" + m); }, function (m) { st.mode = m; load(true); }),
      chipRow([null].concat(CATS), st.cat, function (c) { return t(c ? "c_" + c : "c_all"); }, function (c) { st.cat = c; load(true); }),
      list, foot);
  }

  function refreshCard(it) {
    var old = nodes[it.id];
    if (!old) return;
    var n = cardEl(it);
    old.replaceWith(n); nodes[it.id] = n;
  }
  function removeCard(it) {
    st.items = st.items.filter(function (x) { return x.id !== it.id; });
    var old = nodes[it.id];
    if (old) old.remove();
    delete nodes[it.id];
    if (!st.items.length) paint();
  }

  function cardEl(it) {
    var name = it.creator_display_name || it.creator_username;
    var textClue = /[\p{L}\p{N}]/u.test(it.emojis || "");
    var hintP = h("p", { class: "hint-text" });
    var out = h("div", { class: "feedback" + (it._kind ? " " + it._kind : ""), "aria-live": "polite" }, it._msg || "");

    var status = it.status === "solved"
      ? h("div", { class: "cm-status solved" }, "🏆 " + t("solvedBy", { u: it.winner_username || "?" }))
      : h("div", { class: "cm-status" }, "⭐ " + t("reward", { p: it.reward_points, c: it.reward_coins }));

    var solveArea;
    if (it.is_mine) solveArea = h("p", { class: "cm-note" }, t("yourPuzzle"));
    else if (it.solved_by_me) solveArea = h("p", { class: "cm-note ok" }, t("youSolved"));
    else if (!A.isLoggedIn()) {
      solveArea = h("button", { class: "soft-btn", type: "button", onclick: function () { A.open("login"); } }, "🔐 " + t("loginToSolve"));
    } else {
      var input = h("input", { autocomplete: "off", maxlength: 120, placeholder: t("answerPh"), "aria-label": t("answerPh") });
      var btn = h("button", { class: "primary-btn", type: "submit" }, t("solve"));
      solveArea = h("form", { class: "answer-form", onsubmit: function (e) { e.preventDefault(); solve(it, input, btn, out); } }, input, btn);
    }

    /* --- likes / comments / report / close --- */
    var likeBtn = h("button", { class: "cm-act" + (it.liked_by_me ? " on" : ""), type: "button", "aria-pressed": it.liked_by_me ? "true" : "false",
      "aria-label": t("likeAria"), onclick: onLike }, "♥ " + it.like_count);
    var cmtBtn = h("button", { class: "cm-act" + (it._open ? " on" : ""), type: "button", "aria-label": t("cmtAria"), onclick: toggleComments },
      "💬 " + it.comment_count);
    var actions = [likeBtn, cmtBtn, h("span", { class: "cm-act static" }, "🧩 " + it.solve_count)];
    if (it.is_mine) actions.push(h("button", { class: "cm-act ghost", type: "button", onclick: onClose }, "🗂 " + t("closeP")));
    else actions.push(h("button", { class: "cm-act ghost", type: "button", onclick: onReport }, "⚑ " + t("report")));

    var panel = h("div", { class: "cm-comments" + (it._open ? "" : " hidden") });

    function onLike() {
      if (!A.isLoggedIn()) { A.open("login"); return; }
      likeBtn.disabled = true;
      A.call("toggle_like", { p_session_token: A.getToken(), p_puzzle_id: it.id }).then(function (r) {
        likeBtn.disabled = false;
        if (!r.ok) { fb(out, err(r.error), "bad"); if (r.error === "invalid_session") sessionLost(); return; }
        it.liked_by_me = r.liked; it.like_count = r.like_count;
        likeBtn.className = "cm-act" + (r.liked ? " on" : "");
        likeBtn.setAttribute("aria-pressed", r.liked ? "true" : "false");
        likeBtn.textContent = "♥ " + r.like_count;
      });
    }
    function onReport() {
      if (!A.isLoggedIn()) { A.open("login"); return; }
      if (!window.confirm(t("reportAsk"))) return;
      A.call("report_puzzle", { p_session_token: A.getToken(), p_puzzle_id: it.id, p_reason: null }).then(function (r) {
        if (!r.ok) { fb(out, err(r.error), "bad"); if (r.error === "invalid_session") sessionLost(); return; }
        fb(out, t("reported"), "good");
      });
    }
    function onClose() {
      if (!window.confirm(t("closeAsk"))) return;
      A.call("close_puzzle", { p_session_token: A.getToken(), p_puzzle_id: it.id }).then(function (r) {
        if (!r.ok) { fb(out, err(r.error), "bad"); if (r.error === "invalid_session") sessionLost(); return; }
        toast(t("closedOk")); removeCard(it);
      });
    }

    function fetchComments() {
      restGet("puzzle_comments_public?select=*&order=created_at.asc&limit=100&puzzle_id=eq." + encodeURIComponent(it.id))
        .then(function (rows) { it._comments = Array.isArray(rows) ? rows : []; renderComments(); });
    }
    function renderComments() {
      panel.replaceChildren();
      if (!it._comments) { panel.append(h("p", { class: "cm-note" }, t("loading"))); return; }
      var me = A.isLoggedIn() ? A.getProfile() : null;
      if (!it._comments.length) panel.append(h("p", { class: "cm-note" }, t("noComments")));
      it._comments.forEach(function (c) {
        var cname = c.author_display_name || c.author_username;
        var canDelete = me && (me.id === c.author_id || it.is_mine);
        panel.append(h("div", { class: "cm-comment" },
          avatar(c.author_avatar_url, cname),
          h("div", { class: "cm-cbody" },
            h("div", { class: "cm-chead" },
              h("button", { class: "cm-link", type: "button", onclick: function () { openProfile(c.author_username); } }, h("strong", null, cname)),
              h("small", null, "@" + c.author_username + " · " + ago(c.created_at)),
              canDelete ? h("button", { class: "cm-link cm-del", type: "button", onclick: function () { delComment(c); } }, "🗑 " + t("del")) : null),
            h("p", null, c.body))));
      });
      if (!me) {
        panel.append(h("button", { class: "soft-btn", type: "button", onclick: function () { A.open("login"); } }, "🔐 " + t("loginToComment")));
        return;
      }
      var cin = h("input", { maxlength: 500, autocomplete: "off", placeholder: t("commentPh"), "aria-label": t("commentPh") });
      var send = h("button", { class: "primary-btn", type: "submit" }, t("send"));
      var cout = h("div", { class: "feedback" });
      panel.append(h("form", { class: "cm-cform", onsubmit: function (e) {
        e.preventDefault();
        var body = cin.value.trim();
        if (!body) return;
        send.disabled = true;
        A.call("add_comment", { p_session_token: A.getToken(), p_puzzle_id: it.id, p_body: body }).then(function (r) {
          send.disabled = false;
          if (!r.ok) { fb(cout, err(r.error, "comment"), "bad"); if (r.error === "invalid_session") sessionLost(); return; }
          it.comment_count = (it.comment_count || 0) + 1; cmtBtn.textContent = "💬 " + it.comment_count;
          fetchComments();
        });
      } }, cin, send), cout);
    }
    function delComment(c) {
      if (!window.confirm(t("delAsk"))) return;
      A.call("delete_comment", { p_session_token: A.getToken(), p_comment_id: c.id }).then(function (r) {
        if (!r.ok) { fb(out, err(r.error), "bad"); if (r.error === "invalid_session") sessionLost(); return; }
        it.comment_count = Math.max((it.comment_count || 1) - 1, 0); cmtBtn.textContent = "💬 " + it.comment_count;
        fetchComments();
      });
    }
    function toggleComments() {
      it._open = !it._open;
      panel.classList.toggle("hidden", !it._open);
      cmtBtn.classList.toggle("on", it._open);
      if (it._open) { renderComments(); if (!it._comments) fetchComments(); }
    }
    if (it._open) { renderComments(); if (!it._comments) fetchComments(); }

    return h("article", { class: "game-card cm-card" },
      h("div", { class: "cm-head" },
        avatar(it.creator_avatar_url, name),
        h("button", { class: "cm-who cm-link", type: "button", onclick: function () { openProfile(it.creator_username); } },
          h("strong", null, name), h("small", null, "@" + it.creator_username + " · " + ago(it.created_at))),
        h("span", { class: "difficulty" }, t("d" + it.difficulty))),
      h("h3", { class: "cm-title" }, it.title),
      h("div", { class: "cm-emojis" + (textClue ? " text" : "") }, it.emojis),
      it.description ? h("p", { class: "cm-desc" }, it.description) : null,
      status,
      solveArea, out,
      it.hint ? h("div", { class: "game-tools" },
        h("button", { class: "soft-btn", type: "button", onclick: function () { hintP.textContent = hintP.textContent ? "" : "💡 " + it.hint; } }, "💡 " + t("hint"))) : null,
      hintP,
      h("div", { class: "cm-actions" }, actions),
      panel);
  }

  function solve(it, input, btn, out) {
    var ans = input.value.trim();
    if (!ans) { fb(out, t("err_empty"), "bad"); return; }
    btn.disabled = true;
    A.call("submit_answer", { p_session_token: A.getToken(), p_puzzle_id: it.id, p_answer: ans }).then(function (r) {
      btn.disabled = false;
      if (!r.ok) {
        fb(out, err(r.error), "bad");
        if (r.error === "invalid_session") sessionLost();
        else if (r.error === "closed" || r.error === "not_found") setTimeout(function () { load(true); }, 1500);
        else if (r.error === "already_solved") { it.solved_by_me = true; refreshCard(it); }
        return;
      }
      if (!r.correct) { fb(out, t("wrong", { n: r.attempts_left }), "bad"); input.select(); return; }
      if (r.profile) A.setProfile(r.profile);              // balances update
      it.solved_by_me = true; it.solve_count = (it.solve_count || 0) + 1;
      if (r.winner) {
        var me = A.getProfile();
        it.status = "solved"; it.winner_username = me ? me.username : it.winner_username;
        it._msg = t("won", { p: r.reward_points, c: r.reward_coins });
      } else it._msg = t(r.daily_cap_reached ? "capReached" : "correctNoReward");
      it._kind = "good";
      refreshCard(it);
    });
  }

  /* ---------------- publish modal ---------------- */
  var pubOverlay = null;
  function closePublish() {
    if (pubOverlay) { pubOverlay.remove(); pubOverlay = null; }
    if (!document.querySelector(".acct-overlay")) document.body.style.overflow = "";
  }
  function openPublish(pre) {
    if (!A.isLoggedIn()) { A.open("login"); return; }
    closePublish();
    pre = pre || {};
    var out = h("div", { class: "feedback", "aria-live": "polite" });
    function field(id, max) { return h("input", { id: id, class: "creator-input acct-text", maxlength: max, autocomplete: "off" }); }
    var ti = field("cm-title", 80), em = field("cm-emojis", 120), an = field("cm-answer", 120), hi = field("cm-hint", 160);
    var de = h("textarea", { id: "cm-desc", class: "creator-input acct-text", maxlength: 500, rows: 3 });
    var cat = h("select", { id: "cm-cat", class: "creator-input acct-text" }, CATS.map(function (c) { return h("option", { value: c }, t("c_" + c)); }));
    var diff = h("select", { id: "cm-diff", class: "creator-input acct-text" }, [1, 2, 3].map(function (d) { return h("option", { value: d }, t("d" + d)); }));
    em.value = pre.emojis || ""; an.value = pre.answer || ""; hi.value = pre.hint || "";
    var go = h("button", { class: "primary-btn full-btn", type: "submit" }, t("publish"));

    var form = h("form", { class: "creator-card acct-form", onsubmit: function (e) {
      e.preventDefault();
      if (!ti.value.trim() || !em.value.trim() || !an.value.trim()) { fb(out, t("err_empty"), "bad"); return; }
      go.disabled = true; fb(out, t("loading"));
      A.call("create_puzzle", { p_session_token: A.getToken(), p_title: ti.value, p_emojis: em.value, p_answer: an.value,
        p_hint: hi.value.trim() || null, p_description: de.value.trim() || null,
        p_category: cat.value, p_difficulty: +diff.value }).then(function (r) {
        go.disabled = false;
        if (!r.ok) { fb(out, err(r.error), "bad"); if (r.error === "invalid_session") sessionLost(); return; }
        if (r.profile) A.setProfile(r.profile);
        closePublish();
        toast(r.creator_bonus_coins ? t("published", { n: r.creator_bonus_coins }) : t("publishedPlain"));
        st.mode = "new"; st.cat = null;
        if (tabBtn) tabBtn.click(); else load(true);
      });
    } },
      h("label", { for: "cm-title" }, t("fTitle")), ti,
      h("label", { for: "cm-emojis" }, t("fEmojis")), em,
      h("label", { for: "cm-answer" }, t("fAnswer")), an,
      h("small", { class: "acct-sub" }, t("answerNote")),
      h("label", { for: "cm-hint" }, t("fHint")), hi,
      h("label", { for: "cm-desc" }, t("fDesc")), de,
      h("label", { for: "cm-cat" }, t("fCategory")), cat,
      h("label", { for: "cm-diff" }, t("fDifficulty")), diff,
      go, out);

    pubOverlay = h("div", { class: "acct-overlay", role: "dialog", "aria-modal": "true", "aria-label": t("pubTitle"),
      onclick: function (e) { if (e.target === pubOverlay) closePublish(); } },
      h("div", { class: "game-card acct-card" },
        h("button", { class: "acct-close", type: "button", "aria-label": "✕", onclick: closePublish }, "✕"),
        h("h2", { class: "acct-title" }, t("pubTitle")), h("p", { class: "acct-sub" }, t("pubSub")), form));
    document.body.appendChild(pubOverlay);
    document.body.style.overflow = "hidden";
    ti.focus();
  }

  /* ---------------- wiring (no changes to app.js needed) ---------------- */
  function paintStatic() {
    if (tabLabel) tabLabel.textContent = t("tab");
    if (pubCreateBtn) pubCreateBtn.textContent = t("publishFromCreate");
  }

  var tabs = document.querySelector(".tabs"), main = document.querySelector("main.shell");
  var howTab = tabs && tabs.querySelector('[data-view="how"]');
  if (tabs && main) {
    tabLabel = h("span", { class: "cm-tablabel" });
    tabBtn = h("button", { class: "tab", "data-view": "community", type: "button" }, tabLabel);
    tabs.insertBefore(tabBtn, howTab || null);
    tabs.classList.add("cm-tabs4");
    var anchor = document.getElementById("howView");
    if (anchor) anchor.after(view); else main.appendChild(view);

    // app.js's setView() already toggles the 3 built-in sections; we only add/remove ours.
    document.querySelectorAll(".tab").forEach(function (b) {
      b.addEventListener("click", function () {
        var isCm = b.dataset.view === "community";
        if (isCm && typeof setView === "function") setView("community");
        view.classList.toggle("hidden", !isCm);
        if (isCm) load(true);
      });
    });
    var bp = document.getElementById("backToPlay");
    if (bp) bp.addEventListener("click", function () { view.classList.add("hidden"); });
  }

  var createBtn = document.getElementById("createShareBtn");
  if (createBtn) {
    pubCreateBtn = h("button", { class: "soft-btn full-btn", type: "button", onclick: function () {
      function v(id) { var el = document.getElementById(id); return el ? el.value.trim() : ""; }
      openPublish({ emojis: v("creatorEmoji"), answer: v("creatorAnswer"), hint: v("creatorHint") });
    } });
    createBtn.after(pubCreateBtn);
  }

  var lastId = A.isLoggedIn() && A.getProfile() ? A.getProfile().id : null;
  document.addEventListener("emojisecret:auth", function () {
    var id = A.isLoggedIn() && A.getProfile() ? A.getProfile().id : null;
    if (id !== lastId) { lastId = id; if (visible()) load(true); }     // login/logout: refresh liked/solved flags
  });
  var langSel = document.getElementById("language");
  if (langSel) langSel.addEventListener("change", function () { paintStatic(); if (visible()) paint(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && pubOverlay) closePublish(); });

  paintStatic();
})();
