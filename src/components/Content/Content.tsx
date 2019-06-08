import React, { useEffect, SyntheticEvent, useRef } from 'react';
import { RouteComponentProps, generatePath } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Layout } from '../Layout';
import { Image } from './Image';
import { RootState, ContentActionCreators } from '../../store';
import { PATHS } from '../../constants';

interface MatchParams {
  comicID: string;
  chapterID: string;
  pageNo: string;
}

const mapStateToProps = ({ content }: RootState) => ({ ...content });
const mapDispatchToProps = (dispath: Dispatch) =>
  bindActionCreators(ContentActionCreators, dispath);

type Props = RouteComponentProps<MatchParams> &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export function ContentComponent({
  match,
  history,
  imagesDetails,
  getContent,
  cancelGetContent
}: Props) {
  const { comicID, chapterID, pageNo } = match.params;
  const currIndex = Number(pageNo) - 1;
  const contentRef = useRef<HTMLDivElement>(null);

  const navigate = (params: Partial<MatchParams>) =>
    history.replace(
      generatePath(PATHS.CONTENT, {
        ...match.params,
        ...params
      })
    );

  const pageNavigate = (step: number) => (
    evt?: SyntheticEvent<HTMLElement>
  ) => {
    evt && evt.preventDefault();
    navigate({ pageNo: String(Number(pageNo) + step) });
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
    <Layout loading={false}>
      <div
        className="content"
        onClick={pageNavigate(1)}
        onContextMenu={pageNavigate(-1)}
        ref={contentRef}
      >
        {imagesDetails.map((image, index) => (
          <Image key={image.src} hidden={currIndex !== index} {...image} />
        ))}
      </div>
    </Layout>
  );
}

export const Content = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentComponent);
