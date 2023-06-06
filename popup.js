const buttonBootstrap = document.querySelector(".button-bootstrap");
const buttonJQuery = document.querySelector(".button-jQuery");
const buttonH1 = document.querySelector(".button-h1");

const askChrome = (checkFn, resolveFn, btn) => {
    chrome.runtime.sendMessage({ method: "clear" }, () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: checkFn // <-- function to run
            }, () => {
                if (chrome.runtime.lastError) {
                    document.getElementById("id_text").value = "Error: " + chrome.runtime.lastError.message;
                }
                else {
                    chrome.runtime.sendMessage({ method: "get" }, (response) => {
                        const data = JSON.parse(response.value);
                        resolveFn(data.result, btn); // <-- function to execute (resolve) and btn
                    });
                }
            });
        });
    });
};

const changeButton = (data, el) => {
    el.style.color = "black";
    el.textContent = `${data}`;

    if (data !== "No") {
        el.style.backgroundColor = "limegreen";
        return;
    }
    el.style.backgroundColor = "tomato";
};

// --- Bootstrap ---
const checkDocumentBootstrap = () => {
    let message = {};
    let link = document.querySelector('link[href*="bootstrap"]');
    message.result = (link) ? "Bootstrap used!" : "No";

    chrome.runtime.sendMessage({ method: "set", value: JSON.stringify(message) }, () => {
    });
};

buttonBootstrap.addEventListener("click", () => {
    askChrome(checkDocumentBootstrap, changeButton, buttonBootstrap);
});

// --- jQuery ---
const checkDocumentJQuery = (linkReg) => {
    // for testing on page console
    // $().jquery returns: jQuery version
    // typeof jQuery returns: "undefined" if not!

    let message = {};
    let link = document.querySelector('link[href*="jquery"]');
    message.result = (link) ? "Yes, jQuery" : "No";

    chrome.runtime.sendMessage({ method: "set", value: JSON.stringify(message) }, () => {
    });
};

buttonJQuery.addEventListener("click", () => {
    askChrome(checkDocumentJQuery, changeButton, buttonJQuery);
});

// --- H1 ---
const getDocumentMainHeaders = () => {
    let message = {};
    let check = document.getElementsByTagName("h1").length;
    if (!check) h1Count = 0;

    message.result = (check) ? "Yes: " + check + " tag" : "No";

    chrome.runtime.sendMessage({ method: "set", value: JSON.stringify(message) }, () => {
    });
};

buttonH1.addEventListener("click", () => {
    askChrome(getDocumentMainHeaders, changeButton, buttonH1);
})
