// Pattern, Background service is only active on sites matching this pattern
let pattern = "*://*.tiktok.com/*";

function cleanURL(requestDetails) {
    // Create a new URL object and return it without the link trackers in the query string
    const url = new URL(requestDetails.url);
    url.search = "";
    return {redirectUrl: url.href};
  }

function redirect(requestDetails) {
    // If the URL has a query string, Send it to clean url, if not return the URL unaltered.
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
// passing the function, filter argument and "blocking"
browser.webRequest.onBeforeRequest.addListener(
    redirect,
  { urls: [pattern]},
  ["blocking"],
);
