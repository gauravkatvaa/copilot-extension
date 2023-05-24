chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const currentUrl = tabs[0].url;
    document.getElementById('currentUrl').textContent = currentUrl;
  });
  