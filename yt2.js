chrome.storage.local.get(["installdate"]).then((result) => {
  if (Number(result.installdate) != 1) {
    chrome.storage.local.get(["p1"]).then((result1) => {
      //chrome.storage.local.set({ "p1" : performance.now() });
      var p1 = Number(result1.p1);

      var p2 = Date.now();
      console.log((p2 - p1) / 1000);
      console.log(result.installdate);

      if (p1 && (p2 - p1) / 1000 < 5 && (p2 - p1) / 1000 > 0) {
        //opening promptly, < 5s total
        console.log("in--");

        var aaj = new Date();
        var ms = aaj.getTime();
        console.log(ms);

        if (ms > Number(result.installdate) + 259200000) {
          //install + 3d
          //time-up
          inject_ratingbox();

          chrome.storage.local.set({ installdate: 1 }); //no more
        }
      }
    });
  }
});

function handleMessage(event) {
  // console.log(event.origin);
  if (event.origin.indexOf("chrome-extension://" + chrome.runtime.id) != -1) {
    console.log("Received message:", event.data);

    if (event.data == "Close the yt-ub-rating boxx nao") {
      //check
      if (document.getElementById("yt_unblock_ratingbx")) {
        document.getElementById("yt_unblock_ratingbx").remove();
      }

      chrome.storage.local.set({ installdate: 1 }); //no more
    }
  }
}

function inject_ratingbox() {
  window.addEventListener("message", handleMessage);

  var div = document.createElement("div");
  div.innerHTML = ``;
  div.id = "yt_unblock_ratingbx";

  if (document.body) {
    document.body.appendChild(div);
  } else {
    //chrome.storage.local.set({ "installdate": 1 });
    setTimeout(inject_ratingbox, 1200);
  }
}
