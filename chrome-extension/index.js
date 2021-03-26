const archName = document.getElementById('arch-name');
const modelName = document.getElementById('model-name');
const processors = document.getElementById('no-of-processors');

document.addEventListener(
  'DOMContentLoaded',
  () => {
    chrome.runtime.sendMessage('yo');
    response(cpuInfo.processors[0].usage);
  },
  false
);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  alert(request);
});
