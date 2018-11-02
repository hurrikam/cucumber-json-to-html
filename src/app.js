'use strict';

const { existsSync, readFileSync } = require('fs');
const { getFeaturesInJsonFile } = require('./features');

const filePath = process.argv[2];

if (!filePath) {
    throw new Error('No target file path specified');
}

if (!existsSync(filePath)) {
    throw new Error('The target file path specified does not exist');
}

const features = getFeaturesInJsonFile(filePath);
const css = readFileSync('report.css')
const javascript = require('html.js')
const html = readFileSync('report.html')
    .replace('{FEATURES_JSON}', JSON.stringify(features))
    .replace('{INLINE_JAVASCRIPT}', JSON.stringify(javascript))
    .replace('{INLINE_CSS}', css);

console.log(html);
