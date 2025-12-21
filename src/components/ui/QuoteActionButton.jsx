// src/components/ui/QuoteActionButton.jsx
import { classNames } from '../../utils/classNames';
import { QUOTE_BUTTON_BASE, QUOTE_BUTTON_DEFAULT, QUOTE_BUTTON_PINNED } from '../../constants/styles';

function QuoteActionButton({ icon: Icon, onClick, title, isPinned = false, emoji }) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        QUOTE_BUTTON_BASE,
        isPinned ? QUOTE_BUTTON_PINNED : QUOTE_BUTTON_DEFAULT
      )}
      title={title}
    >
      {emoji ? emoji : <Icon size={14} />}
    </button>
  );
}

export default QuoteActionButton;
