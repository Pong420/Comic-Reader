import express, { Request, Response } from 'express';
import cors from 'cors';
import compression from 'compression';
import { AxiosError } from 'axios';
import {
  getLatestUpdate,
  getComicData,
  getContentData
} from './source/IKanman';
import { ComicItemList, ComicData, ContentData } from '../typing';

const app = express();

app.use(cors());
app.use(compression());

const getErrorCode = (error: AxiosError) => {
  if (error.response) {
    return error.response.status;
  }

  return 500;
};

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

app.get('/content/:comicID/:chapterID', async (req: Request, res: Response) => {
  getContentData(req.params || {})
    .then((data: ContentData) => {
      res.json(data);
    })
    .catch(err => {
      res.status(getErrorCode(err));
      res.json({});
    });
});

export const startServer = (PORT: number = 8080) =>
  new Promise((resolve, reject) => {
    app.listen(PORT, () => {
      console.log(`local server listening on port ${PORT}`);
      resolve();
    });
  });

if (process.env.NODE_ENV !== 'production') {
  startServer();
}
