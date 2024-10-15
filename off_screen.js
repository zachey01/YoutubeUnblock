var worker = new Worker("workerscript.js");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action == "forwardToWorker") {
    try {
      if (worker) {
        worker.postMessage(request.data);
      } else {
        renew(request.data);
      }
    } catch (error) {
      console.log(error);
      renew(request.data);
    }
  }
});

function renew(dat) {
  if (worker) {
    worker.terminate();
  }

  worker = new Worker("workerscript.js");
  worker.postMessage(dat);
}
