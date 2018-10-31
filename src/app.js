'use strict';

const { existsSync } = require('fs');
const { getFeaturesInPath, getFeatureData } = require('./features');
const createFeaturesHtml = require('./html');

const targetPath = process.argv[2];

if (!targetPath) {
    throw new Error('No target path specified');
}

if (!existsSync(targetPath)) {
    throw new Error('The target path specified does not exist');
}

const features = getFeaturesInPath(targetPath)
    .map(featurePath => getFeatureData(featurePath));
console.log(createFeaturesHtml(features));
