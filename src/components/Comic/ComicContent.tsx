import React, { useState, useMemo } from 'react';
import { Link, generatePath } from 'react-router-dom';
import { Schema$ComicData, Schema$ChpaterItem } from '../../typings';
import { PATHS } from '../../constants';
import Button from '@material-ui/core/Button';
import WarningIcon from '@material-ui/icons/WarningRounded';

type ChaptersEntries = Array<[string, Schema$ChpaterItem[]]>;

interface ChapterTypeProps {
  chaptersEntries: ChaptersEntries;
  currentChapterType: number;
  onClick(index: number): void;
}

interface ChapterListProps {
  comicID: string;
  chapterList: Schema$ChpaterItem[];
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

function ChapterListComonent({ chapterList = [], comicID }: ChapterListProps) {
  return (
    <div className="chapters-list">
      {chapterList.map(({ chapterID, title }) => {
        const to = generatePath(PATHS.CONTENT, {
          comicID,
          chapterID,
          pageNo: 1
        });

        return (
          <Link to={to} className="chapter-item" key={chapterID}>
            {title}
          </Link>
        );
      })}
    </div>
  );
}

const ChapterList = ChapterListComonent;

export function ComicContent({
  adultOnly,
  comicID = '',
  chapters = {}
}: Partial<Schema$ComicData>) {
  const chaptersEntries = useMemo(
    () =>
      Object.entries(chapters).sort(([, l1], [, l2]) => l2.length - l1.length),
    [chapters]
  );
  const [currentChapterType, setCurrentChapterType] = useState(
    chapterTypeMap.get(comicID) || 0
  );
  const [showChapters, setShowChapters] = useState(
    !adultOnly || localStorage.getItem(IS_ADULT) === '1'
  );

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
