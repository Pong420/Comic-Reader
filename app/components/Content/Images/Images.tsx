import React, {
  MouseEvent,
  KeyboardEvent,
  useLayoutEffect,
  useRef
} from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState, ImagesState, ImageActionCreators } from '../../../store';

export interface ImageProps {
  activeIndex: number;
  onContextMenu(evt?: MouseEvent<HTMLDivElement>): void;
  onClick(evt?: MouseEvent<HTMLDivElement>): void;
  onKeyDown(evt: KeyboardEvent<HTMLDivElement>): void;
}

const NO_OF_IMAGES_PRELOAD = 5;

function mapStateToProps({ images }: RootState, ownProps: any) {
  return { ...images, ownProps };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(ImageActionCreators, dispatch);
}

export function ImagesComponent({
  onClick,
  onContextMenu,
  onKeyDown,
  activeIndex,
  imagesDetail,
  fitToPage,
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
    <div
      className="images"
      tabIndex={0}
      onClick={onClick}
      onContextMenu={onContextMenu}
      onKeyDown={onKeyDown}
      ref={scrollRef}
    >
      <div className="image-loading">撈緊...</div>
      {imagesDetail.map(detail => {
        const { src, loaded, error, index, dimensions } = detail;
        const [width, height] = dimensions;
        const hidden = index !== activeIndex || !width || !height;
        const imgSrc = loaded ? src : '';
        const className = [
          fitToPage && 'fit-to-page',
          width < height ? 'portrait' : 'landscape'
        ];

        if (error) {
          return <div className="image-error">張圖撈唔到，試下下一頁</div>;
        }

        return (
          <img
            className={className.join(' ').trim()}
            key={index}
            src={imgSrc}
            hidden={hidden}
          />
        );
      })}
    </div>
  );
}

export const Images: React.FC<ImageProps> = connect(
  mapStateToProps,
  mapDispatchToProps
)(ImagesComponent);
