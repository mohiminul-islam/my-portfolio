/* =========================================================================
   PROJECTS.JS — featured case study, filterable grid and detail modal.
   All content comes from window.PORTFOLIO.projects (js/config.js).
   ========================================================================= */
(function () {
  "use strict";

  /* ------------------------------------------------ shared helpers */
  const esc = (s) =>
    String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const icon = (name, cls) =>
    '<svg class="icon' + (cls ? " " + cls : "") + '" aria-hidden="true"><use href="#i-' + esc(name) + '"/></svg>';
  const hostOf = (url) => {
    try { return new URL(url).hostname.replace(/^www\./, ""); } catch (e) { return url; }
  };
  window.PortfolioUtil = { esc, icon, hostOf };

  /* ------------------------------------------------ cover art */
  function cover(p, opts) {
    opts = opts || {};
    const c1 = (p.accent && p.accent[0]) || "#4F8CFF";
    const c2 = (p.accent && p.accent[1]) || "#22D3EE";
    const style = 'style="--c1:' + esc(c1) + ";--c2:" + esc(c2) + '"';
    if (p.cover) {
      return (
        '<div class="cover" ' + style + '><img src="' + esc(p.cover) + '" alt="' + esc(opts.alt || "Screenshot of " + p.name) +
        '" loading="lazy" decoding="async" width="1600" height="1000"/></div>'
      );
    }
    if (!opts.text) {
      return (
        '<div class="cover cover--minimal" ' + style + ' aria-hidden="true">' +
        '<span class="cover__icon">' + icon(p.icon || "layers") + "</span></div>"
      );
    }
    return (
      '<div class="cover" ' + style + ' aria-hidden="true">' +
      '<span class="cover__kicker">' + esc(opts.kicker || p.category) + "</span>" +
      '<span class="cover__icon">' + icon(p.icon || "layers") + "</span>" +
      '<span class="cover__word">' + esc(p.name) + "</span>" +
      "</div>"
    );
  }

  /* ------------------------------------------------ featured */
  function renderFeatured(p, mount) {
    if (!p || !mount) return;
    const visual = p.cover
      ? cover(p)
      : cover({ accent: p.accent, icon: p.icon }) +
        '<div class="browser" aria-hidden="true">' +
          '<div class="browser__bar"><i></i><i></i><i></i>' +
          (p.url ? '<span class="browser__url">' + esc(hostOf(p.url)) + "</span>" : "") +
          "</div>" +
          '<div class="browser__body">' + cover(p, { kicker: p.category, text: true }) + "</div>" +
        "</div>";

    const meta = [
      ["Role", p.role],
      ["Market", p.market],
      ["Year", p.year],
    ].filter((m) => m[1]);

    mount.innerHTML =
      '<article class="featured surface" data-reveal aria-labelledby="featured-' + esc(p.id) + '">' +
        '<div class="featured__visual">' + visual + "</div>" +
        '<div class="featured__content">' +
          '<span class="featured__label">' + icon("sparkles") + "Featured case study</span>" +
          '<h3 class="featured__title" id="featured-' + esc(p.id) + '">' + esc(p.name) + "</h3>" +
          '<p class="featured__cat">' + esc(p.category) + "</p>" +
          '<p class="featured__summary">' + esc(p.summary) + "</p>" +
          '<dl class="meta-grid">' +
            meta.map((m) => "<div><dt>" + esc(m[0]) + "</dt><dd>" + esc(m[1]) + "</dd></div>").join("") +
          "</dl>" +
          '<div class="featured__actions">' +
            (p.url
              ? '<a class="btn btn--primary magnetic" href="' + esc(p.url) + '" target="_blank" rel="noopener noreferrer">' +
                "<span>Visit Live Website</span>" + icon("arrow-up-right") + '<span class="sr-only">(opens in a new tab)</span></a>'
              : "") +
            '<button class="btn btn--ghost magnetic" type="button" data-project-open="' + esc(p.id) + '">' +
              "<span>View Case Study</span>" + icon("arrow-right") + "</button>" +
          "</div>" +
        "</div>" +
      "</article>";
  }

  /* ------------------------------------------------ grid */
  function card(p, i) {
    return (
      '<li data-cats="' + esc((p.categories || []).join(" ")) + '">' +
        '<article class="p-card surface" data-reveal style="--i:' + ((i || 0) % 3) + '" aria-labelledby="p-' + esc(p.id) + '">' +
          '<div class="p-card__media">' + cover(p) +
            (p.highlight ? '<span class="p-card__highlight">' + esc(p.highlight) + "</span>" : "") +
          "</div>" +
          '<div class="p-card__body">' +
            '<p class="p-card__meta">' + (p.year ? "<span>" + esc(p.year) + "</span>" : "") + "<span>" + esc(p.category) + "</span></p>" +
            '<h3 id="p-' + esc(p.id) + '">' + esc(p.name) + "</h3>" +
            '<p class="p-card__role">' + esc(p.role) + "</p>" +
            '<p class="p-card__summary">' + esc(p.summary) + "</p>" +
            '<div class="p-card__actions">' +
              '<button class="text-btn" type="button" data-project-open="' + esc(p.id) + '">' +
                'View details<span class="sr-only"> about ' + esc(p.name) + "</span>" + icon("arrow-right") +
              "</button>" +
              (p.url
                ? '<a class="icon-btn" href="' + esc(p.url) + '" target="_blank" rel="noopener noreferrer" aria-label="Visit ' +
                  esc(p.name) + ' website (opens in a new tab)">' + icon("arrow-up-right") + "</a>"
                : "") +
            "</div>" +
          "</div>" +
        "</article>" +
      "</li>"
    );
  }

  function renderFilters(filters, projects, mount, grid, status) {
    if (!mount || !grid) return;
    const count = (id) => (id === "all" ? projects.length : projects.filter((p) => (p.categories || []).includes(id)).length);
    mount.innerHTML = filters
      .filter((f) => count(f.id) > 0)
      .map(
        (f, i) =>
          '<button class="filter" type="button" data-filter="' + esc(f.id) + '" aria-pressed="' + (i === 0) + '">' +
          esc(f.label) + '<span class="filter__count" aria-hidden="true">' + count(f.id) + "</span></button>"
      )
      .join("");

    mount.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-filter]");
      if (!btn || btn.getAttribute("aria-pressed") === "true") return;
      mount.querySelectorAll("[data-filter]").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      const id = btn.getAttribute("data-filter");
      let shown = 0;
      grid.querySelectorAll(":scope > li").forEach((li) => {
        const match = id === "all" || li.getAttribute("data-cats").split(" ").includes(id);
        li.hidden = !match;
        li.classList.remove("is-entering");
        if (match) {
          const art = li.firstElementChild;
          art.classList.add("is-in"); // make sure filtered-in cards are visible
          if (!window.Anim || !window.Anim.reduced) {
            li.style.setProperty("--i", shown);
            void li.offsetWidth; // restart animation
            li.classList.add("is-entering");
          }
          shown++;
        }
      });
      if (status) status.textContent = "Showing " + shown + " project" + (shown === 1 ? "" : "s") + " in " + btn.firstChild.textContent + ".";
    });
  }

  /* ------------------------------------------------ modal */
  function setupModal(projects) {
    const dialog = document.getElementById("project-modal");
    if (!dialog || typeof dialog.showModal !== "function") return;
    const body = dialog.querySelector("[data-modal-body]");
    let lastTrigger = null;

    const open = (id, trigger) => {
      const p = projects.find((x) => x.id === id);
      if (!p) return;
      lastTrigger = trigger || document.activeElement;
      const meta = [["Role", p.role], ["Market", p.market], ["Year", p.year]].filter((m) => m[1]);
      body.innerHTML =
        '<div class="modal__media">' + cover(p) + "</div>" +
        '<div class="modal__content">' +
          '<h2 id="modal-title">' + esc(p.name) + "</h2>" +
          '<p class="modal__cat">' + esc(p.category) + "</p>" +
          '<p class="modal__summary">' + esc(p.summary) + "</p>" +
          '<dl class="meta-grid">' + meta.map((m) => "<div><dt>" + esc(m[0]) + "</dt><dd>" + esc(m[1]) + "</dd></div>").join("") + "</dl>" +
          (p.contributions && p.contributions.length
            ? '<h3>Key contributions</h3><ul class="check-list">' +
              p.contributions.map((c) => "<li>" + icon("check") + "<span>" + esc(c) + "</span></li>").join("") + "</ul>"
            : "") +
          (p.tags && p.tags.length
            ? '<h3>Focus areas</h3><div class="tags">' + p.tags.map((t) => '<span class="tag">' + esc(t) + "</span>").join("") + "</div>"
            : "") +
          '<div class="modal__actions">' +
            (p.url
              ? '<a class="btn btn--primary" href="' + esc(p.url) + '" target="_blank" rel="noopener noreferrer"><span>Visit Live Website</span>' +
                icon("arrow-up-right") + '<span class="sr-only">(opens in a new tab)</span></a>'
              : "") +
            '<button class="btn btn--ghost" type="button" data-modal-close><span>Close</span></button>' +
          "</div>" +
          (p.featured ? '<p class="modal__note">Private systems, source code and customer data are intentionally not shown.</p>' : "") +
        "</div>";
      document.documentElement.classList.add("modal-open");
      dialog.showModal();
      dialog.querySelector(".modal__inner").scrollTop = 0;
      dialog.querySelector(".modal__close").focus();
    };

    const close = () => { if (dialog.open) dialog.close(); };

    dialog.addEventListener("close", () => {
      document.documentElement.classList.remove("modal-open");
      if (lastTrigger && document.contains(lastTrigger)) lastTrigger.focus();
    });
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog || e.target.closest("[data-modal-close]")) close();
    });
    document.addEventListener("click", (e) => {
      const t = e.target.closest("[data-project-open]");
      if (t) open(t.getAttribute("data-project-open"), t);
    });
  }

  function init(cfg) {
    const all = cfg.projects || [];
    const featured = all.find((p) => p.featured);
    const rest = all.filter((p) => p !== featured);
    renderFeatured(featured, document.querySelector('[data-render="featured"]'));
    const grid = document.querySelector('[data-render="projects"]');
    if (grid) grid.innerHTML = rest.map((p, i) => card(p, i)).join("");
    renderFilters(
      cfg.projectFilters || [],
      rest,
      document.querySelector('[data-render="filters"]'),
      grid,
      document.querySelector("[data-filter-status]")
    );
    setupModal(all);
  }

  window.Projects = { init, cover };
})();
