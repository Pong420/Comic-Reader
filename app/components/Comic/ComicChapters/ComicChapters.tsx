import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Chapters, GetComicDataParam } from '../../../../typing';

export interface ChapterProps extends GetComicDataParam {
  chapters: Chapters;
}

export function ComicChapters({ comicID, chapters = {} }: ChapterProps) {
  const chaptersEntries = Object.entries(chapters).sort(
    ([, l1], [, l2]) => l2.length - l1.length
  );
  const [currentChapter, setCurrentChapter] = useState(0);

  return (
    <div className="comic-chapters">
      {chaptersEntries.map(([chapterType, chapterList = []], index: number) => {
        const active = currentChapter === index ? 'active' : '';

        return (
          <React.Fragment key={index}>
            <div
              className={`chapter-type ${active}`}
              onClick={() => setCurrentChapter(index)}
            >
              {chapterType}
            </div>
            {active && (
              <div className="chapters-list">
                {chapterList.map(({ chapterID, title }) => (
                  <Link
                    to={`/content/${comicID}/${chapterID}/0`}
                    className="chapter-item"
                    key={chapterID}
                  >
                    {title}
                  </Link>
                ))}
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
