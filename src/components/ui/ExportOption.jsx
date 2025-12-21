// src/components/ui/ExportOption.jsx
import { classNames } from '../../utils/classNames';
import { 
  EXPORT_OPTION_BASE, 
  EXPORT_OPTION_CSV, 
  EXPORT_OPTION_PDF,
  EXPORT_ICON_CONTAINER,
  EXPORT_ICON_CSV,
  EXPORT_ICON_PDF,
  EXPORT_OPTION_TITLE,
  EXPORT_OPTION_SUBTITLE
} from '../../constants/styles';

const variants = {
  csv: {
    hover: EXPORT_OPTION_CSV,
    icon: EXPORT_ICON_CSV,
    iconColor: 'text-emerald-700 dark:text-emerald-300'
  },
  pdf: {
    hover: EXPORT_OPTION_PDF,
    icon: EXPORT_ICON_PDF,
    iconColor: 'text-rose-700 dark:text-rose-300'
  }
};

function ExportOption({ icon: Icon, title, subtitle, variant, onClick }) {
  const variantStyles = variants[variant];

  return (
    <button
      onClick={onClick}
      className={classNames(EXPORT_OPTION_BASE, variantStyles.hover)}
    >
      <div className={classNames(EXPORT_ICON_CONTAINER, variantStyles.icon)}>
        <Icon className={variantStyles.iconColor} size={16} />
      </div>
      <div className="text-left">
        <p className={EXPORT_OPTION_TITLE}>{title}</p>
        <p className={EXPORT_OPTION_SUBTITLE}>{subtitle}</p>
      </div>
    </button>
  );
}

export default ExportOption;
