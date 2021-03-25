document.addEventListener(
  'DOMContentLoaded',
  () => {
    document.getElementById('cpu-usage-btn').addEventListener(
      'click',
      () => {
        chrome.system.cpu.getInfo((res) => alert(JSON.stringify(res)));
        // chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
        // chrome.tabs.sendMessage(tabs[0].id, tabs, (req) => alert(req));
        // });
      },
      false
    );
  },
  false
);
