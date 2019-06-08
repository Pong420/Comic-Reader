import React, { SyntheticEvent } from 'react';
import { IconButton } from '../Mui/IconButton';
import { useInput } from '../../utils/useInput';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

interface Props {
  defaultValue?: string;
  onSearch(query: string): void;
}

export function SearchInput({ defaultValue = '', onSearch }: Props) {
  const query = useInput(defaultValue);
  const onSubmit = (evt: SyntheticEvent<HTMLElement>) => {
    onSearch(query.value);
    evt.preventDefault();
  };

  return (
    <div className="search-input">
      <form onSubmit={onSubmit}>
        <InputBase
          autoFocus
          fullWidth
          className="text-field"
          placeholder="輸入書名 / 作者名稱"
          endAdornment={<IconButton icon={SearchIcon} onClick={onSubmit} />}
          {...query}
        />
      </form>
    </div>
  );
}
