import React, { useEffect, HTMLAttributes } from 'react';
import { Grid, GridPorps } from './Grid';
import { useBoolean } from '../../utils/useBoolean';
import { classes } from '../../utils/classes';
import RefreshIcon from '@material-ui/icons/RefreshRounded';

export interface IncompleteGridProps extends GridPorps {
  onRefetch(): void;
}

const style = { marginTop: 10 };

function Loading() {
  return <div className="grid-layer">LOADING...</div>;
}

function RefetchLayer(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className="grid-layer click-to-refetch">
      <RefreshIcon color="primary" />
      <div style={style}>點擊重新獲取資料</div>
    </div>
  );
}

export function IncompleteGrid({
  className,
  children,
  onRefetch,
  ...props
}: IncompleteGridProps) {
  const [loading, { on, off }] = useBoolean();
  const invalid = ['cover', 'name', 'latest']
    .map(key => Object.keys(props).includes(key))
    .includes(false);

  useEffect(() => {
    off();
  }, [off, invalid]);

  return (
    <Grid {...props} className={classes('incomplete-grid', className)}>
      {invalid &&
        (loading ? (
          <Loading />
        ) : (
          <RefetchLayer
            onClick={() => {
              onRefetch();
              on();
            }}
          />
        ))}
      {children}
    </Grid>
  );
}
