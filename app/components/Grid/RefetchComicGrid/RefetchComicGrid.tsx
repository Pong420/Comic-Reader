import React from 'react';
import { useAsync } from 'react-async';
import RefreshIcon from '@material-ui/icons/RefreshRounded';
import { getComicDataAPI } from '../../../apis';
import { GridData } from '../../../../typing';

export interface RefetchComicGridProps {
  comicID: string;
  onFetch: (data: GridData) => void;
}

export function RefetchComicGrid({ comicID, onFetch }: RefetchComicGridProps) {
  const { isLoading, run } = useAsync({
    deferFn: () => getComicDataAPI({ comicID })
  });

  function getComicData() {
    if (!isLoading) {
      run().then(
        ({
          adultOnly,
          chapters,
          finished,
          intro,
          details,
          title,
          ...gridData
        }) => {
          onFetch(gridData);
        }
      );
    }
  }

  return (
    <div className="grid refetch-comic-grid">
      <div className="layer" onClick={getComicData}>
        <RefreshIcon color="primary" />
        <div style={{ marginTop: 10 }}>點擊重新獲取資料</div>
      </div>
    </div>
  );
}
