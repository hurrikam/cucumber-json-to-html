'use strict';

// https://www.w3schools.com/howto/howto_js_tabs.asp

function reportScript() {

    const features = [
        {
            name: "Feature 1",
            scenarios: [
                {
                    name: "Scenario 1",
                    tags: []
                },
                {
                    name: "Scenario 2",
                    tags: ["@testTag1", "@featureTag"]
                },
            ]
        },
        {
            name: "Feature 2",
            scenarios: [
                {
                    name: "Scenario 3",
                    tags: []
                },
                {
                    name: "Scenario 4",
                    tags: ["@testTag3", "@featureTag"]
                },
            ],
            // tags: ["@featureTag"]
        }
    ];

    function hasTagsFromArray(elementWithTags, otherTags) {
        return elementWithTags.tags.some(tag => otherTags.includes(tag));
    }

    function getSelectedTags() {
        return [...document.querySelectorAll('input[type=checkbox]')]
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
    }

    function filterFeatures(selectedTags) {
        return features.filter(feature => filterScenariosInFeature(feature, selectedTags));
    }    

    function filterScenariosInFeature(feature, selectedTags) {
        return feature.scenarios
            .filter(scenario => hasTagsFromArray(scenario, selectedTags))
    }

    function getFilteredScenarios(selectedTags) {
        const scenarios = [];
        features.forEach(feature => scenarios.push(...filterScenariosInFeature(feature, selectedTags)));
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

    function createTagCheckbox(tag) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = tag;
        checkbox.onclick = () => onSelectedTagsChanged();
        return checkbox;
    }

    function createTagList(features) {
        const tags = getUniqueTagsFromFeatures(features)
            .sort();
        const tagGroup = document.querySelector('.tag-list');
        tags.forEach(tag => {
            tagGroup.appendChild(createTagCheckbox(tag));
            tagGroup.innerHTML += `<span class="tag-checkbox-name">${tag}</span>`;
        });
    }

    function createFeatureList(features) {
        const featureList = document.querySelector('.feature-list');
        features.forEach((feature, index) => featureList.appendChild(createFeatureButton(feature, index)));
    }

    function createFeatureButton(feature, index) {
        const button = document.createElement('button');
        button.onclick = () => updateFeatureDetails(features[index]);
        button.innerHTML =  `<div class="button-title">${feature.name}</div>
                            <div>(${feature.scenarios.length})</div>`;
        return button;
    }
    
    function updateFeatureDetails(feature) {
        const selectedTags = getSelectedTags();
        const featureDetails = document.querySelector('.feature-details');
        featureDetails.innerHTML = `
            <h3>${feature.name}</h3>
            <ol>
            ${filterScenariosInFeature(feature, selectedTags)
                .map((scenario, index) =>
                    `<li class="${index % 2 ? 'scenario-name-light' : 'scenario-name-dark'}">${scenario.name}</li></br>`)
                .join('')
            }
            </ol>`;
    }

    function updateTitle(selectedTags) {
        document.querySelector('.title').textContent = 
            `${filterFeatures(selectedTags).length} Features (${getFilteredScenarios(selectedTags).length} scenarios)`;
    }
        
    function selectTab(evt, index) {
        // Get all elements with class="tablinks" and remove the class "active"
        const tablinks = document.querySelectorAll("tablinks");
        for (let i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        // Show the current tab, and add an "active" class to the button that opened the tab
        document.getElementById(index).style.display = "block";
        evt.currentTarget.className += " active";
    }

    function selectFirstFeature() {
        document.querySelectorAll('.feature-list button')[0].click();
    }

    function onSelectedTagsChanged() {
        const selectedTags = getSelectedTags();
        updateTitle(selectedTags);
        selectFirstFeature();
    }

    window.onload = () => {
        const selectedTags = getSelectedTags();
        updateTitle(selectedTags);
        createTagList(features);
        createFeatureList(features);
        selectFirstFeature();
    };
};

module.exports = reportScript;
