import React, { useEffect, useState } from 'react';
import { TitleBar } from 'react-desktop/windows';
import { remote } from 'electron';

const { isMaximized, minimize, maximize, unmaximize, close } = remote.getCurrentWindow();

export function WindowTitleBar() {
  const [minimized, setMaximized] = useState(false); 

  function toggleMaximize() {
    isMaximized() ? unmaximize() : maximize();
  }

  useEffect(()=>{
    function onResize() {
      setMaximized(isMaximized())
    }

    onResize();

    addEventListener("resize", onResize);

    return () => removeEventListener("resize", onResize);
  }, [])

  return (
    <TitleBar
      controls
      title=" "
      theme="dark"
      isMaximized={minimized}
      background="#333"
      onCloseClick={()=>close()}
      onMinimizeClick={()=>minimize()}
      onMaximizeClick={()=>maximize()}
      onRestoreDownClick={()=>toggleMaximize()}
    />
  );
}
