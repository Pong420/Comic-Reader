import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AutoSizer } from 'react-virtualized';
import { GridContainer } from '../GridContainer';
import { IncompleteGrid } from '../Grid';
import { RootState, BrowsingHistoryActionCreators } from '../../store';

const mapStateToProps = ({ browsingHistory }: RootState) => ({
  ...browsingHistory
});
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(BrowsingHistoryActionCreators, dispatch);

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export function BrowsingHistoryComponent({ browsingHistory }: Props) {
  const items = browsingHistory.reverse();
  return (
    <div className="browsing-history">
      <AutoSizer>
        {dimen => (
          <GridContainer
            {...dimen}
            items={items}
            onGridRender={([_, { chapterID, ...props }]) => (
              <IncompleteGrid {...props} onRefetch={() => {}} />
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
