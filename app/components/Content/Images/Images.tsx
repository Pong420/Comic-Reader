import React, { KeyboardEvent, useLayoutEffect, useRef } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState, ImagesState, ImageActionCreators } from '../../../store';

export interface ImageProps {
  activeIndex: number;
  onKeyDown: (evt: KeyboardEvent<HTMLDivElement>) => void;
}

function mapStateToProps({ images }: RootState, ownProps: any) {
  return { ...images, ownProps };
}

function mapDispathToProps(dispath: Dispatch) {
  return bindActionCreators(ImageActionCreators, dispath);
}

const NO_OF_IMAGES_PRELOAD = 5;

export function ImagesComponent({
  onKeyDown,
  activeIndex,
  imagesDetail,
  preloadImage,
  stopPreloadImage
}: ImageProps & ImagesState & typeof ImageActionCreators) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    scrollRef.current!.scrollTop = 0;
    scrollRef.current!.focus();

    if (imagesDetail[activeIndex]) {
      const imagesForPreload = imagesDetail
        .slice(activeIndex, activeIndex + NO_OF_IMAGES_PRELOAD)
        .filter(({ loaded, error }) => !loaded && !error);

      imagesForPreload.length && preloadImage(imagesForPreload, 0);

      return () => {
        stopPreloadImage();
      };
    }
  }, [, activeIndex]);

  return (
    <div className="images" tabIndex={0} onKeyDown={onKeyDown} ref={scrollRef}>
      <div className="image-loading">撈緊...</div>
      {imagesDetail.map(detail => {
        const { src, loaded, error, index } = detail;
        const hidden = index !== activeIndex;
        const imgSrc = loaded ? src : '';

        if (error) {
          return <div className="image-error">張圖撈唔到，試下下一頁</div>;
        }

        return <img key={index} src={imgSrc} hidden={hidden} />;
      })}
    </div>
  );
}

export const Images = connect(
  mapStateToProps,
  mapDispathToProps
)(ImagesComponent);
