// src/components/Auth/ErrorMessage.jsx
import { AUTH_ERROR_BOX } from '../../constants/styles';

function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className={AUTH_ERROR_BOX}>
      {message}
    </div>
  );
}

export default ErrorMessage;
