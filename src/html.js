'use strict';

// https://www.w3schools.com/howto/howto_js_tabs.asp

function createStyleHtml() {
    return `/* Style the tab */
    .tab {
        overflow: hidden;
        border: 1px solid #ccc;        
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
    }
    
    /* Change background color of buttons on hover */
    .tab button:hover {
        background-color: #ddd;
    }
    
    /* Create an active/current tablink class */
    .tab button.active {
        background-color: #ccc;
    }
    
    /* Style the tab content */
    .tabcontent {
        display: none;
        padding: 6px 12px;
        border: 1px solid #ccc;
        border-top: none;
    }`
}

function createFeatureButtonHtml(feature, index) {
    return `<button class="tablinks" onclick="selectTab(event, ${index})">${feature.title}</button>`;
}

function createFeatureDivHtml(feature, index) {
    return `
        <div id="${index}" class="tabcontent">
            <h3>${feature.title}</h3>
            ${feature.scenarios
                .map(scenario => `<p>${scenario}</p>`)
                .join('')
            }
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
    return `
        <html>
            <head>
                <script>${getJavaScriptHtml(features.length)}</script>
                <style>${createStyleHtml()}</style>
            </head>
            <body>
                <div class="tab">
                    ${features
                        .map((feature, index) => createFeatureButtonHtml(feature, index))
                        .join('')
                    }
                </div>
                <div style="position: relative">
                    ${features
                        .map((feature, index) => createFeatureDivHtml(feature, index))
                        .join('')
                    }
                <div>
            </body>
        </html>`;
}

module.exports = createFeaturesHtml;
