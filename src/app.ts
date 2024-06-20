import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
const app: Application = express();
// parser
app.use(express.json());
// app.use(cors());
app.use(cors({ origin: ['http://localhost/5000'] }));

app.use('/api', router)

app.get('/', (req: Request, res: Response) => {
  // const a = 10;
  res.send("Server is running");
});
console.log(process.cwd());

export default app;
