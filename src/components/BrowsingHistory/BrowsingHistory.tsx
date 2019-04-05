import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AutoSizer } from 'react-virtualized';
import { Layout } from '../Layout';
import { GridContainer } from '../../components/GridContainer';
import { RemovableGrid, RefetchComicGrid } from '../../components/Grid';
import {
  RootState,
  BrowsingHistoryState,
  BrowsingHistoryActionCreators
} from '../../store';

const mapStateToProps = ({ browsingHistory }: RootState, ownProps: any) => ({
  ...browsingHistory,
  ...ownProps
});
const mapActiontoProps = (dispatch: Dispatch) =>
  bindActionCreators(BrowsingHistoryActionCreators, dispatch);

function BrowsingHistoryComponent({
  browsingHistory,
  removable,
  refetchBrowsingHistory,
  removeBrowsingHistory
}: BrowsingHistoryState & typeof BrowsingHistoryActionCreators) {
  const reversedBrowsingHistory = browsingHistory.slice().reverse();

  return (
    <Layout className="browsing-history">
      <AutoSizer>
        {({ width, height }) => (
          <GridContainer
            width={width}
            height={height}
            list={reversedBrowsingHistory}
            onGridRender={([comicID, { chapterIDs, browsingHistoryItem }]) => {
              if (browsingHistoryItem) {
                return (
                  <RemovableGrid
                    {...browsingHistoryItem}
                    removable={removable}
                    onRemove={removeBrowsingHistory}
                  />
                );
              }

              return (
                <RefetchComicGrid
                  onFetch={() =>
                    refetchBrowsingHistory({
                      comicID,
                      chapterID: chapterIDs[0] || ''
                    })
                  }
                />
              );
            }}
          />
        )}
      </AutoSizer>
    </Layout>
  );
}

export const BrowsingHistory = connect(
  mapStateToProps,
  mapActiontoProps
)(BrowsingHistoryComponent);
