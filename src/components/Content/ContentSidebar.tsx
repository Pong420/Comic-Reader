import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { RouteComponentProps, generatePath } from 'react-router-dom';
import { Sidebar } from '../Sidebar/Sidebar';
import { IconButton } from '../Mui/IconButton';
import { BookmarkBtn } from '../BookmarkBtn';
import { PageNo } from './PageNo';
import { RootState, toggleFitToPage } from '../../store';
import { PATHS } from '../../constants';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import SkipNextIcon from '@material-ui/icons/SkipNextRounded';

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

  const nextChapter = nextId
    ? generatePath(PATHS.CONTENT, {
        comicID,
        chapterID: nextId,
        pageNo: 1
      })
    : undefined;

  return (
    <Sidebar className="content-sidebar">
      <IconButton
        title="返回章節列表"
        icon={ArrowBackIcon}
        to={generatePath(PATHS.COMIC, { comicID })}
      />
      <IconButton title="下一集" icon={SkipNextIcon} to={nextChapter} />
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
    </Sidebar>
  );
}

export const ContentSidebar = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentSidebarComponent);
