import express = require('express');
import * as path from 'path';

import YggRoutes from './ygg/ygg.route';

export function configure(app: express.Application) {
    // Serve files from built front
    app.use(express.static(path.join(__dirname, '__front__')));

    app.use('/api', YggRoutes);
    // app.use('/api', LoginRoutes);
    // app.use('/api', PlayerRoutes);
    // app.use('/api', GameRoutes);
    // app.use('/api', TeamRoutes);

    app.use('*', express.static(path.join(__dirname, '__front__')));
}
