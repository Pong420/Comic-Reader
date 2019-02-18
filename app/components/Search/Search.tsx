import React from 'react';
import { withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { Layout } from '../Layout';

const styles = (theme: Theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    margin: 'auto',
    background: theme.palette.primary.light
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
  return (
    <Layout className="search">
      <Paper className={classes.root} elevation={1}>
        <InputBase className={classes.input} placeholder="" />
        <IconButton className={classes.iconButton} aria-label="Search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </Layout>
  );
});
