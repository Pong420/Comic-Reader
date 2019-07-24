import React, { useMemo, CSSProperties } from 'react';
import { connect, DispatchProp } from 'react-redux';
import { RootState } from '../../store';

interface Props {
  index: number;
  hidden?: boolean;
}

const mapStatetoProps = (state: RootState, { index }: Props) => ({
  ...state.content.imagesDetails[index]
});

function ImageComponent({
  src,
  loaded,
  error,
  width,
  height,
  hidden
}: Props & DispatchProp & ReturnType<typeof mapStatetoProps>) {
  const style = useMemo<CSSProperties>(() => ({ width, height }), [
    width,
    height
  ]);

  return (
    <div className="image" hidden={hidden} style={style}>
      {error ? 'FAIL' : loaded ? <img src={src} alt={src} /> : 'LOADING...'}
    </div>
  );
}

export const Image = connect(mapStatetoProps)(ImageComponent);
