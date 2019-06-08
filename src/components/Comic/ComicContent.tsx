import React, { useState, useMemo, useEffect } from 'react';
import { Link, generatePath } from 'react-router-dom';
import {
  Schema$ComicData,
  Schema$ChpaterItem,
  Schema$BrowsingHistory
} from '../../typings';
import { PATHS } from '../../constants';
import Button from '@material-ui/core/Button';
import NewIcon from '@material-ui/icons/FiberNewOutlined';
import WarningIcon from '@material-ui/icons/WarningRounded';
import LastVisitIcon from '@material-ui/icons/LocationOnRounded';

type ChaptersEntries = Array<[string, Schema$ChpaterItem[]]>;

interface ComicContentProps extends Partial<Schema$ComicData> {
  visited?: Schema$BrowsingHistory[1];
}

interface ChapterTypeProps {
  chaptersEntries: ChaptersEntries;
  currentChapterType: number;
  onClick(index: number): void;
}

interface ChapterListProps {
  comicID: string;
  chapterList: Schema$ChpaterItem[];
  visited?: Schema$BrowsingHistory[1];
}

const IS_ADULT = 'IS_ADULT';
const chapterTypeMap = new Map<string, number>();

function ChapterType({
  chaptersEntries,
  currentChapterType,
  onClick
}: ChapterTypeProps) {
  return (
    <div className="chapter-types">
      {chaptersEntries.map(([chapterType], index: number) => {
        const active = currentChapterType === index ? 'active' : '';
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

function Warning({ onClick }: { onClick(): void }) {
  return (
    <div className="warning">
      <WarningIcon className="warning-icon" />
      漫畫已被列為限制漫畫，其中有部份章節可能含有暴力、血腥、色情或不當的語言等內容，不適合未成年觀眾。如果你法定年齡已超過18歲，
      <Button onClick={onClick}>點擊繼續</Button>
    </div>
  );
}

function ChapterList({ chapterList = [], comicID, visited }: ChapterListProps) {
  return (
    <div className="chapters-list">
      {chapterList.map(({ chapterID, title, isNew }) => {
        const to = generatePath(PATHS.CONTENT, {
          comicID,
          chapterID,
          pageNo: 1
        });

        const Icon =
          visited && visited.chapterID === chapterID
            ? LastVisitIcon
            : isNew
            ? NewIcon
            : null;

        return (
          <Link to={to} className="chapter-item" key={chapterID}>
            {title}
            {Icon && <Icon />}
          </Link>
        );
      })}
    </div>
  );
}

export function ComicContent({
  adultOnly,
  comicID = '',
  chapters = {},
  visited
}: ComicContentProps) {
  const chaptersEntries = useMemo(
    () =>
      Object.entries(chapters).sort(([, l1], [, l2]) => l2.length - l1.length),
    [chapters]
  );
  const [currentChapterType, setCurrentChapterType] = useState(0);
  const [showChapters, setShowChapters] = useState(
    !adultOnly || localStorage.getItem(IS_ADULT) === '1'
  );

  useEffect(() => {
    setCurrentChapterType((!!comicID && chapterTypeMap.get(comicID)) || 0);
  }, [comicID]);

  return (
    <div className="comic-content">
      {showChapters ? (
        <>
          <ChapterType
            chaptersEntries={chaptersEntries}
            currentChapterType={currentChapterType}
            onClick={index => {
              setCurrentChapterType(index);
              chapterTypeMap.set(comicID, index);
            }}
          />
          {!!chaptersEntries.length && (
            <ChapterList
              comicID={comicID}
              chapterList={chaptersEntries[currentChapterType][1]}
              visited={visited}
            />
          )}
        </>
      ) : (
        <Warning
          onClick={() => {
            localStorage.setItem(IS_ADULT, '1');
            setShowChapters(true);
          }}
        />
      )}
    </div>
  );
}
