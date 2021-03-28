const archName = document.getElementById('arch-name');
const modelName = document.getElementById('model-name');
const processors = document.getElementById('no-of-processors');

const ramTotal = document.getElementById('ram-memory-total');
const ramUsed = document.getElementById('ram-memory-used');
const ramFree = document.getElementById('ram-memory-free');

const selectTimer = document.getElementById('select-timer');

const toGiB = (val) => Math.round((val / (1024 * 1024 * 1024)) * 1e3) / 1e3;

let globalTimeInterval;

const getSystemInfo = (request) => {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(request, (response) => {
      resolve(response);
    });
  });
};

const setResponse = (request) => {
  const { cpuInfo, memoryInfo } = request;
  archName.innerText = cpuInfo.archName;
  modelName.innerText = cpuInfo.modelName;
  processors.innerText = cpuInfo.numOfProcessors;

  const { availableCapacity, capacity } = memoryInfo;
  ramTotal.innerText = toGiB(capacity);
  ramUsed.innerText = toGiB(capacity - availableCapacity);
  ramFree.innerText = toGiB(availableCapacity);
};

const init = async () => {
  const request = {
    message: ['GET_CPU_INFO', 'GET_MEMORY_INFO'],
  };
  const systemInfo = await getSystemInfo(request);
  setResponse(systemInfo);
};

document.addEventListener(
  'DOMContentLoaded',
  async () => {
    await init();
    globalTimeInterval = setInterval(async () => {
      await init();
    }, 1000);
  },
  false
);

selectTimer.addEventListener('change', () => {
  let timerVal = selectTimer.value;
  clearInterval(globalTimeInterval);
  globalTimeInterval = setInterval(async () => {
    await init();
  }, parseInt(timerVal) * 1000);
});

const help = () => {
  alert(
    'Go to chrome://extensions > Turn ON Developer Mode > Install Diagnostics Extension > Get ID\nGo to diagnostics.raghavdhingra.com'
  );
};
document.getElementById('helpBtn').addEventListener('click', help);
