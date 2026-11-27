/* Emoji Secret - Stage 4: friend requests and friends list.
   Needs community.js (window.ESUI), social.js (window.ESSocial) and auth-api.js.
   Every action goes through token-checked SECURITY DEFINER RPCs; all user text is inserted with textContent. */
(function () {
  "use strict";
  var A = window.ESAuth, U = window.ESUI;
  if (!A || !A.call || !U) return;
  var h = U.h;

  /* ---------------- translations ---------------- */
  var S = {
    en: {
      title: "Friends", tFriends: "Friends", tRequests: "Requests", tAdd: "Add",
      none: "No friends yet. Send a request from the Add tab or from a player's profile.",
      noReq: "No pending requests.", incoming: "Received", outgoing: "Sent",
      accept: "Accept", decline: "Decline", cancel: "Cancel request", remove: "Remove",
      removeAsk: "Remove @{u} from your friends?", addPh: "Username", addBtn: "Send request",
      addNote: "Friends appear in your Friends leaderboard.",
      sentOk: "Request sent to @{u}.", nowFriends: "You and @{u} are now friends!", declinedOk: "Request declined.",
      canceledOk: "Request canceled.", removedOk: "Friend removed.", typeName: "Type a username.",
      loading: "Loading…", retry: "Try again", loginTo: "Log in to manage your friends.", loginBtn: "Log in",
      btnAria: "Friends", pts: "pts",
      p_add: "Add friend", p_sent: "Request sent · Cancel", p_received: "Accept friend request", p_friends: "Friends ✓ · Remove",
      err_not_found: "Player or request not found.", err_cannot_friend_self: "You cannot add yourself.",
      err_already_friends: "You are already friends.", err_already_requested: "You already sent a request.",
      err_too_many_requests: "Too many pending requests. Cancel some first.", err_friend_limit: "Friends limit reached.",
      err_network: "No connection. Please try again.", err_server: "Something went wrong. Please try again.",
      err_invalid_session: "Your session expired. Please log in again."
    },
    ar: {
      title: "الأصدقاء", tFriends: "الأصدقاء", tRequests: "الطلبات", tAdd: "إضافة",
      none: "لا يوجد أصدقاء بعد. أرسل طلباً من تبويب «إضافة» أو من ملف لاعب.",
      noReq: "لا توجد طلبات معلّقة.", incoming: "الواردة", outgoing: "المُرسَلة",
      accept: "قبول", decline: "رفض", cancel: "إلغاء الطلب", remove: "حذف",
      removeAsk: "حذف @{u} من أصدقائك؟", addPh: "اسم المستخدم", addBtn: "إرسال الطلب",
      addNote: "يظهر الأصدقاء في ترتيب الأصدقاء.",
      sentOk: "تم إرسال الطلب إلى @{u}.", nowFriends: "أنت و@{u} أصبحتما صديقين!", declinedOk: "تم رفض الطلب.",
      canceledOk: "تم إلغاء الطلب.", removedOk: "تم حذف الصديق.", typeName: "اكتب اسم المستخدم.",
      loading: "جارٍ التحميل…", retry: "إعادة المحاولة", loginTo: "سجّل الدخول لإدارة أصدقائك.", loginBtn: "تسجيل الدخول",
      btnAria: "الأصدقاء", pts: "نقطة",
      p_add: "إضافة صديق", p_sent: "تم إرسال الطلب · إلغاء", p_received: "قبول طلب الصداقة", p_friends: "أصدقاء ✓ · حذف",
      err_not_found: "اللاعب أو الطلب غير موجود.", err_cannot_friend_self: "لا يمكنك إضافة نفسك.",
      err_already_friends: "أنتما صديقان بالفعل.", err_already_requested: "لقد أرسلت طلباً بالفعل.",
      err_too_many_requests: "طلبات معلّقة كثيرة. ألغِ بعضها أولاً.", err_friend_limit: "تم بلوغ الحد الأقصى للأصدقاء.",
      err_network: "لا يوجد اتصال. حاول مرة أخرى.", err_server: "حدث خطأ. حاول مرة أخرى.",
      err_invalid_session: "انتهت الجلسة. يرجى تسجيل الدخول مرة أخرى."
    },
    fr: {
      title: "Amis", tFriends: "Amis", tRequests: "Demandes", tAdd: "Ajouter",
      none: "Pas encore d'amis. Envoyez une demande depuis l'onglet Ajouter ou depuis un profil.",
      noReq: "Aucune demande en attente.", incoming: "Reçues", outgoing: "Envoyées",
      accept: "Accepter", decline: "Refuser", cancel: "Annuler la demande", remove: "Retirer",
      removeAsk: "Retirer @{u} de vos amis ?", addPh: "Nom d'utilisateur", addBtn: "Envoyer la demande",
      addNote: "Vos amis apparaissent dans le classement Amis.",
      sentOk: "Demande envoyée à @{u}.", nowFriends: "Vous et @{u} êtes maintenant amis !", declinedOk: "Demande refusée.",
      canceledOk: "Demande annulée.", removedOk: "Ami retiré.", typeName: "Saisissez un nom d'utilisateur.",
      loading: "Chargement…", retry: "Réessayer", loginTo: "Connectez-vous pour gérer vos amis.", loginBtn: "Se connecter",
      btnAria: "Amis", pts: "pts",
      p_add: "Ajouter en ami", p_sent: "Demande envoyée · Annuler", p_received: "Accepter la demande", p_friends: "Amis ✓ · Retirer",
      err_not_found: "Joueur ou demande introuvable.", err_cannot_friend_self: "Vous ne pouvez pas vous ajouter.",
      err_already_friends: "Vous êtes déjà amis.", err_already_requested: "Demande déjà envoyée.",
      err_too_many_requests: "Trop de demandes en attente. Annulez-en d'abord.", err_friend_limit: "Limite d'amis atteinte.",
      err_network: "Pas de connexion. Réessayez.", err_server: "Une erreur est survenue. Réessayez.",
      err_invalid_session: "Votre session a expiré. Reconnectez-vous."
    }
  };
  function t(k, v) {
    var l = U.lang(), s = (S[l] && S[l][k] !== undefined) ? S[l][k] : S.en[k];
    if (s === undefined) return k;
    if (v) for (var x in v) s = s.split("{" + x + "}").join(String(v[x]));
    return s;
  }
  function err(code) { var k = "err_" + code; return S.en[k] ? t(k) : t("err_server"); }
  function openProfile(u) { if (window.ESSocial && window.ESSocial.openProfile) window.ESSocial.openProfile(u); }

  /* ---------------- RPC helper ---------------- */
  // Runs an RPC, shows errors, and handles an expired session. cb(result) is called only on success.
  function rpc(name, args, cb) {
    args = args || {}; args.p_session_token = A.getToken();
    return A.call(name, args).then(function (r) {
      if (!r || !r.ok) {
        var code = r && r.error ? r.error : "network";
        U.toast(err(code));
        if (code === "invalid_session") U.sessionLost();
        return;
      }
      if (cb) cb(r);
    });
  }

  /* ---------------- shared state + header button ---------------- */
  var data = null, incomingCount = 0;
  var badge = h("span", { class: "sc-badge hidden" });
  var btn = h("button", { class: "soft-btn sc-bell fr-btn", type: "button", onclick: function () { open("friends"); } }, "👥", badge);
  function paintBtn() {
    btn.setAttribute("aria-label", t("btnAria"));
    badge.textContent = incomingCount > 99 ? "99+" : String(incomingCount);
    badge.classList.toggle("hidden", !(A.isLoggedIn() && incomingCount > 0));
  }
  function refresh(cb) {
    if (!A.isLoggedIn()) { data = null; incomingCount = 0; paintBtn(); if (cb) cb(); return; }
    A.call("list_friends", { p_session_token: A.getToken() }).then(function (r) {
      if (r && r.ok) { data = r; incomingCount = (r.incoming || []).length; }
      else if (r && r.error === "invalid_session") U.sessionLost();
      paintBtn(); if (cb) cb(r);
    });
  }
  function changed() {                                        // keep the leaderboard in sync
    refresh(function () { if (window.ESLeaderboard && window.ESLeaderboard.reload) window.ESLeaderboard.reload(); render(); });
  }

  /* ---------------- modal ---------------- */
  var overlay = null, tab = "friends", body = null, addInput = null;
  function closeM() {
    if (overlay) { overlay.remove(); overlay = null; }
    if (!document.querySelector(".acct-overlay")) document.body.style.overflow = "";
  }
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && overlay) closeM(); });

  function person(p, actions) {
    var name = p.display_name || p.username;
    return h("div", { class: "fr-row" },
      h("button", { class: "fr-who", type: "button", onclick: function () { openProfile(p.username); } },
        U.avatar(p.avatar_url, name),
        h("span", { class: "fr-name" }, h("strong", null, name), h("small", null, "@" + p.username + " · ⭐ " + (p.points || 0)))),
      h("div", { class: "fr-acts" }, actions));
  }
  function act(label, cls, fn) {
    var b = h("button", { class: cls, type: "button", onclick: function () { b.disabled = true; fn(function () { b.disabled = false; }); } }, label);
    return b;
  }

  function friendsPane() {
    var f = data.friends || [];
    if (!f.length) return h("p", { class: "cm-note" }, t("none"));
    return h("div", { class: "fr-list" }, f.map(function (p) {
      return person(p, act("✕", "soft-btn fr-x", function (done) {
        if (!window.confirm(t("removeAsk", { u: p.username }))) { done(); return; }
        rpc("remove_friend", { p_username: p.username }, function () { U.toast(t("removedOk")); changed(); }).then(done);
      }));
    }));
  }
  function requestsPane() {
    var inc = data.incoming || [], out = data.outgoing || [];
    if (!inc.length && !out.length) return h("p", { class: "cm-note" }, t("noReq"));
    var parts = [];
    if (inc.length) {
      parts.push(h("h3", { class: "sc-sub" }, t("incoming") + " (" + inc.length + ")"));
      parts.push(h("div", { class: "fr-list" }, inc.map(function (p) {
        return person(p, [
          act("✓ " + t("accept"), "primary-btn fr-ok", function (done) {
            rpc("respond_friend_request", { p_username: p.username, p_accept: true }, function () { U.toast(t("nowFriends", { u: p.username })); changed(); }).then(done);
          }),
          act(t("decline"), "soft-btn", function (done) {
            rpc("respond_friend_request", { p_username: p.username, p_accept: false }, function () { U.toast(t("declinedOk")); changed(); }).then(done);
          })]);
      })));
    }
    if (out.length) {
      parts.push(h("h3", { class: "sc-sub" }, t("outgoing") + " (" + out.length + ")"));
      parts.push(h("div", { class: "fr-list" }, out.map(function (p) {
        return person(p, act(t("cancel"), "soft-btn", function (done) {
          rpc("cancel_friend_request", { p_username: p.username }, function () { U.toast(t("canceledOk")); changed(); }).then(done);
        }));
      })));
    }
    return h("div", { class: "sc-body" }, parts);
  }
  function addPane() {
    var sendBtn;
    function send() {
      var u = addInput.value.trim().replace(/^@/, "").toLowerCase();
      if (!u) { U.toast(t("typeName")); return; }
      sendBtn.disabled = true;
      rpc("send_friend_request", { p_username: u }, function (r) {
        U.toast(r.state === "friends" ? t("nowFriends", { u: u }) : t("sentOk", { u: u }));
        addInput.value = ""; changed();
      }).then(function () { sendBtn.disabled = false; });
    }
    var keep = addInput ? addInput.value : "";
    addInput = h("input", { type: "text", class: "fr-input", maxlength: "30", autocomplete: "off", autocapitalize: "off",
      spellcheck: "false", placeholder: t("addPh"), dir: "auto",
      onkeydown: function (e) { if (e.key === "Enter") { e.preventDefault(); send(); } } });
    addInput.value = keep;
    sendBtn = h("button", { class: "primary-btn full-btn", type: "button", onclick: send }, "➕ " + t("addBtn"));
    return h("div", { class: "sc-body" }, addInput, sendBtn, h("p", { class: "cm-note" }, t("addNote")));
  }

  function render() {
    if (!overlay || !body) return;
    var tabs = h("div", { class: "chips cm-chips fr-tabs" }, [
      ["friends", t("tFriends") + (data ? " (" + (data.friends || []).length + ")" : "")],
      ["requests", t("tRequests") + (incomingCount ? " (" + incomingCount + ")" : "")],
      ["add", t("tAdd")]].map(function (x) {
      return h("button", { class: "chip" + (tab === x[0] ? " on" : ""), type: "button",
        onclick: function () { tab = x[0]; render(); } }, x[1]);
    }));
    var pane;
    if (!A.isLoggedIn()) {
      pane = h("div", { class: "cm-empty" }, t("loginTo"),
        h("button", { class: "primary-btn", type: "button", onclick: function () { closeM(); A.open("login"); } }, t("loginBtn")));
      body.replaceChildren(pane); return;
    }
    if (!data) pane = h("p", { class: "cm-note" }, t("loading"));
    else pane = tab === "friends" ? friendsPane() : tab === "requests" ? requestsPane() : addPane();
    body.replaceChildren(tabs, pane);
  }

  function open(which) {
    if (!A.isLoggedIn()) { A.open("login"); return; }
    tab = which || "friends"; addInput = null;
    closeM();
    body = h("div", { class: "sc-body" });
    overlay = h("div", { class: "acct-overlay", role: "dialog", "aria-modal": "true", "aria-label": t("title"),
      onclick: function (e) { if (e.target === overlay) closeM(); } },
      h("div", { class: "game-card acct-card" },
        h("button", { class: "acct-close", type: "button", "aria-label": "✕", onclick: closeM }, "✕"),
        h("h2", { class: "acct-title" }, t("title")), body));
    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";
    render();
    refresh(render);
  }

  /* ---------------- profile-modal helper (used by social.js) ---------------- */
  // Returns a button for the viewed player's friend_state; onDone(newState) after a successful change.
  function profileButton(username, state, onDone) {
    var label = state === "friends" ? t("p_friends") : state === "sent" ? t("p_sent") : state === "received" ? t("p_received") : t("p_add");
    var cls = (state === "none" || state === "received" ? "primary-btn" : "soft-btn") + " full-btn";
    var b = h("button", { class: cls, type: "button", onclick: function () {
      if (!A.isLoggedIn()) { A.open("login"); return; }
      var call, args = { p_username: username };
      if (state === "none") call = "send_friend_request";
      else if (state === "received") { call = "respond_friend_request"; args.p_accept = true; }
      else if (state === "sent") call = "cancel_friend_request";
      else { call = "remove_friend"; if (!window.confirm(t("removeAsk", { u: username }))) return; }
      b.disabled = true;
      rpc(call, args, function (r) {
        if (state === "none") U.toast(r.state === "friends" ? t("nowFriends", { u: username }) : t("sentOk", { u: username }));
        else if (state === "received") U.toast(t("nowFriends", { u: username }));
        else if (state === "sent") U.toast(t("canceledOk"));
        else U.toast(t("removedOk"));
        changed();
        if (onDone) onDone(r.state);
      }).then(function () { b.disabled = false; });
    } }, (state === "friends" ? "🤝 " : state === "sent" ? "⏳ " : "👥 ") + label);
    return b;
  }

  /* ---------------- wiring ---------------- */
  var lastId = A.isLoggedIn() && A.getProfile() ? A.getProfile().id : null;
  document.addEventListener("emojisecret:auth", function () {
    var id = A.isLoggedIn() && A.getProfile() ? A.getProfile().id : null;
    if (id !== lastId) { lastId = id; data = null; refresh(render); }
  });
  var langSel = document.getElementById("language");
  if (langSel) langSel.addEventListener("change", function () { paintBtn(); render(); });
  setInterval(function () { if (document.visibilityState === "visible" && A.isLoggedIn() && !overlay) refresh(); }, 120000);
  document.addEventListener("visibilitychange", function () { if (document.visibilityState === "visible" && A.isLoggedIn()) refresh(); });

  paintBtn();
  refresh();
  window.ESFriends = { open: open, button: function () { return btn; }, profileButton: profileButton, refresh: refresh };
})();
