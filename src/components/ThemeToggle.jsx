// src/components/ThemeToggle.jsx
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import {
  THEME_TOGGLE_BUTTON,
  THEME_TOGGLE_ICON_LIGHT,
  THEME_TOGGLE_ICON_DARK
} from '../constants/styles';
import { THEME } from '../constants/messages';

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

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
