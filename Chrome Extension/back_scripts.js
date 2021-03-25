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
const getDisplayInfo = () => {
  return new Promise((resolve, reject) => {
    chrome.system.display.getInfo((displayInfo) => {
      return resolve(displayInfo);
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

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   alert(request);
//   sendResponse('WOWOWO');
// });

chrome.runtime.onMessageExternal.addListener(
  async (request, sender, sendResponse) => {
    if (request) {
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
      if (request.message.includes('GET_DISPLAY_INFO')) {
        data['displayInfo'] = await getDisplayInfo();
      }
      sendResponse(data);
    } else {
      sendResponse({ message: 'No data to display', code: 400 });
    }
  }
);
