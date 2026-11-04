/* =========================================================================
   MAIN.JS — renders config-driven sections and wires up interactions
   ========================================================================= */
(function () {
  "use strict";

  const cfg = window.PORTFOLIO;
  const U = window.PortfolioUtil;
  if (!cfg || !U) {
    // Fail open: never leave content hidden if something didn't load.
    document.documentElement.classList.remove("js");
    return;
  }
  const { esc, icon } = U;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const person = cfg.person || {};
  const links = cfg.links || {};

  const formatPhone = (p) => {
    const d = String(p || "").replace(/[^\d+]/g, "");
    const m = d.match(/^\+880(\d{4})(\d{6})$/);
    return m ? "+880 " + m[1] + "-" + m[2] : p;
  };

  /* ================================================= RENDERERS */
  function renderSocials() {
    const items = [];
    if (links.github) items.push(["GitHub", links.github, "github", true]);
    if (links.linkedin) items.push(["LinkedIn", links.linkedin, "linkedin", true]);
    if (person.email) items.push(["Email", "mailto:" + person.email, "mail", false]);
    const html = items
      .map(([label, href, ic, ext]) =>
        '<a class="icon-btn" href="' + esc(href) + '"' +
        (ext ? ' target="_blank" rel="noopener noreferrer" aria-label="' + label + ' profile (opens in a new tab)"' : ' aria-label="Send an email"') +
        ">" + icon(ic) + "</a>"
      )
      .join("");
    $$("[data-socials]").forEach((el) => (el.innerHTML = html));
  }

  function renderPersonal() {
    $$("[data-year]").forEach((el) => (el.textContent = String(new Date().getFullYear())));
    const avail = $("[data-availability]");
    if (avail && person.availability) avail.textContent = person.availability;

    // Years of experience, derived from careerStart (never hard-coded)
    const start = new Date((person.careerStart || "2021-01") + "-01T00:00:00");
    const years = Math.max(1, Math.floor((Date.now() - start.getTime()) / (365.25 * 864e5)));
    $$("[data-count-years]").forEach((el) => { el.setAttribute("data-count", years); el.textContent = years; });
    $$("[data-year-range]").forEach((el) => (el.textContent = "Since " + start.getFullYear()));

    // Email & phone
    $$("[data-email-link]").forEach((a) => { a.href = "mailto:" + person.email; a.textContent = person.email; });
    const phoneCard = $("[data-phone-card]");
    if (phoneCard) {
      if (person.showPhone && person.phone) {
        const a = $("[data-phone-link]", phoneCard);
        a.href = "tel:" + person.phone.replace(/[^\d+]/g, "");
        a.textContent = formatPhone(person.phone);
      } else {
        phoneCard.hidden = true;
      }
    }
    $$("[data-resume]").forEach((a) => (a.href = links.resume || a.getAttribute("href")));
  }

  function renderExpertise() {
    const mount = $('[data-render="expertise"]');
    if (!mount) return;
    mount.innerHTML = (cfg.expertise || [])
      .map((g, i) => {
        const learning = g.status === "learning";
        const cls = ["skill-card", "surface", g.size ? "skill-card--" + g.size : "", learning ? "skill-card--learning" : ""].join(" ");
        return (
          '<article class="' + cls + '" data-reveal style="--i:' + (i % 3) + '">' +
            '<div class="skill-card__top">' +
              '<span class="skill-card__icon">' + icon(g.icon) + "</span>" +
              '<span class="skill-card__badge">' + (learning ? "In progress" : "Applied") + "</span>" +
            "</div>" +
            "<h3>" + esc(g.title) + "</h3>" +
            "<p>" + esc(g.summary) + "</p>" +
            '<ul class="tags" aria-label="' + esc(g.title) + ' skills">' +
              g.skills.map((s) => '<li class="tag">' + esc(s) + "</li>").join("") +
            "</ul>" +
            '<span class="skill-card__visual" aria-hidden="true">' + icon(g.icon) + "</span>" +
          "</article>"
        );
      })
      .join("");
  }

  function renderExperience() {
    const mount = $('[data-render="experience"]');
    if (!mount) return;
    mount.innerHTML = (cfg.experience || [])
      .map((x) =>
        '<li class="tl-item' + (x.current ? " is-current" : "") + '" data-observe>' +
          '<span class="tl-item__dot" aria-hidden="true"></span>' +
          '<div class="tl-item__when" data-reveal>' +
            '<span class="tl-item__dates">' + esc(x.start) + " — " + esc(x.end) + "</span>" +
            '<span class="tl-item__loc">' + esc(x.location) + "</span>" +
            (x.current ? '<span class="tl-item__now"><span class="status__dot" aria-hidden="true"></span>Current role</span>' : "") +
          "</div>" +
          '<article class="tl-card surface" data-reveal style="--i:1">' +
            "<h3>" + esc(x.role) + "</h3>" +
            '<p class="tl-card__company"><strong>' + esc(x.company) + "</strong>" +
              (x.companyNote ? " · " + esc(x.companyNote) : "") + "</p>" +
            "<ul>" + x.points.map((p) => "<li>" + esc(p) + "</li>").join("") + "</ul>" +
            '<div class="tags">' + (x.tags || []).map((t) => '<span class="tag">' + esc(t) + "</span>").join("") + "</div>" +
          "</article>" +
        "</li>"
      )
      .join("");
  }

  function renderEducation() {
    const mount = $('[data-render="education"]');
    if (!mount) return;
    mount.innerHTML = (cfg.education || [])
      .map((e) =>
        '<li class="edu-card surface' + (e.primary ? " edu-card--primary" : "") + '" data-reveal>' +
          '<div class="edu-card__top"><span class="edu-card__session">' + esc(e.session) + "</span>" +
          '<span class="edu-card__icon">' + icon(e.primary ? "graduation-cap" : "book-open") + "</span></div>" +
          "<h3>" + esc(e.degree) + "</h3>" +
          '<p class="edu-card__school">' + esc(e.school) + "</p>" +
          (e.details && e.details.length ? "<ul>" + e.details.map((d) => "<li>" + esc(d) + "</li>").join("") + "</ul>" : "") +
        "</li>"
      )
      .join("");
  }

  function renderCourse() {
    const mount = $('[data-render="course"]');
    const c = cfg.currentCourse;
    if (!mount || !c) return;
    const colors = { Python: "#4F8CFF", Django: "#34D399" };
    mount.innerHTML =
      '<article class="course surface" data-reveal>' +
        '<div class="course__content">' +
          '<div class="course__provider"><span class="course__logo" aria-hidden="true">' + esc(c.provider.charAt(0)) + "</span>" +
            '<span><span class="course__provider-name">' + esc(c.provider) + '</span><span class="course__provider-sub">Online course · Ongoing</span></span></div>' +
          '<span class="status-pill"><span class="status__dot" aria-hidden="true"></span>Currently Learning</span>' +
          "<h3>" + esc(c.title) + "</h3>" +
          '<p class="course__focus">Focus: ' + esc(c.focus) + "</p>" +
          '<div class="badges">' +
            (c.badges || []).map((b) => '<span class="badge" style="--c:' + (colors[b] || "#8B5CF6") + '"><b aria-hidden="true"></b>' + esc(b) + "</span>").join("") +
          "</div>" +
          '<div class="course__actions">' +
            '<a class="btn btn--outline magnetic" href="' + esc(c.url) + '" target="_blank" rel="noopener noreferrer">' +
              "<span>View Course on " + esc(c.provider) + "</span>" + icon("arrow-up-right") + '<span class="sr-only">(opens in a new tab)</span></a>' +
          "</div>" +
        "</div>" +
        '<div class="course__visual" aria-hidden="true">' +
          '<svg class="rings" viewBox="0 0 360 360">' +
            '<defs><linearGradient id="rg" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#22D3EE"/><stop offset="1" stop-color="#8B5CF6"/></linearGradient></defs>' +
            '<circle cx="180" cy="180" r="150" stroke="rgba(255,255,255,.06)" stroke-width="1"/>' +
            '<circle class="r1" cx="180" cy="180" r="150" stroke="url(#rg)" stroke-width="2" stroke-dasharray="180 760"/>' +
            '<circle cx="180" cy="180" r="112" stroke="rgba(255,255,255,.06)" stroke-width="1"/>' +
            '<circle class="r2" cx="180" cy="180" r="112" stroke="#4F8CFF" stroke-width="2" stroke-dasharray="90 610" opacity=".8"/>' +
            '<circle cx="180" cy="180" r="74" stroke="rgba(255,255,255,.06)" stroke-width="1"/>' +
            '<circle class="r3" cx="180" cy="180" r="74" stroke="#34D399" stroke-width="2" stroke-dasharray="60 405" opacity=".8"/>' +
          "</svg>" +
          '<div class="code"><div class="code__bar"><i></i><i></i><i></i><span>learning.py</span></div>' +
            "<pre><code>" +
              '<span class="c"># always learning, always building</span>\n' +
              '<span class="k">class</span> <span class="f">Developer</span>:\n' +
              '    name = <span class="s">"Mohiminul Islam"</span>\n' +
              '    learning = [<span class="s">"Python"</span>, <span class="s">"Django"</span>]\n\n' +
              '    <span class="k">def</span> <span class="f">build</span>(self):\n' +
              '        <span class="k">return</span> <span class="s">"something meaningful"</span><span class="cursor"></span>' +
            "</code></pre>" +
          "</div>" +
        "</div>" +
      "</article>";
  }

  function renderTraining() {
    const mount = $('[data-render="training"]');
    if (!mount) return;
    mount.innerHTML = (cfg.training || [])
      .map((t) =>
        '<li class="train-card surface" data-reveal>' +
          '<span class="train-card__icon">' + icon(t.icon || "book-open") + "</span>" +
          "<div><h4>" + esc(t.title) + "</h4><p>" + esc(t.provider) + "</p></div>" +
        "</li>"
      )
      .join("");
  }

  function renderPhilosophy() {
    const mount = $('[data-render="philosophy"]');
    if (!mount) return;
    mount.innerHTML = (cfg.philosophy || [])
      .map((p, i) =>
        '<li class="principle" data-observe>' +
          '<span class="principle__num">0' + (i + 1) + "</span>" +
          '<h3 class="principle__title" data-split>' + esc(p.title) + "</h3>" +
          '<p class="principle__text" data-reveal style="--i:2">' + esc(p.text) + "</p>" +
        "</li>"
      )
      .join("");
  }

  /* ================================================= NAVIGATION */
  function setupNav() {
    const nav = $("#nav");
    const toTop = $("[data-to-top]");
    const navLinks = $$(".nav__links a[data-nav]");
    const allNavLinks = $$("a[data-nav]");
    const indicator = $(".nav__indicator");

    window.Anim.onScroll((y, vh) => {
      nav.classList.toggle("is-scrolled", y > 24);
      if (toTop) toTop.classList.toggle("is-visible", y > vh * 0.9);
    });

    const moveIndicator = (link) => {
      if (!indicator) return;
      if (!link || !link.offsetParent) { indicator.style.opacity = "0"; return; }
      indicator.style.width = link.offsetWidth + "px";
      indicator.style.transform = "translateX(" + link.offsetLeft + "px)";
      indicator.style.opacity = "1";
    };

    let activeId = "home";
    const setActive = (id) => {
      activeId = id;
      allNavLinks.forEach((a) => {
        const on = a.getAttribute("href") === "#" + id;
        a.classList.toggle("is-active", on);
        if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
      });
      moveIndicator(navLinks.find((a) => a.getAttribute("href") === "#" + id));
    };

    const sections = navLinks.map((a) => $(a.getAttribute("href"))).filter(Boolean);
    if ("IntersectionObserver" in window) {
      const sio = new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
        { rootMargin: "-45% 0px -50% 0px" }
      );
      sections.forEach((s) => sio.observe(s));
    }
    setActive(activeId);
    window.addEventListener("resize", () => moveIndicator(navLinks.find((a) => a.classList.contains("is-active"))), { passive: true });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => setActive(activeId));

    if (toTop) {
      toTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: window.Anim.reduced ? "auto" : "smooth" });
        const logo = $(".nav__logo");
        if (logo) logo.focus({ preventScroll: true });
      });
    }
  }

  function setupMobileMenu() {
    const btn = $(".nav__toggle");
    const menu = $("#mobile-menu");
    if (!btn || !menu) return;
    let open = false;

    const focusables = () => $$("a, button", menu).concat(btn).filter((el) => !el.hidden && el.offsetParent !== null);

    const onKey = (e) => {
      if (e.key === "Escape") { close(); btn.focus(); return; }
      if (e.key !== "Tab") return;
      const f = focusables();
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };

    function openMenu() {
      open = true;
      menu.hidden = false;
      void menu.offsetWidth;
      menu.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
      btn.setAttribute("aria-label", "Close menu");
      document.documentElement.classList.add("menu-open");
      document.addEventListener("keydown", onKey);
      const first = $("a", menu);
      if (first) first.focus({ preventScroll: true });
    }
    function close() {
      if (!open) return;
      open = false;
      menu.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", "Open menu");
      document.documentElement.classList.remove("menu-open");
      document.removeEventListener("keydown", onKey);
      setTimeout(() => { if (!open) menu.hidden = true; }, window.Anim.reduced ? 0 : 350);
    }

    btn.addEventListener("click", () => (open ? close() : openMenu()));
    menu.addEventListener("click", (e) => { if (e.target.closest("a")) close(); });
    window.matchMedia("(min-width: 961px)").addEventListener("change", (e) => { if (e.matches) close(); });
  }

  /* ================================================= CONTACT */
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise((resolve, reject) => {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy") ? resolve() : reject(); } catch (err) { reject(err); }
      ta.remove();
    });
  }

  function setupCopyEmail() {
    const btn = $("[data-copy-email]");
    const toast = $("[data-copy-status]");
    if (!btn) return;
    let t;
    btn.addEventListener("click", () => {
      const use = btn.querySelector("use");
      copyText(person.email)
        .then(() => {
          toast.textContent = "Email copied";
          use.setAttribute("href", "#i-check");
        })
        .catch(() => { toast.textContent = "Couldn't copy, please select the address"; })
        .finally(() => {
          toast.classList.add("is-visible");
          clearTimeout(t);
          t = setTimeout(() => {
            toast.classList.remove("is-visible");
            use.setAttribute("href", "#i-copy");
            setTimeout(() => (toast.textContent = ""), 300);
          }, 2200);
        });
    });
  }

  function setupForm() {
    const form = $("#contact-form");
    if (!form) return;
    const endpoint = (cfg.contact && cfg.contact.formEndpoint) || "";
    const status = $("[data-form-status]", form);
    const note = $("[data-form-note]", form);
    const submit = $('button[type="submit"]', form);
    if (endpoint && note) note.textContent = "Your message is delivered directly to my inbox.";

    const rules = {
      name: (v) => (v.trim().length < 2 ? "Please enter your name." : ""),
      email: (v) => (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "Please enter a valid email address." : ""),
      message: (v) => (v.trim().length < 10 ? "Please write a message of at least 10 characters." : ""),
    };

    const validateField = (input) => {
      const msg = rules[input.name] ? rules[input.name](input.value) : "";
      const err = $("#" + input.getAttribute("aria-describedby"));
      input.setAttribute("aria-invalid", msg ? "true" : "false");
      if (err) err.textContent = msg;
      return !msg;
    };

    const fields = $$("input[name=name], input[name=email], textarea[name=message]", form);
    fields.forEach((f) => {
      f.addEventListener("blur", () => { if (f.value) validateField(f); });
      f.addEventListener("input", () => { if (f.getAttribute("aria-invalid") === "true") validateField(f); });
    });

    const setStatus = (msg, type) => {
      status.textContent = msg;
      status.className = "form__status" + (type ? " is-" + type : "");
    };

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      setStatus("");
      const invalid = fields.filter((f) => !validateField(f));
      if (invalid.length) {
        invalid[0].focus();
        setStatus("Please fix the highlighted field" + (invalid.length > 1 ? "s" : "") + ".", "error");
        return;
      }
      const data = { name: form.name.value.trim(), email: form.email.value.trim(), message: form.message.value.trim() };

      if (!endpoint) {
        // No backend on GitHub Pages: hand off to the visitor's email client.
        const subject = "Portfolio enquiry from " + data.name;
        const body = data.message + "\n\n— " + data.name + " (" + data.email + ")";
        window.location.href = "mailto:" + person.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
        setStatus("Your email app should now open with the message ready. If nothing happened, email me at " + person.email + ".", "success");
        return;
      }

      if (form._gotcha && form._gotcha.value) return; // bot
      submit.disabled = true;
      setStatus("Sending…");
      fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => {
          if (!res.ok) throw new Error("HTTP " + res.status);
          form.reset();
          fields.forEach((f) => f.removeAttribute("aria-invalid"));
          setStatus("Thank you! Your message was sent. I'll get back to you soon.", "success");
        })
        .catch(() => setStatus("Sorry, the message couldn't be sent. Please email me directly at " + person.email + ".", "error"))
        .finally(() => { submit.disabled = false; });
    });
  }

  /* Resume: if the PDF hasn't been added yet, turn buttons into an honest "request" link */
  function checkResume() {
    const href = links.resume;
    if (!href || location.protocol === "file:" || !window.fetch) return;
    fetch(href, { method: "HEAD", cache: "no-store" })
      .then((res) => { if (!res.ok) throw new Error("missing"); })
      .catch(() => {
        $$("[data-resume]").forEach((a) => {
          a.removeAttribute("download");
          a.href = "mailto:" + person.email + "?subject=" + encodeURIComponent("Resume request");
          const label = a.querySelector("span");
          if (label) label.textContent = label.textContent.includes("Download") ? "Request Resume" : "Resume";
          a.setAttribute("aria-label", "Request resume by email");
          const use = a.querySelector("use");
          if (use) use.setAttribute("href", "#i-mail");
        });
      });
  }

  /* ================================================= BOOT */
  renderSocials();
  renderPersonal();
  renderExpertise();
  renderExperience();
  if (window.Projects) window.Projects.init(cfg);
  renderEducation();
  renderCourse();
  renderTraining();
  renderPhilosophy();

  if (window.Anim) window.Anim.init(cfg);
  setupNav();
  setupMobileMenu();
  setupCopyEmail();
  setupForm();
  checkResume();
})();
