// src/components/Auth/LoginForm.jsx
import { useState } from 'react';
import { AUTH_FORM, AUTH_LABEL, AUTH_INPUT, AUTH_SUBMIT_BUTTON } from '../../constants/styles';
import { AUTH } from '../../constants/messages';

function LoginForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData.username, formData.password);
  };

  return (
    <form onSubmit={handleSubmit} className={AUTH_FORM}>
      <div>
        <label className={AUTH_LABEL}>{AUTH.LABEL_USERNAME}</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className={AUTH_INPUT}
          placeholder={AUTH.PLACEHOLDER_USERNAME}
          required
        />
      </div>

      <div>
        <label className={AUTH_LABEL}>{AUTH.LABEL_PASSWORD}</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={AUTH_INPUT}
          placeholder={AUTH.PLACEHOLDER_PASSWORD}
          required
        />
      </div>

      <button type="submit" disabled={isLoading} className={AUTH_SUBMIT_BUTTON}>
        {isLoading ? AUTH.BUTTON_LOGIN_LOADING : AUTH.BUTTON_LOGIN}
      </button>
    </form>
  );
}

export default LoginForm;
