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
      menuContentRef.current.scrollTop = activeMenuItemRef.current.offsetTop;
    }
  }, []);

  if (totalPage <= 0) {
    return null;
  }

  return (
    <>
      <Button className="page-no" onClick={setAnchorEl}>
        <span>{pageNo}</span>
        <span>/</span>
        <span>{totalPage}</span>
      </Button>
      <Menu
        classes={paperClassName}
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={onClose}
        ref={menuContentRef}
        onEnter={onEnterCallback}
      >
        {pages.map((_, index) => (
          <MenuItem
            key={index}
            onClick={() => changePage(index + 1)}
            innerRef={index + 1 === pageNo ? activeMenuItemRef : null}
          >
            {index + 1}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
