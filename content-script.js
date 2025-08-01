(function () {
  let lastHighlighted;
  let overlay = document.createElement("div");
  overlay.style.position = "absolute";
  overlay.style.border = "2px dashed red";
  overlay.style.pointerEvents = "none";
  overlay.style.zIndex = 9999;
  document.body.appendChild(overlay);

  document.addEventListener("mouseover", (e) => {
    const el = e.target;
    console.log("MOUSE HOVER", el);
    const rect = el.getBoundingClientRect();
    overlay.style.top = `${rect.top + window.scrollY}px`;
    overlay.style.left = `${rect.left + window.scrollX}px`;
    overlay.style.width = `${rect.width}px`;
    overlay.style.height = `${rect.height}px`;
    overlay.style.display = "block";

    const computed = window.getComputedStyle(el);
    const fontSize = computed.fontSize;
    const padding = computed.padding;
    const height = computed.height;
    const result = {
      tag: el.tagName,
      fontSize,
      padding,
      height
    };

    console.log("result", result);
    // if (chrome?.storage?.local) {
      chrome?.storage?.local?.get("designTokens", (data) => {
        const tokens = data.designTokens || {};
        console.log("el.tagName", el.tagName);
        const expected = tokens[el.tagName.toLowerCase()] || {};
        console.log("expected",expected)
        let mismatch = {};
        if (expected.fontSize && expected.fontSize !== fontSize)
          mismatch.fontSize = { actual: fontSize, expected: expected.fontSize };
        if (expected.padding && expected.padding !== padding)
          mismatch.padding = { actual: padding, expected: expected.padding };
        // if (expected.height && expected.height !== height)
        //   mismatch.height = { actual: height, expected: expected.height };

        console.log("mismatch", mismatch);
        if (Object.keys(mismatch).length > 0) {
          chrome.runtime.sendMessage({
            type: "store-mismatch",
            payload: {
              tag: el.tagName,
              mismatch,
            },
          });
        }
      });
    // }
  });

  document.addEventListener("mouseout", () => {
    overlay.style.display = "none";
  });
})();
