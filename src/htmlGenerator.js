'use strict';

const {
    getAllScenarios,
    getUniqueTagsFromFeatures,
    getScenariosWithTag
} = require('./features');

class htmlGenerator {

    constructor(features, css, script) {
        if (!features) {
            throw new Error('No features array passed');
        }
        if (!css) {
            throw new Error('No CSS specified');
        }
        if (!script) {
            throw new Error('No script specified');
        }        
        this.features = features;
        this.css = css;
        this.script = script;
        this.scenarios = getAllScenarios(features);
    }

    createTitle() {
        return `<h1 class="title">${this.features.length} Features</h1>
                <h2 class="title">${this.scenarios.length} scenarios</h2>`;
    }

    createTagList() {
        const tags = getUniqueTagsFromFeatures(this.features)
            .sort();
        if (tags.length === 0) {
            return '';
        } 
        let html = '<h3 class="tag-list">';
        tags.forEach(tag => {
            const scenariosWithTagCount = getScenariosWithTag(this.scenarios, tag).length;
            const scenariosWithTagPercentage = scenariosWithTagCount / this.scenarios.length * 100;
            html += `<span class="tag-checkbox-name">
                        ${tag}
                        <span class="tag-details">
                            (${scenariosWithTagCount} scenarios / ${scenariosWithTagPercentage.toFixed(2)}%)
                        </span>
                    </span>`;
        });
        return html + '</h3>';
    }

    createFeatureList() {
        return `<div class="feature-list">
            ${this.features
                .map((feature, index) =>
                    `<button onclick="showFeature(${index})">
                        <div class="button-title">${feature.name}</div>
                        <div>(${feature.scenarios.length})</div>
                    </button>`)
                .join('')
            }
            </div>`;
    }

    createScenarioList(feature) {
        return `<ol>
            ${feature.scenarios
                .map((scenario, index) =>
                    `<li class="scenario-name
                        ${index % 2 ? 'scenario-name-light' : 'scenario-name-dark'}">${scenario.name}
                    </li>`)
                .join('')
            }
            </ol>`;
    } 

    createFeaturesDetails() {
        return `<div class="feature-details">
            ${this.features
                .map((feature, index) =>
                    `<div id="feature_${index}" class="feature feature-hidden">
                        <h3>${feature.name}</h3>
                        ${this.createScenarioList(feature)}
                    </div>`
                )
                .join('')
            }
            </div>`;
    }

    generate() {
        return `
            <html>
                <head>
                    <style>${this.css}</style>
                    <script>${this.script}</script>
                </head>
                <body>
                    ${this.createTitle()}
                    ${this.createTagList()}
                    <div class="feature-root-container">
                        ${this.createFeatureList()}
                        ${this.createFeaturesDetails()}
                    </div>
                </body>
            </html>`;
    }
}

module.exports = htmlGenerator;
