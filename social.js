/* Emoji Secret - Stage 3C: public profiles, follow/unfollow and notifications.
   Needs community.js (window.ESUI) + auth-api.js. All user text is inserted with textContent. */
(function () {
  "use strict";
  var A = window.ESAuth, U = window.ESUI;
  if (!A || !A.call || !U) return;
  var h = U.h;

  /* ---------------- translations ---------------- */
  var S = {
    en: {
      profile: "Profile", followers: "Followers", followingN: "Following", points: "Points", wins: "Wins", puzzlesN: "Puzzles",
      follow: "Follow", following: "Following ✓", thatsYou: "This is you", myAccount: "My account",
      noPuzzles: "No public puzzles yet.", loading: "Loading…", puzzlesTitle: "Puzzles", solvedMark: "Solved",
      notifTitle: "Notifications", notifEmpty: "No notifications yet.", bell: "Notifications",
      n_puzzle_solved: "@{u} solved your puzzle “{t}”", n_like: "@{u} liked your puzzle “{t}”",
      n_comment: "@{u} commented on “{t}”", n_new_follower: "@{u} started following you", n_friend_request: "@{u} sent you a friend request", n_friend_accepted: "@{u} accepted your friend request",
      err_not_found: "Profile not found.", err_invalid_session: "Your session expired. Please log in again.",
      err_cannot_follow_self: "You cannot follow yourself.", err_network: "No connection. Please try again.",
      err_server: "Something went wrong. Please try again."
    },
    ar: {
      profile: "الملف الشخصي", followers: "المتابِعون", followingN: "يتابع", points: "النقاط", wins: "الانتصارات", puzzlesN: "الألغاز",
      follow: "متابعة", following: "تتابعه ✓", thatsYou: "هذا أنت", myAccount: "حسابي",
      noPuzzles: "لا توجد ألغاز منشورة بعد.", loading: "جارٍ التحميل…", puzzlesTitle: "الألغاز", solvedMark: "محلول",
      notifTitle: "الإشعارات", notifEmpty: "لا توجد إشعارات بعد.", bell: "الإشعارات",
      n_puzzle_solved: "@{u} حلّ لغزك “{t}”", n_like: "@{u} أعجبه لغزك “{t}”",
      n_comment: "@{u} علّق على “{t}”", n_new_follower: "@{u} بدأ بمتابعتك", n_friend_request: "@{u} أرسل لك طلب صداقة", n_friend_accepted: "@{u} قبل طلب صداقتك",
      err_not_found: "الملف غير موجود.", err_invalid_session: "انتهت الجلسة. يرجى تسجيل الدخول مرة أخرى.",
      err_cannot_follow_self: "لا يمكنك متابعة نفسك.", err_network: "لا يوجد اتصال. حاول مرة أخرى.",
      err_server: "حدث خطأ. حاول مرة أخرى."
    },
    fr: {
      profile: "Profil", followers: "Abonnés", followingN: "Abonnements", points: "Points", wins: "Victoires", puzzlesN: "Énigmes",
      follow: "Suivre", following: "Abonné ✓", thatsYou: "C'est vous", myAccount: "Mon compte",
      noPuzzles: "Aucune énigme publique pour l'instant.", loading: "Chargement…", puzzlesTitle: "Énigmes", solvedMark: "Résolue",
      notifTitle: "Notifications", notifEmpty: "Aucune notification pour l'instant.", bell: "Notifications",
      n_puzzle_solved: "@{u} a résolu votre énigme « {t} »", n_like: "@{u} a aimé votre énigme « {t} »",
      n_comment: "@{u} a commenté « {t} »", n_new_follower: "@{u} s'est abonné à vous", n_friend_request: "@{u} vous a envoyé une demande d'ami", n_friend_accepted: "@{u} a accepté votre demande d'ami",
      err_not_found: "Profil introuvable.", err_invalid_session: "Votre session a expiré. Reconnectez-vous.",
      err_cannot_follow_self: "Vous ne pouvez pas vous suivre vous-même.", err_network: "Pas de connexion. Réessayez.",
      err_server: "Une erreur est survenue. Réessayez."
    }
  };
  function t(k, v) {
    var l = U.lang(), s = (S[l] && S[l][k] !== undefined) ? S[l][k] : S.en[k];
    if (s === undefined) return k;
    if (v) for (var x in v) s = s.split("{" + x + "}").join(String(v[x]));
    return s;
  }
  function err(code) { var k = "err_" + code; return S.en[k] ? t(k) : t("err_server"); }

  /* ---------------- modal ---------------- */
  var overlay = null;
  function closeM() {
    if (overlay) { overlay.remove(); overlay = null; }
    if (!document.querySelector(".acct-overlay")) document.body.style.overflow = "";
  }
  function modal(content, label) {
    closeM();
    overlay = h("div", { class: "acct-overlay", role: "dialog", "aria-modal": "true", "aria-label": label,
      onclick: function (e) { if (e.target === overlay) closeM(); } },
      h("div", { class: "game-card acct-card" },
        h("button", { class: "acct-close", type: "button", "aria-label": "✕", onclick: closeM }, "✕"), content));
    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";
  }
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && overlay) closeM(); });

  /* ---------------- public profile ---------------- */
  function stat(icon, val, label) {
    return h("div", { class: "stat-card" }, h("span", null, icon), h("strong", null, String(val || 0)), h("small", null, label));
  }

  function renderProfile(body, r) {
    var p = r.profile, name = p.display_name || p.username;
    var av = h("div", { class: "acct-avatar" });
    var url = U.safeUrl(p.avatar_url);
    if (url) {
      var img = h("img", { src: url, alt: "" });
      img.addEventListener("error", function () { av.replaceChildren(); av.textContent = U.ini(name); });
      av.append(img);
    } else av.textContent = U.ini(name);
    var ST = window.ESStore, fx = ST ? ST.frameClass(p.equipped_frame) : "";
    if (fx) av.classList.add(fx);
    var badge = ST ? ST.badge(p.equipped_badge) : "", ttl = ST ? ST.title(p.equipped_title) : "";

    var action;
    if (r.is_me) {
      action = h("button", { class: "soft-btn full-btn", type: "button", onclick: function () { closeM(); A.open("profile"); } }, "👤 " + t("myAccount"));
    } else {
      action = h("button", { class: (r.is_following ? "soft-btn" : "primary-btn") + " full-btn", type: "button", onclick: function () {
        if (!A.isLoggedIn()) { A.open("login"); return; }
        action.disabled = true;
        A.call("toggle_follow", { p_session_token: A.getToken(), p_username: p.username }).then(function (res) {
          if (!res.ok) { action.disabled = false; U.toast(err(res.error)); if (res.error === "invalid_session") U.sessionLost(); return; }
          r.is_following = res.following; r.followers = res.follower_count;
          renderProfile(body, r);
          if (window.ESSocialOnFollow) window.ESSocialOnFollow();
        });
      } }, r.is_following ? t("following") : t("follow"));
    }

    var friendBtn = null;
    if (!r.is_me && window.ESFriends && window.ESFriends.profileButton) {
      friendBtn = window.ESFriends.profileButton(p.username, r.friend_state || "none", function (state) {
        r.friend_state = state; renderProfile(body, r);
      });
    }

    var rows = (r.puzzles || []).map(function (pz) {
      return h("div", { class: "sc-prow" },
        h("div", { class: "sc-ptext" }, h("strong", null, pz.title), h("span", null, pz.emojis)),
        h("small", null, (pz.status === "solved" ? "🏆 " + t("solvedMark") + " · " : "") + "♥ " + pz.like_count + "  💬 " + pz.comment_count));
    });

    body.replaceChildren(
      av,
      h("div", { class: "acct-who" }, h("strong", null, (badge ? badge + " " : "") + name), ttl ? h("em", { class: "st-title" }, ttl) : null, h("small", null, "@" + p.username), p.bio ? h("p", null, p.bio) : null),
      h("div", { class: "stats-grid acct-stats" },
        stat("👥", r.followers, t("followers")), stat("➡️", r.following, t("followingN")),
        stat("⭐", p.points, t("points")), stat("🏆", p.wins_count, t("wins"))),
      action, friendBtn,
      h("h3", { class: "sc-sub" }, t("puzzlesTitle") + " (" + (p.puzzles_created || 0) + ")"),
      rows.length ? h("div", { class: "sc-plist" }, rows) : h("p", { class: "cm-note" }, t("noPuzzles")));
  }

  function openProfile(username) {
    var body = h("div", { class: "sc-body" }, h("p", { class: "cm-note" }, t("loading")));
    modal(body, "@" + username);
    A.call("get_public_profile", { p_session_token: A.getToken() || null, p_username: username }).then(function (r) {
      if (!body.isConnected) return;                       // modal was closed meanwhile
      if (!r.ok) { body.replaceChildren(h("p", { class: "cm-note" }, err(r.error))); return; }
      renderProfile(body, r);
    });
  }

  /* ---------------- notifications ---------------- */
  var badge = h("span", { class: "sc-badge hidden" });
  var bellBtn = h("button", { class: "soft-btn sc-bell", type: "button", onclick: openNotifs }, "🔔", badge);
  var dot = h("span", { class: "sc-dot hidden" });
  var unread = 0;

  function paintBell() {
    bellBtn.setAttribute("aria-label", t("bell"));
    badge.textContent = unread > 99 ? "99+" : String(unread);
    badge.classList.toggle("hidden", !unread);
    dot.classList.toggle("hidden", !unread);
  }
  function setUnread(n) { unread = n || 0; paintBell(); }

  function poll() {
    if (!A.isLoggedIn()) { setUnread(0); return; }
    A.call("list_notifications", { p_session_token: A.getToken(), p_limit: 1, p_unread_only: true }).then(function (r) {
      if (r.ok) setUnread(r.unread_count);
    });
  }

  function itemText(n) {
    var d = n.data || {}, key = "n_" + n.type;
    if (S.en[key]) return t(key, { u: d.from_username || "?", t: d.title || "" });
    return n.title || "";
  }
  var ICONS = { puzzle_solved: "🏆", like: "♥", comment: "💬", new_follower: "👥", friend_request: "🤝", friend_accepted: "🤝" };

  function openNotifs() {
    if (!A.isLoggedIn()) { A.open("login"); return; }
    var body = h("div", { class: "sc-body" }, h("p", { class: "cm-note" }, t("loading")));
    modal(h("div", null, h("h2", { class: "acct-title" }, t("notifTitle")), body), t("notifTitle"));
    A.call("list_notifications", { p_session_token: A.getToken(), p_limit: 30, p_unread_only: false }).then(function (r) {
      if (!body.isConnected) return;
      if (!r.ok) {
        body.replaceChildren(h("p", { class: "cm-note" }, err(r.error)));
        if (r.error === "invalid_session") U.sessionLost();
        return;
      }
      var items = r.items || [];
      body.replaceChildren(items.length ? h("div", { class: "sc-nlist" }, items.map(function (n) {
        var d = n.data || {};
        return h("button", { class: "sc-notif" + (n.is_read ? "" : " unread"), type: "button", onclick: function () {
          if (n.type === "friend_request" && window.ESFriends) { closeM(); window.ESFriends.open("requests"); }
          else if (d.from_username) openProfile(d.from_username);
        } },
          h("span", { class: "sc-nicon" }, ICONS[n.type] || "🔔"),
          h("span", { class: "sc-ntext" }, h("strong", null, itemText(n)),
            n.type === "comment" && n.body ? h("em", null, n.body) : null,
            h("small", null, U.ago(n.created_at))));
      })) : h("p", { class: "cm-note" }, t("notifEmpty")));
      if (r.unread_count > 0) {
        A.call("mark_notifications_read", { p_session_token: A.getToken() }).then(function (m) { if (m.ok) setUnread(m.unread_count); });
      }
    });
  }

  /* ---------------- wiring ---------------- */
  var cmTab = document.querySelector('.tab[data-view="community"]');
  if (cmTab) cmTab.appendChild(dot);

  var timer = null;
  function schedule() {
    if (timer) clearInterval(timer);
    timer = setInterval(function () { if (document.visibilityState === "visible") poll(); }, 90000);   // light: 1 tiny call / 90s
  }
  document.addEventListener("visibilitychange", function () { if (document.visibilityState === "visible") poll(); });
  document.addEventListener("emojisecret:auth", function () { poll(); });
  var langSel = document.getElementById("language");
  if (langSel) langSel.addEventListener("change", paintBell);

  window.ESSocial = { openProfile: openProfile, bell: function () { return bellBtn; }, refreshNotifications: poll };
  paintBell();
  schedule();
  setTimeout(poll, 800);
})();
