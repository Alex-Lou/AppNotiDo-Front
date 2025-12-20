import { useState, useRef, useEffect } from 'react';
import { FiDownload, FiFileText, FiFile } from 'react-icons/fi';

function ExportButton({ onExportCSV, onExportPDF }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fermer le dropdown si on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleExport = (type) => {
    if (type === 'csv') {
      onExportCSV();
    } else if (type === 'pdf') {
      onExportPDF();
    }
    setIsOpen(false);
  };

  return (
    <div className="relative z-50" ref={dropdownRef}>
      {/* Bouton principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 rounded-xl border-2 border-emerald-400/70 bg-gradient-to-r from-emerald-50 to-teal-50 px-5 py-3 text-sm font-bold text-emerald-800 shadow-md transition hover:border-emerald-500 hover:from-emerald-100 hover:to-teal-100 hover:shadow-lg dark:border-emerald-700/70 dark:bg-gradient-to-r dark:from-emerald-900/60 dark:to-teal-900/60 dark:text-emerald-200 dark:hover:border-emerald-600 dark:hover:from-emerald-900/80 dark:hover:to-teal-900/80"
      >
        <FiDownload size={18} />
        <span>Exporter</span>
      </button>

      {/* Menu dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full z-[100] mt-2 w-48 overflow-hidden rounded-xl border-2 border-slate-200/60 bg-white shadow-xl dark:border-stone-700/60 dark:bg-stone-900/95">
          <div className="py-2">
            {/* Option CSV */}
            <button
              onClick={() => handleExport('csv')}
              className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 dark:text-amber-100 dark:hover:from-emerald-900/40 dark:hover:to-teal-900/40"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-800/50 dark:to-teal-800/50">
                <FiFile className="text-emerald-700 dark:text-emerald-300" size={16} />
              </div>
              <div className="text-left">
                <p className="font-bold">Format CSV</p>
                <p className="text-xs text-slate-500 dark:text-amber-300/60">
                  Tableur Excel
                </p>
              </div>
            </button>

            {/* Séparateur */}
            <div className="mx-3 my-1 border-t border-slate-200 dark:border-stone-700"></div>

            {/* Option PDF */}
            <button
              onClick={() => handleExport('pdf')}
              className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-gradient-to-r hover:from-rose-50 hover:to-orange-50 dark:text-amber-100 dark:hover:from-rose-900/40 dark:hover:to-orange-900/40"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-rose-100 to-orange-100 dark:from-rose-800/50 dark:to-orange-800/50">
                <FiFileText className="text-rose-700 dark:text-rose-300" size={16} />
              </div>
              <div className="text-left">
                <p className="font-bold">Format PDF</p>
                <p className="text-xs text-slate-500 dark:text-amber-300/60">
                  Rapport complet
                </p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExportButton;