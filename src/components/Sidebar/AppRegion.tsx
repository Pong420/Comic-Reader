import React, { useState, useEffect } from 'react';
import { TitleBar as MacOSTitleBar } from 'react-desktop/macOs';
import { remote } from 'electron';

const {
  isMaximized,
  isFullScreen,
  setFullScreen,
  minimize,
  close
} = remote.getCurrentWindow();

function toggleMaximize() {
  setFullScreen(!isFullScreen());
}

export function AppRegion() {
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
      {/* {process.platform !== 'darwin' && ( */}
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
      {/* )} */}
    </div>
  );
}
