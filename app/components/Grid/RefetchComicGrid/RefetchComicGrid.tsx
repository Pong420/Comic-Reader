import React from 'react';
import RefreshIcon from '@material-ui/icons/RefreshRounded';

export interface RefetchComicGridProps {
  onFetch: () => void;
}

export function RefetchComicGrid({ onFetch }: RefetchComicGridProps) {
  return (
    <div className="grid refetch-comic-grid">
      <div className="layer" onClick={onFetch}>
        <RefreshIcon color="primary" />
        <div style={{ marginTop: 10 }}>點擊重新獲取資料</div>
      </div>
    </div>
  );
}
