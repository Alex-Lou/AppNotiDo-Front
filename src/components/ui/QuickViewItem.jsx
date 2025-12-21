// src/components/ui/QuickViewItem.jsx
import { classNames } from '../../utils/classNames';
import {
  QUICK_VIEW_BUTTON_BASE,
  QUICK_VIEW_BUTTON_ACTIVE,
  QUICK_VIEW_BUTTON_INACTIVE,
  QUICK_VIEW_ICON_CONTAINER_BASE,
  QUICK_VIEW_ICON_CONTAINER_ACTIVE,
  QUICK_VIEW_ICON_CONTAINER_INACTIVE
} from '../../constants/styles';

function QuickViewItem({ view, isActive, onClick }) {
  const Icon = view.icon;

  return (
    <button
      onClick={onClick}
      className={classNames(
        QUICK_VIEW_BUTTON_BASE,
        isActive ? QUICK_VIEW_BUTTON_ACTIVE : QUICK_VIEW_BUTTON_INACTIVE
      )}
    >
      <span
        className={classNames(
          QUICK_VIEW_ICON_CONTAINER_BASE,
          isActive ? QUICK_VIEW_ICON_CONTAINER_ACTIVE : QUICK_VIEW_ICON_CONTAINER_INACTIVE
        )}
      >
        <Icon className={view.color} size={18} />
      </span>
      <span>{view.label}</span>
    </button>
  );
}

export default QuickViewItem;
