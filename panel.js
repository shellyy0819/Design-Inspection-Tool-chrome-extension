document.getElementById("inspect").onclick = () => {
  chrome.devtools.inspectedWindow.eval(
    `(() => {
      const spacingTokens = { sm: "8px", md: "16px", lg: "24px" };
      const el = document.activeElement || document.body;
      const styles = window.getComputedStyle(el);
      const result = {
        tag: el.tagName,
        fontSize: styles.fontSize,
        fontWeight: styles.fontWeight,
        padding: styles.padding,
        margin: styles.margin,
        color: styles.color,
        closestPaddingToken: Object.entries(spacingTokens).find(([_, val]) => val === styles.padding)
      };
      return result;
    })()`,
    (res, err) => {
      document.getElementById("output").textContent = JSON.stringify(res, null, 2);
    }
  );
};