chrome.runtime.onInstalled.addListener(() => {
  console.log("Design Inspector installed");
});

// Optional: handle messages safely
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "store-mismatch") {
    chrome.storage.local.set({ designTokens: msg.payload });
    console.log("✅ Tokens stored in chrome.storage");
  }
});