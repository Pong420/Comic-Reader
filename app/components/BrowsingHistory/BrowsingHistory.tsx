import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AutoSizer } from 'react-virtualized';
import { Layout } from '../Layout';
import { GridContainer } from '../../components/GridContainer';
import { RemovableGrid, RefetchComicGrid } from '../../components/Grid';
import { BrowsingHistoryState } from '../../reducers/browsingHistory';
import BrowsingHistoryActionCreator, {
  BrowsingHistoryActions
} from '../../actions/browsingHistory';

function mapStateToProps({ browsingHistory }, ownProps) {
  return { ...browsingHistory, ...ownProps };
}

function mapActiontoProps(dispatch) {
  return bindActionCreators(BrowsingHistoryActionCreator, dispatch);
}

export interface BrowsingHistoryProps
  extends BrowsingHistoryState,
    BrowsingHistoryActions {}

export const BrowsingHistory = connect(
  mapStateToProps,
  mapActiontoProps
)(
  ({
    browsingHistory,
    setBrowsingHistory,
    removeBrowsingHistory
  }: BrowsingHistoryProps) => {
    const ReversedBrowsingHistory = browsingHistory.slice(0).reverse();

    return (
      <Layout className="browsing-history">
        <AutoSizer>
          {({ width, height }) => (
            <GridContainer
              width={width}
              height={height}
              list={ReversedBrowsingHistory}
              onGridRender={([_, props]) => {
                if (props.comicData) {
                  return (
                    <RemovableGrid
                      {...props.comicData}
                      onClose={removeBrowsingHistory}
                    />
                  );
                }

                return (
                  <RefetchComicGrid
                    comicID={props.comicID}
                    onFetch={comicData =>
                      setBrowsingHistory({
                        comicID: props.comicID,
                        comicData
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
);
