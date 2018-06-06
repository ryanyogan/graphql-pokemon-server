import bodyParser from 'body-parser';
import cors from 'cors';

const setGlobalMiddleware = app => {
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
};

export default setGlobalMiddleware;
