// src/pages/Auth.jsx
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { AUTH_CONTAINER, AUTH_CARD, AUTH_TITLE, AUTH_SUBTITLE } from '../constants/styles';
import { AUTH } from '../constants/messages';
import AuthTabs from '../components/Auth/AuthTabs';
import ErrorMessage from '../components/Auth/ErrorMessage';
import LoginForm from '../components/Auth/LoginForm';
import RegisterForm from '../components/Auth/RegisterForm';

function Auth({ setUsername }) {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register, isLoading, error, setError } = useAuth(setUsername);

  return (
    <div className={AUTH_CONTAINER}>
      <div className={AUTH_CARD}>
        <h1 className={AUTH_TITLE}>{AUTH.APP_TITLE}</h1>
        <p className={AUTH_SUBTITLE}>{AUTH.APP_SUBTITLE}</p>

        <AuthTabs isLogin={isLogin} setIsLogin={setIsLogin} setError={setError} />
        <ErrorMessage message={error} />

        {isLogin ? (
          <LoginForm onSubmit={login} isLoading={isLoading} />
        ) : (
          <RegisterForm onSubmit={register} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
}

export default Auth;
