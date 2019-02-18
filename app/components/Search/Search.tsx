import React, { FormEvent, useState, ChangeEvent } from 'react';
import { AutoSizer } from 'react-virtualized';
import { withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { Layout } from '../Layout';
import { GridContainer } from '../GridContainer';
import { Grid } from '../Grid';
import { search } from '../../api';

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

export interface SearchProps extends WithStyles<typeof styles> {}

export const Search = withStyles(styles)(({ classes }: SearchProps) => {
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  function onSubmit(evt: FormEvent<HTMLFormElement> | null) {
    evt && evt.preventDefault();
    search({ keyword, page: 1 }).then(data => setSearchResults(data));
  }

  function onChange(evt: ChangeEvent<HTMLInputElement>) {
    setKeyword(evt.target.value);
  }

  return (
    <Layout className="search">
      <div className="search-header">
        <form
          onSubmit={evt => onSubmit(evt)}
          className={`search ${classes.background}`}
        >
          <InputBase
            className={classes.input}
            value={keyword}
            onChange={onChange}
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

      <div className="search-results">
        <AutoSizer>
          {({ width, height }) => (
            <GridContainer
              width={width}
              height={height}
              list={searchResults}
              onGridRender={props => <Grid {...props} />}
            />
          )}
        </AutoSizer>
      </div>
    </Layout>
  );
});
