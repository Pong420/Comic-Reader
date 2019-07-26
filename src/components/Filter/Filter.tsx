import React, { useMemo, useCallback } from 'react';
import { connect, DispatchProp } from 'react-redux';
import { replace } from 'connected-react-router';
import { IconButton } from '../Mui/IconButton';
import { FilterData } from '../../typings';
import { RootState, setFilter } from '../../store';
import { PATHS, FILTER_DATA } from '../../constants';
import { useMouseTrap } from '../../utils/useMouseTrap';
import CloseIcon from '@material-ui/icons/Close';

interface FilterItemProps {
  label: string;
  value: string;
  index: number;
  selected: boolean;
  setFilter: typeof setFilter;
}

const mapStateToProps = (state: RootState) => ({ filter: state.comics.filter });

const FilterItem = React.memo<FilterItemProps>(
  ({ label, value, index, selected, setFilter }) => {
    const onClickCallback = useCallback(() => {
      setFilter({ index, value });
    }, [setFilter, index, value]);

    return (
      <div
        className={`filter-item ${selected ? 'selected' : ''}`}
        onClick={onClickCallback}
      >
        {label}
      </div>
    );
  }
);

function FilterComponent({
  filter,
  dispatch
}: DispatchProp & ReturnType<typeof mapStateToProps>) {
  const [backToHome, setFilterCallback] = useMemo(() => {
    return [
      () => dispatch(replace(PATHS.HOME)),
      (...args: Parameters<typeof setFilter>) => dispatch(setFilter(...args))
    ];
  }, [dispatch]);

  useMouseTrap('esc', backToHome);

  return (
    <div className="filter">
      <div className="filter-header">
        <h1>篩選</h1>
        <IconButton to={PATHS.HOME} icon={CloseIcon} />
      </div>
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
                    index={index}
                    value={val}
                    selected={val === (filter[index] || '')}
                    setFilter={setFilterCallback}
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

export const Filter = connect(mapStateToProps)(FilterComponent);
