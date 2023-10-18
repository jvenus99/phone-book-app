import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 3000;

import routes from './presentation/routes';

app.use(bodyParser.json());
app.use(cors());

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server running in port ${port}`);
});
