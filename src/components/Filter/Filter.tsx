import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { replace } from 'connected-react-router';
import { IconButton } from '../Mui/IconButton';
import { FilterData } from '../../typings';
import { RootState, HomeActionCreators } from '../../store';
import { PATHS, FILTER_DATA } from '../../constants';
import { useHotkeys } from '../../utils/useHotkeys';
import CloseIcon from '@material-ui/icons/Close';

interface FilterItemProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

const mapStateToProps = ({ home }: RootState) => ({ ...home });
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ replace, ...HomeActionCreators }, dispatch);

type Props = RouteComponentProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

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
      <Link to={PATHS.HOME}>
        <IconButton icon={CloseIcon} />
      </Link>
    </div>
  );
}

function FilterComponent({ filter, setFilter, replace }: Props) {
  useHotkeys('esc', () => replace(PATHS.HOME));

  return (
    <div className="filter">
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
                    onClick={() => setFilter(replaceArrVal(filter, index, val))}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const Filter = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterComponent);

function replaceArrVal(arr: string[], index: number, val: string) {
  const temp = arr.slice(0);
  temp.splice(index, 1, val);
  return temp;
}
