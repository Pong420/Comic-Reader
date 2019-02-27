import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import red from '@material-ui/core/colors/red';
import NewIcon from '@material-ui/icons/FiberNewOutlined';
import WarningIcon from '@material-ui/icons/WarningRounded';
import LastVisitIcon from '@material-ui/icons/LocationOnRounded';
import { BrowsingHistoryState } from '../../../reducers/browsingHistory';
import { Chapters, ChapterList } from '../../../../typing';

export interface ChapterProps {
  comicID: string;
  chapterID: string;
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

// FIXME:
function mapStateToProps({ browsingHistory }: any, ownProps: any) {
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
  const [currentChapter, setCurrentChapter] = useState(0);
  const [showChapters, setShowChapters] = useState(
    adultOnly ? localStorage.getItem(IS_ADULT) === '1' : true
  );

  const mappedBrowsingHistory = new Map(browsingHistory);

  const ChapterType = () => (
    <div className="chapter-types">
      {chaptersEntries.map(([chapterType], index: number) => {
        const active = currentChapter === index ? 'active' : '';
        return (
          <div
            key={index}
            className={`type ${active}`}
            onClick={() => setCurrentChapter(index)}
          >
            <div className="label">{chapterType}</div>
          </div>
        );
      })}
    </div>
  );

  const ChapterList = ({ chapterList }: { chapterList: ChapterList }) => (
    <div className="chapters-list">
      {chapterList.map(({ chapterID, title, isNew }) => {
        const record = mappedBrowsingHistory.get(comicID);
        const chapterIDs = record ? record.chapterIDs : [];
        const lastVisitChapter = chapterIDs.includes(chapterID);
        const Icon = lastVisitChapter ? LastVisitIcon : isNew ? NewIcon : null;

        return (
          <Link
            to={`/content/${comicID}/${chapterID}/1`}
            className="chapter-item"
            key={chapterID}
          >
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
          <ChapterList chapterList={chaptersEntries[currentChapter][1]} />
        </>
      ) : (
        <Warning />
      )}
    </div>
  );
}

export const ComicChapters = withStyles(styles)(
  connect(mapStateToProps)(ComicChaptersComponent)
);
