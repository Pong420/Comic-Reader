import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { IconButton } from './Mui/IconButton';
import { RootState, BookmarkActionCreators } from '../store';
import BookmarkIcon from '@material-ui/icons/BookmarkRounded';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorderRounded';

const mapStateToProps = (
  { bookmark }: RootState,
  ownProps: { comicID: string }
) => ({ ...bookmark, ...ownProps });

const mapDispathToProps = (dispath: Dispatch) =>
  bindActionCreators(BookmarkActionCreators, dispath);

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispathToProps>;

export const BookmarkBtn = connect(
  mapStateToProps,
  mapDispathToProps
)(({ comicID, bookmark, addBookmark, removeBookmark }: Props) => {
  const bookmarked = !!new Map(bookmark).get(comicID);

  return bookmarked ? (
    <IconButton
      title="取消收藏"
      icon={BookmarkIcon}
      onClick={() => removeBookmark(comicID)}
    />
  ) : (
    <IconButton
      title="收藏漫畫"
      icon={BookmarkBorderIcon}
      onClick={() => addBookmark(comicID)}
    />
  );
});
