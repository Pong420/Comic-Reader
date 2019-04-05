import React, { FormEvent, useState, useCallback } from 'react';
import { withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

interface Props {
  value: string;
  onSearch: (keyword: string) => void;
}

const styles = (theme: Theme) => ({
  background: {
    backgroundColor: theme.palette.primary.light
  },
  input: {
    marginLeft: 15,
    flex: 1,
    color: '#fff'
  },
  iconButton: {
    padding: 10
  }
});

export function SearchFieldComponent({ classes, value, onSearch }: Props & WithStyles<typeof styles>) {
  const [keyword, setKeyword] = useState(value);
  const onSubmit = useCallback(
    (evt?: FormEvent<HTMLFormElement>) => {
      evt && evt.preventDefault();
      onSearch(keyword);
    },
    [keyword, onSearch]
  );

  return (
    <div className="search-field">
      <form className={`search ${classes.background}`} onSubmit={onSubmit}>
        <InputBase
          className={classes.input}
          onChange={evt => setKeyword(evt.target.value.trim())}
          value={keyword}
          placeholder="輸入書名 / 作者名稱"
          fullWidth
          autoFocus
        />
        <IconButton className={classes.iconButton} onClick={() => onSubmit()}>
          <SearchIcon color="primary" />
        </IconButton>
      </form>
    </div>
  );
}

export const SearchField = withStyles(styles)(SearchFieldComponent);
