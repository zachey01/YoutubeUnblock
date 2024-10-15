var creating; // A global promise to avoid concurrency issues
//var active_ip;
var unblocklist = [
  "*://*.youtube.com/*",
  "*://*.youtube.com/",
  "*://*.browsebetter.io/*",
  "*://*.browsebetter.io/",
  "*://whatismyipaddress.com/",
  "*://*.googlevideo.com/*",
  "*://*.ytimg.com/*",
  "*://*.ggpht.com/*",
  "*://*.google.com/*",
  "*://*.googleapis.com/*",
  "*://*.gstatic.com/*",
];
var unblocklist2 = [
  "youtube.com",
  "browsebetter.io",
  "s3.browsebetter.io",
  "whatismyipaddress.com",
  "no.youtubeunblocked.notld",
  "googlevideo.com",
  "ytimg.com",
  "ggpht.com",
  "google.com",
  "googleapis.com",
  "gstatic.com",
];
var customU = null;
var proxyList = [];
var timerTime = 9000;

chrome.runtime.onStartup.addListener(() => {
  console.log("Browser has started.");
  chrome.storage.sync.set({ proxyEnabled: "false " + performance.now() });
  chrome.proxy.settings.clear({ scope: "regular" });
});
//reset

setIPs(); //set IP (imp)
check_custom(); //set url

function setIPs() {
  /*
    proxyList = 
    [
        "167.160.74.207:4444",
        "192.241.65.74:4444",
        "198.20.187.78:4444",
        "23.236.167.179:4444",
        "23.236.233.177:4444"
    ]; 
    */
  proxyList = ["161.0.0.206:20000", "161.0.0.207:20000", "188.42.15.245:20000"];
  proxyList.sort(() => Math.random() - 0.5);
  //console.log(proxyList);
}

try {
  setupOffscreenDocument("off_screen.html");
} catch (e) {
  console.log(e);
}

//initialize the offscreen page

//get custom
function check_custom(a1, a2) {
  chrome.storage.local.get(["custom_website"]).then((result) => {
    console.log("Value is " + result.custom_website);
    if (
      result.custom_website &&
      result.custom_website != null &&
      result.custom_website != undefined &&
      isValidURL(result.custom_website)
    ) {
      var u = new URL(result.custom_website);
      var h = u.hostname;
      var f1 = "*://*." + h + "/*";
      var f2 = "*://*." + h + "/";

      unblocklist = [
        "*://*.browsebetter.io/*",
        "*://*.browsebetter.io/",
        "*://whatismyipaddress.com/",
        "*://*.googlevideo.com/*",
        "*://*.ytimg.com/*",
        "*://*.ggpht.com/*",
        "*://*.google.com/*",
        "*://*.googleapis.com/*",
        "*://*.gstatic.com/*",
      ];
      unblocklist.push(f1);
      unblocklist.push(f2);

      unblocklist2 = [
        "browsebetter.io",
        "s3.browsebetter.io",
        "whatismyipaddress.com",
        "no.youtubeunblocked.notld",
        "googlevideo.com",
        "ytimg.com",
        "ggpht.com",
        "google.com",
        "googleapis.com",
        "gstatic.com",
      ];
      unblocklist2.push(String(h));
      /*
            if(h.indexOf("www.") === -1) //works nonetheless, tested!
            {

            }*/

      customU = h;
    } else {
      unblocklist = [
        "*://*.youtube.com/*",
        "*://*.youtube.com/",
        "*://*.browsebetter.io/*",
        "*://*.browsebetter.io/",
        "*://whatismyipaddress.com/",
        "*://*.googlevideo.com/*",
        "*://*.ytimg.com/*",
        "*://*.ggpht.com/*",
        "*://*.google.com/*",
        "*://*.googleapis.com/*",
        "*://*.gstatic.com/*",
      ];
      unblocklist2 = [
        "youtube.com",
        "browsebetter.io",
        "s3.browsebetter.io",
        "whatismyipaddress.com",
        "no.youtubeunblocked.notld",
        "googlevideo.com",
        "ytimg.com",
        "ggpht.com",
        "google.com",
        "googleapis.com",
        "gstatic.com",
      ];

      customU = null;
    }

    if (a1 && a2) {
      updateProxy(a1, a2);
    }
  });
}

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

/*
chrome.offscreen.createDocument({
    url: 'off_screen.html',
    reasons: ['WORKERS'],
    justification: 'Needed for web workers',
  });
*/

async function setupOffscreenDocument(path) {
  // Check all windows controlled by the service worker to see if one
  // of them is the offscreen document with the given path
  var offscreenUrl = chrome.runtime.getURL(path);

  var existingContexts = await chrome.runtime.getContexts({
    contextTypes: ["OFFSCREEN_DOCUMENT"],
    documentUrls: [offscreenUrl],
  });

  if (existingContexts.length > 0) {
    return; //already exists
  }

  // create offscreen document
  if (creating) {
    //in progress
    await creating;
  } else {
    creating = chrome.offscreen.createDocument({
      url: path,
      reasons: ["WORKERS"],
      justification: "Needed for web workers",
    });

    await creating;
    creating = null; //reset
  }
} //from chrome docu

/*
function colB(details, callbackFn) 
{
    console.log("attached header now ---");
    callbackFn({
      authCredentials: {
        username: "tmxtober",
        password: "w5mbw66ozm4s"
      }
    });
};

chrome.webRequest.onAuthRequired.addListener(colB, 
    {
        urls: 
        [             
        "*://unblockedgames76.co/*", "*://unblockedgames76.co/", 
        "*://*.gamepix.com/*", "*://*.gamepix.com/", 
        "*://*.browsebetter.io/*", "*://*.browsebetter.io/", 
        "*://whatismyipaddress.com/",
        "*://*.iubenda.com/*", "*://*.iubenda.com/" 
        ]
    }, 
    ["asyncBlocking"]
);
*/

chrome.webRequest.onAuthRequired.addListener(
  (details) => {
    return {
      authCredentials: {
        username: "DhanurSehgal",
        password: `viepdnvCIRC49-'+3MCDSsm`,
      },
    };
  },
  { urls: unblocklist },
  ["blocking"]
);

/*
chrome.webRequest.onAuthRequired.addListener
(
    function(details, callbackFn) 
    {
      return { authCredentials: { username: "92c5e544ee" , password: "tbNW6nCf" } };
    },
    {
        urls: [
            "*://unblockedgames76.co/*", "*://unblockedgames76.co/", 
            "*://*.gamepix.com/*", "*://*.gamepix.com/", 
            "*://*.browsebetter.io/*", "*://*.browsebetter.io/", 
            "*://whatismyipaddress.com/",
            "*://*.iubenda.com/*", "*://*.iubenda.com/"
        ]
    },
    ["blocking"]
);
*/

function set_install_date() {
  chrome.storage.local.get(["installdate"]).then((result) => {
    console.log(result.installdate);
    if (result.installdate === null || result.installdate === undefined) {
      //all onetimers
      var today = new Date();
      var millisecondsSinceEpoch = today.getTime();
      chrome.storage.local.set({ installdate: Number(millisecondsSinceEpoch) });
      //notifyinstall();
    }
  });
}

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    var url = "https://github.com/zachey01/YoutubeUnblock/issues";
    chrome.runtime.setUninstallURL(url); //fallback!

    chrome.storage.sync.set({ proxyEnabled: "false " + performance.now() });
    chrome.proxy.settings.clear({ scope: "regular" });

    set_install_date();
  } else if (details.reason === "update") {
    console.log("cleared");
    /*
       chrome.storage.sync.set({ proxyEnabled: "false " + performance.now() }); 
       chrome.proxy.settings.clear({ scope: "regular" });
       */
    //updated!

    set_install_date(); //remove delete this later!
  }
});

chrome.storage.onChanged.addListener((changes) => {
  if (
    changes.proxyEnabled &&
    changes.proxyEnabled.newValue != changes.proxyEnabled.oldValue
  ) {
    //changes happened + not same value
    if (timerTime) {
      timerTime = 9000;
    }
    setIPs();
    check_custom(proxyList[0], changes.proxyEnabled.newValue); //switch, check/set url first
  }
});

/*
function updateProxy(toggle_val) 
{
    console.log("updated");

    if (toggle_val) 
    {
        var pacScript = `
            function FindProxyForURL(url, host) 
            {
                if (dnsDomainIs(host, 'whatismyipaddress.com') || dnsDomainIs(host, 'www.whatismyipaddress.com')) 
                {
                    return 'PROXY 72.167.143.174:80';
                }
                return 'DIRECT';
            }
        `;

        chrome.proxy.settings.set({
            value: {
                mode: "pac_script",
                pacScript: 
                {
                    data: pacScript
                }
            },
            scope: "regular"
        });
    } else 
    {
        chrome.proxy.settings.clear({ scope: "regular" });
    }
};

// Example usage:
// Enable proxy
updateProxy(true);

// Disable proxy
// updateProxy(false);
*/

async function updateProxy(proxy, toggle_val) {
  //active_ip = proxy;
  if (
    toggle_val.indexOf("true") !=
    -1 /*&& toggle_val != "false" && toggle_val != "null" && toggle_val != "undefined" && toggle_val != ""*/
  ) {
    //if == -1, not found
    //if != -1, found (true)

    try {
      await setupOffscreenDocument("off_screen.html");
    } catch (error) {
      console.log(error);
    }

    var i = 0;
    var strr = "";
    for (i = 0; i < unblocklist2.length; i++) {
      if (strr == "") {
        //first
        strr = strr + `dnsDomainIs(host, '${unblocklist2[i]}')`;
      } //first + n, till last
      else {
        strr = strr + ` || dnsDomainIs(host, '${unblocklist2[i]}')`;
      }
    }

    var pacScript =
      `
            function FindProxyForURL(url, host) 
            {
                if(` +
      strr +
      `) 
                {
                    return 'PROXY ${proxy}';
                }
                else
                {
                    return 'DIRECT';
                }
            }
        `;
    console.log(pacScript);

    /*
        var pacScript = `
            function FindProxyForURL(url, host) 
            {
                var i = 0;
                for(i=0; i < ${unblocklist2}.length; i++)
                {
                    if(dnsDomainIs(host, '${unblocklist2}[i]'))
                    {
                        return 'PROXY ${proxy}';
                    }
                    else if(i == ${unblocklist2}.length - 1)
                    {
                        return 'DIRECT';
                    }
                }
            }
        `;
        console.log(pacScript);
        */

    /* 
        var pacScript = `
            function FindProxyForURL(url, host) 
            {
                if
                (
                    dnsDomainIs(host, 'whatismyipaddress.com') || 
                    dnsDomainIs(host, 's3.browsebetter.io') || dnsDomainIs(host, 'browsebetter.io') || 
                    dnsDomainIs(host, 'unblockedgames76.co') || dnsDomainIs(host, 'www.unblockedgames76.co') || 
                    dnsDomainIs(host, 'gamepix.com') || dnsDomainIs(host, 'play.gamepix.com') || dnsDomainIs(host, 'www.gamepix.com') || dnsDomainIs(host, 'api.h5.gamepix.com') || dnsDomainIs(host, 'games.assets.gamepix.com') || dnsDomainIs(host, 'games.builds.gamepix.com') || 
                    dnsDomainIs(host, 'iubenda.com') || dnsDomainIs(host, 'cdn.iubenda.com') || dnsDomainIs(host, 'cs.iubenda.com')
                ) 
                {
                    return 'PROXY ${proxy}';
                }
                else
                {
                    return 'DIRECT';
                }
            }
        `;
*/
    chrome.proxy.settings.set(
      {
        value: {
          mode: "pac_script",
          pacScript: {
            data: pacScript,
          },
        },
        scope: "regular",
      },
      function () {
        console.log("Proxy set to: " + proxy);
        testProxyConnectivity(proxy);
      }
    );
  } else {
    //false, off
    chrome.proxy.settings.clear({ scope: "regular" });
    console.log("cleared");
  }
}

/*
function testProxyConnectivity(proxy) {
    fetch('https://ahaa.app/')  // Use a reliable URL for testing
        .then(response => {
            if (response.ok) {
                console.log(`Success: Proxy ${proxy} is working.`);
                // Here you can do something with the working proxy
            } else {
                console.log(`Failure: Proxy ${proxy} failed.`);
                nextProxy();
            }
        })
        .catch(error => {
            console.log(`Error: Proxy ${proxy} failed. Error: ${error}`);
            nextProxy();
        });
}
*/
function testProxyConnectivity(proxy) {
  try {
    chrome.runtime.sendMessage({ action: "forwardToWorker", data: "hi" });
  } catch (error) {
    console.log(error);
  }

  var fetchPromise = fetch("https://s3.browsebetter.io/checkcors.html", {
    method: "GET",
  }); // Use a reliable URL for testing
  var timeoutPromise = new Promise((resolve, reject) => {
    if (timerTime && timerTime > 10000) {
      //valid
      setTimeout(() => reject("Timeout"), timerTime);
    } else {
      setTimeout(() => reject("Timeout"), 10000); // 10 seconds timeout
    }
  });

  Promise.race([fetchPromise, timeoutPromise])
    .then((response) => {
      if (response.ok) {
        console.log(`Success: Proxy ${proxy} is working.`);

        if (customU != null && customU != undefined && customU != "") {
          /*
                    if(customU == "youtube.com")
                    {
                        customU = "youtube.com/?s=1";
                    }
                    */

          chrome.storage.local.set({ p1: Date.now() });

          chrome.tabs.create({ url: "https://" + customU, selected: true });
        }

        //console.log(performance.now());
        chrome.storage.sync.set({ proxySuccess: "Works " + performance.now() });
        // Here you can do something with the working proxy
      } else {
        console.log(`Failure: Proxy ${proxy} failed.`);
        console.log(response);
        nextProxy();
      }
    })
    .catch((error) => {
      console.log(`Error or timeout with proxy ${proxy}: ${error}`);
      nextProxy();
    });
}

function nextProxy() {
  timerTime = timerTime + 1000; //take longer

  if (proxyList.length > 0) {
    var nextProxy = proxyList.shift(); // Get the next proxy in the list
    updateProxy(nextProxy, "true");
  } else {
    console.log("No more proxies to test.");
    chrome.storage.sync.set({ proxySuccess: "ERR " + performance.now() });

    chrome.storage.sync.set({ proxyEnabled: "false " + performance.now() });
    chrome.proxy.settings.clear({ scope: "regular" });

    setIPs();
  }
}

// Start testing proxies
// nextProxy();
