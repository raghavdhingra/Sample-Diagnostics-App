const archName = document.getElementById('arch-name');
const modelName = document.getElementById('model-name');
const processors = document.getElementById('no-of-processors');

document.addEventListener(
  'DOMContentLoaded',
  () => {
    const request = {
      message: ['GET_CPU_INFO', 'GET_STORAGE_INFO', 'GET_MEMORY_INFO'],
    };
    chrome.runtime.sendMessage(request, (res) => {
      archName.innerText = res.cpuInfo.archName;
      modelName.innerText = res.cpuInfo.modelName;
      processors.innerText = res.cpuInfo.numOfProcessors;
    });
  },
  false
);

const help = () => {
  alert(
    'Go to chrome://extensions > Turn ON Developer Mode > Install Diagnostics Extension > Get ID\nGo to diagnostics.raghavdhingra.com'
  );
};
document.getElementById('helpBtn').addEventListener('click', help);
