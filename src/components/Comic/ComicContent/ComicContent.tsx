import React, { useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { Link, generatePath } from 'react-router-dom';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import red from '@material-ui/core/colors/red';
import NewIcon from '@material-ui/icons/FiberNewOutlined';
import WarningIcon from '@material-ui/icons/WarningRounded';
import LastVisitIcon from '@material-ui/icons/LocationOnRounded';
import { RootState, BrowsingHistoryState } from '../../../store';
import { ComicData, ChpaterItem, Chapters } from '../../../typings';
import { PATHS } from '../../../constants';

type ChaptersEntries = Array<[string, ChpaterItem[]]>;

interface ChapterTypeProps {
  chaptersEntries: ChaptersEntries;
  currentChapter: number;
  onClick(index: number): void;
}

interface ChapterListProps {
  comicID: string;
  className: string;
  chapterList: ChpaterItem[];
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

const IS_ADULT = 'IS_ADULT';
const chapterTypeMap = new Map<string, number>();

const mapStateToProps = ({ browsingHistory }: RootState, ownProps: any) => ({
  ...browsingHistory,
  ...ownProps
});

function ChapterType({
  chaptersEntries,
  currentChapter,
  onClick
}: ChapterTypeProps) {
  return (
    <div className="chapter-types">
      {chaptersEntries.map(([chapterType], index: number) => {
        const active = currentChapter === index ? 'active' : '';
        return (
          <div
            key={index}
            className={`type ${active}`.trim()}
            onClick={() => onClick(index)}
          >
            <div className="label">{chapterType}</div>
          </div>
        );
      })}
    </div>
  );
}

function Warning({
  className,
  onClick
}: {
  className: string;
  onClick(): void;
}) {
  return (
    <div className="warning">
      <WarningIcon className={className} />
      漫畫已被列為限制漫畫，其中有部份章節可能含有暴力、血腥、色情或不當的語言等內容，不適合未成年觀眾。如果你法定年齡已超過18歲，
      <div onClick={onClick}>點擊繼續閱讀</div>
    </div>
  );
}

function ChapterListComonent({
  chapterList = [],
  className,
  comicID,
  browsingHistory
}: ChapterListProps & BrowsingHistoryState) {
  const chapterIDs = useMemo(() => {
    const history = new Map(browsingHistory).get(comicID);
    return history ? history.chapterIDs : [];
  }, [browsingHistory, comicID]);

  return (
    <div className="chapters-list">
      {chapterList.map(({ chapterID, title, isNew }) => {
        const lastVisitChapter = chapterIDs.includes(chapterID);
        const Icon = lastVisitChapter ? LastVisitIcon : isNew ? NewIcon : null;
        const to = generatePath(PATHS.CONTENT, {
          comicID,
          chapterID,
          pageNo: 1
        });

        return (
          <Link to={to} className="chapter-item" key={chapterID}>
            {title}
            {Icon && <Icon className={className} color="inherit" />}
          </Link>
        );
      })}
    </div>
  );
}

const ChapterList = connect(mapStateToProps)(ChapterListComonent);

function ComicContentComponent({
  classes,
  comicID,
  adultOnly,
  chapters
}: ComicData & WithStyles<typeof styles>) {
  const chaptersEntries = useMemo(
    () =>
      Object.entries(chapters).sort(([, l1], [, l2]) => l2.length - l1.length),
    [chapters]
  );
  const [currentChapter, setCurrentChapter] = useState(
    chapterTypeMap.get(comicID) || 0
  );
  const [showChapters, setShowChapters] = useState(
    adultOnly ? localStorage.getItem(IS_ADULT) === '1' : true
  );

  return (
    <div className="comic-content">
      {showChapters ? (
        <>
          <ChapterType
            chaptersEntries={chaptersEntries}
            currentChapter={currentChapter}
            onClick={index => {
              setCurrentChapter(index);
              chapterTypeMap.set(comicID, index);
            }}
          />
          <ChapterList
            className={classes.icon}
            comicID={comicID}
            chapterList={chaptersEntries[currentChapter][1]}
          />
        </>
      ) : (
        <Warning
          className={classes.warning}
          onClick={() => {
            localStorage.setItem(IS_ADULT, '1');
            setShowChapters(true);
          }}
        />
      )}
    </div>
  );
}

export const ComicContent = withStyles(styles)(ComicContentComponent);
