import React, { Suspense, lazy } from 'react';
import { WIN_OS, FRAME_LESS } from '../../constants';

const WindowTittleBar = lazy(() => import('./WindowTitleBar'));

export function TitleBar() {
  if (WIN_OS) {
    return (
      <Suspense fallback={<div className="window-title-bar-placeholder" />}>
        <WindowTittleBar />
      </Suspense>
    );
  }

  if (FRAME_LESS) {
    return <div className="title-bar" />;
  }

  return <div />;
}
