// src/components/Sidebar/QuickViews.jsx
import { Star, Calendar, Clock, CheckCircle } from 'lucide-react';
import QuickViewItem from '../ui/QuickViewItem';
import { QUICK_VIEWS_NAV, QUICK_VIEWS_TITLE } from '../../constants/styles';

const views = [
  { id: 'important', label: 'Importantes', icon: Star, color: 'text-amber-600 dark:text-amber-400' },
  { id: 'today', label: "Aujourd'hui", icon: Calendar, color: 'text-cyan-600 dark:text-cyan-400' },
  { id: 'week', label: 'Cette semaine', icon: Clock, color: 'text-teal-600 dark:text-teal-400' },
  { id: 'completed', label: 'Complétées', icon: CheckCircle, color: 'text-emerald-600 dark:text-emerald-400' },
];

function QuickViews({ onViewClick, activeView }) {
  return (
    <nav className={QUICK_VIEWS_NAV}>
      <h3 className={QUICK_VIEWS_TITLE}>
        Vues rapides
      </h3>
      {views.map((view) => (
        <QuickViewItem
          key={view.id}
          view={view}
          isActive={activeView === view.id}
          onClick={() => onViewClick(view.id)}
        />
      ))}
    </nav>
  );
}

export default QuickViews;
