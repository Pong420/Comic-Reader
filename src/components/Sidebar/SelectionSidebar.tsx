import React from 'react';
import { Sidebar } from '../Sidebar';
import { IconButton } from '../Mui/IconButton';
import { ListCheckIcon } from '../Icon/ListCheckIcon';
import { DeleteIcon } from '../Icon/DeleteIcon';
import SelectAllIcon from '@material-ui/icons/SelectAllOutlined';

interface Props {
  seletable: boolean;
  selectedAll: boolean;
  toggle(): void;
  toggleSelectAll(): void;
  onRemove(): void;
}

export function SelectionSidebar({
  seletable,
  selectedAll,
  toggle,
  toggleSelectAll,
  onRemove
}: Props) {
  return (
    <Sidebar>
      <IconButton
        title={seletable ? '多選' : '取消多選'}
        icon={ListCheckIcon}
        isActive={seletable}
        onClick={() => toggle()}
      />
      {seletable && (
        <>
          <IconButton
            title={selectedAll ? '取消選擇' : '選擇全部'}
            icon={SelectAllIcon}
            isActive={selectedAll}
            onClick={() => toggleSelectAll()}
          />
          <IconButton title="刪除已選擇" icon={DeleteIcon} onClick={onRemove} />
        </>
      )}
    </Sidebar>
  );
}
