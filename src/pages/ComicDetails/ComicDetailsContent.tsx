import React, { useCallback, useState } from 'react';
import { NavLink, generatePath } from 'react-router-dom';
import { Button, Icon } from '@blueprintjs/core';
import { ChapterItem } from './ChapterItem';
import { Schema$ComicDetails } from '../../typings';
import { PATHS } from '../../constants';
import { LocalStorage } from '../../storage';

interface Props extends Pick<Schema$ComicDetails, 'chapters'> {
  adultOnly?: boolean;
  comicID: string;
  chapterType?: string;
}

const adultOnlyStorage = LocalStorage('COMIC_READER_ADULT_ONLY', '0');

function Warning({ onClick }: { onClick(): void }) {
  return (
    <div className="warning">
      <Icon icon="warning-sign" />
      漫畫已被列為限制漫畫，其中有部份章節可能含有暴力、血腥、色情或不當的語言等內容，不適合未成年觀眾。如果你法定年齡已超過18歲，
      <Button minimal onClick={onClick}>
        點擊繼續
      </Button>
    </div>
  );
}

export function ComicDetailsContent({
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
    <div className="comic-details-content">
      {showChapters ? (
        <>
          <div className="chapter-types">
            {types.map(chapterType => (
              <NavLink
                className="type"
                key={chapterType}
                isActive={() => chapterType === currChapterType}
                to={generatePath(PATHS.COMIC_DETAILS, { comicID, chapterType })}
              >
                <div className="label">{chapterType}</div>
              </NavLink>
            ))}
          </div>
          <div className="chapters-list">
            {currChapters.map(data => (
              <ChapterItem key={data.chapterID} comicID={comicID} {...data} />
            ))}
          </div>
        </>
      ) : (
        <Warning onClick={onClickCallback} />
      )}
    </div>
  );
}
