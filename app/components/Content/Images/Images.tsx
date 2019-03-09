import React, { KeyboardEvent, useEffect } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  RootState,
  ImagesState,
  ImageActionCreators
  // ImageActions
} from '../../../store';

// TODO:
// - Error Handling

export interface ImageProsp {
  activeIndex: number;
  onKeyDown: (evt: KeyboardEvent<HTMLDivElement>) => void;
}

function mapStateToProps({ images }: RootState, ownProps: any) {
  return { ...images, ownProps };
}

function mapDispathToProps(dispath: Dispatch) {
  return bindActionCreators(ImageActionCreators, dispath);
}

export function ImagesComponent({
  onKeyDown,
  activeIndex,
  imagesDetail,
  preloadImage,
  stopPreloadImage
}: ImageProsp & ImagesState & typeof ImageActionCreators) {
  useEffect(() => {
    if (imagesDetail[activeIndex]) {
      preloadImage(imagesDetail, activeIndex);

      return () => {
        stopPreloadImage();
      };
    }
  }, [imagesDetail.length, activeIndex]);

  return (
    <div className="images" tabIndex={0} onKeyDown={onKeyDown}>
      <div className="image-loading">撈緊...</div>
      {imagesDetail.map((detail, index) => {
        const { src, loaded, error } = detail;
        const hidden = index !== activeIndex;
        const imgSrc = loaded ? src : '';

        if (error) {
          return <div className="image-error">張圖撈唔到，試下下一頁</div>;
        }

        return (
          <img
            key={index}
            src={imgSrc}
            hidden={hidden}
            // onLoad={() => {
            //   loadImageEnded({ ...detail, loaded: true });
            // }}
            // onError={() => {
            //   loadImageEnded({ ...detail, error: true });
            // }}
          />
        );
      })}
    </div>
  );
}

export const Images = connect(
  mapStateToProps,
  mapDispathToProps
)(ImagesComponent);
