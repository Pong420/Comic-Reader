import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  SyntheticEvent
} from 'react';
import { RouteComponentProps, generatePath } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Layout } from '../Layout';
import { Image } from './Image';
import { ConfirmDialog } from '../Mui/Dialog';
import { Snackbar } from '../Mui/Snackbar';
import { classes } from '../../utils/classes';
import { useBoolean } from '../../utils/useBoolean';
import { RootState, ContentActionCreators } from '../../store';
import { PATHS, MESSAGE } from '../../constants';

interface MatchParams {
  comicID: string;
  chapterID: string;
  pageNo: string;
}

const mapStateToProps = ({ content }: RootState) => ({ ...content });
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(ContentActionCreators, dispatch);

type Props = RouteComponentProps<MatchParams> &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export function ContentComponent({
  match,
  history,
  fitToPage,
  imagesDetails,
  totalPage,
  prevId,
  nextId,
  getContent,
  cancelGetContent
}: Props) {
  const { comicID, chapterID, pageNo } = match.params;
  const currIndex = Number(pageNo) - 1;
  const contentRef = useRef<HTMLDivElement>(null);
  const [dialogOpened, dialog] = useBoolean();
  const [snackbarOpened, snackbar] = useBoolean();
  const [msg, setMsg] = useState('');

  const clearMsg = useCallback(() => setMsg(''), []);

  const navigate = (params: Partial<MatchParams>) =>
    history.replace(
      generatePath(PATHS.CONTENT, {
        ...match.params,
        ...params
      })
    );

  const handleConfirm = () => {
    if (msg === MESSAGE.GOTO_NEXT_CHAPTER) {
      navigate({ chapterID: '' + nextId, pageNo: '1' });
    } else if (msg === MESSAGE.GOTO_PREV_CHAPTER) {
      navigate({ chapterID: '' + prevId, pageNo: '1' });
    }
  };

  const pageNavigate = (step: number) => (
    evt?: SyntheticEvent<HTMLElement>
  ) => {
    evt && evt.preventDefault();
    const newPageNo = Number(pageNo) + step;

    if (newPageNo < 1) {
      if (prevId) {
        setMsg(MESSAGE.GOTO_PREV_CHAPTER);
        dialog.on();
      } else {
        setMsg(MESSAGE.FIRST_CHAPTER);
        snackbar.on();
      }
    } else if (newPageNo > totalPage) {
      if (nextId) {
        setMsg(MESSAGE.GOTO_NEXT_CHAPTER);
        dialog.on();
      } else {
        setMsg(MESSAGE.LAST_CHAPTER);
        snackbar.on();
      }
    } else {
      navigate({ pageNo: '' + newPageNo });
    }
  };

  useEffect(() => {
    getContent({ comicID, chapterID });
    return () => {
      cancelGetContent();
    };
  }, [comicID, chapterID, getContent, cancelGetContent]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [match.params]);

  return (
    <>
      <Layout loading={false}>
        <div
          className={classes('content', fitToPage && 'fit-to-page')}
          onClick={pageNavigate(1)}
          onContextMenu={pageNavigate(-1)}
          ref={contentRef}
        >
          {imagesDetails.map((image, index) => (
            <Image key={image.src} hidden={currIndex !== index} {...image} />
          ))}
        </div>
      </Layout>
      <ConfirmDialog
        maxWidth="xs"
        open={dialogOpened}
        handleClose={dialog.off}
        handleConfirm={handleConfirm}
        onExited={clearMsg}
      >
        {msg}
      </ConfirmDialog>
      <Snackbar
        open={snackbarOpened}
        onClose={snackbar.off}
        message={msg}
        onExited={clearMsg}
      />
    </>
  );
}

export const Content = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentComponent);
