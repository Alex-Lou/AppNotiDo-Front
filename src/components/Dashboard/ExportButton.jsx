// src/components/Dashboard/ExportButton.jsx
import { useState, useRef, useEffect } from 'react';
import { FiDownload, FiFileText, FiFile } from 'react-icons/fi';
import ExportOption from '../ui/ExportOption';
import { EXPORT_BUTTON, EXPORT_DROPDOWN, EXPORT_SEPARATOR } from '../../constants/styles';

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
        className={EXPORT_BUTTON}
      >
        <FiDownload size={18} />
        <span>Exporter</span>
      </button>

      {/* Menu dropdown */}
      {isOpen && (
        <div className={EXPORT_DROPDOWN}>
          <div className="py-2">
            {/* Option CSV */}
            <ExportOption
              icon={FiFile}
              title="Format CSV"
              subtitle="Tableur Excel"
              variant="csv"
              onClick={() => handleExport('csv')}
            />

            {/* Séparateur */}
            <div className={EXPORT_SEPARATOR}></div>

            {/* Option PDF */}
            <ExportOption
              icon={FiFileText}
              title="Format PDF"
              subtitle="Rapport complet"
              variant="pdf"
              onClick={() => handleExport('pdf')}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ExportButton;
