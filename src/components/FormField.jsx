// src/components/FormField.jsx
import { FORM_FIELD_LABEL } from '../constants/styles';

function FormField({ label, emoji, children, required = false }) {
  return (
    <div>
      <label className={FORM_FIELD_LABEL}>
        {emoji && `${emoji} `}{label} {required && '*'}
      </label>
      {children}
    </div>
  );
}

export default FormField;
