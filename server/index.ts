import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import compression from 'compression';
import { AxiosError } from 'axios';
import {
  getLatestUpdate,
  getComicData,
  getContentData,
  search
} from './source/IKanman';
import {
  ComicItemList,
  ComicData,
  ContentData,
  SearchResults
} from '../typing';

const app = express();

app.use(cors());
app.use(compression());

const getErrorCode = (error: AxiosError) => {
  if (error.response) {
    return error.response.status;
  }

  return 500;
};

export const startServer = (PORT: number | string = 8080) => {
  return new Promise((resolve, rejcet) => {
    app.use('/', express.static(path.join(__dirname, '../app')));

    app.get('/update', async (req: Request, res: Response) => {
      getLatestUpdate(req.query || {})
        .then((data: ComicItemList) => {
          res.json(data);
        })
        .catch(err => {
          res.status(getErrorCode(err));
          res.json([]);
        });
    });

    app.get('/comic/:comicID', async (req: Request, res: Response) => {
      getComicData(req.params || {})
        .then((data: ComicData) => {
          res.json(data);
        })
        .catch(err => {
          res.status(getErrorCode(err));
          res.json({});
        });
    });

    app.get(
      '/content/:comicID/:chapterID',
      async (req: Request, res: Response) => {
        getContentData(req.params || {})
          .then((data: ContentData) => {
            res.json(data);
          })
          .catch(err => {
            res.status(getErrorCode(err));
            res.json({});
          });
      }
    );

    app.get('/search', async (req: Request, res: Response) => {
      search(req.query)
        .then((data: SearchResults) => {
          res.json(data);
        })
        .catch(err => {
          res.status(getErrorCode(err));
          res.json([]);
        });
    });

    app.listen(PORT, () => {
      resolve(app);
      console.log(`local server listening on port ${PORT}`);
    });
  });
};
