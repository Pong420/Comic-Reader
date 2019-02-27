import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import DeleteForever from '@material-ui/icons/DeleteForever';
import { Sidebar } from '..';
import { SidebarIcon } from '../SidebarIcon';

interface SidebarWithRemoveFnProps {
  onToggleOnOff: (on: boolean) => void;
  onRemoveAll: () => void;
}

export function SidebarWithRemoveFn({
  onToggleOnOff,
  onRemoveAll
}: SidebarWithRemoveFnProps) {
  const [on, setOnOff] = useState(false);

  return (
    <Sidebar className="sidebar-with-remove-fn">
      <SidebarIcon
        Icon={on ? DeleteIcon : DeleteOutlineIcon}
        onClick={() => {
          setOnOff(!on);
          onToggleOnOff(!on);
        }}
      />
      {on && <SidebarIcon Icon={DeleteForever} onClick={onRemoveAll} />}
    </Sidebar>
  );
}
