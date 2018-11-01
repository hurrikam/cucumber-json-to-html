'use strict';

// https://www.w3schools.com/howto/howto_js_tabs.asp

function createStyleHtml() {
    return `
    /* Title */
    .title {
        text-align: center;
    }

    /* Root of the tab */
    .tabroot {
        display: flex;
        align-items: left;
    }

    /* Style the tab */
    .tab {
        overflow: hidden;
        border: 1px solid #ccc;
        float: left;
        width: 400px;
    }
    
    /* Style the buttons that are used to open the tab content */
    .tab button {
        margin: 1px;
        background-color: #f1f1f1;
        float: left;
        border: none;
        outline: none;
        cursor: pointer;
        padding: 14px 16px;
        transition: 0.3s;
        width: 100%;
        display: flex;
        align-items: left;
    }
    
    /* Change background color of buttons on hover */
    .tab button:hover {
        background-color: #ddd;
    }
    
    /* Create an active/current tablink class */
    .tab button.active {
        background-color: #ccc;
    }

    .tab button .buttontitle {
        width: 100%;
    }

    /* Style the tab content container */
    .tabcontentcontainer {
        margin-left: 10px;
        text-align: center;
        width: 100%;
    }

    /* Style the tab content */
    .tabcontent {
        display: none;
        padding: 6px 12px;
        border-top: none;
    }`
}

function createFeatureButtonHtml(feature, index) {
    return `<button class="tablinks" onclick="selectTab(event, ${index})">
                <div class="buttontitle">${feature.title}</div>
                <div>(${feature.scenarios.length})</div>
            </button>`;
}

function createFeatureDivHtml(feature, index) {
    return `
        <div id="${index}" class="tabcontent">
            <h3>${feature.title}</h3>
            <ol>
            ${feature.scenarios
                .map(scenario => `<li>${scenario}</li></br>`)
                .join('')
            }
            </ol>
        </div>`;
}

function getJavaScriptHtml(featuresCount) {
    return `function selectTab(evt, index) {
        // Declare all variables
        let i, tabcontent, tablinks;
    
        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
    
        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
    
        // Show the current tab, and add an "active" class to the button that opened the tab
        document.getElementById(index).style.display = "block";
        evt.currentTarget.className += " active";
    }
    window.onload = () => document.getElementsByClassName("tablinks")[0].click();`
}

function createFeaturesHtml(features) {
    const scenariosCount = features
        .map(feature => feature.scenarios.length)
        .reduce((total, scenariosInFeature) => total + scenariosInFeature);
    return `
        <html>
            <head>
                <script>${getJavaScriptHtml(features.length)}</script>
                <style>${createStyleHtml()}</style>
            </head>
            <body>
                <h1 class="title">${features.length} Features (${scenariosCount} scenarios)</h1>
                <div class="tabroot">
                    <div class="tab">
                        ${features
                            .map((feature, index) => createFeatureButtonHtml(feature, index))
                            .join('')
                        }
                    </div>
                    <div class="tabcontentcontainer">
                        ${features
                            .map((feature, index) => createFeatureDivHtml(feature, index))
                            .join('')
                        }
                    <div>
                </div>
            </body>
        </html>`;
}

module.exports = createFeaturesHtml;
