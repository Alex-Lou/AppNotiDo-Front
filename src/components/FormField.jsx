// components/FormField.jsx
function FormField({ label, emoji, children, required = false }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
        {emoji && `${emoji} `}{label} {required && '*'}
      </label>
      {children}
    </div>
  );
}

export default FormField;
