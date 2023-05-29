console.log('This is the background page.');
console.log('Put the background scr');

chrome.tabs.onActivated.addListener((tab) => {
  chrome.tabs.get(tab.tabId, (currentTab) => {
    console.log(currentTab.url, 'url');
    // You can perform any logic here with the URL
    callOpenAIAPI(currentTab.url);
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    console.log(changeInfo.url, 'url1');
    // You can perform any logic here with the updated URL
    callOpenAIAPI(changeInfo.url);
  }
});

function callOpenAIAPI(url) {
  console.log('trigger');
  const apiKey = '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'; // Replace with your OpenAI API key

  fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Can you please summarize the content of this url: ${url}`,
        },
      ],
      temperature: 0.7,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Process the API response data
      console.log(data.choices[0].message.content);
    })
    .catch((error) => {
      // Handle any errors that occurred during the API call
      console.error(error);
    });
}
