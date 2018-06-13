import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import {enableProdMode} from '@angular/core';

import * as express from 'express';

import {join} from 'path';
import {readFileSync} from 'fs';

const PORT = process.env.PORT || 4001;
const DIST_FOLDER = join(process.cwd(), 'dist');

/**
 * Fix document is not defined and window is not defined
 */
const template = readFileSync(join(DIST_FOLDER, 'browser', 'index.html')).toString();
const domino = require('domino');
const fs = require('fs');
const path = require('path');
const win = domino.createWindow(template);
const files = fs.readdirSync(`${process.cwd()}/dist/server`);

win.SVGPathElement = function () {};
global['window'] = win;
Object.defineProperty(win.document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true
    };
  },
});
Object.defineProperty(win.document.body.style, 'box-shadow', {
  value: () => {
    return {
      enumerable: true,
      configurable: true
    };
  },
});
global['document'] = win.document;
global['navigator'] = win.navigator;
global['CSS'] = undefined;

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();
const mainFiles = files.filter(file => file.startsWith('main'));
const hash = mainFiles[0].split('.')[1];
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require(`./dist/server/main.${hash}`);

// Express Engine
import {ngExpressEngine} from '@nguniversal/express-engine';
// Import module map for lazy loading
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';


app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

/* - Example Express Rest API endpoints -
  app.get('/api/**', (req, res) => { });
*/

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser'), {
  maxAge: '1y'
}));

// ALl regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
