import React, { useEffect } from 'react';
import { Grid, GridPorps } from './Grid';
import { useBoolean } from '../../utils/useBoolean';
import RefreshIcon from '@material-ui/icons/RefreshRounded';

interface Props extends GridPorps {
  onRefetch(): void;
}

const style = { marginTop: 10 };

export function IncompleteGrid({ onRefetch, ...props }: Props) {
  const [loading, { on, off }] = useBoolean();
  const invalid = ['cover', 'name', 'latest']
    .map(key => Object.keys(props).includes(key))
    .includes(false);

  useEffect(() => {
    off();
  }, [off, invalid]);

  return (
    <Grid {...props} className="incomplete-grid">
      {loading ? (
        <div className="grid-layer">LOADING...</div>
      ) : (
        invalid && (
          <div
            className="grid-layer click-to-refetch"
            onClick={() => {
              onRefetch();
              on();
            }}
          >
            <RefreshIcon color="primary" />
            <div style={style}>點擊重新獲取資料</div>
          </div>
        )
      )}
    </Grid>
  );
}
