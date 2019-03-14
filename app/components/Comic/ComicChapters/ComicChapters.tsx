import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, generatePath } from 'react-router-dom';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import red from '@material-ui/core/colors/red';
import NewIcon from '@material-ui/icons/FiberNewOutlined';
import WarningIcon from '@material-ui/icons/WarningRounded';
import LastVisitIcon from '@material-ui/icons/LocationOnRounded';
import { RootState, BrowsingHistoryState } from '../../../store';
import { Chapters, ChapterList } from '../../../../typing';
import PATH from '../../../paths.json';

export interface ChapterProps {
  comicID: string;
  chapters: Chapters;
  adultOnly: boolean;
}

const styles = () =>
  createStyles({
    icon: {
      alignSelf: 'flex-start',
      color: red[500],
      fontSize: 30
    },
    warning: {
      fontSize: 60,
      marginBottom: 10
    }
  });

const IS_ADULT = 'isAdult';

const chapterTypeMap = new Map<string, number>();

function mapStateToProps({ browsingHistory }: RootState, ownProps: any) {
  return { ...browsingHistory, ...ownProps };
}

function ComicChaptersComponent({
  comicID,
  adultOnly,
  chapters = {},
  classes,
  browsingHistory
}: ChapterProps & BrowsingHistoryState & WithStyles<typeof styles>) {
  const chaptersEntries = Object.entries(chapters).sort(
    ([, l1], [, l2]) => l2.length - l1.length
  );
  const [currentChapter, setCurrentChapter] = useState(
    chapterTypeMap.get(comicID) || 0
  );
  const [showChapters, setShowChapters] = useState(
    adultOnly ? localStorage.getItem(IS_ADULT) === '1' : true
  );
  const mappedBrowsingHistory = new Map(browsingHistory);
  const histroy = mappedBrowsingHistory.get(comicID);

  const ChapterType = () => {
    return (
      <div className="chapter-types">
        {chaptersEntries.map(([chapterType], index: number) => {
          const active = currentChapter === index ? 'active' : '';
          return (
            <div
              key={index}
              className={`type ${active}`}
              onClick={() => {
                setCurrentChapter(index);
                chapterTypeMap.set(comicID, index);
              }}
            >
              <div className="label">{chapterType}</div>
            </div>
          );
        })}
      </div>
    );
  };

  const ChapterList = ({ 1: chapterList = [] }: [string, ChapterList]) => (
    <div className="chapters-list">
      {chapterList.map(({ chapterID, title, isNew }) => {
        const chapterIDs = histroy ? histroy.chapterIDs : [];
        const lastVisitChapter = chapterIDs.includes(chapterID);
        const Icon = lastVisitChapter ? LastVisitIcon : isNew ? NewIcon : null;
        const to = generatePath(PATH.CONTENT, {
          comicID,
          chapterID,
          pageNo: 1
        });

        return (
          <Link to={to} className="chapter-item" key={chapterID}>
            {title}
            {Icon && <Icon className={classes.icon} color="inherit" />}
          </Link>
        );
      })}
    </div>
  );

  const Warning = () => (
    <div className="warning">
      <WarningIcon className={classes.warning} />
      漫畫已被列為限制漫畫，其中有部份章節可能含有暴力、血腥、色情或不當的語言等內容，不適合未成年觀眾。如果你法定年齡已超過18歲，
      <div
        onClick={() => {
          localStorage.setItem(IS_ADULT, '1');
          setShowChapters(true);
        }}
      >
        點擊繼續閱讀
      </div>
    </div>
  );

  return (
    <div className="comic-chapters">
      {showChapters ? (
        <>
          <ChapterType />
          <ChapterList {...chaptersEntries[currentChapter]} />
        </>
      ) : (
        <Warning />
      )}
    </div>
  );
}

export const ComicChapters: React.ComponentType<ChapterProps> = connect(
  mapStateToProps
)(withStyles(styles)(ComicChaptersComponent));
