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
  preloadImage
}: ImageProps & ImagesState & typeof ImageActionCreators) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    scrollRef.current!.scrollTop = 0;
    scrollRef.current!.focus();

    preloadImage(activeIndex);
  }, [activeIndex, preloadImage]);

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
          return (
            <div className="image-error" key={index}>
              張圖撈唔到，試下下一頁
            </div>
          );
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

export const Images = connect(
  mapStateToProps,
  mapDispatchToProps
)(ImagesComponent);
