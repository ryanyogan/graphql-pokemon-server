import { createServer } from 'http';

import app from './server';
import config from './config';

const server = createServer(app);
let currentApp = app;

server.listen(config.port, () => {
  console.log(`Server is listening on port ${config.port}`); // eslint-disable-line
});

// This is a small little HMR config, you 100% do not need this at all
// however, remember when I kept restarting the server? And nodemon didn't cut
// it?  Yeah this will fix that problem for us :)
if (module.hot) {
  module.hot.accept(['./server'], () => {
    server.removeListener('request', currentApp);
    server.on('request', app);
    currentApp = app;
  });
}
