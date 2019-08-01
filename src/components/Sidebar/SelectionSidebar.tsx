import React, { useCallback } from 'react';
import { Sidebar } from './Sidebar';
import { IconButton } from '../Mui/IconButton';
import { ListCheckIcon } from '../Icon/ListCheckIcon';
import { DeleteIcon } from '../Icon/DeleteIcon';
import { useMouseTrap } from '../../utils/useMouseTrap';
import SelectAllIcon from '@material-ui/icons/SelectAllOutlined';

interface Props {
  selectable: boolean;
  selectedAll: boolean;
  toggleSelectable(flag?: boolean): void;
  toggleSelectAll(payload?: boolean): void;
  onRemove(): void;
}

export function SelectionSidebar({
  selectable,
  selectedAll,
  toggleSelectable,
  toggleSelectAll,
  onRemove
}: Props) {
  const uncheckSelection = useCallback(() => toggleSelectable(false), [
    toggleSelectable
  ]);

  const toggleSelectionCallback = useCallback(() => toggleSelectable(), [
    toggleSelectable
  ]);

  const toggleSelectAllCallback = useCallback(() => toggleSelectAll(), [
    toggleSelectAll
  ]);

  const onRemoveCallback = useCallback(() => onRemove(), [onRemove]);

  useMouseTrap('esc', uncheckSelection);

  return (
    <Sidebar>
      <IconButton
        title={selectable ? '多選' : '取消多選'}
        icon={ListCheckIcon}
        isActive={selectable}
        onClick={toggleSelectionCallback}
      />
      {selectable && (
        <>
          <IconButton
            title={selectedAll ? '取消選擇' : '選擇全部'}
            icon={SelectAllIcon}
            isActive={selectedAll}
            onClick={toggleSelectAllCallback}
          />
          <IconButton
            title="刪除已選擇"
            icon={DeleteIcon}
            onClick={onRemoveCallback}
          />
        </>
      )}
    </Sidebar>
  );
}
