import React, { useState, useEffect } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import DeleteForever from '@material-ui/icons/DeleteForever';
import { Sidebar } from '..';
import { SidebarIcon } from '../SidebarIcon';
import { ConfirmDialog } from '../../ConfirmDialog';
import { useKeydown } from '../../../utils/useKeydown';

interface SidebarWithRemoveFnProps {
  on: boolean;
  onToggleOnOff: (on?: boolean) => void;
  onRemoveAll: () => void;
}

export function SidebarWithRemoveFn({
  on,
  onToggleOnOff,
  onRemoveAll
}: SidebarWithRemoveFnProps) {
  const [openDialog, setDialogOpen] = useState(false);
  const turnOffRemovable = () => onToggleOnOff(false);

  useEffect(() => {
    return () => {
      turnOffRemovable();
    };
  }, []);

  useKeydown(({ key }) => key === 'Escape' && turnOffRemovable());

  return (
    <Sidebar className="sidebar-with-remove-fn">
      <SidebarIcon
        Icon={on ? DeleteIcon : DeleteOutlineIcon}
        tooltip={on ? '關閉刪除模式' : '開啟刪除模式'}
        active={on}
        onClick={() => onToggleOnOff()}
      />
      <SidebarIcon
        Icon={DeleteForever}
        tooltip="刪除所有紀錄"
        onClick={() => setDialogOpen(true)}
      />
      <ConfirmDialog
        open={openDialog}
        message="確定要刪除所有紀錄嗎？"
        onConfirm={onRemoveAll}
        onClose={() => {
          setDialogOpen(false);
        }}
      />
    </Sidebar>
  );
}
