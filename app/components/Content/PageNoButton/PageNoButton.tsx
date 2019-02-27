import React, { useState, MouseEvent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export interface PageNoButtonProps extends RouteComponentProps {
  className: string;
  currentPageNo: string;
  totalPage: number;
}

const ITEM_HEIGHT = 20;

export const PageNoButton = withRouter(
  ({ className, currentPageNo, totalPage, history }: PageNoButtonProps) => {
    const totalPageStr = String(totalPage);
    const pageNoStr = currentPageNo.padStart(totalPageStr.length, '0');

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [open, setOpen] = useState(false);

    function openMenu(event: MouseEvent<HTMLElement>) {
      setAnchorEl(event.currentTarget);
      setOpen(true);
    }

    function closeMenu() {
      setAnchorEl(null);
      setOpen(false);
    }

    if (totalPage) {
      return (
        <>
          <Button className={`${className} page-no-button`} onClick={openMenu}>
            <div className="page-no-wrapper">
              <div className="sup">{pageNoStr}</div>
              <div className="slash">/</div>
              <div className="sub">{totalPageStr}</div>
            </div>
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
            {new Array(totalPage).fill(null).map((_, index) => {
              const pageNo = index + 1;

              return (
                <MenuItem
                  color="#fff"
                  key={index}
                  selected={pageNo === Number(currentPageNo)}
                  onClick={() => {
                    history.push(String(pageNo));
                    closeMenu();
                  }}
                >
                  {pageNo}
                </MenuItem>
              );
            })}
          </Menu>
        </>
      );
    }

    return null;
  }
);
