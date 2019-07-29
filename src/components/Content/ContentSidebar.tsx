import React, { useCallback } from 'react';
import { connect, DispatchProp } from 'react-redux';
import { RouteComponentProps, generatePath } from 'react-router-dom';
import { Sidebar } from '../Sidebar/Sidebar';
import { BookmarkBtn } from '../BookmarkBtn';
import { PageNo } from './PageNo';
import { KeyboardDialog } from '../KeyboardDialog';
import { IconButton } from '../Mui/IconButton';
import { Snackbar } from '../Mui/Snackbar';
import { RootState, toggleFitToPage } from '../../store';
import { PATHS, MESSAGE } from '../../constants';
import { useBoolean } from '../../utils/useBoolean';
import shortcuts from './shortcuts.json';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import LastPageIcon from '@material-ui/icons/LastPage';

interface MatchParams<T = string> {
  comicID: T;
  chapterID: T;
  pageNo: T;
}

const mapStateToProps = ({ content }: RootState) => ({
  nextId: content.nextId,
  fitToPage: content.fitToPage,
  totalPage: content.images.length
});

type Props = RouteComponentProps<MatchParams>;

function ContentSidebarComponent({
  match,
  history,
  nextId,
  totalPage,
  fitToPage,
  dispatch
}: Props & DispatchProp & ReturnType<typeof mapStateToProps>) {
  const { comicID, chapterID, pageNo } = match.params;
  const [
    snackbarOpened,
    { on: openSnackbar, off: closeSnackbar }
  ] = useBoolean();

  const nextChapter = useCallback(() => {
    if (nextId) {
      history.replace(
        generatePath(PATHS.CONTENT, {
          comicID,
          chapterID: nextId,
          pageNo: 1
        })
      );
    } else {
      openSnackbar();
    }
  }, [history, comicID, nextId, openSnackbar]);

  const totalPageCallback = useCallback(() => {
    dispatch(toggleFitToPage());
  }, [dispatch]);

  const changePageCallback = useCallback(
    (pageNo: number) => {
      history.replace(
        generatePath(PATHS.CONTENT, {
          comicID,
          chapterID,
          pageNo
        })
      );
    },
    [history, comicID, chapterID]
  );

  return (
    <Sidebar className="content-sidebar">
      <IconButton
        title="返回章節列表"
        icon={ArrowBackIcon}
        to={generatePath(PATHS.COMIC, { comicID })}
      />
      <IconButton title="下一集" icon={LastPageIcon} onClick={nextChapter} />
      <KeyboardDialog shortcuts={shortcuts} />
      <BookmarkBtn comicID={comicID} />
      <IconButton
        title={fitToPage ? '預設大小' : '適合頁面'}
        icon={AspectRatioIcon}
        isActive={fitToPage}
        onClick={totalPageCallback}
      />
      <div className="flex-spacer" />
      <PageNo
        pageNo={Number(pageNo)}
        totalPage={totalPage}
        changePage={changePageCallback}
      />
      <Snackbar
        open={snackbarOpened}
        onClose={closeSnackbar}
        message={MESSAGE.LAST_CHAPTER}
      />
    </Sidebar>
  );
}

export const ContentSidebar = connect(mapStateToProps)(ContentSidebarComponent);
