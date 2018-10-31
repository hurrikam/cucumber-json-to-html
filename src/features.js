'use strict';

const { lstatSync, readdirSync, readFileSync } = require('fs');
const { join } = require('path');
const { EOL } = require('os');

function getFeaturesInPath(path) {
    const featureFilePaths = [];
    readdirSync(path)
        .map(itemName => join(path, itemName))
        .forEach(itemPath => {
            if (lstatSync(itemPath).isDirectory()) {
                const featuresInSubDirectory = getFeaturesInPath(itemPath);
                featureFilePaths.push(...featuresInSubDirectory);
                return;
            }
            if (lstatSync(itemPath).isFile() && itemPath
                .toLowerCase()
                .trim()
                .endsWith('.feature')) {
                featureFilePaths.push(itemPath);
            }
        });
    return featureFilePaths;
}

function getFeatureData(filePath) {
    const feature = {
        filePath,
        scenarios: []
    };
    const textLines = readFileSync(filePath)
        .toString()
        .split(EOL)
        .map(textLine => textLine.trim());
    textLines.forEach(textLine => {
        if (textLine.startsWith('Feature')) {
            feature.title = textLine;
            return;
        }
        if (textLine.startsWith('Scenario')) {
            feature.scenarios.push(textLine)
        }
    });
    return feature;
}

module.exports = {
    getFeaturesInPath,
    getFeatureData
};
