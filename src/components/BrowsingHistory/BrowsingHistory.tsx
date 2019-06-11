import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AutoSizer } from 'react-virtualized';
import { GridContainer } from '../GridContainer';
import { SeletableGrid, useDraggable } from '../Grid/SeletableGrid';
import { RootState, BrowsingHistoryActionCreators } from '../../store';

const mapStateToProps = ({ browsingHistory }: RootState) => ({
  ...browsingHistory
});
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(BrowsingHistoryActionCreators, dispatch);

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export function BrowsingHistoryComponent({
  browsingHistory,
  selection,
  seletable,
  refetchBrowsingHistory,
  updateBrowsingHistorySelection
}: Props) {
  const items = browsingHistory.slice().reverse();
  const toggleSelect = (comicID: string) => {
    const index = selection.indexOf(comicID);
    if (index === -1) {
      updateBrowsingHistorySelection([...selection, comicID]);
    } else {
      updateBrowsingHistorySelection([
        ...selection.slice(0, index),
        ...selection.slice(index + 1)
      ]);
    }
  };

  const dragProps = useDraggable();

  return (
    <div className="browsing-history">
      <AutoSizer>
        {dimen => (
          <GridContainer
            {...dimen}
            items={items}
            onGridRender={([_, { chapterID, ...props }]) => (
              <SeletableGrid
                {...props}
                {...dragProps}
                subtitle="author"
                seletable={seletable}
                selected={selection.includes(props.comicID)}
                toggleSelect={toggleSelect}
                onRefetch={() => refetchBrowsingHistory(props.comicID)}
              />
            )}
          />
        )}
      </AutoSizer>
    </div>
  );
}

export const BrowsingHistory = connect(
  mapStateToProps,
  mapDispatchToProps
)(BrowsingHistoryComponent);
