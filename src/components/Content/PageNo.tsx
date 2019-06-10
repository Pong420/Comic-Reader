import React, { useMemo, useCallback, useRef } from 'react';
import { Menu, useMuiMenu, useMuiMenuItem } from '../Mui/Menu';
import Button from '@material-ui/core/Button';

interface Props {
  pageNo: number;
  totalPage: number;
  changePage(pageNo: number): void;
}

const paperClassName = { paper: 'page-no-menu-paper' };

export function PageNo({ pageNo, totalPage, changePage }: Props) {
  const { anchorEl, setAnchorEl, onClose } = useMuiMenu();
  const MenuItem = useMuiMenuItem({ onClose });
  const pages = useMemo(() => new Array(totalPage).fill(null), [totalPage]);
  const menuContentRef = useRef<HTMLDivElement>(null);
  const activeMenuItemRef = useRef<HTMLLIElement>(null);

  const onEnterCallback = useCallback(() => {
    if (menuContentRef.current && activeMenuItemRef.current) {
      menuContentRef.current.scrollTop =
        activeMenuItemRef.current.offsetTop +
        activeMenuItemRef.current.offsetHeight -
        menuContentRef.current.offsetHeight -
        5;
    }
  }, []);

  if (totalPage <= 0) {
    return null;
  }

  return (
    <>
      <Button className="page-no" onClick={setAnchorEl}>
        <div>{String(pageNo).padStart(String(totalPage).length, ' ')}</div>
        <div className="slash" />
        <div>{totalPage}</div>
      </Button>
      <Menu
        classes={paperClassName}
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={onClose}
        ref={menuContentRef}
        onEnter={onEnterCallback}
      >
        {pages.map((_, index) => {
          const selected = index + 1 === pageNo;
          return (
            <MenuItem
              key={index}
              selected={selected}
              onClick={() => changePage(index + 1)}
              innerRef={selected ? activeMenuItemRef : null}
            >
              {index + 1}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}
