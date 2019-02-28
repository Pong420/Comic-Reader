import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import DeleteForever from '@material-ui/icons/DeleteForever';
import { Sidebar } from '..';
import { SidebarIcon } from '../SidebarIcon';
import { ConfirmDialog } from '../../ConfirmDialog';

interface SidebarWithRemoveFnProps {
  onToggleOnOff: (on: boolean) => void;
  onRemoveAll: () => void;
}

export function SidebarWithRemoveFn({
  onToggleOnOff,
  onRemoveAll
}: SidebarWithRemoveFnProps) {
  const [on, setOnOff] = useState(false);
  const [openDialog, setDialogOpen] = useState(false);

  return (
    <Sidebar className="sidebar-with-remove-fn">
      <SidebarIcon
        Icon={on ? DeleteIcon : DeleteOutlineIcon}
        tooltip={on ? '關閉刪除模式' : '開啟刪除模式'}
        onClick={() => {
          setOnOff(!on);
          onToggleOnOff(!on);
        }}
      />
      <SidebarIcon
        Icon={DeleteForever}
        tooltip="刪除所有紀錄"
        onClick={() => setDialogOpen(true)}
      />
      <ConfirmDialog
        open={openDialog}
        msg="確定要刪除所有紀錄嗎？"
        onConfirm={() => onRemoveAll}
        onClose={() => {
          setDialogOpen(false);
        }}
      />
    </Sidebar>
  );
}
