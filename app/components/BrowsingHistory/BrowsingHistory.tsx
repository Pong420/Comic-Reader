import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { AutoSizer } from 'react-virtualized';
import { Layout } from '../Layout';
import { GridContainer } from '../../components/GridContainer';
import { Grid } from '../../components/Grid';
import { BrowsingHistoryState } from '../../reducers/browsingHistory';

function mapStateToProps({ browsingHistory }, ownProps) {
  return { ...browsingHistory, ...ownProps };
}

export const BrowsingHistory = connect(mapStateToProps)(
  ({ browsingHistory }: BrowsingHistoryState) => {
    const ReversedBrowsingHistory = useMemo(
      () => browsingHistory.slice(0).reverse(),
      []
    );

    return (
      <Layout className="browsing-history">
        <AutoSizer>
          {({ width, height }) => (
            <GridContainer
              width={width}
              height={height}
              list={ReversedBrowsingHistory}
              onGridRender={props => <Grid {...props[1]} />}
            />
          )}
        </AutoSizer>{' '}
      </Layout>
    );
  }
);
