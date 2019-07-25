import React, { SyntheticEvent, useCallback, useRef } from 'react';
import { IconButton } from '../Mui/IconButton';
import InputBase, { InputBaseProps } from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

interface Props extends InputBaseProps {
  onSearch(query: string): void;
}

export function SearchInput({ onSearch, ...props }: Props) {
  const inputRef = useRef<HTMLInputElement>();
  const onSubmit = useCallback(
    (evt: SyntheticEvent<HTMLElement>) => {
      evt.preventDefault();
      const input = inputRef.current;
      if (input) {
        const value = input.value.trim();
        value && onSearch(value);
      }
    },
    [onSearch]
  );

  return (
    <div className="search-input">
      <form onSubmit={onSubmit}>
        <InputBase
          {...props}
          autoFocus
          fullWidth
          className="text-field"
          placeholder="輸入書名 / 作者名稱"
          inputRef={inputRef}
          endAdornment={<IconButton icon={SearchIcon} onClick={onSubmit} />}
        />
      </form>
    </div>
  );
}
