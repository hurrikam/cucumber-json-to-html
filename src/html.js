'use strict';

// https://www.w3schools.com/howto/howto_js_tabs.asp

(function() {
    function getScenariosInFeature(feature) {
        return feature.elements
            .filter(element => element.type === 'scenario');
    }

    function getTagsFromElement(element) {
        return element.tags.map(tag => tag.name) || [];
    }

    function getTagsFromFeature(feature) {
        const tags = getTagsFromElement(feature);
        const scenarios = getScenariosInFeature(feature);
        scenarios.forEach(scenario => tags.push(...getTagsFromElement(scenario)));
        return tags;
    }

    function getTagsFromFeatures(features) {
        const tags = [];
        features.forEach(feature => tags.push(...getTagsFromFeature(feature)));
        return tags.filter((tag, index) => tags.indexOf(tag) === index);
    }

    function createTagsGroupHtml(features = []) {
        const tags = getTagsFromFeatures(features);
        const tagGroup = document.querySelector('.taggroup');
        tagGroup.innerHTML = '';
        tags.forEach(tag => tagGroup.innerHTML += `<input type="checkbox" value="${tag}"/>${tag}`);
    }

    function createFeatureButtonHtml(feature, index) {
        return `<button class="tablinks" onclick="updateFeatureTabList()">
                    <div class="buttontitle">${feature.name}</div>
                    <div>(${getScenariosInFeature(feature).length})</div>
                </button>`;
    }

    function createFeatureDivHtml(feature, index) {
        return `
            <div id="${index}" class="tabcontent">
                <h3>${feature.name}</h3>
                <ol>
                ${getScenariosInFeature(feature)
                    .map(scenario => `<li>${scenario.name}</li></br>`)
                    .join('')
                }
                </ol>
            </div>`;
    }

    function getSelectedTags() {
        return document.querySelector('input')
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
    }

    function getScenariosWithTags(feature, includedTags) {
        const scenarios = getScenariosInFeature(feature);
        return scenarios
            .filter(scenario => scenario.tags.some(tag => includedTags.includes(tag)));
    }

    function getIncludedFeatures(features = []) {
        const selectedTags = getSelectedTags();
        return features
            .filter(feature => getScenariosWithTags(feature, selectedTags).length > 0);
    }

    function updateFeatureList(features = []) {
        const featureTabList = document.querySelector('.featureList');
        featureTabList.innerHTML = '';
        getIncludedFeatures()
            .forEach(feature => {
                const featureIndex = features.indexOf(feature);
                featureTabList.innerHTML += createFeatureButtonHtml(feature, featureIndex);
            });
    }

    function updateTitle() {
        document.querySelector('.title').textContent = 
            `${features.length} Features (${scenariosCount} scenarios)`;
    }
        
    function selectTab(evt, index) {
        // Declare all variables
        const i, tablinks;

        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        // Show the current tab, and add an "active" class to the button that opened the tab
        document.getElementById(index).style.display = "block";
        evt.currentTarget.className += " active";
    }

    window.onload = () => {
        createTagsGroupHtml(); 
        updateTitle();
        updateFeatureList();
        document.getElementsByClassName("tablinks")[0].click()
    };
})();

module.exports = createFeaturesHtml;
