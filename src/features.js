'use strict';

const { readFileSync } = require('fs');

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

function getScenariosInFeature(feature, tags) {
    return feature.elements
        .filter(element => element.type === 'scenario')
        .map(scenario => {
            const scenarioTags = getTagsFromElement(scenario);
            return {
                name: scenario.name,
                tags: [...scenarioTags, ...tags]
            };
        });
}

function getTagsFromElement(element) {
    return element.tags.map(tag => tag.name) || [];
}

// function getTagsFromFeature(feature) {
//     const tags = getTagsFromElement(feature);
//     const scenarios = getScenariosInFeature(feature);
//     scenarios.forEach(scenario => tags.push(...getTagsFromElement(scenario)));
//     return tags;
// }

// function getTagsFromFeatures(features) {
//     const tags = [];
//     features.forEach(feature => tags.push(...getTagsFromFeature(feature)));
//     return tags.filter((tag, index) => tags.indexOf(tag) === index);
// }

module.exports = {
    getFeaturesInJsonFile,
    getScenariosInFeature,
    // getTagsFromFeatures
};
