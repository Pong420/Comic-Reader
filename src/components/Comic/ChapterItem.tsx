import React from 'react';
import { connect, DispatchProp, Omit } from 'react-redux';
import { generatePath, Link } from 'react-router-dom';
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
  const Icon = visited ? LastVisitIcon : isNew ? NewIcon : null;

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
      {Icon && <Icon />}
    </Link>
  );
}

export const ChapterItem = React.memo(
  connect(mapStateToProps)(ChapterItemComponent)
);
