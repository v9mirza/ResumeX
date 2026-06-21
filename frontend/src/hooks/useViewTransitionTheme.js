import { useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';

export const useViewTransitionTheme = () => {
  const { theme, toggleTheme } = useTheme();

  const transitionToggle = useCallback(
    (e) => {
      const x = e?.clientX ?? window.innerWidth / 2;
      const y = e?.clientY ?? window.innerHeight / 2;
      const maxR = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      document.documentElement.style.setProperty('--vt-x', `${x}px`);
      document.documentElement.style.setProperty('--vt-y', `${y}px`);
      document.documentElement.style.setProperty('--vt-r', `${maxR}px`);

      if (!document.startViewTransition) {
        toggleTheme();
        return;
      }

      document.startViewTransition(() => {
        toggleTheme();
      });
    },
    [toggleTheme]
  );

  return { theme, transitionToggle };
};
