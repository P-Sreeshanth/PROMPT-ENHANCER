# Prompt Enhancer Chrome Extension

A Chrome extension that enhances your AI prompts using different personas and templates. Transform simple prompts into detailed, actionable requests with just a few clicks.

## Features

- **6 Different Personas**: Each with unique characteristics and prompt enhancement styles
  - ⚡️ Disruptive Founder - Challenges inputs for bold, risky prompts
  - 💼 VC Terminator - Converts ideas into killer pitches
  - 🌃 Cyberpunk Poet - Injects digital melancholy & emotion
  - 🎨 Creative Collaborator - Brainstorms and expands on your ideas
  - 🤝 Helpful Assistant - Clarifies and structures your request
  - 📝 Standard Enhancer - Classic, balanced rewriting

- **Template Library**: Pre-built templates for different use cases
  - Startup Launch Wizard
  - Viral YouTube Hooker
  - Pitch Deck Generator
  - Code Explainer

- **Easy Copy**: One-click copying of enhanced prompts
- **Responsive Design**: Works perfectly in the Chrome extension popup

## Installation

1. **Download the Extension Files**
   - Download all files in this folder to your computer
   - Make sure you have: `manifest.json`, `popup.html`, `popup.js`, `content.js`, and the icon files

2. **Load in Chrome**
   - Open Chrome and go to `image.pngchrome://extensions/`
   - Enable "Developer mode" in the top right corner
   - Click "Load unpacked"
   - Select the folder containing all the extension files

3. **Use the Extension**
   - Click the extension icon in your Chrome toolbar
   - Enter a prompt in the text area
   - Select a persona or template
   - Click "Enhance Prompt" to see the enhanced version
   - Use the "Copy" button to copy the enhanced prompt

## Usage

1. **Basic Enhancement**: Enter a simple prompt like "website for a gym" and click "Enhance Prompt"
2. **Persona Selection**: Switch to the "🎭 Personas" tab to choose different enhancement styles
3. **Template Usage**: Use the "📚 Templates" tab to apply pre-built templates
4. **Copy Results**: Click the "Copy" button on any enhanced prompt to copy it to your clipboard

## File Structure

```
prompt-enhancer-extension/
├── manifest.json      # Extension configuration
├── popup.html         # Main popup interface
├── popup.js           # Popup functionality
├── content.js         # Content script for web page interaction
├── icon16.png         # 16x16 extension icon
├── icon32.png         # 32x32 extension icon
├── icon48.png         # 48x48 extension icon
├── icon128.png        # 128x128 extension icon
└── README.md          # This file
```

## Development

The extension uses:
- **HTML5** for structure
- **Tailwind CSS** (CDN) for styling
- **Vanilla JavaScript** for functionality
- **Chrome Extension Manifest V3** for modern extension features

## License

This extension is provided as-is for educational and personal use.

## Support

For issues or questions, please check the Chrome extension documentation or create an issue in the repository. 