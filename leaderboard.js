/* Emoji Secret - Stage 3D: Leaderboards tab (global, weekly, monthly, friends).
   Needs community.js (window.ESUI), social.js (profile modal) and auth-api.js.
   Global / weekly / monthly read the public-safe views (no secrets in them); friends uses the token-based RPC.
   All user text is inserted with textContent. The existing game code is not modified. */
(function () {
  "use strict";
  var A = window.ESAuth, U = window.ESUI;
  if (!A || !A.call || !U) return;
  var h = U.h, TOP = 25;     // 25 rows keeps the free-tier bandwidth small (rows can carry a small avatar)

  /* ---------------- translations ---------------- */
  var S = {
    en: {
      tab: "Ranking", eyebrow: "LEADERBOARD", title: "Top players",
      m_global: "All time", m_weekly: "This week", m_monthly: "This month", m_friends: "Friends",
      note_global: "Total points of all players.", note_weekly: "Points earned since Monday 00:00 (UTC).",
      note_monthly: "Points earned since the 1st of the month (UTC).", note_friends: "You, your friends and the players you follow.",
      yourRank: "Your rank", pts: "pts", wins: "wins",
      noRank_global: "You have no points yet. Solve a community puzzle to enter the ranking!",
      noRank_weekly: "You have not earned points this week yet.", noRank_monthly: "You have not earned points this month yet.",
      loginTo: "Log in to see your rank and your friends ranking.", loginBtn: "Log in",
      empty: "No players here yet. Solve a puzzle to be the first!", emptyFriends: "Add friends with the 👥 button to grow your friends ranking.",
      loading: "Loading…", retry: "Try again", refresh: "Refresh",
      err_network: "No connection. Please try again.", err_server: "Something went wrong. Please try again.",
      err_invalid_session: "Your session expired. Please log in again."
    },
    ar: {
      tab: "الترتيب", eyebrow: "لوحة الصدارة", title: "أفضل اللاعبين",
      m_global: "الإجمالي", m_weekly: "هذا الأسبوع", m_monthly: "هذا الشهر", m_friends: "الأصدقاء",
      note_global: "مجموع نقاط جميع اللاعبين.", note_weekly: "النقاط المكتسبة منذ يوم الاثنين 00:00 (بالتوقيت العالمي).",
      note_monthly: "النقاط المكتسبة منذ بداية الشهر (بالتوقيت العالمي).", note_friends: "أنت وأصدقاؤك واللاعبون الذين تتابعهم.",
      yourRank: "ترتيبك", pts: "نقطة", wins: "انتصار",
      noRank_global: "ليست لديك نقاط بعد. حلّ لغزاً من المجتمع لتدخل الترتيب!",
      noRank_weekly: "لم تكسب نقاطاً هذا الأسبوع بعد.", noRank_monthly: "لم تكسب نقاطاً هذا الشهر بعد.",
      loginTo: "سجّل الدخول لرؤية ترتيبك وترتيب أصدقائك.", loginBtn: "تسجيل الدخول",
      empty: "لا يوجد لاعبون هنا بعد. حلّ لغزاً لتكون الأول!", emptyFriends: "أضف أصدقاء بزر 👥 لتكبر قائمة ترتيب الأصدقاء.",
      loading: "جارٍ التحميل…", retry: "إعادة المحاولة", refresh: "تحديث",
      err_network: "لا يوجد اتصال. حاول مرة أخرى.", err_server: "حدث خطأ. حاول مرة أخرى.",
      err_invalid_session: "انتهت الجلسة. يرجى تسجيل الدخول مرة أخرى."
    },
    fr: {
      tab: "Classement", eyebrow: "CLASSEMENT", title: "Meilleurs joueurs",
      m_global: "Global", m_weekly: "Semaine", m_monthly: "Mois", m_friends: "Amis",
      note_global: "Total des points de tous les joueurs.", note_weekly: "Points gagnés depuis lundi 00:00 (UTC).",
      note_monthly: "Points gagnés depuis le 1er du mois (UTC).", note_friends: "Vous, vos amis et les joueurs que vous suivez.",
      yourRank: "Votre rang", pts: "pts", wins: "victoires",
      noRank_global: "Vous n'avez pas encore de points. Résolvez une énigme de la communauté pour entrer au classement !",
      noRank_weekly: "Vous n'avez pas encore gagné de points cette semaine.", noRank_monthly: "Vous n'avez pas encore gagné de points ce mois-ci.",
      loginTo: "Connectez-vous pour voir votre rang et le classement de vos amis.", loginBtn: "Se connecter",
      empty: "Aucun joueur ici pour l'instant. Résolvez une énigme pour être le premier !", emptyFriends: "Ajoutez des amis avec le bouton 👥 pour agrandir votre classement.",
      loading: "Chargement…", retry: "Réessayer", refresh: "Actualiser",
      err_network: "Pas de connexion. Réessayez.", err_server: "Une erreur est survenue. Réessayez.",
      err_invalid_session: "Votre session a expiré. Reconnectez-vous."
    }
  };
  function t(k) { var l = U.lang(), s = (S[l] && S[l][k] !== undefined) ? S[l][k] : S.en[k]; return s === undefined ? k : s; }
  function err(code) { var k = "err_" + code; return S.en[k] ? t(k) : t("err_server"); }
  function fmt(n) { try { return Number(n || 0).toLocaleString(U.lang()); } catch (e) { return String(n || 0); } }

  /* ---------------- data ---------------- */
  function rest(path) {
    var cfg = window.EMOJI_SECRET_CONFIG || {};
    return fetch(cfg.supabaseUrl + "/rest/v1/" + path, { headers: { "apikey": cfg.supabasePublishableKey } })
      .then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; });
  }
  var MODES = ["global", "weekly", "monthly", "friends"];
  var VIEWS = { global: "leaderboard_global", weekly: "leaderboard_weekly", monthly: "leaderboard_monthly" };
  var st = { mode: "global", items: [], mine: null, loading: false, failed: "", reqId: 0 };
  var view = h("section", { id: "leaderboardView", class: "view hidden" });
  var tabBtn = null, tabLabel = null;
  function visible() { return !view.classList.contains("hidden"); }
  function currentUser() { return A.isLoggedIn() ? A.getProfile() : null; }

  function load() {
    var id = ++st.reqId, me = currentUser(), p;
    st.items = []; st.mine = null; st.failed = ""; st.loading = true;
    if (st.mode === "friends") {
      if (!me) { st.loading = false; paint(); return; }
      p = A.call("get_friends_leaderboard", { p_session_token: A.getToken() }).then(function (r) {
        return r.ok ? { items: r.items || [] } : { error: r.error };
      });
    } else {
      var v = VIEWS[st.mode], cols = "profile_id,username,display_name,avatar_url,points,rank" + (st.mode === "global" ? ",wins_count" : "");
      var list = rest(v + "?select=" + cols + "&order=rank.asc,username.asc&limit=" + TOP + (st.mode === "global" ? "&points=gt.0" : ""));
      var mine = me ? rest(v + "?select=" + cols + "&profile_id=eq." + encodeURIComponent(me.id)) : Promise.resolve([]);
      p = Promise.all([list, mine]).then(function (res) {
        if (!Array.isArray(res[0])) return { error: "network" };
        return { items: res[0], mine: (Array.isArray(res[1]) && res[1][0]) || null };
      });
    }
    paint();
    p.then(function (r) {
      if (id !== st.reqId) return;                      // a newer request replaced this one
      st.loading = false;
      if (r.error) { st.failed = err(r.error); if (r.error === "invalid_session") U.sessionLost(); }
      else {
        st.items = r.items;
        st.mine = r.mine || null;
        if (st.mode === "friends" && me) st.mine = r.items.filter(function (x) { return x.profile_id === me.id; })[0] || null;
      }
      paint();
    });
  }

  /* ---------------- rendering ---------------- */
  function openProfile(u) { if (window.ESSocial && window.ESSocial.openProfile) window.ESSocial.openProfile(u); }

  function row(it, me) {
    var name = it.display_name || it.username, rank = Number(it.rank) || 0;
    var medal = rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : String(rank);
    var ST = window.ESStore, bd = ST ? ST.badge(it.equipped_badge) : "", fx = ST ? ST.frameClass(it.equipped_frame) : "";
    var av = U.avatar(it.avatar_url, name); if (fx) av.classList.add(fx);
    var sub = "@" + it.username + (it.wins_count != null ? " · 🏆 " + it.wins_count : "");
    return h("button", { class: "lb-row" + (me && it.profile_id === me.id ? " me" : "") + (rank >= 1 && rank <= 3 ? " top" + rank : ""),
      type: "button", onclick: function () { openProfile(it.username); } },
      h("span", { class: "lb-rank" }, medal),
      av,
      h("span", { class: "lb-who" }, h("strong", null, (bd ? bd + " " : "") + name), h("small", null, sub)),
      h("span", { class: "lb-pts" }, fmt(it.points), h("small", null, t("pts"))));
  }

  function paint() {
    var me = currentUser();
    var parts = [];

    parts.push(h("div", { class: "section-heading" },
      h("div", null, h("span", { class: "eyebrow" }, t("eyebrow")), h("h2", null, t("title"))),
      h("div", { class: "cm-headbtns" }, window.ESFriends ? window.ESFriends.button() : null,
        h("button", { class: "soft-btn lb-refresh", type: "button", "aria-label": t("refresh"), onclick: load }, "↻"))));

    parts.push(h("div", { class: "chips cm-chips" }, MODES.map(function (m) {
      return h("button", { class: "chip" + (m === st.mode ? " on" : ""), type: "button",
        onclick: function () { st.mode = m; load(); } }, t("m_" + m));
    })));
    parts.push(h("p", { class: "lb-note" }, t("note_" + st.mode)));

    var loginPrompt = function (text) {
      return h("div", { class: "cm-empty" }, text,
        h("button", { class: "primary-btn", type: "button", onclick: function () { A.open("login"); } }, t("loginBtn")));
    };

    if (st.mode === "friends" && !me) { parts.push(loginPrompt(t("loginTo"))); view.replaceChildren.apply(view, parts); return; }

    // "Your rank" card
    if (me && !st.loading && !st.failed) {
      if (st.mine && Number(st.mine.points) > 0) {
        parts.push(h("div", { class: "lb-me" }, h("span", null, t("yourRank")), h("strong", null, "#" + st.mine.rank),
          h("span", null, fmt(st.mine.points) + " " + t("pts"))));
      } else parts.push(h("p", { class: "lb-note" }, t("noRank_" + (st.mode === "friends" ? "global" : st.mode))));
    } else if (!me && !st.loading) {
      parts.push(h("button", { class: "soft-btn lb-login", type: "button", onclick: function () { A.open("login"); } }, "🔐 " + t("loginTo")));
    }

    if (st.loading) parts.push(h("div", { class: "cm-empty" }, t("loading")));
    else if (st.failed) {
      parts.push(h("div", { class: "cm-empty" }, st.failed,
        h("button", { class: "soft-btn", type: "button", onclick: load }, t("retry"))));
    } else if (!st.items.length) parts.push(h("div", { class: "cm-empty" }, t("empty")));
    else {
      parts.push(h("div", { class: "lb-list" }, st.items.map(function (it) { return row(it, me); })));
      if (st.mode === "friends" && st.items.length <= 1) parts.push(h("p", { class: "lb-note" }, t("emptyFriends")));
    }
    view.replaceChildren.apply(view, parts);
  }

  /* ---------------- wiring (no changes to app.js needed) ---------------- */
  function paintStatic() { if (tabLabel) tabLabel.textContent = t("tab"); }

  var tabs = document.querySelector(".tabs");
  if (!tabs) return;
  var howTab = tabs.querySelector('[data-view="how"]');
  tabLabel = h("span", { class: "cm-tablabel" });
  tabBtn = h("button", { class: "tab", "data-view": "leaderboard", type: "button" }, tabLabel);
  tabs.insertBefore(tabBtn, howTab || null);
  tabs.classList.add("cm-tabs5");
  var anchor = document.getElementById("communityView") || document.getElementById("howView");
  if (anchor) anchor.after(view); else document.querySelector("main.shell").appendChild(view);

  // app.js's setView() toggles the 3 built-in sections and the active tab; community.js owns its own section.
  document.querySelectorAll(".tab").forEach(function (b) {
    b.addEventListener("click", function () {
      var isLb = b.dataset.view === "leaderboard";
      if (isLb) {
        if (typeof setView === "function") setView("leaderboard");
        var cm = document.getElementById("communityView");
        if (cm) cm.classList.add("hidden");
      }
      view.classList.toggle("hidden", !isLb);
      if (isLb) load();
    });
  });
  var bp = document.getElementById("backToPlay");
  if (bp) bp.addEventListener("click", function () { view.classList.add("hidden"); });

  var lastId = currentUser() ? currentUser().id : null;
  document.addEventListener("emojisecret:auth", function () {
    var u = currentUser(), id = u ? u.id : null;
    if (id !== lastId) { lastId = id; if (visible()) load(); }      // login/logout only (not every balance update)
  });
  var langSel = document.getElementById("language");
  if (langSel) langSel.addEventListener("change", function () { paintStatic(); if (visible()) paint(); });

  window.ESLeaderboard = { reload: function () { if (visible() && st.mode === "friends") load(); } };
  paintStatic();
})();
