let designTokens = {};
let mismatches = [];

document.getElementById("tokenUpload").addEventListener("change", (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    try {
      designTokens = JSON.parse(reader.result);
      console.log("designTokens", designTokens);
      chrome.runtime.sendMessage({
        type: "store-tokens",
        payload: designTokens,
      });
      alert("✅ Design tokens loaded successfully");
    } catch (err) {
      console.error("❌ Parse error:", err);
      alert("❌ Invalid JSON file");
    }
  };
  reader.readAsText(file);
});

document.getElementById("export").onclick = () => {
  const blob = new Blob([JSON.stringify(mismatches, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  chrome.downloads.download({ url, filename: "mismatches.json" });
};
