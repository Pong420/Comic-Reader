import { useEffect } from 'react';
import mousetrap from 'mousetrap';

export function useMouseTrap(
  ...[key, method]: Parameters<MousetrapStatic['bind']>
) {
  useEffect(() => {
    const instance = mousetrap(document.body);
    instance.bind(key, method);
    return () => {
      instance.unbind(key);
    };
  }, [key, method]);
}
