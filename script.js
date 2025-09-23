// Modal (page-like) controls for About panel
(() => {
  const aboutBtn = document.getElementById("about-btn");
  const modal = document.getElementById("about-modal");
  const backdrop = modal && modal.querySelector(".modal-backdrop");
  const panel = modal && modal.querySelector(".modal-panel");
  const closeBtn = modal && modal.querySelector(".modal-close");
  const iframe = modal && modal.querySelector("iframe");

  const focusableSelector =
    'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';
  let lastFocused = null;

  function openModal() {
    if (!modal) return;
    lastFocused = document.activeElement;
    modal.setAttribute("aria-hidden", "false");
    // ensure iframe points to about.html (in case it was changed)
    if (
      iframe &&
      (!iframe.getAttribute("src") ||
        iframe.getAttribute("src") !== "./about.html")
    ) {
      iframe.setAttribute("src", "./about.html");
    }
    document.body.style.overflow = "hidden";
    // small timeout to allow CSS transition
    window.requestAnimationFrame(() => {
      panel && panel.focus();
    });
    document.addEventListener("keydown", onKeyDown);
    trapFocus();
  }

  function closeModal() {
    if (!modal) return;
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocused && typeof lastFocused.focus === "function")
      lastFocused.focus();
    document.removeEventListener("keydown", onKeyDown);
  }

  function onKeyDown(e) {
    if (e.key === "Escape") {
      closeModal();
      return;
    }

    if (e.key === "Tab") {
      const focusables = Array.from(panel.querySelectorAll(focusableSelector));
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  function trapFocus() {
    const focusables = panel.querySelectorAll(focusableSelector);
    if (focusables.length) {
      focusables[0].focus();
    } else {
      // ensure panel is focusable
      panel.setAttribute("tabindex", "-1");
      panel.focus();
    }
  }

  if (aboutBtn) {
    aboutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();
    });
  }

  if (backdrop) backdrop.addEventListener("click", closeModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  // ensure modal starts hidden
  if (modal) modal.setAttribute("aria-hidden", "true");
})();
