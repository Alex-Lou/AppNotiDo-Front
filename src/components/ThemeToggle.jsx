import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
        inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium
        border border-slate-700/80 bg-slate-900/80 text-slate-200
        shadow-sm backdrop-blur-sm transition-all duration-150
        hover:border-sky-500/60 hover:bg-slate-800
      "
      title={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
    >
      {isDark ? (
        <>
          <FiSun className="h-4 w-4 text-amber-300" />
          <span>Mode clair</span>
        </>
      ) : (
        <>
          <FiMoon className="h-4 w-4 text-sky-300" />
          <span>Mode sombre</span>
        </>
      )}
    </button>
  );
}

export default ThemeToggle;
