import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import { Layout } from '../Layout';
import filterData from '../../filter.json';
import { FilterData } from '../../../typing';
import latestUpdateActionsCreators, {
  LatestUpdateActions
} from '../../actions/latestUpdate';
import { RootState } from '../../reducers';
import { LatestUpdateState } from '../../reducers/latestUpdate';

interface FilterItemProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

function mapStateToProps({ latestUpdate }: RootState, ownProps: any) {
  return { ...latestUpdate, ...ownProps };
}

function mapDispathToProps(dispath: Dispatch) {
  return bindActionCreators(latestUpdateActionsCreators, dispath);
}

function FilterItem({ label, selected, onClick }: FilterItemProps) {
  return (
    <div
      className={`filter-item ${selected ? 'selected' : ''}`}
      onClick={onClick}
    >
      {label}
    </div>
  );
}

function FilterHeader() {
  return (
    <div className="filter-header">
      <h1>篩選</h1>
      <Link to="/">
        <IconButton color="inherit">
          <Close fontSize="small" />
        </IconButton>
      </Link>
    </div>
  );
}

function FilterComponent({
  filter,
  setFilter
}: LatestUpdateState & LatestUpdateActions) {
  return (
    <Layout className="filter">
      <FilterHeader />
      <div className="filter-table">
        {(filterData as FilterData).map(([key, els], index) => {
          return (
            <div className="filter-table-row" key={key}>
              <div className="filter-table-cell">{key}</div>
              <div className="filter-table-cell">
                {els.map(({ label, val }) => (
                  <FilterItem
                    key={label}
                    label={label}
                    selected={val === filter[index]}
                    onClick={() => setFilter(replaceIndex(filter, index, val))}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

export const Filter = connect(
  mapStateToProps,
  mapDispathToProps
)(FilterComponent);

function replaceIndex(arr: any[], index: number, val: any) {
  const temp = arr.slice(0);
  temp.splice(index, 1, val);
  return temp;
}
