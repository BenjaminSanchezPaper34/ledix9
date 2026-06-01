/* ═══════════════════════════════════════════════════════════════════
   ANNONCES LE DIX9 — fermetures, privatisations, infos exceptionnelles
   ═══════════════════════════════════════════════════════════════════

   ▸ POUR AJOUTER une annonce :
       ajoute une ligne dans la liste ci-dessous, format :
       { texte: "Ton message ici.", jusqu: "2026-06-03" },

   ▸ POUR ENLEVER une annonce :
       supprime sa ligne — OU ne fais rien : elle disparaît
       AUTOMATIQUEMENT le lendemain de la date "jusqu".

   ▸ "jusqu" = dernier jour d'affichage (format AAAA-MM-JJ).
   ▸ Liste vide []  →  aucun bandeau ne s'affiche.
   ═══════════════════════════════════════════════════════════════════ */

window.DIX9_ANNONCES = [

  { texte: "Établissement privatisé le mardi 2 et mercredi 3 juin au soir.", jusqu: "2026-06-03" },

  // { texte: "Fermeture exceptionnelle le 15 août.", jusqu: "2026-08-15" },

];

/* ─────────────────────────────────────────────────────────────────────
   Ci-dessous : moteur d'affichage — ne pas modifier sauf besoin.
   ───────────────────────────────────────────────────────────────────── */
(function () {
  function render() {
    var list = (window.DIX9_ANNONCES || []).filter(function (a) {
      if (!a || !a.texte) return false;
      if (!a.jusqu) return true;
      var end = new Date(a.jusqu + "T23:59:59");
      return new Date() <= end;               // expiration automatique
    });
    if (!list.length) return;

    // Cible la boîte horaires (desktop #u6152-8 / mobile #u3990-10)
    var box = document.getElementById("u6152-8") || document.getElementById("u3990-10");
    if (!box || document.getElementById("d9-annonce")) return;
    var isMobile = !document.getElementById("u6152-8");

    var note = document.createElement("div");
    note.id = "d9-annonce";
    note.setAttribute("role", "note");
    note.style.cssText = [
      "margin-top:" + (isMobile ? "16px" : "22px"),
      "padding-top:" + (isMobile ? "16px" : "20px"),
      "border-top:1px solid rgba(235,182,56,0.55)",
      "text-align:center",
      "line-height:1.45",
      "font-family:'__SF Pro Display_5',-apple-system,Helvetica,Arial,sans-serif",
      "font-size:" + (isMobile ? "15px" : "17px"),
      "color:#FFFFFF"
    ].join(";");

    var items = list.map(function (a) {
      return '<p style="margin:0;padding:3px 0;">' +
             '<span style="color:#EBB638;font-weight:700;letter-spacing:.3px;">&#9888;&nbsp;</span>' +
             String(a.texte).replace(/</g, "&lt;") + '</p>';
    }).join("");
    note.innerHTML = items;

    box.appendChild(note);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
