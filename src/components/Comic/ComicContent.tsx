import React from 'react';
import { NavLink, generatePath } from 'react-router-dom';
import { ChapterItem } from './ChapterItem';
import { Schema$ComicData } from '../../typings';
import { PATHS } from '../../constants';

interface Props extends Pick<Schema$ComicData, 'chapters'> {
  comicID: string;
  chapterType?: string;
}

export function ComicContent({ comicID, chapterType, chapters }: Props) {
  const { types, byTypes } = chapters;
  const currChapterType = chapterType || types[0];
  const currChapters = byTypes[currChapterType] || [];

  return (
    <div className="comic-content">
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
    </div>
  );
}
