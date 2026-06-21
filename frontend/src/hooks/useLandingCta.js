import { useAuth } from '../context/AuthContext';

export const useLandingCta = () => {
  const { user } = useAuth();
  if (user) {
    return { to: '/dashboard', label: 'Go to dashboard', heroLabel: 'Go to dashboard' };
  }
  return { to: '/register', label: 'Get started free', heroLabel: 'Build my resume' };
};
