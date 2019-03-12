import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Fab, { FabProps } from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import CloseIcon from '@material-ui/icons/Close';
import FitToPage from '@material-ui/icons/FullscreenExit';
import FitToWidth from '@material-ui/icons/Fullscreen';
import {
  RootState,
  ImagesState,
  ImageActionCreators,
  ImageDimenClassNameMaping
} from '../../../store';
import { ImageDimenClassName } from '../../../../typing';

const style = () => {
  const dimen = 40;

  return createStyles({
    fab: {
      marginTop: 10,
      width: dimen,
      height: dimen
    }
  });
};

function mapStateToProps({ images }: RootState, ownProps: any) {
  return { ...images, ...ownProps };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(ImageActionCreators, dispatch);
}

const FabButton = withStyles(style)(
  ({ classes, children, ...props }: WithStyles<typeof style> & FabProps) => {
    return (
      <div className="fab-button">
        <Fab className={classes.fab} {...props}>
          {children}
        </Fab>
      </div>
    );
  }
);

export function BaseComponent({
  imageDimenClassName,
  switchImageDimensions
}: ImagesState & typeof ImageActionCreators) {
  const { ImageDimenIcon } = getImageDimenIcon(imageDimenClassName);

  return (
    <>
      <div className="content-header">
        <div className="content-header-content">title</div>
      </div>
      <div className="content-float-buttons">
        <div className="content-float-buttons-content">
          <FabButton onClick={() => switchImageDimensions()}>
            <ImageDimenIcon />
          </FabButton>
          <FabButton>
            <Icon />
          </FabButton>
          <FabButton>
            <Icon />
          </FabButton>
        </div>
      </div>
    </>
  );
}

export const ContentControls = connect(
  mapStateToProps,
  mapDispatchToProps
)(BaseComponent);

function getImageDimenIcon(val: ImageDimenClassName) {
  const correspond = ImageDimenClassNameMaping(val);

  if (correspond === 'fit-to-page') {
    return {
      ImageDimenIcon: FitToPage,
      tooltip: '適合頁面'
    };
  }

  if (correspond === 'fit-to-width') {
    return {
      ImageDimenIcon: FitToWidth,
      tooltip: '適合寬度'
    };
  }

  return {
    ImageDimenIcon: CloseIcon,
    tooltip: '取消'
  };
}
