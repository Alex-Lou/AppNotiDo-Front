// src/components/Auth/AuthTabs.jsx
import { AUTH_TABS_CONTAINER, AUTH_TAB_BASE, AUTH_TAB_ACTIVE, AUTH_TAB_INACTIVE } from '../../constants/styles';
import { AUTH } from '../../constants/messages';

function AuthTabs({ isLogin, setIsLogin, setError }) {
  return (
    <div className={AUTH_TABS_CONTAINER}>
      <button
        onClick={() => {
          setIsLogin(true);
          setError('');
        }}
        className={`${AUTH_TAB_BASE} ${isLogin ? AUTH_TAB_ACTIVE : AUTH_TAB_INACTIVE}`}
      >
        {AUTH.TAB_LOGIN}
      </button>
      <button
        onClick={() => {
          setIsLogin(false);
          setError('');
        }}
        className={`${AUTH_TAB_BASE} ${!isLogin ? AUTH_TAB_ACTIVE : AUTH_TAB_INACTIVE}`}
      >
        {AUTH.TAB_REGISTER}
      </button>
    </div>
  );
}

export default AuthTabs;
