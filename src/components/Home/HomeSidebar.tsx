import React from 'react';
import { connect } from 'react-redux';
import { Sidebar } from '../Sidebar/Sidebar';
import { IconButton } from '../Mui/IconButton';
import { PATHS } from '../../constants';
import { RootState } from '../../store';
import FilterIcon from '@material-ui/icons/FilterList';

const mapStateToProps = ({ home: { filter } }: RootState) => ({ filter });

export const HomeSidebar = connect(mapStateToProps)(
  ({ filter }: ReturnType<typeof mapStateToProps>) => {
    const filtered = !!filter.join('');

    return (
      <Sidebar className="home-sidebar">
        <IconButton
          title="篩選"
          to={PATHS.FILTER}
          icon={FilterIcon}
          badage={filtered}
          isActive={filtered}
        />
      </Sidebar>
    );
  }
);
