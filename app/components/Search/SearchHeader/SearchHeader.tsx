import React, { FormEvent, useState } from 'react';
import { withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

export interface SearchHeaderProps {
  initialValue: string;
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

function SearchHeaderComponent({
  classes,
  initialValue,
  onSearch
}: SearchHeaderProps & WithStyles<typeof styles>) {
  const [keyword, setKeyword] = useState(initialValue);

  function onSubmit(evt?: FormEvent<HTMLFormElement>) {
    evt && evt.preventDefault();
    onSearch(keyword);
  }

  return (
    <div className="search-header">
      <form className={`search ${classes.background}`} onSubmit={onSubmit}>
        <InputBase
          className={classes.input}
          onChange={evt => setKeyword(evt.target.value.trim())}
          value={keyword}
          fullWidth
        />
        <IconButton className={classes.iconButton} onClick={() => onSubmit()}>
          <SearchIcon color="primary" />
        </IconButton>
      </form>
    </div>
  );
}

export const SearchHeader = withStyles(styles)(SearchHeaderComponent);
