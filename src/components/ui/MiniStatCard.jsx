// src/components/ui/MiniStatCard.jsx
import { MINI_STAT_CARD, MINI_STAT_SUCCESS, MINI_STAT_WARNING, MINI_STAT_LABEL, MINI_STAT_VALUE } from '../../constants/styles';
import { classNames } from '../../utils/classNames';

const variants = {
  success: MINI_STAT_SUCCESS,
  warning: MINI_STAT_WARNING
};

function MiniStatCard({ icon: Icon, label, value, variant = 'success', iconColor }) {
  return (
    <div className={classNames(MINI_STAT_CARD, variants[variant])}>
      <Icon className={iconColor} size={18} />
      <div>
        <p className={MINI_STAT_LABEL}>
          {label}
        </p>
        <p className={MINI_STAT_VALUE}>
          {value}
        </p>
      </div>
    </div>
  );
}

export default MiniStatCard;
