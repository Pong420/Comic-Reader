import React from 'react';
import { useAsync } from 'react-async';
import IconButton from '@material-ui/core/IconButton';
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

  return (
    <div className="grid refetch-comic-grid">
      <div className="refetch-comic-grid-content">
        <IconButton
          onClick={() => {
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
          }}
        >
          <RefreshIcon color="primary" />
        </IconButton>
      </div>
    </div>
  );
}
