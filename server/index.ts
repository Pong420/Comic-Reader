import express, { Request, Response } from 'express';
import cors from 'cors';
import compression from 'compression';
import {
  getLatestUpdate,
  getComicData,
  getContentData
} from './source/IKanman';
import { ComicItemList, ComicData, ContentData } from '../typing';

const app = express();

app.use(cors());
app.use(compression());

app.get('/update', async (req: Request, res: Response) => {
  getLatestUpdate(req.query || {})
    .then((data: ComicItemList) => {
      res.json(data);
    })
    .catch(() => {
      res.json([]);
    });
});

app.get('/comic/:comicID', async (req: Request, res: Response) => {
  getComicData(req.params || {})
    .then((data: ComicData) => {
      res.json(data);
    })
    .catch(() => {
      res.json({});
    });
});

app.get('/content/:comicID/:chapterID', async (req: Request, res: Response) => {
  getContentData(req.params || {})
    .then((data: ContentData) => {
      res.json(data);
    })
    .catch(() => {
      res.json({});
    });
});

export const startServer = (PORT: number = 8080) => new Promise((resolve, reject) => {
    app.listen(PORT, () => {
      console.log(`local server listening on port ${PORT}`);
      resolve();
    });
  });

if (process.env.NODE_ENV !== 'production') {
  startServer();
}
