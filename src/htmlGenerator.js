'use strict';

const {
    getAllScenarios,
    getUniqueTagsFromFeatures,
    getScenariosWithTag,
    getScenariosWithoutTag
} = require('./features');

class HtmlGenerator {

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

    createAllTagsSelector() {
        return `<span class="tag-checkbox-name">
                    <input id="allTagsSelector" type="checkbox" checked onclick="onAllTagsSelectedChanged()"/>
                    Select/Deselect All
                </span>`;
    }

    createTagSelector(tag, name, scenariosWithTagCount) {
        const scenariosWithTagPercentage = scenariosWithTagCount / this.scenarios.length * 100;
        return `<span class="tag-checkbox-name">
                    <input type="checkbox" value="${tag}" checked onclick="onSelectedTagsChanged()"/>
                    ${name}
                    <span class="tag-details">
                        (${scenariosWithTagCount} scenarios / ${scenariosWithTagPercentage.toFixed(2)}%)
                    </span>
                </span>`;
    }

    createTagList() {
        const tags = getUniqueTagsFromFeatures(this.features)
            .sort();
        if (tags.length === 0) {
            return '';
        }
        return `
        ${this.createAllTagsSelector()}
        <br/>
        <h3 class="tag-list">
        ${this.createTagSelector('', 'NO TAGS', getScenariosWithoutTag(this.scenarios).length)}
        ${tags
            .map(tag => this.createTagSelector(tag, tag, getScenariosWithTag(this.scenarios, tag).length))
            .join('')
        }
        </h3>`;
    }

    createFeatureList() {
        return `<div class="feature-list">
            <div class="feature-list-header">
                <span class="button-title">Feature title</span>
                <span class="button-scenario-count"># of scenarios</span>
            </div>
            <div class="feature-list-items">
            ${this.features
                .map((feature, index) =>
                    `<button class="feature_${index}" onclick="selectFeature(${index})">
                        <div class="button-title">${feature.name}</div>
                        <div class="button-scenario-count">${feature.scenarios.length}</div>
                    </button>`)
                .join('')
            }
            </div>
            </div>`;
    }

    generate() {
        return `
            <html>
                <head>
                    <style>${this.css}</style>
                    <script>
                        ${this.script}
                        const features = ${JSON.stringify(this.features)};
                    </script>
                </head>
                <body>
                    ${this.createTitle()}
                    ${this.createTagList()}
                    <div class="feature-root-container">                        
                        ${this.createFeatureList()}
                        <div class="feature-details"></div>
                    </div>
                </body>
            </html>`;
    }
}

module.exports = HtmlGenerator;
