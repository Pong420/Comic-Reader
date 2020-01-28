import React, { useRef } from 'react';
import { Button, Popover, Menu, MenuItem } from '@blueprintjs/core';
import { useBoolean } from '../../hooks/useBoolean';

interface Props {
  total: number;
  pageNo: number;
  onChange: (pageNo: number) => void;
}

export function Pagination({ total, pageNo, onChange }: Props) {
  const [isOpen, open, close] = useBoolean();
  const ulRef = useRef<HTMLUListElement | null>();
  const padStart = (v: number) => String(v).padStart(String(total).length, '0');
  const onOpening = () =>
    (ulRef.current!.scrollTop = 30 * Math.max(0, pageNo - 2));

  return (
    <div className={`pagination ${isOpen ? 'active' : ''}`.trim()}>
      <Popover
        popoverClassName="pagination-menu"
        position="right-bottom"
        modifiers={{ offset: { offset: '0, -9px' } }}
        isOpen={isOpen}
        onClose={close}
        onOpening={onOpening}
        hoverOpenDelay={0}
        content={
          <Menu ulRef={ref => (ulRef.current = ref)}>
            {new Array(total).fill(null).map((_, index) => {
              const no = index + 1;
              return (
                <MenuItem
                  key={no}
                  active={no === pageNo}
                  text={padStart(no)}
                  onClick={() => onChange(no)}
                />
              );
            })}
          </Menu>
        }
      >
        <Button minimal onClick={open}>
          <div>{padStart(pageNo)}</div>
          <div />
          <div>{total}</div>
        </Button>
      </Popover>
    </div>
  );
}
