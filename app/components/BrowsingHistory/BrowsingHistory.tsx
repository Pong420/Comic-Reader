import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AutoSizer } from 'react-virtualized';
import { Layout } from '../Layout';
import { GridContainer } from '../../components/GridContainer';
import { RemovableGrid, RefetchComicGrid } from '../../components/Grid';
import { RootState } from '../../reducers';
import { BrowsingHistoryState } from '../../reducers/browsingHistory';
import BrowsingHistoryActionCreator, {
  BrowsingHistoryActions
} from '../../actions/browsingHistory';

function mapStateToProps({ browsingHistory }: RootState, ownProps: any) {
  return { ...browsingHistory, ...ownProps };
}

function mapActiontoProps(dispatch: Dispatch) {
  return bindActionCreators(BrowsingHistoryActionCreator, dispatch);
}

function BrowsingHistoryComponent({
  browsingHistory,
  setBrowsingHistory,
  removeBrowsingHistory
}: BrowsingHistoryState & BrowsingHistoryActions) {
  const ReversedBrowsingHistory = browsingHistory.slice(0).reverse();

  return (
    <Layout className="browsing-history">
      <AutoSizer>
        {({ width, height }) => (
          <GridContainer
            width={width}
            height={height}
            list={ReversedBrowsingHistory}
            onGridRender={([_, { comicID, comicData }]) => {
              if (comicData) {
                return (
                  <RemovableGrid
                    {...comicData}
                    onRemove={removeBrowsingHistory}
                  />
                );
              }

              return (
                <RefetchComicGrid
                  comicID={comicID}
                  onFetch={comicData =>
                    setBrowsingHistory({
                      comicID,
                      comicData,
                      chapterIDs: []
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
