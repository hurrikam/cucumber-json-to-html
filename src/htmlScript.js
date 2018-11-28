'use strict';

function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }

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
    const featureDetails = document.querySelector('.feature-details');
    featureDetails.innerHTML = `<h3>${feature.name}</h3>`;
    if (feature.scenarios.length === 0) {
        featureDetails.innerHTML += '<div class="warning">No scenarios defined in the feature.</div>';
        return;
    }
    const filteredScenarios = filterScenariosInFeature(feature);
    if (filteredScenarios.length > 0) {
        featureDetails.innerHTML += `<ol>
            ${filteredScenarios
                .map((scenario, index) =>
                    `<li class="scenario-name
                        ${index % 2 ? 'scenario-name-light' : 'scenario-name-dark'}
                        ${scenario.tags.join(' ')}    
                    ">${escapeHtml(scenario.name)}
                    </li>`)
                .join('')
            }
            </ol>`;
        return;
    }
    featureDetails.innerHTML += '<div class="warning">No scenarios in the feature match the current tag selection.</div>';
}

function onSelectedTagsChanges() {
    updateFeatureList();
    const activeFeatureIndex = getActiveFeatureIndex();
    selectFeature(activeFeatureIndex);
}

window.onload = () => document.querySelector('.feature-list button').click();
