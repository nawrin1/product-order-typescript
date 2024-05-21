import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes



const getController = (req: Request, res: Response) => {
  const status = 200;
  res.sendStatus(status);
};

app.get('/', getController);

export default app;
