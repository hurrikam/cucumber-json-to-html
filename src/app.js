'use strict';

const { existsSync, readFileSync } = require('fs');
const path = require('path');
const { getFeaturesInJsonFile } = require('./features');

const filePath = process.argv[2];

if (!filePath) {
    throw new Error('No target file path specified');
}

if (!existsSync(filePath)) {
    throw new Error('The target file path specified does not exist');
}

const features = getFeaturesInJsonFile(filePath);
const css = readFileSync(path.join(__dirname, 'report.css'));
const reportScript = require('./html.js');
const html = readFileSync(path.join(__dirname, 'report.html'))
    .toString()
    // .replace('{FEATURES_JSON}', JSON.stringify(features))
    .replace('{INLINE_JAVASCRIPT}', `(${reportScript.toString()})();`)
    .replace('{INLINE_CSS}', css);

console.log(html);
