import React, { useRef } from 'react';
import { connect, DispatchProp, Omit } from 'react-redux';
import { Link, generatePath } from 'react-router-dom';
import { RootState } from '../../store';
import { PATHS } from '../../constants';
import { Schema$ChpaterItem } from '../../typings';
import NewIcon from '@material-ui/icons/FiberNewOutlined';
import LastVisitIcon from '@material-ui/icons/LocationOnRounded';

interface Props {
  comicID: string;
  chapterID: string;
  visited?: boolean;
}

const mapStateToProps = (state: RootState, { chapterID }: Props) => {
  const { chapters } = state.comicData;
  return {
    ...((chapters ? chapters.byIds[chapterID] : {}) as Partial<
      Omit<Schema$ChpaterItem, 'chapterID'>
    >)
  };
};

export function ChapterItemComponent({
  comicID,
  chapterID,
  isNew,
  title,
  visited
}: Props & DispatchProp & ReturnType<typeof mapStateToProps>) {
  const to = generatePath(PATHS.CONTENT, {
    comicID,
    chapterID,
    pageNo: 1
  });

  const Icon = visited ? LastVisitIcon : isNew ? NewIcon : null;

  return (
    <div className="chapter-item" key={chapterID}>
      {title}
      {Icon && <Icon />}
    </div>
  );
}

export const ChapterItem = React.memo(
  connect(mapStateToProps)(ChapterItemComponent)
);
