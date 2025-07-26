// Content script for Prompt Enhancer Chrome Extension
// This script runs on web pages and can be used for future features

console.log('Prompt Enhancer extension loaded');

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getSelectedText') {
        const selectedText = window.getSelection().toString();
        sendResponse({ text: selectedText });
    }
}); 