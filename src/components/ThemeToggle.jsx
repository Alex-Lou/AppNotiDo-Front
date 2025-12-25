// src/components/ThemeToggle.jsx
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import {
  THEME_TOGGLE_BUTTON,
  THEME_TOGGLE_ICON_LIGHT,
  THEME_TOGGLE_ICON_DARK,
  SIDEBAR_ICON_BUTTON
} from '../constants/styles';
import { THEME } from '../constants/messages';

function ThemeToggle({ iconOnly = false }) {
  const { isDark, toggleTheme } = useTheme();

  if (iconOnly) {
    return (
      <button
        onClick={toggleTheme}
        className={SIDEBAR_ICON_BUTTON}
        title={isDark ? THEME.TITLE_SWITCH_TO_LIGHT : THEME.TITLE_SWITCH_TO_DARK}
      >
        {isDark ? (
          <FiSun className="text-amber-400" size={18} />
        ) : (
          <FiMoon className="text-slate-600 dark:text-sky-300" size={18} />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={THEME_TOGGLE_BUTTON}
      title={isDark ? THEME.TITLE_SWITCH_TO_LIGHT : THEME.TITLE_SWITCH_TO_DARK}
    >
      {isDark ? (
        <>
          <FiSun className={THEME_TOGGLE_ICON_LIGHT} />
          <span>{THEME.LABEL_LIGHT_MODE}</span>
        </>
      ) : (
        <>
          <FiMoon className={THEME_TOGGLE_ICON_DARK} />
          <span>{THEME.LABEL_DARK_MODE}</span>
        </>
      )}
    </button>
  );
}

export default ThemeToggle;