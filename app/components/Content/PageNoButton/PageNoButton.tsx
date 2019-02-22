import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export interface PageNoButtonProps extends RouteComponentProps {
  className: string;
  pageNo: string;
  totalPage: number;
}

const ITEM_HEIGHT = 20;

export const PageNoButton = withRouter(
  ({ className, pageNo, totalPage, history }: PageNoButtonProps) => {
    const totalPageStr = String(totalPage);
    const pageNoStr = `${Number(pageNo) + 1}`.padStart(
      totalPageStr.length,
      '0'
    );

    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);

    function openMenu(event) {
      setAnchorEl(event.currentTarget);
      setOpen(true);
    }

    function closeMenu() {
      setAnchorEl(null);
      setOpen(false);
      console.log('handle close');
    }

    if (totalPage) {
      return (
        <>
          <Button className={`${className} page-no-button`} onClick={openMenu}>
            <div className="sup">{pageNoStr}</div>
            <div className="slash">/</div>
            <div className="sub">{totalPageStr}</div>
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={closeMenu}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 15,
                width: 100
              }
            }}
          >
            {new Array(totalPage).fill(null).map((_, index) => (
              <MenuItem
                color="#fff"
                key={index}
                selected={index === Number(pageNo)}
                onClick={() => {
                  history.push(String(index));
                  closeMenu();
                }}
              >
                {index++}
              </MenuItem>
            ))}
          </Menu>
        </>
      );
    }

    return null;
  }
);
