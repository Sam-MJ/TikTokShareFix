let pattern = "*://*.tiktok.com/*";

// redirect function

// returns an object with a property `redirectURL`
// set to the new URL

function cleanURL(requestDetails) {
    const url = new URL(requestDetails.url);
    url.search = "";
    return {redirectUrl: url.href};
  }

function redirect(requestDetails) {
    if (requestDetails.url.includes("?")) {
        console.log(`Redirecting: ${requestDetails.url}`);

        return {
        redirectUrl:
            `${cleanURL(requestDetails.url)}`,
        };
    }
    return {cancel:false}
}

// add the listener,
// passing the filter argument and "blocking"
browser.webRequest.onBeforeRequest.addListener(
    redirect,
  { urls: [pattern]},
  ["blocking"],
);
