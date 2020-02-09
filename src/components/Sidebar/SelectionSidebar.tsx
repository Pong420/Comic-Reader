import React from 'react';
import { Dialog, Classes, Button, H5 } from '@blueprintjs/core';
import { Sidebar, SidebarProps } from './Sidebar';
import { SidebarIcon } from './SidebarIcon';
import { useBoolean } from '../../hooks/useBoolean';
import { useMouseTrap } from '../../hooks/useMouseTrap';
import { ReactComponent as SelectAllIcon } from '../../assets/select_all-24px.svg';
import { ReactComponent as ListCheckIcon } from '../../assets/list-check-24px.svg';
import { ReactComponent as TrashIcon } from '../../assets/trash-24px.svg';

interface Props extends SidebarProps {
  total: number;
  selectable: boolean;
  allSelected: boolean;
  selection: string[];
  toggleSelectable: () => any;
  toggleSelectAll: () => any;
  toggleSelection: (id: string) => any;
  setSelection: (ids: string[]) => any;
  onDelete: (ids: string[]) => any;
}

export function SelectionSidebar({
  children,
  total,
  selectable,
  selection,
  allSelected,
  toggleSelectable,
  toggleSelectAll,
  setSelection,
  onDelete,
  ...props
}: Props) {
  const [dialogOpen, openDialog, closeDialog] = useBoolean();
  const deleteSelection = () => {
    onDelete(selection);
    setSelection([]);
    closeDialog();
  };

  const handleDelete = selection.length > 1 ? openDialog : deleteSelection;

  useMouseTrap(selectable ? 'esc' : '', () => setSelection([]));
  useMouseTrap(selectable && !allSelected ? 'command+a' : '', toggleSelectAll);

  return (
    <>
      <Sidebar {...props}>
        {!!total && (
          <>
            <SidebarIcon
              tooltip={selectable ? '取消多選' : '多選'}
              icon={ListCheckIcon}
              isActive={selectable}
              onClick={toggleSelectable}
            />
            {selectable && (
              <>
                <SidebarIcon
                  tooltip={allSelected ? '取消選擇' : '選擇全部'}
                  icon={SelectAllIcon}
                  isActive={allSelected}
                  onClick={toggleSelectAll}
                />
                <SidebarIcon
                  tooltip="刪除已選擇"
                  icon={TrashIcon}
                  onClick={handleDelete}
                />
              </>
            )}
          </>
        )}
        {children}
      </Sidebar>
      <Dialog
        isOpen={dialogOpen}
        onClose={closeDialog}
        className={[Classes.DARK, 'delete-selection-alert'].join(' ')}
      >
        <div className={Classes.DIALOG_BODY}>
          <H5>刪除已選擇的漫畫？</H5>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button minimal onClick={closeDialog}>
              取消
            </Button>
            <Button minimal onClick={deleteSelection}>
              確認
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
