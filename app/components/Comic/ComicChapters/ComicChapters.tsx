import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import red from '@material-ui/core/colors/red';
import NewIcon from '@material-ui/icons/FiberNewOutlined';
import { Chapters, GetComicDataParam } from '../../../../typing';

export interface ChapterProps
  extends GetComicDataParam,
    WithStyles<typeof styles> {
  chapters: Chapters;
}

const styles = (theme: Theme) =>
  createStyles({
    icon: {
      alignSelf: 'flex-start',
      color: red[500],
      fontSize: 30
    }
  });

export const ComicChapters = withStyles(styles)(
  ({ comicID, chapters = {}, classes }: ChapterProps) => {
    const chaptersEntries = Object.entries(chapters).sort(
      ([, l1], [, l2]) => l2.length - l1.length
    );
    const [currentChapter, setCurrentChapter] = useState(0);

    return (
      <div className="comic-chapters">
        {chaptersEntries.map(
          ([chapterType, chapterList = []], index: number) => {
            const active = currentChapter === index ? 'active' : '';

            return (
              <Fragment key={index}>
                <div
                  className={`chapter-type ${active}`}
                  onClick={() => setCurrentChapter(index)}
                >
                  {chapterType}
                </div>
                {active && (
                  <div className="chapters-list">
                    {chapterList.map(({ chapterID, title, isNew }) => (
                      <Link
                        to={`/content/${comicID}/${chapterID}/0`}
                        className="chapter-item"
                        key={chapterID}
                      >
                        {title}
                        {isNew && (
                          <NewIcon className={classes.icon} color="inherit" />
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </Fragment>
            );
          }
        )}
      </div>
    );
  }
);
