import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AutoSizer } from 'react-virtualized';
import { GridContainer } from '../GridContainer';
import { IncompleteGrid } from '../Grid';
import { RootState, refetchBrowsingHistory } from '../../store';

const mapStateToProps = ({ browsingHistory }: RootState) => ({
  ...browsingHistory
});
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ refetchBrowsingHistory }, dispatch);

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export function BrowsingHistoryComponent({
  browsingHistory,
  refetchBrowsingHistory
}: Props) {
  const items = browsingHistory.reverse();
  return (
    <div className="browsing-history">
      <AutoSizer>
        {dimen => (
          <GridContainer
            {...dimen}
            items={items}
            onGridRender={([_, { chapterID, ...props }]) => (
              <IncompleteGrid
                {...props}
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
