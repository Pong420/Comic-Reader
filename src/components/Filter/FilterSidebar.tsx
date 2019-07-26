import React, { useCallback } from 'react';
import { connect, DispatchProp } from 'react-redux';
import { Sidebar } from '../Sidebar/Sidebar';
import { IconButton } from '../Mui/IconButton';
import { setFilter } from '../../store';
import { PATHS } from '../../constants';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ClearAllIcon from '@material-ui/icons/ClearAll';

function FilterSidebarComponent({ dispatch }: DispatchProp) {
  const onClick = useCallback(() => {
    dispatch(setFilter([]));
  }, [dispatch]);

  return (
    <Sidebar className="filter-sidebar">
      <IconButton title="返回首頁" icon={ArrowBackIcon} to={PATHS.HOME} />
      <IconButton title="恢復預設" icon={ClearAllIcon} onClick={onClick} />
    </Sidebar>
  );
}

export const FilterSidebar = connect()(FilterSidebarComponent);
