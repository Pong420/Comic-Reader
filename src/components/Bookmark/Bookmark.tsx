import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AutoSizer } from 'react-virtualized';
import { GridContainer } from '../GridContainer';
import { SeletableGrid } from '../Grid/SeletableGrid';
import { RootState, BookmarkActionCreators } from '../../store';

const mapStateToProps = ({ bookmark }: RootState) => ({
  ...bookmark
});
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(BookmarkActionCreators, dispatch);

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export function BookmarkComponent({
  bookmark,
  selection,
  seletable,
  refetchBookmark,
  updateBookmarkSelection
}: Props) {
  const items = bookmark.slice().reverse();
  const toggleSelect = (comicID: string) => {
    const index = selection.indexOf(comicID);
    if (index === -1) {
      updateBookmarkSelection([...selection, comicID]);
    } else {
      updateBookmarkSelection([
        ...selection.slice(0, index),
        ...selection.slice(index + 1)
      ]);
    }
  };

  return (
    <div className="bookmark">
      <AutoSizer>
        {dimen => (
          <GridContainer
            {...dimen}
            items={items}
            onGridRender={([_, { ...props }]) => (
              <SeletableGrid
                {...props}
                subtitle="author"
                seletable={seletable}
                toggleSelect={toggleSelect}
                selected={selection.includes(props.comicID)}
                onRefetch={() => refetchBookmark(props.comicID)}
              />
            )}
          />
        )}
      </AutoSizer>
    </div>
  );
}

export const Bookmark = connect(
  mapStateToProps,
  mapDispatchToProps
)(BookmarkComponent);
