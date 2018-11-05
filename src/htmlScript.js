'use strict';

function getSelectedTags() {
    const tags = [];
    document.querySelectorAll('.tag-list input[type="checkbox"]')
        .forEach(checkbox => {
            if (checkbox.checked) {
                tags.push(checkbox.value);
            }
        });
    return tags;
}

function filterScenariosInFeature(feature) {
    const tags = getSelectedTags();
    return feature.scenarios
        .filter(scenario => {
            const scenarioTags = scenario.tags;
            const isScenarioWithoutTags = tags.includes('') && scenarioTags.length === 0;
            const scenarioMatchesSomeTags = tags.some(tag => scenarioTags.includes(tag));
            return isScenarioWithoutTags || scenarioMatchesSomeTags;
        });
}

function updateFeatureList() {
    document.querySelectorAll('.feature-list button')
        .forEach((button, index) => {
            const feature = features[index];
            const filteredScenariosCount = filterScenariosInFeature(feature).length;
            if (filteredScenariosCount > 0) {
                button.classList.remove('button-no-scenarios');
            } else {
                button.classList.add('button-no-scenarios');
            }
            button.querySelector('.button-scenario-count').textContent =
                `${filteredScenariosCount}`;
        });
}

function showFeature(index) {
    const feature = features[index];
    const filteredScenarios = filterScenariosInFeature(feature);
    const featureDetails = document.querySelector('.feature-details');
    featureDetails.innerHTML = `
        <h3>${feature.name}</h3>    
        <ol>
        ${filteredScenarios
            .map((scenario, index) =>
                `<li class="scenario-name
                    ${index % 2 ? 'scenario-name-light' : 'scenario-name-dark'}
                    ${scenario.tags.join(' ')}    
                ">${scenario.name}
                </li>`)
            .join('')
        }
        </ol>`;    
}

window.onload = () => document.querySelector('.feature-list button').click();
