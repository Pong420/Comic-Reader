import React, { FormEvent, ChangeEvent } from 'react';
import { withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

export interface SearchHeaderProps extends WithStyles<typeof styles> {
  value: string;
  onSearch: () => void;
  onInputChange: (keyword: string) => void;
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
    padding: 10,
    color: '#fff'
  }
});

export const SearchHeader = withStyles(styles)(
  ({ classes, value, onSearch, onInputChange }: SearchHeaderProps) => {
    function onSubmit(evt: FormEvent<HTMLFormElement> | null) {
      evt && evt.preventDefault();
      onSearch();
    }

    function onChange(evt: ChangeEvent<HTMLInputElement>) {
      onInputChange(evt.target.value);
    }

    return (
      <div className="search-header">
        <form
          onSubmit={evt => onSubmit(evt)}
          className={`search ${classes.background}`}
        >
          <InputBase
            className={classes.input}
            onChange={onChange}
            value={value}
            fullWidth
          />
          <IconButton
            className={classes.iconButton}
            aria-label="Search"
            onClick={() => onSubmit(null)}
          >
            <SearchIcon />
          </IconButton>
        </form>
      </div>
    );
  }
);
