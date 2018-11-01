'use strict';

const { lstatSync, readdirSync, readFileSync } = require('fs');
const { join } = require('path');
const { EOL } = require('os');

const FEATURE_KEYWORD = 'Feature:';
const SCENARIO_KEYWORD = 'Scenario:';
const SCENARIO_OUTLINE_KEYWORD = 'Scenario Outline:';
const EXAMPLES_KEYWORD = 'Examples:';
const EXAMPLES_FIELD_SEPARATOR = '|';

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

function getExamplesData(textLines, startIndex) {
    textLines.forEach(textLine => {
        if (textLine.startsWith(EXAMPLES_FIELD_SEPARATOR)) {
            const fields = textLine.split(EXAMPLES_FIELD_SEPARATOR);
            feature.title = textLine.substring(FEATURE_KEYWORD.length);
            return;
        }
    });
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
        if (textLine.startsWith(FEATURE_KEYWORD)) {
            feature.title = textLine.substring(FEATURE_KEYWORD.length);
            return;
        }
        if (textLine.startsWith(SCENARIO_KEYWORD)) {
            const scenarioTitle = textLine.substring(SCENARIO_KEYWORD.length);
            feature.scenarios.push(scenarioTitle);
            return;
        }
        if (textLine.startsWith(SCENARIO_OUTLINE_KEYWORD)) {
            const scenarioTitle = textLine.substring(SCENARIO_OUTLINE_KEYWORD.length);
            feature.scenarios.push(scenarioTitle);
            return;
        }
        if (textLine.startsWith(EXAMPLES_KEYWORD)) {
            return;
        }
    });
    return feature;
}

module.exports = {
    getFeaturesInPath,
    getFeatureData
};
