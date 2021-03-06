import React, { useState, useEffect } from 'react';
import { TitleBar as MacOSTitleBar } from 'react-desktop/macOs';

const {
  isMaximized,
  isFullScreen,
  setFullScreen,
  minimize,
  close
} = window.getCurrentWindow();

function toggleMaximize() {
  setFullScreen(!isFullScreen());
}

export const AppRegion = React.memo(() => {
  const [isFullscreen, setIsFullscreen] = useState(isMaximized());

  useEffect(() => {
    function onResize() {
      setIsFullscreen(isMaximized() || isFullScreen());
    }

    onResize();

    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div className="app-region">
      <MacOSTitleBar
        title=" "
        inset
        controls
        transparent
        isFullscreen={isFullscreen}
        onCloseClick={() => close()}
        onMinimizeClick={() => minimize()}
        onResizeClick={() => toggleMaximize()}
      />
    </div>
  );
});
