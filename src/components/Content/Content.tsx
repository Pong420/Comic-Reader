import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  SyntheticEvent,
  useCallback
} from 'react';
import { connect, DispatchProp } from 'react-redux';
import { RouteComponentProps, generatePath } from 'react-router-dom';
import { push } from 'connected-react-router';
import { Snackbar } from '../Mui/Snackbar';
import { ConfirmDialog } from '../Mui/Dialog';
import { Layout } from '../Layout';
import { Image } from './Image';
import { getContent, RootState } from '../../store';
import { useMouseTrap } from '../../utils/useMouseTrap';
import { PATHS, MESSAGE } from '../../constants';
import { useBoolean } from '../../utils/useBoolean';
import { classes } from '../../utils/classes';

interface MatchParams<T = string> {
  comicID: T;
  chapterID: T;
  pageNo: T;
}

interface Props extends RouteComponentProps<MatchParams> {}

const mapStateToProps = (state: RootState) => ({
  images: state.content.images,
  prevId: state.content.prevId,
  nextId: state.content.nextId,
  fitToPage: state.content.fitToPage
});

// TODO:
// Add shortcuts guide => sidebar ?
// save fit to page

export function ContentComponent({
  dispatch,
  match,
  prevId,
  nextId,
  images,
  fitToPage
}: Props & DispatchProp & ReturnType<typeof mapStateToProps>) {
  const totalPage = images.length;
  const contentRef = useRef<HTMLDivElement>(null);
  const { comicID, chapterID, pageNo } = match.params;
  const [
    snackbarOpened,
    { on: openSnackbar, off: closeSnackbar }
  ] = useBoolean();
  const [dialogOpened, { on: openDialog, off: closeDialog }] = useBoolean();
  const [msg, setMsg] = useState('');
  const clearMsg = useCallback(() => setMsg(''), []);

  const wrappedRouterAction = useCallback(
    (...args: Parameters<typeof generatePath>) =>
      dispatch(push(generatePath(...args))),
    [dispatch]
  );

  const navigate = useCallback(
    (params: Partial<MatchParams<number>>) =>
      wrappedRouterAction(PATHS.CONTENT, {
        ...match.params,
        ...params
      }),
    [wrappedRouterAction, match.params]
  );

  const handleConfirm = useCallback(() => {
    if (msg === MESSAGE.GOTO_NEXT_CHAPTER) {
      navigate({ chapterID: nextId, pageNo: 1 });
    } else if (msg === MESSAGE.GOTO_PREV_CHAPTER) {
      navigate({ chapterID: prevId, pageNo: 1 });
    }
  }, [msg, nextId, prevId, navigate]);

  const [nextPage, prevPage] = useMemo(() => {
    const handler = (step: number) => (
      evt?: SyntheticEvent<HTMLElement> | ExtendedKeyboardEvent
    ) => {
      evt && evt.preventDefault();

      const newPageNo = Number(pageNo) + step;
      if (newPageNo <= 0) {
        if (prevId) {
          setMsg(MESSAGE.GOTO_PREV_CHAPTER);
          openDialog();
        } else {
          setMsg(MESSAGE.FIRST_CHAPTER);
          openSnackbar();
        }
      } else if (newPageNo > totalPage) {
        if (nextId) {
          setMsg(MESSAGE.GOTO_NEXT_CHAPTER);
          openDialog();
        } else {
          setMsg(MESSAGE.LAST_CHAPTER);
          openSnackbar();
        }
      } else {
        navigate({ pageNo: newPageNo });
      }
    };
    return [handler(1), handler(-1)];
  }, [navigate, pageNo, prevId, nextId, totalPage, openDialog, openSnackbar]);

  useEffect(() => {
    dispatch(getContent({ comicID, chapterID }));
  }, [comicID, chapterID, dispatch]);

  useEffect(() => {
    const el = contentRef.current;
    el && el.scrollTo(0, 0);
  }, [pageNo]);

  useMouseTrap('up', prevPage);
  useMouseTrap('left', prevPage);
  useMouseTrap('down', nextPage);
  useMouseTrap('right', nextPage);

  return (
    <>
      <Layout>
        <div
          className={classes('content', fitToPage && 'fit-to-page')}
          ref={contentRef}
          onClick={nextPage}
          onContextMenu={prevPage}
        >
          {images.map((src, index) => (
            <Image
              key={src}
              index={index}
              hidden={pageNo !== String(index + 1)}
            />
          ))}
        </div>
      </Layout>
      <ConfirmDialog
        maxWidth="xs"
        open={dialogOpened}
        onClose={closeDialog}
        onConfirm={handleConfirm}
        onExited={clearMsg}
      >
        {msg}
      </ConfirmDialog>
      <Snackbar
        message={msg}
        open={snackbarOpened}
        onClose={closeSnackbar}
        onExited={clearMsg}
      />
    </>
  );
}

export const Content = connect(mapStateToProps)(ContentComponent);
