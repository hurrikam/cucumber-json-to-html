'use strict';

const { existsSync, readFileSync } = require('fs');
const path = require('path');
const { getFeaturesInJsonFile } = require('./features');
const HtmlGenerator = require('./htmlGenerator');

const filePath = process.argv[2];

if (!filePath) {
    throw new Error('No target file path specified');
}

if (!existsSync(filePath)) {
    throw new Error('The target file path specified does not exist');
}

const features = getFeaturesInJsonFile(filePath);
const css = readFileSync(path.join(__dirname, 'html.css'));
const script = readFileSync(path.join(__dirname, 'htmlScript.js'));
const htmlGenerator = new HtmlGenerator(features, css, script);
const html = htmlGenerator.generate();

console.log(html);
