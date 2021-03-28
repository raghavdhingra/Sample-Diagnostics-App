chrome.runtime.onMessageExternal.addListener(
  async (request, sender, sendResponse) => {
    const data = await getProcessedData(request);
    sendResponse(data);
  }
);
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  getProcessedData(request).then((data) => sendResponse(data));
  return true;
});

const getProcessedData = async (request) => {
  let data = {};
  if (request.message.includes('GET_CPU_INFO')) {
    data['cpuInfo'] = await getCPUInfo();
  }
  if (request.message.includes('GET_STORAGE_INFO')) {
    data['storageInfo'] = await getStorageInfo();
  }
  if (request.message.includes('GET_MEMORY_INFO')) {
    data['memoryInfo'] = await getMemoryInfo();
  }
  return data;
};

const getCPUInfo = () => {
  return new Promise((resolve, reject) => {
    chrome.system.cpu.getInfo((cpuInfo) => {
      return resolve(cpuInfo);
    });
  });
};
const getStorageInfo = () => {
  return new Promise((resolve, reject) => {
    chrome.system.storage.getInfo((storageInfo) => {
      return resolve(storageInfo);
    });
  });
};
const getMemoryInfo = () => {
  return new Promise((resolve, reject) => {
    chrome.system.memory.getInfo((memoryInfo) => {
      return resolve(memoryInfo);
    });
  });
};
