import React, { useMemo } from 'react';
import { connect, DispatchProp } from 'react-redux';
import { IconButton } from './Mui/IconButton';
import { RootState, addBookmark, removeBookmark } from '../store';
import BookmarkIcon from '@material-ui/icons/BookmarkRounded';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorderRounded';

interface Props {
  comicID: string;
}

const mapStateToProps = (state: RootState, { comicID }: Props) => ({
  bookmarked: state.bookmark.ids.includes(comicID)
});

export function BookmarkBtnComponent({
  bookmarked,
  comicID,
  dispatch
}: Props & DispatchProp & ReturnType<typeof mapStateToProps>) {
  const [addBookmarkCallback, removeBookmarkCallback] = useMemo(() => {
    return [
      () => dispatch(addBookmark(comicID)),
      () => dispatch(removeBookmark(comicID))
    ];
  }, [comicID, dispatch]);

  return bookmarked ? (
    <IconButton
      title="取消收藏"
      icon={BookmarkIcon}
      onClick={removeBookmarkCallback}
    />
  ) : (
    <IconButton
      title="收藏漫畫"
      icon={BookmarkBorderIcon}
      onClick={addBookmarkCallback}
    />
  );
}

export const BookmarkBtn = connect(mapStateToProps)(BookmarkBtnComponent);
