/* =========================================================================
   ANIMATIONS.JS — lightweight motion system (no dependencies)
   • IntersectionObserver for reveals, counters and active states
   • One passive, rAF-throttled scroll loop for progress, parallax, timeline
   • Pointer effects only on fine pointers; everything respects reduced motion
   ========================================================================= */
(function () {
  "use strict";

  const mq = (q) => window.matchMedia && window.matchMedia(q).matches;
  const reduced = mq("(prefers-reduced-motion: reduce)");
  const finePointer = mq("(hover: hover) and (pointer: fine)");
  const conn = navigator.connection || {};
  const lite =
    reduced ||
    conn.saveData === true ||
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) ||
    (navigator.deviceMemory && navigator.deviceMemory <= 2);
  if (lite) document.documentElement.classList.add("lite");

  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

  /* ------------------------------------------------ word splitting */
  function split(el) {
    if (!el || el.classList.contains("is-split")) return;
    let index = 0;
    const walk = (node) => {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === 3) {
          const parts = child.textContent.split(/(\s+)/);
          const frag = document.createDocumentFragment();
          parts.forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) {
              frag.appendChild(document.createTextNode(" "));
            } else {
              const word = document.createElement("span");
              word.className = "word";
              const inner = document.createElement("span");
              inner.className = "word-inner";
              inner.style.setProperty("--wi", index++);
              inner.textContent = part;
              word.appendChild(inner);
              frag.appendChild(word);
            }
          });
          node.replaceChild(frag, child);
        } else if (child.nodeType === 1) {
          walk(child);
        }
      });
    };
    walk(el);
    el.classList.add("is-split");
  }

  /* ------------------------------------------------ reveal observer */
  let io = null;
  const counters = new Set();

  function reveal(el) {
    el.classList.add("is-in");
    if (el.hasAttribute("data-count")) runCounter(el);
  }

  function observe(root) {
    root = root || document;
    root.querySelectorAll("[data-split]").forEach(split);
    root.querySelectorAll("[data-stagger]").forEach((group) => {
      let i = 0;
      group.querySelectorAll("[data-reveal]").forEach((el) => {
        if (!el.style.getPropertyValue("--i")) el.style.setProperty("--i", i++);
      });
    });

    const targets = root.querySelectorAll(
      "[data-reveal]:not(.is-in), [data-split]:not(.is-in), [data-observe]:not(.is-in), [data-count]:not(.is-in)"
    );

    if (reduced || !("IntersectionObserver" in window)) {
      targets.forEach(reveal);
      return;
    }
    if (!io) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              reveal(entry.target);
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
      );
    }
    targets.forEach((el) => io.observe(el));
  }

  /* ------------------------------------------------ counters */
  function runCounter(el) {
    if (counters.has(el)) return;
    counters.add(el);
    const target = parseInt(el.getAttribute("data-count"), 10);
    if (!target || reduced) {
      el.textContent = String(target || el.textContent);
      return;
    }
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const t = clamp((now - start) / duration, 0, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      el.textContent = String(Math.round(target * eased));
      if (t < 1) requestAnimationFrame(tick);
    };
    el.textContent = "0";
    requestAnimationFrame(tick);
  }

  /* ------------------------------------------------ hero role rotator */
  function roles(list) {
    const track = document.querySelector(".roles__track");
    if (!track || !list || list.length < 2) return;
    track.innerHTML = "";
    const items = list.map((text, i) => {
      const s = document.createElement("span");
      s.className = "roles__item" + (i === 0 ? " is-active" : "");
      s.textContent = text;
      track.appendChild(s);
      return s;
    });
    if (reduced) return;
    let current = 0;
    let timer = null;
    const next = () => {
      const prev = items[current];
      current = (current + 1) % items.length;
      prev.classList.remove("is-active");
      prev.classList.add("is-leaving");
      items[current].classList.remove("is-leaving");
      items[current].classList.add("is-active");
      setTimeout(() => prev.classList.remove("is-leaving"), 650);
    };
    const start = () => { if (!timer) timer = setInterval(next, 2600); };
    const stop = () => { clearInterval(timer); timer = null; };
    // Pause when the hero is off-screen or the tab is hidden.
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop())).observe(track);
    } else start();
    document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
  }

  /* ------------------------------------------------ scroll loop */
  const scrollHandlers = [];
  let ticking = false;
  function onScroll(fn) { scrollHandlers.push(fn); }
  function frame() {
    ticking = false;
    const y = window.scrollY;
    const vh = window.innerHeight;
    for (let i = 0; i < scrollHandlers.length; i++) scrollHandlers[i](y, vh);
  }
  function requestFrame() {
    if (!ticking) { ticking = true; requestAnimationFrame(frame); }
  }

  function setupScroll() {
    const bar = document.querySelector(".scroll-progress span");
    if (bar) {
      onScroll((y, vh) => {
        const max = document.documentElement.scrollHeight - vh;
        bar.style.transform = "scaleX(" + (max > 0 ? clamp(y / max, 0, 1) : 0) + ")";
      });
    }

    const timeline = document.querySelector(".timeline");
    const fill = document.querySelector(".timeline__fill");
    if (timeline && fill) {
      if (reduced) fill.style.transform = "scaleY(1)";
      else onScroll((y, vh) => {
        const r = timeline.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        const p = clamp((vh * 0.62 - r.top) / r.height, 0, 1);
        fill.style.transform = "scaleY(" + p.toFixed(4) + ")";
      });
    }

    // Parallax: only on capable, non-touch, non-reduced devices
    if (!lite && finePointer) {
      const visible = new Set();
      const els = document.querySelectorAll("[data-parallax], [data-parallax-inner]");
      if ("IntersectionObserver" in window) {
        const pio = new IntersectionObserver((entries) => {
          entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
          requestFrame();
        });
        els.forEach((el) => pio.observe(el));
      }
      onScroll((y, vh) => {
        visible.forEach((el) => {
          const inner = el.hasAttribute("data-parallax-inner");
          const factor = parseFloat(el.getAttribute(inner ? "data-parallax-inner" : "data-parallax")) || 0;
          const host = inner ? el.parentElement : el;
          const r = host.getBoundingClientRect();
          let offset = (r.top + r.height / 2 - vh / 2) * factor;
          if (inner) offset = clamp(offset, -r.height * 0.055, r.height * 0.055);
          el.style.transform = "translate3d(0," + offset.toFixed(2) + "px,0)";
        });
      });
    }

    window.addEventListener("scroll", requestFrame, { passive: true });
    window.addEventListener("resize", requestFrame, { passive: true });
    requestFrame();
  }

  /* ------------------------------------------------ pointer effects */
  function setupPointer() {
    if (!finePointer || reduced) return;

    // Magnetic buttons
    document.addEventListener("pointerover", (e) => {
      const el = e.target.closest && e.target.closest(".magnetic");
      if (!el || el._mag) return;
      el._mag = true;
      let rect = null;
      el.addEventListener("pointerenter", () => { rect = el.getBoundingClientRect(); });
      el.addEventListener("pointermove", (ev) => {
        rect = rect || el.getBoundingClientRect();
        const x = ev.clientX - (rect.left + rect.width / 2);
        const y = ev.clientY - (rect.top + rect.height / 2);
        el.style.setProperty("--tx", clamp(x * 0.22, -8, 8).toFixed(1) + "px");
        el.style.setProperty("--ty", clamp(y * 0.3, -6, 6).toFixed(1) + "px");
      });
      el.addEventListener("pointerleave", () => {
        rect = null;
        el.style.setProperty("--tx", "0px");
        el.style.setProperty("--ty", "0px");
      });
      rect = el.getBoundingClientRect();
    });

    // Card spotlight (event delegation, rAF throttled)
    let pending = null;
    let queued = false;
    document.addEventListener("pointermove", (e) => {
      const card = e.target.closest && e.target.closest(".surface");
      if (!card) return;
      pending = { card, x: e.clientX, y: e.clientY };
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        if (!pending) return;
        const r = pending.card.getBoundingClientRect();
        pending.card.style.setProperty("--mx", (pending.x - r.left).toFixed(0) + "px");
        pending.card.style.setProperty("--my", (pending.y - r.top).toFixed(0) + "px");
        pending = null;
      });
    }, { passive: true });
  }

  function init(config) {
    observe(document);
    roles(config && config.roles);
    setupScroll();
    setupPointer();
  }

  window.Anim = { init, observe, onScroll, requestFrame, reduced, lite, finePointer };
})();
