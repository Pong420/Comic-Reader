import React, { Suspense, lazy } from 'react';

const WindowTittleBar = lazy(() => import('./WindowTitleBar'));

export function TitleBar() {
  if (process.platform === 'win32') {
    return (
      <Suspense fallback={null}>
        <WindowTittleBar />
      </Suspense>
    );
  }

  return <div className="title-bar" />;
}
