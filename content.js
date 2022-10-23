// Listen for messages
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  // If the received message has the expected format...
  if (msg.text === "report_back") {
    let elem = document.getElementsByClassName("square")[0];
    let background = window
      .getComputedStyle(elem, null)
      .getPropertyValue("background-color");
    let backgroundColor = background
      .substring(4, background.length - 1)
      //   .replace(/ /g, "")
      .split(",");

    // Call the specified callback, passing
    // the background rbg value as argument
    sendResponse(background);

    const element = document.createElement("strong");
    const colorRgb = document.createTextNode("RGB: " + backgroundColor);

    // Convert rbg to hex
    const rgbToHex = (r, g, b) =>
      "HEX: #" +
      [r, g, b]
        .map((x) => {
          const hex = x.toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("");

    const colorHex = document.createTextNode(
      rgbToHex(
        Number(backgroundColor[0]),
        Number(backgroundColor[1]),
        Number(backgroundColor[2])
      )
    );

    const br = document.createElement("br");

    element.appendChild(colorRgb);
    element.appendChild(br);
    element.appendChild(colorHex);

    const list = document.getElementsByClassName("connect-msg")[0];
    list.replaceChild(element, list.children[0]);
  }
});
