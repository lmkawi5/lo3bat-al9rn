/* Emoji Secret - Stage 2: account API (talks to Supabase RPC functions only).
   No libraries needed. Exposes window.ESAuth. The session token is random and opaque;
   the database only stores its hash. All balances/hashes stay server-side. */
(function () {
  "use strict";
  var cfg = window.EMOJI_SECRET_CONFIG || {};
  var TOKEN_KEY = "es_session", PROFILE_KEY = "es_profile";
  var profile = null, listeners = [];

  function lsGet(k) { try { return localStorage.getItem(k) || ""; } catch (e) { return ""; } }
  function lsSet(k, v) { try { v ? localStorage.setItem(k, v) : localStorage.removeItem(k); } catch (e) {} }

  function getToken() { return lsGet(TOKEN_KEY); }
  function emit() {
    listeners.forEach(function (fn) { try { fn(profile); } catch (e) {} });
    try { document.dispatchEvent(new CustomEvent("emojisecret:auth", { detail: { profile: profile } })); } catch (e) {}
  }
  function setSession(token, p) {
    lsSet(TOKEN_KEY, token || "");
    profile = p || null;
    lsSet(PROFILE_KEY, p ? JSON.stringify(p) : "");
    emit();
  }
  function setProfile(p) {
    profile = p || null;
    lsSet(PROFILE_KEY, p ? JSON.stringify(p) : "");
    emit();
  }

  // Publishable keys go in the "apikey" header only (they are not JWTs).
  function rpc(fn, args) {
    if (!cfg.supabaseUrl || !cfg.supabasePublishableKey) return Promise.resolve({ ok: false, error: "not_configured" });
    return fetch(cfg.supabaseUrl + "/rest/v1/rpc/" + fn, {
      method: "POST",
      headers: { "apikey": cfg.supabasePublishableKey, "Content-Type": "application/json" },
      body: JSON.stringify(args || {})
    }).then(function (r) {
      return r.json().catch(function () { return null; }).then(function (data) {
        if (!r.ok || !data || typeof data !== "object") return { ok: false, error: "server" };
        return data;
      });
    }).catch(function () { return { ok: false, error: "network" }; });
  }

  var api = {
    isLoggedIn: function () { return !!(getToken() && profile); },
    getProfile: function () { return profile; },
    getToken: getToken,                     // used by later stages to call other RPCs
    onChange: function (fn) { listeners.push(fn); },

    register: function (username, password, displayName) {
      return rpc("register_account", { p_username: username, p_password: password, p_display_name: displayName || null })
        .then(function (r) { if (r.ok) setSession(r.token, r.profile); return r; });
    },
    login: function (username, password) {
      return rpc("login_account", { p_username: username, p_password: password })
        .then(function (r) { if (r.ok) setSession(r.token, r.profile); return r; });
    },
    logout: function () {
      var t = getToken();
      setSession("", null);                 // always sign out locally, even if offline
      return t ? rpc("logout_account", { p_session_token: t }) : Promise.resolve({ ok: true });
    },
    recover: function (username, code, newPassword) {
      return rpc("recover_password", { p_username: username, p_recovery_code: code, p_new_password: newPassword })
        .then(function (r) { if (r.ok) setSession(r.token, r.profile); return r; });
    },
    changePassword: function (current, next) {
      return rpc("change_password", { p_session_token: getToken(), p_current_password: current, p_new_password: next });
    },
    // undefined/null = unchanged; "" clears bio/avatar
    updateProfile: function (fields) {
      var args = { p_session_token: getToken() };
      if (fields.displayName != null) args.p_display_name = fields.displayName;
      if (fields.bio != null) args.p_bio = fields.bio;
      if (fields.avatarUrl != null) args.p_avatar_url = fields.avatarUrl;
      return rpc("update_profile", args).then(function (r) { if (r.ok) setProfile(r.profile); return r; });
    },
    refresh: function () {
      var t = getToken();
      if (!t) return Promise.resolve({ ok: false, error: "invalid_session" });
      return rpc("get_my_profile", { p_session_token: t }).then(function (r) {
        if (r.ok) setProfile(r.profile);
        else if (r.error === "invalid_session") setSession("", null);   // expired/revoked
        return r;                                                       // network errors keep the cached login
      });
    }
  };

  try { var cached = JSON.parse(lsGet(PROFILE_KEY) || "null"); if (cached && getToken()) profile = cached; } catch (e) {}
  window.ESAuth = api;
})();
