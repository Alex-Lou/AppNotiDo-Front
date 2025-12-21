// src/components/ui/FilterSelect.jsx
import { classNames } from '../../utils/classNames';
import { SELECT_BASE, SELECT_STATUS, SELECT_PRIORITY } from '../../constants/styles';

const variants = {
  status: SELECT_STATUS,
  priority: SELECT_PRIORITY
};

function FilterSelect({ variant = 'status', value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={classNames(SELECT_BASE, variants[variant])}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default FilterSelect;
