const archName = document.getElementById('arch-name');
const modelName = document.getElementById('model-name');
const processors = document.getElementById('no-of-processors');

document.addEventListener(
  'DOMContentLoaded',
  () => {
    document.getElementById('cpu-usage-btn').addEventListener(
      'click',
      () => {
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
          chrome.system.cpu.getInfo((res) => {
            // archName.innerText = res.archName;
            // modelName.innerText = res.modelName;
            // processors.innerText = res.numOfProcessors;
            chrome.tabs.sendMessage(tabs[0].id, { name: 'cpu', res });
          });
        });
      },
      false
    );
  },
  false
);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {});
