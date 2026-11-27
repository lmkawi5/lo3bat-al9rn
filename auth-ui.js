/* Emoji Secret - Stage 2: account UI (modal). Builds its own DOM, reuses the existing card/input/button
   classes, and never touches the game logic. Requires config.js + auth-api.js. All user text is inserted
   with textContent (no innerHTML), so profile data cannot inject markup. */
(function () {
  "use strict";
  var A = window.ESAuth;
  if (!A) return;

  /* ---------------- translations (EN / AR / FR, follows the language selector) ---------------- */
  var S = {
    en: {
      account: "Account", login: "Log in", register: "Create account", logout: "Log out",
      loginSub: "Log in to keep your profile.", registerSub: "No email needed. Pick a username and password.",
      guest: "You can keep playing without an account.",
      username: "Username", password: "Password", displayName: "Display name", optional: "optional", bio: "Bio",
      pwHint: "At least 8 characters.", forgot: "Forgot password?",
      recoverTitle: "Recover account", recoverSub: "Enter your recovery code to set a new password.",
      recoveryCode: "Recovery code", newPassword: "New password", currentPassword: "Current password",
      confirmPassword: "Confirm new password", changePassword: "Change password", editProfile: "Edit profile",
      save: "Save", back: "Back", close: "Close", recover: "Reset password",
      saveCodeTitle: "Save your recovery code",
      saveCodeText: "This code is the only way to reset your password if you forget it. It is shown only once. Write it down or download it and keep it private.",
      copy: "Copy", download: "Download", copied: "Copied!", copyFail: "Could not copy. Select the code and copy it manually.",
      savedConfirm: "I saved my recovery code", mustSave: "Please save your recovery code first.", continue: "Continue",
      points: "Points", coins: "Coins", wins: "Wins", created: "Created",
      saved: "Profile saved ✓", pwChanged: "Password changed ✓", pwMismatch: "Passwords do not match.",
      chooseAvatar: "Choose photo", removeAvatar: "Remove photo", wait: "Please wait…", signedOut: "Signed out",
      err_invalid_username: "Username must be 3–20 letters, numbers or _.",
      err_weak_password: "Password must be at least 8 characters.",
      err_username_taken: "That username is already taken.",
      err_invalid_credentials: "Wrong username or password. After 5 failed tries the account is locked for 15 minutes.",
      err_invalid_recovery: "Wrong username or recovery code. After 5 failed tries recovery is locked for 15 minutes.",
      err_invalid_session: "Your session expired. Please log in again.",
      err_invalid_display_name: "Display name must be 1–40 characters.",
      err_invalid_bio: "Bio can be up to 300 characters.",
      err_invalid_avatar: "That photo cannot be used.",
      err_same_password: "Choose a different password.",
      err_network: "No connection. Please try again.", err_server: "Something went wrong. Please try again.",
      err_not_configured: "Accounts are not configured.", err_empty: "Please fill in all fields."
    },
    ar: {
      account: "الحساب", login: "تسجيل الدخول", register: "إنشاء حساب", logout: "تسجيل الخروج",
      loginSub: "سجّل الدخول للاحتفاظ بملفك الشخصي.", registerSub: "لا حاجة إلى بريد إلكتروني. اختر اسم مستخدم وكلمة مرور.",
      guest: "يمكنك مواصلة اللعب بدون حساب.",
      username: "اسم المستخدم", password: "كلمة المرور", displayName: "الاسم المعروض", optional: "اختياري", bio: "نبذة",
      pwHint: "8 أحرف على الأقل.", forgot: "نسيت كلمة المرور؟",
      recoverTitle: "استعادة الحساب", recoverSub: "أدخل رمز الاسترداد لتعيين كلمة مرور جديدة.",
      recoveryCode: "رمز الاسترداد", newPassword: "كلمة المرور الجديدة", currentPassword: "كلمة المرور الحالية",
      confirmPassword: "تأكيد كلمة المرور الجديدة", changePassword: "تغيير كلمة المرور", editProfile: "تعديل الملف",
      save: "حفظ", back: "رجوع", close: "إغلاق", recover: "إعادة تعيين كلمة المرور",
      saveCodeTitle: "احفظ رمز الاسترداد",
      saveCodeText: "هذا الرمز هو الطريقة الوحيدة لإعادة تعيين كلمة المرور إذا نسيتها. يظهر مرة واحدة فقط. دوّنه أو نزّله واحتفظ به بسرية.",
      copy: "نسخ", download: "تنزيل", copied: "تم النسخ!", copyFail: "تعذر النسخ. حدّد الرمز وانسخه يدوياً.",
      savedConfirm: "لقد حفظت رمز الاسترداد", mustSave: "يرجى حفظ رمز الاسترداد أولاً.", continue: "متابعة",
      points: "النقاط", coins: "العملات", wins: "الانتصارات", created: "ألغازي",
      saved: "تم حفظ الملف ✓", pwChanged: "تم تغيير كلمة المرور ✓", pwMismatch: "كلمتا المرور غير متطابقتين.",
      chooseAvatar: "اختر صورة", removeAvatar: "إزالة الصورة", wait: "يرجى الانتظار…", signedOut: "تم تسجيل الخروج",
      err_invalid_username: "اسم المستخدم من 3 إلى 20 حرفاً أو رقماً أو _.",
      err_weak_password: "يجب ألا تقل كلمة المرور عن 8 أحرف.",
      err_username_taken: "اسم المستخدم مستخدم بالفعل.",
      err_invalid_credentials: "اسم المستخدم أو كلمة المرور غير صحيحة. بعد 5 محاولات فاشلة يُقفل الحساب 15 دقيقة.",
      err_invalid_recovery: "اسم المستخدم أو رمز الاسترداد غير صحيح. بعد 5 محاولات فاشلة تُقفل الاستعادة 15 دقيقة.",
      err_invalid_session: "انتهت الجلسة. يرجى تسجيل الدخول مرة أخرى.",
      err_invalid_display_name: "الاسم المعروض من 1 إلى 40 حرفاً.",
      err_invalid_bio: "النبذة حتى 300 حرف.",
      err_invalid_avatar: "لا يمكن استخدام هذه الصورة.",
      err_same_password: "اختر كلمة مرور مختلفة.",
      err_network: "لا يوجد اتصال. حاول مرة أخرى.", err_server: "حدث خطأ. حاول مرة أخرى.",
      err_not_configured: "الحسابات غير مفعّلة.", err_empty: "يرجى ملء جميع الحقول."
    },
    fr: {
      account: "Compte", login: "Se connecter", register: "Créer un compte", logout: "Se déconnecter",
      loginSub: "Connectez-vous pour garder votre profil.", registerSub: "Pas d'e-mail requis. Choisissez un pseudo et un mot de passe.",
      guest: "Vous pouvez continuer à jouer sans compte.",
      username: "Nom d'utilisateur", password: "Mot de passe", displayName: "Nom affiché", optional: "facultatif", bio: "Bio",
      pwHint: "Au moins 8 caractères.", forgot: "Mot de passe oublié ?",
      recoverTitle: "Récupérer le compte", recoverSub: "Saisissez votre code de récupération pour définir un nouveau mot de passe.",
      recoveryCode: "Code de récupération", newPassword: "Nouveau mot de passe", currentPassword: "Mot de passe actuel",
      confirmPassword: "Confirmer le nouveau mot de passe", changePassword: "Changer le mot de passe", editProfile: "Modifier le profil",
      save: "Enregistrer", back: "Retour", close: "Fermer", recover: "Réinitialiser le mot de passe",
      saveCodeTitle: "Conservez votre code de récupération",
      saveCodeText: "Ce code est le seul moyen de réinitialiser votre mot de passe en cas d'oubli. Il n'est affiché qu'une fois. Notez-le ou téléchargez-le et gardez-le privé.",
      copy: "Copier", download: "Télécharger", copied: "Copié !", copyFail: "Copie impossible. Sélectionnez le code et copiez-le manuellement.",
      savedConfirm: "J'ai enregistré mon code de récupération", mustSave: "Veuillez d'abord enregistrer votre code.", continue: "Continuer",
      points: "Points", coins: "Pièces", wins: "Victoires", created: "Créées",
      saved: "Profil enregistré ✓", pwChanged: "Mot de passe modifié ✓", pwMismatch: "Les mots de passe ne correspondent pas.",
      chooseAvatar: "Choisir une photo", removeAvatar: "Retirer la photo", wait: "Veuillez patienter…", signedOut: "Déconnecté",
      err_invalid_username: "Le pseudo doit contenir 3 à 20 lettres, chiffres ou _.",
      err_weak_password: "Le mot de passe doit contenir au moins 8 caractères.",
      err_username_taken: "Ce pseudo est déjà pris.",
      err_invalid_credentials: "Pseudo ou mot de passe incorrect. Après 5 échecs, le compte est bloqué 15 minutes.",
      err_invalid_recovery: "Pseudo ou code incorrect. Après 5 échecs, la récupération est bloquée 15 minutes.",
      err_invalid_session: "Votre session a expiré. Reconnectez-vous.",
      err_invalid_display_name: "Le nom affiché doit contenir 1 à 40 caractères.",
      err_invalid_bio: "La bio peut contenir jusqu'à 300 caractères.",
      err_invalid_avatar: "Cette photo ne peut pas être utilisée.",
      err_same_password: "Choisissez un mot de passe différent.",
      err_network: "Pas de connexion. Réessayez.", err_server: "Une erreur est survenue. Réessayez.",
      err_not_configured: "Les comptes ne sont pas configurés.", err_empty: "Veuillez remplir tous les champs."
    }
  };
  function lang() { var l = document.documentElement.lang; return S[l] ? l : "en"; }
  function t(k) { return S[lang()][k] || S.en[k] || k; }
  function err(code) { return t("err_" + code) !== "err_" + code ? t("err_" + code) : t("err_server"); }

  /* ---------------- tiny DOM helper ---------------- */
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
      if (Array.isArray(c)) { c.forEach(add); return; }      // arrays of nodes are flattened, not stringified
      e.append(c instanceof Node ? c : document.createTextNode(String(c)));
    }
    for (var i = 2; i < arguments.length; i++) add(arguments[i]);
    return e;
  }
  function lab(text, name) { return h("label", { for: "acct-" + name }, text); }
  function inp(name, type, ac, max) {
    return h("input", { id: "acct-" + name, name: name, type: type, class: "creator-input", autocomplete: ac, maxlength: max,
      autocapitalize: "none", spellcheck: "false" });
  }
  function fb(el, msg, kind) { el.textContent = msg || ""; el.className = "feedback" + (kind ? " " + kind : ""); }
  function initial(p) { var n = (p && (p.display_name || p.username)) || "?"; return (Array.from(n.trim())[0] || "?").toUpperCase(); }
  function setAvatar(el, url, p) {
    el.replaceChildren();
    if (url) {
      var img = h("img", { src: url, alt: "" });
      img.addEventListener("error", function () { el.replaceChildren(); el.textContent = initial(p); });
      el.append(img);
    } else el.textContent = initial(p);
  }
  function showToast(msg) {
    var el = document.getElementById("toast");
    if (!el) return;
    el.textContent = msg; el.classList.add("show");
    setTimeout(function () { el.classList.remove("show"); }, 2400);
  }

  /* ---------------- modal state ---------------- */
  var overlay = null, card = null, view = "login", tmp = {}, btn = null;

  function go(v) { view = v; build(); }
  function open(v) {
    tmp = {};
    view = v || (A.isLoggedIn() ? "profile" : "login");
    build();
    document.body.style.overflow = "hidden";
    if (A.isLoggedIn()) A.refresh().then(function () { if (overlay && view === "profile") build(); });
  }
  function close() {
    if (overlay) { overlay.remove(); overlay = null; card = null; }
    document.body.style.overflow = "";
    tmp = {};
  }
  function tryClose() {
    if (view === "saveCode" && !tmp.confirmed) { if (tmp.fb) fb(tmp.fb, t("mustSave"), "bad"); return; }
    close();
  }

  function build() {
    if (view !== "login" && view !== "register" && view !== "recovery" && view !== "saveCode" && !A.isLoggedIn()) view = "login";
    if ((view === "login" || view === "register") && A.isLoggedIn()) view = "profile";
    if (!overlay) {
      overlay = h("div", { class: "acct-overlay", role: "dialog", "aria-modal": "true", "aria-label": t("account"),
        onclick: function (e) { if (e.target === overlay) tryClose(); } });
      document.body.appendChild(overlay);
    }
    overlay.replaceChildren();
    card = h("div", { class: "game-card acct-card" });
    overlay.appendChild(card);
    if (view !== "saveCode") card.appendChild(h("button", { class: "acct-close", type: "button", "aria-label": t("close"), onclick: tryClose }, "✕"));
    ({ login: viewAuth, register: viewAuth, recovery: viewRecovery, saveCode: viewSaveCode,
       profile: viewProfile, edit: viewEdit, password: viewPassword }[view] || viewAuth)(view);
    var f = card.querySelector("input:not([type=file]):not([type=checkbox]),textarea");
    if (f) f.focus();
  }

  function busy(button, out, call, onOk) {
    var label = button.textContent;
    button.disabled = true; button.textContent = t("wait"); fb(out, "");
    call().then(function (r) {
      button.disabled = false; button.textContent = label;
      if (r && r.ok) onOk(r);
      else fb(out, err(r && r.error), "bad");
    });
  }

  /* ---------------- views ---------------- */
  function chips(mode) {
    return h("div", { class: "chips acct-chips" },
      h("button", { class: "chip" + (mode === "login" ? " on" : ""), type: "button", onclick: function () { go("login"); } }, t("login")),
      h("button", { class: "chip" + (mode === "register" ? " on" : ""), type: "button", onclick: function () { go("register"); } }, t("register")));
  }

  function viewAuth(mode) {
    var out = h("div", { class: "feedback", "aria-live": "polite" });
    var u = inp("username", "text", "username", 20);
    var p = inp("password", "password", mode === "login" ? "current-password" : "new-password", 72);
    var dn = null, nodes = [lab(t("username"), "username"), u];
    if (mode === "register") {
      dn = inp("displayName", "text", "nickname", 40); dn.classList.add("acct-text");
      nodes.push(lab(t("displayName") + " (" + t("optional") + ")", "displayName"), dn);
    }
    nodes.push(lab(t("password"), "password"), p);
    if (mode === "register") nodes.push(h("small", { class: "acct-sub" }, t("pwHint")));
    var submit = h("button", { class: "primary-btn full-btn", type: "submit" }, t(mode === "login" ? "login" : "register"));
    nodes.push(submit, out);
    if (mode === "login") nodes.push(h("button", { class: "acct-link", type: "button", onclick: function () { go("recovery"); } }, t("forgot")));

    var form = h("form", { class: "creator-card acct-form", onsubmit: function (e) {
      e.preventDefault();
      if (!u.value.trim() || !p.value) { fb(out, t("err_empty"), "bad"); return; }
      busy(submit, out,
        function () { return mode === "login" ? A.login(u.value, p.value) : A.register(u.value, p.value, dn.value); },
        function (r) { if (mode === "register") { tmp.code = r.recovery_code; go("saveCode"); } else { tmp = {}; go("profile"); } });
    } }, nodes);
    card.append(h("h2", { class: "acct-title" }, t(mode === "login" ? "login" : "register")),
      h("p", { class: "acct-sub" }, t(mode === "login" ? "loginSub" : "registerSub")), chips(mode), form,
      h("p", { class: "acct-sub" }, t("guest")));
  }

  function viewSaveCode() {
    var out = h("div", { class: "feedback", "aria-live": "polite" });
    tmp.fb = out;
    var cont = h("button", { class: "primary-btn full-btn", type: "button", disabled: true,
      onclick: function () { tmp.confirmed = true; tmp = {}; go("profile"); } }, t("continue"));
    var check = h("input", { type: "checkbox", onchange: function () { tmp.confirmed = check.checked; cont.disabled = !check.checked; if (check.checked) fb(out, ""); } });
    var code = tmp.code || "";
    card.append(
      h("h2", { class: "acct-title" }, t("saveCodeTitle")),
      h("p", { class: "acct-sub" }, t("saveCodeText")),
      h("div", { class: "acct-code" }, code),
      h("div", { class: "acct-row" },
        h("button", { class: "soft-btn", type: "button", onclick: function () {
          (navigator.clipboard ? navigator.clipboard.writeText(code) : Promise.reject()).then(
            function () { fb(out, t("copied"), "good"); }, function () { fb(out, t("copyFail"), "bad"); });
        } }, "📋 " + t("copy")),
        h("button", { class: "soft-btn", type: "button", onclick: function () {
          var p = A.getProfile(), name = p ? p.username : "account";
          var blob = new Blob(["Emoji Secret recovery code for " + name + "\n\n" + code + "\n\nKeep this private. It is the only way to reset your password.\n"], { type: "text/plain" });
          var a = h("a", { href: URL.createObjectURL(blob), download: "emoji-secret-recovery-" + name + ".txt" });
          document.body.appendChild(a); a.click(); a.remove();
          setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
        } }, "⬇ " + t("download"))),
      h("label", { class: "acct-check" }, check, h("span", null, t("savedConfirm"))),
      cont, out);
  }

  function viewProfile() {
    var p = A.getProfile();
    var av = h("div", { class: "acct-avatar" }); setAvatar(av, p.avatar_url, p);
    function stat(icon, val, label) {
      return h("div", { class: "stat-card" }, h("span", null, icon), h("strong", null, String(val || 0)), h("small", null, label));
    }
    var msg = h("div", { class: "feedback" + (tmp.msg ? " good" : "") }, tmp.msg || "");
    card.append(
      av,
      h("div", { class: "acct-who" }, h("strong", null, p.display_name || p.username), h("small", null, "@" + p.username),
        p.bio ? h("p", null, p.bio) : null),
      h("div", { class: "stats-grid acct-stats" },
        stat("⭐", p.points, t("points")), stat("🪙", p.coins, t("coins")),
        stat("🏆", p.wins_count, t("wins")), stat("🧩", p.puzzles_created, t("created"))),
      msg,
      h("div", { class: "game-tools" },
        h("button", { class: "soft-btn", type: "button", onclick: function () { tmp = {}; go("edit"); } }, "✏️ " + t("editProfile")),
        h("button", { class: "soft-btn", type: "button", onclick: function () { tmp = {}; go("password"); } }, "🔑 " + t("changePassword")),
        h("button", { class: "soft-btn", type: "button", onclick: function () {
          A.logout().then(function () { close(); showToast(t("signedOut")); });
        } }, "↩ " + t("logout"))));
    tmp.msg = "";
  }

  function toAvatar(file) {   // center-crop to 128x128 JPEG data URL (small enough to store in the profile row)
    return new Promise(function (resolve, reject) {
      if (!file || !/^image\//.test(file.type) || file.size > 10 * 1024 * 1024) return reject();
      var url = URL.createObjectURL(file), img = new Image();
      img.onload = function () {
        var s = Math.min(img.width, img.height), c = document.createElement("canvas");
        c.width = c.height = 128;
        c.getContext("2d").drawImage(img, (img.width - s) / 2, (img.height - s) / 2, s, s, 0, 0, 128, 128);
        URL.revokeObjectURL(url);
        resolve(c.toDataURL("image/jpeg", 0.8));
      };
      img.onerror = function () { URL.revokeObjectURL(url); reject(); };
      img.src = url;
    });
  }

  function viewEdit() {
    var p = A.getProfile();
    var out = h("div", { class: "feedback", "aria-live": "polite" });
    var av = h("div", { class: "acct-avatar" }); setAvatar(av, p.avatar_url, p);
    var file = h("input", { type: "file", accept: "image/*", style: "display:none", onchange: function () {
      toAvatar(file.files[0]).then(function (d) { tmp.avatar = d; setAvatar(av, d, p); fb(out, ""); },
        function () { fb(out, t("err_invalid_avatar"), "bad"); });
      file.value = "";
    } });
    var name = inp("displayName", "text", "nickname", 40); name.classList.add("acct-text"); name.value = p.display_name || "";
    var bio = h("textarea", { id: "acct-bio", class: "creator-input acct-text", maxlength: 300, rows: 3 }); bio.value = p.bio || "";
    var save = h("button", { class: "primary-btn full-btn", type: "submit" }, t("save"));
    var form = h("form", { class: "creator-card acct-form", onsubmit: function (e) {
      e.preventDefault();
      busy(save, out, function () {
        return A.updateProfile({ displayName: name.value, bio: bio.value, avatarUrl: tmp.avatar });
      }, function () { tmp = { msg: t("saved") }; go("profile"); });
    } },
      h("div", { class: "acct-row" },
        h("button", { class: "soft-btn", type: "button", onclick: function () { file.click(); } }, "🖼 " + t("chooseAvatar")),
        h("button", { class: "soft-btn", type: "button", onclick: function () { tmp.avatar = ""; setAvatar(av, "", p); } }, "✕ " + t("removeAvatar"))),
      lab(t("displayName"), "displayName"), name, lab(t("bio"), "bio"), bio, save, out,
      h("button", { class: "acct-link", type: "button", onclick: function () { tmp = {}; go("profile"); } }, t("back")));
    card.append(h("h2", { class: "acct-title" }, t("editProfile")), av, file, form);
  }

  function viewPassword() {
    var out = h("div", { class: "feedback", "aria-live": "polite" });
    var cur = inp("current", "password", "current-password", 72);
    var nw = inp("new", "password", "new-password", 72);
    var cf = inp("confirm", "password", "new-password", 72);
    var save = h("button", { class: "primary-btn full-btn", type: "submit" }, t("changePassword"));
    var form = h("form", { class: "creator-card acct-form", onsubmit: function (e) {
      e.preventDefault();
      if (!cur.value || !nw.value) { fb(out, t("err_empty"), "bad"); return; }
      if (nw.value !== cf.value) { fb(out, t("pwMismatch"), "bad"); return; }
      busy(save, out, function () { return A.changePassword(cur.value, nw.value); },
        function () { tmp = { msg: t("pwChanged") }; go("profile"); });
    } },
      lab(t("currentPassword"), "current"), cur, lab(t("newPassword"), "new"), nw,
      lab(t("confirmPassword"), "confirm"), cf, h("small", { class: "acct-sub" }, t("pwHint")), save, out,
      h("button", { class: "acct-link", type: "button", onclick: function () { tmp = {}; go("profile"); } }, t("back")));
    card.append(h("h2", { class: "acct-title" }, t("changePassword")), form);
  }

  function viewRecovery() {
    var out = h("div", { class: "feedback", "aria-live": "polite" });
    var u = inp("username", "text", "username", 20);
    var c = inp("code", "text", "off", 30);
    var nw = inp("new", "password", "new-password", 72);
    var save = h("button", { class: "primary-btn full-btn", type: "submit" }, t("recover"));
    var form = h("form", { class: "creator-card acct-form", onsubmit: function (e) {
      e.preventDefault();
      if (!u.value.trim() || !c.value.trim() || !nw.value) { fb(out, t("err_empty"), "bad"); return; }
      busy(save, out, function () { return A.recover(u.value, c.value, nw.value); },
        function (r) { tmp = { code: r.recovery_code }; go("saveCode"); });   // the old code is dead: show the NEW one
    } },
      lab(t("username"), "username"), u, lab(t("recoveryCode"), "code"), c,
      lab(t("newPassword"), "new"), nw, h("small", { class: "acct-sub" }, t("pwHint")), save, out,
      h("button", { class: "acct-link", type: "button", onclick: function () { go("login"); } }, t("back")));
    card.append(h("h2", { class: "acct-title" }, t("recoverTitle")), h("p", { class: "acct-sub" }, t("recoverSub")), form);
  }

  /* ---------------- top-bar button (injected, styled like the points pill) ---------------- */
  function paintButton() {
    if (!btn) return;
    var p = A.isLoggedIn() ? A.getProfile() : null;
    var mini = h("span", { class: "acct-mini" });
    btn.replaceChildren(mini);
    btn.setAttribute("aria-label", t("account"));
    if (p) { setAvatar(mini, p.avatar_url, p); btn.append(h("span", { class: "acct-name" }, p.display_name || p.username)); }
    else { mini.textContent = "👤"; btn.append(h("span", { class: "acct-name" }, t("login"))); }
  }
  function mountButton() {
    var top = document.querySelector(".top-actions");
    if (!top) return;
    btn = h("button", { class: "acct-btn", type: "button", onclick: function () { open(); } });
    top.insertBefore(btn, top.firstChild);
    paintButton();
  }

  A.onChange(function () { paintButton(); });
  A.open = open;
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && overlay) tryClose(); });
  var langSel = document.getElementById("language");
  if (langSel) langSel.addEventListener("change", function () { paintButton(); if (overlay) build(); });

  mountButton();
  if (A.isLoggedIn()) A.refresh();
})();
