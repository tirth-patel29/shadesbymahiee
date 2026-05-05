export const config = {
  runtime: 'edge',
};

import server from '../dist/server/server.js';

export default (req) => {
  return server.fetch(req);
};
