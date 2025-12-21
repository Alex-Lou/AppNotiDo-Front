// src/components/Auth/RegisterForm.jsx
import { useState } from 'react';
import { AUTH_FORM, AUTH_LABEL, AUTH_INPUT, AUTH_SUBMIT_BUTTON } from '../../constants/styles';
import { AUTH } from '../../constants/messages';

function RegisterForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData.username, formData.email, formData.password, formData.confirmPassword);
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
        <label className={AUTH_LABEL}>{AUTH.LABEL_EMAIL}</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={AUTH_INPUT}
          placeholder={AUTH.PLACEHOLDER_EMAIL}
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
          minLength={6}
        />
      </div>

      <div>
        <label className={AUTH_LABEL}>{AUTH.LABEL_CONFIRM_PASSWORD}</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={AUTH_INPUT}
          placeholder={AUTH.PLACEHOLDER_PASSWORD}
          required
          minLength={6}
        />
      </div>

      <button type="submit" disabled={isLoading} className={AUTH_SUBMIT_BUTTON}>
        {isLoading ? AUTH.BUTTON_REGISTER_LOADING : AUTH.BUTTON_REGISTER}
      </button>
    </form>
  );
}

export default RegisterForm;
