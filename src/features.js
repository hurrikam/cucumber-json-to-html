'use strict';

const { readFileSync } = require('fs');

function getTagsFromElement(element) {
    return element.tags.map(tag => tag.name) || [];
}

function getFeaturesInJsonFile(filePath) {
    const fileContent = readFileSync(filePath);
    return JSON.parse(fileContent)
        .filter(element => element.keyword === 'Feature')
        .map(feature => {
            const featureTags = getTagsFromElement(feature);
            return {
                name: feature.name,
                scenarios: getScenariosInFeature(feature, featureTags)
            };
        });
}

function getScenariosInFeature(feature, featureTags) {
    return feature.elements
        .filter(element => element.type === 'scenario')
        .map(scenario => {
            const scenarioTags = getTagsFromElement(scenario);
            return {
                name: scenario.name,
                tags: [...scenarioTags, ...featureTags]
            };
        });
}

function getAllScenarios(features) {
    const scenarios = [];
    features.forEach(features => scenarios.push(...features.scenarios));
    return scenarios;
}

function getUniqueTagsFromFeatures(features) {
    const tags = [];
    features.forEach(feature => {
        feature.scenarios.forEach(scenario => tags.push(...scenario.tags))
    });
    return tags
        .filter((tag, index) => tags.indexOf(tag) === index);
}

function hasTagsFromArray(elementWithTags, otherTags) {
    return elementWithTags.tags.some(tag => otherTags.includes(tag));
}

function getScenariosWithTag(scenarios, tag) {
    return scenarios.filter(scenario => hasTagsFromArray(scenario, [ tag ]));
}

module.exports = {
    getFeaturesInJsonFile,
    getScenariosInFeature,
    getAllScenarios,
    getUniqueTagsFromFeatures,
    getScenariosWithTag
};
