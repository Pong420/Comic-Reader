import React, { Suspense, lazy } from 'react';

const WindowTittleBar = lazy(() => import('./WindowTitleBar'));

export function TitleBar() {
  if (process.platform !== 'darwin') {
    return (
      <Suspense fallback={<div className="window-title-bar-placeholder"></div>}>
        <WindowTittleBar />
      </Suspense>
    );
  }

  return <div className="title-bar" />;
}
