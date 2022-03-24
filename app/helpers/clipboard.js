function writeToClipboard(text) {
  navigator.clipboard.writeText(text);
}

module.exports = { writeToClipboard };
