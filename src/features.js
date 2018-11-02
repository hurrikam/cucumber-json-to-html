'use strict';

const { readFileSync } = require('fs');

function getFeaturesInJsonFile(filePath) {
    const fileContent = readFileSync(filePath);
    return JSON.parse(fileContent);
}



module.exports = {
    getFeaturesInJsonFile,
    getScenariosInFeature,
    getTagsFromFeatures
};
