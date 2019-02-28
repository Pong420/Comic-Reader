import React from 'react';
import { TitleBar } from 'react-desktop/windows';
import { remote } from 'electron';

export function WindowTitleBar() {
  const { isMaximized, minimize, maximize, close } = remote.getCurrentWindow();

  function toggleMaximize() {
    isMaximized() ? minimize() : maximize();
  }

  return (
    <TitleBar
      controls
      title=" "
      theme="dark"
      isMaximized={isMaximized()}
      background="#333"
      onCloseClick={close}
      onMinimizeClick={minimize}
      onMaximizeClick={maximize}
      onRestoreDownClick={toggleMaximize}
    />
  );
}
