import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Sidebar } from '../Sidebar/Sidebar';
import { IconButton } from '../Mui/IconButton';
import { setFilter } from '../../store';
import { PATHS } from '../../constants';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ClearAllIcon from '@material-ui/icons/ClearAll';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ setFilter }, dispatch);

export const FilterSidebar = connect(
  null,
  mapDispatchToProps
)(({ setFilter }: ReturnType<typeof mapDispatchToProps>) => {
  return (
    <Sidebar className="filter-sidebar">
      <IconButton title="返回首頁" icon={ArrowBackIcon} to={PATHS.HOME} />
      <IconButton
        title="恢復預設"
        icon={ClearAllIcon}
        onClick={() => setFilter([])}
      />
    </Sidebar>
  );
});
