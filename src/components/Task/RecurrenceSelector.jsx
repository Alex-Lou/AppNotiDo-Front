// src/components/Task/RecurrenceSelector.jsx
import { useState, useEffect } from 'react';
import { FiRepeat, FiChevronDown, FiChevronUp, FiX } from 'react-icons/fi';

const RECURRENCE_TYPES = [
  { value: 'NONE', label: 'Pas de récurrence', icon: '➖' },
  { value: 'DAILY', label: 'Quotidienne', icon: '📅' },
  { value: 'WEEKLY', label: 'Hebdomadaire', icon: '📆' },
  { value: 'MONTHLY', label: 'Mensuelle', icon: '🗓️' },
  { value: 'YEARLY', label: 'Annuelle', icon: '🎂' }
];

const DAYS_OF_WEEK = [
  { value: 'MONDAY', label: 'Lun', fullLabel: 'Lundi' },
  { value: 'TUESDAY', label: 'Mar', fullLabel: 'Mardi' },
  { value: 'WEDNESDAY', label: 'Mer', fullLabel: 'Mercredi' },
  { value: 'THURSDAY', label: 'Jeu', fullLabel: 'Jeudi' },
  { value: 'FRIDAY', label: 'Ven', fullLabel: 'Vendredi' },
  { value: 'SATURDAY', label: 'Sam', fullLabel: 'Samedi' },
  { value: 'SUNDAY', label: 'Dim', fullLabel: 'Dimanche' }
];

function RecurrenceSelector({ 
  recurrenceType = 'NONE',
  recurrenceInterval = 1,
  recurrenceDays = '',
  recurrenceDayOfMonth = 1,
  recurrenceEndDate = null,
  onChange 
}) {
  const [isExpanded, setIsExpanded] = useState(recurrenceType !== 'NONE');
  const [selectedDays, setSelectedDays] = useState([]);

  // Parser les jours sélectionnés au chargement
  useEffect(() => {
    if (recurrenceDays) {
      setSelectedDays(recurrenceDays.split(',').filter(d => d.trim()));
    } else {
      setSelectedDays([]);
    }
  }, [recurrenceDays]);

  // Ouvrir automatiquement si récurrence active
  useEffect(() => {
    if (recurrenceType !== 'NONE') {
      setIsExpanded(true);
    }
  }, [recurrenceType]);

  const handleTypeChange = (type) => {
    onChange({
      recurrenceType: type,
      recurrenceInterval: type === 'NONE' ? 1 : recurrenceInterval,
      recurrenceDays: type === 'WEEKLY' ? recurrenceDays : '',
      recurrenceDayOfMonth: type === 'MONTHLY' ? recurrenceDayOfMonth : 1,
      recurrenceEndDate: type === 'NONE' ? null : recurrenceEndDate
    });
  };

  const handleIntervalChange = (interval) => {
    onChange({
      recurrenceType,
      recurrenceInterval: Math.max(1, parseInt(interval) || 1),
      recurrenceDays,
      recurrenceDayOfMonth,
      recurrenceEndDate
    });
  };

  const handleDayToggle = (day) => {
    let newDays;
    if (selectedDays.includes(day)) {
      newDays = selectedDays.filter(d => d !== day);
    } else {
      newDays = [...selectedDays, day];
    }
    setSelectedDays(newDays);
    
    onChange({
      recurrenceType,
      recurrenceInterval,
      recurrenceDays: newDays.join(','),
      recurrenceDayOfMonth,
      recurrenceEndDate
    });
  };

  const handleDayOfMonthChange = (day) => {
    onChange({
      recurrenceType,
      recurrenceInterval,
      recurrenceDays,
      recurrenceDayOfMonth: Math.min(31, Math.max(1, parseInt(day) || 1)),
      recurrenceEndDate
    });
  };

  const handleEndDateChange = (date) => {
    onChange({
      recurrenceType,
      recurrenceInterval,
      recurrenceDays,
      recurrenceDayOfMonth,
      recurrenceEndDate: date || null
    });
  };

  const clearRecurrence = () => {
    onChange({
      recurrenceType: 'NONE',
      recurrenceInterval: 1,
      recurrenceDays: '',
      recurrenceDayOfMonth: 1,
      recurrenceEndDate: null
    });
    setSelectedDays([]);
  };

  const getRecurrenceSummary = () => {
    if (recurrenceType === 'NONE') return null;

    let summary = '';
    const interval = recurrenceInterval || 1;

    switch (recurrenceType) {
      case 'DAILY':
        summary = interval === 1 ? 'Tous les jours' : `Tous les ${interval} jours`;
        break;
      case 'WEEKLY':
        if (selectedDays.length === 0) {
          summary = interval === 1 ? 'Toutes les semaines' : `Toutes les ${interval} semaines`;
        } else {
          const dayLabels = selectedDays.map(d => 
            DAYS_OF_WEEK.find(day => day.value === d)?.label || d
          ).join(', ');
          summary = interval === 1 
            ? `Chaque ${dayLabels}` 
            : `Toutes les ${interval} sem. : ${dayLabels}`;
        }
        break;
      case 'MONTHLY':
        summary = interval === 1 
          ? `Le ${recurrenceDayOfMonth} de chaque mois` 
          : `Le ${recurrenceDayOfMonth} tous les ${interval} mois`;
        break;
      case 'YEARLY':
        summary = interval === 1 ? 'Chaque année' : `Tous les ${interval} ans`;
        break;
      default:
        summary = '';
    }

    return summary;
  };

  const currentType = RECURRENCE_TYPES.find(t => t.value === recurrenceType);

  return (
    <div className="rounded-xl border border-slate-200 dark:border-stone-700 bg-slate-50/50 dark:bg-stone-800/30 overflow-hidden">
      {/* Header */}
      <div 
        className="flex items-center justify-between px-3 py-2.5 bg-slate-100/80 dark:bg-stone-800/60 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <FiRepeat 
            size={16} 
            className={`${recurrenceType !== 'NONE' ? 'text-cyan-500 dark:text-amber-400' : 'text-slate-400 dark:text-stone-500'}`} 
          />
          <span className="text-sm font-semibold text-slate-700 dark:text-amber-200">
            Récurrence
          </span>
          {recurrenceType !== 'NONE' && (
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-700 dark:bg-amber-900/40 dark:text-amber-300">
              {currentType?.icon} {currentType?.label}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {recurrenceType !== 'NONE' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                clearRecurrence();
              }}
              className="p-1 rounded hover:bg-slate-200 dark:hover:bg-stone-700 text-slate-400 hover:text-rose-500 dark:text-stone-500 dark:hover:text-rose-400 transition-colors"
              title="Supprimer la récurrence"
            >
              <FiX size={14} />
            </button>
          )}
          {isExpanded ? (
            <FiChevronUp size={16} className="text-slate-400 dark:text-stone-500" />
          ) : (
            <FiChevronDown size={16} className="text-slate-400 dark:text-stone-500" />
          )}
        </div>
      </div>

      {/* Résumé (si fermé et récurrence active) */}
      {!isExpanded && recurrenceType !== 'NONE' && (
        <div className="px-3 py-2 text-xs text-slate-600 dark:text-amber-300/70 border-t border-slate-200/50 dark:border-stone-700/50">
          🔄 {getRecurrenceSummary()}
        </div>
      )}

      {/* Contenu */}
      {isExpanded && (
        <div className="p-3 space-y-4 border-t border-slate-200/50 dark:border-stone-700/50">
          {/* Type de récurrence */}
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-amber-300/70 mb-2">
              Type de récurrence
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {RECURRENCE_TYPES.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => handleTypeChange(type.value)}
                  className={`
                    px-3 py-2 rounded-lg text-xs font-medium transition-all
                    ${recurrenceType === type.value
                      ? 'bg-cyan-500 text-white dark:bg-amber-500 dark:text-stone-900 shadow-md'
                      : 'bg-white dark:bg-stone-800 text-slate-600 dark:text-amber-200 border border-slate-200 dark:border-stone-700 hover:border-cyan-300 dark:hover:border-amber-600'
                    }
                  `}
                >
                  <span className="mr-1">{type.icon}</span>
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Options spécifiques selon le type */}
          {recurrenceType !== 'NONE' && (
            <>
              {/* Intervalle */}
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-amber-300/70 mb-2">
                  Répéter tous les
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={recurrenceInterval}
                    onChange={(e) => handleIntervalChange(e.target.value)}
                    className="w-16 px-2 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-slate-700 dark:text-amber-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 dark:focus:ring-amber-500"
                  />
                  <span className="text-sm text-slate-600 dark:text-amber-200">
                    {recurrenceType === 'DAILY' && (recurrenceInterval > 1 ? 'jours' : 'jour')}
                    {recurrenceType === 'WEEKLY' && (recurrenceInterval > 1 ? 'semaines' : 'semaine')}
                    {recurrenceType === 'MONTHLY' && 'mois'}
                    {recurrenceType === 'YEARLY' && (recurrenceInterval > 1 ? 'ans' : 'an')}
                  </span>
                </div>
              </div>

              {/* Jours de la semaine (pour WEEKLY) */}
              {recurrenceType === 'WEEKLY' && (
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-amber-300/70 mb-2">
                    Jours de répétition
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {DAYS_OF_WEEK.map((day) => (
                      <button
                        key={day.value}
                        type="button"
                        onClick={() => handleDayToggle(day.value)}
                        className={`
                          w-10 h-10 rounded-lg text-xs font-bold transition-all
                          ${selectedDays.includes(day.value)
                            ? 'bg-cyan-500 text-white dark:bg-amber-500 dark:text-stone-900 shadow-md'
                            : 'bg-white dark:bg-stone-800 text-slate-600 dark:text-amber-200 border border-slate-200 dark:border-stone-700 hover:border-cyan-300 dark:hover:border-amber-600'
                          }
                        `}
                        title={day.fullLabel}
                      >
                        {day.label}
                      </button>
                    ))}
                  </div>
                  {selectedDays.length === 0 && (
                    <p className="mt-1.5 text-[10px] text-slate-400 dark:text-stone-500 italic">
                      Si aucun jour sélectionné, répète le même jour que l'échéance
                    </p>
                  )}
                </div>
              )}

              {/* Jour du mois (pour MONTHLY) */}
              {recurrenceType === 'MONTHLY' && (
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-amber-300/70 mb-2">
                    Jour du mois
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-600 dark:text-amber-200">Le</span>
                    <input
                      type="number"
                      min="1"
                      max="31"
                      value={recurrenceDayOfMonth}
                      onChange={(e) => handleDayOfMonthChange(e.target.value)}
                      className="w-16 px-2 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-slate-700 dark:text-amber-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 dark:focus:ring-amber-500"
                    />
                    <span className="text-sm text-slate-600 dark:text-amber-200">de chaque mois</span>
                  </div>
                  {recurrenceDayOfMonth > 28 && (
                    <p className="mt-1.5 text-[10px] text-amber-600 dark:text-amber-400">
                      ⚠️ Si le jour n'existe pas (ex: 31 février), le dernier jour du mois sera utilisé
                    </p>
                  )}
                </div>
              )}

              {/* Date de fin optionnelle */}
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-amber-300/70 mb-2">
                  Date de fin (optionnel)
                </label>
                <input
                  type="date"
                  value={recurrenceEndDate ? recurrenceEndDate.split('T')[0] : ''}
                  onChange={(e) => handleEndDateChange(e.target.value ? new Date(e.target.value).toISOString() : null)}
                  className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-slate-700 dark:text-amber-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 dark:focus:ring-amber-500"
                />
                <p className="mt-1.5 text-[10px] text-slate-400 dark:text-stone-500">
                  La récurrence s'arrêtera après cette date
                </p>
              </div>

              {/* Résumé */}
              {getRecurrenceSummary() && (
                <div className="p-2.5 rounded-lg bg-cyan-50 dark:bg-amber-900/20 border border-cyan-200 dark:border-amber-800/50">
                  <p className="text-xs font-medium text-cyan-700 dark:text-amber-300">
                    🔄 {getRecurrenceSummary()}
                    {recurrenceEndDate && (
                      <span className="block mt-1 text-[10px] text-cyan-600 dark:text-amber-400">
                        Jusqu'au {new Date(recurrenceEndDate).toLocaleDateString('fr-FR')}
                      </span>
                    )}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default RecurrenceSelector;