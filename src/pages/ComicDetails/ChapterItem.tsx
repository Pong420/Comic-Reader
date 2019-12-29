import React from 'react';
import { generatePath, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MuiIcon } from '../../components/MuiIcon';
import { isLastVisitSelector } from '../../store';
import { PATHS } from '../../constants';
import { Schema$ChpaterItem } from '../../typings';
import { ReactComponent as NewIcon } from '../../assets/fiber_new-24px.svg';
import { ReactComponent as LocationOnIcon } from '../../assets/location_on-24px.svg';

interface Props extends Schema$ChpaterItem {
  comicID: string;
}

const newIcon = <MuiIcon icon={NewIcon} />;

const lastVisitIcon = <MuiIcon icon={LocationOnIcon} />;

export function ChapterItem({ comicID, chapterID, title, isNew }: Props) {
  const isLastVisit = useSelector(isLastVisitSelector(comicID));
  const icon = isLastVisit ? lastVisitIcon : isNew ? newIcon : null;

  return (
    <Link
      className="chapter-item"
      key={chapterID}
      to={generatePath(PATHS.COMIC_CONTENT, {
        comicID,
        chapterID,
        pageNo: 1
      })}
    >
      {title}
      {icon}
    </Link>
  );
}
