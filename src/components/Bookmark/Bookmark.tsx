import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AutoSizer } from 'react-virtualized';
import { GridContainer } from '../GridContainer';
import { IncompleteGrid } from '../Grid';
import { RootState, refetchBookmark } from '../../store';

const mapStateToProps = ({ bookmark }: RootState) => ({
  ...bookmark
});
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ refetchBookmark }, dispatch);

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export function BookmarkComponent({ bookmark, refetchBookmark }: Props) {
  return (
    <div className="bookmark">
      <AutoSizer>
        {dimen => (
          <GridContainer
            {...dimen}
            items={bookmark}
            onGridRender={([_, { ...props }]) => (
              <IncompleteGrid
                {...props}
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
