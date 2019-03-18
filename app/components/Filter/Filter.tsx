import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import { Layout } from '../Layout';
import { FilterData } from '../../../typing';
import {
  RootState,
  ComicListState,
  ComicListActionCreators
} from '../../store';
import { useKeydown } from '../../utils/useKeydown';
import { PATH, FILTER_DATA } from '../../constants';

interface FilterItemProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

function mapStateToProps({ comicList }: RootState, ownProps: any) {
  return { ...comicList, ...ownProps };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(ComicListActionCreators, dispatch);
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
      <Link to={PATH.HOME}>
        <IconButton color="inherit">
          <Close fontSize="small" />
        </IconButton>
      </Link>
    </div>
  );
}

function FilterComponent({
  filter,
  setFilter,
  history
}: ComicListState & typeof ComicListActionCreators & RouteComponentProps) {
  useKeydown(({ key }) => key === 'Escape' && history.push('/'));

  return (
    <Layout className="filter">
      <FilterHeader />
      <div className="filter-table">
        {(FILTER_DATA as FilterData).map(([key, els], index) => {
          return (
            <div className="filter-table-row" key={key}>
              <div className="filter-table-cell">{key}</div>
              <div className="filter-table-cell">
                {els.map(({ label, val }) => (
                  <FilterItem
                    key={label}
                    label={label}
                    selected={val === (filter[index] || '')}
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

export const Filter = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(FilterComponent)
);

function replaceIndex(arr: any[], index: number, val: any) {
  const temp = arr.slice(0);
  temp.splice(index, 1, val);
  return temp;
}
