// src/components/ui/IconButton.jsx
import { ICON_BUTTON_BASE, ICON_BUTTON_DANGER, ICON_BUTTON_PRIMARY, ICON_BUTTON_SUCCESS } from '../../constants/styles';
import { classNames } from '../../utils/classNames';

const variants = {
  danger: ICON_BUTTON_DANGER,
  primary: ICON_BUTTON_PRIMARY,
  success: ICON_BUTTON_SUCCESS
};

function IconButton({ variant = 'primary', children, className = '', title, ...props }) {
  return (
    <button 
      className={classNames(ICON_BUTTON_BASE, variants[variant], className)}
      title={title}
      {...props}
    >
      {children}
    </button>
  );
}

export default IconButton;
