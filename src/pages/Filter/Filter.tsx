import React, { useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from '@blueprintjs/core';
import { MuiIcon } from '../../components/MuiIcon';
import { PATHS, FILTER_DATA } from '../../constants';
import { comicsFilterSelector, useComicFilter } from '../../store';
import { useMouseTrap } from '../../hooks/useMouseTrap';
import { ReactComponent as CloseIcon } from '../../assets/close-24px.svg';

export type Schema$FilterData = [
  string,
  {
    label: string;
    val: string;
  }[]
][];

interface FilterItemProps {
  label: string;
  value: string;
  index: number;
  selected: boolean;
  onClick: (props: { index: number; value: string }) => void;
}

const FilterItem = React.memo<FilterItemProps>(
  ({ label, value, index, selected, onClick }) => {
    const onClickCallback = useCallback(() => onClick({ index, value }), [
      onClick,
      index,
      value
    ]);

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

export function Filter({ history }: RouteComponentProps) {
  const { setFilter } = useComicFilter();
  const filter = useSelector(comicsFilterSelector);
  const onItemClick = useCallback(
    ({ index, value }: { index: number; value: string }) => {
      setFilter([...filter.slice(0, index), value, ...filter.slice(index + 1)]);
    },
    [filter, setFilter]
  );

  const backToHome = () => history.push(PATHS.HOME);

  useMouseTrap('esc', backToHome);

  return (
    <div className="filter">
      <div className="filter-header">
        <h1>篩選</h1>
        <Button minimal onClick={backToHome}>
          <MuiIcon icon={CloseIcon} />
        </Button>
      </div>
      <div className="filter-table">
        {(FILTER_DATA as Schema$FilterData).map(([key, els], index) => {
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
                    onClick={onItemClick}
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
