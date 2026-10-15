import { useState, useSyncExternalStore } from "react";

import { Moon, Sun } from "./Icons";

export const THEME_STORAGE_KEY = "theme";

export const themes = {
  light: "lilac",
  dark: "dracula",
} as const;

// header background (base-200) of each theme,
// used for the browser's toolbar tint
export const themeColors = {
  light: "#ebe4f1",
  dark: "#232530",
} as const;

export type ThemeStatesType = keyof typeof themes | "auto";
export const themeStates = [
  "light",
  "dark",
  "auto",
] as const satisfies readonly ThemeStatesType[];

const themeLabels: Record<ThemeStatesType, string> = {
  light: "Light",
  dark: "Dark",
  auto: "Auto",
};

export default function ToggleTheme() {
  const [userTheme, setUserTheme] = useState(readStoredTheme);
  const systemTheme = useSystemTheme();

  function changePreference(newPref: ThemeStatesType) {
    setUserTheme(newPref);
    applyTheme(newPref);
  }

  const isLightMode =
    (userTheme === "auto" ? systemTheme : userTheme) === "light";

  return (
    <div className="not-prose dropdown dropdown-start">
      <button
        type="button"
        className="btn btn-square btn-ghost"
        aria-label="Change theme"
      >
        <span
          className={`swap swap-rotate ${isLightMode ? "swap-active" : ""}`}
        >
          <Sun className="swap-on fill-current" aria-hidden="true" />
          <Moon className="swap-off fill-current" aria-hidden="true" />
        </span>
      </button>
      <ul
        // keeps focus inside the dropdown when Safari taps an item
        // oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        className="menu dropdown-content z-1 rounded-box bg-base-100 p-2
          shadow-sm"
      >
        {themeStates.map((state) => (
          <li key={state}>
            <button
              type="button"
              className={userTheme === state ? "menu-active" : undefined}
              aria-pressed={userTheme === state}
              onClick={() => changePreference(state)}
            >
              {themeLabels[state]}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function readStoredTheme(): ThemeStatesType {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  return themeStates.find((state) => state === stored) ?? "auto";
}

function applyTheme(pref: ThemeStatesType) {
  localStorage.setItem(THEME_STORAGE_KEY, pref);
  updateThemeColor(pref);
  if (pref === "auto") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.dataset.theme = themes[pref];
  }
  // daisyUI's dropdown stays open while it has focus
  (document.activeElement as HTMLElement | null)?.blur();
}

function updateThemeColor(pref: ThemeStatesType) {
  document
    .querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')
    .forEach((meta) => {
      const scheme = meta.media.includes("dark") ? "dark" : "light";
      meta.content = themeColors[pref === "auto" ? scheme : pref];
    });
}

const darkQuery = "(prefers-color-scheme: dark)";

function useSystemTheme(): "light" | "dark" {
  const isDark = useSyncExternalStore(
    (callback) => {
      const media = window.matchMedia(darkQuery);
      media.addEventListener("change", callback);
      return () => media.removeEventListener("change", callback);
    },
    () => window.matchMedia(darkQuery).matches,
  );
  return isDark ? "dark" : "light";
}
