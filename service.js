try {
  self.dd = importScripts(chrome.runtime.getURL("background.js"));
} catch (e) {
  console.log(e);
}
