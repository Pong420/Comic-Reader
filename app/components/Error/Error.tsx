import React from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Warning from '@material-ui/icons/WarningRounded';
import Refersh from '@material-ui/icons/RefreshRounded';
import { AxiosError } from 'axios';
import { Layout } from '../Layout';

export interface ErrorProps extends AxiosError, WithStyles<typeof styles> {
  reload?: () => void;
}

const styles = () =>
  createStyles({
    warning: {
      fontSize: 60
    }
  });

export const Error = withStyles(styles)(
  ({ classes, response, reload }: ErrorProps) => {
    const { status, statusText = '出現錯誤' } = response;
    const sidebarIcons = [];

    if (reload) {
      sidebarIcons.push({
        component: Refersh,
        onClick: () => reload()
      });
    }

    return (
      <Layout className="error" sidebarIcons={sidebarIcons}>
        <Warning className={classes.warning} />
        <div className="error-status">{status}</div>
        <div className="error-status-text">{statusText}</div>
      </Layout>
    );
  }
);
