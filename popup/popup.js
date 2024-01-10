const /**
     * variables from background
     */
    background = chrome.extension.getBackgroundPage(),
    addEvent = background.addEvent,
    applyStyles = background.applyStyles,
    selectors = background.selectors,
    applyFontFamily = background.applyFontFamily,
    applyFontWeight = background.applyFontWeight,
    showIndentGuides = background.showIndentGuides,
    hideIndentGuides = background.hideIndentGuides,
    fonts = background.fonts,
    /**
     * Popup DOM elements
     */
    fontsDatalist = document.querySelector('#font_family_list'),
    fontsDatalistInput = document.querySelector('#font_family'),
    weightsDatalist = document.querySelector('#fonts_weight_list'),
    weightsDatalistInput = document.querySelector('#fonts_weight'),
    IndentGuidesCheckbox = document.querySelector('#indentGuides');

// popup document content loaded
addEvent(document, 'DOMContentLoaded', function () {
    initEvents();
    updateUIFromStorage();
});

/**
 * Binding the necessary events to popup DOM elements
 */
function initEvents() {
    addEvent(fontsDatalistInput, 'input', function () {
        const fontSelected = fontsDatalistInput.value;

        applyFontFamily(fontSelected);

        chrome.storage.sync.set({
            devtool_font_family: fontSelected
        });
    });
}

/**
 * Get font settings from storage and initialize the select dropdowns
 */
function updateUIFromStorage() {
    chrome.storage.sync.get(['devtool_font_family'], function (data) {
        if (Object.keys(data).length > 0) {
            // make the restored font family & weight selected
            fontsDatalistInput.value = data.devtool_font_family;
        }
    });
}