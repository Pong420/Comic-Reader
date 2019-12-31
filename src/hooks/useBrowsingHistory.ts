import { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useRxAsync } from 'use-rx-hooks';
import { getGridData } from '../service';
import {
  useBrowsingHistoryActions,
  browsingHistoryIdsSelector
} from '../store';

interface Props {
  comicID: string;
  chapterID: string;
}

export function useBrowsingHistory({ comicID, chapterID }: Props) {
  const {
    createBrowsingHistory,
    deleteBrowsingHistory,
    updateBrowsingHistory
  } = useBrowsingHistoryActions();

  const isFirst = useSelector(browsingHistoryIdsSelector)[0] === comicID;

  const onSuccess = useCallback(
    (data: Schema$GridData) => {
      updateBrowsingHistory({ chapterID, ...data });
    },
    [updateBrowsingHistory, chapterID]
  );

  const { run } = useRxAsync(getGridData, {
    defer: true,
    onSuccess
  });

  useEffect(() => {
    if (isFirst) {
      updateBrowsingHistory({ comicID, chapterID });
    } else {
      deleteBrowsingHistory({ comicID });
      createBrowsingHistory({ comicID, chapterID });
      run({ comicID });
    }
  }, [
    run,
    deleteBrowsingHistory,
    createBrowsingHistory,
    updateBrowsingHistory,
    comicID,
    chapterID,
    isFirst
  ]);
}
