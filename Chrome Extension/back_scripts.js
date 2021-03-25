// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   alert(request);
//   sendResponse('WOWOWO');
// });

const sendCPUInfo = (sendResponse) => {
  chrome.system.cpu.getInfo((cpuInfo) => {
    try {
      sendResponse({ message: 'Success', data: { cpuInfo }, code: 200 });
    } catch (err) {
      clearInterval(intervalSession);
      sendResponse({ message: 'Connection Break', code: 500 });
    }
  });
};

chrome.runtime.onMessageExternal.addListener(
  (request, sender, sendResponse) => {
    if (request) {
      if (request.message === 'GET_CPU_USAGE') {
        sendCPUInfo(sendResponse);
      }
    } else {
      sendResponse({ message: 'No data to display', code: 400 });
    }
  }
);
