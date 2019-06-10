import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { RouteComponentProps, generatePath } from 'react-router-dom';
import { Sidebar } from '../Sidebar/Sidebar';
import { BookmarkBtn } from '../BookmarkBtn';
import { PageNo } from './PageNo';
import { IconButton } from '../Mui/IconButton';
import { Snackbar } from '../Mui/Snackbar';
import { RootState, toggleFitToPage } from '../../store';
import { PATHS, MESSAGE } from '../../constants';
import { useBoolean } from '../../utils/useBoolean';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import LastPageIcon from '@material-ui/icons/LastPage';

interface MatchParams {
  comicID: string;
  chapterID: string;
  pageNo: string;
}

const mapStateToProps = ({ content }: RootState) => ({
  ...content
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ toggleFitToPage }, dispatch);

type Props = RouteComponentProps<MatchParams> &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

function ContentSidebarComponent({
  match,
  history,
  nextId,
  totalPage,
  fitToPage,
  toggleFitToPage
}: Props) {
  const { comicID, chapterID, pageNo } = match.params;
  const [snackbarOpend, snackbar] = useBoolean();

  const nextChapter = () => {
    if (nextId) {
      history.replace(
        generatePath(PATHS.CONTENT, {
          comicID,
          chapterID: nextId,
          pageNo: 1
        })
      );
    } else {
      snackbar.on();
    }
  };

  return (
    <Sidebar className="content-sidebar">
      <IconButton
        title="返回章節列表"
        icon={ArrowBackIcon}
        to={generatePath(PATHS.COMIC, { comicID })}
      />
      <IconButton title="下一集" icon={LastPageIcon} onClick={nextChapter} />
      <BookmarkBtn comicID={comicID} />
      <IconButton
        title={fitToPage ? '預設大小' : '適合頁面'}
        icon={AspectRatioIcon}
        isActive={fitToPage}
        onClick={() => toggleFitToPage()}
      />
      <div className="flex-spacer" />
      <PageNo
        pageNo={Number(pageNo)}
        totalPage={totalPage}
        changePage={pageNo =>
          history.replace(
            generatePath(PATHS.CONTENT, {
              comicID,
              chapterID,
              pageNo
            })
          )
        }
      />
      <Snackbar
        open={snackbarOpend}
        onClose={snackbar.off}
        message={MESSAGE.LAST_CHAPTER}
      />
    </Sidebar>
  );
}

export const ContentSidebar = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentSidebarComponent);
