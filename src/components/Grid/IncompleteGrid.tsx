import React, { useEffect, HTMLAttributes } from 'react';
import { Grid, GridPorps } from './Grid';
import { getGridDataAPI } from '../../apis';
import { useBoolean } from '../../utils/useBoolean';
import { classes } from '../../utils/classes';
import { Schema$GridData } from '../../typings';
import RefreshIcon from '@material-ui/icons/RefreshRounded';

export interface IncompleteGridProps extends GridPorps {
  onRefetchSuccess(payload: Schema$GridData): void;
}

interface ContentProps extends HTMLAttributes<HTMLDivElement> {
  loading: boolean;
}

const style = { marginTop: 10 };

function Content({ loading, ...props }: ContentProps) {
  if (loading) {
    return <div className="grid-layer grid-loading-layer">LOADING...</div>;
  }

  return (
    <div {...props} className="grid-layer click-to-refetch">
      <RefreshIcon />
      <div style={style}>點擊重新獲取資料</div>
    </div>
  );
}

export function IncompleteGrid({
  className,
  children,
  onRefetchSuccess,
  ...props
}: IncompleteGridProps) {
  const [loading, { on, off }] = useBoolean();
  const incompleted = ['cover', 'name', 'latest']
    .map(key => Object.keys(props).includes(key))
    .includes(false);

  useEffect(() => {
    if (loading) {
      getGridDataAPI({ comicID: props.comicID })
        .then(onRefetchSuccess)
        .finally(off);
    }
  }, [props.comicID, loading, off, onRefetchSuccess]);

  return (
    <Grid {...props} className={classes('incomplete-grid', className)}>
      {incompleted && <Content loading={loading} onClick={on} />}
      {children}
    </Grid>
  );
}
