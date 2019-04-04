import { useEffect, useState } from 'react';

const checkFullscreen = () => window.outerHeight === screen.height;

export function useFullscreen(enable: boolean) {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    if (enable) {
      const onResize = () => setIsFullscreen(checkFullscreen());

      onResize();

      window.addEventListener('resize', onResize);

      return () => window.removeEventListener('resize', onResize);
    }
  }, [enable]);

  return isFullscreen;
}
