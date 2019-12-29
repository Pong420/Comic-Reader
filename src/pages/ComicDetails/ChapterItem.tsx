import React from 'react';
import { generatePath, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Icon, Classes } from '@blueprintjs/core';
import { isLastVisitSelector } from '../../store';
import { PATHS } from '../../constants';
import { Schema$ChpaterItem } from '../../typings';
import { ReactComponent as NewIcon } from '../../assets/new-icon.svg';

interface Props extends Schema$ChpaterItem {
  comicID: string;
}

const newIcon = (
  <span className={Classes.ICON}>
    <NewIcon />
  </span>
);

const lastVisitIcon = <Icon icon="map-marker" />;

export function ChapterItem({ comicID, chapterID, title, isNew }: Props) {
  const isLastVisit = useSelector(isLastVisitSelector(comicID));
  const icon = isLastVisit ? lastVisitIcon : isNew ? newIcon : null;

  return (
    <Link
      className="chapter-item"
      key={chapterID}
      to={generatePath(PATHS.CONTENT, {
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
