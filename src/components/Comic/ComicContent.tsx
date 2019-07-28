import React, { useCallback, useState } from 'react';
import { NavLink, generatePath } from 'react-router-dom';
import { ChapterItem } from './ChapterItem';
import { Schema$ComicData } from '../../typings';
import { PATHS } from '../../constants';
import { LocalStorage } from '../../storage/storage';
import Button from '@material-ui/core/Button';
import WarningIcon from '@material-ui/icons/WarningRounded';

interface Props extends Pick<Schema$ComicData, 'chapters'> {
  adultOnly?: boolean;
  comicID: string;
  chapterType?: string;
}

const adultOnlyStorage = LocalStorage('COMIC_READER_ADULT_ONLY', '0');

function Warning({ onClick }: { onClick(): void }) {
  return (
    <div className="warning">
      <WarningIcon className="warning-icon" />
      漫畫已被列為限制漫畫，其中有部份章節可能含有暴力、血腥、色情或不當的語言等內容，不適合未成年觀眾。如果你法定年齡已超過18歲，
      <Button onClick={onClick}>點擊繼續</Button>
    </div>
  );
}

export function ComicContent({
  adultOnly,
  comicID,
  chapterType,
  chapters
}: Props) {
  const { types, byTypes } = chapters;
  const [showChapters, setShowChapters] = useState(
    !adultOnly || adultOnlyStorage.get() === '1'
  );
  const currChapterType = chapterType || types[0];
  const currChapters = byTypes[currChapterType] || [];

  const onClickCallback = useCallback(() => {
    setShowChapters(true);
    adultOnlyStorage.save('1');
  }, []);

  return (
    <div className="comic-content">
      {showChapters ? (
        <>
          <div className="chapter-types">
            {types.map(chapterType => (
              <NavLink
                className="type"
                key={chapterType}
                isActive={() => chapterType === currChapterType}
                to={generatePath(PATHS.COMIC, { comicID, chapterType })}
              >
                <div className="label">{chapterType}</div>
              </NavLink>
            ))}
          </div>
          <div className="chapters-list">
            {currChapters.map(chapterID => (
              <ChapterItem
                key={chapterID}
                comicID={comicID}
                chapterID={chapterID}
              />
            ))}
          </div>
        </>
      ) : (
        <Warning onClick={onClickCallback} />
      )}
    </div>
  );
}
