(function () {
  const STORAGE_KEY = "sc-theme";

  function getPreferredTheme() {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") {
      return stored;
    }
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  }

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);
  }

  function createToggleButton(currentTheme) {
    const nav = document.querySelector(".site-nav");
    if (!nav) return;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "theme-toggle";
    btn.setAttribute("aria-label", "Toggle color theme");
    btn.setAttribute("aria-pressed", currentTheme === "dark" ? "true" : "false");

    const iconSpan = document.createElement("span");
    iconSpan.className = "theme-toggle-icon";
    iconSpan.textContent = currentTheme === "dark" ? "🌙" : "☀️";

    const textSpan = document.createElement("span");
    textSpan.textContent = currentTheme === "dark" ? "Dark" : "Light";

    btn.append(iconSpan, textSpan);
    nav.appendChild(btn);

    btn.addEventListener("click", () => {
      const current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
      const next = current === "dark" ? "light" : "dark";

      function actuallyToggle() {
        applyTheme(next);

        btn.setAttribute("aria-pressed", next === "dark" ? "true" : "false");
        iconSpan.textContent = next === "dark" ? "🌙" : "☀️";
        textSpan.textContent = next === "dark" ? "Dark" : "Light";
      }

      if (!document.startViewTransition) {
        actuallyToggle();
        return;
      }

      document.startViewTransition(() => {
        actuallyToggle();
      });
    });
  }
  document.addEventListener("DOMContentLoaded", () => {
    const theme = getPreferredTheme();
    applyTheme(theme);
    createToggleButton(theme);
  });
})();
