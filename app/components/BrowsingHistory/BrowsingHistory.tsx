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

function mapStateToProps({ browsingHistory }: RootState, ownProps: any) {
  return { ...browsingHistory, ...ownProps };
}

function mapActiontoProps(dispatch: Dispatch) {
  return bindActionCreators(BrowsingHistoryActionCreators, dispatch);
}

function BrowsingHistoryComponent({
  browsingHistory,
  removable,
  refetchBrowsingHistory,
  removeBrowsingHistory
}: BrowsingHistoryState & typeof BrowsingHistoryActionCreators) {
  const ReversedBrowsingHistory = browsingHistory.slice(0).reverse();

  return (
    <Layout className="browsing-history">
      <AutoSizer>
        {({ width, height }) => (
          <GridContainer
            width={width}
            height={height}
            list={ReversedBrowsingHistory}
            onGridRender={([_, { comicID, gridData }]) => {
              if (gridData) {
                return (
                  <RemovableGrid
                    {...gridData}
                    removable={removable}
                    onRemove={removeBrowsingHistory}
                  />
                );
              }

              return (
                <RefetchComicGrid
                  onFetch={() => refetchBrowsingHistory(comicID)}
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
