import { useEffect } from 'react';
import mousetrap from 'mousetrap';

type Callback = Parameters<MousetrapStatic['bind']>[1];

export function useMouseTrap(key: string, method: Callback) {
  useEffect(() => {
    const instance = mousetrap(document.body);
    instance.bind(key, method);
    return () => {
      instance.unbind(key);
    };
  }, [key, method]);
}
