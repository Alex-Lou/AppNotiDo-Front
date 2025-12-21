// src/components/ui/StatCard.jsx
import { classNames } from '../../utils/classNames';
import { 
  STAT_CARD_BASE, 
  STAT_CARD_HALO,
  STAT_CARD_LABEL, 
  STAT_CARD_VALUE, 
  STAT_CARD_SUBTITLE,
  STAT_CARD_VARIANTS
} from '../../constants/styles';

function StatCard({ type, label, value, subtitle, onClick, isActive }) {
  const variant = STAT_CARD_VARIANTS[type];

  return (
    <button
      onClick={onClick}
      className={classNames(
        STAT_CARD_BASE,
        variant.bg,
        isActive ? variant.ringActive : variant.ringInactive
      )}
    >
      <div className={classNames(STAT_CARD_HALO, variant.halo)} />
      
      <p className={classNames(STAT_CARD_LABEL, variant.label)}>
        {label}
      </p>
      
      <p className={classNames(STAT_CARD_VALUE, variant.value)}>
        {value}
      </p>
      
      <p className={classNames(STAT_CARD_SUBTITLE, variant.subtitle)}>
        {subtitle}
      </p>
    </button>
  );
}

export default StatCard;
