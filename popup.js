//fetch, update FE > listen > iterate > update BE, update FE

window.onload = function () {
  var message = chrome.i18n.getMessage("heading");
  if (
    message &&
    message != undefined &&
    message != null &&
    message != "" &&
    message != " "
  ) {
    document.getElementById("h1").innerHTML = message;
  }

  var message3 = chrome.i18n.getMessage("dev");
  if (
    message3 &&
    message3 != undefined &&
    message3 != null &&
    message3 != "" &&
    message3 != " "
  ) {
    document.getElementById("h2dev").innerHTML = message3;
  }

  var message4 = chrome.i18n.getMessage("support");
  if (
    message4 &&
    message4 != undefined &&
    message4 != null &&
    message4 != "" &&
    message4 != " "
  ) {
    document.getElementById("support").innerHTML = message4;
  }

  var message2 = chrome.i18n.getMessage("cta");
  if (
    message2 &&
    message2 != undefined &&
    message2 != null &&
    message2 != "" &&
    message2 != " "
  ) {
    document.getElementById("unblock").innerHTML =
      message2 + `<img src="images/lock.png" id="icon">`;
  }

  initializ(); //fetch, update FE
  document.getElementById("unblock").addEventListener("click", toggl); //listen
};

function isValidURL(string) {
  try {
    new URL(string);
    if (string.indexOf(".") === -1) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    return false;
  }
}

function initializ() {
  //fetch, update FE

  chrome.proxy.settings.get(
    { incognito: false },
    function (
      config //fetch
    ) {
      console.log("Proxy configuration:", config);
      // You can now check the `config` object to see if a proxy is set

      Object.getOwnPropertyNames(config).forEach((key) => {
        /*
        console.log(key, config[key]);
        if(config[key] == "controlled_by_other_extensions")
        {
            return;
        }
        */
        if (config[key] == "controlled_by_other_extensions") {
          //alert the user
          var alrt = chrome.i18n.getMessage("misc_alert");
          if (
            alrt &&
            alrt != undefined &&
            alrt != null &&
            alrt != "" &&
            alrt != " "
          ) {
            alert(alrt);
          } else {
            alert(
              "For a seamless operation, please turn off other web-unblocking browser extensions."
            );
          }
        }

        if (config[key].pacScript) {
          if (config[key].pacScript.data) {
            //fetched
            if (
              config[key].pacScript.data.indexOf("no.youtubeunblocked.notld") !=
              -1
            ) {
              //ON hai
              //update FE
              console.log("on");

              var message2 = chrome.i18n.getMessage("revert");
              if (
                message2 &&
                message2 != undefined &&
                message2 != null &&
                message2 != "" &&
                message2 != " "
              ) {
                document.getElementById("unblock").innerHTML = message2;
              } else {
                document.getElementById("unblock").innerHTML =
                  "Revert Unblocking"; //FE1
              }

              document.body.id = "ON"; //FE2
              //document.getElementById("unblock").className = ""; //FE3, just in case!, but default in blank
              return;
            }
            //else (default is OFF)
          }
          //else if no pac script (default is OFF)
        }
        //else if no pac script (default is OFF)
      });
    }
  );
}

function toggl() {
  // iterate (toggle) > update BE, update FE
  var done = 0; //api may return no data

  chrome.proxy.settings.get({ incognito: false }, function (config) {
    console.log("Proxy configuration:", config);
    // You can now check the `config` object to see if a proxy is set
    Object.getOwnPropertyNames(config).forEach((key) => {
      console.log(key, config[key]);

      /*
            if(config[key] == "controlled_by_other_extensions")
            {
                //off hi hoga, on possible b nhi h, off hi rahega, no changes FE or BE
                alert("Please turn off other website-unblocking browser extensions.");
                done = 1;
                return;
            }*/

      if (config[key].pacScript) {
        if (config[key].pacScript.data) {
          if (
            config[key].pacScript.data.indexOf("no.youtubeunblocked.notld") !=
            -1
          ) {
            //ON hai ---> OFF krde (toggle 1)
            //update BE, update FE
            done = 1; //flag

            console.log("off");

            chrome.storage.sync.set({
              proxyEnabled: "false " + performance.now(),
            }); //update BE, false

            var message2 = chrome.i18n.getMessage("cta");
            if (
              message2 &&
              message2 != undefined &&
              message2 != null &&
              message2 != "" &&
              message2 != " "
            ) {
              document.getElementById("unblock").innerHTML =
                message2 + `<img src="images/lock.png" id="icon">`;
            } else {
              document.getElementById(
                "unblock"
              ).innerHTML = `Unblock <img src="images/lock.png" id="icon">`; //FE1
            }

            document.getElementById("unblock").className = ""; //FE2, just in case
            document.body.id = "OFF"; //FE3

            return;
          }
        }
      }
    });

    if (done === 0) {
      //came out of the loop without returning
      //OFF hai --> ON krde (toggle 2)
      //update BE, update FE

      //check first

      if (isValidURL(document.getElementById("website").value)) {
        chrome.storage.local
          .set({ custom_website: document.getElementById("website").value })
          .then(() => {
            console.log("Value set");

            console.log("on");

            chrome.storage.sync.set({
              proxyEnabled: "true " + performance.now(),
            }); //BE

            var message2 = chrome.i18n.getMessage("progress");
            if (
              message2 &&
              message2 != undefined &&
              message2 != null &&
              message2 != "" &&
              message2 != " "
            ) {
              document.getElementById("unblock").innerHTML = message2;
            } else {
              document.getElementById("unblock").innerHTML =
                "Unblocking Access..."; //FE1, can also be Revert Unblocking
            }

            document.getElementById("unblock").className = "noclick"; //FE2
            document.body.id = "ON"; //FE3
          });
      } else {
        return;
      }

      return;
    }
  });
}

chrome.storage.onChanged.addListener((changes) => {
  if (changes.proxySuccess) {
    //console.log(changes.proxySuccess.newValue);
    //console.log(typeof(changes.proxySuccess.newValue));

    if (
      changes.proxySuccess.newValue &&
      changes.proxySuccess.newValue.indexOf("ERR") != -1
    ) {
      //ERR, not working
      //OFF

      var alrt = chrome.i18n.getMessage("misc_alert3");
      if (
        alrt &&
        alrt != undefined &&
        alrt != null &&
        alrt != "" &&
        alrt != " "
      ) {
        alert(alrt);
      } else {
        alert("Network Error. Please try again later.");
      }

      var message2 = chrome.i18n.getMessage("cta");
      if (
        message2 &&
        message2 != undefined &&
        message2 != null &&
        message2 != "" &&
        message2 != " "
      ) {
        document.getElementById("unblock").innerHTML =
          message2 + `<img src="images/lock.png" id="icon">`;
      } else {
        document.getElementById(
          "unblock"
        ).innerHTML = `Unblock <img src="images/lock.png" id="icon">`; //FE1
      }

      document.getElementById("unblock").className = ""; //FE2, just in case
      document.body.id = "OFF"; //FE3
    } else if (changes.proxySuccess.newValue != changes.proxySuccess.oldValue) {
      //Working
      //ON
    }
  }
});
