// https
if (location.protocol == "http:") {
  location.protocol == "https:";
}
// icons
var icon = require("./icon.png");
document.querySelector("#navbar-icon").src = icon;
var link = document.querySelector("link[rel~='icon']");
if (!link) {
  link = document.createElement("link");
  link.rel = "icon";
  document.getElementsByTagName("head")[0].appendChild(link);
}
link.href = icon;
// service workers
if ("serviceWorker" in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js");
  });
}
// font awesome
require("@fortawesome/fontawesome-free/js/fontawesome");
require("@fortawesome/fontawesome-free/js/solid");
require("@fortawesome/fontawesome-free/js/regular");
require("@fortawesome/fontawesome-free/js/brands");
// halfmoon
require("halfmoon/css/halfmoon.min.css");
require("./highlight.css");
window.halfmoon = require("halfmoon");

// highlight.js
window.hljs = require("@highlightjs/cdn-assets/highlight.min.js");
window.hljs.initHighlightingOnLoad();

// webpack
console.log("Webpack loaded!");

// routing + main files
window.escapeHTML = require("escape-html");
window.striptags = require("striptags");
require("./main.js");
require("./fetch-blog-names.js");

// responsive css
require("./style.css");
