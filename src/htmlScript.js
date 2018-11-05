'use strict';

function getSelectedTags() {
    const tagCheckboxes = document.querySelectorAll('.tag-list input[type="checkbox"]');
    if (tagCheckboxes.length === 0) {
        return [''];
    }
    const tags = [];
    tagCheckboxes.forEach(checkbox => {
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

function getActiveFeatureIndex() {
    const featureButtons = document.querySelectorAll('.feature-list button');
    for (let i = 0; i < featureButtons.length; i++) {
        if (featureButtons[i].classList.contains('active')) {
            return i;
        }
    }
}

function selectFeature(featureIndex) {
    document.querySelectorAll(`.feature-list button`).forEach((button, index) => {
        if (index === featureIndex) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
    const feature = features[featureIndex];
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

function onSelectedTagsChanges() {
    updateFeatureList();
    const activeFeatureIndex = getActiveFeatureIndex();
    selectFeature(activeFeatureIndex);
}

window.onload = () => document.querySelector('.feature-list button').click();
